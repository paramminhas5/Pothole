'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Locale } from '@/types';

interface Props { locale: Locale }
type Step = 'what' | 'details' | 'result';

export default function FIRAssistantClient({ locale }: Props) {
  const hi = locale === 'hi';
  const [step, setStep] = useState<Step>('what');
  const [what, setWhat] = useState('');
  const [when, setWhen] = useState('');
  const [where, setWhere] = useState('');
  const [who, setWho] = useState('');
  const [evidence, setEvidence] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const today = new Date().toLocaleDateString('en-IN');

  const complaint = `To,
The Station House Officer,
[POLICE STATION NAME — find nearest on Google Maps],
[ADDRESS]

Subject: Written complaint for registration of FIR

Sir/Madam,

I wish to report the following cognizable offence:

Date: ${when || '[DATE]'}
Place: ${where || '[LOCATION]'}

Details of incident:
${what || '[DESCRIPTION]'}

Accused (if known):
${who || 'Not identified'}

Evidence available:
${evidence || 'None listed'}

I request you to:
1. Register an FIR under appropriate sections
2. Investigate the matter
3. Provide me a copy of the FIR (my legal right)

Yours faithfully,
[YOUR NAME]
[YOUR ADDRESS]
Date: ${today}`;

  const spLetter = `To,
The Superintendent of Police,
[DISTRICT], [STATE]

Subject: Failure to register FIR — violation of BNSS Section 173

Sir/Madam,

I visited [POLICE STATION] on ${when || '[DATE]'} to report:
${what ? what.slice(0, 150) + '...' : '[BRIEF DESCRIPTION]'}

The SHO/duty officer REFUSED to register my complaint despite it being a cognizable offence.

This violates BNSS Section 173 (mandatory FIR for cognizable offences).

I request you to:
1. Direct the SHO to register my FIR immediately
2. Take departmental action against the refusing officer

If no action within 7 days, I will approach the Judicial Magistrate under Section 175(3) BNSS.

Yours faithfully,
[YOUR NAME]
[ADDRESS]
Date: ${today}

Encl: Copy of original written complaint (submitted to police station)`;

  const magistrate = `IN THE COURT OF JUDICIAL MAGISTRATE
[DISTRICT], [STATE]

Application under Section 175(3) of BNSS / Section 156(3) of CrPC

Applicant: [YOUR NAME]
Address: [YOUR ADDRESS]

Sir/Madam,

1. On ${when || '[DATE]'}, a cognizable offence occurred:
   ${what ? what.slice(0, 200) : '[BRIEF DESCRIPTION]'}

2. I submitted a written complaint to [POLICE STATION] on [DATE]. (Copy enclosed)

3. The police REFUSED to register an FIR.

4. I then wrote to the SP on [DATE]. (Copy enclosed)

5. No action was taken.

PRAYER:
I humbly pray that this Hon'ble Court may direct the police to register an FIR and investigate the matter.

[YOUR NAME]
Date: ${today}

Encl:
1. Copy of complaint to police station
2. Copy of letter to SP
3. Evidence (photos/documents if any)

---
NOTE: File this at the District Court. No court fee required.
Magistrate can DIRECT police to register FIR.`;

  function copy(text: string, label: string) {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  }

  // ─── RESULT ───
  if (step === 'result') {
    return (
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
        <h1 className="heading-2 mb-2">{hi ? '✅ 3 दस्तावेज़ तैयार' : '✅ 3 Documents Ready'}</h1>
        <p className="text-sm text-[var(--color-text-muted)] mb-6">{hi ? 'पहला प्रयोग करें। मना हो → दूसरा। फिर भी → तीसरा।' : 'Use first one. If refused → second. Still nothing → third.'}</p>

        {/* DOC 1: FIR */}
        <details className="brutal-card mb-4" open>
          <summary className="heading-3 cursor-pointer">{hi ? '1️⃣ FIR शिकायत (पुलिस स्टेशन)' : '1️⃣ FIR Complaint (Police Station)'}</summary>
          <div className="mt-4">
            <pre className="p-3 bg-[var(--color-surface-alt)] rounded text-xs whitespace-pre-wrap overflow-x-auto border leading-relaxed">{complaint}</pre>
            <div className="flex flex-wrap gap-2 mt-3">
              <button type="button" onClick={() => copy(complaint, 'fir')} className="brutal-btn brutal-btn-primary text-sm">{copied === 'fir' ? '✓' : '📋'} {hi ? 'कॉपी' : 'Copy'}</button>
              <a href="https://www.google.com/maps/search/police+station+near+me" target="_blank" rel="noopener noreferrer" className="brutal-btn text-sm">{hi ? '📍 नजदीकी थाना' : '📍 Nearest Station'}</a>
            </div>
          </div>
        </details>

        {/* DOC 2: SP */}
        <details className="brutal-card mb-4">
          <summary className="heading-3 cursor-pointer">{hi ? '2️⃣ SP को पत्र (मना करने पर)' : '2️⃣ Letter to SP (If Refused)'}</summary>
          <div className="mt-4">
            <pre className="p-3 bg-[var(--color-surface-alt)] rounded text-xs whitespace-pre-wrap overflow-x-auto border leading-relaxed">{spLetter}</pre>
            <button type="button" onClick={() => copy(spLetter, 'sp')} className="brutal-btn brutal-btn-primary text-sm mt-3">{copied === 'sp' ? '✓' : '📋'} {hi ? 'कॉपी' : 'Copy'}</button>
          </div>
        </details>

        {/* DOC 3: MAGISTRATE */}
        <details className="brutal-card mb-4">
          <summary className="heading-3 cursor-pointer">{hi ? '3️⃣ मजिस्ट्रेट शिकायत (अंतिम उपाय)' : '3️⃣ Magistrate Complaint (Nuclear Option)'}</summary>
          <div className="mt-4">
            <pre className="p-3 bg-[var(--color-surface-alt)] rounded text-xs whitespace-pre-wrap overflow-x-auto border leading-relaxed">{magistrate}</pre>
            <button type="button" onClick={() => copy(magistrate, 'mag')} className="brutal-btn brutal-btn-primary text-sm mt-3">{copied === 'mag' ? '✓' : '📋'} {hi ? 'कॉपी' : 'Copy'}</button>
          </div>
        </details>

        <div className="flex gap-3 mt-6">
          <button type="button" onClick={() => setStep('what')} className="brutal-btn">{hi ? '← संपादित' : '← Edit'}</button>
          <Link href="/playbook" className="brutal-btn">{hi ? 'प्लेबुक' : 'Playbook'}</Link>
          <Link href="/safety" className="brutal-btn">{hi ? 'अधिकार' : 'Rights'}</Link>
        </div>
      </div>
    );
  }

  // ─── FORM ───
  const progress = step === 'what' ? 1 : 2;
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-8">
        <h1 className="heading-display mb-2">{hi ? 'FIR असिस्टेंट' : 'FIR Assistant'}</h1>
        <p className="text-[var(--color-text-muted)]">{hi ? 'पुलिस मदद नहीं करेगी? यह शिकायत बनाता है जो वे मना नहीं कर सकते।' : "Police won't help? This generates a complaint they legally cannot refuse."}</p>
        <div className="brutal-banner mt-4 text-xs">🔒 {hi ? 'सब ब्राउज़र में। कुछ भी सर्वर पर नहीं जाता।' : 'All in browser. Nothing goes to server.'}</div>
      </div>

      {/* Progress */}
      <div className="flex gap-1 mb-8">
        <div className={`flex-1 h-2 rounded ${progress >= 1 ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-border)]'}`} />
        <div className={`flex-1 h-2 rounded ${progress >= 2 ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-border)]'}`} />
      </div>

      {step === 'what' && (
        <div className="brutal-card">
          <h2 className="heading-2 mb-4">{hi ? 'क्या हुआ?' : 'What Happened?'}</h2>
          <p className="text-sm text-[var(--color-text-muted)] mb-3">{hi ? 'तथ्य लिखें, क्रम में। भावनाएँ नहीं, तथ्य।' : 'Write facts, in order. Facts not feelings.'}</p>
          <textarea value={what} onChange={(e) => setWhat(e.target.value)} required rows={5} className="brutal-textarea" placeholder={hi ? 'क्या हुआ — क्रम में लिखें...' : 'What happened — write in order...'} />
          <button type="button" onClick={() => setStep('details')} disabled={!what.trim()} className="brutal-btn brutal-btn-primary mt-4">{hi ? 'अगला →' : 'Next →'}</button>
        </div>
      )}

      {step === 'details' && (
        <div className="brutal-card space-y-4">
          <h2 className="heading-2 mb-2">{hi ? 'विवरण' : 'Details'}</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <label className="block"><span className="field-label">{hi ? 'कब (तारीख)' : 'When (date)'} *</span><input type="date" value={when} onChange={(e) => setWhen(e.target.value)} required className="brutal-input" /></label>
            <label className="block"><span className="field-label">{hi ? 'कहाँ (क्षेत्र, लैंडमार्क)' : 'Where (area, landmarks)'} *</span><input type="text" value={where} onChange={(e) => setWhere(e.target.value)} required className="brutal-input" placeholder={hi ? 'जगह...' : 'Location...'} /></label>
          </div>
          <label className="block"><span className="field-label">{hi ? 'किसने (वैकल्पिक)' : 'Who (optional)'}</span><input type="text" value={who} onChange={(e) => setWho(e.target.value)} className="brutal-input" placeholder={hi ? 'नाम/विवरण/बैज नं. या "अज्ञात"' : 'Name/description/badge# or "unknown"'} /></label>
          <label className="block"><span className="field-label">{hi ? 'सबूत (वैकल्पिक)' : 'Evidence (optional)'}</span><input type="text" value={evidence} onChange={(e) => setEvidence(e.target.value)} className="brutal-input" placeholder={hi ? 'फोटो, वीडियो, गवाह...' : 'Photos, videos, witnesses...'} /></label>
          <div className="flex gap-3 mt-4">
            <button type="button" onClick={() => setStep('what')} className="brutal-btn">{hi ? '← पीछे' : '← Back'}</button>
            <button type="button" onClick={() => setStep('result')} disabled={!when || !where.trim()} className="brutal-btn brutal-btn-primary">{hi ? 'दस्तावेज़ बनाएँ ✓' : 'Generate Documents ✓'}</button>
          </div>
        </div>
      )}
    </div>
  );
}
