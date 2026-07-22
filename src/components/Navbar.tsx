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
    ? { home: 'होम', directory: 'निर्देशिका', board: 'ज़रूरतें और प्रस्ताव', register: 'समूह जोड़ें', post: 'पोस्ट करें', myPosts: 'मेरी पोस्ट', safety: 'अधिकार', toolkit: 'टूलकिट', lang: 'EN' }
    : { home: 'Home', directory: 'Directory', board: 'Needs & Offers', register: 'Add Group', post: 'Post', myPosts: 'My Posts', safety: 'Rights', toolkit: 'Toolkit', lang: 'हि' };

  const toggleLocale = () => {
    const newLocale = isHindi ? 'en' : 'hi';
    document.cookie = `locale=${newLocale};path=/;max-age=31536000`;
    window.location.reload();
  };

  return (
    <nav className="border-b-[3px] border-[var(--color-border)] bg-[var(--color-card)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo — bold, distinctive */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-[var(--color-accent)] border-[2.5px] border-[var(--color-border)] flex items-center justify-center shadow-[3px_3px_0px_#0F0F0F] dark:shadow-[3px_3px_0px_#FAFAFA] group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] transition-transform">
              <span className="text-white font-black text-sm">S</span>
            </div>
            <span className="font-black text-xl tracking-tight hidden sm:block">
              {isHindi ? 'सहायता' : 'SAHAYATA'}
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            <Link href="/directory" className="px-3 py-2 text-[13px] font-bold uppercase tracking-wide hover:bg-[var(--color-accent)] hover:text-white transition-colors">
              {labels.directory}
            </Link>
            <Link href="/board" className="px-3 py-2 text-[13px] font-bold uppercase tracking-wide hover:bg-[var(--color-accent)] hover:text-white transition-colors">
              {labels.board}
            </Link>
            <Link href="/safety" className="px-3 py-2 text-[13px] font-bold uppercase tracking-wide hover:bg-[var(--color-accent)] hover:text-white transition-colors">
              {labels.safety}
            </Link>
            <Link href="/toolkit" className="px-3 py-2 text-[13px] font-bold uppercase tracking-wide hover:bg-[var(--color-accent)] hover:text-white transition-colors">
              {labels.toolkit}
            </Link>
            <Link href="/my-posts" className="px-3 py-2 text-[13px] font-bold uppercase tracking-wide hover:bg-[var(--color-accent)] hover:text-white transition-colors">
              {labels.myPosts}
            </Link>
            <div className="w-[2.5px] h-6 bg-[var(--color-border)] mx-2" />
            <Link
              href="/create-post"
              className="brutal-btn brutal-btn-primary brutal-btn-sm"
            >
              + {labels.post}
            </Link>
            <button
              onClick={toggleLocale}
              className="ml-2 w-9 h-9 border-[2.5px] border-[var(--color-border)] font-black text-xs flex items-center justify-center hover:bg-[var(--color-border)] hover:text-[var(--color-bg)] transition-colors"
              aria-label="Switch language"
            >
              {labels.lang}
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-10 h-10 border-[2.5px] border-[var(--color-border)] flex items-center justify-center hover:bg-[var(--color-border)] hover:text-[var(--color-bg)] transition-colors"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              {menuOpen ? (
                <path strokeLinecap="square" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="square" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav — full width, stacked */}
        {menuOpen && (
          <div className="lg:hidden border-t-[2.5px] border-[var(--color-border)] pb-4 animate-slide-in">
            <div className="flex flex-col gap-0 mt-2">
              <Link href="/directory" className="py-3 px-2 text-sm font-bold uppercase tracking-wide border-b border-[var(--color-border-light)] hover:bg-[var(--color-accent)] hover:text-white transition-colors" onClick={() => setMenuOpen(false)}>
                {labels.directory}
              </Link>
              <Link href="/board" className="py-3 px-2 text-sm font-bold uppercase tracking-wide border-b border-[var(--color-border-light)] hover:bg-[var(--color-accent)] hover:text-white transition-colors" onClick={() => setMenuOpen(false)}>
                {labels.board}
              </Link>
              <Link href="/safety" className="py-3 px-2 text-sm font-bold uppercase tracking-wide border-b border-[var(--color-border-light)] hover:bg-[var(--color-accent)] hover:text-white transition-colors" onClick={() => setMenuOpen(false)}>
                {labels.safety}
              </Link>
              <Link href="/toolkit" className="py-3 px-2 text-sm font-bold uppercase tracking-wide border-b border-[var(--color-border-light)] hover:bg-[var(--color-accent)] hover:text-white transition-colors" onClick={() => setMenuOpen(false)}>
                {labels.toolkit}
              </Link>
              <Link href="/my-posts" className="py-3 px-2 text-sm font-bold uppercase tracking-wide border-b border-[var(--color-border-light)] hover:bg-[var(--color-accent)] hover:text-white transition-colors" onClick={() => setMenuOpen(false)}>
                {labels.myPosts}
              </Link>
              <Link href="/submit-chapter" className="py-3 px-2 text-sm font-bold uppercase tracking-wide border-b border-[var(--color-border-light)] hover:bg-[var(--color-accent)] hover:text-white transition-colors" onClick={() => setMenuOpen(false)}>
                {labels.register}
              </Link>
              <div className="flex gap-2 mt-3">
                <Link
                  href="/create-post"
                  className="brutal-btn brutal-btn-primary brutal-btn-sm flex-1"
                  onClick={() => setMenuOpen(false)}
                >
                  + {labels.post}
                </Link>
                <button
                  onClick={toggleLocale}
                  className="brutal-btn brutal-btn-sm w-12"
                >
                  {labels.lang}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
