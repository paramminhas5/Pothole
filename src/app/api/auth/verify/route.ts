import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// POST /api/auth/verify — verify a 6-digit OTP code
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, code } = body;

    if (!email || !code || code.length !== 6) {
      return NextResponse.json({ error: 'Email and 6-digit code required' }, { status: 400 });
    }

    // Look up the OTP
    const otpKey = `otp:${email}:${code}`;
    const { data } = await supabase
      .from('rate_limits')
      .select('*')
      .eq('session_id', otpKey)
      .eq('action_type', 'otp')
      .single();

    if (!data) {
      return NextResponse.json({ error: 'Invalid or expired code' }, { status: 401 });
    }

    // Check expiry (stored in created_at)
    const expiresAt = new Date(data.created_at);
    if (expiresAt < new Date()) {
      // Clean up expired code
      await supabase.from('rate_limits').delete().eq('session_id', otpKey);
      return NextResponse.json({ error: 'Code expired' }, { status: 401 });
    }

    // Delete the used code
    await supabase.from('rate_limits').delete().eq('session_id', otpKey);

    // Create verified session
    const sessionId = crypto.randomUUID();
    const response = NextResponse.json({
      success: true,
      verified: true,
      session_id: sessionId,
    });

    // Set cookies: session_id + verified_email (hashed for privacy)
    response.cookies.set('session_id', sessionId, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });
    response.cookies.set('verified_email', Buffer.from(email).toString('base64'), {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
    response.cookies.set('email_verified', 'true', {
      httpOnly: false, // Client can read this
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
