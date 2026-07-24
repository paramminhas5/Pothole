import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabaseClient } from '@/lib/supabase-server';
import { getRequestIdentity } from '@/lib/identity';
import { parseJsonObject, cleanString } from '@/lib/validation';

/**
 * GET /api/buddy?code=XXXX — Get circle status by invite code (public, no auth needed for buddy)
 * GET /api/buddy?id=UUID — Get circle by ID (for members)
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const id = searchParams.get('id');

  const service = getServiceSupabaseClient();

  let circle;
  if (code) {
    const { data } = await service.from('buddy_circles').select('*').eq('invite_code', code).eq('status', 'active').single();
    circle = data;
  } else if (id) {
    const { data } = await service.from('buddy_circles').select('*').eq('id', id).eq('status', 'active').single();
    circle = data;
  } else {
    return NextResponse.json({ error: 'Provide code or id' }, { status: 400 });
  }

  if (!circle) return NextResponse.json({ error: 'Circle not found or expired' }, { status: 404 });

  // Get all members with their status
  const { data: members } = await service
    .from('buddy_members')
    .select('id, display_name, status, last_checkin, next_checkin_due, shared_location')
    .eq('circle_id', circle.id)
    .order('joined_at');

  // Calculate live status for each member
  const now = new Date();
  const membersWithLiveStatus = (members || []).map(m => {
    const lastCheckin = new Date(m.last_checkin);
    const minutesSinceCheckin = (now.getTime() - lastCheckin.getTime()) / 60000;
    const interval = circle.checkin_interval_minutes;
    const grace = circle.grace_period_minutes;

    let liveStatus = m.status;
    if (m.status === 'sos') {
      liveStatus = 'sos';
    } else if (minutesSinceCheckin > interval + grace) {
      liveStatus = 'overdue';
    } else if (minutesSinceCheckin > interval) {
      liveStatus = 'due';
    } else {
      liveStatus = 'safe';
    }

    return {
      id: m.id,
      displayName: m.display_name,
      status: liveStatus,
      lastCheckin: m.last_checkin,
      minutesSinceCheckin: Math.floor(minutesSinceCheckin),
      sharedLocation: m.shared_location,
    };
  });

  return NextResponse.json({
    circle: {
      id: circle.id,
      name: circle.name,
      inviteCode: circle.invite_code,
      interval: circle.checkin_interval_minutes,
      grace: circle.grace_period_minutes,
      locationArea: circle.location_area,
      locationCity: circle.location_city,
      expiresAt: circle.expires_at,
    },
    members: membersWithLiveStatus,
  });
}

/**
 * POST /api/buddy — Create a new safety circle
 */
export async function POST(request: NextRequest) {
  const identity = await getRequestIdentity(request);
  if (!identity) return NextResponse.json({ error: 'Sign in to create a safety circle' }, { status: 401 });

  const body = await parseJsonObject(request, 3_000);
  const name = cleanString(body?.name, 100, 0) || 'Safety Circle';
  const interval = Math.max(10, Math.min(120, parseInt(String(body?.interval)) || 30));
  const locationArea = cleanString(body?.locationArea, 200, 0) || '';
  const locationCity = cleanString(body?.locationCity, 100, 0) || '';
  const expiresHours = Math.max(1, Math.min(72, parseInt(String(body?.expiresHours)) || 24));

  const service = getServiceSupabaseClient();

  const { data: circle, error } = await service
    .from('buddy_circles')
    .insert({
      name,
      checkin_interval_minutes: interval,
      grace_period_minutes: 5,
      location_area: locationArea,
      location_city: locationCity,
      status: 'active',
      expires_at: new Date(Date.now() + expiresHours * 3600000).toISOString(),
      created_by: identity.id,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: 'Failed to create circle' }, { status: 500 });

  // Add creator as first member
  const nextDue = new Date(Date.now() + interval * 60000).toISOString();
  await service.from('buddy_members').insert({
    circle_id: circle.id,
    identity_id: identity.id,
    display_name: identity.displayName,
    status: 'safe',
    last_checkin: new Date().toISOString(),
    next_checkin_due: nextDue,
    alert_email: identity.email || '',
  });

  return NextResponse.json({
    success: true,
    circle: {
      id: circle.id,
      inviteCode: circle.invite_code,
      shareLink: `/buddy/${circle.invite_code}`,
    },
  }, { status: 201 });
}
