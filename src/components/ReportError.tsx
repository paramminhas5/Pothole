'use client';

import Link from 'next/link';
import { Locale } from '@/types';

interface ReportErrorProps {
  locale: Locale;
  context?: string;
}

export default function ReportError({ locale, context }: ReportErrorProps) {
  const hi = locale === 'hi';
  const href = context
    ? `/submit?type=correction&context=${encodeURIComponent(context)}`
    : '/submit';

  return (
    <Link
      href={href}
      className="text-xs inline-flex items-center gap-1 px-3 py-2 rounded border border-[var(--color-border-light)] hover:border-[var(--color-red)] text-[var(--color-text-muted)] hover:text-[var(--color-red)] transition-colors"
      style={{ textDecoration: 'none' }}
    >
      <span aria-hidden="true">⚠️</span>
      {hi ? 'गलत जानकारी?' : 'Wrong info?'}
    </Link>
  );
}
