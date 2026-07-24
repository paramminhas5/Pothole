import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabaseClient } from '@/lib/supabase-server';
import { getRequestIdentity } from '@/lib/identity';
import { parseJsonObject, cleanString } from '@/lib/validation';

/**
 * GET /api/groups — List public groups from DB
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  const type = searchParams.get('type');
  const limit = Math.min(50, parseInt(searchParams.get('limit') || '20'));

  const service = getServiceSupabaseClient();
  let query = service
    .from('groups')
    .select('id, name, city, area, description, group_type, member_count, action_count, purpose, chat_link, chat_platform, visibility, status, invite_code, created_at')
    .eq('status', 'active')
    .eq('visibility', 'public')
    .order('member_count', { ascending: false })
    .limit(limit);

  if (city) query = query.eq('city', city);
  if (type) query = query.eq('group_type', type);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: 'Failed to load groups', detail: error.message }, { status: 500 });

  return NextResponse.json({ groups: data || [], count: (data || []).length });
}

/**
 * POST /api/groups — Create a new group (requires identity)
 */
export async function POST(request: NextRequest) {
  const identity = await getRequestIdentity(request);
  if (!identity) return NextResponse.json({ error: 'Sign in to create a group' }, { status: 401 });

  const body = await parseJsonObject(request, 5_000);
  if (!body) return NextResponse.json({ error: 'Invalid request' }, { status: 400 });

  const name = cleanString(body.name, 100, 2);
  const city = cleanString(body.city, 100, 2);
  const purpose = cleanString(body.purpose, 500, 0) || '';
  const groupType = ['protest', 'mutual_aid', 'campaign', 'study', 'chapter', 'general'].includes(body.type as string)
    ? body.type as string : 'general';

  if (!name) return NextResponse.json({ error: 'Group name required (2-100 chars)' }, { status: 400 });
  if (!city) return NextResponse.json({ error: 'City is required' }, { status: 400 });

  const service = getServiceSupabaseClient();

  const { data, error } = await service
    .from('groups')
    .insert({
      name,
      city,
      area: cleanString(body.area, 100, 0) || '',
      description: purpose,
      purpose,
      group_type: groupType,
      chat_platform: cleanString(body.chatPlatform, 50, 0) || '',
      chat_link: cleanString(body.chatLink, 500, 0) || '',
      visibility: 'public',
      status: 'active',
      creator_id: identity.id,
      member_count: 1,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: 'Failed to create group', detail: error.message }, { status: 500 });

  // Add creator as first member
  await service.from('group_members').insert({
    group_id: data.id,
    display_name: identity.displayName,
    role: 'general',
    session_id: '',
    identity_id: identity.id,
    status: 'active',
  });

  return NextResponse.json({ success: true, group: data }, { status: 201 });
}
