'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Locale } from '@/types';

interface Props { locale: Locale }

const DEPARTMENTS = [
  'Ministry of Education', 'National Testing Agency (NTA)',
  'University Grants Commission (UGC)', 'Ministry of Health & Family Welfare',
  'Ministry of Home Affairs', 'Ministry of Finance',
  'Ministry of Railways', 'Ministry of Environment',
  'Ministry of Agriculture', 'Ministry of Labour & Employment',
  'Ministry of Women & Child Development', 'Ministry of Information & Broadcasting',
  'Municipal Corporation (specify city)', 'State Education Department',
  'State Police Department', 'State Public Works Department',
  'Other (type below)',
];

export default function RTIGeneratorClient({ locale }: Props) {
  const hi = locale === 'hi';
  const [question, setQuestion] = useState('');
  const [department, setDepartment] = useState('');
  const [customDept, setCustomDept] = useState('');
  const [address, setAddress] = useState('');
  const [generated, setGenerated] = useState('');
  const [copied, setCopied] = useState(false);
  const [showAppeal, setShowAppeal] = useState(false);

  const dept = department === 'Other (type below)' ? customDept : department;

  function generate(e: React.FormEvent) {
    e.preventDefault();
    const today = new Date().toLocaleDateString('en-IN');
    const text = `To,
The Public Information Officer,
${dept},
[DEPARTMENT ADDRESS — find on department website]

Subject: Application under Right to Information Act, 2005

Sir/Madam,

I, a citizen of India, hereby seek the following information under the Right to Information Act, 2005:

${question.trim().split('\n').map((q, i) => `${i + 1}. ${q}`).join('\n')}

I am paying the prescribed fee of Rs. 10 via online payment / Indian Postal Order / Court Fee Stamp.

If the information sought is held by another public authority, kindly transfer this application under Section 6(3) of the RTI Act within 5 days.

Yours faithfully,
${address || '[YOUR NAME AND ADDRESS]'}
Date: ${today}`;
    setGenerated(text);
  }

  function generateAppeal() {
    const today = new Date().toLocaleDateString('en-IN');
    return `To,
The First Appellate Authority,
${dept},
[DEPARTMENT ADDRESS]

Subject: First Appeal under Section 19(1) of RTI Act, 2005

Ref: RTI Application dated [YOUR FILING DATE], Reg. No. [YOUR REG NUMBER]

Sir/Madam,

I filed an RTI application on [DATE] seeking information about:
${question.trim().split('\n')[0]}

The Public Information Officer has:
[ ] Not responded within 30 days
[ ] Provided incomplete information
[ ] Denied without valid grounds

I request you to direct the PIO to provide complete information within 15 days and take appropriate disciplinary action.

Yours faithfully,
${address || '[YOUR NAME AND ADDRESS]'}
Date: ${today}

Encl: Copy of original RTI application and proof of submission

---
NEXT STEP IF THIS ALSO FAILS:
Second Appeal → Central Information Commission (cic.gov.in) or State Information Commission
Penalty: CIC can impose Rs. 250/day on officer, max Rs. 25,000`;
  }

  function copy(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function calendarLink() {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    const dateStr = d.toISOString().replace(/[-:]/g, '').split('.')[0];
    const endStr = new Date(d.getTime() + 3600000).toISOString().replace(/[-:]/g, '').split('.')[0];
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=RTI+Response+Deadline+(${encodeURIComponent(dept)})&dates=${dateStr}/${endStr}&details=No+response+received+for+RTI+filed+with+${encodeURIComponent(dept)}.+File+First+Appeal+now.`;
  }

  // ─── RESULT VIEW ───
  if (generated) {
    return (
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
        <h1 className="heading-2 mb-2">{hi ? '✅ RTI तैयार है' : '✅ RTI Ready'}</h1>
        <p className="text-sm text-[var(--color-text-muted)] mb-6">{hi ? 'कॉपी करें → rtionline.gov.in पर जमा करें (₹10)।' : 'Copy → submit on rtionline.gov.in (₹10).'}</p>

        <pre className="p-4 bg-[var(--color-surface-alt)] rounded text-xs whitespace-pre-wrap overflow-x-auto border mb-4 leading-relaxed">{generated}</pre>

        <div className="flex flex-wrap gap-3 mb-8">
          <button type="button" onClick={() => copy(generated)} className="brutal-btn brutal-btn-primary">{copied ? '✓ Copied!' : hi ? '📋 कॉपी करें' : '📋 Copy'}</button>
          <a href="https://rtionline.gov.in" target="_blank" rel="noopener noreferrer" className="brutal-btn">{hi ? '🌐 rtionline.gov.in खोलें ↗' : '🌐 Open rtionline.gov.in ↗'}</a>
          <a href={calendarLink()} target="_blank" rel="noopener noreferrer" className="brutal-btn">{hi ? '📅 30-दिन रिमाइंडर' : '📅 Set 30-day Reminder'}</a>
          <button type="button" onClick={() => setGenerated('')} className="brutal-btn">{hi ? '✏️ संपादित' : '✏️ Edit'}</button>
        </div>

        {/* HOW TO SUBMIT */}
        <details className="brutal-card mb-6">
          <summary className="heading-3 cursor-pointer">{hi ? '📝 कैसे जमा करें (स्टेप-बाय-स्टेप)' : '📝 How to Submit (Step-by-Step)'}</summary>
          <div className="mt-4 text-sm space-y-2">
            <p><strong>{hi ? 'ऑनलाइन (सबसे आसान):' : 'Online (easiest):'}</strong></p>
            <ol className="list-decimal list-inside space-y-1">
              <li>{hi ? 'rtionline.gov.in खोलें' : 'Open rtionline.gov.in'}</li>
              <li>{hi ? '"Submit Request" क्लिक करें' : 'Click "Submit Request"'}</li>
              <li>{hi ? 'Ministry/Department चुनें: ' : 'Select Ministry/Department: '}<strong>{dept}</strong></li>
              <li>{hi ? 'अपनी जानकारी भरें (नाम, पता, ईमेल)' : 'Fill your details (name, address, email)'}</li>
              <li>{hi ? '"RTI Request Text" में ऊपर कॉपी किया टेक्स्ट पेस्ट करें' : 'Paste the copied text in "RTI Request Text" field'}</li>
              <li>{hi ? '₹10 ऑनलाइन भुगतान करें' : 'Pay ₹10 online'}</li>
              <li>{hi ? 'Registration Number सेव करें!' : 'Save the Registration Number!'}</li>
            </ol>
            <p className="mt-3"><strong>{hi ? 'डाक से:' : 'By post:'}</strong> {hi ? 'प्रिंट करें + ₹10 IPO/कोर्ट फी स्टैम्प संलग्न करें + PIO को रजिस्टर्ड डाक से भेजें।' : 'Print + attach ₹10 IPO/Court Fee Stamp + send by registered post to PIO.'}</p>
          </div>
        </details>

        {/* FIRST APPEAL */}
        <details className="brutal-card mb-6" open={showAppeal}>
          <summary className="heading-3 cursor-pointer" onClick={() => setShowAppeal(true)}>{hi ? '⚡ 30 दिन बाद जवाब नहीं? → प्रथम अपील' : '⚡ No Response After 30 Days? → First Appeal'}</summary>
          <div className="mt-4">
            <pre className="p-4 bg-[var(--color-surface-alt)] rounded text-xs whitespace-pre-wrap overflow-x-auto border mb-3 leading-relaxed">{generateAppeal()}</pre>
            <button type="button" onClick={() => copy(generateAppeal())} className="brutal-btn brutal-btn-primary">{hi ? '📋 अपील कॉपी' : '📋 Copy Appeal'}</button>
          </div>
        </details>

        <Link href="/playbook" className="text-link">{hi ? '← प्लेबुक पर वापस' : '← Back to Playbook'}</Link>
      </div>
    );
  }

  // ─── FORM VIEW ───
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-8">
        <h1 className="heading-display mb-2">{hi ? 'RTI जनरेटर' : 'RTI Generator'}</h1>
        <p className="text-[var(--color-text-muted)]">{hi ? 'सरकार को जवाब देने पर मजबूर करें। ₹10। 30 दिन। नहीं दिया → जुर्माना।' : 'Force the government to answer. ₹10. 30 days. No response → penalty.'}</p>
        <div className="brutal-banner mt-4 text-xs">🔒 {hi ? 'सब कुछ ब्राउज़र में। कुछ भी सर्वर को नहीं भेजा जाता।' : 'Everything in browser. Nothing sent to server.'}</div>
      </div>

      <form onSubmit={generate} className="space-y-6">
        <div className="brutal-card">
          <label className="block">
            <span className="heading-3 mb-2 block">{hi ? '1. क्या जानना है?' : '1. What do you want to know?'}</span>
            <p className="text-xs text-[var(--color-text-muted)] mb-3">{hi ? 'स्पष्ट, विशिष्ट प्रश्न। हर प्रश्न नई पंक्ति पर।' : 'Clear, specific questions. Each question on a new line.'}</p>
            <textarea value={question} onChange={(e) => setQuestion(e.target.value)} required rows={4} className="brutal-textarea" placeholder={hi ? 'जैसे:\nNEET-UG 2026 पेपर लीक जाँच की प्रगति रिपोर्ट दें\nजाँच में कितने गिरफ्तार हुए और कौन से राज्य से' : 'e.g.:\nProvide progress report of NEET-UG 2026 paper leak investigation\nHow many arrested in investigation and from which states'} />
          </label>
        </div>

        <div className="brutal-card">
          <label className="block">
            <span className="heading-3 mb-2 block">{hi ? '2. किस विभाग से?' : '2. Which department?'}</span>
            <select value={department} onChange={(e) => setDepartment(e.target.value)} required className="brutal-select">
              <option value="">{hi ? 'विभाग चुनें' : 'Select department'}</option>
              {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </label>
          {department === 'Other (type below)' && (
            <input type="text" value={customDept} onChange={(e) => setCustomDept(e.target.value)} className="brutal-input mt-2" placeholder={hi ? 'विभाग का नाम' : 'Department name'} required />
          )}
        </div>

        <div className="brutal-card">
          <label className="block">
            <span className="heading-3 mb-2 block">{hi ? '3. आपका नाम और पता' : '3. Your name and address'}</span>
            <p className="text-xs text-[var(--color-text-muted)] mb-3">{hi ? 'जहाँ जवाब भेजा जाए।' : 'Where the response should be sent.'}</p>
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} required rows={3} className="brutal-textarea" placeholder={hi ? 'नाम\nपता\nपिन कोड' : 'Name\nAddress\nPIN code'} />
          </label>
        </div>

        <button type="submit" disabled={!question.trim() || !department || !address.trim()} className="brutal-btn brutal-btn-primary brutal-btn-lg w-full">{hi ? 'RTI तैयार करें →' : 'Generate RTI →'}</button>
      </form>
    </div>
  );
}
