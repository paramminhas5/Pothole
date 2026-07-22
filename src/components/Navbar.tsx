'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Locale } from '@/types';

interface NavbarProps { locale: Locale }

export default function Navbar({ locale }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const hi = locale === 'hi';

  function toggleLocale() {
    document.cookie = `locale=${hi ? 'en' : 'hi'};path=/;max-age=31536000;samesite=lax`;
    window.location.reload();
  }

  return (
    <header className="site-header">
      <nav className="page-shell nav-shell" aria-label={hi ? 'मुख्य नेविगेशन' : 'Main navigation'}>
        <Link href="/" className="brand-link" aria-label="Sahayata — Home">
          <span className="brand-mark" aria-hidden="true">S</span>
          <span className="brand-name">{hi ? 'सहायता' : 'SAHAYATA'}</span>
        </Link>

        {/* Desktop nav */}
        <div className="desktop-nav">
          <Link href="/create-post" className="nav-link nav-link-primary">{hi ? 'मदद' : 'Help'}</Link>
          <Link href="/board" className="nav-link">{hi ? 'बोर्ड' : 'Board'}</Link>
          <Link href="/groups" className="nav-link">{hi ? 'ग्रुप' : 'Groups'}</Link>
          <Link href="/playbook" className="nav-link">{hi ? 'प्लेबुक' : 'Playbook'}</Link>
          <Link href="/safety" className="nav-link">{hi ? 'अधिकार' : 'Rights'}</Link>
          <button type="button" onClick={toggleLocale} className="language-button" aria-label={hi ? 'Switch to English' : 'हिन्दी में बदलें'}>{hi ? 'EN' : 'हि'}</button>
          <button type="button" onClick={() => setMenuOpen((o) => !o)} className="menu-button" aria-expanded={menuOpen} aria-controls="full-navigation">{menuOpen ? '✕' : '☰'}</button>
        </div>

        {/* Mobile menu button */}
        <button type="button" onClick={() => setMenuOpen((o) => !o)} className="mobile-menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="full-navigation">
          <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
        </button>

        {/* Full navigation menu */}
        {menuOpen && (
          <div id="full-navigation" className="nav-menu">
            <div className="nav-menu-section">
              <p className="nav-menu-heading">{hi ? 'कार्रवाई' : 'ACT NOW'}</p>
              <Link href="/create-post" onClick={() => setMenuOpen(false)}>{hi ? 'मदद पाएँ / दें' : 'Get / Give Help'}</Link>
              <Link href="/board" onClick={() => setMenuOpen(false)}>{hi ? 'लाइव बोर्ड' : 'Live Board'}</Link>
              <Link href="/rti" onClick={() => setMenuOpen(false)}>{hi ? 'RTI जनरेटर' : 'RTI Generator'}</Link>
              <Link href="/fir" onClick={() => setMenuOpen(false)}>{hi ? 'FIR असिस्टेंट' : 'FIR Assistant'}</Link>
              <Link href="/demands" onClick={() => setMenuOpen(false)}>{hi ? 'डिमांड ट्रैकर' : 'Demand Tracker'}</Link>
              <Link href="/vault" onClick={() => setMenuOpen(false)}>{hi ? 'एविडेंस वॉल्ट' : 'Evidence Vault'}</Link>
              <Link href="/representatives" onClick={() => setMenuOpen(false)}>{hi ? 'जनप्रतिनिधि + पत्र' : 'Representatives + Letters'}</Link>
            </div>
            <div className="nav-menu-section">
              <p className="nav-menu-heading">{hi ? 'संगठित करें' : 'ORGANIZE'}</p>
              <Link href="/groups" onClick={() => setMenuOpen(false)}>{hi ? 'एन्क्रिप्टेड ग्रुप' : 'Encrypted Groups'}</Link>
              <Link href="/organize" onClick={() => setMenuOpen(false)}>{hi ? 'संगठन गाइड' : 'How to Organize'}</Link>
              <Link href="/communication" onClick={() => setMenuOpen(false)}>{hi ? 'सुरक्षित संचार' : 'Secure Comms'}</Link>
              <Link href="/directory" onClick={() => setMenuOpen(false)}>{hi ? 'सपोर्ट ग्रुप डायरेक्टरी' : 'Support Directory'}</Link>
              <Link href="/submit-chapter" onClick={() => setMenuOpen(false)}>{hi ? 'ग्रुप रजिस्टर करें' : 'Register Group'}</Link>
            </div>
            <div className="nav-menu-section">
              <p className="nav-menu-heading">{hi ? 'सीखें' : 'LEARN'}</p>
              <Link href="/safety" onClick={() => setMenuOpen(false)}>{hi ? 'अधिकार गाइड' : 'Know Your Rights'}</Link>
              <Link href="/resources" onClick={() => setMenuOpen(false)}>{hi ? 'हेल्पलाइन और संसाधन' : 'Helplines & Resources'}</Link>
              <Link href="/playbook" onClick={() => setMenuOpen(false)}>{hi ? 'विरोध → शक्ति प्लेबुक' : 'Protest → Power Playbook'}</Link>
              <Link href="/toolkit" onClick={() => setMenuOpen(false)}>{hi ? 'टेम्पलेट और उपकरण' : 'Templates & Tools'}</Link>
              <Link href="/alerts" onClick={() => setMenuOpen(false)}>{hi ? 'सूचना सत्यापन' : 'Info Verification'}</Link>
              <Link href="/manifesto" onClick={() => setMenuOpen(false)}>{hi ? 'घोषणापत्र' : 'Manifesto'}</Link>
              <Link href="/guide" onClick={() => setMenuOpen(false)}>{hi ? 'उपयोग गाइड' : 'How to Use'}</Link>
            </div>
            <div className="nav-menu-section">
              <p className="nav-menu-heading">{hi ? 'खाता' : 'ACCOUNT'}</p>
              <Link href="/my-posts" onClick={() => setMenuOpen(false)}>{hi ? 'मेरी पोस्ट' : 'My Posts'}</Link>
              <button type="button" onClick={toggleLocale}>{hi ? 'English' : 'हिन्दी'}</button>
            </div>
            <div className="nav-menu-emergency">
              <strong>{hi ? 'आपातकालीन: 112' : 'EMERGENCY: 112'}</strong>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
