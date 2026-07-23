import Link from 'next/link';
import { Locale } from '@/types';

interface FooterProps {
  locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
  const hi = locale === 'hi';

  return (
    <footer className="site-footer">
      <div className="page-shell">
        {/* EMERGENCY STRIP */}
        <div style={{ padding: '14px 0 24px', borderBottom: '1px solid var(--color-border-light)', marginBottom: '28px', textAlign: 'center' }}>
          <p style={{ fontWeight: 900, fontSize: '0.85rem', letterSpacing: '0.05em' }}>
            {hi ? '🆘 आपातकालीन:' : '🆘 Emergency:'}{' '}
            <a href="tel:112" style={{ color: 'var(--color-red)', textDecoration: 'none' }}>112</a>{' · '}
            <a href="tel:1516" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>{hi ? 'वकील 1516' : 'Lawyer 1516'}</a>{' · '}
            <a href="tel:181" style={{ textDecoration: 'none' }}>{hi ? 'महिला 181' : 'Women 181'}</a>{' · '}
            <a href="tel:108" style={{ textDecoration: 'none' }}>{hi ? 'एम्बुलेंस 108' : 'Ambulance 108'}</a>
          </p>
        </div>

        {/* 3-COLUMN GRID */}
        <div className="footer-grid">
          <div>
            <p className="footer-title">{hi ? 'कार्रवाई' : 'ACT'}</p>
            <div className="footer-links">
              <Link href="/start">{hi ? 'एक्शन प्लान बनाएँ' : 'Get Action Plan'}</Link>
              <Link href="/rti">{hi ? 'RTI जनरेटर' : 'RTI Generator'}</Link>
              <Link href="/rti/track">{hi ? 'RTI ट्रैकर' : 'RTI Tracker'}</Link>
              <Link href="/fir">{hi ? 'FIR असिस्टेंट' : 'FIR Assistant'}</Link>
              <Link href="/demands">{hi ? 'माँग ट्रैकर' : 'Demand Tracker'}</Link>
              <Link href="/representatives">{hi ? 'प्रतिनिधि लिखें' : 'Write to Rep'}</Link>
              <Link href="/governance">{hi ? 'शासन स्कोरकार्ड' : 'Governance Scorecard'}</Link>
            </div>
          </div>
          <div>
            <p className="footer-title">{hi ? 'तैयार हों' : 'PREPARE'}</p>
            <div className="footer-links">
              <Link href="/safety">{hi ? 'अधिकार कार्ड' : 'Rights Card'}</Link>
              <Link href="/expect">{hi ? 'विरोध तैयारी' : 'Protest Prep'}</Link>
              <Link href="/protest-mode">{hi ? 'प्रोटेस्ट मोड' : 'Protest Mode'}</Link>
              <Link href="/glossary">{hi ? 'कानूनी शब्दावली' : 'Legal Glossary'}</Link>
              <Link href="/communication">{hi ? 'सुरक्षित संचार' : 'Secure Comms'}</Link>
              <Link href="/resources">{hi ? 'संसाधन + हेल्पलाइन' : 'Resources + Helplines'}</Link>
              <Link href="/city/delhi">{hi ? 'दिल्ली गाइड' : 'Delhi Guide'}</Link>
            </div>
          </div>
          <div>
            <p className="footer-title">{hi ? 'बनाएँ' : 'BUILD'}</p>
            <div className="footer-links">
              <Link href="/groups">{hi ? 'ग्रुप खोजें/बनाएँ' : 'Find/Create Groups'}</Link>
              <Link href="/organize">{hi ? 'संगठन गाइड' : 'Organizing Guide'}</Link>
              <Link href="/contribute">{hi ? 'योगदान बोर्ड' : 'Contribute'}</Link>
              <Link href="/submit">{hi ? 'संसाधन जमा करें' : 'Submit Resource'}</Link>
              <Link href="/developers">{hi ? 'डेवलपर गाइड' : 'Developers'}</Link>
              <Link href="/infrastructure">{hi ? 'इन्फ्रास्ट्रक्चर' : 'Infrastructure'}</Link>
              <Link href="/manifesto">{hi ? 'घोषणापत्र' : 'Manifesto'}</Link>
            </div>
          </div>
        </div>

        {/* BOTTOM META */}
        <div className="footer-note">
          <p>{hi ? 'ओपन सोर्स (AGPL-3.0) · ₹500/माह पर चलता है · कोई विज्ञापन नहीं · कोई ट्रैकिंग नहीं' : 'Open source (AGPL-3.0) · Runs on ₹500/mo · No ads · No tracking'}</p>
          <p style={{ marginTop: '6px' }}>
            <a href="https://github.com/paramminhas5/Pothole" target="_blank" rel="noopener noreferrer" style={{ marginRight: '16px' }}>GitHub</a>
            <Link href="/search" style={{ marginRight: '16px' }}>{hi ? 'खोजें' : 'Search'}</Link>
            <Link href="/map" style={{ marginRight: '16px' }}>{hi ? 'लाइव मैप' : 'Live Map'}</Link>
            <Link href="/playbook">{hi ? 'प्लेबुक' : 'Playbook'}</Link>
          </p>
          <p style={{ marginTop: '12px', opacity: 0.6, fontSize: '0.8rem' }}>
            {hi ? 'कुचलो — वापस आएँगे। ब्लॉक करो — दस मिरर। बंद करो — ऑफलाइन काम करता है। 🪳' : 'Crush us — we come back. Block us — ten mirrors. Shut us down — works offline. 🪳'}
          </p>
        </div>
      </div>
    </footer>
  );
}
