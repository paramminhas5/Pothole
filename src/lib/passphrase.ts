// Passphrase-based identity system — crypto-wallet style auth.
// No email. No phone. Just 6 words = your identity forever.

// BIP39-inspired wordlist (English, 256 common words for memorable phrases)
// Full implementation would use 2048 words; this is a curated subset for clarity.
export const WORDLIST = [
  'ocean', 'tiger', 'sunset', 'laptop', 'freedom', 'river', 'mountain', 'candle',
  'garden', 'thunder', 'silver', 'falcon', 'forest', 'crystal', 'shadow', 'bridge',
  'copper', 'violet', 'horizon', 'marble', 'phoenix', 'lantern', 'temple', 'arrow',
  'anchor', 'breeze', 'canvas', 'desert', 'ember', 'glacier', 'harbor', 'island',
  'jungle', 'knight', 'lotus', 'mirror', 'nebula', 'orchid', 'prism', 'quartz',
  'rocket', 'sphinx', 'tower', 'velvet', 'whisper', 'zenith', 'bamboo', 'comet',
  'dagger', 'eclipse', 'flame', 'granite', 'ivory', 'jasmine', 'kayak', 'lemon',
  'magnet', 'nectar', 'olive', 'panther', 'ripple', 'saffron', 'timber', 'umbra',
  'vortex', 'walrus', 'xenon', 'yogurt', 'zephyr', 'atlas', 'beacon', 'cipher',
  'dawn', 'enigma', 'frost', 'gazelle', 'helmet', 'indigo', 'jewel', 'karma',
  'legend', 'mango', 'nimbus', 'oasis', 'pearl', 'quest', 'raven', 'storm',
  'trident', 'unity', 'voyage', 'wisdom', 'apex', 'blaze', 'coral', 'drift',
  'eagle', 'fern', 'globe', 'haste', 'iron', 'jade', 'kite', 'lunar',
  'moss', 'north', 'orbit', 'piano', 'ridge', 'silk', 'torch', 'urban',
  'valor', 'wheat', 'yarn', 'zinc', 'amber', 'bolt', 'cliff', 'delta',
  'echo', 'flint', 'glow', 'haven', 'ink', 'jolly', 'kelp', 'lava',
  'maple', 'nest', 'onyx', 'plume', 'rapid', 'sage', 'thorn', 'ultra',
  'vivid', 'wave', 'xray', 'yew', 'zero', 'acorn', 'bison', 'crane',
  'drum', 'elm', 'fox', 'grail', 'hawk', 'ice', 'jest', 'knot',
  'lily', 'myth', 'nova', 'oak', 'pond', 'quill', 'rose', 'star',
  'tide', 'urn', 'vine', 'wolf', 'axle', 'bloom', 'chalk', 'dove',
  'edge', 'fig', 'gem', 'harp', 'isle', 'jet', 'king', 'lark',
  'moon', 'note', 'owl', 'pine', 'ruby', 'snow', 'tusk', 'veil',
  'wren', 'yak', 'zen', 'arc', 'bay', 'cove', 'dusk', 'elk',
  'fawn', 'gust', 'hull', 'imp', 'jot', 'keg', 'log', 'mist',
  'nook', 'ore', 'peak', 'raft', 'seal', 'turf', 'vale', 'wax',
  'yam', 'zeal', 'ash', 'bark', 'clay', 'dew', 'eel', 'fin',
  'grit', 'hem', 'ivy', 'jig', 'kiln', 'lore', 'mule', 'nib',
  'oat', 'peg', 'rind', 'soot', 'tar', 'wick', 'ale', 'bud',
  'cap', 'den', 'eve', 'fir', 'gap', 'hut', 'inn', 'jar',
  'kit', 'lip', 'mat', 'nap', 'orb', 'pit', 'rim', 'sap',
  'tin', 'vet', 'web', 'yip', 'zip', 'ace', 'bid', 'cub',
];

export function generatePassphrase(wordCount = 6): string {
  const words: string[] = [];
  const array = new Uint32Array(wordCount);
  crypto.getRandomValues(array);
  for (let i = 0; i < wordCount; i++) {
    words.push(WORDLIST[array[i] % WORDLIST.length]);
  }
  return words.join(' ');
}

export function validatePassphrase(phrase: string): boolean {
  const words = phrase.trim().toLowerCase().split(/\s+/);
  if (words.length !== 6) return false;
  return words.every(w => WORDLIST.includes(w));
}

// Client-side key derivation: passphrase → deterministic hash
// Uses SubtleCrypto PBKDF2 (browser-native, no dependencies)
export async function deriveIdentityHash(passphrase: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(passphrase.trim().toLowerCase()),
    'PBKDF2',
    false,
    ['deriveBits']
  );
  const salt = encoder.encode('sahayata-identity-v1');
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    256
  );
  return Array.from(new Uint8Array(bits))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}
