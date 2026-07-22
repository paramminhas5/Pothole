'use client';

import { useEffect, useState, useCallback } from 'react';

interface KeyboardShortcutsProps {
  onApprove?: () => void;
  onReject?: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export default function KeyboardShortcuts({ onApprove, onReject, onNext, onPrev }: KeyboardShortcutsProps) {
  const [showHelp, setShowHelp] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Don't trigger if user is typing in an input
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) {
      return;
    }

    switch (e.key) {
      case '?':
        setShowHelp((prev) => !prev);
        break;
      case 'j':
        onNext?.();
        break;
      case 'k':
        onPrev?.();
        break;
      case 'a':
        onApprove?.();
        break;
      case 'r':
        onReject?.();
        break;
      case 'Escape':
        setShowHelp(false);
        break;
    }
  }, [onApprove, onReject, onNext, onPrev]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!showHelp) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 print:hidden" onClick={() => setShowHelp(false)}>
      <div className="brutal-card !shadow-brutal-lg max-w-sm w-full animate-slide-in" onClick={(e) => e.stopPropagation()}>
        <h3 className="heading-3 mb-4">⌨️ Keyboard Shortcuts</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="font-mono brutal-badge">j</span><span>Next item</span></div>
          <div className="flex justify-between"><span className="font-mono brutal-badge">k</span><span>Previous item</span></div>
          <div className="flex justify-between"><span className="font-mono brutal-badge">a</span><span>Approve</span></div>
          <div className="flex justify-between"><span className="font-mono brutal-badge">r</span><span>Reject</span></div>
          <div className="flex justify-between"><span className="font-mono brutal-badge">?</span><span>Toggle this help</span></div>
          <div className="flex justify-between"><span className="font-mono brutal-badge">Esc</span><span>Close</span></div>
        </div>
        <button onClick={() => setShowHelp(false)} className="brutal-btn brutal-btn-sm brutal-btn-dark w-full mt-4">
          CLOSE
        </button>
      </div>
    </div>
  );
}
