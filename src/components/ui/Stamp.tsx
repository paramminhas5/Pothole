'use client';

type StampVariant = 'verified' | 'source' | 'responded' | 'silent' | 'pending' | 'won' | 'refused';

interface StampProps {
  variant: StampVariant;
  label: string;
  date?: string;
  tooltip?: string;
  size?: 'sm' | 'md';
}

const stampStyles: Record<StampVariant, string> = {
  verified: 'border-[var(--purple)] text-[var(--purple)] rotate-[-2deg]',
  source: 'border-[var(--sky)] text-[var(--sky)] rotate-[1deg]',
  responded: 'border-[var(--lime)] text-[var(--lime)] rotate-[-1deg]',
  silent: 'border-[var(--red)] text-[var(--red)] rotate-[2deg]',
  pending: 'border-[var(--yellow)] text-[var(--yellow)] rotate-[-1.5deg]',
  won: 'border-[var(--lime)] text-[var(--lime)] rotate-[-3deg]',
  refused: 'border-[var(--red)] text-[var(--red)] rotate-[1.5deg]',
};

export function Stamp({ variant, label, date, tooltip, size = 'md' }: StampProps) {
  const sizeClasses = size === 'sm'
    ? 'px-2 py-0.5 text-[9px]'
    : 'px-3 py-1 text-[11px]';

  return (
    <span
      className={[
        'inline-flex items-center gap-1.5',
        'font-[var(--font-mono)] font-bold uppercase tracking-[var(--tracking-wider)]',
        'border-2 border-dashed rounded-[var(--radius-sm)]',
        'opacity-90',
        stampStyles[variant],
        sizeClasses,
      ].join(' ')}
      title={tooltip}
    >
      <span>{label}</span>
      {date && <span className="opacity-70">{date}</span>}
    </span>
  );
}

export default Stamp;
