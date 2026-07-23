'use client';

type BadgeVariant = 'saffron' | 'purple' | 'red' | 'lime' | 'yellow' | 'sky' | 'ink' | 'ghost';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  size?: 'sm' | 'md';
  mono?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  saffron: 'bg-[var(--saffron)] text-[#0F0F0F] border-[var(--ink)]',
  purple: 'bg-[var(--purple)] text-white border-[var(--ink)]',
  red: 'bg-[var(--red)] text-white border-[var(--ink)]',
  lime: 'bg-[var(--lime)] text-[#0F0F0F] border-[var(--ink)]',
  yellow: 'bg-[var(--yellow)] text-[#0F0F0F] border-[var(--ink)]',
  sky: 'bg-[var(--sky)] text-white border-[var(--ink)]',
  ink: 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]',
  ghost: 'bg-transparent text-[var(--ink)] border-[var(--ink)]',
};

export function Badge({ variant = 'ghost', children, size = 'md', mono = false }: BadgeProps) {
  return (
    <span className={[
      'inline-flex items-center border-2 rounded-[var(--radius-sm)]',
      'font-bold uppercase tracking-[var(--tracking-wide)]',
      mono ? 'font-[var(--font-mono)]' : '',
      size === 'sm' ? 'px-1.5 py-0.5 text-[9px]' : 'px-2.5 py-1 text-[11px]',
      variantStyles[variant],
    ].join(' ')}>
      {children}
    </span>
  );
}

export default Badge;
