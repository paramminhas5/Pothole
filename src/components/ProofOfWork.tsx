'use client';

import { useState, useEffect, useCallback } from 'react';
import { Locale } from '@/types';
import { solveProofOfWork } from '@/lib/pow-solver';

interface ProofOfWorkProps {
  locale: Locale;
  onSolved: (challenge: string, nonce: number) => void;
  children: React.ReactNode;
}

export default function ProofOfWork({ locale, onSolved, children }: ProofOfWorkProps) {
  const [solved, setSolved] = useState(false);
  const [solving, setSolving] = useState(false);
  const [progress, setProgress] = useState('');
  const [error, setError] = useState('');

  const isHindi = locale === 'hi';

  const startSolving = useCallback(async () => {
    setSolving(true);
    setError('');
    setProgress(isHindi ? 'सत्यापन कोड तैयार कर रहे हैं...' : 'Generating verification...');

    try {
      // Get challenge from server
      const res = await fetch('/api/pow');
      if (!res.ok) throw new Error('Failed to get challenge');
      const { challenge, difficulty } = await res.json();

      setProgress(isHindi ? 'सत्यापित कर रहे हैं... (1-3 सेकंड)' : 'Verifying you are human... (1-3 seconds)');

      // Solve the puzzle client-side
      const { nonce, timeMs } = await solveProofOfWork(challenge, difficulty);

      setProgress(
        isHindi
          ? `✓ सत्यापित (${(timeMs / 1000).toFixed(1)}s)`
          : `✓ Verified (${(timeMs / 1000).toFixed(1)}s)`
      );

      setSolved(true);
      onSolved(challenge, nonce);
    } catch {
      setError(isHindi ? 'सत्यापन विफल। पुनः प्रयास करें।' : 'Verification failed. Try again.');
      setSolving(false);
    }
  }, [isHindi, onSolved]);

  // Auto-start solving when component mounts
  useEffect(() => {
    if (!solved && !solving) {
      startSolving();
    }
  }, [solved, solving, startSolving]);

  if (solved) {
    return <>{children}</>;
  }

  return (
    <div className="brutal-card !border-[var(--color-accent)] text-center">
      <div className="brutal-badge brutal-badge-accent mb-4">
        {isHindi ? 'मानव सत्यापन' : 'HUMAN VERIFICATION'}
      </div>
      <h3 className="heading-3 mb-2">
        {isHindi ? 'कृपया प्रतीक्षा करें' : 'Please wait'}
      </h3>
      <p className="text-sm text-[var(--color-text-muted)] mb-6">
        {isHindi
          ? 'स्पैम रोकने के लिए हम एक त्वरित सत्यापन चला रहे हैं। कोई ट्रैकिंग नहीं, कोई तृतीय-पक्ष नहीं।'
          : 'Running a quick verification to prevent spam. No tracking, no third parties, no data collected.'}
      </p>

      {solving && (
        <div className="space-y-3">
          <div className="h-2 border-[2px] border-[var(--color-border)] overflow-hidden">
            <div className="h-full bg-[var(--color-accent)] animate-pulse" style={{ width: '60%' }} />
          </div>
          <p className="text-xs font-bold text-[var(--color-text-muted)]">{progress}</p>
        </div>
      )}

      {error && (
        <div className="mt-4">
          <p className="text-sm text-[var(--color-red)] font-bold mb-3">{error}</p>
          <button
            onClick={() => { setSolving(false); startSolving(); }}
            className="brutal-btn brutal-btn-sm brutal-btn-primary"
          >
            {isHindi ? 'पुनः प्रयास' : 'RETRY'}
          </button>
        </div>
      )}
    </div>
  );
}
