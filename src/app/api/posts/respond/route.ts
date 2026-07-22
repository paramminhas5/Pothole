import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// POST /api/posts/respond — send contact info to post creator (relay, never public)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { post_id, responder_contact, responder_message } = body;

    if (!post_id || !responder_contact?.trim()) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Verify the post exists and is approved
    const { data: post } = await supabase
      .from('posts')
      .select('id, status')
      .eq('id', post_id)
      .eq('status', 'approved')
      .single();

    if (!post) {
      return NextResponse.json({ error: 'Post not found or not available' }, { status: 404 });
    }

    // Store the contact response (visible only to post creator via admin/future auth)
    const { error } = await supabase.from('contact_responses').insert({
      post_id,
      responder_contact: responder_contact.trim().slice(0, 300),
      responder_message: (responder_message || '').trim().slice(0, 500),
    });

    if (error) {
      return NextResponse.json({ error: 'Failed to send response' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
