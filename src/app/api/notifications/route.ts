import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabaseClient } from '@/lib/supabase-server';
import { getRequestIdentity } from '@/lib/identity';
import type { NotificationDTO } from '@/types/dto';

/**
 * GET /api/notifications — User's notifications (the return loop)
 * RTI deadlines, campaign updates, task assignments, skill matches
 */
export async function GET(request: NextRequest) {
  const identity = await getRequestIdentity(request);
  if (!identity) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const unreadOnly = searchParams.get('unread') === 'true';
  const limit = Math.min(50, parseInt(searchParams.get('limit') || '20'));

  const service = getServiceSupabaseClient();
  let query = service
    .from('notifications')
    .select('*')
    .eq('identity_id', identity.id)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (unreadOnly) query = query.eq('read', false);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: 'Failed to load notifications' }, { status: 500 });

  const notifications: NotificationDTO[] = (data || []).map(n => ({
    id: n.id,
    type: n.type,
    title: n.title,
    body: n.body,
    link: n.link,
    relatedCampaignId: n.related_campaign_id,
    read: n.read,
    createdAt: n.created_at,
  }));

  // Unread count
  const { count } = await service
    .from('notifications')
    .select('id', { count: 'exact', head: true })
    .eq('identity_id', identity.id)
    .eq('read', false);

  return NextResponse.json({ notifications, unreadCount: count || 0 });
}

/**
 * PATCH /api/notifications — Mark notifications as read
 */
export async function PATCH(request: NextRequest) {
  const identity = await getRequestIdentity(request);
  if (!identity) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const ids = searchParams.get('ids')?.split(',').filter(Boolean);

  const service = getServiceSupabaseClient();

  if (ids && ids.length > 0) {
    await service
      .from('notifications')
      .update({ read: true })
      .eq('identity_id', identity.id)
      .in('id', ids);
  } else {
    // Mark all as read
    await service
      .from('notifications')
      .update({ read: true })
      .eq('identity_id', identity.id)
      .eq('read', false);
  }

  return NextResponse.json({ success: true });
}
