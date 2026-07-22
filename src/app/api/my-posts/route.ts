import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabaseClient } from '@/lib/supabase-server';
import { POST_EXPIRY_HOURS } from '@/lib/constants';
import { readRequestSessionId } from '@/lib/session';
import { isUuid, parseJsonObject } from '@/lib/validation';

const OWNED_POST_FIELDS = 'id, type, category, city, area, description, urgency, status, expires_at, created_at, reported_count, resolved';

export async function GET(request: NextRequest) {
  const sessionId = readRequestSessionId(request);
  if (!sessionId) return NextResponse.json({ posts: [] }, { headers: { 'Cache-Control': 'no-store' } });

  try {
    const service = getServiceSupabaseClient();
    const { data: posts, error } = await service
      .from('posts')
      .select(OWNED_POST_FIELDS)
      .eq('session_id', sessionId)
      .order('created_at', { ascending: false })
      .limit(100);
    if (error) return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });

    const postsWithResponses = await Promise.all((posts || []).map(async (post) => {
      const { data: responses, error: responseError } = await service
        .from('contact_responses')
        .select('id, responder_contact, responder_message, created_at')
        .eq('post_id', post.id)
        .order('created_at', { ascending: false })
        .limit(100);
      return { ...post, responses: responseError ? [] : responses || [] };
    }));

    return NextResponse.json({ posts: postsWithResponses }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return NextResponse.json({ error: 'Post service unavailable' }, { status: 503 });
  }
}

export async function PATCH(request: NextRequest) {
  const sessionId = readRequestSessionId(request);
  if (!sessionId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await parseJsonObject(request, 2_000);
  if (!body || !isUuid(body.id) || !['extend', 'resolve'].includes(String(body.action))) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  try {
    const service = getServiceSupabaseClient();
    const { data: post, error: findError } = await service
      .from('posts')
      .select('id, expires_at, resolved')
      .eq('id', body.id)
      .eq('session_id', sessionId)
      .maybeSingle();
    if (findError) return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });

    const update = body.action === 'extend'
      ? { expires_at: new Date(Math.max(new Date(post.expires_at).getTime(), Date.now()) + POST_EXPIRY_HOURS * 3_600_000).toISOString() }
      : { resolved: true };
    const { data: updated, error } = await service
      .from('posts')
      .update(update)
      .eq('id', body.id)
      .eq('session_id', sessionId)
      .select('id')
      .maybeSingle();
    if (error) return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
    if (!updated) return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Post service unavailable' }, { status: 503 });
  }
}
