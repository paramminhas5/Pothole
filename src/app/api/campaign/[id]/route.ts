import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabaseClient } from '@/lib/supabase-server';
import { getRequestIdentity } from '@/lib/identity';
import { parseJsonObject } from '@/lib/validation';

/**
 * GET /api/campaign/[id] — Campaign detail (by id or slug)
 */
export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = getServiceSupabaseClient();

  const isUuid = /^[0-9a-f]{8}-/.test(id);
  const { data: campaign, error } = isUuid
    ? await service.from('campaigns').select('*').eq('id', id).single()
    : await service.from('campaigns').select('*').eq('slug', id).single();

  if (error || !campaign) {
    return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
  }

  // Get aligned groups
  const { data: alignedGroups } = await service
    .from('campaign_groups')
    .select('group_id, groups(name, member_count, city)')
    .eq('campaign_id', campaign.id);

  // Get supporter count (real)
  const { count: supporters } = await service
    .from('campaign_supporters')
    .select('id', { count: 'exact', head: true })
    .eq('campaign_id', campaign.id);

  // Get evidence
  const { data: evidence } = await service
    .from('campaign_evidence')
    .select('*')
    .eq('campaign_id', campaign.id)
    .order('created_at', { ascending: false });

  return NextResponse.json({
    campaign: {
      ...campaign,
      supporter_count: supporters || campaign.supporter_count || 0,
      aligned_groups: (alignedGroups || []).map((g: any) => ({
        id: g.group_id,
        name: g.groups?.name,
        members: g.groups?.member_count,
        city: g.groups?.city,
      })),
      evidence: evidence || [],
    },
  });
}

/**
 * PATCH /api/campaign/[id] — Update campaign (creator only)
 * Key action: publish (draft → live)
 */
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const identity = await getRequestIdentity(request);
  if (!identity) return NextResponse.json({ error: 'Sign in required' }, { status: 401 });

  const service = getServiceSupabaseClient();

  // Verify ownership
  const { data: campaign } = await service
    .from('campaigns')
    .select('id, creator_id, status')
    .eq('id', id)
    .single();

  if (!campaign) return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
  if (campaign.creator_id !== identity.id) {
    return NextResponse.json({ error: 'Only the creator can update this campaign' }, { status: 403 });
  }

  const body = await parseJsonObject(request, 5_000);
  if (!body) return NextResponse.json({ error: 'Invalid request' }, { status: 400 });

  const updates: Record<string, unknown> = {};

  // Status change (publish, escalate, conclude)
  if (body.status && typeof body.status === 'string') {
    const validTransitions: Record<string, string[]> = {
      draft: ['live'],
      live: ['escalating', 'won', 'partial_win', 'refused', 'closed'],
      escalating: ['won', 'partial_win', 'refused', 'closed'],
    };

    const allowed = validTransitions[campaign.status];
    if (!allowed || !allowed.includes(body.status)) {
      return NextResponse.json({ error: `Cannot change from "${campaign.status}" to "${body.status}"` }, { status: 400 });
    }

    updates.status = body.status;
    if (body.status === 'live') updates.published_at = new Date().toISOString();
    if (['won', 'partial_win', 'refused', 'closed'].includes(body.status)) {
      updates.concluded_at = new Date().toISOString();
    }
  }

  if (body.outcomeSummary) updates.outcome_summary = body.outcomeSummary;

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });
  }

  const { error } = await service.from('campaigns').update(updates).eq('id', id);
  if (error) return NextResponse.json({ error: 'Update failed' }, { status: 500 });

  return NextResponse.json({ success: true });
}
