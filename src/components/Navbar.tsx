'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Locale } from '@/types';

interface NavbarProps { locale: Locale }

export default function Navbar({ locale }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isHindi = locale === 'hi';
  const labels = isHindi
    ? { home: 'होम', help: 'मदद पाएँ', offer: 'मदद करें', support: 'सहायता खोजें', posts: 'मेरी पोस्ट', safety: 'सुरक्षा', addGroup: 'समूह जोड़ें', menu: 'मेन्यू', close: 'मेन्यू बंद करें', lang: 'EN' }
    : { home: 'Home', help: 'Get help', offer: 'Offer help', support: 'Find support', posts: 'My posts', safety: 'Safety', addGroup: 'Add a group', menu: 'Menu', close: 'Close menu', lang: 'हि' };

  function toggleLocale() {
    document.cookie = `locale=${isHindi ? 'en' : 'hi'};path=/;max-age=31536000;samesite=lax`;
    window.location.reload();
  }

  return (
    <header className="site-header">
      <nav className="page-shell nav-shell" aria-label={isHindi ? 'मुख्य नेविगेशन' : 'Main navigation'}>
        <Link href="/" className="brand-link" aria-label={`${isHindi ? 'सहायता' : 'Sahayata'} — ${labels.home}`}>
          <span className="brand-mark" aria-hidden="true">S</span><span className="brand-name">{isHindi ? 'सहायता' : 'SAHAYATA'}</span>
        </Link>
        <div className="desktop-nav">
          <Link href="/create-post" className="nav-link nav-link-primary">{labels.help}</Link>
          <Link href="/board" className="nav-link">{labels.offer}</Link>
          <Link href="/directory" className="nav-link">{labels.support}</Link>
          <button type="button" onClick={toggleLocale} className="language-button" aria-label={isHindi ? 'Switch to English' : 'हिन्दी में बदलें'}>{labels.lang}</button>
          <button type="button" onClick={() => setMenuOpen((open) => !open)} className="menu-button" aria-expanded={menuOpen} aria-controls="more-navigation">{menuOpen ? labels.close : labels.menu}</button>
        </div>
        <button type="button" onClick={() => setMenuOpen((open) => !open)} className="mobile-menu-button" aria-label={menuOpen ? labels.close : labels.menu} aria-expanded={menuOpen} aria-controls="more-navigation">
          <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
        </button>
        {menuOpen && (
          <div id="more-navigation" className="nav-menu">
            <Link href="/create-post" className="mobile-core-link mobile-core-primary" onClick={() => setMenuOpen(false)}>{labels.help}</Link>
            <Link href="/board" className="mobile-core-link" onClick={() => setMenuOpen(false)}>{labels.offer}</Link>
            <Link href="/directory" className="mobile-core-link" onClick={() => setMenuOpen(false)}>{labels.support}</Link>
            <div className="nav-menu-secondary">
              <Link href="/my-posts" onClick={() => setMenuOpen(false)}>{labels.posts}</Link>
              <Link href="/safety" onClick={() => setMenuOpen(false)}>{labels.safety}</Link>
              <Link href="/submit-chapter" onClick={() => setMenuOpen(false)}>{labels.addGroup}</Link>
              <button type="button" onClick={toggleLocale}>{isHindi ? 'English' : 'हिन्दी'}</button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
