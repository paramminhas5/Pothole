'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Locale } from '@/types';
import { CITIES_AREAS } from '@/lib/constants';

const RESOURCE_TYPES = [
  { value: 'legal-aid', en: 'Legal Aid (lawyer, DLSA, legal org)', hi: 'कानूनी सहायता (वकील, DLSA, कानूनी संस्था)' },
  { value: 'helpline', en: 'Helpline (phone number, crisis line)', hi: 'हेल्पलाइन (फोन नंबर, संकट रेखा)' },
  { value: 'organization', en: 'Organization (NGO, collective, union)', hi: 'संगठन (NGO, सामूहिक, संघ)' },
  { value: 'tool', en: 'Tool (app, website, software)', hi: 'उपकरण (ऐप, वेबसाइट, सॉफ्टवेयर)' },
  { value: 'shelter', en: 'Shelter (safe space, night shelter)', hi: 'आश्रय (सुरक्षित स्थान, रात्रि आश्रय)' },
  { value: 'media', en: 'Media (journalist, outlet, fact-checker)', hi: 'मीडिया (पत्रकार, आउटलेट, तथ्य-जाँच)' },
  { value: 'mental-health', en: 'Mental Health (counseling, support)', hi: 'मानसिक स्वास्थ्य (परामर्श, सहायता)' },
  { value: 'education', en: 'Education (training, workshop, course)', hi: 'शिक्षा (प्रशिक्षण, कार्यशाला, पाठ्यक्रम)' },
  { value: 'transport', en: 'Transport (rides, buses, routes)', hi: 'परिवहन (सवारी, बस, मार्ग)' },
  { value: 'other', en: 'Other', hi: 'अन्य' },
];

export default function SubmitClient({ locale }: { locale: Locale }) {
  const hi = locale === 'hi';
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [contact, setContact] = useState('');
  const [description, setDescription] = useState('');
  const [source, setSource] = useState('');
  const [submitterContact, setSubmitterContact] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, name, city: city || null, state, contact, description, source, submitter_contact: submitterContact }),
      });
      if (res.status === 429) { setError(hi ? 'बहुत अधिक प्रयास। एक दिन में अधिकतम 5।' : 'Too many submissions. Max 5 per day.'); return; }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || (hi ? 'जमा नहीं हुआ।' : 'Failed to submit.'));
        return;
      }
      setSubmitted(true);
    } catch {
      setError(hi ? 'नेटवर्क त्रुटि।' : 'Network error.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 text-center">
        <div className="brutal-card !max-w-md mx-auto">
          <div className="success-mark">✓</div>
          <h2 className="heading-2 mb-2">{hi ? 'धन्यवाद!' : 'Thank you!'}</h2>
          <p className="text-sm text-[var(--color-text-muted)] mb-4">{hi ? 'आपका संसाधन समीक्षा कतार में है। स्वीकृत होने पर साइट पर दिखेगा।' : 'Your resource is in the review queue. It will appear on the site once approved.'}</p>
          <div className="flex gap-2 justify-center flex-wrap">
            <button type="button" onClick={() => { setSubmitted(false); setType(''); setName(''); setContact(''); setDescription(''); setSource(''); }} className="brutal-btn brutal-btn-primary">{hi ? 'एक और जमा करें' : 'Submit Another'}</button>
            <Link href="/resources" className="brutal-btn">{hi ? 'संसाधन देखें' : 'View Resources'}</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-8">
        <h1 className="heading-display mb-2">{hi ? 'संसाधन जमा करें' : 'Submit a Resource'}</h1>
        <p className="text-[var(--color-text-muted)]">{hi ? 'वकील, हेल्पलाइन, संगठन, उपकरण — कुछ भी जो आंदोलन की मदद करे। समीक्षा के बाद प्रकाशित होगा।' : 'Lawyers, helplines, organizations, tools — anything that helps the movement. Published after review.'}</p>
      </div>

      <div className="brutal-card mb-6">
        <h2 className="heading-3 mb-2">{hi ? 'क्या स्वीकार होता है' : 'What gets accepted'}</h2>
        <ul className="text-sm space-y-1">
          <li>✓ {hi ? 'वास्तविक, सत्यापन योग्य संसाधन (फोन नंबर, URL, पता)' : 'Real, verifiable resources (phone number, URL, address)'}</li>
          <li>✓ {hi ? 'भारत में सक्रिय संगठन, वकील, हेल्पलाइन' : 'Organizations, lawyers, helplines active in India'}</li>
          <li>✓ {hi ? 'प्रदर्शनकारियों / नागरिकों के लिए उपयोगी उपकरण' : 'Tools useful for protesters / citizens'}</li>
          <li className="text-[var(--color-text-muted)]">✗ {hi ? 'हिंसा, घृणा, डॉक्सिंग, अपुष्ट दावे, स्पैम' : 'Violence, hate, doxxing, unverified claims, spam'}</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block">
          <span className="field-label">{hi ? 'प्रकार' : 'Type'} *</span>
          <select value={type} onChange={(e) => setType(e.target.value)} required className="brutal-select">
            <option value="">{hi ? 'चुनें...' : 'Select...'}</option>
            {RESOURCE_TYPES.map(t => <option key={t.value} value={t.value}>{hi ? t.hi : t.en}</option>)}
          </select>
        </label>

        <label className="block">
          <span className="field-label">{hi ? 'नाम' : 'Name'} *</span>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required maxLength={200} className="brutal-input" placeholder={hi ? 'जैसे: HRLN दिल्ली कार्यालय' : 'e.g. HRLN Delhi Office'} />
        </label>

        <div className="grid md:grid-cols-2 gap-4">
          <label className="block">
            <span className="field-label">{hi ? 'शहर (या राष्ट्रीय)' : 'City (or National)'}</span>
            <select value={city} onChange={(e) => setCity(e.target.value)} className="brutal-select">
              <option value="">{hi ? 'राष्ट्रीय / सभी शहर' : 'National / All Cities'}</option>
              {CITIES_AREAS.map(c => <option key={c.city} value={c.city}>{c.city}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="field-label">{hi ? 'राज्य' : 'State'}</span>
            <input type="text" value={state} onChange={(e) => setState(e.target.value)} maxLength={100} className="brutal-input" placeholder={hi ? 'जैसे: दिल्ली, महाराष्ट्र' : 'e.g. Delhi, Maharashtra'} />
          </label>
        </div>

        <label className="block">
          <span className="field-label">{hi ? 'संपर्क (फोन / URL / ईमेल)' : 'Contact (phone / URL / email)'} *</span>
          <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} required maxLength={500} className="brutal-input" placeholder={hi ? 'जैसे: 1516 या https://hrln.org या help@org.in' : 'e.g. 1516 or https://hrln.org or help@org.in'} />
        </label>

        <label className="block">
          <span className="field-label">{hi ? 'विवरण — ये क्या करते हैं' : 'Description — What they do'} *</span>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required maxLength={1000} rows={4} className="brutal-textarea" placeholder={hi ? 'एक पैराग्राफ: यह संसाधन क्या है, किसकी मदद करता है, कैसे संपर्क करें।' : 'One paragraph: what this resource is, who it helps, how to reach them.'} />
        </label>

        <label className="block">
          <span className="field-label">{hi ? 'सत्यापन स्रोत — आपने इसे कैसे जाना' : 'Verification source — How you know this'}</span>
          <input type="text" value={source} onChange={(e) => setSource(e.target.value)} maxLength={500} className="brutal-input" placeholder={hi ? 'जैसे: व्यक्तिगत अनुभव, आधिकारिक वेबसाइट, मीडिया रिपोर्ट' : 'e.g. Personal experience, official website, media report'} />
          <span className="field-help">{hi ? 'हमें सत्यापित करने में मदद करता है। वैकल्पिक लेकिन बेहद उपयोगी।' : 'Helps us verify faster. Optional but extremely helpful.'}</span>
        </label>

        <label className="block">
          <span className="field-label">{hi ? 'आपका संपर्क (वैकल्पिक — अनुवर्ती के लिए)' : 'Your contact (optional — for follow-up)'}</span>
          <input type="text" value={submitterContact} onChange={(e) => setSubmitterContact(e.target.value)} maxLength={200} className="brutal-input" placeholder={hi ? 'ईमेल या Signal (हम कभी प्रकाशित नहीं करेंगे)' : 'Email or Signal (we will never publish this)'} />
          <span className="field-help">{hi ? 'कभी प्रकाशित नहीं। केवल स्पष्टीकरण के लिए।' : 'Never published. Only for clarification if needed.'}</span>
        </label>

        {error && <p className="error-message" role="alert">{error}</p>}

        <button type="submit" disabled={submitting || !type || !name || !contact || !description} className="brutal-btn brutal-btn-primary brutal-btn-lg w-full">
          {submitting ? (hi ? 'जमा हो रहा...' : 'Submitting...') : (hi ? 'संसाधन जमा करें' : 'Submit Resource')}
        </button>

        <p className="text-xs text-center text-[var(--color-text-muted)]">{hi ? 'मॉडरेटर 24-48 घंटे में समीक्षा करेगा। अकाउंट नहीं चाहिए।' : 'A moderator will review within 24-48 hours. No account needed.'}</p>
      </form>
    </div>
  );
}
