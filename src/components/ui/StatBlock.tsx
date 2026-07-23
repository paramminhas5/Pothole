'use client';

interface StatBlockProps {
  value: number | string;
  label: string;
  labelHi?: string;
  locale?: 'en' | 'hi';
  variant?: 'default' | 'accent' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export function StatBlock({ value, label, labelHi, locale = 'en', variant = 'default', size = 'md' }: StatBlockProps) {
  const displayLabel = locale === 'hi' && labelHi ? labelHi : label;
  const colorClass = variant === 'danger' ? 'text-[var(--red)]'
    : variant === 'accent' ? 'text-[var(--saffron)]'
    : 'text-[var(--ink)]';

  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-5xl',
  };

  return (
    <div className="text-center p-4 border-2 border-[var(--ink)] rounded-[var(--radius-md)] bg-[var(--paper-alt)]">
      <div className={[
        'font-[var(--font-mono)] font-black leading-none tracking-tight',
        sizeClasses[size],
        colorClass,
      ].join(' ')}>
        {typeof value === 'number' ? value.toLocaleString('en-IN') : value}
      </div>
      <div className="text-[10px] font-bold uppercase tracking-[var(--tracking-wider)] text-[var(--ink-muted)] mt-2">
        {displayLabel}
      </div>
    </div>
  );
}

export default StatBlock;
