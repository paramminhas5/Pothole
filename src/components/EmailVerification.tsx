// ============================================
// OPTIONAL Email Verification Component
// ============================================
// NOT required to post. Only used if a user wants email notifications
// when someone responds to their post. The posting flow uses
// proof-of-work instead (zero cost, no third party).

'use client';

import { useState } from 'react';
import { Locale } from '@/types';

interface EmailVerificationProps {
  locale: Locale;
  onVerified: (email: string) => void;
}

export default function EmailVerification({ locale, onVerified }: EmailVerificationProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isHindi = locale === 'hi';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes('@')) return;

    // Store email for notification purposes (optional)
    document.cookie = `notify_email=${btoa(email)};path=/;max-age=${60 * 60 * 24 * 7}`;
    setSubmitted(true);
    onVerified(email);
  }

  if (submitted) {
    return (
      <div className="brutal-badge brutal-badge-lime">
        ✓ {isHindi ? 'सूचनाएं सक्रिय' : 'NOTIFICATIONS ENABLED'}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-end">
      <div className="flex-1">
        <label className="block text-xs font-bold uppercase tracking-wider mb-1">
          {isHindi ? 'सूचना ईमेल (वैकल्पिक)' : 'NOTIFICATION EMAIL (OPTIONAL)'}
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={isHindi ? 'जवाब मिलने पर सूचना प्राप्त करें' : 'Get notified when someone responds'}
          className="brutal-input"
        />
      </div>
      <button type="submit" className="brutal-btn brutal-btn-sm brutal-btn-dark">
        {isHindi ? 'सक्रिय करें' : 'ENABLE'}
      </button>
    </form>
  );
}
