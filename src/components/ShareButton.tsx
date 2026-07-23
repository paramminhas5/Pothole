'use client';

import { Locale } from '@/types';

interface ShareButtonProps {
  locale: Locale;
  title: string;
  url?: string;
}

export default function ShareButton({ locale, title, url }: ShareButtonProps) {
  const hi = locale === 'hi';

  function shareWhatsApp() {
    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
    const text = `${title}\n${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  }

  function shareGeneric() {
    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
    if (navigator.share) {
      navigator.share({ title, url: shareUrl }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert(hi ? 'लिंक कॉपी हुआ!' : 'Link copied!');
      }).catch(() => {});
    }
  }

  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <button type="button" onClick={shareWhatsApp} className="brutal-btn brutal-btn-sm" style={{ background: '#25D366', color: '#fff', borderColor: '#1da851' }}>
        WhatsApp
      </button>
      <button type="button" onClick={shareGeneric} className="brutal-btn brutal-btn-sm">
        {hi ? 'शेयर / कॉपी' : 'Share / Copy'}
      </button>
    </div>
  );
}
