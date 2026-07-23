'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Locale } from '@/types';

interface SearchItem {
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  url: string;
  category: string;
  keywords: string[];
}


const SEARCH_INDEX: SearchItem[] = [
  { title: 'Rights Card — If Police Stop You', titleHi: 'अधिकार कार्ड — अगर पुलिस रोके', description: 'What to say if arrested, detained, or stopped. Constitutional rights. Emergency numbers.', descriptionHi: 'गिरफ्तारी, डिटेंशन, रोकने पर क्या बोलें। संवैधानिक अधिकार। आपातकालीन नंबर।', url: '/safety', category: 'Rights', keywords: ['arrest', 'detained', 'police', 'rights', 'lawyer', 'bail', 'magistrate', 'गिरफ्तारी', 'पुलिस', 'अधिकार', 'वकील', 'जमानत'] },
  { title: 'RTI Generator', titleHi: 'RTI जनरेटर', description: 'File Right to Information application. ₹10. 30 days mandatory response. Penalty if ignored.', descriptionHi: 'सूचना का अधिकार आवेदन दाखिल करें। ₹10। 30 दिन अनिवार्य जवाब। अनदेखा करने पर जुर्माना।', url: '/rti', category: 'Legal Tools', keywords: ['rti', 'right to information', 'government', 'transparency', 'appeal', 'CIC', 'सूचना', 'अधिकार', 'सरकार'] },
  { title: 'FIR Assistant', titleHi: 'FIR असिस्टेंट', description: 'Generate FIR complaint + SP letter + Magistrate complaint. Police cannot refuse.', descriptionHi: 'FIR शिकायत + SP पत्र + मजिस्ट्रेट शिकायत बनाएँ। पुलिस मना नहीं कर सकती।', url: '/fir', category: 'Legal Tools', keywords: ['fir', 'police', 'complaint', 'magistrate', 'SP', 'crime', 'report', 'पुलिस', 'शिकायत', 'अपराध'] },
  { title: 'Protest Preparation', titleHi: 'विरोध की तैयारी', description: 'What to expect, what to bring, buddy system, what police do, if arrested guide.', descriptionHi: 'क्या उम्मीद करें, क्या लाएँ, बडी सिस्टम, पुलिस क्या करती है, गिरफ्तारी गाइड।', url: '/expect', category: 'Safety', keywords: ['protest', 'prepare', 'tear gas', 'lathi', 'buddy', 'safety', 'विरोध', 'तैयारी', 'आँसू गैस', 'लाठी', 'सुरक्षा'] },
  { title: 'Emergency Numbers & Resources', titleHi: 'आपातकालीन नंबर और संसाधन', description: 'Legal aid, helplines, shelters, mental health, government portals, civic organizations.', descriptionHi: 'कानूनी सहायता, हेल्पलाइन, आश्रय, मानसिक स्वास्थ्य, सरकारी पोर्टल, नागरिक संगठन।', url: '/resources', category: 'Resources', keywords: ['helpline', 'lawyer', 'shelter', 'mental health', 'emergency', 'NHRC', 'NALSA', 'DSLSA', 'हेल्पलाइन', 'वकील', 'आश्रय', 'मानसिक'] },
  { title: 'Demand Tracker', titleHi: 'माँग ट्रैकर', description: 'Create demands, track them, escalate. Hold institutions accountable with deadlines.', descriptionHi: 'माँगें बनाएँ, ट्रैक करें, एस्केलेट करें। संस्थाओं को समयसीमा के साथ जवाबदेह बनाएँ।', url: '/demands', category: 'Accountability', keywords: ['demand', 'track', 'escalate', 'accountability', 'institution', 'deadline', 'माँग', 'जवाबदेही', 'संस्था'] },
  { title: 'Governance Tracker & Scorecard', titleHi: 'शासन ट्रैकर और स्कोरकार्ड', description: 'Representative attendance, questions asked, RTI responses, institutional accountability scores.', descriptionHi: 'प्रतिनिधि उपस्थिति, प्रश्न पूछे, RTI जवाब, संस्थागत जवाबदेही स्कोर।', url: '/governance', category: 'Accountability', keywords: ['MLA', 'MP', 'representative', 'scorecard', 'attendance', 'governance', 'voting', 'विधायक', 'सांसद', 'स्कोरकार्ड'] },
  { title: 'Playbook — Protest to Power', titleHi: 'प्लेबुक — विरोध से शक्ति', description: '10 steps from anger to institutional change. Demand → Document → RTI → FIR → PIL → Win.', descriptionHi: 'गुस्से से संस्थागत बदलाव तक 10 कदम। माँग → दस्तावेज़ → RTI → FIR → PIL → जीत।', url: '/playbook', category: 'Strategy', keywords: ['playbook', 'escalation', 'PIL', 'strategy', 'power', 'coalition', 'प्लेबुक', 'एस्केलेशन', 'रणनीति'] },
  { title: 'Live Campaign Map', titleHi: 'लाइव अभियान मैप', description: 'Active protests and campaigns across India. District-level. Safety metadata.', descriptionHi: 'भारत भर में सक्रिय विरोध और अभियान। ज़िला स्तर। सुरक्षा मेटाडेटा।', url: '/map', category: 'Situational', keywords: ['map', 'campaign', 'protest', 'active', 'location', 'Delhi', 'Mumbai', 'मैप', 'अभियान', 'विरोध', 'दिल्ली'] },
  { title: 'Groups — Find & Create', titleHi: 'ग्रुप — खोजें और बनाएँ', description: 'Find organizing groups by city and issue. Create your own. Moderated.', descriptionHi: 'शहर और मुद्दे से ग्रुप खोजें। अपना बनाएँ। मॉडरेट।', url: '/groups', category: 'Organize', keywords: ['group', 'organize', 'join', 'create', 'city', 'chapter', 'ग्रुप', 'संगठित', 'शहर'] },
  { title: 'How to Organize', titleHi: 'कैसे संगठित करें', description: 'Form groups, assign roles, protest legally, sustain pressure. Full guide.', descriptionHi: 'ग्रुप बनाएँ, भूमिकाएँ बाँटें, कानूनी विरोध, दबाव बनाए रखें। पूरी गाइड।', url: '/organize', category: 'Organize', keywords: ['organize', 'roles', 'coordinator', 'legal protest', 'sustained', 'संगठित', 'भूमिका', 'समन्वयक'] },
  { title: 'Secure Communication Guide', titleHi: 'सुरक्षित संचार गाइड', description: 'Signal vs Telegram vs WhatsApp. Group structure. Rules. Internet shutdown plan.', descriptionHi: 'Signal vs Telegram vs WhatsApp. ग्रुप संरचना। नियम। इंटरनेट शटडाउन योजना।', url: '/communication', category: 'Security', keywords: ['Signal', 'Telegram', 'WhatsApp', 'encrypt', 'shutdown', 'VPN', 'Briar', 'एन्क्रिप्ट', 'शटडाउन'] },
  { title: 'Templates & Tools', titleHi: 'टेम्पलेट और उपकरण', description: 'Copy-paste templates: RTI, FIR, First Appeal, CIC complaint, representative letter.', descriptionHi: 'कॉपी-पेस्ट टेम्पलेट: RTI, FIR, प्रथम अपील, CIC शिकायत, प्रतिनिधि पत्र।', url: '/toolkit', category: 'Legal Tools', keywords: ['template', 'RTI', 'FIR', 'appeal', 'CIC', 'letter', 'copy', 'टेम्पलेट', 'अपील', 'पत्र'] },
  { title: 'Write to Representative', titleHi: 'प्रतिनिधि को लिखें', description: 'Find MLA/MP. Letter template. Who controls what. CPGRAMS link.', descriptionHi: 'MLA/MP खोजें। पत्र टेम्पलेट। कौन क्या नियंत्रित करता है। CPGRAMS लिंक।', url: '/representatives', category: 'Accountability', keywords: ['MLA', 'MP', 'letter', 'representative', 'CPGRAMS', 'constituency', 'विधायक', 'सांसद', 'पत्र'] },
  { title: 'Contribution Board', titleHi: 'योगदान बोर्ड', description: 'Tasks you can do: translate, design, research, legal, coding, outreach, mental health.', descriptionHi: 'कार्य: अनुवाद, डिज़ाइन, शोध, कानूनी, कोडिंग, जन-संपर्क, मानसिक स्वास्थ्य।', url: '/contribute', category: 'Contribute', keywords: ['volunteer', 'contribute', 'translate', 'design', 'code', 'research', 'स्वयंसेवक', 'योगदान', 'अनुवाद'] },
  { title: 'Submit a Resource', titleHi: 'संसाधन जमा करें', description: 'Add a lawyer, helpline, organization, or tool to the directory. Reviewed before publishing.', descriptionHi: 'डायरेक्टरी में वकील, हेल्पलाइन, संगठन, या उपकरण जोड़ें। प्रकाशन से पहले समीक्षा।', url: '/submit', category: 'Contribute', keywords: ['submit', 'add', 'resource', 'lawyer', 'helpline', 'organization', 'जमा', 'जोड़ें', 'संसाधन'] },
  { title: 'Legal Glossary', titleHi: 'कानूनी शब्दावली', description: '50+ legal terms explained simply. FIR, PIL, RTI, BNSS, Section 163, bail, remand, habeas corpus.', descriptionHi: '50+ कानूनी शब्द सरल भाषा में। FIR, PIL, RTI, BNSS, धारा 163, जमानत, रिमांड, हेबियस कॉर्पस।', url: '/glossary', category: 'Legal Knowledge', keywords: ['glossary', 'legal', 'FIR', 'PIL', 'RTI', 'BNSS', 'bail', 'section', 'शब्दावली', 'कानूनी', 'जमानत', 'धारा'] },
  { title: 'Delhi City Guide', titleHi: 'दिल्ली शहर गाइड', description: 'Delhi-specific: local courts, DSLSA office, DCP numbers, hospitals near protest sites, FM frequencies.', descriptionHi: 'दिल्ली-विशिष्ट: स्थानीय अदालतें, DSLSA कार्यालय, DCP नंबर, विरोध स्थलों के पास अस्पताल, FM आवृत्तियाँ।', url: '/city/delhi', category: 'City Guide', keywords: ['Delhi', 'court', 'hospital', 'DSLSA', 'DCP', 'Jantar Mantar', 'दिल्ली', 'अदालत', 'अस्पताल'] },
  { title: 'Infrastructure — How This Stays Up', titleHi: 'बुनियादी ढाँचा — यह कैसे टिका रहता है', description: 'Multi-layer hosting, censorship resistance, mirrors, IPFS, Tor, costs, run your own mirror.', descriptionHi: 'बहु-स्तरीय होस्टिंग, सेंसरशिप प्रतिरोध, मिरर, IPFS, Tor, लागत, खुद मिरर चलाएँ।', url: '/infrastructure', category: 'Platform', keywords: ['mirror', 'IPFS', 'Tor', 'censorship', 'hosting', 'infrastructure', 'मिरर', 'सेंसरशिप', 'होस्टिंग'] },
  { title: 'Developer Guide — Build With Us', titleHi: 'डेवलपर गाइड — हमारे साथ बनाएँ', description: 'Tech stack, setup, contribution guide, what needs building, code standards.', descriptionHi: 'टेक स्टैक, सेटअप, योगदान गाइड, क्या बनाना है, कोड स्टैंडर्ड।', url: '/developers', category: 'Platform', keywords: ['developer', 'code', 'github', 'contribute', 'typescript', 'next.js', 'डेवलपर', 'कोड'] },
  { title: 'Manifesto — Why We Build This', titleHi: 'घोषणापत्र — हम यह क्यों बनाते हैं', description: 'Mission, principles, what we are, what we are not, how to join.', descriptionHi: 'मिशन, सिद्धांत, हम क्या हैं, क्या नहीं हैं, कैसे जुड़ें।', url: '/manifesto', category: 'Platform', keywords: ['manifesto', 'mission', 'principles', 'open source', 'join', 'घोषणापत्र', 'सिद्धांत'] },
];


export default function SearchClient({ locale }: { locale: Locale }) {
  const hi = locale === 'hi';
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return SEARCH_INDEX.filter(item => {
      const searchable = [
        item.title, item.titleHi, item.description, item.descriptionHi,
        item.category, ...item.keywords,
      ].join(' ').toLowerCase();
      return q.split(/\s+/).every(word => searchable.includes(word));
    });
  }, [query]);

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-8">
        <h1 className="heading-display mb-3">{hi ? 'खोजें' : 'Search'}</h1>
        <p className="text-[var(--color-text-muted)]">{hi ? 'अधिकार, RTI, FIR, आँसू गैस, जमानत, PIL — कुछ भी खोजें।' : 'Rights, RTI, FIR, tear gas, bail, PIL — search anything.'}</p>
      </div>

      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={hi ? 'जैसे: bail, RTI appeal, tear gas, Section 163...' : 'e.g. bail, RTI appeal, tear gas, Section 163...'}
        className="brutal-input mb-6"
        style={{ fontSize: '1.1rem', padding: '16px 20px' }}
        autoFocus
        aria-label={hi ? 'खोज' : 'Search'}
      />

      {query.trim().length >= 2 && (
        <p className="text-sm text-[var(--color-text-muted)] mb-4">
          {results.length} {hi ? 'परिणाम' : 'results'} {hi ? '' : `for "${query}"`}
        </p>
      )}

      <div className="space-y-3">
        {results.map((item) => (
          <Link key={item.url} href={item.url} className="brutal-card block !p-4 hover:border-[var(--color-accent)]" style={{ textDecoration: 'none' }}>
            <div className="flex justify-between items-start gap-3">
              <div>
                <h2 className="font-bold text-base">{hi ? item.titleHi : item.title}</h2>
                <p className="text-sm text-[var(--color-text-muted)] mt-1">{hi ? item.descriptionHi : item.description}</p>
              </div>
              <span className="text-xs whitespace-nowrap px-2 py-1 bg-[var(--color-surface-alt)] rounded font-bold">{item.category}</span>
            </div>
          </Link>
        ))}
      </div>

      {query.trim().length >= 2 && results.length === 0 && (
        <div className="brutal-card text-center py-8">
          <p className="text-lg mb-2">{hi ? 'कुछ नहीं मिला' : 'Nothing found'}</p>
          <p className="text-sm text-[var(--color-text-muted)]">{hi ? 'अलग शब्द आज़माएँ या संसाधन जमा करें।' : 'Try different words or submit a resource.'}</p>
          <Link href="/submit" className="brutal-btn brutal-btn-primary mt-4">{hi ? 'संसाधन जमा करें' : 'Submit Resource'}</Link>
        </div>
      )}

      {query.trim().length < 2 && (
        <div className="brutal-card">
          <h2 className="heading-3 mb-3">{hi ? 'लोकप्रिय खोजें' : 'Popular Searches'}</h2>
          <div className="flex flex-wrap gap-2">
            {['bail', 'tear gas', 'RTI', 'FIR', 'PIL', 'Section 163', 'lawyer', 'arrest', 'VPN', 'Signal'].map(term => (
              <button key={term} type="button" onClick={() => setQuery(term)} className="brutal-btn brutal-btn-sm">{term}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
