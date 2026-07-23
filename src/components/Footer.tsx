import Link from 'next/link';
import { Locale } from '@/types';

interface FooterProps { locale: Locale }

export default function Footer({ locale }: FooterProps) {
  const hi = locale === 'hi';
  return (
    <footer className="site-footer">
      <div className="page-shell footer-grid">
        <div>
          <p className="footer-title">{hi ? 'सहायता' : 'Sahayata'}</p>
          <p className="footer-copy">{hi ? 'नागरिक समन्वय बुनियादी ढाँचा। गोपनीय। ऑफलाइन-सक्षम। सेंसरशिप-प्रतिरोधी।' : 'Civic coordination infrastructure. Private. Offline-capable. Censorship-resistant.'}</p>
        </div>
        <nav aria-label={hi ? 'कार्रवाई' : 'Act'} className="footer-links">
          <strong>{hi ? 'कार्रवाई' : 'Act'}</strong>
          <Link href="/create-post">{hi ? 'मदद पाएँ/दें' : 'Get/Give Help'}</Link>
          <Link href="/board">{hi ? 'लाइव बोर्ड' : 'Live Board'}</Link>
          <Link href="/rti">{hi ? 'RTI जनरेटर' : 'RTI Generator'}</Link>
          <Link href="/fir">{hi ? 'FIR असिस्टेंट' : 'FIR Assistant'}</Link>
          <Link href="/demands">{hi ? 'डिमांड ट्रैकर' : 'Demand Tracker'}</Link>
          <Link href="/vault">{hi ? 'एविडेंस वॉल्ट' : 'Evidence Vault'}</Link>
        </nav>
        <nav aria-label={hi ? 'संगठन' : 'Organize'} className="footer-links">
          <strong>{hi ? 'संगठन' : 'Organize'}</strong>
          <Link href="/groups">{hi ? 'एन्क्रिप्टेड ग्रुप' : 'Encrypted Groups'}</Link>
          <Link href="/organize">{hi ? 'संगठन गाइड' : 'How to Organize'}</Link>
          <Link href="/communication">{hi ? 'सुरक्षित संचार' : 'Secure Comms'}</Link>
          <Link href="/directory">{hi ? 'डायरेक्टरी' : 'Directory'}</Link>
        </nav>
        <nav aria-label={hi ? 'सीखें' : 'Learn'} className="footer-links">
          <strong>{hi ? 'सीखें' : 'Learn'}</strong>
          <Link href="/safety">{hi ? 'अधिकार गाइड' : 'Know Your Rights'}</Link>
          <Link href="/resources">{hi ? 'हेल्पलाइन' : 'Helplines'}</Link>
          <Link href="/playbook">{hi ? 'प्लेबुक' : 'Playbook'}</Link>
          <Link href="/toolkit">{hi ? 'टेम्पलेट' : 'Templates'}</Link>
          <Link href="/manifesto">{hi ? 'घोषणापत्र' : 'Manifesto'}</Link>
        </nav>
        <div className="footer-emergency">
          <strong>{hi ? 'आपातकालीन' : 'Emergency'}</strong>
          <p>112 — {hi ? 'एकीकृत' : 'Unified'}</p>
          <p>181 — {hi ? 'महिला' : 'Women'}</p>
          <p>1098 — {hi ? 'बच्चे' : 'Children'}</p>
          <p>1930 — {hi ? 'साइबर' : 'Cyber'}</p>
        </div>
      </div>
      <div className="page-shell footer-bottom">
        <div className="footer-bottom-links">
          <Link href="/guide">{hi ? 'उपयोग गाइड' : 'How to Use'}</Link>
          <Link href="/alerts">{hi ? 'सूचना सत्यापन' : 'Info Verification'}</Link>
          <Link href="/my-posts">{hi ? 'मेरी पोस्ट' : 'My Posts'}</Link>
        </div>
        <p className="footer-note">{hi ? 'सटीक पता, पहचान संख्या या निजी जानकारी पोस्ट न करें। 18 वर्ष से कम हैं तो भरोसेमंद वयस्क के साथ इस्तेमाल करें। यह आपातकालीन सेवा नहीं है।' : 'Do not post exact addresses, ID numbers, or private details. If under 18, use with a trusted adult. This is not an emergency service.'}</p>
      </div>
    </footer>
  );
}
