'use client';

import { ReactNode } from 'react';

interface PageShellProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'full';
  padding?: boolean;
}

const sizes: Record<string, string> = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  full: 'max-w-7xl',
};

export function PageShell({ children, size = 'lg', padding = true }: PageShellProps) {
  return (
    <div className={[
      'mx-auto w-full',
      padding ? 'px-4 sm:px-6' : '',
      sizes[size],
    ].join(' ')}>
      {children}
    </div>
  );
}

interface PageHeaderProps {
  title: string;
  titleHi?: string;
  subtitle?: string;
  subtitleHi?: string;
  locale?: 'en' | 'hi';
  action?: ReactNode;
}

export function PageHeader({ title, titleHi, subtitle, subtitleHi, locale = 'en', action }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 pt-8">
      <div>
        <h1 className="font-[var(--font-display)] text-3xl sm:text-4xl font-black tracking-[var(--tracking-tight)] leading-[var(--leading-tight)]">
          {locale === 'hi' && titleHi ? titleHi : title}
        </h1>
        {(subtitle || subtitleHi) && (
          <p className="text-base text-[var(--ink-muted)] mt-2 max-w-2xl">
            {locale === 'hi' && subtitleHi ? subtitleHi : subtitle}
          </p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}

export default PageShell;
