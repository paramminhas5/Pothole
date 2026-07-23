import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabaseClient } from '@/lib/supabase-server';
import { getPublicSupabaseClient } from '@/lib/supabase';
import { enforceRateLimits } from '@/lib/rate-limit';
import { getOrCreateRequestSession, setSessionCookie } from '@/lib/session';
import { cleanString, isKnownCity, parseJsonObject } from '@/lib/validation';
import { CITIES_AREAS } from '@/lib/constants';

const CITIES = new Set(CITIES_AREAS.map(({ city }) => city));
const DEMAND_STATUS = new Set(['submitted', 'acknowledged', 'action', 'resolved', 'escalated', 'expired']);
const PUBLIC_DEMAND_FIELDS = 'id, title, target, city, category, status, deadline, filed_by, rtis_filed, days_elapsed, escalation_level, created_at, updated_at';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  const status = searchParams.get('status');
  const category = searchParams.get('category');

  if ((city && !CITIES.has(city)) || (status && !DEMAND_STATUS.has(status))) {
    return NextResponse.json({ error: 'Invalid filter' }, { status: 400 });
  }

  let query = getPublicSupabaseClient()
    .from('demands')
    .select(PUBLIC_DEMAND_FIELDS)
    .order('created_at', { ascending: false })
    .limit(100);

  if (city) query = query.eq('city', city);
  if (status) query = query.eq('status', status);
  if (category) query = query.eq('category', category);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: 'Failed to fetch demands' }, { status: 500 });
  return NextResponse.json({ demands: data || [] }, { headers: { 'Cache-Control': 'public, max-age=60' } });
}

export async function POST(request: NextRequest) {
  const body = await parseJsonObject(request);
  if (!body) return NextResponse.json({ error: 'Invalid request' }, { status: 400 });

  const title = cleanString(body.title, 300);
  const target = cleanString(body.target, 200);
  const city = body.city;
  const category = cleanString(body.category, 50);
  const deadline = cleanString(body.deadline, 10);
  const description = cleanString(body.description, 1000, 0) || '';
  const filedBy = cleanString(body.filed_by, 100) || 'Anonymous';
  const evidence = cleanString(body.evidence, 2000, 0) || '';

  if (!title || !target || !isKnownCity(city) || !category || !deadline) {
    return NextResponse.json({ error: 'Title, target, city, category, and deadline are required' }, { status: 400 });
  }

  // Validate deadline is a future date
  const deadlineDate = new Date(deadline);
  if (isNaN(deadlineDate.getTime()) || deadlineDate <= new Date()) {
    return NextResponse.json({ error: 'Deadline must be a future date' }, { status: 400 });
  }

  try {
    const session = getOrCreateRequestSession(request);
    if (!await enforceRateLimits(request, session.id, 'demand_create', 3, 86_400)) {
      return NextResponse.json({ error: 'Rate limit exceeded. Max 3 demands per day.' }, { status: 429 });
    }

    const { error } = await getServiceSupabaseClient().from('demands').insert({
      title,
      target,
      city,
      category,
      deadline: deadlineDate.toISOString(),
      description,
      filed_by: filedBy,
      evidence,
      session_id: session.id,
      status: 'submitted',
      rtis_filed: 0,
      days_elapsed: 0,
      escalation_level: 'Submitted',
    });

    if (error) return NextResponse.json({ error: 'Failed to create demand' }, { status: 500 });

    const response = NextResponse.json({ success: true }, { status: 201 });
    if (session.isNew) setSessionCookie(response, session.token);
    return response;
  } catch {
    return NextResponse.json({ error: 'Demand service unavailable' }, { status: 503 });
  }
}
