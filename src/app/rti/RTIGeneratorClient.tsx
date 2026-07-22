'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Locale } from '@/types';

interface Props { locale: Locale }

const DEPARTMENTS = [
  'Ministry of Education', 'Ministry of Health', 'Ministry of Home Affairs',
  'Ministry of Finance', 'Ministry of Railways', 'Ministry of Defence',
  'Ministry of Environment', 'Ministry of Agriculture', 'Ministry of Labour',
  'Ministry of Women & Child Development', 'Ministry of Information & Broadcasting',
  'Municipal Corporation', 'State Education Department', 'State Police Department',
  'National Testing Agency (NTA)', 'University Grants Commission (UGC)',
  'Other (specify below)',
];

export default function RTIGeneratorClient({ locale }: Props) {
  const hi = locale === 'hi';
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [department, setDepartment] = useState('');
  const [customDept, setCustomDept] = useState('');
  const [questions, setQuestions] = useState(['']);
  const [periodFrom, setPeriodFrom] = useState('');
  const [periodTo, setPeriodTo] = useState('');
  const [generated, setGenerated] = useState('');


  function addQuestion() { setQuestions([...questions, '']); }
  function updateQuestion(index: number, value: string) {
    const updated = [...questions];
    updated[index] = value;
    setQuestions(updated);
  }
  function removeQuestion(index: number) {
    if (questions.length > 1) setQuestions(questions.filter((_, i) => i !== index));
  }

  function generate() {
    const dept = department === 'Other (specify below)' ? customDept : department;
    const questionsList = questions.filter(q => q.trim()).map((q, i) => `${i + 1}. ${q.trim()}`).join('\n');
    const period = periodFrom && periodTo ? `\nPeriod: ${periodFrom} to ${periodTo}\n` : '';

    const text = `To,
The Public Information Officer,
${dept},
[Department Address]

Subject: Application under Right to Information Act, 2005

Sir/Madam,

I, ${name || '[YOUR NAME]'}, a citizen of India, hereby seek the following information under the Right to Information Act, 2005:

${questionsList || '1. [YOUR QUESTION]'}
${period}
I am paying the prescribed fee of ₹10 via Indian Postal Order / Online Payment.

If the information sought is held by another public authority, kindly transfer this application under Section 6(3) of the RTI Act.

Yours faithfully,
${name || '[YOUR NAME]'}
${address || '[YOUR ADDRESS]'}
Date: ${new Date().toLocaleDateString('en-IN')}

---
HOW TO SUBMIT:
• Online (Central): rtionline.gov.in → Select "${dept}" → Paste this text → Pay ₹10
• By Post: Print this, attach ₹10 IPO/Court Fee Stamp, send to PIO address
• In Person: Hand-deliver with ₹10 cash receipt

AFTER SUBMISSION:
• Save registration number / postal receipt
• Mark calendar: 30 days from today = response deadline
• No response in 30 days? → File First Appeal (use Sahayata Appeal Generator)
`;
    setGenerated(text);
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(generated);
  }

  if (generated) {
    return (
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
        <div className="mb-6">
          <h1 className="heading-2 mb-2">{hi ? 'आपका RTI आवेदन तैयार है' : 'Your RTI Application is Ready'}</h1>
          <p className="text-sm text-[var(--color-text-muted)]">{hi ? 'कॉपी करें और rtionline.gov.in पर जमा करें, या प्रिंट करके डाक से भेजें।' : 'Copy and submit on rtionline.gov.in, or print and send by post.'}</p>
        </div>
        <pre className="p-4 bg-[var(--color-surface-alt)] rounded text-xs whitespace-pre-wrap overflow-x-auto border mb-4">{generated}</pre>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={copyToClipboard} className="brutal-btn brutal-btn-primary">{hi ? 'कॉपी करें' : 'Copy to Clipboard'}</button>
          <button type="button" onClick={() => setGenerated('')} className="brutal-btn">{hi ? 'संपादित करें' : 'Edit'}</button>
          <a href="https://rtionline.gov.in" target="_blank" rel="noopener noreferrer" className="brutal-btn">{hi ? 'rtionline.gov.in खोलें ↗' : 'Open rtionline.gov.in ↗'}</a>
        </div>
        <div className="brutal-card mt-6">
          <h3 className="heading-3 mb-2">{hi ? 'अगले कदम' : 'Next Steps'}</h3>
          <ol className="text-sm space-y-1 list-decimal list-inside">
            <li>{hi ? '30 दिन का टाइमर शुरू करें' : 'Start 30-day timer'}</li>
            <li>{hi ? 'रजिस्ट्रेशन नंबर सुरक्षित रखें' : 'Keep registration number safe'}</li>
            <li>{hi ? 'जवाब नहीं आया? → प्रथम अपील दाखिल करें' : 'No response? → File First Appeal'}</li>
          </ol>
          <Link href="/toolkit" className="text-link mt-3 inline-block">{hi ? 'प्रथम अपील टेम्पलेट →' : 'First Appeal Template →'}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-10">
        <h1 className="heading-display mb-3">{hi ? 'RTI जनरेटर' : 'RTI Generator'}</h1>
        <p className="text-[var(--color-text-muted)] text-lg">{hi ? 'फॉर्म भरें → कानूनी RTI आवेदन तैयार। सब कुछ ब्राउज़र में — कुछ भी सर्वर को नहीं भेजा जाता।' : 'Fill the form → legal RTI application ready. Everything in browser — nothing sent to server.'}</p>
        <div className="brutal-banner mt-4 text-xs">🔒 {hi ? 'क्लाइंट-साइड: आपका डेटा आपके ब्राउज़र में रहता है।' : 'Client-side only: your data stays in your browser.'}</div>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); generate(); }} className="space-y-6">
        <fieldset className="brutal-card">
          <legend className="heading-3 mb-3">{hi ? '1. आपकी जानकारी' : '1. Your Information'}</legend>
          <label className="block mb-3">
            <span className="field-label">{hi ? 'नाम' : 'Name'}</span>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="brutal-input" placeholder={hi ? 'आपका नाम' : 'Your name'} required />
          </label>
          <label className="block">
            <span className="field-label">{hi ? 'पता (जहाँ जवाब भेजा जाए)' : 'Address (where reply should be sent)'}</span>
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="brutal-textarea" rows={2} placeholder={hi ? 'आपका पता' : 'Your address'} required />
          </label>
        </fieldset>

        <fieldset className="brutal-card">
          <legend className="heading-3 mb-3">{hi ? '2. किस विभाग से?' : '2. Which Department?'}</legend>
          <select value={department} onChange={(e) => setDepartment(e.target.value)} className="brutal-select mb-2" required>
            <option value="">{hi ? 'विभाग चुनें' : 'Select department'}</option>
            {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          {department === 'Other (specify below)' && (
            <input type="text" value={customDept} onChange={(e) => setCustomDept(e.target.value)} className="brutal-input mt-2" placeholder={hi ? 'विभाग का नाम लिखें' : 'Type department name'} required />
          )}
        </fieldset>

        <fieldset className="brutal-card">
          <legend className="heading-3 mb-3">{hi ? '3. आप क्या जानना चाहते हैं?' : '3. What Do You Want to Know?'}</legend>
          <p className="field-help mb-3">{hi ? 'स्पष्ट और विशिष्ट प्रश्न लिखें। हर प्रश्न एक बिंदु पर हो।' : 'Write clear, specific questions. Each question should address one point.'}</p>
          {questions.map((q, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input type="text" value={q} onChange={(e) => updateQuestion(i, e.target.value)} className="brutal-input flex-1" placeholder={hi ? `प्रश्न ${i + 1}` : `Question ${i + 1}`} required />
              {questions.length > 1 && <button type="button" onClick={() => removeQuestion(i)} className="brutal-btn text-xs">✕</button>}
            </div>
          ))}
          <button type="button" onClick={addQuestion} className="brutal-btn text-xs mt-1">{hi ? '+ और प्रश्न जोड़ें' : '+ Add another question'}</button>
        </fieldset>

        <fieldset className="brutal-card">
          <legend className="heading-3 mb-3">{hi ? '4. अवधि (वैकल्पिक)' : '4. Time Period (Optional)'}</legend>
          <div className="grid grid-cols-2 gap-3">
            <label><span className="field-label">{hi ? 'से' : 'From'}</span><input type="date" value={periodFrom} onChange={(e) => setPeriodFrom(e.target.value)} className="brutal-input" /></label>
            <label><span className="field-label">{hi ? 'तक' : 'To'}</span><input type="date" value={periodTo} onChange={(e) => setPeriodTo(e.target.value)} className="brutal-input" /></label>
          </div>
        </fieldset>

        <button type="submit" className="brutal-btn brutal-btn-primary brutal-btn-lg w-full">{hi ? 'RTI आवेदन तैयार करें' : 'Generate RTI Application'}</button>
      </form>
    </div>
  );
}
