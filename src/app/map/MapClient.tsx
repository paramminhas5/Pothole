'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Locale } from '@/types';

interface CampaignEvent {
  id: string;
  title: string;
  titleHi: string;
  city: string;
  state: string;
  category: 'education' | 'rights' | 'environment' | 'labor' | 'governance' | 'health';
  status: 'active' | 'resolved' | 'escalated';
  participants: string;
  startDate: string;
  description: string;
  descriptionHi: string;
  safetyNote?: string;
  safetyNoteHi?: string;
  demands: string[];
  demandsHi: string[];
}

// Live campaign data — these would come from an API in production
const CAMPAIGNS: CampaignEvent[] = [
  {
    id: '1',
    title: 'CJP Chalo Sansad March',
    titleHi: 'CJP चलो संसद मार्च',
    city: 'Delhi',
    state: 'Delhi',
    category: 'education',
    status: 'active',
    participants: '50,000+',
    startDate: '2026-07-20',
    description: 'Cockroach Janta Party-led march to Parliament demanding NTA dissolution, Education Minister resignation, and independent investigation into exam leaks.',
    descriptionHi: 'कॉकरोच जनता पार्टी का संसद मार्च — NTA भंग करने, शिक्षा मंत्री इस्तीफे और परीक्षा लीक की स्वतंत्र जाँच की माँग।',
    safetyNote: 'Section 163 BNSS imposed. Heavy police deployment. Carry ID, know your rights.',
    safetyNoteHi: 'धारा 163 BNSS लागू। भारी पुलिस तैनाती। ID रखें, अधिकार जानें।',
    demands: ['Dissolve NTA', 'Education Minister resign', 'Independent investigation', 'Re-exam for leaked papers', 'Unemployment allowance'],
    demandsHi: ['NTA भंग करो', 'शिक्षा मंत्री इस्तीफा दें', 'स्वतंत्र जाँच', 'लीक पेपर की पुन:परीक्षा', 'बेरोज़गारी भत्ता'],
  },
  {
    id: '2',
    title: 'Sonam Wangchuk Hunger Strike — Ladakh Statehood',
    titleHi: 'सोनम वांगचुक अनशन — लद्दाख राज्य दर्जा',
    city: 'Delhi',
    state: 'Delhi',
    category: 'governance',
    status: 'active',
    participants: '5,000+',
    startDate: '2026-06-25',
    description: 'Climate activist Sonam Wangchuk on hunger strike demanding 6th Schedule protection for Ladakh and full statehood.',
    descriptionHi: 'जलवायु कार्यकर्ता सोनम वांगचुक लद्दाख के लिए छठी अनुसूची और पूर्ण राज्य दर्जे की माँग में अनशन पर।',
    demands: ['6th Schedule for Ladakh', 'Full statehood', 'Tribal rights protection', 'Environmental safeguards'],
    demandsHi: ['लद्दाख के लिए छठी अनुसूची', 'पूर्ण राज्य दर्जा', 'आदिवासी अधिकार संरक्षण', 'पर्यावरण सुरक्षा'],
  },
  {
    id: '3',
    title: 'NEET Paper Leak Protest — Jaipur',
    titleHi: 'NEET पेपर लीक विरोध — जयपुर',
    city: 'Jaipur',
    state: 'Rajasthan',
    category: 'education',
    status: 'active',
    participants: '2,000+',
    startDate: '2026-06-16',
    description: 'Students at Samvidhan Chowk demanding re-examination and accountability for NEET paper leak. CJP-affiliated.',
    descriptionHi: 'संविधान चौक पर छात्र NEET पेपर लीक के लिए पुन:परीक्षा और जवाबदेही की माँग कर रहे हैं। CJP-संबद्ध।',
    demands: ['NEET re-exam', 'NTA officials arrested', 'Compensation for students'],
    demandsHi: ['NEET पुन:परीक्षा', 'NTA अधिकारियों की गिरफ्तारी', 'छात्रों को मुआवज़ा'],
  },
  {
    id: '4',
    title: 'Farmers MSP Guarantee Rally',
    titleHi: 'किसान MSP गारंटी रैली',
    city: 'Chandigarh',
    state: 'Punjab',
    category: 'labor',
    status: 'active',
    participants: '10,000+',
    startDate: '2026-07-01',
    description: 'SKM-led farmers demanding legal guarantee for MSP (Minimum Support Price) as promised during 2020-21 movement.',
    descriptionHi: 'SKM के नेतृत्व में किसान MSP (न्यूनतम समर्थन मूल्य) की कानूनी गारंटी की माँग कर रहे हैं।',
    demands: ['Legal MSP guarantee', 'Land acquisition reform', 'Debt relief for farmers'],
    demandsHi: ['कानूनी MSP गारंटी', 'भूमि अधिग्रहण सुधार', 'किसानों का कर्ज माफ'],
  },
  {
    id: '5',
    title: 'Anti-Bulldozer Movement — UP Housing Rights',
    titleHi: 'बुलडोज़र विरोधी आंदोलन — UP आवास अधिकार',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    category: 'rights',
    status: 'active',
    participants: '3,000+',
    startDate: '2026-06-10',
    description: 'Coalition of affected families and activists challenging illegal demolitions without due process. PIL filed in Allahabad HC.',
    descriptionHi: 'प्रभावित परिवारों और कार्यकर्ताओं का गठबंधन बिना कानूनी प्रक्रिया के अवैध तोड़फोड़ को चुनौती दे रहा है। इलाहाबाद HC में PIL दायर।',
    demands: ['Stop illegal demolitions', '30-day notice mandatory', 'Rehabilitation before demolition', 'Compensation for destroyed property'],
    demandsHi: ['अवैध तोड़फोड़ बंद', '30 दिन नोटिस अनिवार्य', 'तोड़फोड़ से पहले पुनर्वास', 'नष्ट संपत्ति का मुआवज़ा'],
  },
  {
    id: '6',
    title: 'Internet Freedom — Shutdown Accountability Campaign',
    titleHi: 'इंटरनेट स्वतंत्रता — शटडाउन जवाबदेही अभियान',
    city: 'Bengaluru',
    state: 'Karnataka',
    category: 'rights',
    status: 'active',
    participants: '1,500+',
    startDate: '2026-07-15',
    description: 'IFF-supported campaign demanding compensation for internet shutdowns, judicial review requirement, and transparency reports.',
    descriptionHi: 'IFF-समर्थित अभियान इंटरनेट शटडाउन के लिए मुआवज़ा, न्यायिक समीक्षा और पारदर्शिता रिपोर्ट की माँग।',
    demands: ['Compensation for shutdowns', 'Mandatory judicial review', 'Quarterly transparency reports', 'Sunset clauses on orders'],
    demandsHi: ['शटडाउन के लिए मुआवज़ा', 'अनिवार्य न्यायिक समीक्षा', 'त्रैमासिक पारदर्शिता रिपोर्ट', 'आदेशों पर सनसेट क्लॉज़'],
  },
  {
    id: '7',
    title: 'Delhi Air Quality Emergency Action',
    titleHi: 'दिल्ली वायु गुणवत्ता आपातकालीन कार्रवाई',
    city: 'Delhi',
    state: 'Delhi',
    category: 'environment',
    status: 'escalated',
    participants: '8,000+',
    startDate: '2026-05-20',
    description: 'Citizen coalition demanding enforceable air quality standards, industrial compliance, and green transport expansion. PIL in Supreme Court.',
    descriptionHi: 'नागरिक गठबंधन लागू करने योग्य वायु गुणवत्ता मानकों, औद्योगिक अनुपालन और हरित परिवहन विस्तार की माँग। सुप्रीम कोर्ट में PIL।',
    demands: ['Enforceable AQI standards', 'Industrial compliance enforcement', 'EV public transport expansion', 'Crop burning alternatives funding'],
    demandsHi: ['लागू करने योग्य AQI मानक', 'औद्योगिक अनुपालन प्रवर्तन', 'EV सार्वजनिक परिवहन विस्तार', 'फसल जलाने के विकल्प फंडिंग'],
  },
  {
    id: '8',
    title: 'Gig Workers Union — App-Based Worker Rights',
    titleHi: 'गिग वर्कर्स यूनियन — ऐप-आधारित श्रमिक अधिकार',
    city: 'Mumbai',
    state: 'Maharashtra',
    category: 'labor',
    status: 'active',
    participants: '4,000+',
    startDate: '2026-06-01',
    description: 'United Gig Workers Federation demanding minimum wages, social security, accident insurance, and algorithmic transparency for delivery/ride workers.',
    descriptionHi: 'संयुक्त गिग वर्कर्स फेडरेशन डिलीवरी/राइड श्रमिकों के लिए न्यूनतम मजदूरी, सामाजिक सुरक्षा, दुर्घटना बीमा और एल्गोरिथम पारदर्शिता की माँग।',
    demands: ['Minimum wage guarantee', 'Social security coverage', 'Accident insurance', 'Algorithmic transparency', 'Right to disconnect'],
    demandsHi: ['न्यूनतम मजदूरी गारंटी', 'सामाजिक सुरक्षा कवरेज', 'दुर्घटना बीमा', 'एल्गोरिथम पारदर्शिता', 'डिस्कनेक्ट का अधिकार'],
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  education: 'bg-blue-500',
  rights: 'bg-red-500',
  environment: 'bg-green-500',
  labor: 'bg-orange-500',
  governance: 'bg-purple-500',
  health: 'bg-pink-500',
};

const CATEGORY_LABELS: Record<string, { en: string; hi: string }> = {
  education: { en: 'Education', hi: 'शिक्षा' },
  rights: { en: 'Rights', hi: 'अधिकार' },
  environment: { en: 'Environment', hi: 'पर्यावरण' },
  labor: { en: 'Labor', hi: 'श्रम' },
  governance: { en: 'Governance', hi: 'शासन' },
  health: { en: 'Health', hi: 'स्वास्थ्य' },
};

const STATUS_LABELS: Record<string, { en: string; hi: string; icon: string }> = {
  active: { en: 'Active', hi: 'सक्रिय', icon: '🔴' },
  resolved: { en: 'Resolved', hi: 'समाधान', icon: '🟢' },
  escalated: { en: 'Escalated', hi: 'एस्केलेटेड', icon: '🟡' },
};

export default function MapClient({ locale }: { locale: Locale }) {
  const hi = locale === 'hi';
  const [categoryFilter, setCategoryFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignEvent | null>(null);

  const cities = useMemo(() => [...new Set(CAMPAIGNS.map(c => c.city))].sort(), []);

  const filtered = useMemo(() => {
    return CAMPAIGNS.filter(c => {
      if (categoryFilter && c.category !== categoryFilter) return false;
      if (cityFilter && c.city !== cityFilter) return false;
      return true;
    });
  }, [categoryFilter, cityFilter]);

  const stats = useMemo(() => ({
    active: CAMPAIGNS.filter(c => c.status === 'active').length,
    cities: new Set(CAMPAIGNS.map(c => c.city)).size,
    categories: new Set(CAMPAIGNS.map(c => c.category)).size,
  }), []);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-8">
        <h1 className="heading-display mb-2">{hi ? 'लाइव एक्शन मैप' : 'Live Action Map'}</h1>
        <p className="text-[var(--color-text-muted)]">{hi ? 'भारत भर में सक्रिय नागरिक अभियान और आंदोलन। ज़िला-स्तर — सटीक स्थान नहीं दिखाए जाते।' : 'Active civic campaigns and movements across India. District-level — precise locations not shown.'}</p>
      </div>

      {/* STATS BAR */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="brutal-card text-center !p-4">
          <p className="text-3xl font-black">{stats.active}</p>
          <p className="text-xs text-[var(--color-text-muted)]">{hi ? 'सक्रिय अभियान' : 'Active Campaigns'}</p>
        </div>
        <div className="brutal-card text-center !p-4">
          <p className="text-3xl font-black">{stats.cities}</p>
          <p className="text-xs text-[var(--color-text-muted)]">{hi ? 'शहर' : 'Cities'}</p>
        </div>
        <div className="brutal-card text-center !p-4">
          <p className="text-3xl font-black">{stats.categories}</p>
          <p className="text-xs text-[var(--color-text-muted)]">{hi ? 'मुद्दे' : 'Issues'}</p>
        </div>
      </div>

      {/* VISUAL MAP — CSS-based India map representation */}
      <div className="brutal-card mb-8 !p-6 !border-[var(--color-primary)]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="heading-3">{hi ? '🗺️ अभियान मानचित्र' : '🗺️ Campaign Map'}</h2>
          <div className="flex gap-2 flex-wrap">
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <span key={key} className="flex items-center gap-1 text-xs">
                <span className={`w-3 h-3 rounded-full ${CATEGORY_COLORS[key]}`} />
                {hi ? label.hi : label.en}
              </span>
            ))}
          </div>
        </div>

        {/* Map visualization as positioned dots on an India outline */}
        <div className="relative bg-[var(--color-surface-alt)] rounded-lg p-8 min-h-[300px] border-2 border-dashed border-[var(--color-border)]">
          <p className="absolute top-2 left-2 text-xs text-[var(--color-text-muted)]">{hi ? 'भारत — ज़िला स्तर' : 'India — District Level'}</p>
          
          {/* City markers positioned roughly */}
          {filtered.map((campaign) => {
            const positions: Record<string, { top: string; left: string }> = {
              'Delhi': { top: '25%', left: '40%' },
              'Jaipur': { top: '35%', left: '32%' },
              'Chandigarh': { top: '18%', left: '38%' },
              'Lucknow': { top: '32%', left: '52%' },
              'Mumbai': { top: '55%', left: '28%' },
              'Bengaluru': { top: '72%', left: '38%' },
              'Pune': { top: '58%', left: '30%' },
              'Hyderabad': { top: '60%', left: '42%' },
              'Chennai': { top: '72%', left: '45%' },
              'Kolkata': { top: '42%', left: '65%' },
            };
            const pos = positions[campaign.city] || { top: '50%', left: '50%' };
            return (
              <button
                key={campaign.id}
                type="button"
                onClick={() => setSelectedCampaign(campaign)}
                className={`absolute w-5 h-5 rounded-full ${CATEGORY_COLORS[campaign.category]} border-2 border-white shadow-lg cursor-pointer hover:scale-150 transition-transform ${campaign.status === 'active' ? 'animate-pulse' : ''}`}
                style={{ top: pos.top, left: pos.left }}
                title={hi ? campaign.titleHi : campaign.title}
                aria-label={hi ? campaign.titleHi : campaign.title}
              />
            );
          })}

          {/* Legend */}
          <div className="absolute bottom-2 right-2 text-xs text-[var(--color-text-muted)]">
            <span className="inline-block w-3 h-3 rounded-full bg-red-500 animate-pulse mr-1" /> = {hi ? 'सक्रिय' : 'Active'}
            {' '}<span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-1" /> = {hi ? 'समाधान' : 'Resolved'}
          </div>
        </div>
        <p className="text-xs text-[var(--color-text-muted)] mt-2">{hi ? '⚠️ गोपनीयता: सटीक स्थान नहीं दिखाए जाते। केवल ज़िला/शहर स्तर।' : '⚠️ Privacy: Precise locations not shown. District/city level only.'}</p>
      </div>

      {/* FILTERS */}
      <div className="grid md:grid-cols-2 gap-3 mb-6">
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="brutal-select" aria-label={hi ? 'मुद्दा फ़िल्टर' : 'Issue filter'}>
          <option value="">{hi ? 'सभी मुद्दे' : 'All Issues'}</option>
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <option key={key} value={key}>{hi ? label.hi : label.en}</option>
          ))}
        </select>
        <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} className="brutal-select" aria-label={hi ? 'शहर फ़िल्टर' : 'City filter'}>
          <option value="">{hi ? 'सभी शहर' : 'All Cities'}</option>
          {cities.map(city => <option key={city} value={city}>{city}</option>)}
        </select>
      </div>

      {/* CAMPAIGN DETAIL MODAL */}
      {selectedCampaign && (
        <div className="brutal-card mb-6 !border-[var(--color-primary)]" role="region" aria-label={hi ? 'अभियान विवरण' : 'Campaign details'}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="heading-3">{hi ? selectedCampaign.titleHi : selectedCampaign.title}</h3>
              <p className="text-sm text-[var(--color-text-muted)]">{selectedCampaign.city}, {selectedCampaign.state} · {STATUS_LABELS[selectedCampaign.status].icon} {hi ? STATUS_LABELS[selectedCampaign.status].hi : STATUS_LABELS[selectedCampaign.status].en}</p>
            </div>
            <button type="button" onClick={() => setSelectedCampaign(null)} className="brutal-btn text-sm">✕</button>
          </div>
          <p className="text-sm mb-4">{hi ? selectedCampaign.descriptionHi : selectedCampaign.description}</p>
          
          {selectedCampaign.safetyNote && (
            <div className="p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded mb-4">
              <strong className="text-sm">⚠️ {hi ? 'सुरक्षा:' : 'Safety:'}</strong>
              <p className="text-sm">{hi ? selectedCampaign.safetyNoteHi : selectedCampaign.safetyNote}</p>
            </div>
          )}

          <div className="mb-4">
            <strong className="text-sm">{hi ? 'माँगें:' : 'Demands:'}</strong>
            <ul className="mt-1 space-y-1">
              {(hi ? selectedCampaign.demandsHi : selectedCampaign.demands).map((d, i) => (
                <li key={i} className="text-sm">→ {d}</li>
              ))}
            </ul>
          </div>

          <div className="flex gap-2 flex-wrap">
            <span className={`brutal-badge text-xs ${CATEGORY_COLORS[selectedCampaign.category]} text-white`}>
              {hi ? CATEGORY_LABELS[selectedCampaign.category].hi : CATEGORY_LABELS[selectedCampaign.category].en}
            </span>
            <span className="brutal-badge text-xs">{hi ? 'प्रतिभागी:' : 'Participants:'} {selectedCampaign.participants}</span>
            <span className="brutal-badge text-xs">{hi ? 'शुरू:' : 'Started:'} {selectedCampaign.startDate}</span>
          </div>
        </div>
      )}

      {/* CAMPAIGN LIST */}
      <div className="space-y-4">
        <p className="text-sm text-[var(--color-text-muted)]">{filtered.length} {hi ? 'अभियान दिख रहे' : 'campaigns shown'}</p>
        {filtered.map((campaign) => (
          <article key={campaign.id} className="brutal-card cursor-pointer hover:border-[var(--color-primary)]" onClick={() => setSelectedCampaign(campaign)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setSelectedCampaign(campaign)}>
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-3 h-3 rounded-full ${CATEGORY_COLORS[campaign.category]} ${campaign.status === 'active' ? 'animate-pulse' : ''}`} />
                  <h3 className="font-bold">{hi ? campaign.titleHi : campaign.title}</h3>
                </div>
                <p className="text-sm text-[var(--color-text-muted)]">{campaign.city}, {campaign.state} · {campaign.participants} {hi ? 'प्रतिभागी' : 'participants'}</p>
                <p className="text-sm mt-1 line-clamp-2">{hi ? campaign.descriptionHi : campaign.description}</p>
              </div>
              <span className="text-xs whitespace-nowrap">
                {STATUS_LABELS[campaign.status].icon} {hi ? STATUS_LABELS[campaign.status].hi : STATUS_LABELS[campaign.status].en}
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* CTAs */}
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <Link href="/groups" className="brutal-btn brutal-btn-primary brutal-btn-lg text-center">{hi ? 'ग्रुप खोजें →' : 'FIND GROUPS →'}</Link>
        <Link href="/playbook" className="brutal-btn brutal-btn-lg text-center">{hi ? 'प्लेबुक →' : 'PLAYBOOK →'}</Link>
        <Link href="/safety" className="brutal-btn brutal-btn-lg text-center">{hi ? 'अधिकार →' : 'RIGHTS →'}</Link>
      </div>
    </div>
  );
}
