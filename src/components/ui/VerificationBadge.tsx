'use client';

import type { VerificationStatus } from '@/types/database';

interface VerificationBadgeProps {
  status: VerificationStatus;
  verifiedWhat?: string;
  locale?: 'en' | 'hi';
}

const config: Record<VerificationStatus, { en: string; hi: string; color: string; icon: string }> = {
  unverified: { en: 'Unverified', hi: 'असत्यापित', color: 'text-[var(--ink-faint)] border-[var(--ink-faint)]', icon: '○' },
  self_claimed: { en: 'Self-claimed', hi: 'स्व-दावा', color: 'text-[var(--yellow)] border-[var(--yellow)]', icon: '◐' },
  community_vouched: { en: 'Community vouched', hi: 'समुदाय प्रमाणित', color: 'text-[var(--saffron)] border-[var(--saffron)]', icon: '◑' },
  staff_verified: { en: 'Staff verified', hi: 'स्टाफ सत्यापित', color: 'text-[var(--purple)] border-[var(--purple)]', icon: '●' },
};

export function VerificationBadge({ status, verifiedWhat, locale = 'en' }: VerificationBadgeProps) {
  const c = config[status];

  return (
    <span
      className={[
        'inline-flex items-center gap-1 px-2 py-0.5',
        'text-[10px] font-bold uppercase tracking-[var(--tracking-wider)]',
        'border rounded-[var(--radius-sm)]',
        c.color,
      ].join(' ')}
      title={verifiedWhat || undefined}
    >
      <span>{c.icon}</span>
      <span>{locale === 'hi' ? c.hi : c.en}</span>
    </span>
  );
}

export default VerificationBadge;
