'use client';

import { useState, useCallback } from 'react';
import { generatePassphrase, validatePassphrase, deriveIdentityHash } from '@/lib/passphrase';

interface Identity {
  id: string;
  displayName: string;
  role: string;
  isNew: boolean;
}

interface PassphraseAuthProps {
  onAuthenticated: (identity: Identity) => void;
  onClose: () => void;
  locale: 'en' | 'hi';
}

export default function PassphraseAuth({ onAuthenticated, onClose, locale }: PassphraseAuthProps) {
  const hi = locale === 'hi';
  const [mode, setMode] = useState<'choose' | 'generate' | 'enter'>('choose');
  const [phrase, setPhrase] = useState('');
  const [inputPhrase, setInputPhrase] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = useCallback(() => {
    setPhrase(generatePassphrase());
    setMode('generate');
    setConfirmed(false);
  }, []);

  async function authenticate(passphrase: string) {
    setLoading(true);
    setError('');
    try {
      const hash = await deriveIdentityHash(passphrase);
      const res = await fetch('/api/auth/passphrase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passphrase_hash: hash }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || (hi ? 'प्रमाणीकरण विफल' : 'Authentication failed'));
        return;
      }
      const data = await res.json();
      // Store hash locally for session persistence
      localStorage.setItem('sahayata_identity_hash', hash);
      localStorage.setItem('sahayata_identity', JSON.stringify(data.identity));
      onAuthenticated(data.identity);
    } catch {
      setError(hi ? 'नेटवर्क त्रुटि' : 'Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div className="shortcut-dialog" onClick={(e) => e.stopPropagation()} role="dialog" aria-label={hi ? 'पहचान' : 'Identity'}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 className="heading-3">{hi ? '🔐 आपकी पहचान' : '🔐 Your Identity'}</h2>
          <button type="button" onClick={onClose} className="brutal-btn brutal-btn-sm">✕</button>
        </div>

        {mode === 'choose' && (
          <div style={{ display: 'grid', gap: '12px' }}>
            <p className="text-sm text-[var(--color-text-muted)]">
              {hi ? 'क्रिप्टो वॉलेट जैसा: 6 शब्द = आपकी पहचान। कोई ईमेल नहीं। कोई फोन नहीं। कोई ट्रैकिंग नहीं।' : 'Like a crypto wallet: 6 words = your identity. No email. No phone. No tracking.'}
            </p>
            <button type="button" onClick={handleGenerate} className="brutal-btn brutal-btn-primary brutal-btn-lg w-full">
              {hi ? '✨ नई पहचान बनाएँ' : '✨ Create New Identity'}
            </button>
            <button type="button" onClick={() => setMode('enter')} className="brutal-btn brutal-btn-lg w-full">
              {hi ? '🔑 मेरा पासफ्रेज़ दर्ज करें' : '🔑 Enter My Passphrase'}
            </button>
            <p className="text-xs text-center text-[var(--color-text-muted)]">
              {hi ? 'पहचान के बिना भी सब कुछ काम करता है — यह सिर्फ आपकी माँगों/योगदान को ट्रैक करने के लिए है।' : 'Everything works without identity — this just tracks your demands/contributions.'}
            </p>
          </div>
        )}

        {mode === 'generate' && (
          <div style={{ display: 'grid', gap: '16px' }}>
            <div style={{ padding: '20px', background: 'var(--color-surface-alt)', borderRadius: '8px', border: '2px solid var(--color-border)', textAlign: 'center' }}>
              <p style={{ fontFamily: 'monospace', fontSize: '1.3rem', fontWeight: 800, letterSpacing: '0.05em', lineHeight: 1.8 }}>
                {phrase}
              </p>
            </div>
            <div style={{ padding: '12px', background: 'rgba(239,68,68,0.1)', borderRadius: '8px', border: '1px solid rgba(239,68,68,0.3)' }}>
              <p className="text-sm" style={{ fontWeight: 700 }}>
                {hi ? '⚠️ इन 6 शब्दों को लिख लें। यह आपकी एकमात्र कुंजी है।' : '⚠️ Write down these 6 words. This is your ONLY key.'}
              </p>
              <p className="text-xs" style={{ marginTop: '4px', opacity: 0.8 }}>
                {hi ? 'खो गया = एक्सेस गया। हम इसे रिकवर नहीं कर सकते।' : 'Lose it = lose access. We CANNOT recover it.'}
              </p>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} style={{ width: '20px', height: '20px' }} />
              <span className="text-sm" style={{ fontWeight: 700 }}>
                {hi ? 'मैंने लिख लिया है' : 'I wrote it down'}
              </span>
            </label>
            {error && <p className="error-message text-sm">{error}</p>}
            <button type="button" disabled={!confirmed || loading} onClick={() => authenticate(phrase)} className="brutal-btn brutal-btn-primary brutal-btn-lg w-full">
              {loading ? (hi ? 'सत्यापित हो रहा...' : 'Verifying...') : (hi ? '✓ सक्रिय करें' : '✓ Activate Identity')}
            </button>
            <button type="button" onClick={handleGenerate} className="brutal-btn brutal-btn-sm" style={{ justifySelf: 'center' }}>
              {hi ? '🔄 नया पासफ्रेज़' : '🔄 New Passphrase'}
            </button>
          </div>
        )}

        {mode === 'enter' && (
          <div style={{ display: 'grid', gap: '16px' }}>
            <p className="text-sm text-[var(--color-text-muted)]">
              {hi ? 'अपने 6 शब्द दर्ज करें (स्पेस से अलग):' : 'Enter your 6 words (separated by spaces):'}
            </p>
            <input
              type="text"
              value={inputPhrase}
              onChange={(e) => setInputPhrase(e.target.value.toLowerCase())}
              placeholder={hi ? 'ocean tiger sunset laptop freedom river' : 'ocean tiger sunset laptop freedom river'}
              className="brutal-input"
              style={{ fontFamily: 'monospace', fontSize: '1.1rem' }}
              autoComplete="off"
              autoFocus
            />
            {inputPhrase && !validatePassphrase(inputPhrase) && (
              <p className="text-xs" style={{ color: 'var(--color-red)' }}>
                {hi ? '6 मान्य शब्द चाहिए (स्पेस से अलग)' : 'Need 6 valid words (separated by spaces)'}
              </p>
            )}
            {error && <p className="error-message text-sm">{error}</p>}
            <button type="button" disabled={!validatePassphrase(inputPhrase) || loading} onClick={() => authenticate(inputPhrase)} className="brutal-btn brutal-btn-primary brutal-btn-lg w-full">
              {loading ? (hi ? 'सत्यापित हो रहा...' : 'Verifying...') : (hi ? '🔓 अनलॉक' : '🔓 Unlock')}
            </button>
            <button type="button" onClick={() => setMode('choose')} className="text-link text-sm" style={{ justifySelf: 'center' }}>
              {hi ? '← वापस' : '← Back'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
