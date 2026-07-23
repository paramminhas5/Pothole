'use client';

import { ReactNode } from 'react';

interface BigRedProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

/**
 * BigRed Surface — the SOS/detention pattern.
 * Full-bleed, max-type, glove-operable targets (>=64px), high contrast.
 * Used in protest mode for emergency situations.
 */
export function BigRed({ children, title, subtitle }: BigRedProps) {
  return (
    <div className="fixed inset-0 z-[100] bg-[var(--red)] text-white flex flex-col items-center justify-center p-6 text-center">
      {title && (
        <h1 className="font-[var(--font-display)] text-4xl sm:text-6xl font-black uppercase tracking-tight mb-4 leading-none">
          {title}
        </h1>
      )}
      {subtitle && (
        <p className="text-lg sm:text-xl font-bold opacity-90 max-w-md mb-8">
          {subtitle}
        </p>
      )}
      <div className="w-full max-w-sm flex flex-col gap-4">
        {children}
      </div>
    </div>
  );
}

export function BigRedButton({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={[
        'w-full min-h-[var(--touch-xl)] px-6 py-5',
        'text-xl font-black uppercase tracking-wide',
        'bg-white text-[var(--red)] border-4 border-white',
        'rounded-[var(--radius-lg)]',
        'active:scale-95 transition-transform',
        'focus-visible:outline-4 focus-visible:outline-white focus-visible:outline-offset-4',
      ].join(' ')}
    >
      {children}
    </button>
  );
}

export default BigRed;
