import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest } from '@/lib/admin-auth';
import { getServiceSupabaseClient } from '@/lib/supabase-server';
import { isUuid, parseJsonObject } from '@/lib/validation';

const ADMIN_CHAPTER_FIELDS = 'id, name, city, area, categories, contact_method, description, status, created_at, updated_at, trust_tier, last_ping';

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { data, error } = await getServiceSupabaseClient()
      .from('chapters')
      .select(ADMIN_CHAPTER_FIELDS)
      .eq('status', 'pending')
      .order('created_at', { ascending: true })
      .limit(200);
    if (error) return NextResponse.json({ error: 'Failed to fetch chapters' }, { status: 500 });
    return NextResponse.json({ chapters: data || [] }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return NextResponse.json({ error: 'Moderation service unavailable' }, { status: 503 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!isAdminRequest(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await parseJsonObject(request, 2_000);
  const action = body?.action;
  if (!body || !isUuid(body.id) || (action !== 'approve' && action !== 'reject')) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  try {
    const { data, error } = await getServiceSupabaseClient().rpc('moderate_content', {
      p_target_type: 'chapter',
      p_target_id: body.id,
      p_new_status: action === 'approve' ? 'approved' : 'rejected',
      p_moderator: 'authenticated-admin-session',
    });
    if (error) return NextResponse.json({ error: 'Failed to update chapter' }, { status: 500 });
    if (data !== true) return NextResponse.json({ error: 'Pending chapter not found' }, { status: 404 });
    return NextResponse.json({ success: true, status: action === 'approve' ? 'approved' : 'rejected' });
  } catch {
    return NextResponse.json({ error: 'Moderation service unavailable' }, { status: 503 });
  }
}
