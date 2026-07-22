'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Locale } from '@/types';

interface Props { locale: Locale }
type Step = 'what' | 'when' | 'where' | 'who' | 'evidence' | 'result';

export default function FIRAssistantClient({ locale }: Props) {
  const hi = locale === 'hi';
  const [step, setStep] = useState<Step>('what');
  const [what, setWhat] = useState('');
  const [when, setWhen] = useState('');
  const [whenTime, setWhenTime] = useState('');
  const [where, setWhere] = useState('');
  const [who, setWho] = useState('');
  const [evidence, setEvidence] = useState('');
  const [witnesses, setWitnesses] = useState('');

  function generateComplaint(): string {
    return `To,
The Station House Officer,
[POLICE STATION NAME],
[ADDRESS]

Subject: Written complaint for registration of FIR

Sir/Madam,

I wish to report the following cognizable offence:

Date of incident: ${when || '[DATE]'}
Time: ${whenTime || '[TIME]'}
Place: ${where || '[LOCATION]'}

Details of incident:
${what || '[DESCRIPTION]'}

Accused (if known):
${who || '[UNKNOWN]'}

Witnesses:
${witnesses || '[NONE IDENTIFIED]'}

Evidence available:
${evidence || '[NONE LISTED]'}

I request you to register an FIR under appropriate sections and investigate the matter. Please provide me with a copy of the FIR as per my legal right.

Yours faithfully,
[YOUR NAME]
[YOUR ADDRESS]
[YOUR PHONE - optional]
Date: ${new Date().toLocaleDateString('en-IN')}

---
YOUR RIGHTS:
• Police MUST register FIR for cognizable offences (BNSS Section 173)
• You have the right to a copy of the FIR
• If refused: written complaint to SP → then Magistrate (Section 175(3) BNSS)
• Zero FIR: can file at ANY police station (will be transferred)
`;
  }

  function generateSPLetter(): string {
    return `To,
The Superintendent of Police,
[DISTRICT], [STATE]

Subject: Failure to register FIR at [POLICE STATION NAME]

Sir/Madam,

I visited [POLICE STATION] on ${when || '[DATE]'} to file an FIR regarding the following matter:

${what ? what.slice(0, 200) : '[BRIEF DESCRIPTION]'}

The SHO/duty officer refused to register my complaint despite it being a cognizable offence.

This is a violation of BNSS Section 173 which mandates registration of cognizable offences.

I request you to:
1. Direct the SHO to register my FIR immediately
2. Take departmental action against the officer who refused

If no action is taken within 7 days, I will approach the Judicial Magistrate under Section 175(3) of BNSS for directions to register the FIR.

Yours faithfully,
[YOUR NAME]
[ADDRESS]
[PHONE]
Date: ${new Date().toLocaleDateString('en-IN')}

Encl: Copy of original written complaint to police station
`;
  }

  if (step === 'result') {
    const complaint = generateComplaint();
    const spLetter = generateSPLetter();
    return (
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
        <h1 className="heading-2 mb-2">{hi ? 'आपकी शिकायत तैयार है' : 'Your Complaint is Ready'}</h1>
        <p className="text-sm text-[var(--color-text-muted)] mb-6">{hi ? 'कॉपी करें, प्रिंट करें, और पुलिस स्टेशन ले जाएँ।' : 'Copy, print, and take to the police station.'}</p>

        <div className="brutal-card mb-6">
          <h2 className="heading-3 mb-2">{hi ? 'FIR शिकायत' : 'FIR Complaint'}</h2>
          <pre className="p-3 bg-[var(--color-surface-alt)] rounded text-xs whitespace-pre-wrap overflow-x-auto">{complaint}</pre>
          <button type="button" onClick={() => navigator.clipboard.writeText(complaint)} className="brutal-btn brutal-btn-primary mt-3">{hi ? 'कॉपी करें' : 'Copy'}</button>
        </div>

        <div className="brutal-card mb-6 !border-[var(--color-red)]">
          <h2 className="heading-3 mb-2">{hi ? 'अगर पुलिस मना करे → SP को पत्र' : 'If Police Refuse → Letter to SP'}</h2>
          <pre className="p-3 bg-[var(--color-surface-alt)] rounded text-xs whitespace-pre-wrap overflow-x-auto">{spLetter}</pre>
          <button type="button" onClick={() => navigator.clipboard.writeText(spLetter)} className="brutal-btn mt-3">{hi ? 'कॉपी करें' : 'Copy'}</button>
        </div>

        <div className="brutal-card">
          <h3 className="heading-3 mb-2">{hi ? 'एस्केलेशन पथ' : 'Escalation Path'}</h3>
          <ol className="text-sm space-y-2 list-decimal list-inside">
            <li><strong>{hi ? 'पुलिस स्टेशन:' : 'Police station:'}</strong> {hi ? 'ऊपर की शिकायत जमा करें। रसीद लें।' : 'Submit complaint above. Get receipt.'}</li>
            <li><strong>{hi ? 'SP को पत्र:' : 'Letter to SP:'}</strong> {hi ? 'अगर 7 दिन में FIR दर्ज नहीं हुई।' : 'If FIR not registered in 7 days.'}</li>
            <li><strong>{hi ? 'मजिस्ट्रेट शिकायत:' : 'Magistrate complaint:'}</strong> {hi ? 'धारा 175(3) BNSS — मजिस्ट्रेट FIR दर्ज करने का निर्देश दे सकते हैं।' : 'Section 175(3) BNSS — Magistrate can direct FIR registration.'}</li>
          </ol>
        </div>

        <div className="flex gap-3 mt-6">
          <button type="button" onClick={() => setStep('what')} className="brutal-btn">{hi ? '← संपादित करें' : '← Edit'}</button>
          <Link href="/toolkit" className="brutal-btn">{hi ? 'और टेम्पलेट' : 'More Templates'}</Link>
        </div>
      </div>
    );
  }

  const steps: { key: Step; label: string }[] = [
    { key: 'what', label: hi ? 'क्या हुआ' : 'What happened' },
    { key: 'when', label: hi ? 'कब' : 'When' },
    { key: 'where', label: hi ? 'कहाँ' : 'Where' },
    { key: 'who', label: hi ? 'किसने' : 'Who' },
    { key: 'evidence', label: hi ? 'सबूत' : 'Evidence' },
  ];
  const currentIndex = steps.findIndex(s => s.key === step);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-10">
        <h1 className="heading-display mb-3">{hi ? 'FIR असिस्टेंट' : 'FIR Assistant'}</h1>
        <p className="text-[var(--color-text-muted)] text-lg">{hi ? 'स्टेप-बाय-स्टेप: शिकायत तैयार करें। सब कुछ ब्राउज़र में — सर्वर को कुछ नहीं भेजा।' : 'Step by step: prepare your complaint. Everything in browser — nothing sent to server.'}</p>
        <div className="brutal-banner mt-4 text-xs">🔒 {hi ? 'क्लाइंट-साइड: कुछ भी स्टोर या भेजा नहीं जाता।' : 'Client-side only: nothing stored or sent.'}</div>
      </div>

      {/* Progress */}
      <div className="flex gap-1 mb-8">{steps.map((s, i) => (
        <div key={s.key} className={`flex-1 h-2 rounded ${i <= currentIndex ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-border)]'}`} />
      ))}</div>

      {step === 'what' && (
        <div className="brutal-card">
          <h2 className="heading-2 mb-4">{hi ? 'क्या हुआ?' : 'What Happened?'}</h2>
          <p className="field-help mb-3">{hi ? 'तथ्यात्मक, कालानुक्रमिक विवरण। भावनाएँ नहीं, तथ्य।' : 'Factual, chronological description. Facts, not feelings.'}</p>
          <textarea value={what} onChange={(e) => setWhat(e.target.value)} className="brutal-textarea" rows={6} placeholder={hi ? 'विस्तार से बताएँ: क्या हुआ, क्रम में...' : 'Describe in detail: what happened, in order...'} required />
          <button type="button" onClick={() => setStep('when')} disabled={!what.trim()} className="brutal-btn brutal-btn-primary mt-4">{hi ? 'अगला →' : 'Next →'}</button>
        </div>
      )}
      {step === 'when' && (
        <div className="brutal-card">
          <h2 className="heading-2 mb-4">{hi ? 'कब हुआ?' : 'When Did It Happen?'}</h2>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <label><span className="field-label">{hi ? 'तारीख' : 'Date'}</span><input type="date" value={when} onChange={(e) => setWhen(e.target.value)} className="brutal-input" required /></label>
            <label><span className="field-label">{hi ? 'अनुमानित समय' : 'Approximate time'}</span><input type="text" value={whenTime} onChange={(e) => setWhenTime(e.target.value)} className="brutal-input" placeholder={hi ? 'जैसे: शाम 6 बजे के करीब' : 'e.g. Around 6 PM'} /></label>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => setStep('what')} className="brutal-btn">{hi ? '← पीछे' : '← Back'}</button>
            <button type="button" onClick={() => setStep('where')} disabled={!when} className="brutal-btn brutal-btn-primary">{hi ? 'अगला →' : 'Next →'}</button>
          </div>
        </div>
      )}
      {step === 'where' && (
        <div className="brutal-card">
          <h2 className="heading-2 mb-4">{hi ? 'कहाँ हुआ?' : 'Where Did It Happen?'}</h2>
          <textarea value={where} onChange={(e) => setWhere(e.target.value)} className="brutal-textarea" rows={3} placeholder={hi ? 'जगह का विवरण (सड़क, इलाका, लैंडमार्क)' : 'Location details (road, area, landmarks)'} required />
          <div className="flex gap-3 mt-4">
            <button type="button" onClick={() => setStep('when')} className="brutal-btn">{hi ? '← पीछे' : '← Back'}</button>
            <button type="button" onClick={() => setStep('who')} disabled={!where.trim()} className="brutal-btn brutal-btn-primary">{hi ? 'अगला →' : 'Next →'}</button>
          </div>
        </div>
      )}
      {step === 'who' && (
        <div className="brutal-card">
          <h2 className="heading-2 mb-4">{hi ? 'किसने किया? (अगर पता हो)' : 'Who Did It? (if known)'}</h2>
          <p className="field-help mb-3">{hi ? 'नाम, विवरण, बैज नंबर (पुलिस हो तो)। "अज्ञात" भी ठीक है।' : 'Name, description, badge number (if police). "Unknown" is also fine.'}</p>
          <textarea value={who} onChange={(e) => setWho(e.target.value)} className="brutal-textarea" rows={3} placeholder={hi ? 'आरोपी का विवरण या "अज्ञात"' : 'Accused description or "Unknown"'} />
          <label className="block mt-3"><span className="field-label">{hi ? 'गवाह (वैकल्पिक, सहमति से)' : 'Witnesses (optional, with consent)'}</span>
            <textarea value={witnesses} onChange={(e) => setWitnesses(e.target.value)} className="brutal-textarea" rows={2} placeholder={hi ? 'गवाह का नाम और संपर्क (उनकी सहमति से)' : 'Witness name and contact (with their consent)'} />
          </label>
          <div className="flex gap-3 mt-4">
            <button type="button" onClick={() => setStep('where')} className="brutal-btn">{hi ? '← पीछे' : '← Back'}</button>
            <button type="button" onClick={() => setStep('evidence')} className="brutal-btn brutal-btn-primary">{hi ? 'अगला →' : 'Next →'}</button>
          </div>
        </div>
      )}
      {step === 'evidence' && (
        <div className="brutal-card">
          <h2 className="heading-2 mb-4">{hi ? 'सबूत' : 'Evidence'}</h2>
          <p className="field-help mb-3">{hi ? 'फोटो, वीडियो, दस्तावेज़ — जो भी उपलब्ध है।' : 'Photos, videos, documents — whatever is available.'}</p>
          <textarea value={evidence} onChange={(e) => setEvidence(e.target.value)} className="brutal-textarea" rows={3} placeholder={hi ? 'उपलब्ध सबूतों की सूची' : 'List available evidence'} />
          <div className="flex gap-3 mt-4">
            <button type="button" onClick={() => setStep('who')} className="brutal-btn">{hi ? '← पीछे' : '← Back'}</button>
            <button type="button" onClick={() => setStep('result')} className="brutal-btn brutal-btn-primary">{hi ? 'शिकायत तैयार करें ✓' : 'Generate Complaint ✓'}</button>
          </div>
        </div>
      )}
    </div>
  );
}
