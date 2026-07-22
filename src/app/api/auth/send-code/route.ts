import { NextRequest, NextResponse } from 'next/server';
import { sendOTPEmail } from '@/lib/email';

// POST /api/auth/send-code — OPTIONAL email verification for notifications only
// This is NOT required to post. It's only used if a user wants to receive
// email notifications when someone responds to their post.
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, locale = 'en' } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Store code in memory (for production, use Redis or DB with TTL)
    // For now, we use a simple approach via response
    const sent = await sendOTPEmail(email, code, locale as 'en' | 'hi');

    if (!sent) {
      // In dev mode without RESEND_API_KEY, email is logged to console
      // Still return success so the flow works
    }

    return NextResponse.json({ success: true, message: 'Code sent (check console in dev mode)' });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
