'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Locale } from '@/types';
import { CITIES_AREAS } from '@/lib/constants';

interface Props {
  locale: Locale;
}

export default function CreateGroupClient({ locale }: Props) {
  const hi = locale === 'hi';
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    city: '',
    area: '',
    purpose: '',
    type: '',
    chatPlatform: '',
    chatLink: '',
  });

  const update = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          city: form.city,
          area: form.area,
          purpose: form.purpose,
          type: form.type || 'general',
          chatPlatform: form.chatPlatform,
          chatLink: form.chatLink,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || (hi ? 'ग्रुप बनाने में त्रुटि' : 'Failed to create group'));
        setSubmitting(false);
        return;
      }

      router.push('/groups');
    } catch {
      setError(hi ? 'नेटवर्क त्रुटि। कृपया पुनः प्रयास करें।' : 'Network error. Please try again.');
      setSubmitting(false);
    }
  }

  return (
    <div className="form-page page-shell">
      <div className="page-heading">
        <h1>{hi ? 'ग्रुप शुरू करें' : 'Start a Group'}</h1>
        <p>{hi ? 'अपने लोगों को संगठित करें। सब कुछ सार्वजनिक और पारदर्शी।' : 'Organize your people. Everything public and transparent.'}</p>
      </div>

      <form onSubmit={handleSubmit} className="civic-form">
        <div className="stack-form">
          <label>
            <span className="field-label">{hi ? 'ग्रुप का नाम' : 'Group name'} *</span>
            <input
              className="brutal-input"
              value={form.name}
              onChange={e => update('name', e.target.value)}
              placeholder={hi ? 'उदा: पुणे सिविक वॉच' : 'e.g., Pune Civic Watch'}
              required
              minLength={2}
              maxLength={100}
              style={{ minHeight: '48px' }}
            />
          </label>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <label>
              <span className="field-label">{hi ? 'शहर' : 'City'} *</span>
              <select
                className="brutal-select"
                value={form.city}
                onChange={e => update('city', e.target.value)}
                required
                style={{ minHeight: '48px' }}
              >
                <option value="">{hi ? 'चुनें' : 'Select'}</option>
                {CITIES_AREAS.map(c => (
                  <option key={c.city} value={c.city}>{c.city}</option>
                ))}
              </select>
            </label>
            <label>
              <span className="field-label">{hi ? 'इलाका' : 'Area'}</span>
              <input
                className="brutal-input"
                value={form.area}
                onChange={e => update('area', e.target.value)}
                placeholder={hi ? 'उदा: कोरेगांव पार्क' : 'e.g., Koregaon Park'}
                style={{ minHeight: '48px' }}
              />
            </label>
          </div>

          <label>
            <span className="field-label">{hi ? 'उद्देश्य' : 'Purpose'}</span>
            <textarea
              className="brutal-textarea"
              value={form.purpose}
              onChange={e => update('purpose', e.target.value)}
              placeholder={hi ? 'ग्रुप का उद्देश्य क्या है?' : 'What is this group about?'}
              maxLength={500}
            />
          </label>

          <label>
            <span className="field-label">{hi ? 'प्रकार' : 'Type'} *</span>
            <select
              className="brutal-select"
              value={form.type}
              onChange={e => update('type', e.target.value)}
              required
              style={{ minHeight: '48px' }}
            >
              <option value="">{hi ? 'चुनें' : 'Select'}</option>
              <option value="protest">{hi ? 'विरोध' : 'Protest'}</option>
              <option value="mutual_aid">{hi ? 'पारस्परिक सहायता' : 'Mutual Aid'}</option>
              <option value="campaign">{hi ? 'अभियान' : 'Campaign'}</option>
              <option value="study">{hi ? 'अध्ययन' : 'Study'}</option>
              <option value="chapter">{hi ? 'चैप्टर' : 'Chapter'}</option>
              <option value="general">{hi ? 'सामान्य' : 'General'}</option>
            </select>
          </label>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <label>
              <span className="field-label">{hi ? 'चैट प्लेटफॉर्म' : 'Chat platform'}</span>
              <select
                className="brutal-select"
                value={form.chatPlatform}
                onChange={e => update('chatPlatform', e.target.value)}
                style={{ minHeight: '48px' }}
              >
                <option value="">{hi ? 'कोई नहीं' : 'None'}</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="telegram">Telegram</option>
                <option value="signal">Signal</option>
                <option value="discord">Discord</option>
              </select>
            </label>
            <label>
              <span className="field-label">{hi ? 'चैट लिंक' : 'Chat link'}</span>
              <input
                className="brutal-input"
                value={form.chatLink}
                onChange={e => update('chatLink', e.target.value)}
                placeholder="https://..."
                type="url"
                style={{ minHeight: '48px' }}
              />
            </label>
          </div>
        </div>

        {error && (
          <div style={{ marginTop: '12px', padding: '12px', border: '2px solid var(--color-red)', borderRadius: '8px', color: 'var(--color-red)', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          className="brutal-btn brutal-btn-primary brutal-btn-lg mt-6"
          style={{ width: '100%', minHeight: '48px', opacity: submitting ? 0.7 : 1 }}
          disabled={submitting || !form.name || !form.city || !form.type}
        >
          {submitting ? (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <span className="loading-dot" style={{ width: '8px', height: '8px' }} />
              {hi ? 'बनाया जा रहा...' : 'Creating...'}
            </span>
          ) : (
            hi ? '➕ ग्रुप बनाएँ' : '➕ Create Group'
          )}
        </button>
      </form>
    </div>
  );
}
