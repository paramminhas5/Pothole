import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';
import SituationBrief from '@/components/SituationBrief';

export default async function HomePage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const hi = locale === 'hi';

  // Fetch live pulse stats (fallback to placeholders)
  let pulse = { groups_active: 42, volunteers_available: 187, demands_tracked: 23, days_of_silence: 34 };
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || '';
    if (base) {
      const res = await fetch(`${base}/api/situation`, { next: { revalidate: 300 } });
      if (res.ok) {
        const data = await res.json();
        if (data?.situation) {
          pulse = {
            groups_active: data.situation.groups_active || pulse.groups_active,
            volunteers_available: data.situation.volunteers_available || pulse.volunteers_available,
            demands_tracked: data.situation.demands_total || pulse.demands_tracked,
            days_of_silence: data.situation.day_count || pulse.days_of_silence,
          };
        }
      }
    }
  } catch { /* use fallback */ }

  // Fetch news preview (fallback to static)
  let newsItems: { id: string; title: string; type: string; timestamp: string; city?: string }[] = [];
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || '';
    if (base) {
      const res = await fetch(`${base}/api/news?limit=4`, { next: { revalidate: 300 } });
      if (res.ok) {
        const data = await res.json();
        newsItems = data.items || [];
      }
    }
  } catch { /* use fallback */ }

  if (newsItems.length === 0) {
    newsItems = [
      { id: '1', title: hi ? 'जंतर मंतर धरना — दिन 34' : 'Jantar Mantar Sit-In — Day 34', type: 'movement', timestamp: '2026-07-23T10:00:00Z', city: 'Delhi' },
      { id: '2', title: hi ? 'दिल्ली HC ने X अकाउंट बहाल कराया' : 'Delhi HC orders X account restoration', type: 'news', timestamp: '2026-07-05T08:00:00Z', city: 'Delhi' },
      { id: '3', title: hi ? 'शिक्षा सुधार विधेयक — समिति चरण' : 'Education Reform Bill — Committee Stage', type: 'law_update', timestamp: '2026-07-01T12:00:00Z' },
    ];
  }

  // Fetch report card preview (demands with silence counters)
  const demands = [
    { institution: hi ? 'शिक्षा मंत्रालय' : 'Ministry of Education', demand: hi ? 'NTA भंग करो' : 'Dissolve NTA', days: 34 },
    { institution: hi ? 'गृह मंत्रालय' : 'Ministry of Home Affairs', demand: hi ? 'लाठीचार्ज की जाँच' : 'Investigate lathi charge', days: 3 },
    { institution: hi ? 'दिल्ली पुलिस' : 'Delhi Police', demand: hi ? '180+ घायलों का हिसाब' : 'Account for 180+ injured', days: 2 },
    { institution: hi ? 'UGC' : 'UGC', demand: hi ? 'परीक्षा लीक पर श्वेत पत्र' : 'White paper on exam leaks', days: 45 },
    { institution: hi ? 'वित्त मंत्रालय' : 'Ministry of Finance', demand: hi ? 'बेरोज़गारी भत्ता' : 'Unemployment allowance', days: 120 },
  ];

  // Directory highlights
  const directoryItems = [
    { name: hi ? 'HRLN दिल्ली' : 'HRLN Delhi', type: hi ? 'कानूनी सहायता' : 'Legal Aid', verified: true },
    { name: hi ? 'दिल्ली मेडिक्स कलेक्टिव' : 'Delhi Medics Collective', type: hi ? 'चिकित्सा' : 'Medical', verified: true },
    { name: hi ? 'सेफ स्पेस नेटवर्क' : 'Safe Space Network', type: hi ? 'आश्रय' : 'Shelter', verified: true },
    { name: hi ? 'ट्रांसपोर्ट सहायता' : 'Transport Support', type: hi ? 'परिवहन' : 'Transport', verified: true },
  ];

  const routingCards = [
    { label: hi ? 'आज रात विरोध में जा रहा/रही हूँ' : 'Going to a protest tonight', href: '/protest-mode', icon: '✊' },
    { label: hi ? 'मुझे अभी मदद चाहिए' : 'I need help right now', href: '/directory', icon: '🆘' },
    { label: hi ? 'अपने लोगों को संगठित करना है' : 'I want to organize my people', href: '/groups', icon: '👥' },
    { label: hi ? 'मेरे पास कौशल हैं' : 'I have skills to offer', href: '/exchange', icon: '🤝' },
    { label: hi ? 'जवाबदेही तय करनी है' : 'I want to hold them accountable', href: '/report-card', icon: '📋' },
    { label: hi ? 'व्यवस्था समझनी है' : 'I want to understand the system', href: '/know-the-system', icon: '🧠' },
  ];

  const howSteps = [
    { title: hi ? 'आओ' : 'Show up', desc: hi ? 'प्रोटेस्ट मोड' : 'Protest Mode' },
    { title: hi ? 'अपने लोग खोजो' : 'Find your people', desc: hi ? 'ग्रुप्स' : 'Groups' },
    { title: hi ? 'संगठित हो' : 'Get organized', desc: hi ? 'भूमिकाएँ, कार्य, एक्शन' : 'Roles, tasks, actions' },
    { title: hi ? 'एक्शन लो' : 'Take action', desc: hi ? 'अभियान, RTI, माँगें' : 'Campaigns, RTIs, demands' },
    { title: hi ? 'नतीजे ट्रैक करो' : 'Track outcomes', desc: hi ? 'रिपोर्ट कार्ड' : 'Report Card' },
    { title: hi ? 'खुद को हथियार दो' : 'Arm yourself', desc: hi ? 'व्यवस्था जानो' : 'Know the System' },
    { title: hi ? 'रिकॉर्ड बनाओ' : 'Build your record', desc: hi ? 'सिविक प्रोफाइल' : 'Civic Profile' },
  ];

  return (
    <div>
      {/* SECTION 1: HERO */}
      <section className="home-hero" aria-labelledby="home-title">
        <div className="page-shell home-hero-inner">
          <p className="eyebrow">Sahayata</p>
          <h1 id="home-title" className="home-title">
            {hi ? 'भारत का नागरिक ऑपरेटिंग सिस्टम' : "India's civic operating system"}
          </h1>
          <p className="home-intro">
            {hi
              ? 'कहाँ जाना है। कौन लड़ रहा है। क्या करना है। जीतने के लिए कैसे तैयार हों।'
              : "Where to show up. Who's fighting. What needs doing. How to arm yourself to win."}
          </p>
          <div className="button-row">
            <a href="#routing" className="brutal-btn brutal-btn-primary home-primary-action">
              {hi ? 'आपको क्या चाहिए?' : 'What do you need?'}
            </a>
          </div>
          <p className="action-note">
            {hi ? 'कोई अकाउंट नहीं। कोई ट्रैकिंग नहीं। ऑफलाइन काम करता है।' : 'No account. No tracking. Works offline.'}
          </p>
        </div>
      </section>

      {/* SECTION 2: SITUATION BRIEF */}
      <SituationBrief locale={locale} />

      {/* SECTION 3: QUICK ROUTING */}
      <section id="routing" className="home-choices" aria-labelledby="routing-title">
        <div className="page-shell">
          <h2 id="routing-title" className="section-title">
            {hi ? 'आपको क्या चाहिए?' : 'What do you need?'}
          </h2>
          <div className="choice-grid">
            {routingCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="choice-card"
              >
                <span className="text-3xl" aria-hidden="true">{card.icon}</span>
                <h3>{card.label}</h3>
                <span className="choice-link">{hi ? 'जाएँ →' : 'Go →'}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: LIVE PULSE */}
      <section className="brutal-banner" aria-label={hi ? 'लाइव आँकड़े' : 'Live stats'}>
        <div className="page-shell">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center">
            <span>
              <span className="font-mono font-black text-lg">{pulse.groups_active}</span>{' '}
              {hi ? 'ग्रुप सक्रिय' : 'groups active'}
            </span>
            <span aria-hidden="true">·</span>
            <span>
              <span className="font-mono font-black text-lg">{pulse.volunteers_available}</span>{' '}
              {hi ? 'वॉलंटियर उपलब्ध' : 'volunteers available'}
            </span>
            <span aria-hidden="true">·</span>
            <span>
              <span className="font-mono font-black text-lg">{pulse.demands_tracked}</span>{' '}
              {hi ? 'माँगें ट्रैक' : 'demands tracked'}
            </span>
            <span aria-hidden="true">·</span>
            <span>
              <span className="font-mono font-black text-lg">{pulse.days_of_silence}</span>{' '}
              {hi ? 'दिन मौन' : 'days of silence'}
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 5: NEWS & CONTEXT PREVIEW */}
      <section className="content-page" aria-labelledby="news-title">
        <div className="page-shell">
          <h2 id="news-title" className="section-title">
            {hi ? 'क्या हो रहा है' : "What's happening"}
          </h2>
          <div className="result-list">
            {newsItems.map((item) => (
              <article key={item.id} className="brutal-card">
                <div className="badge-row">
                  <span className="brutal-badge brutal-badge-sky">{item.type}</span>
                  {item.city && <span className="brutal-badge">{item.city}</span>}
                </div>
                <h3 className="heading-3 mt-3">{item.title}</h3>
                <time className="font-mono text-xs text-[var(--color-text-muted)] mt-2 block">
                  {new Intl.DateTimeFormat(hi ? 'hi-IN' : 'en-IN', { dateStyle: 'medium' }).format(new Date(item.timestamp))}
                </time>
              </article>
            ))}
          </div>
          <div className="mt-6">
            <Link href="/news" className="brutal-btn">
              {hi ? 'सब देखें →' : 'See all →'}
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6: HOW IT WORKS */}
      <section className="how-it-works" aria-labelledby="how-title">
        <div className="page-shell">
          <h2 id="how-title" className="section-title">
            {hi ? 'यह कैसे काम करता है' : 'How It Works'}
          </h2>
          <ol className="steps-list">
            {howSteps.map((step) => (
              <li key={step.title}>
                <strong>{step.title}</strong>
                <span>{step.desc}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SECTION 7: REPORT CARD PREVIEW */}
      <section className="content-page" aria-labelledby="reportcard-title" style={{ background: 'var(--color-card)', borderTop: '2px solid var(--color-border)' }}>
        <div className="page-shell">
          <h2 id="reportcard-title" className="section-title">
            {hi ? 'संस्थागत मौन ट्रैकर' : 'Institutional Silence Tracker'}
          </h2>
          <div className="result-list">
            {demands.map((d, i) => (
              <article key={i} className="brutal-card-flat flex items-center gap-4 p-4">
                <span className="font-mono font-black text-2xl text-[var(--color-red)] min-w-[60px] text-center">
                  {d.days}
                  <span className="block text-xs font-bold text-[var(--color-text-muted)]">{hi ? 'दिन' : 'days'}</span>
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate">{d.institution}</p>
                  <p className="text-sm text-[var(--color-text-muted)] truncate">{d.demand}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-6">
            <Link href="/report-card" className="brutal-btn brutal-btn-primary">
              {hi ? 'पूरा रिपोर्ट कार्ड देखें →' : 'See full Report Card →'}
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 8: DIRECTORY HIGHLIGHTS */}
      <section className="content-page" aria-labelledby="directory-title">
        <div className="page-shell">
          <h2 id="directory-title" className="section-title">
            {hi ? 'हाल ही में सत्यापित' : 'Recently verified'}
          </h2>
          <div className="result-list">
            {directoryItems.map((item, i) => (
              <article key={i} className="brutal-card-flat flex items-center justify-between gap-4 p-4">
                <div>
                  <p className="font-bold">{item.name}</p>
                  <span className="brutal-badge brutal-badge-sky text-xs">{item.type}</span>
                </div>
                {item.verified && (
                  <span className="brutal-badge brutal-badge-purple text-xs">
                    {hi ? '✓ सत्यापित' : '✓ Verified'}
                  </span>
                )}
              </article>
            ))}
          </div>
          <div className="mt-6">
            <Link href="/directory" className="brutal-btn">
              {hi ? 'पूरी डायरेक्टरी देखें →' : 'Browse full directory →'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
