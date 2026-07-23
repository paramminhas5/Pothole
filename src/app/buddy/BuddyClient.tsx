'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Locale } from '@/types';

type BuddyState = 'setup' | 'active' | 'ended';

export default function BuddyClient({ locale }: { locale: Locale }) {
  const hi = locale === 'hi';
  const [state, setState] = useState<BuddyState>('setup');
  const [myAlias, setMyAlias] = useState('');
  const [buddyAlias, setBuddyAlias] = useState('');
  const [interval, setInterval_] = useState(30);
  const [timer, setTimer] = useState(0);
  const [lastCheckIn, setLastCheckIn] = useState<string>('');
  const [checkInCount, setCheckInCount] = useState(0);

  useEffect(() => {
    if (state !== 'active') return;
    const id = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(id);
  }, [state]);

  function startBuddy() {
    if (!myAlias.trim() || !buddyAlias.trim()) return;
    setState('active');
    setTimer(0);
    setLastCheckIn(new Date().toLocaleTimeString());
  }

  function checkIn() {
    setTimer(0);
    setLastCheckIn(new Date().toLocaleTimeString());
    setCheckInCount(c => c + 1);
  }

  function endSession() {
    setState('ended');
    setTimer(0);
    setMyAlias('');
    setBuddyAlias('');
    setCheckInCount(0);
    setLastCheckIn('');
    // Clear all buddy data
    localStorage.removeItem('sahayata_buddy');
  }

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const isOverdue = minutes >= interval;
  const isCritical = minutes >= interval + 15;

  if (state === 'ended') {
    return (
      <div className="max-w-md mx-auto px-4 py-12 text-center">
        <div className="brutal-card">
          <p className="text-4xl mb-4">✓</p>
          <h2 className="heading-2 mb-2">{hi ? 'सेशन खत्म' : 'Session Ended'}</h2>
          <p className="text-sm text-[var(--color-text-muted)] mb-4">{hi ? 'सारा डेटा मिटा दिया गया। कोई निशान नहीं बचा।' : 'All data erased. No trace left.'}</p>
          <button type="button" onClick={() => setState('setup')} className="brutal-btn brutal-btn-primary">{hi ? 'नया बडी सेशन' : 'New Buddy Session'}</button>
        </div>
      </div>
    );
  }

  if (state === 'active') {
    return (
      <div style={{ minHeight: '100vh', padding: '16px', background: isCritical ? '#1a0505' : '#0a0a0a', color: '#fafafa' }}>
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <p style={{ fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.15em', opacity: 0.5 }}>{hi ? 'बडी सिस्टम सक्रिय' : 'BUDDY SYSTEM ACTIVE'}</p>
            <p style={{ marginTop: '8px', fontSize: '0.9rem' }}>{myAlias} ↔ {buddyAlias}</p>
          </div>

          {/* TIMER */}
          <div style={{ textAlign: 'center', padding: '32px 0', border: `2px solid ${isCritical ? '#dc2626' : isOverdue ? '#f59e0b' : 'rgba(255,255,255,0.2)'}`, borderRadius: '12px', marginBottom: '24px' }}>
            <p style={{ fontSize: '3.5rem', fontWeight: 900, fontFamily: 'monospace', color: isCritical ? '#dc2626' : isOverdue ? '#f59e0b' : '#fafafa' }}>
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </p>
            {isOverdue && <p style={{ color: isCritical ? '#dc2626' : '#f59e0b', fontWeight: 700, fontSize: '0.85rem', marginTop: '8px' }}>
              {isCritical
                ? (hi ? '🚨 15+ मिनट ओवरड्यू — बडी को अलर्ट करें!' : '🚨 15+ min overdue — ALERT your buddy!')
                : (hi ? '⚠️ चेक-इन ओवरड्यू' : '⚠️ Check-in overdue')}
            </p>}
            <p style={{ fontSize: '0.75rem', opacity: 0.5, marginTop: '8px' }}>{hi ? `हर ${interval} मिनट चेक-इन` : `Check in every ${interval} min`}</p>
          </div>

          {/* CHECK IN BUTTON */}
          <button type="button" onClick={checkIn} style={{ width: '100%', padding: '20px', background: '#22c55e', color: '#000', border: 'none', borderRadius: '12px', fontSize: '1.2rem', fontWeight: 900, cursor: 'pointer', marginBottom: '16px' }}>
            {hi ? '✓ मैं ठीक हूँ (चेक-इन)' : '✓ I\'m OK (Check In)'}
          </button>

          {/* STATS */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '24px' }}>
            <div style={{ padding: '12px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', textAlign: 'center' }}>
              <p style={{ fontSize: '1.5rem', fontWeight: 900 }}>{checkInCount}</p>
              <p style={{ fontSize: '0.7rem', opacity: 0.5 }}>{hi ? 'चेक-इन' : 'Check-ins'}</p>
            </div>
            <div style={{ padding: '12px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', textAlign: 'center' }}>
              <p style={{ fontSize: '0.9rem', fontWeight: 700 }}>{lastCheckIn || '—'}</p>
              <p style={{ fontSize: '0.7rem', opacity: 0.5 }}>{hi ? 'आखिरी' : 'Last'}</p>
            </div>
          </div>

          {/* SOS */}
          <button type="button" onClick={() => { const c = localStorage.getItem('sahayata_emergency_contact'); const phone = c ? JSON.parse(c).phone : ''; const msg = encodeURIComponent(`${myAlias} needs help. Last check-in: ${lastCheckIn}. Buddy: ${buddyAlias}. Call DSLSA 1516.`); window.open(`sms:${phone}?body=${msg}`, '_self'); }} style={{ width: '100%', padding: '16px', background: '#dc2626', color: '#fff', border: '2px solid #fff', borderRadius: '12px', fontSize: '1rem', fontWeight: 900, cursor: 'pointer', marginBottom: '16px' }}>
            {hi ? '🆘 मुझे मदद चाहिए' : '🆘 I Need Help'}
          </button>

          {/* END SESSION */}
          <button type="button" onClick={endSession} style={{ width: '100%', padding: '12px', background: 'transparent', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', fontSize: '0.85rem', cursor: 'pointer' }}>
            {hi ? 'सेशन खत्म करें (सब मिटा दो)' : 'End Session (Delete Everything)'}
          </button>
        </div>
      </div>
    );
  }

  // SETUP STATE
  return (
    <div className="max-w-md mx-auto px-4 md:px-6 py-12">
      <div className="mb-8">
        <h1 className="heading-display mb-2">{hi ? 'बडी सिस्टम' : 'Buddy System'}</h1>
        <p className="text-[var(--color-text-muted)]">{hi ? 'विरोध में अकेले मत जाओ। एक बडी सेट करो। अगर चेक-इन मिस हो → अलर्ट।' : 'Never go to a protest alone. Set a buddy. Miss a check-in → alert fires.'}</p>
      </div>

      <div className="brutal-card mb-6">
        <div className="space-y-4">
          <label className="block">
            <span className="field-label">{hi ? 'आपका उपनाम (असली नाम नहीं)' : 'Your alias (not real name)'}</span>
            <input type="text" value={myAlias} onChange={e => setMyAlias(e.target.value)} maxLength={20} className="brutal-input" placeholder={hi ? 'जैसे: Raven' : 'e.g. Raven'} />
          </label>
          <label className="block">
            <span className="field-label">{hi ? 'बडी का उपनाम' : 'Buddy\'s alias'}</span>
            <input type="text" value={buddyAlias} onChange={e => setBuddyAlias(e.target.value)} maxLength={20} className="brutal-input" placeholder={hi ? 'जैसे: Falcon' : 'e.g. Falcon'} />
          </label>
          <label className="block">
            <span className="field-label">{hi ? 'चेक-इन हर (मिनट)' : 'Check-in every (minutes)'}</span>
            <select value={interval} onChange={e => setInterval_(Number(e.target.value))} className="brutal-select">
              <option value={15}>15 min</option>
              <option value={30}>30 min</option>
              <option value={45}>45 min</option>
              <option value={60}>60 min</option>
            </select>
          </label>
        </div>
      </div>

      <button type="button" onClick={startBuddy} disabled={!myAlias.trim() || !buddyAlias.trim()} className="brutal-btn brutal-btn-primary brutal-btn-lg w-full mb-4">
        {hi ? 'बडी सिस्टम शुरू →' : 'Start Buddy System →'}
      </button>

      <div className="brutal-card text-xs space-y-2 text-[var(--color-text-muted)]">
        <p><strong>{hi ? 'कैसे काम करता है:' : 'How it works:'}</strong></p>
        <p>→ {hi ? 'हर X मिनट "मैं ठीक हूँ" दबाएँ' : 'Tap "I\'m OK" every X minutes'}</p>
        <p>→ {hi ? 'मिस किया → टाइमर लाल → बडी को पता चले' : 'Missed → timer goes red → buddy knows'}</p>
        <p>→ {hi ? '"मुझे मदद चाहिए" → आपातकालीन संपर्क को SMS' : '"I Need Help" → SMS to emergency contact'}</p>
        <p>→ {hi ? '"सेशन खत्म" → सारा डेटा मिट जाता है' : '"End Session" → all data deleted'}</p>
        <p className="font-bold mt-2">⚠️ {hi ? 'सब कुछ सिर्फ आपके फोन पर। कोई सर्वर नहीं।' : 'Everything stays on YOUR phone only. No server.'}</p>
      </div>

      <div className="mt-6">
        <Link href="/protest-mode" className="brutal-btn brutal-btn-lg w-full text-center">{hi ? 'प्रोटेस्ट मोड भी चालू करें →' : 'Also activate Protest Mode →'}</Link>
      </div>
    </div>
  );
}
