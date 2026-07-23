'use client';

import Link from 'next/link';
import { Locale } from '@/types';

interface QuickActionProps {
  locale: Locale;
}

export default function QuickAction({ locale }: QuickActionProps) {
  const hi = locale === 'hi';

  const actions = [
    {
      time: hi ? '30 सेकंड' : '30 sec',
      title: hi ? 'अधिकार कार्ड सेव करें' : 'Save the Rights Card',
      desc: hi ? 'प्रिंट / स्क्रीनशॉट — अगर कभी रोके गए तो काम आएगा' : 'Print / screenshot — will help if ever stopped',
      link: '/safety',
      cta: hi ? 'कार्ड देखें' : 'View Card',
    },
    {
      time: hi ? '5 मिनट' : '5 min',
      title: hi ? 'RTI दाखिल करें' : 'File an RTI',
      desc: hi ? 'सरकार को 30 दिन में जवाब देना होगा — नहीं दिया तो जुर्माना' : 'Government must respond in 30 days — penalty if not',
      link: '/rti',
      cta: hi ? 'RTI बनाएँ' : 'Generate RTI',
    },
    {
      time: hi ? '2 मिनट' : '2 min',
      title: hi ? 'अपना ग्रुप खोजें' : 'Find your group',
      desc: hi ? 'शहर + मुद्दे से मैच — अकेले मत लड़ो' : 'Match by city + issue — don\'t fight alone',
      link: '/groups',
      cta: hi ? 'ग्रुप खोजें' : 'Find Groups',
    },
    {
      time: hi ? '1 मिनट' : '1 min',
      title: hi ? 'स्कोरकार्ड देखें' : 'Check the Scorecard',
      desc: hi ? 'किस संस्था ने जवाब दिया, किसने नहीं — सार्वजनिक दबाव' : 'Who responded, who didn\'t — public pressure',
      link: '/governance',
      cta: hi ? 'स्कोरकार्ड' : 'Scorecard',
    },
    {
      time: hi ? '3 मिनट' : '3 min',
      title: hi ? 'प्रतिनिधि को लिखें' : 'Write to your representative',
      desc: hi ? 'MLA/MP आपके कर्मचारी हैं — बताएँ क्या चाहिए' : 'Your MLA/MP works for you — tell them what you need',
      link: '/representatives',
      cta: hi ? 'पत्र लिखें' : 'Write Letter',
    },
  ];

  return (
    <section className="quick-action-section" aria-labelledby="quick-title">
      <div className="page-shell">
        <div className="quick-header">
          <h2 id="quick-title" className="section-title">
            {hi ? 'अभी 5 मिनट हैं?' : 'Got 5 minutes?'}
          </h2>
          <p className="quick-subtitle">
            {hi
              ? 'अकाउंट नहीं चाहिए। फोन नंबर नहीं। सब कुछ ऑफलाइन काम करता है।'
              : 'No account needed. No phone number. Everything works offline.'}
          </p>
        </div>

        <div className="quick-actions-grid">
          {actions.map((action) => (
            <Link key={action.link} href={action.link} className="quick-action-card">
              <span className="quick-action-time">{action.time}</span>
              <span className="quick-action-title">{action.title}</span>
              <span className="quick-action-desc">{action.desc}</span>
              <span className="quick-action-cta">{action.cta} →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
