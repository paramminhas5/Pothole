import 'server-only';

import { createHmac, timingSafeEqual } from 'node:crypto';

function signingSecret(): string {
  const secret = (process.env.SESSION_SIGNING_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY)?.trim();
  if (!secret || secret.length < 32) {
    throw new Error('A server signing secret of at least 32 characters is required');
  }
  return secret;
}

export function keyedHash(value: string, purpose: string): string {
  return createHmac('sha256', signingSecret())
    .update(`${purpose}\0${value}`, 'utf8')
    .digest('hex');
}

export function constantTimeEqual(left: string, right: string): boolean {
  const leftDigest = createHmac('sha256', signingSecret()).update(left, 'utf8').digest();
  const rightDigest = createHmac('sha256', signingSecret()).update(right, 'utf8').digest();
  return timingSafeEqual(leftDigest, rightDigest);
}
