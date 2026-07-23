import 'server-only';

import type { NextRequest, NextResponse } from 'next/server';
import { constantTimeEqual, keyedHash } from './server-crypto';

const SESSION_COOKIE = 'session_id';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export interface SessionCapability {
  id: string;
  token: string;
}

function signSessionId(id: string): string {
  return keyedHash(id, 'session-cookie-v1');
}

export function createSessionCapability(): SessionCapability {
  const id = crypto.randomUUID();
  return { id, token: `${id}.${signSessionId(id)}` };
}

export function verifySessionToken(token: string | undefined): string | null {
  if (!token || token.length > 160) return null;
  const separator = token.indexOf('.');
  if (separator < 0) return null;

  const id = token.slice(0, separator);
  const signature = token.slice(separator + 1);
  if (!UUID_PATTERN.test(id) || !/^[0-9a-f]{64}$/i.test(signature)) return null;

  return constantTimeEqual(signature, signSessionId(id)) ? id : null;
}

export function readRequestSessionId(request: NextRequest): string | null {
  return verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);
}

export function getOrCreateRequestSession(request: NextRequest): SessionCapability & { isNew: boolean } {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const id = verifySessionToken(token);
  if (id && token) return { id, token, isNew: false };
  return { ...createSessionCapability(), isNew: true };
}

export function setSessionCookie(response: NextResponse, token: string, maxAge = SESSION_MAX_AGE_SECONDS): void {
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge,
    path: '/',
  });
}
