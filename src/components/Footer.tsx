import Link from 'next/link';
import { Locale } from '@/types';

interface FooterProps { locale: Locale }

export default function Footer({ locale }: FooterProps) {
  const hi = locale === 'hi';

  return (
    <footer className="site-footer" style={{ paddingBlock: '24px 20px' }}>
      <div className="page-shell" style={{ textAlign: 'center' }}>
        <p style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '12px' }}>
          {hi ? '⚖️ मुफ्त वकील चाहिए?' : '⚖️ Need a free lawyer?'}{' '}
          <a href="tel:1516" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>DSLSA 1516</a>
          {' · '}
          <a href="https://hrln.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>HRLN ↗</a>
        </p>
        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
          <Link href="/" style={{ marginRight: '12px' }}>Sahayata</Link>
          {' · '}
          <Link href="/how-it-works" style={{ margin: '0 12px' }}>{hi ? 'कैसे काम करता है' : 'How It Works'}</Link>
          {' · '}
          <Link href="/search" style={{ margin: '0 12px' }}>{hi ? 'खोजें' : 'Search'}</Link>
          {' · '}
          <a href="https://github.com/paramminhas5/Pothole" target="_blank" rel="noopener noreferrer" style={{ margin: '0 12px' }}>GitHub</a>
        </p>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '8px', opacity: 0.7 }}>
          {hi ? 'ओपन सोर्स (AGPL-3.0) · ₹500/माह · कोई विज्ञापन नहीं · कोई ट्रैकिंग नहीं · कुचलो — वापस आएँगे 🪳' : 'Open source (AGPL-3.0) · ₹500/mo · No ads · No tracking · Crush us — we come back 🪳'}
        </p>
      </div>
    </footer>
  );
}
