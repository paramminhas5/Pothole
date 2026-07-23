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
      {/* HERO — What this is, in one breath */}
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
              {hi ? 'मेरा प्लान बनाओ →' : 'Get My Plan →'}
            </Link>
          </div>
          <p className="action-note">
            {hi ? 'कोई अकाउंट नहीं। कोई फोन नंबर नहीं। ऑफलाइन काम करता है।' : 'No account. No phone number. Works offline.'}
          </p>
        </div>
      </section>

      {/* WHAT'S HAPPENING RIGHT NOW */}
      <SituationBrief locale={locale} />

      {/* THREE PATHS — the only choice a new user needs to make */}
      <section className="home-choices" aria-labelledby="paths-title">
        <div className="page-shell">
          <h2 id="paths-title" className="section-title">
            {hi ? 'आप क्या करना चाहते हैं?' : 'What do you want to do?'}
          </h2>
          <div className="choice-grid">
            <Link href="/expect" className="choice-card choice-card-primary" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="choice-number">1</div>
              <h3>{hi ? 'विरोध में जा रहा/रही हूँ' : "I'm going to a protest"}</h3>
              <p>{hi ? 'तैयारी, सुरक्षा, बडी सिस्टम, अधिकार, क्या उम्मीद करें।' : 'Preparation, safety, buddy system, rights, what to expect.'}</p>
              <span className="choice-link">{hi ? 'तैयार हो जाओ' : 'Get prepared'} <span aria-hidden="true">→</span></span>
            </Link>
            <Link href="/start" className="choice-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="choice-number">2</div>
              <h3>{hi ? 'वापस लड़ना चाहता/चाहती हूँ' : 'I want to fight back'}</h3>
              <p>{hi ? 'RTI, FIR, माँग, प्रतिनिधि, PIL — कानूनी हथियार।' : 'RTI, FIR, demands, representatives, PIL — legal weapons.'}</p>
              <span className="choice-link">{hi ? 'एक्शन प्लान बनाओ' : 'Get action plan'} <span aria-hidden="true">→</span></span>
            </Link>
            <Link href="/groups" className="choice-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="choice-number">3</div>
              <h3>{hi ? 'संगठित होना / मदद करना' : 'Organize / Help'}</h3>
              <p>{hi ? 'ग्रुप खोजो, कौशल दो, संसाधन जमा करो, अनुवाद करो।' : 'Find groups, contribute skills, submit resources, translate.'}</p>
              <span className="choice-link">{hi ? 'ग्रुप और योगदान' : 'Groups & contribute'} <span aria-hidden="true">→</span></span>
            </Link>
          </div>
        </div>
      </section>

      {/* REAL HELP — one line */}
      <aside style={{ padding: '16px 0', background: 'var(--color-card)', borderTop: '1px solid var(--color-border-light)', textAlign: 'center' }}>
        <div className="page-shell">
          <p style={{ fontSize: '0.9rem', fontWeight: 700 }}>
            {hi ? '⚖️ अभी वकील चाहिए?' : '⚖️ Need a lawyer right now?'}{' '}
            <a href="tel:1516" style={{ color: 'var(--color-accent)' }}>DSLSA 1516</a>{' '}
            ({hi ? 'मुफ्त, 24/7' : 'free, 24/7'}){' · '}
            <Link href="/help-now" style={{ color: 'var(--color-accent)' }}>{hi ? 'और मदद →' : 'More help →'}</Link>
          </p>
        </div>
      </aside>
    </div>
  );
}
