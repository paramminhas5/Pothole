'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Locale } from '@/types';

interface Props { locale: Locale; }

interface Section {
  slug: string;
  title: string;
  title_hi: string;
  description: string;
  description_hi: string;
  icon: string;
  article_count?: number;
}

export default function KnowTheSystemClient({ locale }: Props) {
  const hi = locale === 'hi';
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/knowledge');
        if (res.ok) {
          const data = await res.json();
          setSections(data.sections || []);
        }
      } catch { /* use fallback */ }
      setLoading(false);
    }
    load();
  }, []);

  // Fallback if API not ready
  useEffect(() => {
    if (!loading && sections.length === 0) {
      setSections([
        { slug: 'how-power-works', title: 'How Power Works', title_hi: 'सत्ता कैसे काम करती है', description: 'Municipality to Union. Who controls what money. How decisions actually get made.', description_hi: 'नगरपालिका से केंद्र तक। पैसा किसके पास। फैसले कैसे होते हैं।', icon: '🏛️', article_count: 8 },
        { slug: 'laws-to-know', title: 'Laws You Should Know', title_hi: 'ये कानून जानो', description: 'Current bills, your rights, acts that matter. Updated every parliament session.', description_hi: 'चल रहे बिल, आपके अधिकार, ज़रूरी एक्ट। हर सत्र अपडेट।', icon: '⚖️', article_count: 12 },
        { slug: 'the-playbook', title: 'The Playbook', title_hi: 'प्लेबुक', description: 'How to contest elections. Read budgets. Organize wards. Run campaigns that win.', description_hi: 'चुनाव कैसे लड़ें। बजट पढ़ें। वार्ड संगठित करें। जीतने वाले अभियान चलाएं।', icon: '📋', article_count: 6 },
        { slug: 'rti-mastery', title: 'RTI Mastery', title_hi: 'RTI में महारत', description: 'Beyond basics: appeals, IC complaints, penalties, using media pressure.', description_hi: 'बेसिक से आगे: अपील, IC शिकायत, जुर्माना, मीडिया दबाव।', icon: '📄', article_count: 5 },
        { slug: 'movement-history', title: 'Movement History', title_hi: 'आंदोलन इतिहास', description: 'What won, what failed, why. India-specific case studies from 1947 to now.', description_hi: 'क्या जीता, क्या हारा, क्यों। 1947 से अब तक भारत-विशिष्ट केस स्टडी।', icon: '✊', article_count: 10 },
      ]);
    }
  }, [loading, sections.length]);

  return (
    <div className="content-page">
      <div className="page-shell">
        {/* Header */}
        <div className="page-heading">
          <h1>{hi ? 'व्यवस्था जानो' : 'Know the System'}</h1>
          <p>{hi ? 'खुद को हथियार दो। समझो कि सत्ता कैसे काम करती है। कानून जानो। जीतने की प्लेबुक सीखो।' : 'Arm yourself. Understand how power works. Know the law. Learn the playbook for winning.'}</p>
        </div>

        {/* Philosophy */}
        <div className="warning-panel mb-8">
          <strong>{hi ? '🧠 यह स्कूल नहीं है' : '🧠 This is not a school'}</strong>
          <p>
            {hi
              ? 'कोई क्लास नहीं। कोई टीचर नहीं। यह वो ज्ञान है जो सिस्टम नहीं चाहता कि तुम्हारे पास हो। पढ़ो, जो चाहो, जब चाहो। हर सेक्शन एक फील्ड मिशन पर खत्म होता है — असली दुनिया में एक कदम।'
              : "No classes. No teachers. This is knowledge the system doesn't want you to have. Read what you want, when you want. Every section ends in a field mission — a real-world action step."}
          </p>
        </div>

        {/* Sections grid */}
        {loading ? (
          <div className="loading-state"><div className="loading-dot" /><span>{hi ? 'लोड हो रहा...' : 'Loading...'}</span></div>
        ) : (
          <div className="choice-grid">
            {sections.map(section => (
              <Link
                key={section.slug}
                href={`/know-the-system/${section.slug}`}
                className="choice-card"
              >
                <span className="text-4xl mb-3 block">{section.icon}</span>
                <h3 className="heading-3 mb-2">{hi ? section.title_hi : section.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-4">
                  {hi ? section.description_hi : section.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[var(--color-text-muted)]">
                    {section.article_count || 0} {hi ? 'लेख' : 'articles'}
                  </span>
                  <span className="choice-link">{hi ? 'शुरू करें →' : 'Start →'}</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Your progress (if logged in) */}
        <section className="mt-12">
          <h2 className="section-title">{hi ? 'तुम्हारा रिकॉर्ड' : 'Your Record'}</h2>
          <div className="info-panel">
            <p className="text-sm text-[var(--color-text-muted)]">
              {hi
                ? 'हर पूरा किया गया फील्ड मिशन तुम्हारी सिविक प्रोफाइल पर जाता है — पार्टियों, न्यूज़रूम और NGO को दिखाने योग्य।'
                : 'Every completed field mission goes on your civic profile — showable to parties, newsrooms, and NGOs.'}
            </p>
            <div className="button-row mt-3">
              <Link href="/profile" className="brutal-btn brutal-btn-sm">
                {hi ? 'प्रोफाइल देखें' : 'View Profile'}
              </Link>
            </div>
          </div>
        </section>

        {/* Field missions highlight */}
        <section className="mt-12">
          <h2 className="section-title">{hi ? 'फील्ड मिशन' : 'Field Missions'}</h2>
          <p className="text-sm text-[var(--color-text-muted)] mb-6">
            {hi ? 'असली दुनिया में करने वाले कदम — RTI दायर करो, वार्ड मीटिंग अटेंड करो, बजट पढ़ो।' : 'Real-world steps — file an RTI, attend a ward meeting, read a budget.'}
          </p>
          <div className="result-list">
            {[
              { title: hi ? 'अपने वार्ड काउंसलर का नाम और बजट खोजो' : 'Find your ward councillor name and budget', section: 'how-power-works', difficulty: 'beginner' },
              { title: hi ? 'एक RTI दायर करो (विषय कोई भी)' : 'File one RTI (any subject)', section: 'rti-mastery', difficulty: 'beginner' },
              { title: hi ? 'एक वार्ड कमेटी मीटिंग अटेंड करो' : 'Attend one ward committee meeting', section: 'the-playbook', difficulty: 'intermediate' },
              { title: hi ? 'अपने शहर का वार्षिक बजट पढ़ो' : 'Read your city annual budget', section: 'how-power-works', difficulty: 'intermediate' },
            ].map((mission, i) => (
              <div key={i} className="brutal-card-flat p-4 flex items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-sm">{mission.title}</p>
                  <span className="brutal-badge mt-1">{mission.difficulty}</span>
                </div>
                <span className="text-xs text-[var(--color-accent)] font-bold">{mission.section}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
