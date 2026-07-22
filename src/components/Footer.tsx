import { Locale } from '@/types';

interface FooterProps {
  locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
  const isHindi = locale === 'hi';

  return (
    <footer className="bg-[var(--color-card)] border-t border-[var(--color-border)] mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-[var(--color-text-muted)]">
            <span className="font-semibold text-[var(--color-primary)]">🤝 {isHindi ? 'सहायता' : 'Sahayata'}</span>
            {' — '}
            {isHindi
              ? 'नागरिक परस्पर-सहायता बुनियादी ढांचा। कोई राजनीतिक दल नहीं। किसी से संबद्ध नहीं।'
              : 'Civic mutual-aid infrastructure. Not a political party. Not affiliated with anyone.'}
          </div>
          <div className="text-xs text-[var(--color-text-muted)]">
            {isHindi
              ? 'कोई ट्रैकिंग नहीं। कोई विज्ञापन नहीं। न्यूनतम डेटा संग्रह। पोस्ट 72 घंटों में समाप्त हो जाती हैं।'
              : 'No tracking. No ads. Minimum data collection. Posts expire in 72 hours.'}
          </div>
        </div>
      </div>
    </footer>
  );
}
