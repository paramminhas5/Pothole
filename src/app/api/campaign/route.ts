import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabaseClient } from '@/lib/supabase-server';
import { getRequestIdentity } from '@/lib/identity';
import { parseJsonObject, cleanString } from '@/lib/validation';
import { readRequestSessionId } from '@/lib/session';
import { enforceRateLimits } from '@/lib/rate-limit';

/**
 * GET /api/campaign — List campaigns from DB (public)
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  const category = searchParams.get('category');
  const status = searchParams.get('status');
  const limit = Math.min(50, parseInt(searchParams.get('limit') || '20'));

  const service = getServiceSupabaseClient();
  let query = service
    .from('campaigns')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  // Filter by status (default: live + escalating)
  if (status) {
    query = query.in('status', status.split(','));
  } else {
    query = query.in('status', ['live', 'escalating']);
  }

  if (city) query = query.eq('city', city);
  if (category) query = query.eq('category', category);

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: 'Failed to load campaigns', detail: error.message }, { status: 500 });
  }

  return NextResponse.json({ campaigns: data || [], count: (data || []).length });
}

/**
 * POST /api/campaign — Create a campaign (requires identity)
 * Individual OR group can start.
 */
export async function POST(request: NextRequest) {
  const identity = await getRequestIdentity(request);
  if (!identity) {
    return NextResponse.json({ error: 'Sign in to create a campaign' }, { status: 401 });
  }

  // Rate limit
  const sessionId = readRequestSessionId(request);
  if (sessionId) {
    const allowed = await enforceRateLimits(request, sessionId, 'campaign_create', 5, 3600);
    if (!allowed) return NextResponse.json({ error: 'Too many campaigns created. Try again later.' }, { status: 429 });
  }

  const body = await parseJsonObject(request, 10_000);
  if (!body) return NextResponse.json({ error: 'Invalid request' }, { status: 400 });

  // Validate required fields
  const title = cleanString(body.title, 200, 3);
  const targetInstitution = cleanString(body.targetInstitution, 300, 3);
  const primaryDemand = cleanString(body.primaryDemand, 1000, 5);
  const city = cleanString(body.city, 100, 2);
  const deadline = cleanString(body.deadline, 10, 10);
  const category = cleanString(body.category, 50) || 'other';

  if (!title) return NextResponse.json({ error: 'Title is required (3-200 chars)' }, { status: 400 });
  if (!targetInstitution) return NextResponse.json({ error: 'Target institution is required' }, { status: 400 });
  if (!primaryDemand) return NextResponse.json({ error: 'Demand is required (min 5 chars)' }, { status: 400 });
  if (!city) return NextResponse.json({ error: 'City is required' }, { status: 400 });
  if (!deadline) return NextResponse.json({ error: 'Deadline is required' }, { status: 400 });

  // Validate deadline is future
  if (new Date(deadline) <= new Date()) {
    return NextResponse.json({ error: 'Deadline must be in the future' }, { status: 400 });
  }

  const service = getServiceSupabaseClient();

  // Insert campaign
  const { data, error } = await service
    .from('campaigns')
    .insert({
      creator_id: identity.id,
      group_id: body.groupId || null,
      title,
      title_hi: cleanString(body.titleHi, 200, 0) || '',
      issue_statement: cleanString(body.issueStatement, 2000, 0) || '',
      issue_statement_hi: cleanString(body.issueStatementHi, 2000, 0) || '',
      city,
      area: cleanString(body.area, 100, 0) || '',
      category,
      target_institution: targetInstitution,
      target_jurisdiction: cleanString(body.targetJurisdiction, 200, 0) || '',
      primary_demand: primaryDemand,
      primary_demand_hi: cleanString(body.primaryDemandHi, 1000, 0) || '',
      deadline,
      status: 'draft',
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: 'Failed to create campaign', detail: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, campaign: data }, { status: 201 });
}
