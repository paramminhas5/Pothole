'use client';

import { useState } from 'react';

interface Props { title: string; content: string; hint?: string }

export default function CopyBlock({ title, content, hint }: Props) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <details className="brutal-card mb-6">
      <summary className="heading-3 cursor-pointer">{title}</summary>
      <div className="mt-4">
        {hint && <p className="text-sm text-[var(--color-text-muted)] mb-3">{hint}</p>}
        <pre className="p-4 bg-[var(--color-surface-alt)] rounded text-xs whitespace-pre-wrap overflow-x-auto border leading-relaxed">{content}</pre>
        <button
          type="button"
          onClick={copy}
          className="brutal-btn brutal-btn-primary mt-3"
        >
          {copied ? '✓ Copied!' : '📋 Copy to clipboard'}
        </button>
      </div>
    </details>
  );
}
