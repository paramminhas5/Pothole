/**
 * Client-side encryption utilities using Web Crypto API.
 * AES-256-GCM with PBKDF2 key derivation from passphrase.
 * All encryption/decryption happens in the browser — server never sees plaintext.
 */

const SALT_LENGTH = 16;
const IV_LENGTH = 12;
const PBKDF2_ITERATIONS = 100_000;

/** Derive an AES-256-GCM key from a passphrase and salt using PBKDF2. */
async function deriveKey(passphrase: string, salt: Uint8Array): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(passphrase),
    { name: 'PBKDF2' } as Algorithm,
    false,
    ['deriveKey'] as KeyUsage[]
  );
  const params: Pbkdf2Params = { name: 'PBKDF2', salt: salt as unknown as BufferSource, iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' };
  const derived: AesDerivedKeyParams = { name: 'AES-GCM', length: 256 };
  return crypto.subtle.deriveKey(params, keyMaterial, derived, false, ['encrypt', 'decrypt'] as KeyUsage[]);
}

/** Encrypt plaintext string with a passphrase. Returns base64 string (salt + iv + ciphertext). */
export async function encrypt(plaintext: string, passphrase: string): Promise<string> {
  const encoder = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  const key = await deriveKey(passphrase, salt);
  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoder.encode(plaintext)
  );
  // Concatenate: salt (16) + iv (12) + ciphertext
  const combined = new Uint8Array(salt.length + iv.length + new Uint8Array(ciphertext).length);
  combined.set(salt, 0);
  combined.set(iv, salt.length);
  combined.set(new Uint8Array(ciphertext), salt.length + iv.length);
  return btoa(String.fromCharCode(...combined));
}

/** Decrypt a base64 encrypted string with a passphrase. */
export async function decrypt(encryptedBase64: string, passphrase: string): Promise<string> {
  const combined = Uint8Array.from(atob(encryptedBase64), (c) => c.charCodeAt(0));
  const salt = combined.slice(0, SALT_LENGTH);
  const iv = combined.slice(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
  const ciphertext = combined.slice(SALT_LENGTH + IV_LENGTH);
  const key = await deriveKey(passphrase, salt);
  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    ciphertext
  );
  return new TextDecoder().decode(decrypted);
}

/** Encrypt a file (ArrayBuffer) with a passphrase. Returns Uint8Array (salt + iv + ciphertext). */
export async function encryptFile(data: ArrayBuffer, passphrase: string): Promise<Uint8Array> {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  const key = await deriveKey(passphrase, salt);
  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, data);
  const combined = new Uint8Array(salt.length + iv.length + new Uint8Array(ciphertext).length);
  combined.set(salt, 0);
  combined.set(iv, salt.length);
  combined.set(new Uint8Array(ciphertext), salt.length + iv.length);
  return combined;
}

/** Decrypt a file (Uint8Array) with a passphrase. Returns ArrayBuffer. */
export async function decryptFile(encrypted: Uint8Array, passphrase: string): Promise<ArrayBuffer> {
  const salt = encrypted.slice(0, SALT_LENGTH);
  const iv = encrypted.slice(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
  const ciphertext = encrypted.slice(SALT_LENGTH + IV_LENGTH);
  const key = await deriveKey(passphrase, salt);
  return crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ciphertext);
}

/** Generate SHA-256 hash of data for tamper evidence. Returns hex string. */
export async function sha256Hash(data: ArrayBuffer): Promise<string> {
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, '0')).join('');
}
