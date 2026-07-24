'use client';

import { useState, useEffect, useCallback } from 'react';
import { Locale } from '@/types';

type BuddyMode = 'home' | 'create' | 'join' | 'dashboard';

interface MemberStatus {
  id: string;
  displayName: string;
  status: 'safe' | 'due' | 'overdue' | 'sos';
  lastCheckin: string;
  minutesSinceCheckin: number;
  sharedLocation?: string;
}

interface CircleData {
  id: string;
  name: string;
  inviteCode: string;
  interval: number;
  grace: number;
  locationArea?: string;
  locationCity?: string;
  expiresAt: string;
}

export default function BuddyClient({ locale }: { locale: Locale }) {
  const hi = locale === 'hi';
  const [mode, setMode] = useState<BuddyMode>('home');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Create form
  const [createForm, setCreateForm] = useState({
    name: '',
    interval: '30',
    locationArea: '',
    locationCity: '',
    expiresHours: '24',
  });

  // Join form
  const [joinCode, setJoinCode] = useState('');

  // Dashboard state
  const [circle, setCircle] = useState<CircleData | null>(null);
  const [members, setMembers] = useState<MemberStatus[]>([]);
  const [checkinLoading, setCheckinLoading] = useState(false);
  const [sosLoading, setSosLoading] = useState(false);

  // Poll circle data
  const pollCircle = useCallback(async (circleId: string) => {
    try {
      const res = await fetch(`/api/buddy?id=${circleId}`);
      if (res.ok) {
        const data = await res.json();
        setCircle(data.circle);
        setMembers(data.members || []);
      }
    } catch { /* silent */ }
  }, []);

  // Auto-refresh every 30 seconds when in dashboard
  useEffect(() => {
    if (mode !== 'dashboard' || !circle) return;
    const id = setInterval(() => pollCircle(circle.id), 30000);
    return () => clearInterval(id);
  }, [mode, circle, pollCircle]);

  // Check localStorage for existing circle on mount
  useEffect(() => {
    const saved = localStorage.getItem('sahayata_buddy_circle');
    if (saved) {
      try {
        const { circleId } = JSON.parse(saved);
        if (circleId) {
          setMode('dashboard');
          pollCircle(circleId);
        }
      } catch { /* ignore */ }
    }
  }, [pollCircle]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/buddy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: createForm.name || 'Safety Circle',
          interval: parseInt(createForm.interval),
          locationArea: createForm.locationArea,
          locationCity: createForm.locationCity,
          expiresHours: parseInt(createForm.expiresHours),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || (hi ? 'सर्कल बनाने में त्रुटि' : 'Failed to create circle'));
        setLoading(false);
        return;
      }

      const data = await res.json();
      const circleId = data.circle.id;
      localStorage.setItem('sahayata_buddy_circle', JSON.stringify({ circleId }));
      await pollCircle(circleId);
      setMode('dashboard');
    } catch {
      setError(hi ? 'नेटवर्क त्रुटि' : 'Network error');
    }
    setLoading(false);
  }

  async function handleJoin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/buddy/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: joinCode.trim() }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || (hi ? 'सर्कल में शामिल होने में त्रुटि' : 'Failed to join circle'));
        setLoading(false);
        return;
      }

      const data = await res.json();
      const circleId = data.circleId;
      localStorage.setItem('sahayata_buddy_circle', JSON.stringify({ circleId }));
      await pollCircle(circleId);
      setMode('dashboard');
    } catch {
      setError(hi ? 'नेटवर्क त्रुटि' : 'Network error');
    }
    setLoading(false);
  }

  async function handleCheckin() {
    if (!circle) return;
    setCheckinLoading(true);
    try {
      const res = await fetch('/api/buddy/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ circleId: circle.id, type: 'checkin' }),
      });
      if (res.ok) {
        await pollCircle(circle.id);
      }
    } catch { /* silent */ }
    setCheckinLoading(false);
  }

  async function handleSOS() {
    if (!circle) return;
    const confirmed = confirm(hi ? '🚨 क्या आप SOS भेजना चाहते हैं? सभी सदस्यों को अलर्ट जाएगा।' : '🚨 Send SOS? All members will be alerted.');
    if (!confirmed) return;
    setSosLoading(true);
    try {
      const res = await fetch('/api/buddy/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ circleId: circle.id, type: 'sos' }),
      });
      if (res.ok) {
        await pollCircle(circle.id);
      }
    } catch { /* silent */ }
    setSosLoading(false);
  }

  function leaveCircle() {
    localStorage.removeItem('sahayata_buddy_circle');
    setCircle(null);
    setMembers([]);
    setMode('home');
  }

  function getStatusEmoji(status: string) {
    switch (status) {
      case 'safe': return '🟢';
      case 'due': return '🟡';
      case 'overdue': return '🔴';
      case 'sos': return '🚨';
      default: return '⚪';
    }
  }

  function getStatusLabel(status: string) {
    switch (status) {
      case 'safe': return hi ? 'सुरक्षित' : 'Safe';
      case 'due': return hi ? 'जल्द चेक-इन' : 'Due soon';
      case 'overdue': return hi ? 'ओवरड्यू' : 'Overdue';
      case 'sos': return hi ? 'SOS!' : 'SOS!';
      default: return status;
    }
  }

  // ═══ DASHBOARD ═══
  if (mode === 'dashboard' && circle) {
    const inviteLink = `${typeof window !== 'undefined' ? window.location.origin : ''}/buddy/${circle.inviteCode}`;

    return (
      <div style={{ minHeight: '100vh', padding: '16px', background: '#0a0a0a', color: '#fafafa' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <p style={{ fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.15em', opacity: 0.5 }}>{hi ? 'बडी सिस्टम सक्रिय' : 'BUDDY SYSTEM ACTIVE'}</p>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 900, marginTop: '8px' }}>{circle.name}</h1>
            <p style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: '4px' }}>
              {hi ? `हर ${circle.interval} मिनट चेक-इन` : `Check-in every ${circle.interval} min`}
              {circle.locationArea && ` · ${circle.locationArea}`}
            </p>
          </div>

          {/* Members */}
          <div style={{ marginBottom: '24px' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, marginBottom: '12px', opacity: 0.6 }}>{hi ? 'सदस्य' : 'MEMBERS'}</p>
            {members.map(m => (
              <div key={m.id} style={{ padding: '12px', border: `1px solid ${m.status === 'sos' ? '#dc2626' : m.status === 'overdue' ? '#f59e0b' : 'rgba(255,255,255,0.1)'}`, borderRadius: '8px', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.4rem' }}>{getStatusEmoji(m.status)}</span>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '0.95rem' }}>{m.displayName}</p>
                    <p style={{ fontSize: '0.7rem', opacity: 0.5 }}>{m.minutesSinceCheckin} min ago</p>
                  </div>
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: m.status === 'sos' ? '#dc2626' : m.status === 'overdue' ? '#f59e0b' : '#22c55e' }}>
                  {getStatusLabel(m.status)}
                </span>
              </div>
            ))}
          </div>

          {/* Check-in Button */}
          <button
            type="button"
            onClick={handleCheckin}
            disabled={checkinLoading}
            style={{ width: '100%', padding: '20px', background: '#22c55e', color: '#000', border: 'none', borderRadius: '12px', fontSize: '1.2rem', fontWeight: 900, cursor: 'pointer', marginBottom: '12px', minHeight: '48px', opacity: checkinLoading ? 0.7 : 1 }}
          >
            {checkinLoading ? (hi ? 'दर्ज हो रहा...' : 'Checking in...') : (hi ? '✓ मैं सुरक्षित हूँ' : "✓ I'm Safe")}
          </button>

          {/* SOS Button */}
          <button
            type="button"
            onClick={handleSOS}
            disabled={sosLoading}
            style={{ width: '100%', padding: '16px', background: '#dc2626', color: '#fff', border: '2px solid #fff', borderRadius: '12px', fontSize: '1rem', fontWeight: 900, cursor: 'pointer', marginBottom: '24px', minHeight: '48px', opacity: sosLoading ? 0.7 : 1 }}
          >
            {sosLoading ? (hi ? 'भेजा जा रहा...' : 'Sending...') : (hi ? '🚨 SOS — मुझे मदद चाहिए' : '🚨 SOS — I Need Help')}
          </button>

          {/* Invite link */}
          <div style={{ padding: '16px', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', marginBottom: '16px' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, marginBottom: '8px', opacity: 0.6 }}>{hi ? 'इनवाइट कोड' : 'INVITE CODE'}</p>
            <p style={{ fontFamily: 'monospace', fontSize: '1.2rem', fontWeight: 900, letterSpacing: '0.1em', marginBottom: '8px' }}>{circle.inviteCode}</p>
            <button
              type="button"
              onClick={() => { navigator.clipboard.writeText(inviteLink); }}
              style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.1)', color: '#fafafa', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer', minHeight: '48px' }}
            >
              {hi ? '📋 लिंक कॉपी करें' : '📋 Copy invite link'}
            </button>
          </div>

          {/* Leave */}
          <button
            type="button"
            onClick={leaveCircle}
            style={{ width: '100%', padding: '12px', background: 'transparent', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', fontSize: '0.85rem', cursor: 'pointer', minHeight: '48px' }}
          >
            {hi ? 'सर्कल छोड़ें' : 'Leave Circle'}
          </button>
        </div>
      </div>
    );
  }

  // ═══ CREATE MODE ═══
  if (mode === 'create') {
    return (
      <div className="form-page page-shell" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div className="page-heading">
          <h1>{hi ? 'सेफ्टी सर्कल बनाएँ' : 'Create Safety Circle'}</h1>
          <p>{hi ? 'अपने साथियों को सुरक्षित रखें। सभी को नियमित चेक-इन करना होगा।' : 'Keep your group safe. Everyone checks in regularly.'}</p>
        </div>

        <form onSubmit={handleCreate} className="civic-form">
          <div className="stack-form">
            <label>
              <span className="field-label">{hi ? 'सर्कल का नाम' : 'Circle name'}</span>
              <input
                className="brutal-input"
                value={createForm.name}
                onChange={e => setCreateForm(p => ({ ...p, name: e.target.value }))}
                placeholder={hi ? 'उदा: जंतर मंतर ग्रुप' : 'e.g., Jantar Mantar Squad'}
                maxLength={100}
                style={{ minHeight: '48px' }}
              />
            </label>
            <label>
              <span className="field-label">{hi ? 'चेक-इन अंतराल' : 'Check-in interval'} *</span>
              <select
                className="brutal-select"
                value={createForm.interval}
                onChange={e => setCreateForm(p => ({ ...p, interval: e.target.value }))}
                style={{ minHeight: '48px' }}
              >
                <option value="15">15 {hi ? 'मिनट' : 'minutes'}</option>
                <option value="30">30 {hi ? 'मिनट' : 'minutes'}</option>
                <option value="45">45 {hi ? 'मिनट' : 'minutes'}</option>
                <option value="60">60 {hi ? 'मिनट' : 'minutes'}</option>
              </select>
            </label>
            <label>
              <span className="field-label">{hi ? 'स्थान' : 'Location'}</span>
              <input
                className="brutal-input"
                value={createForm.locationArea}
                onChange={e => setCreateForm(p => ({ ...p, locationArea: e.target.value }))}
                placeholder={hi ? 'उदा: जंतर मंतर, दिल्ली' : 'e.g., Jantar Mantar, Delhi'}
                style={{ minHeight: '48px' }}
              />
            </label>
            <label>
              <span className="field-label">{hi ? 'समाप्ति (घंटों में)' : 'Expires after (hours)'}</span>
              <select
                className="brutal-select"
                value={createForm.expiresHours}
                onChange={e => setCreateForm(p => ({ ...p, expiresHours: e.target.value }))}
                style={{ minHeight: '48px' }}
              >
                <option value="4">4 {hi ? 'घंटे' : 'hours'}</option>
                <option value="8">8 {hi ? 'घंटे' : 'hours'}</option>
                <option value="12">12 {hi ? 'घंटे' : 'hours'}</option>
                <option value="24">24 {hi ? 'घंटे' : 'hours'}</option>
                <option value="48">48 {hi ? 'घंटे' : 'hours'}</option>
              </select>
            </label>
          </div>

          {error && (
            <div style={{ marginTop: '12px', padding: '12px', border: '2px solid var(--color-red)', borderRadius: '8px', color: 'var(--color-red)', fontSize: '0.9rem' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="brutal-btn brutal-btn-primary brutal-btn-lg mt-6"
            disabled={loading}
            style={{ width: '100%', minHeight: '48px', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <span className="loading-dot" style={{ width: '8px', height: '8px' }} />
                {hi ? 'बनाया जा रहा...' : 'Creating...'}
              </span>
            ) : (
              hi ? '🛡️ सर्कल बनाएँ' : '🛡️ Create Circle'
            )}
          </button>

          <button type="button" className="brutal-btn mt-4" style={{ width: '100%', minHeight: '48px' }} onClick={() => { setMode('home'); setError(''); }}>
            {hi ? '← वापस' : '← Back'}
          </button>
        </form>
      </div>
    );
  }

  // ═══ JOIN MODE ═══
  if (mode === 'join') {
    return (
      <div className="form-page page-shell" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div className="page-heading">
          <h1>{hi ? 'सर्कल में शामिल हों' : 'Join a Circle'}</h1>
          <p>{hi ? 'अपने साथी से मिला इनवाइट कोड दर्ज करें।' : 'Enter the invite code from your buddy.'}</p>
        </div>

        <form onSubmit={handleJoin} className="civic-form">
          <label>
            <span className="field-label">{hi ? 'इनवाइट कोड' : 'Invite code'} *</span>
            <input
              className="brutal-input"
              value={joinCode}
              onChange={e => setJoinCode(e.target.value)}
              placeholder={hi ? 'कोड दर्ज करें' : 'Enter code'}
              required
              minLength={4}
              style={{ minHeight: '48px', fontSize: '1.2rem', fontFamily: 'monospace', letterSpacing: '0.1em', textAlign: 'center' }}
            />
          </label>

          {error && (
            <div style={{ marginTop: '12px', padding: '12px', border: '2px solid var(--color-red)', borderRadius: '8px', color: 'var(--color-red)', fontSize: '0.9rem' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="brutal-btn brutal-btn-primary brutal-btn-lg mt-6"
            disabled={loading || !joinCode.trim()}
            style={{ width: '100%', minHeight: '48px', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <span className="loading-dot" style={{ width: '8px', height: '8px' }} />
                {hi ? 'शामिल हो रहे...' : 'Joining...'}
              </span>
            ) : (
              hi ? '🤝 शामिल हों' : '🤝 Join Circle'
            )}
          </button>

          <button type="button" className="brutal-btn mt-4" style={{ width: '100%', minHeight: '48px' }} onClick={() => { setMode('home'); setError(''); }}>
            {hi ? '← वापस' : '← Back'}
          </button>
        </form>
      </div>
    );
  }

  // ═══ HOME MODE ═══
  return (
    <div className="content-page page-shell" style={{ maxWidth: '500px', margin: '0 auto' }}>
      <div className="page-heading">
        <h1>{hi ? '🛡️ बडी सिस्टम' : '🛡️ Buddy System'}</h1>
        <p>{hi ? 'विरोध में अकेले मत जाओ। सेफ्टी सर्कल बनाओ। चेक-इन मिस हो → अलर्ट।' : 'Never go to a protest alone. Create a safety circle. Miss a check-in → alert fires.'}</p>
      </div>

      <div style={{ display: 'grid', gap: '16px' }}>
        <button
          type="button"
          className="brutal-card"
          onClick={() => { setMode('create'); setError(''); }}
          style={{ textAlign: 'left', cursor: 'pointer', padding: '24px', border: '3px solid var(--color-accent)', minHeight: '48px' }}
        >
          <h2 className="heading-3 mb-1">{hi ? '🆕 सर्कल बनाएँ' : '🆕 Create Circle'}</h2>
          <p className="text-sm text-[var(--color-text-muted)]">{hi ? 'नया सेफ्टी सर्कल शुरू करें और दोस्तों को इनवाइट करें।' : 'Start a new safety circle and invite friends.'}</p>
        </button>

        <button
          type="button"
          className="brutal-card"
          onClick={() => { setMode('join'); setError(''); }}
          style={{ textAlign: 'left', cursor: 'pointer', padding: '24px', minHeight: '48px' }}
        >
          <h2 className="heading-3 mb-1">{hi ? '🤝 सर्कल में शामिल हों' : '🤝 Join a Circle'}</h2>
          <p className="text-sm text-[var(--color-text-muted)]">{hi ? 'इनवाइट कोड से मौजूदा सर्कल में शामिल हों।' : 'Join an existing circle with an invite code.'}</p>
        </button>
      </div>

      <div className="brutal-card mt-8 text-xs space-y-2 text-[var(--color-text-muted)]" style={{ padding: '16px' }}>
        <p><strong>{hi ? 'कैसे काम करता है:' : 'How it works:'}</strong></p>
        <p>→ {hi ? 'सर्कल बनाएँ → दोस्तों को इनवाइट कोड भेजें' : 'Create circle → share invite code with friends'}</p>
        <p>→ {hi ? 'सभी नियमित अंतराल पर "मैं सुरक्षित हूँ" दबाएँ' : 'Everyone taps "I\'m Safe" at regular intervals'}</p>
        <p>→ {hi ? 'मिस किया → स्टेटस लाल → सभी को पता चले' : 'Missed → status goes red → everyone knows'}</p>
        <p>→ {hi ? 'SOS → तुरंत सभी सदस्यों को अलर्ट' : 'SOS → instant alert to all members'}</p>
      </div>
    </div>
  );
}
