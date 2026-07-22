'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Locale } from '@/types';

interface NavbarProps {
  locale: Locale;
}

export default function Navbar({ locale }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const isHindi = locale === 'hi';
  const labels = isHindi
    ? { home: 'होम', directory: 'निर्देशिका', board: 'ज़रूरतें और प्रस्ताव', register: 'समूह पंजीकृत करें', post: 'पोस्ट बनाएं', lang: 'English' }
    : { home: 'Home', directory: 'Directory', board: 'Needs & Offers', register: 'Register Group', post: 'Create Post', lang: 'हिन्दी' };

  const toggleLocale = () => {
    const newLocale = isHindi ? 'en' : 'hi';
    document.cookie = `locale=${newLocale};path=/;max-age=31536000`;
    window.location.reload();
  };

  return (
    <nav className="bg-[var(--color-card)] border-b border-[var(--color-border)] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-[var(--color-primary)]">
            <span className="text-2xl">🤝</span>
            <span>{isHindi ? 'सहायता' : 'Sahayata'}</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/directory" className="text-sm hover:text-[var(--color-primary)] transition-colors">
              {labels.directory}
            </Link>
            <Link href="/board" className="text-sm hover:text-[var(--color-primary)] transition-colors">
              {labels.board}
            </Link>
            <Link href="/submit-chapter" className="text-sm hover:text-[var(--color-primary)] transition-colors">
              {labels.register}
            </Link>
            <Link
              href="/create-post"
              className="text-sm bg-[var(--color-primary)] text-white px-3 py-1.5 rounded-md hover:bg-[var(--color-primary-dark)] transition-colors"
            >
              {labels.post}
            </Link>
            <button
              onClick={toggleLocale}
              className="text-sm px-2 py-1 border border-[var(--color-border)] rounded hover:bg-[var(--color-border)] transition-colors"
            >
              {labels.lang}
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded hover:bg-[var(--color-border)]"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/directory" className="block py-2 text-sm hover:text-[var(--color-primary)]" onClick={() => setMenuOpen(false)}>
              {labels.directory}
            </Link>
            <Link href="/board" className="block py-2 text-sm hover:text-[var(--color-primary)]" onClick={() => setMenuOpen(false)}>
              {labels.board}
            </Link>
            <Link href="/submit-chapter" className="block py-2 text-sm hover:text-[var(--color-primary)]" onClick={() => setMenuOpen(false)}>
              {labels.register}
            </Link>
            <Link href="/create-post" className="block py-2 text-sm bg-[var(--color-primary)] text-white px-3 py-1.5 rounded-md w-fit" onClick={() => setMenuOpen(false)}>
              {labels.post}
            </Link>
            <button onClick={toggleLocale} className="text-sm px-2 py-1 border border-[var(--color-border)] rounded">
              {labels.lang}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
