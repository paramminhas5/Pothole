'use client';

import { useState, useEffect } from 'react';
import { Locale } from '@/types';

interface EmailVerificationProps {
  locale: Locale;
  onVerified: () => void;
  children: React.ReactNode;
}

export default function EmailVerification({ locale, onVerified, children }: EmailVerificationProps) {
  const [isVerified, setIsVerified] = useState(false);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isHindi = locale === 'hi';

  useEffect(() => {
    // Check if already verified via cookie
    const verified = document.cookie.includes('email_verified=true');
    if (verified) {
      setIsVerified(true);
      onVerified();
    }
  }, [onVerified]);

  async function handleSendCode(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes('@')) return;

    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale }),
      });
      if (res.ok) {
        setStep('code');
      } else {
        setError(isHindi ? 'कोड भेजने में विफल। पुनः प्रयास करें।' : 'Failed to send code. Try again.');
      }
    } catch {
      setError(isHindi ? 'कुछ गलत हो गया।' : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyCode(e: React.FormEvent) {
    e.preventDefault();
    if (code.length !== 6) return;

    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });
      if (res.ok) {
        setIsVerified(true);
        onVerified();
      } else {
        const data = await res.json();
        setError(data.error === 'Code expired'
          ? (isHindi ? 'कोड समाप्त हो गया। नया कोड भेजें।' : 'Code expired. Send a new one.')
          : (isHindi ? 'गलत कोड। पुनः प्रयास करें।' : 'Invalid code. Try again.'));
      }
    } catch {
      setError(isHindi ? 'कुछ गलत हो गया।' : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  if (isVerified) {
    return <>{children}</>;
  }

  return (
    <div className="brutal-card !border-[var(--color-accent)] !shadow-[5px_5px_0px_var(--color-accent)]">
      <div className="brutal-badge brutal-badge-accent mb-4">
        {isHindi ? 'सत्यापन आवश्यक' : 'VERIFICATION REQUIRED'}
      </div>
      <h3 className="heading-3 mb-2">
        {isHindi ? 'पोस्ट करने के लिए ईमेल सत्यापित करें' : 'Verify Email to Post'}
      </h3>
      <p className="text-sm text-[var(--color-text-muted)] mb-6">
        {isHindi
          ? 'स्पैम रोकने और विश्वास बनाने के लिए हम एक सरल ईमेल सत्यापन करते हैं। आपका ईमेल कभी सार्वजनिक नहीं किया जाएगा।'
          : 'We require a simple email verification to prevent spam and build trust. Your email is never shared publicly.'}
      </p>

      {step === 'email' ? (
        <form onSubmit={handleSendCode} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">
              {isHindi ? 'ईमेल पता' : 'EMAIL ADDRESS'}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={isHindi ? 'your@email.com' : 'your@email.com'}
              required
              className="brutal-input"
              autoComplete="email"
            />
            <p className="text-xs text-[var(--color-text-muted)] mt-1">
              {isHindi ? 'हम एक 6-अंकीय कोड भेजेंगे। 10 मिनट में समाप्त।' : 'We\'ll send a 6-digit code. Expires in 10 minutes.'}
            </p>
          </div>
          <button type="submit" disabled={loading} className="brutal-btn brutal-btn-primary w-full">
            {loading
              ? (isHindi ? 'भेज रहे हैं...' : 'SENDING...')
              : (isHindi ? 'कोड भेजें' : 'SEND CODE')}
          </button>
          {error && <p className="text-sm text-[var(--color-red)] font-bold">{error}</p>}
        </form>
      ) : (
        <form onSubmit={handleVerifyCode} className="space-y-4">
          <p className="text-sm">
            {isHindi ? `कोड भेजा गया: ${email}` : `Code sent to: ${email}`}
          </p>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">
              {isHindi ? '6-अंकीय कोड' : '6-DIGIT CODE'}
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="000000"
              required
              maxLength={6}
              className="brutal-input text-center text-2xl font-mono tracking-[8px]"
              autoComplete="one-time-code"
              inputMode="numeric"
            />
          </div>
          <button type="submit" disabled={loading || code.length !== 6} className="brutal-btn brutal-btn-dark w-full">
            {loading
              ? (isHindi ? 'सत्यापित कर रहे हैं...' : 'VERIFYING...')
              : (isHindi ? 'सत्यापित करें' : 'VERIFY')}
          </button>
          <button
            type="button"
            onClick={() => { setStep('email'); setCode(''); setError(''); }}
            className="brutal-btn brutal-btn-sm w-full"
          >
            {isHindi ? 'कोड दोबारा भेजें' : 'RESEND CODE'}
          </button>
          {error && <p className="text-sm text-[var(--color-red)] font-bold">{error}</p>}
        </form>
      )}
    </div>
  );
}
