import { NextRequest, NextResponse } from 'next/server';
import {
  clearAdminSessionCookie,
  isAdminRequest,
  setAdminSessionCookie,
  verifyAdminSecret,
} from '@/lib/admin-auth';
import { consumeRateLimit, requestNetworkKey } from '@/lib/rate-limit';
import { keyedHash } from '@/lib/server-crypto';
import { cleanString, parseJsonObject } from '@/lib/validation';

export async function GET(request: NextRequest) {
  return NextResponse.json(
    { authenticated: isAdminRequest(request) },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}

export async function POST(request: NextRequest) {
  const body = await parseJsonObject(request, 2_000);
  const secret = body ? cleanString(body.secret, 512, 24) : null;
  if (!secret) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

  try {
    const identifier = requestNetworkKey(request) || keyedHash('unknown-network', 'admin-login-v1');
    const limit = await consumeRateLimit(identifier, 'admin_login', 10, 3_600);
    if (!limit.allowed) return NextResponse.json({ error: 'Try again later' }, { status: 429 });
    if (!verifyAdminSecret(secret)) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    const response = NextResponse.json({ authenticated: true });
    setAdminSessionCookie(response);
    return response;
  } catch {
    return NextResponse.json({ error: 'Authentication service unavailable' }, { status: 503 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ authenticated: false });
  clearAdminSessionCookie(response);
  return response;
}
