import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';

export default async function HomePage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const hi = locale === 'hi';

  return (
    <div>
      {/* 3 BIG BUTTONS */}
      <section className="page-shell py-16" aria-labelledby="home-title">
        <h1 id="home-title" className="sr-only">Sahayata</h1>
        <div className="max-w-lg mx-auto space-y-4">
          <Link href="/create-post" className="home-action-card home-action-help">
            <span className="home-action-icon">🆘</span>
            <span className="home-action-text">
              <strong>{hi ? 'मुझे मदद चाहिए' : 'I need help'}</strong>
              <span>{hi ? 'कानूनी, चिकित्सा, भोजन, परिवहन, आश्रय' : 'Legal, medical, food, transport, shelter'}</span>
            </span>
          </Link>
          <Link href="/board" className="home-action-card home-action-offer">
            <span className="home-action-icon">🤝</span>
            <span className="home-action-text">
              <strong>{hi ? 'मैं मदद कर सकता/सकती हूँ' : 'I can help'}</strong>
              <span>{hi ? 'देखें किसे क्या चाहिए और जवाब दें' : 'See who needs what and respond'}</span>
            </span>
          </Link>
          <Link href="/act" className="home-action-card home-action-change">
            <span className="home-action-icon">⚡</span>
            <span className="home-action-text">
              <strong>{hi ? 'मुझे बदलाव चाहिए' : 'I want change'}</strong>
              <span>{hi ? 'RTI, FIR, पत्र, माँग ट्रैक, संगठन' : 'RTI, FIR, letters, track demands, organize'}</span>
            </span>
          </Link>
        </div>
      </section>

      {/* EMERGENCY STRIP */}
      <section className="emergency-strip" aria-label={hi ? 'आपातकालीन' : 'Emergency'}>
        <div className="page-shell">
          <div className="emergency-strip-inner">
            <span><strong>112</strong> {hi ? 'आपातकालीन' : 'Emergency'}</span>
            <span><strong>1516</strong> {hi ? 'मुफ्त वकील' : 'Free Lawyer'}</span>
            <span><strong>181</strong> {hi ? 'महिला' : 'Women'}</span>
            <span><strong>108</strong> {hi ? 'एम्बुलेंस' : 'Ambulance'}</span>
          </div>
        </div>
      </section>

      {/* WHAT IS THIS */}
      <section className="page-shell py-12" aria-labelledby="about-title">
        <div className="max-w-2xl mx-auto text-center">
          <h2 id="about-title" className="heading-2 mb-4">{hi ? 'यह क्या है?' : 'What is this?'}</h2>
          <p className="text-[var(--color-text-muted)] mb-6">{hi ? 'Sahayata नागरिक समन्वय का बुनियादी ढाँचा है। मदद माँगें, मदद दें, संगठित हों, संस्थाओं को जवाबदेह बनाएँ — गोपनीय, ऑफलाइन-सक्षम, सेंसरशिप-प्रतिरोधी।' : 'Sahayata is civic coordination infrastructure. Ask for help, give help, organize, hold institutions accountable — private, offline-capable, censorship-resistant.'}</p>
        </div>

        {/* FEATURE GRID */}
        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <Link href="/map" className="home-feature-card">
            <strong>{hi ? '🗺️ लाइव मैप' : '🗺️ Live Map'}</strong>
            <span>{hi ? 'सक्रिय अभियान' : 'Active campaigns'}</span>
          </Link>
          <Link href="/groups" className="home-feature-card">
            <strong>{hi ? '👥 ग्रुप' : '👥 Groups'}</strong>
            <span>{hi ? 'बनाएँ, खोजें, जुड़ें' : 'Create, find, join'}</span>
          </Link>
          <Link href="/governance" className="home-feature-card">
            <strong>{hi ? '📊 शासन ट्रैकर' : '📊 Governance'}</strong>
            <span>{hi ? 'जवाबदेही स्कोरकार्ड' : 'Accountability scorecard'}</span>
          </Link>
          <Link href="/rti" className="home-feature-card">
            <strong>{hi ? '📄 RTI जनरेटर' : '📄 RTI Generator'}</strong>
            <span>{hi ? 'सरकार को जवाब दिलाएँ' : 'Make govt answer'}</span>
          </Link>
          <Link href="/fir" className="home-feature-card">
            <strong>{hi ? '🚨 FIR असिस्टेंट' : '🚨 FIR Assistant'}</strong>
            <span>{hi ? 'शिकायत बनाएँ' : 'Generate complaint'}</span>
          </Link>
          <Link href="/demands" className="home-feature-card">
            <strong>{hi ? '📋 माँग ट्रैकर' : '📋 Demand Tracker'}</strong>
            <span>{hi ? 'माँगें ट्रैक करें' : 'Track demands'}</span>
          </Link>
          <Link href="/contribute" className="home-feature-card">
            <strong>{hi ? '🤝 योगदान' : '🤝 Contribute'}</strong>
            <span>{hi ? 'कौशल से मदद' : 'Help with skills'}</span>
          </Link>
          <Link href="/safety" className="home-feature-card">
            <strong>{hi ? '⚖️ अधिकार' : '⚖️ Rights'}</strong>
            <span>{hi ? 'पॉकेट कार्ड' : 'Pocket card'}</span>
          </Link>
          <Link href="/playbook" className="home-feature-card">
            <strong>{hi ? '📖 प्लेबुक' : '📖 Playbook'}</strong>
            <span>{hi ? 'विरोध → शक्ति' : 'Protest → Power'}</span>
          </Link>
        </div>
      </section>

      {/* ABOUT LINK */}
      <section className="page-shell pb-12 text-center">
        <Link href="/manifesto" className="text-link">{hi ? 'यह मंच क्यों मायने रखता है →' : 'Why this platform matters →'}</Link>
      </section>

      {/* EMERGENCY FOOTER */}
      <aside className="emergency-note" aria-label={hi ? 'आपातकालीन' : 'Emergency'}>
        <div className="page-shell">
          <strong>{hi ? 'तुरंत खतरा?' : 'Immediate danger?'}</strong>{' '}
          {hi ? '112 डायल करें। इस साइट का इंतज़ार न करें।' : 'Dial 112. Do not wait for this site.'}
        </div>
      </aside>
    </div>
  );
}
