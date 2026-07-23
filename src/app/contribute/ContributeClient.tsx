'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Locale } from '@/types';

interface Task {
  id: string;
  title: string;
  titleHi: string;
  group: string;
  category: 'legal' | 'translation' | 'design' | 'coding' | 'research' | 'outreach' | 'logistics' | 'media' | 'mental-health';
  effort: 'low' | 'medium' | 'high';
  mode: 'remote' | 'in-person' | 'hybrid';
  city?: string;
  description: string;
  descriptionHi: string;
  skills: string[];
  deadline?: string;
  claimed: boolean;
  impact: string;
  impactHi: string;
}

const TASKS: Task[] = [
  { id: '1', title: 'Translate Safety Guide to Tamil', titleHi: 'सुरक्षा गाइड का तमिल अनुवाद', group: 'Sahayata Core', category: 'translation', effort: 'medium', mode: 'remote', description: 'Translate the Know Your Rights pocket card and safety guide from English to Tamil. ~2000 words.', descriptionHi: 'अपने अधिकार जानें पॉकेट कार्ड और सुरक्षा गाइड का अंग्रेज़ी से तमिल अनुवाद। ~2000 शब्द।', skills: ['Tamil', 'English', 'Legal terminology'], deadline: '2026-08-05', claimed: false, impact: 'Makes safety info accessible to 80M+ Tamil speakers', impactHi: '8 करोड़+ तमिल भाषियों के लिए सुरक्षा जानकारी सुलभ' },
  { id: '2', title: 'Design protest poster template — CJP solidarity', titleHi: 'विरोध पोस्टर टेम्पलेट डिज़ाइन — CJP एकजुटता', group: 'Delhi Student Network', category: 'design', effort: 'low', mode: 'remote', description: 'Create a printable A3 poster template for CJP solidarity marches. Must include demands, emergency numbers, and QR to rights guide.', descriptionHi: 'CJP एकजुटता मार्च के लिए प्रिंट करने योग्य A3 पोस्टर टेम्पलेट बनाएँ। माँगें, आपातकालीन नंबर, अधिकार गाइड QR शामिल करें।', skills: ['Graphic Design', 'Canva/Figma', 'Hindi'], claimed: false, impact: 'Used by 50+ marches across India', impactHi: 'भारत भर में 50+ मार्चों में उपयोग' },
  { id: '3', title: 'RTI data compilation — NTA exam irregularities 2024-26', titleHi: 'RTI डेटा संकलन — NTA परीक्षा अनियमितताएँ 2024-26', group: 'Education Reform Coalition', category: 'research', effort: 'high', mode: 'remote', description: 'Compile all RTI responses related to NTA exam irregularities from 2024-2026. Create structured dataset + summary report.', descriptionHi: '2024-2026 NTA परीक्षा अनियमितताओं से संबंधित सभी RTI जवाबों का संकलन। संरचित डेटासेट + सारांश रिपोर्ट बनाएँ।', skills: ['Data Analysis', 'RTI Knowledge', 'Report Writing'], deadline: '2026-08-15', claimed: true, impact: 'Provides evidence base for PIL and parliamentary pressure', impactHi: 'PIL और संसदीय दबाव के लिए साक्ष्य आधार' },
  { id: '4', title: 'Legal observer training — Delhi July marches', titleHi: 'कानूनी पर्यवेक्षक प्रशिक्षण — दिल्ली जुलाई मार्च', group: 'HRLN Delhi', category: 'legal', effort: 'medium', mode: 'in-person', city: 'Delhi', description: 'Attend 4-hour legal observer training and serve as observer at upcoming Delhi marches. Document police actions, badge numbers, time stamps.', descriptionHi: '4 घंटे कानूनी पर्यवेक्षक प्रशिक्षण में भाग लें और आगामी दिल्ली मार्चों में पर्यवेक्षक बनें। पुलिस कार्रवाई, बैज नंबर, समय दर्ज करें।', skills: ['Hindi', 'Note-taking', 'Calm under pressure'], claimed: false, impact: 'Protects 10,000+ marchers through documentation', impactHi: 'दस्तावेज़ीकरण से 10,000+ प्रदर्शनकारियों की सुरक्षा' },
  { id: '5', title: 'Build SMS alert integration for 2G users', titleHi: '2G उपयोगकर्ताओं के लिए SMS अलर्ट इंटीग्रेशन बनाएँ', group: 'Sahayata Core', category: 'coding', effort: 'high', mode: 'remote', description: 'Implement Twilio SMS integration for sending safety alerts to users on 2G networks who cannot receive push notifications.', descriptionHi: '2G नेटवर्क पर उपयोगकर्ताओं को सुरक्षा अलर्ट भेजने के लिए Twilio SMS इंटीग्रेशन लागू करें।', skills: ['TypeScript', 'Twilio API', 'Next.js'], claimed: false, impact: 'Extends alerts to 100M+ users on basic phones', impactHi: 'बेसिक फोन पर 10 करोड़+ उपयोगकर्ताओं तक अलर्ट पहुँच' },
  { id: '6', title: 'Peer support calls — post-protest processing', titleHi: 'सहकर्मी सहायता कॉल — विरोध-पश्चात प्रक्रिया', group: 'Mental Health Collective', category: 'mental-health', effort: 'medium', mode: 'remote', description: 'Trained peer supporters conduct 30-min debrief calls with protesters experiencing anxiety, anger, or trauma after events.', descriptionHi: 'प्रशिक्षित सहकर्मी विरोध-पश्चात चिंता, क्रोध या ट्रॉमा अनुभव करने वालों के साथ 30 मिनट डीब्रीफ कॉल करें।', skills: ['Active listening', 'Crisis awareness', 'Hindi/English'], claimed: false, impact: 'Prevents burnout, supports 50+ activists/week', impactHi: 'बर्नआउट रोकता है, 50+ कार्यकर्ताओं/सप्ताह का समर्थन' },
  { id: '7', title: 'Door-to-door voter awareness — Chandigarh ward election', titleHi: 'घर-घर मतदाता जागरूकता — चंडीगढ़ वार्ड चुनाव', group: 'Chandigarh Citizens Forum', category: 'outreach', effort: 'medium', mode: 'in-person', city: 'Chandigarh', description: 'Distribute candidate scorecards and voter rights information door-to-door in Sector 15-20 before August ward elections.', descriptionHi: 'अगस्त वार्ड चुनाव से पहले सेक्टर 15-20 में उम्मीदवार स्कोरकार्ड और मतदाता अधिकार जानकारी घर-घर वितरित करें।', skills: ['Hindi/Punjabi', 'Walking', 'Communication'], deadline: '2026-08-10', claimed: false, impact: 'Informs 5,000+ voters about candidate records', impactHi: '5,000+ मतदाताओं को उम्मीदवार रिकॉर्ड की जानकारी' },
  { id: '8', title: 'Social media amplification — #CJPChaloSansad', titleHi: 'सोशल मीडिया प्रचार — #CJPChaloSansad', group: 'CJP Digital Cell', category: 'media', effort: 'low', mode: 'remote', description: 'Create and share 3 posts/day on X, Instagram, and WhatsApp supporting the Chalo Sansad campaign. Use provided templates.', descriptionHi: 'चलो संसद अभियान का समर्थन करते हुए X, Instagram और WhatsApp पर प्रतिदिन 3 पोस्ट बनाएँ और शेयर करें।', skills: ['Social Media', 'Content Creation', 'Hindi/English'], claimed: false, impact: 'Amplifies message to 1M+ people daily', impactHi: 'रोज़ाना 10 लाख+ लोगों तक संदेश' },
];

const CATEGORY_CONFIG: Record<string, { label: string; labelHi: string; icon: string }> = {
  legal: { label: 'Legal', labelHi: 'कानूनी', icon: '⚖️' },
  translation: { label: 'Translation', labelHi: 'अनुवाद', icon: '🌐' },
  design: { label: 'Design', labelHi: 'डिज़ाइन', icon: '🎨' },
  coding: { label: 'Coding', labelHi: 'कोडिंग', icon: '💻' },
  research: { label: 'Research', labelHi: 'शोध', icon: '📊' },
  outreach: { label: 'Outreach', labelHi: 'जन-संपर्क', icon: '🚪' },
  logistics: { label: 'Logistics', labelHi: 'लॉजिस्टिक्स', icon: '📦' },
  media: { label: 'Media', labelHi: 'मीडिया', icon: '📱' },
  'mental-health': { label: 'Mental Health', labelHi: 'मानसिक स्वास्थ्य', icon: '💚' },
};

const EFFORT_CONFIG: Record<string, { label: string; labelHi: string; color: string }> = {
  low: { label: '1-2 hrs', labelHi: '1-2 घंटे', color: 'bg-green-100 text-green-800' },
  medium: { label: '3-8 hrs', labelHi: '3-8 घंटे', color: 'bg-yellow-100 text-yellow-800' },
  high: { label: '10+ hrs', labelHi: '10+ घंटे', color: 'bg-red-100 text-red-800' },
};

export default function ContributeClient({ locale }: { locale: Locale }) {
  const hi = locale === 'hi';
  const [categoryFilter, setCategoryFilter] = useState('');
  const [modeFilter, setModeFilter] = useState('');
  const [effortFilter, setEffortFilter] = useState('');
  const [showClaimed, setShowClaimed] = useState(false);

  const filtered = useMemo(() => {
    return TASKS.filter(t => {
      if (categoryFilter && t.category !== categoryFilter) return false;
      if (modeFilter && t.mode !== modeFilter) return false;
      if (effortFilter && t.effort !== effortFilter) return false;
      if (!showClaimed && t.claimed) return false;
      return true;
    });
  }, [categoryFilter, modeFilter, effortFilter, showClaimed]);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-8">
        <h1 className="heading-display mb-2">{hi ? 'योगदान बोर्ड' : 'Contribution Board'}</h1>
        <p className="text-[var(--color-text-muted)]">{hi ? 'अपने कौशल से आंदोलन मजबूत करें। हर योगदान मायने रखता है।' : 'Strengthen the movement with your skills. Every contribution matters.'}</p>
      </div>

      {/* ONBOARDING CTA */}
      <div className="brutal-card mb-8 !border-[var(--color-primary)]">
        <div className="grid md:grid-cols-4 gap-4 text-center">
          <div className="p-3">
            <p className="text-2xl mb-1">🌱</p>
            <p className="font-bold text-sm">{hi ? 'आरंभिक' : 'Casual'}</p>
            <p className="text-xs text-[var(--color-text-muted)]">1-2 {hi ? 'घंटे/सप्ताह' : 'hrs/week'}</p>
          </div>
          <div className="p-3">
            <p className="text-2xl mb-1">🌿</p>
            <p className="font-bold text-sm">{hi ? 'नियमित' : 'Regular'}</p>
            <p className="text-xs text-[var(--color-text-muted)]">5-10 {hi ? 'घंटे/सप्ताह' : 'hrs/week'}</p>
          </div>
          <div className="p-3">
            <p className="text-2xl mb-1">🌳</p>
            <p className="font-bold text-sm">{hi ? 'मुख्य' : 'Core'}</p>
            <p className="text-xs text-[var(--color-text-muted)]">10+ {hi ? 'घंटे/सप्ताह' : 'hrs/week'}</p>
          </div>
          <div className="p-3">
            <p className="text-2xl mb-1">🔥</p>
            <p className="font-bold text-sm">{hi ? 'नेतृत्व' : 'Leader'}</p>
            <p className="text-xs text-[var(--color-text-muted)]">{hi ? 'पूर्ण प्रतिबद्धता' : 'Full commitment'}</p>
          </div>
        </div>
        <p className="text-xs text-center text-[var(--color-text-muted)] mt-2">{hi ? 'कोई भी स्तर चुनें। बढ़ना/घटना ठीक है। पीछे हटना = दोषी नहीं।' : 'Choose any level. Moving up/down is fine. Stepping back = no guilt.'}</p>
      </div>

      {/* FILTERS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="brutal-select" aria-label={hi ? 'कौशल फ़िल्टर' : 'Skill filter'}>
          <option value="">{hi ? 'सभी कौशल' : 'All Skills'}</option>
          {Object.entries(CATEGORY_CONFIG).map(([key, cfg]) => (
            <option key={key} value={key}>{cfg.icon} {hi ? cfg.labelHi : cfg.label}</option>
          ))}
        </select>
        <select value={modeFilter} onChange={(e) => setModeFilter(e.target.value)} className="brutal-select" aria-label={hi ? 'मोड फ़िल्टर' : 'Mode filter'}>
          <option value="">{hi ? 'सभी मोड' : 'All Modes'}</option>
          <option value="remote">{hi ? '🏠 रिमोट' : '🏠 Remote'}</option>
          <option value="in-person">{hi ? '🏃 व्यक्तिगत' : '🏃 In-Person'}</option>
          <option value="hybrid">{hi ? '🔀 हाइब्रिड' : '🔀 Hybrid'}</option>
        </select>
        <select value={effortFilter} onChange={(e) => setEffortFilter(e.target.value)} className="brutal-select" aria-label={hi ? 'प्रयास फ़िल्टर' : 'Effort filter'}>
          <option value="">{hi ? 'सभी प्रयास' : 'All Effort'}</option>
          <option value="low">{hi ? '🟢 कम (1-2 घंटे)' : '🟢 Low (1-2 hrs)'}</option>
          <option value="medium">{hi ? '🟡 मध्यम (3-8 घंटे)' : '🟡 Medium (3-8 hrs)'}</option>
          <option value="high">{hi ? '🔴 उच्च (10+ घंटे)' : '🔴 High (10+ hrs)'}</option>
        </select>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={showClaimed} onChange={(e) => setShowClaimed(e.target.checked)} className="w-4 h-4" />
          {hi ? 'भरे हुए दिखाएँ' : 'Show claimed'}
        </label>
      </div>

      {/* TASK LIST */}
      <p className="text-sm text-[var(--color-text-muted)] mb-4">{filtered.length} {hi ? 'कार्य उपलब्ध' : 'tasks available'}</p>
      <div className="space-y-4">
        {filtered.map((task) => (
          <article key={task.id} className={`brutal-card ${task.claimed ? 'opacity-60' : ''}`}>
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-lg">{CATEGORY_CONFIG[task.category].icon}</span>
                  <h3 className="font-bold">{hi ? task.titleHi : task.title}</h3>
                  {task.claimed && <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">{hi ? '✓ ले लिया' : '✓ Claimed'}</span>}
                </div>
                <p className="text-sm text-[var(--color-text-muted)]">{task.group} · {task.mode === 'remote' ? (hi ? '🏠 रिमोट' : '🏠 Remote') : task.mode === 'in-person' ? `🏃 ${task.city}` : '🔀 Hybrid'}</p>
                <p className="text-sm mt-2">{hi ? task.descriptionHi : task.description}</p>
                
                <div className="flex flex-wrap gap-1 mt-2">
                  {task.skills.map(skill => (
                    <span key={skill} className="text-xs px-2 py-0.5 bg-[var(--color-surface-alt)] rounded border border-[var(--color-border)]">{skill}</span>
                  ))}
                </div>

                <div className="flex items-center gap-3 mt-3 text-xs text-[var(--color-text-muted)]">
                  <span className={`px-2 py-0.5 rounded ${EFFORT_CONFIG[task.effort].color}`}>{hi ? EFFORT_CONFIG[task.effort].labelHi : EFFORT_CONFIG[task.effort].label}</span>
                  {task.deadline && <span>{hi ? 'समयसीमा:' : 'Deadline:'} {task.deadline}</span>}
                  <span>💪 {hi ? task.impactHi : task.impact}</span>
                </div>
              </div>

              {!task.claimed && (
                <button type="button" className="brutal-btn brutal-btn-primary text-sm whitespace-nowrap">
                  {hi ? 'लेता हूँ' : 'Claim'}
                </button>
              )}
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="brutal-card text-center py-8">
          <p className="text-lg mb-2">{hi ? 'इन फ़िल्टर में कोई कार्य नहीं' : 'No tasks match these filters'}</p>
          <button type="button" onClick={() => { setCategoryFilter(''); setModeFilter(''); setEffortFilter(''); }} className="brutal-btn brutal-btn-primary">{hi ? 'फ़िल्टर हटाएँ' : 'Clear Filters'}</button>
        </div>
      )}

      {/* CTAs */}
      <div className="grid md:grid-cols-2 gap-4 mt-8">
        <Link href="/groups" className="brutal-btn brutal-btn-primary brutal-btn-lg text-center">{hi ? 'ग्रुप ढूँढें →' : 'FIND GROUPS →'}</Link>
        <Link href="/organize" className="brutal-btn brutal-btn-lg text-center">{hi ? 'संगठन गाइड →' : 'ORGANIZE GUIDE →'}</Link>
      </div>
    </div>
  );
}
