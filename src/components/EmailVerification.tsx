'use client';

import { useState } from 'react';
import { Locale } from '@/types';

interface Props { locale: Locale; onVerified?: (email: string) => void }
type Phase = 'email' | 'code' | 'verified';

export default function EmailVerification({ locale, onVerified }: Props) {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [phase, setPhase] = useState<Phase>('email');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const hi = locale === 'hi';

  async function requestCode(event: React.FormEvent) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError('');
    try {
      const response = await fetch('/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale }),
      });
      if (!response.ok) throw new Error('send failed');
      setPhase('code');
    } catch {
      setError(hi ? 'कोड नहीं भेजा गया। ईमेल जाँचें और फिर कोशिश करें।' : 'The code was not sent. Check the email and try again.');
    } finally {
      setBusy(false);
    }
  }

  async function verifyCode(event: React.FormEvent) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError('');
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });
      if (!response.ok) throw new Error('verify failed');
      setPhase('verified');
      onVerified?.(email);
    } catch {
      setError(hi ? 'कोड गलत है या समाप्त हो गया है। नया कोड माँगें।' : 'The code is wrong or expired. Request a new code.');
    } finally {
      setBusy(false);
    }
  }

  if (phase === 'verified') {
    return <p className="success-message" role="status">{hi ? 'ईमेल की पुष्टि हो गई।' : 'Email verified.'}</p>;
  }

  if (phase === 'email') {
    return (
      <form onSubmit={requestCode} className="stack-form">
        <label htmlFor="notification-email">
          <span className="field-label">{hi ? 'सूचना ईमेल (वैकल्पिक)' : 'Notification email (optional)'}</span>
          <input id="notification-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" className="brutal-input" />
        </label>
        <p className="field-help">{hi ? 'हम छह अंकों का एक बार उपयोग होने वाला कोड भेजेंगे। ईमेल ब्राउज़र कुकी में सेव नहीं होगा।' : 'We will send a one-time six-digit code. The email is not stored in a browser cookie.'}</p>
        {error && <p className="error-message" role="alert">{error}</p>}
        <button type="submit" disabled={busy} className="brutal-btn brutal-btn-dark">{busy ? (hi ? 'भेज रहे हैं…' : 'Sending…') : (hi ? 'कोड भेजें' : 'Send code')}</button>
      </form>
    );
  }

  return (
    <form onSubmit={verifyCode} className="stack-form">
      <p className="field-help">{hi ? `${email} पर भेजा गया छह अंकों का कोड लिखें।` : `Enter the six-digit code sent to ${email}.`}</p>
      <label htmlFor="notification-code">
        <span className="field-label">{hi ? 'सत्यापन कोड' : 'Verification code'}</span>
        <input id="notification-code" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))} required className="brutal-input" />
      </label>
      {error && <p className="error-message" role="alert">{error}</p>}
      <div className="button-row">
        <button type="submit" disabled={busy || code.length !== 6} className="brutal-btn brutal-btn-dark">{busy ? (hi ? 'जाँच रहे हैं…' : 'Checking…') : (hi ? 'कोड जाँचें' : 'Verify code')}</button>
        <button type="button" onClick={() => { setPhase('email'); setCode(''); setError(''); }} className="brutal-btn">{hi ? 'ईमेल बदलें' : 'Change email'}</button>
      </div>
    </form>
  );
}
