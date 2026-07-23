'use client';

import { ReactNode } from 'react';

interface EmptyStateProps {
  icon?: string;
  title: string;
  titleHi?: string;
  description?: string;
  descriptionHi?: string;
  locale?: 'en' | 'hi';
  action?: ReactNode;
}

export function EmptyState({ icon = '📭', title, titleHi, description, descriptionHi, locale = 'en', action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-6 border-2 border-dashed border-[var(--ink-faint)] rounded-[var(--radius-lg)] bg-[var(--paper-alt)]">
      <span className="text-4xl mb-4" aria-hidden="true">{icon}</span>
      <h3 className="text-lg font-bold text-[var(--ink)]">
        {locale === 'hi' && titleHi ? titleHi : title}
      </h3>
      {(description || descriptionHi) && (
        <p className="text-sm text-[var(--ink-muted)] mt-2 max-w-md">
          {locale === 'hi' && descriptionHi ? descriptionHi : description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function LoadingState({ locale = 'en' }: { locale?: 'en' | 'hi' }) {
  return (
    <div className="flex items-center justify-center gap-3 py-12 text-[var(--ink-muted)]">
      <div className="w-5 h-5 border-3 border-[var(--ink-faint)] border-t-[var(--saffron)] rounded-full animate-spin" />
      <span className="text-sm font-bold">{locale === 'hi' ? 'लोड हो रहा है...' : 'Loading...'}</span>
    </div>
  );
}

export function ErrorState({ message, locale = 'en', onRetry }: { message?: string; locale?: 'en' | 'hi'; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-6 border-2 border-[var(--red)] rounded-[var(--radius-lg)] bg-[var(--red-light)]">
      <span className="text-3xl mb-3">⚠️</span>
      <h3 className="text-lg font-bold text-[var(--red)]">
        {locale === 'hi' ? 'कुछ गलत हो गया' : 'Something went wrong'}
      </h3>
      {message && <p className="text-sm text-[var(--ink-muted)] mt-2">{message}</p>}
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 text-sm font-bold border-2 border-[var(--ink)] rounded-[var(--radius-md)] hover:bg-[var(--paper-dark)]"
        >
          {locale === 'hi' ? 'पुनः प्रयास करें' : 'Try again'}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
