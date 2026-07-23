'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Locale } from '@/types';

export default function FirstVisitBanner({ locale }: { locale: Locale }) {
  const hi = locale === 'hi';
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('sahayata_visited')) {
      setShow(true);
    }
  }, []);

  function dismiss() {
    localStorage.setItem('sahayata_visited', '1');
    setShow(false);
  }

  if (!show) return null;

  return (
    <div style={{ padding: '10px 16px', background: 'var(--color-accent)', color: '#0f0f0f', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', textAlign: 'center' }} role="banner">
      <span style={{ fontWeight: 700 }}>
        {hi
          ? 'पहली बार? यह एक सिस्टम है: अधिकार → कानूनी उपकरण → माँगें → ग्रुप → शक्ति।'
          : 'First time? This is one system: rights → legal tools → demands → groups → power.'}
      </span>
      <Link href="/how-it-works" onClick={dismiss} style={{ fontWeight: 900, textDecoration: 'underline', color: '#0f0f0f' }}>
        {hi ? 'देखें कैसे →' : 'See how →'}
      </Link>
      <button type="button" onClick={dismiss} style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 900, fontSize: '1.1rem', lineHeight: 1, padding: '4px', color: '#0f0f0f' }} aria-label="Dismiss">✕</button>
    </div>
  );
}
