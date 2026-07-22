import { randomInt } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { sendOTPEmail } from '@/lib/email';
import { consumeRateLimit, requestNetworkKey } from '@/lib/rate-limit';
import { keyedHash } from '@/lib/server-crypto';
import { getServiceSupabaseClient } from '@/lib/supabase-server';
import { normalizeEmail, parseJsonObject } from '@/lib/validation';

export async function POST(request: NextRequest) {
  const body = await parseJsonObject(request, 2_000);
  const email = body ? normalizeEmail(body.email) : null;
  const locale = body?.locale === 'hi' ? 'hi' : 'en';
  if (!email) return NextResponse.json({ error: 'Valid email required' }, { status: 400 });

  try {
    const emailHash = keyedHash(email, 'otp-email-v1');
    const emailLimit = await consumeRateLimit(emailHash, 'otp_send', 3, 3_600);
    const networkKey = requestNetworkKey(request);
    const networkAllowed = networkKey
      ? (await consumeRateLimit(networkKey, 'otp_send_network', 10, 3_600)).allowed
      : true;
    if (!emailLimit.allowed || !networkAllowed) {
      return NextResponse.json({ error: 'Too many code requests' }, { status: 429 });
    }

    const code = randomInt(0, 1_000_000).toString().padStart(6, '0');
    const codeHash = keyedHash(`${emailHash}:${code}`, 'otp-code-v1');
    const service = getServiceSupabaseClient();
    const { data: otpId, error } = await service.rpc('issue_otp_code', {
      p_email_hash: emailHash,
      p_code_hash: codeHash,
      p_expires_at: new Date(Date.now() + 10 * 60_000).toISOString(),
      p_min_interval_seconds: 60,
    });
    if (error) return NextResponse.json({ error: 'Unable to send code' }, { status: 503 });
    if (typeof otpId !== 'string') {
      return NextResponse.json({ error: 'Please wait before requesting another code' }, { status: 429 });
    }

    if (!await sendOTPEmail(email, code, locale)) {
      await service.from('otp_codes').delete().eq('id', otpId).eq('code_hash', codeHash);
      return NextResponse.json({ error: 'Email delivery unavailable' }, { status: 503 });
    }

    return NextResponse.json({ success: true, message: 'Code sent' });
  } catch {
    return NextResponse.json({ error: 'Verification service unavailable' }, { status: 503 });
  }
}
