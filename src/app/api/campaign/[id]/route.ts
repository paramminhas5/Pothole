import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabaseClient } from '@/lib/supabase-server';
import { getRequestIdentity } from '@/lib/identity';
import { toCampaignDetail } from '@/lib/dto/campaign';
import { isValidStatusTransition } from '@/lib/campaign-validation';
import { parseJsonObject } from '@/lib/validation';
import type { CampaignRow, CampaignTeamRow, CampaignUpdateRow } from '@/types/database';

/**
 * GET /api/campaign/[id] — Full campaign detail (public)
 */
export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = getServiceSupabaseClient();

  // Fetch campaign (by id or slug)
  const isUuid = /^[0-9a-f]{8}-/.test(id);
  const { data: campaign, error } = isUuid
    ? await service.from('campaigns').select('*').eq('id', id).single()
    : await service.from('campaigns').select('*').eq('slug', id).single();

  if (error || !campaign) return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
  if (campaign.status === 'draft') return NextResponse.json({ error: 'Campaign not published' }, { status: 404 });

  // Fetch team with display names
  const { data: team } = await service
    .from('campaign_team')
    .select('*, identities(display_name)')
    .eq('campaign_id', campaign.id)
    .eq('status', 'active');

  // Fetch recent updates
  const { data: updates } = await service
    .from('campaign_updates')
    .select('*')
    .eq('campaign_id', campaign.id)
    .order('created_at', { ascending: false })
    .limit(10);

  const teamWithNames = (team || []).map((t: CampaignTeamRow & { identities?: { display_name: string } }) => ({
    ...t,
    display_name: t.identities?.display_name || 'Member',
  }));

  const dto = toCampaignDetail(
    campaign as CampaignRow,
    teamWithNames,
    (updates || []) as CampaignUpdateRow[]
  );

  return NextResponse.json({ campaign: dto });
}

/**
 * PATCH /api/campaign/[id] — Update campaign (team members only)
 */
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const identity = await getRequestIdentity(request);
  if (!identity) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });

  const service = getServiceSupabaseClient();

  // Verify team membership
  const { data: membership } = await service
    .from('campaign_team')
    .select('role')
    .eq('campaign_id', id)
    .eq('identity_id', identity.id)
    .eq('status', 'active')
    .single();

  if (!membership) return NextResponse.json({ error: 'Not a team member' }, { status: 403 });

  const body = await parseJsonObject(request, 10_000);
  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 });

  // Handle status transition
  if (body.status && typeof body.status === 'string') {
    const { data: current } = await service.from('campaigns').select('status').eq('id', id).single();
    if (!current) return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });

    if (!isValidStatusTransition(current.status, body.status as CampaignRow['status'])) {
      return NextResponse.json({ error: `Cannot transition from ${current.status} to ${body.status}` }, { status: 400 });
    }

    const updateData: Record<string, unknown> = { status: body.status };
    if (body.status === 'live') updateData.published_at = new Date().toISOString();
    if (body.status.startsWith('concluded_')) {
      updateData.concluded_at = new Date().toISOString();
      if (body.outcomeSummary) updateData.outcome_summary = body.outcomeSummary;
    }

    await service.from('campaigns').update(updateData).eq('id', id);
  }

  return NextResponse.json({ success: true });
}
