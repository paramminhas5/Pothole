import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';
import { t } from '@/i18n';

export default async function HomePage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const isHindi = locale === 'hi';

  return (
    <div>
      {/* Hero — massive, bold, unmistakable */}
      <section className="border-b-[3px] border-[var(--color-border)] bg-[var(--color-card)]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
          <div className="max-w-4xl">
            <h1 className="heading-display mb-6">
              {isHindi ? (
                <>मैं कहाँ जुड़ूँ?<br /><span className="text-[var(--color-accent)]">क्या चाहिए?</span><br />मैं क्या दे सकता हूँ?</>
              ) : (
                <>Where do I plug in?<br /><span className="text-[var(--color-accent)]">What&apos;s needed?</span><br />What can I offer?</>
              )}
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-text-muted)] max-w-2xl mb-10 leading-relaxed">
              {t(locale, 'home.heroSubtitle') as string}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/directory" className="brutal-btn brutal-btn-dark brutal-btn-lg">
                {isHindi ? 'निर्देशिका देखें' : 'BROWSE DIRECTORY'} →
              </Link>
              <Link href="/board" className="brutal-btn brutal-btn-primary brutal-btn-lg">
                {isHindi ? 'ज़रूरतें और प्रस्ताव' : 'NEEDS & OFFERS'} →
              </Link>
              <Link href="/create-post" className="brutal-btn brutal-btn-lg">
                {isHindi ? 'पोस्ट करें' : 'POST NOW'} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Banner — always visible */}
      <div className="brutal-banner text-center">
        ⚠️ {t(locale, 'common.safetyNote') as string}
      </div>

      {/* Live Stats */}
      <section className="border-b-[3px] border-[var(--color-border)]">
        <div className="grid grid-cols-2 md:grid-cols-4">
          <div className="brutal-stat border-r-[2.5px] border-b-[2.5px] md:border-b-0 border-[var(--color-border)]">
            <div className="brutal-stat-number">12</div>
            <div className="brutal-stat-label">{isHindi ? 'शहर' : 'Cities'}</div>
          </div>
          <div className="brutal-stat border-b-[2.5px] md:border-b-0 md:border-r-[2.5px] border-[var(--color-border)]">
            <div className="brutal-stat-number">47</div>
            <div className="brutal-stat-label">{isHindi ? 'सक्रिय समूह' : 'Active Groups'}</div>
          </div>
          <div className="brutal-stat border-r-[2.5px] border-[var(--color-border)]">
            <div className="brutal-stat-number">156</div>
            <div className="brutal-stat-label">{isHindi ? 'खुली ज़रूरतें' : 'Open Needs'}</div>
          </div>
          <div className="brutal-stat">
            <div className="brutal-stat-number">89</div>
            <div className="brutal-stat-label">{isHindi ? 'प्रस्ताव' : 'Offers'}</div>
          </div>
        </div>
      </section>

      {/* What this is / What this isn't */}
      <section className="border-b-[3px] border-[var(--color-border)]">
        <div className="grid md:grid-cols-2">
          <div className="p-8 md:p-12 border-b-[2.5px] md:border-b-0 md:border-r-[2.5px] border-[var(--color-border)] bg-[var(--color-lime)]/10">
            <div className="brutal-badge brutal-badge-lime mb-4">✓ {isHindi ? 'यह क्या है' : 'WHAT THIS IS'}</div>
            <p className="text-[var(--color-text)] leading-relaxed">
              {t(locale, 'home.whatIsThisText') as string}
            </p>
          </div>
          <div className="p-8 md:p-12 bg-[var(--color-red)]/5">
            <div className="brutal-badge brutal-badge-red mb-4">✗ {isHindi ? 'यह क्या नहीं है' : 'WHAT THIS IS NOT'}</div>
            <p className="text-[var(--color-text)] leading-relaxed">
              {t(locale, 'home.whatIsNotThisText') as string}
            </p>
          </div>
        </div>
      </section>

      {/* Feature Cards — how it works */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <h2 className="heading-1 mb-12">
          {isHindi ? 'यह कैसे काम करता है' : 'How It Works'}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/directory" className="brutal-card group">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="heading-3 mb-2 group-hover:text-[var(--color-accent)] transition-colors">
              {isHindi ? '1. समूह खोजें' : '1. Find a Group'}
            </h3>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              {t(locale, 'home.directoryDesc') as string}
            </p>
          </Link>

          <Link href="/create-post" className="brutal-card group">
            <div className="text-4xl mb-4">🔄</div>
            <h3 className="heading-3 mb-2 group-hover:text-[var(--color-accent)] transition-colors">
              {isHindi ? '2. ज़रूरत या प्रस्ताव पोस्ट करें' : '2. Post a Need or Offer'}
            </h3>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              {t(locale, 'home.boardDesc') as string}
            </p>
          </Link>

          <Link href="/board" className="brutal-card group">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="heading-3 mb-2 group-hover:text-[var(--color-accent)] transition-colors">
              {isHindi ? '3. जुड़ें और मदद करें' : '3. Connect & Help'}
            </h3>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              {isHindi
                ? 'किसी ज़रूरत का जवाब दें — आपकी संपर्क जानकारी निजी रूप से केवल पोस्टर को भेजी जाती है।'
                : 'Respond to a need — your contact info is sent privately to the poster only. No public exposure.'}
            </p>
          </Link>
        </div>
      </section>

      {/* Trust Pillars */}
      <section className="border-t-[3px] border-[var(--color-border)] bg-[var(--color-card)]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
          <h2 className="heading-1 mb-12">
            {isHindi ? 'विश्वास ही उत्पाद है' : 'Trust Is The Product'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="brutal-card-flat">
              <div className="text-2xl mb-3">🔒</div>
              <h3 className="font-bold mb-1 text-sm uppercase tracking-wide">{isHindi ? 'कोई असली नाम नहीं' : 'No Real Names'}</h3>
              <p className="text-xs text-[var(--color-text-muted)]">{isHindi ? 'कहीं भी पूरा नाम या ID नहीं माँगी जाती' : 'Never asks for full name or ID anywhere'}</p>
            </div>
            <div className="brutal-card-flat">
              <div className="text-2xl mb-3">📍</div>
              <h3 className="font-bold mb-1 text-sm uppercase tracking-wide">{isHindi ? 'शहर/क्षेत्र ही' : 'City/Area Only'}</h3>
              <p className="text-xs text-[var(--color-text-muted)]">{isHindi ? 'कोई सटीक स्थान नहीं। कोई मैप पिन नहीं।' : 'No precise location. No map pin. Fixed dropdown.'}</p>
            </div>
            <div className="brutal-card-flat">
              <div className="text-2xl mb-3">⏰</div>
              <h3 className="font-bold mb-1 text-sm uppercase tracking-wide">{isHindi ? '72 घंटे में समाप्त' : '72h Auto-Expiry'}</h3>
              <p className="text-xs text-[var(--color-text-muted)]">{isHindi ? 'सभी पोस्ट स्वचालित रूप से हटा दी जाती हैं' : 'All posts automatically removed. No data hoarding.'}</p>
            </div>
            <div className="brutal-card-flat">
              <div className="text-2xl mb-3">🛡️</div>
              <h3 className="font-bold mb-1 text-sm uppercase tracking-wide">{isHindi ? 'संपर्क रिले' : 'Contact Relay'}</h3>
              <p className="text-xs text-[var(--color-text-muted)]">{isHindi ? 'फ़ोन नंबर कभी सार्वजनिक नहीं होते' : 'Phone numbers never public. Private relay only.'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Moderation Policy */}
      <section className="border-t-[3px] border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
          <div className="max-w-2xl">
            <div className="brutal-badge brutal-badge-purple mb-4">{isHindi ? 'सामग्री नीति' : 'CONTENT POLICY'}</div>
            <h2 className="heading-2 mb-4">{t(locale, 'moderation.policyIntro') as string}</h2>
            <ul className="space-y-2">
              {(t(locale, 'moderation.policyItems') as string[]).map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]">
                  <span className="text-[var(--color-red)] font-bold mt-0.5">×</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t-[3px] border-[var(--color-border)] bg-[var(--color-accent)]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 text-center">
          <h2 className="heading-1 text-white mb-4">
            {isHindi ? 'आज ही जुड़ें' : 'Get Involved Today'}
          </h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            {isHindi
              ? 'चाहे आप मदद माँग रहे हों या मदद दे रहे हों — कनेक्ट करने में 30 सेकंड लगते हैं।'
              : 'Whether you need help or can give it — it takes 30 seconds to connect.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/create-post" className="brutal-btn brutal-btn-dark brutal-btn-lg">
              {isHindi ? 'ज़रूरत पोस्ट करें' : 'POST A NEED'}
            </Link>
            <Link href="/submit-chapter" className="brutal-btn brutal-btn-lg bg-white">
              {isHindi ? 'अपना समूह जोड़ें' : 'ADD YOUR GROUP'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
