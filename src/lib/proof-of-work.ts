import 'server-only';

import { createHash } from 'node:crypto';
import { constantTimeEqual, keyedHash } from './server-crypto';
import { getServiceSupabaseClient } from './supabase-server';

export const POW_DIFFICULTY = 18;
export const POW_DIFFICULTY_URGENT = 18;
export const POW_CHALLENGE_EXPIRY_MS = 5 * 60 * 1000;

export function generateChallenge(): { challenge: string; timestamp: number } {
  const timestamp = Date.now();
  const unsigned = `sahayata:${timestamp}:${crypto.randomUUID()}`;
  const signature = keyedHash(unsigned, 'pow-challenge-v1');
  return { challenge: `${unsigned}:${signature}`, timestamp };
}

export function hashChallenge(challenge: string): string {
  return createHash('sha256').update(challenge, 'utf8').digest('hex');
}

// Issuance is stateless and signed, so challenge requests cannot cause database writes.
export async function issueProofOfWorkChallenge(): Promise<{ challenge: string; timestamp: number }> {
  return generateChallenge();
}

export async function consumeProofOfWorkChallenge(challenge: string): Promise<boolean> {
  const { data, error } = await getServiceSupabaseClient().rpc('consume_pow_challenge', {
    p_challenge_hash: hashChallenge(challenge),
  });
  if (error) throw new Error('Unable to consume proof-of-work challenge');
  return data === true;
}

export async function verifyProofOfWork(
  challenge: string,
  nonce: number,
  difficulty: number = POW_DIFFICULTY
): Promise<boolean> {
  if (typeof challenge !== 'string' || challenge.length > 180 || !Number.isSafeInteger(nonce) || nonce < 0) {
    return false;
  }

  const parts = challenge.split(':');
  if (parts.length !== 4 || parts[0] !== 'sahayata') return false;
  const timestamp = Number(parts[1]);
  const age = Date.now() - timestamp;
  if (!Number.isFinite(timestamp) || age < 0 || age > POW_CHALLENGE_EXPIRY_MS) return false;

  const unsigned = parts.slice(0, 3).join(':');
  const expectedSignature = keyedHash(unsigned, 'pow-challenge-v1');
  if (!constantTimeEqual(parts[3], expectedSignature)) return false;

  const hashBuffer = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(`${challenge}:${nonce}`)
  );
  const hashArray = new Uint8Array(hashBuffer);

  let zeroBits = 0;
  for (const byte of hashArray) {
    if (byte === 0) {
      zeroBits += 8;
    } else {
      let value = byte;
      while ((value & 0x80) === 0) {
        zeroBits++;
        value <<= 1;
      }
      break;
    }
    if (zeroBits >= difficulty) break;
  }
  return zeroBits >= difficulty;
}
