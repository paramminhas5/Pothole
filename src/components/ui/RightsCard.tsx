'use client';

interface RightsCardProps {
  title: string;
  titleHi: string;
  rights: Array<{ text: string; textHi: string; source?: string }>;
  locale?: 'en' | 'hi';
  variant?: 'default' | 'detention' | 'march' | 'home';
}

/**
 * Rights Card — one screen, big type, screenshot-optimized.
 * For street layer: offline, no API, no analytics.
 */
export function RightsCard({ title, titleHi, rights, locale = 'en', variant = 'default' }: RightsCardProps) {
  const bgClass = variant === 'detention' ? 'bg-[var(--red-light)] border-[var(--red)]'
    : variant === 'march' ? 'bg-[var(--saffron-light)] border-[var(--saffron)]'
    : 'bg-[var(--paper-alt)] border-[var(--ink)]';

  return (
    <div className={[
      'border-2 rounded-[var(--radius-lg)] p-6 sm:p-8',
      bgClass,
    ].join(' ')}>
      {/* Header */}
      <h2 className="font-[var(--font-display)] text-xl sm:text-2xl font-black mb-6 leading-tight">
        {locale === 'hi' ? titleHi : title}
      </h2>

      {/* Rights list */}
      <ul className="space-y-4">
        {rights.map((right, i) => (
          <li key={i} className="flex gap-3">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--ink)] text-[var(--paper)] flex items-center justify-center text-xs font-bold">
              {i + 1}
            </span>
            <div>
              <p className="text-base sm:text-lg font-bold leading-snug">
                {locale === 'hi' ? right.textHi : right.text}
              </p>
              {right.source && (
                <p className="text-xs text-[var(--ink-muted)] mt-1 font-[var(--font-mono)]">
                  {right.source}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Screenshot footer */}
      <div className="mt-6 pt-4 border-t border-dashed border-[var(--ink-faint)] flex items-center justify-between">
        <span className="text-xs font-bold text-[var(--ink-muted)] uppercase tracking-wide">
          sahayata.org
        </span>
        <span className="text-xs font-[var(--font-mono)] text-[var(--ink-muted)]">
          {locale === 'hi' ? 'सत्यापित कानूनी जानकारी' : 'Verified legal info'}
        </span>
      </div>
    </div>
  );
}

export default RightsCard;
