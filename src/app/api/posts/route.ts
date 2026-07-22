import { NextRequest, NextResponse } from 'next/server';
import { getPublicSupabaseClient } from '@/lib/supabase';
import { getServiceSupabaseClient } from '@/lib/supabase-server';
import { enforceRateLimits } from '@/lib/rate-limit';
import { POST_EXPIRY_HOURS, MAX_DESCRIPTION_LENGTH, CATEGORIES, CITIES_AREAS } from '@/lib/constants';
import { hasBlockingPII } from '@/lib/moderation';
import { consumeProofOfWorkChallenge, verifyProofOfWork, POW_DIFFICULTY } from '@/lib/proof-of-work';
import { getOrCreateRequestSession, setSessionCookie } from '@/lib/session';
import { cleanString, isCategory, isKnownCityArea, parseJsonObject } from '@/lib/validation';

const POST_TYPES = new Set(['need', 'offer']);
const URGENCIES = new Set(['routine', 'urgent']);
const CITIES = new Set(CITIES_AREAS.map(({ city }) => city));
const CATEGORY_VALUES = new Set<string>(CATEGORIES.map(({ value }) => value));
const PUBLIC_POST_FIELDS = 'id, type, category, city, area, description, urgency, expires_at, created_at';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const city = searchParams.get('city');
  const category = searchParams.get('category');

  if ((type && !POST_TYPES.has(type)) || (city && !CITIES.has(city)) || (category && !CATEGORY_VALUES.has(category))) {
    return NextResponse.json({ error: 'Invalid filter' }, { status: 400 });
  }

  let query = getPublicSupabaseClient()
    .from('posts')
    .select(PUBLIC_POST_FIELDS)
    .gte('expires_at', new Date().toISOString())
    .order('urgency', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(200);

  if (type) query = query.eq('type', type);
  if (city) query = query.eq('city', city);
  if (category) query = query.eq('category', category);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  return NextResponse.json({ posts: data || [] }, { headers: { 'Cache-Control': 'public, max-age=30' } });
}

export async function POST(request: NextRequest) {
  const body = await parseJsonObject(request);
  if (!body) return NextResponse.json({ error: 'Invalid request' }, { status: 400 });

  const type = typeof body.type === 'string' ? body.type : '';
  const category = body.category;
  const city = body.city;
  const area = body.area;
  const urgency = typeof body.urgency === 'string' ? body.urgency : 'routine';
  const description = cleanString(body.description, MAX_DESCRIPTION_LENGTH);
  const challenge = cleanString(body.pow_challenge, 160);
  const nonce = body.pow_nonce;

  if (!POST_TYPES.has(type) || !isCategory(category) || !isKnownCityArea(city, area)
      || !URGENCIES.has(urgency) || !description || !challenge
      || typeof nonce !== 'number' || !Number.isSafeInteger(nonce) || nonce < 0) {
    return NextResponse.json({ error: 'Invalid post data' }, { status: 400 });
  }

  if (hasBlockingPII(description)) {
    return NextResponse.json(
      { error: 'Your post contains personal information. Please remove phone numbers or ID numbers.' },
      { status: 422 }
    );
  }

  try {
    const validWork = await verifyProofOfWork(challenge, nonce, POW_DIFFICULTY);
    if (!validWork) {
      return NextResponse.json({ error: 'Invalid or expired proof-of-work' }, { status: 403 });
    }

    const session = getOrCreateRequestSession(request);
    if (!await enforceRateLimits(request, session.id, 'post', 5, 3_600)) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }
    if (urgency === 'urgent' && !await enforceRateLimits(request, session.id, 'urgent', 2, 86_400)) {
      return NextResponse.json({ error: 'Urgent post rate limit exceeded' }, { status: 429 });
    }
    if (!await consumeProofOfWorkChallenge(challenge)) {
      return NextResponse.json({ error: 'Proof-of-work was already used' }, { status: 403 });
    }

    const { error } = await getServiceSupabaseClient().from('posts').insert({
      type,
      category,
      city,
      area,
      urgency,
      description,
      session_id: session.id,
      expires_at: new Date(Date.now() + POST_EXPIRY_HOURS * 3_600_000).toISOString(),
      status: 'pending',
    });
    if (error) return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });

    const response = NextResponse.json({ success: true }, { status: 201 });
    if (session.isNew) setSessionCookie(response, session.token);
    return response;
  } catch {
    return NextResponse.json({ error: 'Posting service unavailable' }, { status: 503 });
  }
}
