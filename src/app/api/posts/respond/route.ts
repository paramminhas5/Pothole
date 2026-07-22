import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendResponseNotification } from '@/lib/email';

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
      .select('id, status, description, session_id')
      .eq('id', post_id)
      .eq('status', 'approved')
      .single();

    if (!post) {
      return NextResponse.json({ error: 'Post not found or not available' }, { status: 404 });
    }

    // Store the contact response
    const { error } = await supabase.from('contact_responses').insert({
      post_id,
      responder_contact: responder_contact.trim().slice(0, 300),
      responder_message: (responder_message || '').trim().slice(0, 500),
    });

    if (error) {
      return NextResponse.json({ error: 'Failed to send response' }, { status: 500 });
    }

    // Try to notify the poster via email (if they verified their email)
    // Look up the poster's email from their session
    // The email is stored base64-encoded in rate_limits when they verified
    try {
      // Check if we can find the poster's verified email via their session
      const posterSessionId = post.session_id;
      // In production, you'd look this up from a sessions table
      // For now, we attempt notification if the poster's cookie-stored email matches
      // This is a best-effort notification — the response is still stored either way

      // Check if there's a verified_email associated with this session
      // We store this during OTP verification
      const { data: sessionData } = await supabase
        .from('rate_limits')
        .select('session_id')
        .like('session_id', `email_notify:${posterSessionId}:%`)
        .limit(1);

      if (sessionData && sessionData.length > 0) {
        const emailEncoded = sessionData[0].session_id.split(':')[2];
        const posterEmail = Buffer.from(emailEncoded, 'base64').toString();
        
        await sendResponseNotification(
          posterEmail,
          responder_contact.trim(),
          (responder_message || '').trim(),
          post.description
        );
      }
    } catch {
      // Notification is best-effort — don't fail the response if it fails
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
