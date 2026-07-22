import { NextRequest, NextResponse } from 'next/server';
import { getPublicSupabaseClient } from '@/lib/supabase';
import { getServiceSupabaseClient } from '@/lib/supabase-server';
import { enforceRateLimits } from '@/lib/rate-limit';
import { CATEGORIES, CITIES_AREAS } from '@/lib/constants';
import { getOrCreateRequestSession, setSessionCookie } from '@/lib/session';
import { safePublicHref } from '@/lib/output';
import { cleanString, isKnownCity, isKnownCityArea, isSafeContactMethod, parseJsonObject, validCategories } from '@/lib/validation';

const CITIES = new Set(CITIES_AREAS.map(({ city }) => city));
const CATEGORY_VALUES = new Set<string>(CATEGORIES.map(({ value }) => value));
const PUBLIC_CHAPTER_FIELDS = 'id, name, city, area, categories, contact_method, description, updated_at';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  const category = searchParams.get('category');
  if ((city && !CITIES.has(city)) || (category && !CATEGORY_VALUES.has(category))) {
    return NextResponse.json({ error: 'Invalid filter' }, { status: 400 });
  }

  let query = getPublicSupabaseClient()
    .from('chapters')
    .select(PUBLIC_CHAPTER_FIELDS)
    .order('updated_at', { ascending: false })
    .limit(200);
  if (city) query = query.eq('city', city);
  if (category) query = query.contains('categories', [category]);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: 'Failed to fetch chapters' }, { status: 500 });
  const chapters = (data || []).map((chapter) => ({
    ...chapter,
    contact_method: safePublicHref(chapter.contact_method) || '',
  }));
  return NextResponse.json({ chapters }, { headers: { 'Cache-Control': 'public, max-age=60' } });
}

export async function POST(request: NextRequest) {
  const body = await parseJsonObject(request);
  if (!body) return NextResponse.json({ error: 'Invalid request' }, { status: 400 });

  const name = cleanString(body.name, 200);
  const city = body.city;
  const area = body.area;
  const categories = validCategories(body.categories);
  const contactMethod = cleanString(body.contact_method, 500);
  const description = body.description === undefined ? '' : cleanString(body.description, 500, 0);

  if (!name || !isKnownCity(city) || !isKnownCityArea(city, area) || !categories
      || !contactMethod || description === null || !isSafeContactMethod(contactMethod)) {
    return NextResponse.json({ error: 'Invalid chapter data' }, { status: 400 });
  }

  try {
    const session = getOrCreateRequestSession(request);
    if (!await enforceRateLimits(request, session.id, 'chapter_submit', 3, 3_600)) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }

    const { error } = await getServiceSupabaseClient().from('chapters').insert({
      name,
      city,
      area,
      categories,
      contact_method: contactMethod,
      description,
      status: 'pending',
    });
    if (error) return NextResponse.json({ error: 'Failed to submit chapter' }, { status: 500 });

    const response = NextResponse.json({ success: true }, { status: 201 });
    if (session.isNew) setSessionCookie(response, session.token);
    return response;
  } catch {
    return NextResponse.json({ error: 'Submission service unavailable' }, { status: 503 });
  }
}
