'use client';

import Link from 'next/link';
import { Locale } from '@/types';

interface ActionChainProps {
  locale: Locale;
}

export default function ActionChain({ locale }: ActionChainProps) {
  const hi = locale === 'hi';

  const steps = [
    {
      number: '01',
      title: hi ? 'कुछ गलत है' : 'Something is wrong',
      desc: hi
        ? 'परीक्षा लीक। पुलिस बर्बरता। अवैध तोड़फोड़। भ्रष्टाचार।'
        : 'Exam leaked. Police brutality. Illegal demolition. Corruption.',
      action: hi ? 'क्या हो रहा है देखें' : 'See what\'s happening',
      link: '/map',
      color: 'chain-step-red',
    },
    {
      number: '02',
      title: hi ? 'अपने अधिकार जानें' : 'Know your rights',
      desc: hi
        ? 'गिरफ्तारी? फोन ज़ब्त? आँसू गैस? — आपके पास ये अधिकार हैं।'
        : 'Arrested? Phone seized? Tear gas? — You have these rights.',
      action: hi ? 'अधिकार कार्ड →' : 'Rights Card →',
      link: '/safety',
      color: 'chain-step-yellow',
    },
    {
      number: '03',
      title: hi ? 'कानूनी हथियार चलाएँ' : 'Use legal weapons',
      desc: hi
        ? 'RTI: ₹10, 30 दिन, जवाब देना अनिवार्य। FIR: पुलिस मना नहीं कर सकती। माँग: लक्ष्य + समयसीमा = जवाबदेही।'
        : 'RTI: ₹10, 30 days, response mandatory. FIR: Police cannot refuse. Demand: Target + deadline = accountability.',
      action: hi ? 'RTI / FIR / माँग दर्ज →' : 'File RTI / FIR / Demand →',
      link: '/act',
      color: 'chain-step-accent',
    },
    {
      number: '04',
      title: hi ? 'एस्केलेट करें' : 'Escalate',
      desc: hi
        ? '30 दिन → प्रथम अपील → CIC (₹250/दिन जुर्माना) → PIL → सुप्रीम कोर्ट।'
        : '30 days → First Appeal → CIC (₹250/day penalty) → PIL → Supreme Court.',
      action: hi ? 'एस्केलेशन सीढ़ी →' : 'Escalation Ladder →',
      link: '/playbook',
      color: 'chain-step-purple',
    },
    {
      number: '05',
      title: hi ? 'संगठित हों' : 'Organize',
      desc: hi
        ? '10 ग्रुप एक साथ RTI = अनदेखा करना असंभव। गठबंधन = ताकत।'
        : '10 groups filing RTI together = impossible to ignore. Coalition = power.',
      action: hi ? 'ग्रुप खोजें / बनाएँ →' : 'Find / Create Groups →',
      link: '/groups',
      color: 'chain-step-lime',
    },
    {
      number: '06',
      title: hi ? 'जीतें या लड़ते रहें' : 'Win or keep fighting',
      desc: hi
        ? 'स्कोरकार्ड: किसने जवाब दिया, किसने नहीं। चुनाव: उम्मीदवार रिकॉर्ड। यह कभी नहीं रुकता।'
        : 'Scorecard: who responded, who didn\'t. Elections: candidate records. This never stops.',
      action: hi ? 'शासन ट्रैकर →' : 'Governance Tracker →',
      link: '/governance',
      color: 'chain-step-dark',
    },
  ];

  return (
    <section className="action-chain-section" aria-labelledby="chain-title">
      <div className="page-shell">
        <div className="chain-header">
          <h2 id="chain-title" className="section-title">
            {hi ? 'विरोध → शक्ति → बदलाव' : 'Protest → Power → Change'}
          </h2>
          <p className="chain-subtitle">
            {hi
              ? 'Pothole हर कदम पर आपके साथ है। अकेला गुस्सा → संगठित दबाव → संस्थागत जवाबदेही।'
              : 'Pothole is with you at every step. Lone anger → organized pressure → institutional accountability.'}
          </p>
        </div>

        <div className="chain-steps">
          {steps.map((step, i) => (
            <div key={step.number} className={`chain-step ${step.color}`}>
              <div className="chain-step-number">{step.number}</div>
              <div className="chain-step-content">
                <h3 className="chain-step-title">{step.title}</h3>
                <p className="chain-step-desc">{step.desc}</p>
                <Link href={step.link} className="chain-step-link">
                  {step.action}
                </Link>
              </div>
              {i < steps.length - 1 && <div className="chain-connector" aria-hidden="true" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
