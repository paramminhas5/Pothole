'use client';

interface ShareCardButtonProps {
  title: string;
  text: string;
  url: string;
  locale?: 'en' | 'hi';
}

/**
 * Share button that uses Web Share API on mobile,
 * falls back to clipboard copy on desktop.
 * The document IS the ad — every share includes the campaign URL.
 */
export function ShareCardButton({ title, text, url, locale = 'en' }: ShareCardButtonProps) {
  const handleShare = async () => {
    const shareData = { title, text, url };

    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (e) {
        // User cancelled — fine
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(`${text}\n\n${url}`);
        // Would use toast here in real implementation
        alert(locale === 'hi' ? 'कॉपी हो गया!' : 'Copied to clipboard!');
      } catch {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = `${text}\n\n${url}`;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className={[
        'inline-flex items-center gap-2 px-4 py-2.5',
        'text-sm font-bold',
        'bg-[var(--saffron-light)] text-[var(--saffron)] border-2 border-[var(--saffron)]',
        'rounded-[var(--radius-md)]',
        'hover:bg-[var(--saffron)] hover:text-white',
        'transition-colors duration-[var(--duration-fast)]',
        'min-h-[var(--touch-min)]',
      ].join(' ')}
      aria-label={locale === 'hi' ? 'शेयर करें' : 'Share'}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
      </svg>
      {locale === 'hi' ? 'शेयर करें' : 'Share'}
    </button>
  );
}

export default ShareCardButton;
