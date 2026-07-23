'use client';

import type { LedgerEntryDTO } from '@/types/dto';
import { Stamp } from './Stamp';

interface LedgerRowProps {
  entry: LedgerEntryDTO;
  locale?: 'en' | 'hi';
}

const statusLabels: Record<string, { en: string; hi: string; variant: 'silent' | 'responded' | 'pending' | 'refused' | 'verified' }> = {
  silent: { en: 'SILENT', hi: 'मौन', variant: 'silent' },
  acknowledged: { en: 'ACKNOWLEDGED', hi: 'स्वीकृत', variant: 'pending' },
  partial_response: { en: 'PARTIAL', hi: 'आंशिक उत्तर', variant: 'pending' },
  full_response: { en: 'RESPONDED', hi: 'उत्तर दिया', variant: 'responded' },
  refused: { en: 'REFUSED', hi: 'मना किया', variant: 'refused' },
  escalated: { en: 'ESCALATED', hi: 'बढ़ाया गया', variant: 'silent' },
};

export function LedgerRow({ entry, locale = 'en' }: LedgerRowProps) {
  const status = statusLabels[entry.responseStatus] || statusLabels.silent;
  const isSilent = entry.responseStatus === 'silent';

  return (
    <div className={[
      'grid grid-cols-[1fr_auto] gap-4 p-4 border-b border-[var(--border-light)]',
      'hover:bg-[var(--paper-dark)] transition-colors',
      isSilent && entry.daysElapsed > 30 ? 'border-l-4 border-l-[var(--red)]' : '',
    ].join(' ')}>
      <div className="min-w-0">
        {/* Demand */}
        <p className="font-bold text-sm truncate">
          {locale === 'hi' && entry.demandTextHi ? entry.demandTextHi : entry.demandText}
        </p>

        {/* Target institution */}
        <p className="text-xs text-[var(--ink-muted)] mt-0.5">
          → {entry.targetInstitution} · {entry.targetCity}
        </p>

        {/* Campaign link */}
        {entry.campaignTitle && (
          <p className="text-xs text-[var(--saffron)] font-bold mt-1">
            ⚡ {entry.campaignTitle}
          </p>
        )}
      </div>

      <div className="flex flex-col items-end gap-1.5">
        {/* Days counter */}
        <span className={[
          'font-[var(--font-mono)] text-lg font-black leading-none',
          isSilent && entry.daysElapsed > 30 ? 'text-[var(--red)]' : 'text-[var(--ink)]',
        ].join(' ')}>
          {entry.daysElapsed}d
        </span>

        {/* Status stamp */}
        <Stamp
          variant={status.variant}
          label={locale === 'hi' ? status.hi : status.en}
          size="sm"
        />

        {/* Source indicator */}
        {entry.sourceDocumentUrl && (
          <Stamp variant="source" label={locale === 'hi' ? 'स्रोत' : 'SOURCE'} size="sm" />
        )}
      </div>
    </div>
  );
}

export default LedgerRow;
