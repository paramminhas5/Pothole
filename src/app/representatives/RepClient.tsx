'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Locale } from '@/types';

interface Props { locale: Locale }

const STATES = [
  'Andhra Pradesh','Assam','Bihar','Chhattisgarh','Delhi','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala',
  'Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland',
  'Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana',
  'Tripura','Uttar Pradesh','Uttarakhand','West Bengal',
];

export default function RepClient({ locale }: Props) {
  const hi = locale === 'hi';
  const [state, setState] = useState('');
  const [issue, setIssue] = useState('');
  const [demand, setDemand] = useState('');
  const [yourName, setYourName] = useState('');
  const [generated, setGenerated] = useState('');
  const [copied, setCopied] = useState(false);

  const today = new Date().toLocaleDateString('en-IN');

  function generate(e: React.FormEvent) {
    e.preventDefault();
    const text = `To,
[Shri/Smt NAME],
Hon'ble Member of Parliament / MLA,
[CONSTITUENCY], ${state}

Subject: ${issue}

Respected Sir/Madam,

I am a resident of ${state} and a citizen of India. I am writing to bring the following matter to your urgent attention.

THE PROBLEM:
${issue}

WHAT I REQUEST:
${demand}

ACTIONS I HAVE TAKEN:
- [RTI filed on DATE — Reg No. — status]
- [Complaint to department on DATE — status]
- [Other actions]

I respectfully request your intervention. I will follow up in 30 days and file an RTI to check what action was taken on this representation.

Yours sincerely,
${yourName || '[YOUR NAME]'}
[YOUR ADDRESS]
[YOUR EMAIL/PHONE — optional]
Date: ${today}

---
HOW TO FIND YOUR REPRESENTATIVE:
• MP (Lok Sabha): sansad.in/ls/members → Filter by state
• MP (Rajya Sabha): sansad.in/rs/members
• MLA: Search "[${state}] legislative assembly members"
• Councillor: Your municipal corporation website

HOW TO SEND:
• Email: Find on sansad.in member profile
• Post: Parliament House, New Delhi (for MPs)
• CPGRAMS: pgportal.gov.in (tracked government complaint)
• In person: Constituency office (check schedule)`;
    setGenerated(text);
  }

  function copy() {
    navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (generated) {
    return (
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
        <h1 className="heading-2 mb-2">{hi ? '✅ पत्र तैयार' : '✅ Letter Ready'}</h1>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">{hi ? 'कॉपी करें → प्रतिनिधि का नाम भरें → भेजें।' : "Copy → fill representative's name → send."}</p>
        <pre className="p-4 bg-[var(--color-surface-alt)] rounded text-xs whitespace-pre-wrap overflow-x-auto border mb-4 leading-relaxed">{generated}</pre>
        <div className="flex flex-wrap gap-3 mb-6">
          <button type="button" onClick={copy} className="brutal-btn brutal-btn-primary">{copied ? '✓ Copied!' : hi ? '📋 कॉपी' : '📋 Copy'}</button>
          <a href="https://sansad.in/ls/members" target="_blank" rel="noopener noreferrer" className="brutal-btn">{hi ? '🔍 MP खोजें (sansad.in) ↗' : '🔍 Find MP (sansad.in) ↗'}</a>
          <a href="https://pgportal.gov.in" target="_blank" rel="noopener noreferrer" className="brutal-btn">{hi ? '📝 CPGRAMS ↗' : '📝 CPGRAMS ↗'}</a>
          <button type="button" onClick={() => setGenerated('')} className="brutal-btn">{hi ? '✏️ संपादित' : '✏️ Edit'}</button>
        </div>

        <details className="brutal-card">
          <summary className="heading-3 cursor-pointer">{hi ? 'कौन क्या नियंत्रित करता है' : 'Who Controls What'}</summary>
          <div className="mt-4 text-sm space-y-2">
            <p>• <strong>{hi ? 'नगर पार्षद:' : 'Councillor:'}</strong> {hi ? 'सड़क, पानी, सफाई, स्ट्रीटलाइट' : 'Roads, water, sanitation, streetlights'}</p>
            <p>• <strong>MLA:</strong> {hi ? 'पुलिस, शिक्षा (राज्य), स्वास्थ्य, बिजली' : 'Police, education (state), health, electricity'}</p>
            <p>• <strong>MP:</strong> {hi ? 'रेलवे, दूरसंचार, परीक्षाएँ (NTA), केंद्रीय कानून' : 'Railways, telecom, exams (NTA), central laws'}</p>
          </div>
        </details>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-8">
        <h1 className="heading-display mb-2">{hi ? 'जनप्रतिनिधि को लिखें' : 'Write to Representative'}</h1>
        <p className="text-[var(--color-text-muted)]">{hi ? 'फॉर्म भरें → पत्र तैयार → MP/MLA खोजें → भेजें।' : 'Fill form → letter ready → find MP/MLA → send.'}</p>
        <div className="brutal-banner mt-4 text-xs">🔒 {hi ? 'ब्राउज़र में। सर्वर को नहीं भेजा।' : 'In browser. Not sent to server.'}</div>
      </div>

      <form onSubmit={generate} className="space-y-6">
        <div className="brutal-card">
          <label className="block">
            <span className="heading-3 mb-2 block">{hi ? '1. कौन सा राज्य?' : '1. Which state?'}</span>
            <select value={state} onChange={(e) => setState(e.target.value)} required className="brutal-select">
              <option value="">{hi ? 'राज्य चुनें' : 'Select state'}</option>
              {STATES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </label>
        </div>

        <div className="brutal-card">
          <label className="block">
            <span className="heading-3 mb-2 block">{hi ? '2. समस्या क्या है?' : '2. What is the issue?'}</span>
            <textarea value={issue} onChange={(e) => setIssue(e.target.value)} required rows={3} className="brutal-textarea" placeholder={hi ? 'समस्या का विवरण (2-3 वाक्य)...' : 'Describe the problem (2-3 sentences)...'} />
          </label>
        </div>

        <div className="brutal-card">
          <label className="block">
            <span className="heading-3 mb-2 block">{hi ? '3. क्या चाहते हैं?' : '3. What do you want?'}</span>
            <textarea value={demand} onChange={(e) => setDemand(e.target.value)} required rows={2} className="brutal-textarea" placeholder={hi ? 'एक स्पष्ट, विशिष्ट माँग...' : 'One clear, specific demand...'} />
          </label>
        </div>

        <div className="brutal-card">
          <label className="block">
            <span className="heading-3 mb-2 block">{hi ? '4. आपका नाम' : '4. Your name'}</span>
            <input type="text" value={yourName} onChange={(e) => setYourName(e.target.value)} className="brutal-input" placeholder={hi ? 'नाम (वैकल्पिक)' : 'Name (optional)'} />
          </label>
        </div>

        <button type="submit" disabled={!state || !issue.trim() || !demand.trim()} className="brutal-btn brutal-btn-primary brutal-btn-lg w-full">{hi ? 'पत्र तैयार करें →' : 'Generate Letter →'}</button>
      </form>
    </div>
  );
}
