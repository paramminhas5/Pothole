import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabaseClient } from '@/lib/supabase-server';
import { getRequestIdentity } from '@/lib/identity';
import { parseJsonObject } from '@/lib/validation';

/**
 * POST /api/campaign/[id]/align — Align a group to this campaign
 */
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const identity = await getRequestIdentity(request);
  if (!identity) return NextResponse.json({ error: 'Sign in required' }, { status: 401 });

  const body = await parseJsonObject(request, 1_000);
  const groupId = body?.groupId as string;
  if (!groupId) return NextResponse.json({ error: 'groupId required' }, { status: 400 });

  const service = getServiceSupabaseClient();

  // Verify user is member of the group
  const { data: membership } = await service
    .from('group_members')
    .select('id')
    .eq('group_id', groupId)
    .eq('identity_id', identity.id)
    .single();

  if (!membership) return NextResponse.json({ error: 'You must be a member of the group' }, { status: 403 });

  // Align
  const { error } = await service.from('campaign_groups').upsert({
    campaign_id: id,
    group_id: groupId,
  }, { onConflict: 'campaign_id,group_id' });

  if (error) return NextResponse.json({ error: 'Failed to align' }, { status: 500 });

  // Update count
  const { count } = await service.from('campaign_groups').select('id', { count: 'exact', head: true }).eq('campaign_id', id);
  await service.from('campaigns').update({ groups_aligned: count || 0 }).eq('id', id);

  return NextResponse.json({ success: true });
}
