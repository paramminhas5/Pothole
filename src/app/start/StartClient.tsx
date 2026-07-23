'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Locale } from '@/types';

type Situation = 'student' | 'worker' | 'resident' | 'organizer' | 'supporter';
type Issue = 'exam' | 'police' | 'demolition' | 'job' | 'corruption' | 'environment' | 'rights' | 'other';
type Readiness = 'angry' | 'going' | 'remote' | 'legal' | 'organize';

interface ActionStep {
  title: string;
  titleHi: string;
  desc: string;
  descHi: string;
  link: string;
  time: string;
}

export default function StartClient({ locale }: { locale: Locale }) {
  const hi = locale === 'hi';
  const [step, setStep] = useState(1);
  const [situation, setSituation] = useState<Situation | ''>('');
  const [issue, setIssue] = useState<Issue | ''>('');
  const [readiness, setReadiness] = useState<Readiness | ''>('');
  const [city, setCity] = useState('');

  function getActions(): ActionStep[] {
    const actions: ActionStep[] = [];

    // Everyone gets rights card
    actions.push({
      title: 'Save the Rights Card', titleHi: 'अधिकार कार्ड सेव करें',
      desc: 'If you\'re ever stopped, arrested, or detained — these 5 phrases protect you.', descHi: 'अगर कभी रोके गए, गिरफ्तार हों — ये 5 वाक्य आपकी सुरक्षा करेंगे।',
      link: '/safety', time: '30 sec',
    });

    // Based on readiness
    if (readiness === 'going') {
      actions.push({
        title: 'Protest Preparation Guide', titleHi: 'विरोध की तैयारी',
        desc: 'What to bring, buddy system, what police do, if arrested — everything for tomorrow.', descHi: 'क्या लाएँ, बडी सिस्टम, पुलिस क्या करती है, गिरफ्तार हों तो — कल के लिए सब कुछ।',
        link: '/expect', time: '5 min',
      });
      actions.push({
        title: 'Activate Protest Mode', titleHi: 'प्रोटेस्ट मोड चालू करें',
        desc: 'Minimal interface: emergency numbers, SOS button, buddy check-in timer.', descHi: 'न्यूनतम इंटरफेस: आपातकालीन नंबर, SOS बटन, बडी चेक-इन टाइमर।',
        link: '/protest-mode', time: '1 min',
      });
    }

    if (readiness === 'legal' || readiness === 'angry') {
      // Based on issue
      if (issue === 'exam') {
        actions.push({
          title: 'File RTI on NTA/Exam Body', titleHi: 'NTA/परीक्षा निकाय पर RTI दाखिल करें',
          desc: '₹10. They MUST answer in 30 days or face ₹250/day penalty. Ask: "What measures were taken to prevent leaks?"', descHi: '₹10। 30 दिन में जवाब देना अनिवार्य, नहीं तो ₹250/दिन जुर्माना। पूछें: "लीक रोकने के लिए क्या किया?"',
          link: '/rti', time: '5 min',
        });
      } else if (issue === 'police') {
        actions.push({
          title: 'File FIR for Police Excess', titleHi: 'पुलिस ज़्यादती के लिए FIR दर्ज करें',
          desc: 'Auto-generates: complaint + SP letter + Magistrate complaint. Police cannot legally refuse.', descHi: 'ऑटो-जनरेट: शिकायत + SP पत्र + मजिस्ट्रेट शिकायत। पुलिस कानूनी रूप से मना नहीं कर सकती।',
          link: '/fir', time: '5 min',
        });
        actions.push({
          title: 'File NHRC Complaint', titleHi: 'NHRC शिकायत दर्ज करें',
          desc: 'National Human Rights Commission — for police brutality, custodial abuse, excessive force.', descHi: 'राष्ट्रीय मानवाधिकार आयोग — पुलिस बर्बरता, हिरासत दुर्व्यवहार, अत्यधिक बल के लिए।',
          link: 'https://nhrc.nic.in', time: '10 min',
        });
      } else if (issue === 'demolition') {
        actions.push({
          title: 'File RTI on Demolition Order', titleHi: 'तोड़फोड़ आदेश पर RTI दाखिल करें',
          desc: 'Ask: "Provide copy of notice served. Provide rehabilitation plan. Provide authority of order."', descHi: 'पूछें: "सर्व की गई नोटिस की कॉपी दें। पुनर्वास योजना दें। आदेश का प्राधिकार दें।"',
          link: '/rti', time: '5 min',
        });
      } else {
        actions.push({
          title: 'File an RTI', titleHi: 'RTI दाखिल करें',
          desc: 'Force the government to answer your specific question. ₹10. 30 days. Penalty if ignored.', descHi: 'सरकार को अपने विशिष्ट प्रश्न का जवाब देने पर मजबूर करें। ₹10। 30 दिन। अनदेखा करने पर जुर्माना।',
          link: '/rti', time: '5 min',
        });
      }

      actions.push({
        title: 'File a Public Demand', titleHi: 'सार्वजनिक माँग दर्ज करें',
        desc: 'WHO must do WHAT by WHEN. Tracked publicly. Escalates automatically if ignored.', descHi: 'किसे क्या करना है कब तक। सार्वजनिक ट्रैक। अनदेखा करने पर ऑटो-एस्केलेट।',
        link: '/demands', time: '3 min',
      });
    }

    if (readiness === 'remote') {
      actions.push({
        title: 'Contribute Your Skills', titleHi: 'अपने कौशल से योगदान दें',
        desc: 'Translation, design, research, legal, coding — remote tasks you can do from your phone.', descHi: 'अनुवाद, डिज़ाइन, शोध, कानूनी, कोडिंग — फोन से करने योग्य रिमोट कार्य।',
        link: '/contribute', time: '2 min',
      });
      actions.push({
        title: 'Share on WhatsApp', titleHi: 'WhatsApp पर शेयर करें',
        desc: 'Send the rights card to your contacts. One share = one person more prepared.', descHi: 'अपने संपर्कों को अधिकार कार्ड भेजें। एक शेयर = एक व्यक्ति ज़्यादा तैयार।',
        link: `https://wa.me/?text=${encodeURIComponent('Know your rights if arrested: https://sahayata.vercel.app/safety')}`, time: '30 sec',
      });
    }

    if (readiness === 'organize') {
      actions.push({
        title: 'Find or Create a Group', titleHi: 'ग्रुप खोजें या बनाएँ',
        desc: 'Connect with people fighting the same fight in your city. Stronger together.', descHi: 'अपने शहर में समान लड़ाई लड़ रहे लोगों से जुड़ें। साथ में मजबूत।',
        link: '/groups', time: '3 min',
      });
      actions.push({
        title: 'Read the Organizing Guide', titleHi: 'संगठन गाइड पढ़ें',
        desc: 'How to form a group, assign roles, communicate safely, sustain pressure.', descHi: 'ग्रुप कैसे बनाएँ, भूमिकाएँ बाँटें, सुरक्षित संवाद करें, दबाव बनाए रखें।',
        link: '/organize', time: '10 min',
      });
      actions.push({
        title: 'Plan a Coordinated RTI Day', titleHi: 'समन्वित RTI दिवस की योजना बनाएँ',
        desc: '10 groups filing RTI on same topic same day = impossible to ignore.', descHi: '10 ग्रुप एक दिन एक विषय पर RTI = अनदेखा करना असंभव।',
        link: '/playbook', time: '5 min',
      });
    }

    // Everyone gets governance tracker
    actions.push({
      title: 'Check Who\'s Accountable', titleHi: 'कौन जवाबदेह है देखें',
      desc: 'Scorecard: which institutions responded, which ignored. Public pressure works.', descHi: 'स्कोरकार्ड: किस संस्था ने जवाब दिया, किसने अनदेखा किया। सार्वजनिक दबाव काम करता है।',
      link: '/governance', time: '2 min',
    });

    return actions;
  }

  if (step === 4) {
    const actions = getActions();
    return (
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-12">
        <div className="mb-8">
          <h1 className="heading-display mb-2">{hi ? 'आपकी कार्य योजना' : 'Your Action Plan'}</h1>
          <p className="text-[var(--color-text-muted)]">{hi ? `${actions.length} कदम — आपकी स्थिति के लिए तैयार। ऊपर से शुरू करें।` : `${actions.length} steps — tailored to your situation. Start from the top.`}</p>
        </div>
        <div className="space-y-4">
          {actions.map((action, i) => (
            <Link key={i} href={action.link} className="brutal-card block !p-5 hover:border-[var(--color-accent)]" style={{ textDecoration: 'none' }} target={action.link.startsWith('http') ? '_blank' : undefined} rel={action.link.startsWith('http') ? 'noopener noreferrer' : undefined}>
              <div className="flex justify-between items-start gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-black bg-[var(--color-text)] text-[var(--color-bg)] rounded-full w-6 h-6 flex items-center justify-center">{i + 1}</span>
                    <h2 className="font-bold text-base">{hi ? action.titleHi : action.title}</h2>
                  </div>
                  <p className="text-sm text-[var(--color-text-muted)]">{hi ? action.descHi : action.desc}</p>
                </div>
                <span className="text-xs whitespace-nowrap font-bold text-[var(--color-accent)]">{action.time}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <button type="button" onClick={() => { setStep(1); setSituation(''); setIssue(''); setReadiness(''); }} className="text-link text-sm">{hi ? '← फिर से शुरू करें' : '← Start over'}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-8">
        <h1 className="heading-display mb-2">{hi ? 'आपके लिए क्या सही है?' : 'What\'s right for you?'}</h1>
        <p className="text-[var(--color-text-muted)]">{hi ? '3 सवाल → आपकी स्थिति के लिए कस्टम एक्शन प्लान। 30 सेकंड।' : '3 questions → custom action plan for your situation. 30 seconds.'}</p>
      </div>

      {/* Step indicator */}
      <div className="flex gap-2 mb-8">
        {[1, 2, 3].map(s => (
          <div key={s} className={`h-2 flex-1 rounded ${s <= step ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-border-light)]'}`} />
        ))}
      </div>

      {step === 1 && (
        <div>
          <h2 className="heading-2 mb-4">{hi ? 'आप कौन हैं?' : 'Who are you?'}</h2>
          <div className="space-y-3">
            {([
              ['student', hi ? '🎓 छात्र / परीक्षार्थी' : '🎓 Student / Exam candidate', hi ? 'NEET, UGC-NET, UPSC, SSC — किसी भी परीक्षा' : 'NEET, UGC-NET, UPSC, SSC — any exam'],
              ['worker', hi ? '👷 कर्मचारी / गिग वर्कर' : '👷 Worker / Gig worker', hi ? 'श्रम अधिकार, वेतन, सुरक्षा' : 'Labor rights, wages, safety'],
              ['resident', hi ? '🏠 निवासी / नागरिक' : '🏠 Resident / Citizen', hi ? 'सड़क, पानी, बिजली, तोड़फोड़, प्रदूषण' : 'Roads, water, electricity, demolition, pollution'],
              ['organizer', hi ? '✊ संगठक / कार्यकर्ता' : '✊ Organizer / Activist', hi ? 'पहले से सक्रिय, बेहतर करना चाहते हैं' : 'Already active, want to do it better'],
              ['supporter', hi ? '🤝 समर्थक / दूर से मदद' : '🤝 Supporter / Remote help', hi ? 'दूर से मदद करना चाहते हैं' : 'Want to help from afar'],
            ] as [Situation, string, string][]).map(([value, label, desc]) => (
              <button key={value} type="button" onClick={() => { setSituation(value); setStep(2); }} className={`brutal-card w-full text-left !p-4 hover:border-[var(--color-accent)] ${situation === value ? '!border-[var(--color-accent)]' : ''}`}>
                <strong className="text-base">{label}</strong>
                <p className="text-sm text-[var(--color-text-muted)] mt-1">{desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="heading-2 mb-4">{hi ? 'क्या हो रहा है?' : 'What\'s the issue?'}</h2>
          <div className="space-y-3">
            {([
              ['exam', hi ? '📝 परीक्षा घोटाला / पेपर लीक / अनियमितता' : '📝 Exam scam / paper leak / irregularity'],
              ['police', hi ? '🚔 पुलिस ज़्यादती / गिरफ्तारी / लाठी / आँसू गैस' : '🚔 Police excess / arrest / lathi / tear gas'],
              ['demolition', hi ? '🏗️ अवैध तोड़फोड़ / बेदखली / आवास' : '🏗️ Illegal demolition / eviction / housing'],
              ['job', hi ? '💼 बेरोज़गारी / नौकरी घोटाला / वेतन चोरी' : '💼 Unemployment / job scam / wage theft'],
              ['corruption', hi ? '💰 भ्रष्टाचार / रिश्वत / गबन' : '💰 Corruption / bribery / embezzlement'],
              ['environment', hi ? '🌿 प्रदूषण / जलवायु / पर्यावरण उल्लंघन' : '🌿 Pollution / climate / environmental violation'],
              ['rights', hi ? '⚖️ मौलिक अधिकार उल्लंघन / सेंसरशिप / शटडाउन' : '⚖️ Fundamental rights violation / censorship / shutdown'],
              ['other', hi ? '📋 कुछ और' : '📋 Something else'],
            ] as [Issue, string][]).map(([value, label]) => (
              <button key={value} type="button" onClick={() => { setIssue(value); setStep(3); }} className={`brutal-card w-full text-left !p-4 hover:border-[var(--color-accent)] ${issue === value ? '!border-[var(--color-accent)]' : ''}`}>
                <strong className="text-sm">{label}</strong>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="heading-2 mb-4">{hi ? 'आप अभी क्या करना चाहते हैं?' : 'What do you want to do right now?'}</h2>
          <div className="space-y-3">
            {([
              ['angry', hi ? '😤 गुस्सा हूँ — कानूनी कार्रवाई करना चाहता/चाहती हूँ' : '😤 I\'m angry — want to take legal action', hi ? 'RTI, FIR, माँग, PIL — सब' : 'RTI, FIR, demand, PIL — everything'],
              ['going', hi ? '🏃 विरोध में जा रहा/रही हूँ — तैयारी चाहिए' : '🏃 Going to a protest — need preparation', hi ? 'सुरक्षा, अधिकार, बडी, क्या लाएँ' : 'Safety, rights, buddy, what to bring'],
              ['remote', hi ? '🏠 दूर से मदद करना चाहता/चाहती हूँ' : '🏠 Want to help remotely', hi ? 'अनुवाद, डिज़ाइन, शोध, शेयर' : 'Translation, design, research, share'],
              ['legal', hi ? '⚖️ कानूनी दबाव बनाना चाहता/चाहती हूँ' : '⚖️ Want to apply legal pressure', hi ? 'RTI, FIR, प्रतिनिधि, PIL' : 'RTI, FIR, representative, PIL'],
              ['organize', hi ? '✊ लोगों को संगठित करना चाहता/चाहती हूँ' : '✊ Want to organize people', hi ? 'ग्रुप, गठबंधन, समन्वित कार्रवाई' : 'Group, coalition, coordinated action'],
            ] as [Readiness, string, string][]).map(([value, label, desc]) => (
              <button key={value} type="button" onClick={() => { setReadiness(value); setStep(4); }} className={`brutal-card w-full text-left !p-4 hover:border-[var(--color-accent)]`}>
                <strong className="text-sm">{label}</strong>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">{desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6">
        {step > 1 && (
          <button type="button" onClick={() => setStep(step - 1)} className="text-link text-sm">{hi ? '← पीछे' : '← Back'}</button>
        )}
      </div>
    </div>
  );
}
