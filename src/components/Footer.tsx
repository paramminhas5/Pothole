import { Locale } from '@/types';

interface FooterProps {
  locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
  const isHindi = locale === 'hi';

  return (
    <footer className="border-t-[3px] border-[var(--color-border)] bg-[var(--color-card)] mt-auto">
      {/* Marquee-style banner */}
      <div className="brutal-banner text-center">
        {isHindi
          ? 'कोई ट्रैकिंग नहीं · कोई विज्ञापन नहीं · न्यूनतम डेटा · पोस्ट 72 घंटों में समाप्त · ओपन सोर्स'
          : 'NO TRACKING · NO ADS · MINIMUM DATA · POSTS EXPIRE IN 72H · OPEN SOURCE'}
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-[var(--color-accent)] border-[2.5px] border-[var(--color-border)] flex items-center justify-center">
                <span className="text-white font-black text-xs">S</span>
              </div>
              <span className="font-black text-lg">{isHindi ? 'सहायता' : 'SAHAYATA'}</span>
            </div>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              {isHindi
                ? 'नागरिक परस्पर-सहायता बुनियादी ढांचा। कोई राजनीतिक दल नहीं। किसी से संबद्ध नहीं। किसी का प्रमोशन नहीं।'
                : 'Civic mutual-aid infrastructure. Not a political party. Not affiliated with anyone. Not promoting anyone.'}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider mb-3">
              {isHindi ? 'लिंक' : 'LINKS'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/directory" className="hover:text-[var(--color-accent)] transition-colors">{isHindi ? 'निर्देशिका' : 'Directory'}</a></li>
              <li><a href="/board" className="hover:text-[var(--color-accent)] transition-colors">{isHindi ? 'ज़रूरतें और प्रस्ताव' : 'Needs & Offers'}</a></li>
              <li><a href="/safety" className="hover:text-[var(--color-accent)] transition-colors">{isHindi ? 'अपने अधिकार जानें' : 'Know Your Rights'}</a></li>
              <li><a href="/submit-chapter" className="hover:text-[var(--color-accent)] transition-colors">{isHindi ? 'समूह पंजीकृत करें' : 'Register a Group'}</a></li>
            </ul>
          </div>

          {/* Principles */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider mb-3">
              {isHindi ? 'सिद्धांत' : 'PRINCIPLES'}
            </h4>
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              <li>→ {isHindi ? 'गोपनीयता डिज़ाइन द्वारा' : 'Privacy by design'}</li>
              <li>→ {isHindi ? 'अतिरेक से लचीलापन' : 'Resilience through redundancy'}</li>
              <li>→ {isHindi ? 'खराब फ़ोन पर काम करे' : 'Works on a bad phone'}</li>
              <li>→ {isHindi ? 'विश्वास ही उत्पाद है' : 'Trust is the product'}</li>
            </ul>
          </div>
        </div>

        <hr className="brutal-divider" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-[var(--color-text-muted)]">
          <span>{isHindi ? 'जनता द्वारा, जनता के लिए बनाया गया' : 'Built by the people, for the people.'}</span>
          <span>{isHindi ? 'यह प्लेटफ़ॉर्म बचाव बुनियादी ढांचा है' : 'This platform is rescue infrastructure.'}</span>
        </div>
      </div>
    </footer>
  );
}
