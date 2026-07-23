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

        {/* Desktop nav — action-oriented categories */}
        <div className="desktop-nav">
          <Link href="/map" className="nav-link nav-link-primary">{hi ? 'अभी' : 'NOW'}</Link>
          <Link href="/act" className="nav-link">{hi ? 'लड़ो' : 'FIGHT'}</Link>
          <Link href="/safety" className="nav-link">{hi ? 'अधिकार' : 'RIGHTS'}</Link>
          <Link href="/groups" className="nav-link">{hi ? 'संगठन' : 'ORGANIZE'}</Link>
          <button type="button" onClick={toggleLocale} className="language-button">{hi ? 'EN' : 'हि'}</button>
          <button type="button" onClick={() => setMenuOpen((o) => !o)} className="menu-button" aria-expanded={menuOpen} aria-label="Menu">☰</button>
        </div>

        {/* Mobile trigger */}
        <button type="button" onClick={() => setMenuOpen((o) => !o)} className="mobile-menu-button" aria-label="Menu" aria-expanded={menuOpen}>
          <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
        </button>

        {/* Full menu */}
        {menuOpen && (
          <div className="nav-menu" role="dialog" aria-label="Navigation">
            <div className="nav-menu-section">
              <p className="nav-menu-heading">{hi ? 'अभी' : 'RIGHT NOW'}</p>
              <Link href="/map" onClick={() => setMenuOpen(false)}>{hi ? 'लाइव अभियान' : 'Live Campaigns'}</Link>
              <Link href="/expect" onClick={() => setMenuOpen(false)}>{hi ? 'विरोध की तैयारी' : 'Protest Preparation'}</Link>
              <Link href="/safety" onClick={() => setMenuOpen(false)}>{hi ? 'अधिकार कार्ड' : 'Rights Card'}</Link>
              <Link href="/resources" onClick={() => setMenuOpen(false)}>{hi ? 'आपातकालीन संसाधन' : 'Emergency Resources'}</Link>
            </div>
            <div className="nav-menu-section">
              <p className="nav-menu-heading">{hi ? 'लड़ो' : 'FIGHT BACK'}</p>
              <Link href="/rti" onClick={() => setMenuOpen(false)}>{hi ? 'RTI जनरेटर' : 'RTI Generator'}</Link>
              <Link href="/fir" onClick={() => setMenuOpen(false)}>{hi ? 'FIR असिस्टेंट' : 'FIR Assistant'}</Link>
              <Link href="/demands" onClick={() => setMenuOpen(false)}>{hi ? 'माँग ट्रैकर' : 'Demand Tracker'}</Link>
              <Link href="/representatives" onClick={() => setMenuOpen(false)}>{hi ? 'प्रतिनिधि को लिखें' : 'Write to Rep'}</Link>
              <Link href="/governance" onClick={() => setMenuOpen(false)}>{hi ? 'शासन स्कोरकार्ड' : 'Governance Scorecard'}</Link>
              <Link href="/playbook" onClick={() => setMenuOpen(false)}>{hi ? 'एस्केलेशन प्लेबुक' : 'Escalation Playbook'}</Link>
            </div>
            <div className="nav-menu-section">
              <p className="nav-menu-heading">{hi ? 'अधिकार' : 'YOUR RIGHTS'}</p>
              <Link href="/safety" onClick={() => setMenuOpen(false)}>{hi ? 'पॉकेट अधिकार कार्ड' : 'Pocket Rights Card'}</Link>
              <Link href="/expect" onClick={() => setMenuOpen(false)}>{hi ? 'क्या उम्मीद करें' : 'What to Expect'}</Link>
              <Link href="/communication" onClick={() => setMenuOpen(false)}>{hi ? 'डिजिटल सुरक्षा' : 'Digital Security'}</Link>
              <Link href="/resources" onClick={() => setMenuOpen(false)}>{hi ? 'कानूनी सहायता + हेल्पलाइन' : 'Legal Aid + Helplines'}</Link>
              <Link href="/toolkit" onClick={() => setMenuOpen(false)}>{hi ? 'टेम्पलेट + दस्तावेज़' : 'Templates + Documents'}</Link>
            </div>
            <div className="nav-menu-section">
              <p className="nav-menu-heading">{hi ? 'संगठन' : 'ORGANIZE'}</p>
              <Link href="/groups" onClick={() => setMenuOpen(false)}>{hi ? 'ग्रुप खोजें / बनाएँ' : 'Find / Create Groups'}</Link>
              <Link href="/contribute" onClick={() => setMenuOpen(false)}>{hi ? 'योगदान बोर्ड' : 'Contribution Board'}</Link>
              <Link href="/organize" onClick={() => setMenuOpen(false)}>{hi ? 'संगठन गाइड' : 'Organizing Guide'}</Link>
              <Link href="/directory" onClick={() => setMenuOpen(false)}>{hi ? 'संगठन डायरेक्टरी' : 'Org Directory'}</Link>
            </div>
            <div className="nav-menu-section">
              <p className="nav-menu-heading">{hi ? 'और' : 'MORE'}</p>
              <Link href="/my-posts" onClick={() => setMenuOpen(false)}>{hi ? 'मेरी पोस्ट' : 'My Posts'}</Link>
              <Link href="/guide" onClick={() => setMenuOpen(false)}>{hi ? 'उपयोग गाइड' : 'How to Use'}</Link>
              <Link href="/manifesto" onClick={() => setMenuOpen(false)}>{hi ? 'यह मंच क्यों' : 'Why This Platform'}</Link>
              <button type="button" onClick={toggleLocale}>{hi ? 'Switch to English' : 'हिन्दी में देखें'}</button>
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
