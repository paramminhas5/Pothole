'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Locale } from '@/types';

export default function ProtestModeClient({ locale }: { locale: Locale }) {
  const hi = locale === 'hi';
  const [buddyTimer, setBuddyTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [lastCheckIn, setLastCheckIn] = useState<string | null>(null);

  useEffect(() => {
    if (!timerActive) return;
    const interval = setInterval(() => setBuddyTimer(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, [timerActive]);

  function checkIn() {
    setBuddyTimer(0);
    setLastCheckIn(new Date().toLocaleTimeString());
  }

  function sendSOS() {
    const contact = localStorage.getItem('sahayata_emergency_contact');
    if (contact) {
      const parsed = JSON.parse(contact);
      const msg = encodeURIComponent(parsed.message || `I may be detained. Call DSLSA 1516. My name: ${parsed.name || 'Unknown'}`);
      window.open(`sms:${parsed.phone}?body=${msg}`, '_self');
    } else {
      window.open(`sms:?body=${encodeURIComponent('I may be detained. Call DSLSA 1516 for free lawyer.')}`, '_self');
    }
  }

  const minutes = Math.floor(buddyTimer / 60);
  const seconds = buddyTimer % 60;
  const isOverdue = minutes >= 30;

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fafafa', padding: '16px' }}>
      {/* EMERGENCY NUMBERS — HUGE */}
      <div style={{ textAlign: 'center', paddingTop: '24px', marginBottom: '32px' }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.5, marginBottom: '8px' }}>
          {hi ? 'प्रोटेस्ट मोड सक्रिय' : 'PROTEST MODE ACTIVE'}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', maxWidth: '400px', margin: '0 auto' }}>
          <a href="tel:112" style={{ background: '#dc2626', color: '#fff', padding: '24px 16px', borderRadius: '12px', textAlign: 'center', textDecoration: 'none', display: 'block' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 900, display: 'block' }}>112</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>{hi ? 'आपातकालीन' : 'EMERGENCY'}</span>
          </a>
          <a href="tel:1516" style={{ background: '#2563eb', color: '#fff', padding: '24px 16px', borderRadius: '12px', textAlign: 'center', textDecoration: 'none', display: 'block' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 900, display: 'block' }}>1516</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>{hi ? 'मुफ्त वकील' : 'FREE LAWYER'}</span>
          </a>
        </div>
      </div>

      {/* SOS BUTTON */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <button type="button" onClick={sendSOS} style={{ width: '100%', maxWidth: '400px', padding: '20px', background: '#dc2626', color: '#fff', border: '3px solid #fff', borderRadius: '12px', fontSize: '1.2rem', fontWeight: 900, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          {hi ? '🆘 मैं डिटेन हो रहा/रही हूँ' : '🆘 I AM BEING DETAINED'}
        </button>
        <p style={{ fontSize: '0.7rem', opacity: 0.5, marginTop: '8px' }}>{hi ? 'आपके आपातकालीन संपर्क को SMS भेजता है' : 'Sends SMS to your emergency contact'}</p>
      </div>

      {/* RIGHTS — BIG */}
      <div style={{ maxWidth: '400px', margin: '0 auto 32px', padding: '20px', border: '2px solid rgba(255,255,255,0.2)', borderRadius: '12px' }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.15em', opacity: 0.5, marginBottom: '12px' }}>{hi ? 'ये बोलें:' : 'SAY THESE:'}</p>
        <div style={{ display: 'grid', gap: '8px', fontSize: '0.95rem', fontWeight: 700 }}>
          <p>{hi ? '"कारण बताएँ।"' : '"Tell me the reason."'}</p>
          <p>{hi ? '"मुझे वकील चाहिए।"' : '"I want a lawyer."'}</p>
          <p>{hi ? '"परिवार को बताएँ।"' : '"Inform my family."'}</p>
          <p>{hi ? '"फोन अनलॉक नहीं करूँगा/करूँगी।"' : '"I will not unlock my phone."'}</p>
          <p>{hi ? '"बिना वकील कोई बयान नहीं।"' : '"No statement without lawyer."'}</p>
        </div>
      </div>

      {/* BUDDY TIMER */}
      <div style={{ maxWidth: '400px', margin: '0 auto 32px', padding: '20px', border: `2px solid ${isOverdue ? '#dc2626' : 'rgba(255,255,255,0.2)'}`, borderRadius: '12px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.15em', opacity: 0.5, marginBottom: '8px' }}>{hi ? 'बडी चेक-इन टाइमर' : 'BUDDY CHECK-IN TIMER'}</p>
        <p style={{ fontSize: '2.5rem', fontWeight: 900, fontFamily: 'monospace', color: isOverdue ? '#dc2626' : '#fafafa' }}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </p>
        {isOverdue && <p style={{ color: '#dc2626', fontWeight: 700, fontSize: '0.85rem', marginTop: '4px' }}>{hi ? '⚠️ 30 मिनट हो गए — बडी को मैसेज करें!' : '⚠️ 30 min overdue — message your buddy!'}</p>}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '12px' }}>
          {!timerActive ? (
            <button type="button" onClick={() => setTimerActive(true)} style={{ padding: '10px 20px', background: '#22c55e', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>{hi ? 'टाइमर शुरू' : 'Start Timer'}</button>
          ) : (
            <button type="button" onClick={checkIn} style={{ padding: '10px 20px', background: '#22c55e', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>{hi ? '✓ चेक-इन (रीसेट)' : '✓ Check In (Reset)'}</button>
          )}
        </div>
        {lastCheckIn && <p style={{ fontSize: '0.75rem', opacity: 0.5, marginTop: '8px' }}>{hi ? 'आखिरी चेक-इन:' : 'Last check-in:'} {lastCheckIn}</p>}
      </div>

      {/* QUICK LINKS */}
      <div style={{ maxWidth: '400px', margin: '0 auto', display: 'grid', gap: '8px' }}>
        <Link href="/safety" style={{ display: 'block', padding: '12px 16px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', color: '#fafafa', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem' }}>{hi ? '⚖️ पूरा अधिकार कार्ड →' : '⚖️ Full Rights Card →'}</Link>
        <Link href="/expect" style={{ display: 'block', padding: '12px 16px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', color: '#fafafa', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem' }}>{hi ? '📋 क्या करें गाइड →' : '📋 What To Do Guide →'}</Link>
        <Link href="/" style={{ display: 'block', padding: '12px 16px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', color: '#fafafa', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem', opacity: 0.6, textAlign: 'center' }}>{hi ? '← सामान्य मोड' : '← Normal Mode'}</Link>
      </div>

      {/* SETUP EMERGENCY CONTACT */}
      <details style={{ maxWidth: '400px', margin: '24px auto 0', padding: '16px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}>
        <summary style={{ cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700, opacity: 0.7 }}>{hi ? '⚙️ आपातकालीन संपर्क सेट करें' : '⚙️ Set Emergency Contact'}</summary>
        <EmergencyContactSetup locale={locale} />
      </details>
    </div>
  );
}

function EmergencyContactSetup({ locale }: { locale: Locale }) {
  const hi = locale === 'hi';
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('sahayata_emergency_contact');
    if (stored) {
      const parsed = JSON.parse(stored);
      setName(parsed.name || '');
      setPhone(parsed.phone || '');
    }
  }, []);

  function save() {
    const msg = hi
      ? `मुझे शायद हिरासत में लिया गया है। DSLSA 1516 कॉल करें। मेरा नाम: ${name}`
      : `I may be detained. Call DSLSA 1516 for free lawyer. My name: ${name}`;
    localStorage.setItem('sahayata_emergency_contact', JSON.stringify({ name, phone, message: msg }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div style={{ marginTop: '12px', display: 'grid', gap: '8px' }}>
      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder={hi ? 'आपका नाम (SMS में भेजा जाएगा)' : 'Your name (sent in SMS)'} style={{ padding: '10px', background: '#1a1a1a', border: '1px solid #333', borderRadius: '6px', color: '#fafafa', fontSize: '0.9rem' }} />
      <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder={hi ? 'आपातकालीन संपर्क फोन' : 'Emergency contact phone'} style={{ padding: '10px', background: '#1a1a1a', border: '1px solid #333', borderRadius: '6px', color: '#fafafa', fontSize: '0.9rem' }} />
      <button type="button" onClick={save} disabled={!name || !phone} style={{ padding: '10px', background: saved ? '#22c55e' : '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}>
        {saved ? (hi ? '✓ सेव हुआ!' : '✓ Saved!') : (hi ? 'सेव करें' : 'Save')}
      </button>
      <p style={{ fontSize: '0.7rem', opacity: 0.5 }}>{hi ? 'यह सिर्फ आपके फोन पर सेव होता है। कहीं नहीं भेजा जाता।' : 'Saved only on your phone. Never sent anywhere.'}</p>
    </div>
  );
}
