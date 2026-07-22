// ============================================
// PROOF-OF-WORK ANTI-SPAM
// ============================================
// Instead of email OTP (costs money) or CAPTCHAs (third-party dependency),
// we use a client-side SHA-256 puzzle. The client must find a nonce such that
// SHA-256(challenge + nonce) starts with N zero bits.
//
// Difficulty 18 = ~1-3 seconds on a phone, ~0.5s on desktop
// Difficulty 20 = ~5-10 seconds on a phone (use for urgent posts)
// This is free, requires no third party, and rate-limits bots computationally.
//
// For a bot to spam 1000 posts, they'd need ~1000-3000 seconds of compute.
// For a real user posting 1 thing, it's a 2-second wait.

export const POW_DIFFICULTY = 18; // bits of leading zeros required
export const POW_DIFFICULTY_URGENT = 16; // easier for urgent (speed matters)
export const POW_CHALLENGE_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes

// Generate a challenge (server-side)
export function generateChallenge(): { challenge: string; timestamp: number } {
  const timestamp = Date.now();
  const random = crypto.randomUUID();
  const challenge = `sahayata:${timestamp}:${random}`;
  return { challenge, timestamp };
}

// Verify a proof-of-work solution (server-side)
export async function verifyProofOfWork(
  challenge: string,
  nonce: number,
  difficulty: number = POW_DIFFICULTY
): Promise<boolean> {
  // Check challenge format
  if (!challenge.startsWith('sahayata:')) return false;

  // Check timestamp (challenge must be recent)
  const parts = challenge.split(':');
  const timestamp = parseInt(parts[1], 10);
  if (isNaN(timestamp) || Date.now() - timestamp > POW_CHALLENGE_EXPIRY_MS) {
    return false; // Expired challenge
  }

  // Verify the hash
  const data = `${challenge}:${nonce}`;
  const encoder = new TextEncoder();
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(data));
  const hashArray = new Uint8Array(hashBuffer);

  // Check leading zero bits
  let zeroBits = 0;
  for (const byte of hashArray) {
    if (byte === 0) {
      zeroBits += 8;
    } else {
      // Count leading zeros in this byte
      let b = byte;
      while ((b & 0x80) === 0 && zeroBits < difficulty) {
        zeroBits++;
        b <<= 1;
      }
      break;
    }
    if (zeroBits >= difficulty) break;
  }

  return zeroBits >= difficulty;
}
