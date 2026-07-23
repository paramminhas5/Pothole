'use client';

import { useMemo } from 'react';

interface DeadlineClockProps {
  deadline: string; // ISO date string
  filedDate?: string; // ISO date string for progress calculation
  label?: string;
  labelHi?: string;
  locale?: 'en' | 'hi';
  size?: 'sm' | 'md' | 'lg';
  showPenalty?: boolean; // RTI penalty mode
}

export function DeadlineClock({
  deadline,
  filedDate,
  label,
  labelHi,
  locale = 'en',
  size = 'md',
  showPenalty = false,
}: DeadlineClockProps) {
  const { daysRemaining, daysElapsed, totalDays, isOverdue, penaltyAmount, progressPct } = useMemo(() => {
    const now = new Date();
    const dl = new Date(deadline);
    const filed = filedDate ? new Date(filedDate) : null;
    const remaining = Math.ceil((dl.getTime() - now.getTime()) / 86_400_000);
    const elapsed = filed ? Math.floor((now.getTime() - filed.getTime()) / 86_400_000) : 0;
    const total = filed ? Math.ceil((dl.getTime() - filed.getTime()) / 86_400_000) : 30;
    const overdue = remaining < 0;
    const penalty = overdue ? Math.abs(remaining) * 250 : 0;
    const progress = total > 0 ? Math.min(100, Math.max(0, (elapsed / total) * 100)) : 0;
    return { daysRemaining: remaining, daysElapsed: elapsed, totalDays: total, isOverdue: overdue, penaltyAmount: penalty, progressPct: progress };
  }, [deadline, filedDate]);

  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
  };

  const displayLabel = locale === 'hi' ? (labelHi || label || 'समय सीमा') : (label || 'Deadline');

  return (
    <div className="font-[var(--font-mono)] text-center">
      {/* Counter */}
      <div className={[
        sizeClasses[size],
        'font-black tracking-tight leading-none',
        isOverdue ? 'text-[var(--red)]' : 'text-[var(--ink)]',
      ].join(' ')}>
        {isOverdue ? `+${Math.abs(daysRemaining)}` : daysRemaining}
      </div>

      {/* Label */}
      <div className="text-xs font-bold uppercase tracking-[var(--tracking-wider)] text-[var(--ink-muted)] mt-1">
        {isOverdue
          ? (locale === 'hi' ? 'दिन अतिरिक्त' : 'DAYS OVERDUE')
          : (locale === 'hi' ? 'दिन शेष' : 'DAYS LEFT')
        }
      </div>

      {/* Progress bar */}
      <div className="mt-3 h-2 bg-[var(--paper-dark)] rounded-full overflow-hidden border border-[var(--ink)]">
        <div
          className={[
            'h-full transition-all duration-500',
            isOverdue ? 'bg-[var(--red)]' : progressPct > 75 ? 'bg-[var(--yellow)]' : 'bg-[var(--saffron)]',
          ].join(' ')}
          style={{ width: `${Math.min(100, progressPct)}%` }}
        />
      </div>

      {/* Context label */}
      <div className="text-xs text-[var(--ink-muted)] mt-2 font-medium">
        {displayLabel}
      </div>

      {/* Penalty display for RTI */}
      {showPenalty && isOverdue && (
        <div className="mt-2 px-3 py-1 bg-[var(--red-light)] border border-[var(--red)] rounded-[var(--radius-sm)] inline-block">
          <span className="text-xs font-bold text-[var(--red)]">
            {locale === 'hi' ? `जुर्माना: ₹${penaltyAmount.toLocaleString('en-IN')}` : `Penalty: ₹${penaltyAmount.toLocaleString('en-IN')}`}
          </span>
        </div>
      )}
    </div>
  );
}

export default DeadlineClock;
