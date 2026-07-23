import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';
import SituationBrief from '@/components/SituationBrief';

export default async function HomePage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const hi = locale === 'hi';

  return (
    <div>
      {/* HERO */}
      <section className="home-hero" aria-labelledby="home-title">
        <div className="page-shell home-hero-inner">
          <h1 id="home-title" className="home-title">
            {hi ? 'गुस्से को संगठित ताकत में बदलो।' : 'Turn anger into organized power.'}
          </h1>
          <p className="home-intro">
            {hi
              ? 'अधिकार जानो। RTI दाखिल करो। माँगें ट्रैक करो। संगठित हो। संस्थाओं को जवाबदेह बनाओ।'
              : 'Know your rights. File RTIs. Track demands. Get organized. Hold institutions accountable.'}
          </p>
          <div className="button-row">
            <Link href="/how-it-works" className="brutal-btn brutal-btn-primary home-primary-action">
              {hi ? 'यह कैसे काम करता है →' : 'How It Works →'}
            </Link>
            <Link href="/start" className="brutal-btn">
              {hi ? 'शुरू करें →' : 'Get Started →'}
            </Link>
          </div>
          <p className="action-note">
            {hi ? 'कोई अकाउंट नहीं। कोई फोन नंबर नहीं। ऑफलाइन काम करता है।' : 'No account. No phone number. Works offline.'}
          </p>
        </div>
      </section>

      {/* SITUATION */}
      <SituationBrief locale={locale} />

      {/* THREE PATHS */}
      <section className="home-choices" aria-labelledby="paths-title">
        <div className="page-shell">
          <h2 id="paths-title" className="section-title">{hi ? 'आप क्या करना चाहते हैं?' : 'What do you want to do?'}</h2>
          <div className="choice-grid">
            <Link href="/expect" className="choice-card choice-card-primary" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="choice-number">1</div>
              <h3>{hi ? 'विरोध में जा रहा/रही हूँ' : "I'm going to a protest"}</h3>
              <p>{hi ? 'तैयारी, सुरक्षा, बडी सिस्टम, अधिकार।' : 'Preparation, safety, buddy system, rights.'}</p>
              <span className="choice-link">{hi ? 'तैयार हो जाओ →' : 'Get prepared →'}</span>
            </Link>
            <Link href="/start" className="choice-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="choice-number">2</div>
              <h3>{hi ? 'वापस लड़ना चाहता/चाहती हूँ' : 'I want to fight back'}</h3>
              <p>{hi ? 'RTI, FIR, माँग, PIL — कानूनी हथियार।' : 'RTI, FIR, demands, PIL — legal weapons.'}</p>
              <span className="choice-link">{hi ? 'एक्शन प्लान →' : 'Action plan →'}</span>
            </Link>
            <Link href="/groups" className="choice-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="choice-number">3</div>
              <h3>{hi ? 'संगठित होना / मदद करना' : 'Organize / Help'}</h3>
              <p>{hi ? 'ग्रुप, कौशल, संसाधन, अनुवाद।' : 'Groups, skills, resources, translate.'}</p>
              <span className="choice-link">{hi ? 'ग्रुप और योगदान →' : 'Groups & contribute →'}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT YOU CAN DO — capabilities grid */}
      <section style={{ paddingBlock: 'clamp(40px, 7vw, 64px)', background: 'var(--color-card)', borderTop: '2px solid var(--color-border)' }}>
        <div className="page-shell">
          <h2 className="section-title" style={{ marginBottom: '24px' }}>{hi ? 'Sahayata में क्या-क्या है' : 'What Sahayata Gives You'}</h2>
          <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
            {[
              { href: '/rti', title: hi ? 'RTI जनरेटर + ट्रैकर' : 'RTI Generator + Tracker', desc: hi ? '₹10 → 30 दिन → जवाब अनिवार्य → ₹250/दिन जुर्माना।' : '₹10 → 30 days → response mandatory → ₹250/day penalty.' },
              { href: '/fir', title: hi ? 'FIR असिस्टेंट' : 'FIR Assistant', desc: hi ? '3 दस्तावेज़ ऑटो: शिकायत + SP + मजिस्ट्रेट।' : '3 docs auto: complaint + SP + magistrate.' },
              { href: '/buddy', title: hi ? 'बडी सिस्टम' : 'Buddy System', desc: hi ? 'टाइमर + SOS + ऑटो-डिलीट। कोई सर्वर नहीं।' : 'Timer + SOS + auto-delete. No server.' },
              { href: '/protest-mode', title: hi ? 'प्रोटेस्ट मोड' : 'Protest Mode', desc: hi ? 'बड़े नंबर, SOS, अधिकार — विरोध के दौरान।' : 'Big numbers, SOS, rights — during protest.' },
              { href: '/demands', title: hi ? 'माँग ट्रैकर' : 'Demand Tracker', desc: hi ? 'कौन + क्या + कब तक = सार्वजनिक जवाबदेही।' : 'WHO + WHAT + WHEN = public accountability.' },
              { href: '/groups', title: hi ? 'ग्रुप + गठबंधन' : 'Groups + Coalitions', desc: hi ? 'शहर में ग्रुप खोजें। 10 ग्रुप = 10x ताकत।' : 'Find groups. 10 groups = 10x power.' },
              { href: '/learn', title: hi ? 'सत्ता कैसे लें' : 'How to Take Power', desc: hi ? 'आंदोलन कैसे जीतते हैं। जाल से कैसे बचें।' : 'How movements win. How to avoid traps.' },
              { href: '/help-now', title: hi ? 'असली मदद (सरकारी नहीं)' : 'Real Help (Not Govt)', desc: hi ? 'वकील, मेडिक, सुरक्षित स्थान, WiFi, ट्रांसपोर्ट।' : 'Lawyers, medics, safe spaces, WiFi, transport.' },
            ].map(item => (
              <Link key={item.href} href={item.href} style={{ padding: '16px', border: '1.5px solid var(--color-border-light)', borderRadius: '10px', textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <strong style={{ display: 'block', marginBottom: '4px' }}>{item.title}</strong>
                <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>{item.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section style={{ paddingBlock: '32px', borderTop: '1px solid var(--color-border-light)' }}>
        <div className="page-shell" style={{ textAlign: 'center', maxWidth: '680px' }}>
          <p style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px' }}>{hi ? 'निजी। सुरक्षित। ओपन सोर्स।' : 'Private. Secure. Open Source.'}</p>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
            {hi
              ? 'कोई अकाउंट नहीं। कोई ट्रैकिंग नहीं। ₹500/महीने। कोड सार्वजनिक। 5 मिरर — बंद करना असंभव। डेटा आपके डिवाइस पर।'
              : 'No account. No tracking. ₹500/month. Code is public. 5 mirrors — impossible to shut down. Data stays on your device.'}
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '12px', flexWrap: 'wrap' }}>
            <Link href="/infrastructure" style={{ fontSize: '0.8rem', color: 'var(--color-accent)' }}>{hi ? 'इन्फ्रास्ट्रक्चर →' : 'Infrastructure →'}</Link>
            <a href="https://github.com/paramminhas5/Pothole" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', color: 'var(--color-accent)' }}>GitHub →</a>
          </div>
        </div>
      </section>

      {/* HELP LINE */}
      <aside style={{ padding: '14px 0', borderTop: '1px solid var(--color-border-light)', textAlign: 'center' }}>
        <div className="page-shell">
          <p style={{ fontSize: '0.85rem', fontWeight: 700 }}>
            {hi ? '⚖️ वकील:' : '⚖️ Lawyer:'} <a href="tel:1516" style={{ color: 'var(--color-accent)' }}>DSLSA 1516</a> ({hi ? 'मुफ्त, 24/7' : 'free, 24/7'}) · <a href="https://hrln.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)' }}>HRLN ↗</a> · <Link href="/help-now" style={{ color: 'var(--color-accent)' }}>{hi ? 'और →' : 'More →'}</Link>
          </p>
        </div>
      </aside>
    </div>
  );
}
