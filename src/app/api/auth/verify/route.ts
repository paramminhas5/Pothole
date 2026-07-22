import { NextRequest, NextResponse } from 'next/server';
import { consumeRateLimit, requestNetworkKey } from '@/lib/rate-limit';
import { keyedHash } from '@/lib/server-crypto';
import { getOrCreateRequestSession, setSessionCookie } from '@/lib/session';
import { getServiceSupabaseClient } from '@/lib/supabase-server';
import { cleanString, normalizeEmail, parseJsonObject } from '@/lib/validation';

export async function POST(request: NextRequest) {
  const body = await parseJsonObject(request, 2_000);
  const email = body ? normalizeEmail(body.email) : null;
  const code = body ? cleanString(body.code, 6, 6) : null;
  if (!email || !code || !/^\d{6}$/.test(code)) {
    return NextResponse.json({ error: 'Email and 6-digit code required' }, { status: 400 });
  }

  try {
    const emailHash = keyedHash(email, 'otp-email-v1');
    const networkKey = requestNetworkKey(request);
    const verifyLimit = await consumeRateLimit(emailHash, 'otp_verify', 10, 600);
    const networkAllowed = networkKey
      ? (await consumeRateLimit(networkKey, 'otp_verify_network', 30, 600)).allowed
      : true;
    if (!verifyLimit.allowed || !networkAllowed) {
      return NextResponse.json({ error: 'Too many verification attempts' }, { status: 429 });
    }

    const session = getOrCreateRequestSession(request);
    const sessionExpiresAt = new Date(Date.now() + 7 * 86_400_000).toISOString();
    const codeHash = keyedHash(`${emailHash}:${code}`, 'otp-code-v1');
    const { data: verified, error } = await getServiceSupabaseClient().rpc('consume_otp_and_create_session', {
      p_email_hash: emailHash,
      p_code_hash: codeHash,
      p_max_attempts: 5,
      p_session_id: session.id,
      p_email: email,
      p_session_expires_at: sessionExpiresAt,
    });
    if (error) return NextResponse.json({ error: 'Verification service unavailable' }, { status: 503 });
    if (verified !== true) return NextResponse.json({ error: 'Invalid or expired code' }, { status: 401 });

    const response = NextResponse.json({ success: true, verified: true });
    if (session.isNew) setSessionCookie(response, session.token, 7 * 86_400);
    return response;
  } catch {
    return NextResponse.json({ error: 'Verification service unavailable' }, { status: 503 });
  }
}
