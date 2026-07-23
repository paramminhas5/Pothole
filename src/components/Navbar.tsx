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
      <nav className="page-shell nav-shell" aria-label={hi ? 'मुख्य' : 'Main'}>
        <Link href="/" className="brand-link">
          <span className="brand-mark" aria-hidden="true">S</span>
          <span className="brand-name">{hi ? 'सहायता' : 'SAHAYATA'}</span>
        </Link>

        {/* Desktop: 4 links + language + more */}
        <div className="desktop-nav">
          <Link href="/create-post" className="nav-link nav-link-primary">{hi ? 'मदद' : 'Help'}</Link>
          <Link href="/board" className="nav-link">{hi ? 'बोर्ड' : 'Board'}</Link>
          <Link href="/groups" className="nav-link">{hi ? 'ग्रुप' : 'Groups'}</Link>
          <Link href="/act" className="nav-link">{hi ? 'कार्रवाई' : 'Act'}</Link>
          <button type="button" onClick={toggleLocale} className="language-button">{hi ? 'EN' : 'हि'}</button>
          <button type="button" onClick={() => setMenuOpen((o) => !o)} className="menu-button" aria-expanded={menuOpen}>☰</button>
        </div>

        {/* Mobile trigger */}
        <button type="button" onClick={() => setMenuOpen((o) => !o)} className="mobile-menu-button" aria-label="Menu" aria-expanded={menuOpen}>
          <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
        </button>

        {/* Full menu */}
        {menuOpen && (
          <div className="nav-menu" role="dialog" aria-label="Navigation">
            <div className="nav-menu-section">
              <p className="nav-menu-heading">{hi ? 'कार्रवाई' : 'ACT'}</p>
              <Link href="/create-post" onClick={() => setMenuOpen(false)}>{hi ? '🆘 मदद पाएँ/दें' : '🆘 Get/Give Help'}</Link>
              <Link href="/board" onClick={() => setMenuOpen(false)}>{hi ? '📋 लाइव बोर्ड' : '📋 Live Board'}</Link>
              <Link href="/groups" onClick={() => setMenuOpen(false)}>{hi ? '👥 ग्रुप' : '👥 Groups'}</Link>
              <Link href="/rti" onClick={() => setMenuOpen(false)}>{hi ? '📄 RTI जनरेटर' : '📄 RTI Generator'}</Link>
              <Link href="/fir" onClick={() => setMenuOpen(false)}>{hi ? '🚨 FIR असिस्टेंट' : '🚨 FIR Assistant'}</Link>
              <Link href="/representatives" onClick={() => setMenuOpen(false)}>{hi ? '✉️ प्रतिनिधि को लिखें' : '✉️ Write to Rep'}</Link>
            </div>
            <div className="nav-menu-section">
              <p className="nav-menu-heading">{hi ? 'सीखें' : 'LEARN'}</p>
              <Link href="/safety" onClick={() => setMenuOpen(false)}>{hi ? '⚖️ अधिकार' : '⚖️ Rights'}</Link>
              <Link href="/resources" onClick={() => setMenuOpen(false)}>{hi ? '📞 संसाधन' : '📞 Resources'}</Link>
              <Link href="/playbook" onClick={() => setMenuOpen(false)}>{hi ? '📖 प्लेबुक' : '📖 Playbook'}</Link>
              <Link href="/toolkit" onClick={() => setMenuOpen(false)}>{hi ? '📝 टेम्पलेट' : '📝 Templates'}</Link>
              <Link href="/organize" onClick={() => setMenuOpen(false)}>{hi ? '🏗️ संगठन गाइड' : '🏗️ Organize Guide'}</Link>
              <Link href="/communication" onClick={() => setMenuOpen(false)}>{hi ? '📱 संचार' : '📱 Comms'}</Link>
            </div>
            <div className="nav-menu-section">
              <p className="nav-menu-heading">{hi ? 'ट्रैक करें' : 'TRACK'}</p>
              <Link href="/map" onClick={() => setMenuOpen(false)}>{hi ? '🗺️ लाइव मैप' : '🗺️ Live Map'}</Link>
              <Link href="/governance" onClick={() => setMenuOpen(false)}>{hi ? '📊 शासन ट्रैकर' : '📊 Governance'}</Link>
              <Link href="/demands" onClick={() => setMenuOpen(false)}>{hi ? '📋 माँग ट्रैकर' : '📋 Demands'}</Link>
              <Link href="/contribute" onClick={() => setMenuOpen(false)}>{hi ? '🤝 योगदान' : '🤝 Contribute'}</Link>
            </div>
            <div className="nav-menu-section">
              <p className="nav-menu-heading">{hi ? 'और' : 'MORE'}</p>
              <Link href="/my-posts" onClick={() => setMenuOpen(false)}>{hi ? 'मेरी पोस्ट' : 'My Posts'}</Link>
              <Link href="/directory" onClick={() => setMenuOpen(false)}>{hi ? 'डायरेक्टरी' : 'Directory'}</Link>
              <Link href="/guide" onClick={() => setMenuOpen(false)}>{hi ? 'उपयोग गाइड' : 'How to Use'}</Link>
              <Link href="/manifesto" onClick={() => setMenuOpen(false)}>{hi ? 'घोषणापत्र' : 'Manifesto'}</Link>
              <Link href="/alerts" onClick={() => setMenuOpen(false)}>{hi ? 'सूचना जाँच' : 'Info Verify'}</Link>
              <button type="button" onClick={toggleLocale}>{hi ? 'English' : 'हिन्दी'}</button>
            </div>
            <div className="nav-menu-emergency">
              <strong>{hi ? '🆘 आपातकालीन: 112 | वकील: 1516 | महिला: 181' : '🆘 Emergency: 112 | Lawyer: 1516 | Women: 181'}</strong>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
