'use client';

import type { CampaignSummaryDTO } from '@/types/dto';
import { Badge } from './Badge';
import { DeadlineClock } from './DeadlineClock';
import Link from 'next/link';

interface CampaignCardProps {
  campaign: CampaignSummaryDTO;
  locale?: 'en' | 'hi';
}

const statusColors: Record<string, 'saffron' | 'lime' | 'red' | 'purple' | 'yellow'> = {
  live: 'saffron',
  escalating: 'red',
  concluded_won: 'lime',
  concluded_partial: 'yellow',
  concluded_refused: 'red',
  concluded_abandoned: 'ghost' as 'saffron', // fallback
  draft: 'ghost' as 'saffron',
};

const statusLabels: Record<string, { en: string; hi: string }> = {
  live: { en: 'LIVE', hi: 'चालू' },
  escalating: { en: 'ESCALATING', hi: 'बढ़ रहा' },
  concluded_won: { en: 'WON', hi: 'जीत' },
  concluded_partial: { en: 'PARTIAL', hi: 'आंशिक' },
  concluded_refused: { en: 'REFUSED', hi: 'मना' },
  concluded_abandoned: { en: 'CLOSED', hi: 'बंद' },
  draft: { en: 'DRAFT', hi: 'ड्राफ्ट' },
};

export function CampaignCard({ campaign, locale = 'en' }: CampaignCardProps) {
  const statusLabel = statusLabels[campaign.status] || statusLabels.live;
  const isActive = campaign.status === 'live' || campaign.status === 'escalating';

  return (
    <Link href={`/campaign/${campaign.slug}`} className="block group">
      <div className={[
        'border-2 border-[var(--ink)] rounded-[var(--radius-md)] p-5 bg-[var(--paper-alt)]',
        'shadow-[var(--shadow-md)]',
        'transition-transform duration-[var(--duration-fast)]',
        'group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] group-hover:shadow-[var(--shadow-lg)]',
        isActive ? 'border-t-4 border-t-[var(--saffron)]' : '',
      ].join(' ')}>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap gap-1.5">
            <Badge variant={statusColors[campaign.status] || 'ghost'} size="sm">
              {locale === 'hi' ? statusLabel.hi : statusLabel.en}
            </Badge>
            <Badge variant="ghost" size="sm">{campaign.category}</Badge>
          </div>
          {isActive && (
            <div className="flex-shrink-0">
              <DeadlineClock deadline={campaign.deadline} size="sm" locale={locale} />
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="font-[var(--font-display)] text-lg font-bold leading-snug mb-2 group-hover:text-[var(--saffron)]">
          {locale === 'hi' && campaign.titleHi ? campaign.titleHi : campaign.title}
        </h3>

        {/* Target */}
        <p className="text-sm text-[var(--ink-muted)] mb-3">
          → {campaign.targetInstitution} · {campaign.city}
        </p>

        {/* Demand */}
        <p className="text-sm font-medium line-clamp-2 mb-4">
          {campaign.primaryDemand}
        </p>

        {/* Footer stats */}
        <div className="flex items-center gap-4 text-xs font-[var(--font-mono)] text-[var(--ink-muted)]">
          <span>{campaign.supporterCount} supporters</span>
          <span>{campaign.filingCount} RTIs</span>
          <span>{campaign.daysElapsed}d active</span>
        </div>
      </div>
    </Link>
  );
}

export default CampaignCard;
