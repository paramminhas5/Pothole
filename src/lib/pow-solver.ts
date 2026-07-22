// ============================================
// PROOF-OF-WORK SOLVER (CLIENT-SIDE)
// ============================================
// Runs in the browser. Finds a nonce such that
// SHA-256(challenge + ":" + nonce) has N leading zero bits.
// Uses Web Crypto API (available in all modern browsers).
//
// On a mid-range phone: ~1-3 seconds for difficulty 18
// On desktop: ~0.3-0.8 seconds for difficulty 18

export async function solveProofOfWork(
  challenge: string,
  difficulty: number
): Promise<{ nonce: number; hash: string; timeMs: number }> {
  const start = performance.now();
  const encoder = new TextEncoder();
  let nonce = 0;
  const batchSize = 5000; // Check in batches to not block UI

  while (true) {
    // Process a batch
    for (let i = 0; i < batchSize; i++) {
      const data = `${challenge}:${nonce}`;
      const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(data));
      const hashArray = new Uint8Array(hashBuffer);

      // Check leading zero bits
      let zeroBits = 0;
      for (const byte of hashArray) {
        if (byte === 0) {
          zeroBits += 8;
        } else {
          let b = byte;
          while ((b & 0x80) === 0) {
            zeroBits++;
            b <<= 1;
          }
          break;
        }
        if (zeroBits >= difficulty) break;
      }

      if (zeroBits >= difficulty) {
        const timeMs = performance.now() - start;
        // Convert hash to hex for display
        const hashHex = Array.from(hashArray)
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('');
        return { nonce, hash: hashHex, timeMs };
      }

      nonce++;
    }

    // Yield to the event loop between batches (keep UI responsive)
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
}
