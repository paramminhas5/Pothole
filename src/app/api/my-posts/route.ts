import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { POST_EXPIRY_HOURS } from '@/lib/constants';

// GET /api/my-posts — get posts for a specific session
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('session_id') || request.cookies.get('session_id')?.value;

  if (!sessionId) {
    return NextResponse.json({ posts: [] });
  }

  // Get posts with their responses
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }

  // Get responses for each post
  const postsWithResponses = await Promise.all(
    (posts || []).map(async (post) => {
      const { data: responses } = await supabase
        .from('contact_responses')
        .select('id, responder_contact, responder_message, created_at')
        .eq('post_id', post.id)
        .order('created_at', { ascending: false });

      return { ...post, responses: responses || [] };
    })
  );

  return NextResponse.json({ posts: postsWithResponses });
}

// PATCH /api/my-posts — extend expiry or mark as resolved
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, action } = body;
    const sessionId = request.cookies.get('session_id')?.value;

    if (!id || !action || !sessionId) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Verify ownership
    const { data: post } = await supabase
      .from('posts')
      .select('id, session_id, expires_at')
      .eq('id', id)
      .eq('session_id', sessionId)
      .single();

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    if (action === 'extend') {
      const newExpiry = new Date(
        Math.max(new Date(post.expires_at).getTime(), Date.now()) + POST_EXPIRY_HOURS * 60 * 60 * 1000
      ).toISOString();

      await supabase.from('posts').update({ expires_at: newExpiry }).eq('id', id);
    } else if (action === 'resolve') {
      await supabase.from('posts').update({ resolved: true }).eq('id', id);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
