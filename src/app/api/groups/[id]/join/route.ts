import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabaseClient } from '@/lib/supabase-server';
import { getRequestIdentity } from '@/lib/identity';

/**
 * POST /api/groups/[id]/join — Join a group
 */
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const identity = await getRequestIdentity(request);
  if (!identity) return NextResponse.json({ error: 'Sign in to join a group' }, { status: 401 });

  const service = getServiceSupabaseClient();

  // Check group exists and is active
  const { data: group } = await service
    .from('groups')
    .select('id, status, max_members, member_count')
    .eq('id', id)
    .eq('status', 'active')
    .single();

  if (!group) return NextResponse.json({ error: 'Group not found' }, { status: 404 });
  if (group.member_count >= group.max_members) {
    return NextResponse.json({ error: 'Group is full' }, { status: 400 });
  }

  // Check not already a member
  const { data: existing } = await service
    .from('group_members')
    .select('id')
    .eq('group_id', id)
    .eq('identity_id', identity.id)
    .single();

  if (existing) return NextResponse.json({ error: 'Already a member' }, { status: 400 });

  // Add member
  const { error } = await service.from('group_members').insert({
    group_id: id,
    display_name: identity.displayName,
    role: 'general',
    session_id: '',
    identity_id: identity.id,
    status: 'active',
  });

  if (error) return NextResponse.json({ error: 'Failed to join' }, { status: 500 });

  return NextResponse.json({ success: true });
}
