import { NextRequest, NextResponse } from 'next/server';
import { sendResponseNotification } from '@/lib/email';
import { hasBlockingPII } from '@/lib/moderation';
import { safePublicHref } from '@/lib/output';
import { enforceRateLimits } from '@/lib/rate-limit';
import { getOrCreateRequestSession, setSessionCookie } from '@/lib/session';
import { getServiceSupabaseClient } from '@/lib/supabase-server';
import { cleanString, isUuid, normalizeEmail, parseJsonObject } from '@/lib/validation';

export async function POST(request: NextRequest) {
  const body = await parseJsonObject(request, 4_000);
  const postId = body?.post_id;
  const rawContact = body ? cleanString(body.responder_contact, 300) : null;
  const responderContact = rawContact
    ? normalizeEmail(rawContact) || safePublicHref(rawContact)
    : null;
  const responderMessage = body?.responder_message === undefined
    ? ''
    : cleanString(body.responder_message, 500, 0);
  const safetyAttested = body?.safety_attested === true;
  if (!isUuid(postId) || !responderContact || responderMessage === null || !safetyAttested
      || hasBlockingPII(responderMessage)) {
    return NextResponse.json({ error: 'Use a dedicated email or HTTPS contact, remove private identifiers, and confirm the safety notice.' }, { status: 400 });
  }

  try {
    const session = getOrCreateRequestSession(request);
    if (!await enforceRateLimits(request, session.id, 'post_response', 10, 3_600)) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }

    const service = getServiceSupabaseClient();
    const { data: post, error: postError } = await service
      .from('posts')
      .select('id, description, session_id')
      .eq('id', postId)
      .eq('status', 'approved')
      .eq('resolved', false)
      .gt('expires_at', new Date().toISOString())
      .maybeSingle();
    if (postError) return NextResponse.json({ error: 'Failed to send response' }, { status: 500 });
    if (!post) return NextResponse.json({ error: 'Post not found or not available' }, { status: 404 });

    const { error } = await service.from('contact_responses').insert({
      post_id: postId,
      responder_contact: responderContact,
      responder_message: responderMessage,
    });
    if (error) return NextResponse.json({ error: 'Failed to send response' }, { status: 500 });

    const { data: verifiedSession } = await service
      .from('verified_sessions')
      .select('email')
      .eq('session_id', post.session_id)
      .gt('expires_at', new Date().toISOString())
      .maybeSingle();
    if (verifiedSession?.email) {
      await sendResponseNotification(
        verifiedSession.email,
        responderContact,
        responderMessage,
        post.description
      );
    }

    const response = NextResponse.json({ success: true }, { status: 201 });
    if (session.isNew) setSessionCookie(response, session.token);
    return response;
  } catch {
    return NextResponse.json({ error: 'Response service unavailable' }, { status: 503 });
  }
}
