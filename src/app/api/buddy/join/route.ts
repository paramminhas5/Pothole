import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabaseClient } from '@/lib/supabase-server';
import { getRequestIdentity } from '@/lib/identity';
import { parseJsonObject, cleanString } from '@/lib/validation';

/**
 * POST /api/buddy/join — Join a safety circle via invite code
 */
export async function POST(request: NextRequest) {
  const identity = await getRequestIdentity(request);
  if (!identity) return NextResponse.json({ error: 'Sign in to join a safety circle' }, { status: 401 });

  const body = await parseJsonObject(request, 2_000);
  const code = cleanString(body?.code, 20, 4);
  if (!code) return NextResponse.json({ error: 'Invite code required' }, { status: 400 });

  const service = getServiceSupabaseClient();

  // Find circle
  const { data: circle } = await service
    .from('buddy_circles')
    .select('id, checkin_interval_minutes, status, expires_at')
    .eq('invite_code', code)
    .eq('status', 'active')
    .single();

  if (!circle) return NextResponse.json({ error: 'Circle not found or expired' }, { status: 404 });
  if (new Date(circle.expires_at) < new Date()) {
    return NextResponse.json({ error: 'This circle has expired' }, { status: 400 });
  }

  // Check not already member
  const { data: existing } = await service
    .from('buddy_members')
    .select('id')
    .eq('circle_id', circle.id)
    .eq('identity_id', identity.id)
    .single();

  if (existing) return NextResponse.json({ error: 'Already in this circle' }, { status: 400 });

  // Join
  const nextDue = new Date(Date.now() + circle.checkin_interval_minutes * 60000).toISOString();
  const { error } = await service.from('buddy_members').insert({
    circle_id: circle.id,
    identity_id: identity.id,
    display_name: identity.displayName,
    status: 'safe',
    last_checkin: new Date().toISOString(),
    next_checkin_due: nextDue,
    alert_email: identity.email || '',
    shared_location: cleanString(body?.location, 200, 0) || '',
  });

  if (error) return NextResponse.json({ error: 'Failed to join circle' }, { status: 500 });

  return NextResponse.json({ success: true, circleId: circle.id });
}
