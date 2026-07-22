import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendOTPEmail } from '@/lib/email';

// POST /api/auth/send-code — send a 6-digit OTP to an email address
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, locale = 'en' } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 minutes

    // Store in rate_limits table (reusing for simplicity)
    // In production, you'd have a dedicated otp_codes table
    await supabase.from('rate_limits').insert({
      session_id: `otp:${email}:${code}`,
      action_type: 'otp',
      created_at: expiresAt, // Storing expiry in created_at for simplicity
    });

    // Send email
    const sent = await sendOTPEmail(email, code, locale as 'en' | 'hi');

    if (!sent) {
      return NextResponse.json({ error: 'Failed to send code' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Code sent' });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
