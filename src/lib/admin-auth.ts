import 'server-only';

import type { NextRequest, NextResponse } from 'next/server';
import { createHash, randomUUID, timingSafeEqual } from 'node:crypto';
import { constantTimeEqual, keyedHash } from './server-crypto';

const ADMIN_SESSION_COOKIE = 'sahayata_admin_session';
const ADMIN_SESSION_SECONDS = 60 * 60 * 12;

function digest(value: string): Buffer {
  return createHash('sha256').update(value, 'utf8').digest();
}

export function verifyAdminSecret(supplied: string): boolean {
  const configured = process.env.ADMIN_SECRET?.trim();
  if (!configured || configured.length < 24 || !supplied) return false;
  return timingSafeEqual(digest(configured), digest(supplied));
}

function createAdminSessionToken(): string {
  const expiresAt = Math.floor(Date.now() / 1000) + ADMIN_SESSION_SECONDS;
  const payload = `${expiresAt}.${randomUUID()}`;
  return `${payload}.${keyedHash(payload, 'admin-session-v1')}`;
}

function verifyAdminSessionToken(token: string | undefined): boolean {
  if (!token || token.length > 220) return false;
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  const [expires, nonce, signature] = parts;
  const expiresAt = Number(expires);
  if (!Number.isSafeInteger(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000)) return false;
  if (!/^[0-9a-f-]{36}$/i.test(nonce) || !/^[0-9a-f]{64}$/i.test(signature)) return false;
  return constantTimeEqual(signature, keyedHash(`${expires}.${nonce}`, 'admin-session-v1'));
}

export function isAdminRequest(request: NextRequest): boolean {
  return verifyAdminSessionToken(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);
}

export function setAdminSessionCookie(response: NextResponse): void {
  response.cookies.set(ADMIN_SESSION_COOKIE, createAdminSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: ADMIN_SESSION_SECONDS,
    path: '/api/admin',
  });
}

export function clearAdminSessionCookie(response: NextResponse): void {
  response.cookies.set(ADMIN_SESSION_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/api/admin',
  });
}
