import 'server-only';

import type { NextRequest } from 'next/server';
import { getServiceSupabaseClient } from './supabase-server';
import { keyedHash } from './server-crypto';

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
}

export async function consumeRateLimit(
  identifier: string,
  actionType: string,
  limit: number,
  windowSeconds: number
): Promise<RateLimitResult> {
  if (!identifier || identifier.length > 200 || !/^[a-z0-9:_-]+$/i.test(actionType)) {
    throw new Error('Invalid rate-limit parameters');
  }

  const { data, error } = await getServiceSupabaseClient().rpc('consume_rate_limit', {
    p_identifier: identifier,
    p_action_type: actionType,
    p_limit: limit,
    p_window_seconds: windowSeconds,
  });

  if (error) throw new Error('Rate-limit service unavailable');
  const row = Array.isArray(data) ? data[0] : data;
  if (!row || typeof row.allowed !== 'boolean') throw new Error('Invalid rate-limit response');
  return { allowed: row.allowed, remaining: Number(row.remaining) || 0 };
}

export function requestNetworkKey(request: NextRequest): string | null {
  // Read a client address only from a deployment proxy that is explicitly known to
  // overwrite the corresponding header. Unknown production proxies fail closed.
  let raw = '';
  if (process.env.VERCEL === '1') {
    raw = request.headers.get('x-forwarded-for')?.split(',')[0] || '';
  } else if (process.env.CF_PAGES === '1') {
    raw = request.headers.get('cf-connecting-ip') || '';
  } else if (process.env.NODE_ENV !== 'production') {
    raw = request.headers.get('x-forwarded-for')?.split(',')[0] || 'local-development';
  }
  const address = raw.trim().slice(0, 128);
  return address ? keyedHash(address, 'rate-limit-network-v1') : null;
}

export async function enforceRateLimits(
  request: NextRequest,
  sessionId: string,
  actionType: string,
  limit: number,
  windowSeconds: number
): Promise<boolean> {
  const sessionResult = await consumeRateLimit(
    keyedHash(sessionId, 'rate-limit-session-v1'),
    actionType,
    limit,
    windowSeconds
  );
  if (!sessionResult.allowed) return false;

  const networkKey = requestNetworkKey(request);
  if (!networkKey) return process.env.NODE_ENV !== 'production';
  const networkResult = await consumeRateLimit(
    networkKey,
    `${actionType}_network`,
    Math.max(limit * 3, limit + 2),
    windowSeconds
  );
  return networkResult.allowed;
}

// Compatibility wrappers for existing server code. New routes should use enforceRateLimits.
export async function checkRateLimit(
  sessionId: string,
  actionType: 'post' | 'urgent' | 'chapter_submit'
): Promise<RateLimitResult> {
  const isUrgent = actionType === 'urgent';
  return consumeRateLimit(
    keyedHash(sessionId, 'rate-limit-session-v1'),
    actionType,
    isUrgent ? 2 : 5,
    isUrgent ? 86_400 : 3_600
  );
}

export async function recordRateLimit(): Promise<void> {
  // consumeRateLimit atomically checks and records; retained only to avoid unsafe split callers.
}
