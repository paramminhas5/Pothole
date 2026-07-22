import Link from 'next/link';
import { Locale } from '@/types';

interface FooterProps { locale: Locale }

export default function Footer({ locale }: FooterProps) {
  const isHindi = locale === 'hi';
  return (
    <footer className="site-footer">
      <div className="page-shell footer-grid">
        <div>
          <p className="footer-title">{isHindi ? 'सहायता' : 'Sahayata'}</p>
          <p className="footer-copy">{isHindi ? 'स्थानीय मदद माँगने, देने और खोजने की सरल जगह। यह आपातकालीन सेवा नहीं है।' : 'A simple place to ask for, offer, and find local help. This is not an emergency service.'}</p>
        </div>
        <nav aria-label={isHindi ? 'सहायता लिंक' : 'Support links'} className="footer-links">
          <Link href="/safety">{isHindi ? 'सुरक्षित रहें' : 'Stay safe'}</Link>
          <Link href="/my-posts">{isHindi ? 'मेरी पोस्ट' : 'My posts'}</Link>
          <Link href="/submit-chapter">{isHindi ? 'समूह जोड़ें' : 'Add a group'}</Link>
        </nav>
      </div>
      <div className="page-shell footer-note">{isHindi ? 'सटीक पता, पहचान संख्या या निजी जानकारी पोस्ट न करें। 18 वर्ष से कम हैं तो किसी भरोसेमंद वयस्क के साथ इसका उपयोग करें।' : 'Do not post exact addresses, ID numbers, or private details. If you are under 18, use this with a trusted adult.'}</div>
    </footer>
  );
}
