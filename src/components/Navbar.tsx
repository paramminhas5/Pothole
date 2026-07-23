'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Locale } from '@/types';
import PassphraseAuth from './PassphraseAuth';

interface NavbarProps { locale: Locale }

export default function Navbar({ locale }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
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

        <div className="desktop-nav">
          <Link href="/how-it-works" className="nav-link">{hi ? 'कैसे काम करता है' : 'How It Works'}</Link>
          <Link href="/expect" className="nav-link">{hi ? 'तैयारी' : 'Prepare'}</Link>
          <Link href="/act" className="nav-link">{hi ? 'लड़ो' : 'Fight'}</Link>
          <Link href="/groups" className="nav-link">{hi ? 'संगठन' : 'Organize'}</Link>
          <Link href="/search" className="nav-link" aria-label={hi ? 'खोजें' : 'Search'}>🔍</Link>
          <button type="button" onClick={() => setShowAuth(true)} className="nav-link" aria-label={hi ? 'पहचान' : 'Identity'}>🔐</button>
          <button type="button" onClick={toggleLocale} className="language-button">{hi ? 'EN' : 'हि'}</button>
          <button type="button" onClick={() => setMenuOpen((o) => !o)} className="menu-button" aria-expanded={menuOpen} aria-label="Menu">☰</button>
        </div>

        <button type="button" onClick={() => setMenuOpen((o) => !o)} className="mobile-menu-button" aria-label="Menu" aria-expanded={menuOpen}>
          <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
        </button>

        {menuOpen && (
          <div className="nav-menu" role="dialog" aria-label="Navigation">
            <div className="nav-menu-section">
              <p className="nav-menu-heading">{hi ? 'तैयार हों' : 'GET READY'}</p>
              <Link href="/how-it-works" onClick={() => setMenuOpen(false)}>{hi ? 'यह कैसे काम करता है' : 'How It Works'}</Link>
              <Link href="/start" onClick={() => setMenuOpen(false)}>{hi ? 'मेरा एक्शन प्लान' : 'My Action Plan'}</Link>
              <Link href="/expect" onClick={() => setMenuOpen(false)}>{hi ? 'विरोध की तैयारी' : 'Protest Preparation'}</Link>
              <Link href="/protest-mode" onClick={() => setMenuOpen(false)}>{hi ? 'प्रोटेस्ट मोड' : 'Protest Mode'}</Link>
              <Link href="/buddy" onClick={() => setMenuOpen(false)}>{hi ? 'बडी सिस्टम' : 'Buddy System'}</Link>
              <Link href="/help-now" onClick={() => setMenuOpen(false)}>{hi ? 'असली मदद अभी' : 'Real Help Now'}</Link>
              <Link href="/safety" onClick={() => setMenuOpen(false)}>{hi ? 'अधिकार कार्ड' : 'Rights Card'}</Link>
              <Link href="/offline" onClick={() => setMenuOpen(false)}>{hi ? 'ऑफलाइन संचार' : 'Offline Comms'}</Link>
            </div>
            <div className="nav-menu-section">
              <p className="nav-menu-heading">{hi ? 'लड़ो' : 'FIGHT BACK'}</p>
              <Link href="/rti" onClick={() => setMenuOpen(false)}>{hi ? 'RTI जनरेटर' : 'RTI Generator'}</Link>
              <Link href="/rti/track" onClick={() => setMenuOpen(false)}>{hi ? 'RTI ट्रैकर' : 'RTI Tracker'}</Link>
              <Link href="/fir" onClick={() => setMenuOpen(false)}>{hi ? 'FIR असिस्टेंट' : 'FIR Assistant'}</Link>
              <Link href="/demands" onClick={() => setMenuOpen(false)}>{hi ? 'माँग ट्रैकर' : 'Demand Tracker'}</Link>
              <Link href="/representatives" onClick={() => setMenuOpen(false)}>{hi ? 'प्रतिनिधि को लिखें' : 'Write to Rep'}</Link>
              <Link href="/governance" onClick={() => setMenuOpen(false)}>{hi ? 'शासन स्कोरकार्ड' : 'Governance Scorecard'}</Link>
              <Link href="/playbook" onClick={() => setMenuOpen(false)}>{hi ? 'एस्केलेशन' : 'Escalation Playbook'}</Link>
            </div>
            <div className="nav-menu-section">
              <p className="nav-menu-heading">{hi ? 'संगठन' : 'ORGANIZE'}</p>
              <Link href="/groups" onClick={() => setMenuOpen(false)}>{hi ? 'ग्रुप' : 'Groups'}</Link>
              <Link href="/contribute" onClick={() => setMenuOpen(false)}>{hi ? 'योगदान बोर्ड' : 'Contribute'}</Link>
              <Link href="/organize" onClick={() => setMenuOpen(false)}>{hi ? 'संगठन गाइड' : 'Organizing Guide'}</Link>
              <Link href="/submit" onClick={() => setMenuOpen(false)}>{hi ? 'संसाधन जमा करें' : 'Submit Resource'}</Link>
              <Link href="/map" onClick={() => setMenuOpen(false)}>{hi ? 'लाइव मैप' : 'Live Map'}</Link>
            </div>
            <div className="nav-menu-section">
              <p className="nav-menu-heading">{hi ? 'समझें' : 'UNDERSTAND'}</p>
              <Link href="/learn" onClick={() => setMenuOpen(false)}>{hi ? 'सत्ता कैसे काम करती है' : 'How Power Works'}</Link>
              <Link href="/glossary" onClick={() => setMenuOpen(false)}>{hi ? 'कानूनी शब्दावली' : 'Legal Glossary'}</Link>
              <Link href="/communication" onClick={() => setMenuOpen(false)}>{hi ? 'सुरक्षित संचार' : 'Secure Comms'}</Link>
              <Link href="/resources" onClick={() => setMenuOpen(false)}>{hi ? 'संसाधन निर्देशिका' : 'Resource Directory'}</Link>
              <Link href="/city/delhi" onClick={() => setMenuOpen(false)}>{hi ? 'दिल्ली गाइड' : 'Delhi Guide'}</Link>
              <Link href="/manifesto" onClick={() => setMenuOpen(false)}>{hi ? 'घोषणापत्र' : 'Manifesto'}</Link>
              <Link href="/developers" onClick={() => setMenuOpen(false)}>{hi ? 'डेवलपर' : 'Developers'}</Link>
            </div>
            <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--color-border-light)', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link href="/search" onClick={() => setMenuOpen(false)} style={{ fontWeight: 700 }}>🔍 {hi ? 'खोजें' : 'Search'}</Link>
              <Link href="/my-posts" onClick={() => setMenuOpen(false)} style={{ fontWeight: 700 }}>{hi ? 'मेरी पोस्ट' : 'My Posts'}</Link>
              <button type="button" onClick={toggleLocale} style={{ fontWeight: 700, background: 'none', border: 'none', color: 'var(--color-text)', cursor: 'pointer', padding: 0, font: 'inherit' }}>{hi ? 'English' : 'हिन्दी'}</button>
            </div>
            <div className="nav-menu-emergency">
              <strong>{hi ? '⚖️ मुफ्त वकील: DSLSA 1516 (24/7) · HRLN hrln.org' : '⚖️ Free lawyer: DSLSA 1516 (24/7) · HRLN hrln.org'}</strong>
            </div>
          </div>
        )}
      </nav>
      {showAuth && <PassphraseAuth locale={locale} onAuthenticated={() => setShowAuth(false)} onClose={() => setShowAuth(false)} />}
    </header>
  );
}
