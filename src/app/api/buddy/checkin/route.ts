import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabaseClient } from '@/lib/supabase-server';
import { getRequestIdentity } from '@/lib/identity';
import { parseJsonObject } from '@/lib/validation';

/**
 * POST /api/buddy/checkin — Check in (I'm safe) or SOS
 */
export async function POST(request: NextRequest) {
  const identity = await getRequestIdentity(request);
  if (!identity) return NextResponse.json({ error: 'Sign in required' }, { status: 401 });

  const body = await parseJsonObject(request, 2_000);
  const circleId = body?.circleId as string;
  const type = body?.type === 'sos' ? 'sos' : 'checkin';

  if (!circleId) return NextResponse.json({ error: 'Circle ID required' }, { status: 400 });

  const service = getServiceSupabaseClient();

  // Get member record
  const { data: member } = await service
    .from('buddy_members')
    .select('id, circle_id')
    .eq('circle_id', circleId)
    .eq('identity_id', identity.id)
    .single();

  if (!member) return NextResponse.json({ error: 'Not a member of this circle' }, { status: 403 });

  // Get circle interval
  const { data: circle } = await service
    .from('buddy_circles')
    .select('checkin_interval_minutes')
    .eq('id', circleId)
    .single();

  const interval = circle?.checkin_interval_minutes || 30;
  const now = new Date();
  const nextDue = new Date(now.getTime() + interval * 60000).toISOString();

  // Update member status
  await service.from('buddy_members').update({
    status: type === 'sos' ? 'sos' : 'safe',
    last_checkin: now.toISOString(),
    next_checkin_due: type === 'sos' ? null : nextDue,
  }).eq('id', member.id);

  // Log the check-in
  await service.from('buddy_checkins').insert({
    circle_id: circleId,
    member_id: member.id,
    type,
    message: type === 'sos' ? 'SOS ACTIVATED' : '',
  });

  // If SOS, we should notify all other members (email via Resend)
  if (type === 'sos') {
    // Get all other members' emails
    const { data: otherMembers } = await service
      .from('buddy_members')
      .select('alert_email, display_name')
      .eq('circle_id', circleId)
      .neq('identity_id', identity.id);

    // TODO: Send email alerts via Resend to all members
    // For now, the status change is visible to anyone polling the circle
    console.log(`[BUDDY SOS] ${identity.displayName} triggered SOS. Alerting ${(otherMembers || []).length} members.`);
  }

  return NextResponse.json({
    success: true,
    status: type === 'sos' ? 'sos' : 'safe',
    nextCheckinDue: type === 'sos' ? null : nextDue,
  });
}
