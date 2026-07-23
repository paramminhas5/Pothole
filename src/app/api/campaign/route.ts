import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabaseClient } from '@/lib/supabase-server';
import { getRequestIdentity } from '@/lib/identity';
import { validateCampaignInput } from '@/lib/campaign-validation';
import { toCampaignSummary } from '@/lib/dto/campaign';
import { parseJsonObject } from '@/lib/validation';
import { enforceRateLimits } from '@/lib/rate-limit';
import { readRequestSessionId } from '@/lib/session';
import type { CampaignRow } from '@/types/database';

/**
 * GET /api/campaign — List campaigns (public, filterable)
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  const category = searchParams.get('category');
  const status = searchParams.get('status') || 'live,escalating';
  const limit = Math.min(50, parseInt(searchParams.get('limit') || '20'));
  const offset = parseInt(searchParams.get('offset') || '0');

  const service = getServiceSupabaseClient();
  let query = service
    .from('campaigns')
    .select('id, title, title_hi, slug, city, category, target_institution, primary_demand, deadline, status, supporter_count, filing_count, created_at')
    .in('status', status.split(','))
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (city) query = query.eq('city', city);
  if (category) query = query.eq('category', category);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: 'Failed to load campaigns' }, { status: 500 });

  const campaigns = (data as CampaignRow[]).map(toCampaignSummary);
  return NextResponse.json({ campaigns, count: campaigns.length });
}

/**
 * POST /api/campaign — Create a new campaign (requires identity)
 */
export async function POST(request: NextRequest) {
  const identity = await getRequestIdentity(request);
  if (!identity) {
    return NextResponse.json({ error: 'Authentication required to create campaigns' }, { status: 401 });
  }

  const sessionId = readRequestSessionId(request);
  if (sessionId) {
    const allowed = await enforceRateLimits(request, sessionId, 'campaign_create', 3, 3600);
    if (!allowed) return NextResponse.json({ error: 'Too many campaigns created' }, { status: 429 });
  }

  const body = await parseJsonObject(request, 10_000);
  if (!body) return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });

  const input = {
    title: (body.title as string) || '',
    titleHi: (body.titleHi as string) || '',
    issueStatement: (body.issueStatement as string) || '',
    issueStatementHi: (body.issueStatementHi as string) || '',
    city: (body.city as string) || '',
    area: (body.area as string) || '',
    category: (body.category as string) || '',
    targetInstitution: (body.targetInstitution as string) || '',
    targetJurisdiction: (body.targetJurisdiction as string) || '',
    primaryDemand: (body.primaryDemand as string) || '',
    primaryDemandHi: (body.primaryDemandHi as string) || '',
    deadline: (body.deadline as string) || '',
    templateSlug: (body.templateSlug as string) || undefined,
    chapterId: (body.chapterId as string) || undefined,
  };

  const validation = validateCampaignInput(input);
  if (!validation.valid) {
    return NextResponse.json({ error: 'Validation failed', errors: validation.errors }, { status: 400 });
  }

  const service = getServiceSupabaseClient();
  const { data, error } = await service
    .from('campaigns')
    .insert({
      creator_identity_id: identity.id,
      title: input.title.trim(),
      title_hi: input.titleHi?.trim() || '',
      issue_statement: input.issueStatement.trim(),
      issue_statement_hi: input.issueStatementHi?.trim() || '',
      city: input.city.trim(),
      area: input.area?.trim() || '',
      category: input.category,
      target_institution: input.targetInstitution.trim(),
      target_jurisdiction: input.targetJurisdiction?.trim() || '',
      primary_demand: input.primaryDemand.trim(),
      primary_demand_hi: input.primaryDemandHi?.trim() || '',
      deadline: input.deadline,
      template_slug: input.templateSlug || null,
      chapter_id: input.chapterId || null,
      status: 'draft',
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: 'Failed to create campaign' }, { status: 500 });

  // Auto-add creator as lead
  await service.from('campaign_team').insert({
    campaign_id: data.id,
    identity_id: identity.id,
    role: 'lead',
  });

  return NextResponse.json({ success: true, campaign: toCampaignSummary(data as CampaignRow) }, { status: 201 });
}
