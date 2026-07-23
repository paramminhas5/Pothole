import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabaseClient } from '@/lib/supabase-server';
import { enforceRateLimits } from '@/lib/rate-limit';
import { getOrCreateRequestSession, setSessionCookie } from '@/lib/session';
import { cleanString, isKnownCity, parseJsonObject } from '@/lib/validation';
import { CITIES_AREAS } from '@/lib/constants';

const CITIES = new Set(CITIES_AREAS.map(({ city }) => city));
const RESOURCE_TYPES = new Set([
  'legal-aid', 'helpline', 'organization', 'tool', 'shelter',
  'media', 'mental-health', 'education', 'transport', 'other',
]);

const PUBLIC_SUBMISSION_FIELDS = 'id, type, name, city, state, contact, description, source, status, created_at';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  const type = searchParams.get('type');
  const status = searchParams.get('status') || 'approved';

  if ((city && !CITIES.has(city)) || (type && !RESOURCE_TYPES.has(type))) {
    return NextResponse.json({ error: 'Invalid filter' }, { status: 400 });
  }

  let query = getServiceSupabaseClient()
    .from('community_resources')
    .select(PUBLIC_SUBMISSION_FIELDS)
    .eq('status', status === 'approved' ? 'approved' : 'approved')
    .order('created_at', { ascending: false })
    .limit(200);

  if (city) query = query.eq('city', city);
  if (type) query = query.eq('type', type);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: 'Failed to fetch resources' }, { status: 500 });
  return NextResponse.json({ resources: data || [] }, { headers: { 'Cache-Control': 'public, max-age=60' } });
}

export async function POST(request: NextRequest) {
  const body = await parseJsonObject(request);
  if (!body) return NextResponse.json({ error: 'Invalid request' }, { status: 400 });

  const type = cleanString(body.type, 30);
  const name = cleanString(body.name, 200);
  const city = body.city;
  const state = cleanString(body.state, 100) || '';
  const contact = cleanString(body.contact, 500);
  const description = cleanString(body.description, 1000);
  const source = cleanString(body.source, 500) || '';
  const submitterContact = cleanString(body.submitter_contact, 200) || '';
  const category = cleanString(body.category, 50) || '';

  if (!type || !RESOURCE_TYPES.has(type) || !name || !contact || !description) {
    return NextResponse.json({ error: 'Type, name, contact, and description are required' }, { status: 400 });
  }

  if (city && !isKnownCity(city)) {
    return NextResponse.json({ error: 'Invalid city' }, { status: 400 });
  }

  try {
    const session = getOrCreateRequestSession(request);
    if (!await enforceRateLimits(request, session.id, 'submission', 5, 86_400)) {
      return NextResponse.json({ error: 'Rate limit exceeded. Max 5 submissions per day.' }, { status: 429 });
    }

    const { error } = await getServiceSupabaseClient().from('community_resources').insert({
      type,
      name,
      city: city || 'National',
      state,
      contact,
      description,
      source,
      submitter_contact: submitterContact,
      category,
      session_id: session.id,
      status: 'pending',
    });

    if (error) return NextResponse.json({ error: 'Failed to submit resource' }, { status: 500 });

    const response = NextResponse.json({ success: true, message: 'Submitted for review' }, { status: 201 });
    if (session.isNew) setSessionCookie(response, session.token);
    return response;
  } catch {
    return NextResponse.json({ error: 'Submission service unavailable' }, { status: 503 });
  }
}
