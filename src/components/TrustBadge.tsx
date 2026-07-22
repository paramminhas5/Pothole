'use client';

import { useState } from 'react';

interface TrustBadgeProps {
  tier: 'self_listed' | 'community_vouched' | 'org_verified';
  vouchCount?: number;
  locale: 'en' | 'hi';
}

const TIER_CONFIG = {
  org_verified: {
    labelEn: 'ORG-VERIFIED',
    labelHi: 'संगठन-सत्यापित',
    color: 'brutal-badge-lime',
    icon: '✓✓',
    descEn: 'Verified by a known civil liberties organization (PUCL, PUDR, CJP, or similar).',
    descHi: 'एक ज्ञात नागरिक स्वतंत्रता संगठन (PUCL, PUDR, CJP) द्वारा सत्यापित।',
  },
  community_vouched: {
    labelEn: 'COMMUNITY-VOUCHED',
    labelHi: 'समुदाय-सत्यापित',
    color: 'brutal-badge-sky',
    icon: '✓',
    descEn: '3+ existing verified chapters have vouched for this group.',
    descHi: '3+ मौजूदा सत्यापित अध्यायों ने इस समूह की पुष्टि की है।',
  },
  self_listed: {
    labelEn: 'SELF-LISTED',
    labelHi: 'स्व-सूचीबद्ध',
    color: 'brutal-badge-yellow',
    icon: '○',
    descEn: 'Passed moderation review. Not yet vouched by other groups.',
    descHi: 'मॉडरेशन समीक्षा पास। अभी तक अन्य समूहों द्वारा पुष्टि नहीं।',
  },
};

export default function TrustBadge({ tier, vouchCount = 0, locale }: TrustBadgeProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const config = TIER_CONFIG[tier];
  const isHindi = locale === 'hi';

  return (
    <div className="relative inline-block">
      <button
        className={`brutal-badge ${config.color} cursor-help`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowTooltip(!showTooltip)}
        aria-label={`Trust level: ${config.labelEn}`}
      >
        {config.icon} {isHindi ? config.labelHi : config.labelEn}
        {vouchCount > 0 && ` (${vouchCount})`}
      </button>

      {showTooltip && (
        <div className="absolute z-50 bottom-full left-0 mb-2 w-64 p-3 bg-[var(--color-card)] border-[2.5px] border-[var(--color-border)] shadow-[4px_4px_0px_var(--color-border)] text-xs animate-slide-in">
          <p className="font-bold mb-1">{isHindi ? config.labelHi : config.labelEn}</p>
          <p className="text-[var(--color-text-muted)]">{isHindi ? config.descHi : config.descEn}</p>
          {vouchCount > 0 && (
            <p className="mt-1 text-[var(--color-text-muted)]">
              {isHindi ? `${vouchCount} समूहों ने पुष्टि की` : `${vouchCount} group(s) vouched`}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
