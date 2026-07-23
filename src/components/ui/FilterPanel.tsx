'use client';

import { ReactNode } from 'react';

interface FilterPanelProps {
  title?: string;
  titleHi?: string;
  locale?: 'en' | 'hi';
  children: ReactNode;
  columns?: 2 | 3 | 4;
}

export function FilterPanel({ title, titleHi, locale = 'en', children, columns = 3 }: FilterPanelProps) {
  const displayTitle = locale === 'hi' && titleHi ? titleHi : title;
  const gridClass = columns === 2 ? 'sm:grid-cols-2' : columns === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-3';

  return (
    <div className="p-5 bg-[var(--paper-alt)] border-2 border-[var(--ink)] rounded-[var(--radius-md)] shadow-[var(--shadow-sm)]">
      {displayTitle && (
        <h2 className="text-sm font-bold uppercase tracking-[var(--tracking-wide)] text-[var(--ink-muted)] mb-4">
          {displayTitle}
        </h2>
      )}
      <div className={`grid gap-4 ${gridClass}`}>
        {children}
      </div>
    </div>
  );
}

export default FilterPanel;
