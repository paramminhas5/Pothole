'use client';

import { useState } from 'react';

interface LiveIndicatorProps {
  newCount: number;
  onRefresh: () => void;
  locale: 'en' | 'hi';
}

export default function LiveIndicator({ newCount, onRefresh, locale }: LiveIndicatorProps) {
  const [dismissed, setDismissed] = useState(false);
  const isHindi = locale === 'hi';

  if (newCount === 0 || dismissed) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 animate-slide-in print:hidden">
      <button
        onClick={() => { onRefresh(); setDismissed(true); setTimeout(() => setDismissed(false), 5000); }}
        className="brutal-btn brutal-btn-primary brutal-btn-sm shadow-brutal-lg"
      >
        <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse mr-2" />
        {isHindi ? `${newCount} नई पोस्ट` : `${newCount} new post(s)`} — {isHindi ? 'दिखाएं' : 'Show'}
      </button>
    </div>
  );
}
