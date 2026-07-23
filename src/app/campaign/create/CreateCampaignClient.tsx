'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Locale } from '@/types';
import { CITIES_AREAS } from '@/lib/constants';

interface Props { locale: Locale; }

type Step = 'who' | 'target' | 'demand' | 'review';

export default function CreateCampaignClient({ locale }: Props) {
  const hi = locale === 'hi';
  const [step, setStep] = useState<Step>('who');
  const [form, setForm] = useState({
    starterType: '' as 'individual' | 'group' | '',
    groupName: '',
    title: '',
    targetInstitution: '',
    city: '',
    category: '',
    primaryDemand: '',
    deadline: '',
    issueStatement: '',
  });

  const update = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div className="form-page page-shell">
      <div className="page-heading">
        <h1>{hi ? 'अभियान शुरू करें' : 'Start a Campaign'}</h1>
        <p>{hi ? 'लक्ष्य + माँग + समय सीमा = सार्वजनिक जवाबदेही। कोई भी शुरू कर सकता है।' : 'Target + demand + deadline = public accountability. Anyone can start.'}</p>
      </div>

      {/* Progress */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '32px' }}>
        {(['who','target','demand','review'] as Step[]).map((s, i) => (
          <div key={s} style={{ flex: 1, height: '6px', borderRadius: '3px', background: i <= ['who','target','demand','review'].indexOf(step) ? 'var(--color-accent)' : 'var(--color-border-light)' }} />
        ))}
      </div>

      {/* STEP 1: Who's starting */}
      {step === 'who' && (
        <div className="civic-form">
          <h2 className="heading-2">{hi ? 'कौन शुरू कर रहा है?' : 'Who is starting this?'}</h2>
          <div className="radio-card-grid">
            <label className={`radio-card ${form.starterType === 'individual' ? 'selected' : ''}`}>
              <input type="radio" name="starter" checked={form.starterType === 'individual'} onChange={() => update('starterType', 'individual')} />
              <span>
                <strong>{hi ? '🙋 मैं (व्यक्तिगत)' : '🙋 Me (individual)'}</strong>
                <small>{hi ? 'आप अभियान प्रमुख होंगे। बाद में ग्रुप जोड़ सकते हैं।' : "You'll be campaign lead. Can add groups later."}</small>
              </span>
            </label>
            <label className={`radio-card ${form.starterType === 'group' ? 'selected' : ''}`}>
              <input type="radio" name="starter" checked={form.starterType === 'group'} onChange={() => update('starterType', 'group')} />
              <span>
                <strong>{hi ? '👥 मेरा ग्रुप' : '👥 My group'}</strong>
                <small>{hi ? 'अभियान ग्रुप का होगा। अन्य ग्रुप जुड़ सकते हैं।' : "Campaign belongs to group. Others can align."}</small>
              </span>
            </label>
          </div>
          {form.starterType === 'group' && (
            <label className="mt-4 block">
              <span className="field-label">{hi ? 'ग्रुप का नाम' : 'Group name'}</span>
              <input className="brutal-input" value={form.groupName} onChange={e => update('groupName', e.target.value)} placeholder={hi ? 'अपने ग्रुप का नाम' : 'Your group name'} />
            </label>
          )}
          <button className="brutal-btn brutal-btn-primary brutal-btn-lg mt-6" disabled={!form.starterType} onClick={() => setStep('target')} style={{ width: '100%' }}>
            {hi ? 'आगे: लक्ष्य →' : 'Next: Target →'}
          </button>
        </div>
      )}

      {/* STEP 2: Target */}
      {step === 'target' && (
        <div className="civic-form">
          <h2 className="heading-2">{hi ? 'किसके खिलाफ?' : 'Against whom?'}</h2>
          <div className="info-panel mb-4">
            <p className="text-sm">{hi ? '⚠️ लक्ष्य हमेशा एक संस्था/कार्यालय होना चाहिए — कभी कोई व्यक्ति नहीं।' : '⚠️ Target must always be an institution/office — never an individual.'}</p>
          </div>
          <div className="stack-form">
            <label>
              <span className="field-label">{hi ? 'अभियान शीर्षक' : 'Campaign title'} *</span>
              <input className="brutal-input" value={form.title} onChange={e => update('title', e.target.value)} placeholder={hi ? 'उदा: NTA भंग करो' : 'e.g., Dissolve NTA'} />
            </label>
            <label>
              <span className="field-label">{hi ? 'लक्षित संस्था' : 'Target institution'} *</span>
              <input className="brutal-input" value={form.targetInstitution} onChange={e => update('targetInstitution', e.target.value)} placeholder={hi ? 'उदा: शिक्षा मंत्रालय' : 'e.g., Ministry of Education'} />
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <label>
                <span className="field-label">{hi ? 'शहर' : 'City'} *</span>
                <select className="brutal-select" value={form.city} onChange={e => update('city', e.target.value)}>
                  <option value="">{hi ? 'चुनें' : 'Select'}</option>
                  <option value="National">{hi ? 'राष्ट्रीय' : 'National'}</option>
                  {CITIES_AREAS.map(c => <option key={c.city} value={c.city}>{c.city}</option>)}
                </select>
              </label>
              <label>
                <span className="field-label">{hi ? 'श्रेणी' : 'Category'} *</span>
                <select className="brutal-select" value={form.category} onChange={e => update('category', e.target.value)}>
                  <option value="">{hi ? 'चुनें' : 'Select'}</option>
                  <option value="education">{hi ? 'शिक्षा' : 'Education'}</option>
                  <option value="infrastructure">{hi ? 'बुनियादी ढांचा' : 'Infrastructure'}</option>
                  <option value="accountability">{hi ? 'जवाबदेही' : 'Accountability'}</option>
                  <option value="environment">{hi ? 'पर्यावरण' : 'Environment'}</option>
                  <option value="welfare">{hi ? 'कल्याण' : 'Welfare'}</option>
                  <option value="governance">{hi ? 'शासन' : 'Governance'}</option>
                  <option value="other">{hi ? 'अन्य' : 'Other'}</option>
                </select>
              </label>
            </div>
          </div>
          <div className="button-row mt-6">
            <button className="brutal-btn" onClick={() => setStep('who')}>{hi ? '← पीछे' : '← Back'}</button>
            <button className="brutal-btn brutal-btn-primary" disabled={!form.title || !form.targetInstitution || !form.city} onClick={() => setStep('demand')} style={{ flex: 1 }}>
              {hi ? 'आगे: माँग →' : 'Next: Demand →'}
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Demand + Deadline */}
      {step === 'demand' && (
        <div className="civic-form">
          <h2 className="heading-2">{hi ? 'तुम्हारी माँग क्या है?' : 'What is your demand?'}</h2>
          <div className="stack-form">
            <label>
              <span className="field-label">{hi ? 'माँग (स्पष्ट, कार्यवाही योग्य)' : 'Demand (clear, actionable)'} *</span>
              <textarea className="brutal-textarea" value={form.primaryDemand} onChange={e => update('primaryDemand', e.target.value)} placeholder={hi ? 'उदा: 30 दिन में MG रोड के सभी गड्ढे ठीक करो' : 'e.g., Fix all potholes on MG Road within 30 days'} />
              <span className="field-help">{hi ? 'अच्छी माँग: विशिष्ट + समय-सीमा + कार्यवाही योग्य' : 'Good demand: specific + time-bound + actionable'}</span>
            </label>
            <label>
              <span className="field-label">{hi ? 'समय सीमा' : 'Deadline'} *</span>
              <input className="brutal-input" type="date" value={form.deadline} onChange={e => update('deadline', e.target.value)} />
              <span className="field-help">{hi ? 'इसके बाद मौन = रिपोर्ट कार्ड पर सार्वजनिक' : 'After this, silence = public on Report Card'}</span>
            </label>
            <label>
              <span className="field-label">{hi ? 'समस्या का विवरण' : 'Describe the issue'}</span>
              <textarea className="brutal-textarea" value={form.issueStatement} onChange={e => update('issueStatement', e.target.value)} placeholder={hi ? 'क्या हो रहा है, कितने लोग प्रभावित, कब से...' : 'What is happening, how many affected, since when...'} />
            </label>
          </div>
          <div className="button-row mt-6">
            <button className="brutal-btn" onClick={() => setStep('target')}>{hi ? '← पीछे' : '← Back'}</button>
            <button className="brutal-btn brutal-btn-primary" disabled={!form.primaryDemand || !form.deadline} onClick={() => setStep('review')} style={{ flex: 1 }}>
              {hi ? 'समीक्षा करें →' : 'Review →'}
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Review */}
      {step === 'review' && (
        <div className="civic-form">
          <h2 className="heading-2">{hi ? 'अभियान सारांश' : 'Campaign Summary'}</h2>
          <div className="review-panel">
            <dl style={{ display: 'grid', gap: '12px' }}>
              <div><dt className="text-xs font-bold uppercase text-[var(--color-text-muted)]">{hi ? 'शुरू करने वाला' : 'Started by'}</dt><dd>{form.starterType === 'group' ? form.groupName : (hi ? 'व्यक्तिगत' : 'Individual')}</dd></div>
              <div><dt className="text-xs font-bold uppercase text-[var(--color-text-muted)]">{hi ? 'शीर्षक' : 'Title'}</dt><dd className="font-bold">{form.title}</dd></div>
              <div><dt className="text-xs font-bold uppercase text-[var(--color-text-muted)]">{hi ? 'लक्ष्य' : 'Target'}</dt><dd>{form.targetInstitution} ({form.city})</dd></div>
              <div><dt className="text-xs font-bold uppercase text-[var(--color-text-muted)]">{hi ? 'माँग' : 'Demand'}</dt><dd>{form.primaryDemand}</dd></div>
              <div><dt className="text-xs font-bold uppercase text-[var(--color-text-muted)]">{hi ? 'समय सीमा' : 'Deadline'}</dt><dd className="font-mono font-bold">{form.deadline}</dd></div>
            </dl>
          </div>

          <div className="warning-panel mt-4">
            <p className="text-sm">
              {hi
                ? '⚠️ प्रकाशित करने पर: अभियान सार्वजनिक होगा। माँग, लक्ष्य, और समय सीमा सबको दिखेगी। रिपोर्ट कार्ड पर एंट्री ऑटो-जनरेट होगी।'
                : '⚠️ On publish: campaign becomes public. Demand, target, and deadline visible to all. Report Card entry auto-generates.'}
            </p>
          </div>

          <div className="button-row mt-6">
            <button className="brutal-btn" onClick={() => setStep('demand')}>{hi ? '← पीछे' : '← Back'}</button>
            <button className="brutal-btn brutal-btn-primary brutal-btn-lg" style={{ flex: 1 }}>
              {hi ? '📢 अभियान प्रकाशित करें' : '📢 Publish Campaign'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
