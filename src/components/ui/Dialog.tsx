'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function Dialog({ open, onClose, title, children, size = 'md' }: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    // Focus trap
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const sizeClass = size === 'sm' ? 'max-w-sm' : size === 'lg' ? 'max-w-2xl' : 'max-w-lg';

  return (
    <div
      className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4 bg-black/60"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className={[
          'w-full bg-[var(--paper-alt)] border-2 border-[var(--ink)] rounded-[var(--radius-lg)]',
          'shadow-[var(--shadow-lg)] max-h-[85vh] overflow-y-auto',
          'animate-[slideUp_0.2s_ease-out]',
          sizeClass,
        ].join(' ')}
      >
        <div className="flex items-center justify-between p-5 border-b-2 border-[var(--ink)]">
          <h2 id="dialog-title" className="text-lg font-[var(--font-display)] font-bold">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-[var(--radius-sm)] hover:bg-[var(--paper-dark)] text-xl font-bold"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="p-5">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Dialog;
