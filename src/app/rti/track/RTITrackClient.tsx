'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Locale } from '@/types';

export default function RTITrackClient({ locale }: { locale: Locale }) {
  const hi = locale === 'hi';
  const [filingDate, setFilingDate] = useState('');

  const status = useMemo(() => {
    if (!filingDate) return null;
    const filed = new Date(filingDate);
    const now = new Date();
    const daysElapsed = Math.floor((now.getTime() - filed.getTime()) / 86_400_000);
    const daysRemaining = 30 - daysElapsed;
    const appealDeadline = new Date(filed.getTime() + 30 * 86_400_000);
    const cicDeadline = new Date(filed.getTime() + 75 * 86_400_000);

    let stage: 'waiting' | 'appeal' | 'cic' | 'pil' = 'waiting';
    if (daysElapsed > 75) stage = 'pil';
    else if (daysElapsed > 30) stage = daysElapsed > 45 ? 'cic' : 'appeal';

    return { daysElapsed, daysRemaining, stage, appealDeadline, cicDeadline };
  }, [filingDate]);

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-8">
        <h1 className="heading-display mb-2">{hi ? 'RTI ट्रैकर' : 'RTI Tracker'}</h1>
        <p className="text-[var(--color-text-muted)]">{hi ? 'अपनी RTI दाखिल तारीख दर्ज करें → हम बताएँगे अगला कदम क्या है।' : 'Enter your RTI filing date → we\'ll tell you what\'s next.'}</p>
      </div>

      <div className="brutal-card mb-6">
        <label className="block">
          <span className="field-label">{hi ? 'RTI कब दाखिल की?' : 'When did you file the RTI?'}</span>
          <input type="date" value={filingDate} onChange={e => setFilingDate(e.target.value)} max={new Date().toISOString().split('T')[0]} className="brutal-input" />
        </label>
      </div>

      {status && (
        <div className="space-y-6">
          {/* STATUS VISUALIZATION */}
          <div className="brutal-card !border-[var(--color-accent)]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="heading-3">{hi ? 'स्थिति' : 'Status'}</h2>
              <span className="text-3xl font-black">{hi ? `दिन ${status.daysElapsed}` : `Day ${status.daysElapsed}`}</span>
            </div>

            {/* Progress bar */}
            <div className="relative h-4 bg-[var(--color-surface-alt)] rounded-full overflow-hidden mb-4">
              <div className="absolute inset-y-0 left-0 rounded-full transition-all" style={{ width: `${Math.min(100, (status.daysElapsed / 75) * 100)}%`, background: status.stage === 'waiting' ? 'var(--color-accent)' : status.stage === 'appeal' ? 'var(--color-yellow)' : 'var(--color-red)' }} />
              {/* Markers */}
              <div className="absolute inset-y-0 left-[40%] w-0.5 bg-[var(--color-border)]" title="Day 30" />
              <div className="absolute inset-y-0 left-[60%] w-0.5 bg-[var(--color-border)]" title="Day 45" />
              <div className="absolute inset-y-0 left-[100%] w-0.5 bg-[var(--color-border)]" title="Day 75" />
            </div>
            <div className="flex justify-between text-xs text-[var(--color-text-muted)]">
              <span>{hi ? 'दाखिल' : 'Filed'}</span>
              <span>{hi ? 'दिन 30' : 'Day 30'}</span>
              <span>{hi ? 'दिन 45' : 'Day 45'}</span>
              <span>{hi ? 'दिन 75' : 'Day 75'}</span>
            </div>
          </div>

          {/* WHAT TO DO NOW */}
          {status.stage === 'waiting' && status.daysRemaining > 0 && (
            <div className="brutal-card" style={{ borderTop: '6px solid var(--color-lime)' }}>
              <h3 className="heading-3 mb-2">{hi ? '⏳ इंतज़ार करें' : '⏳ Wait'}</h3>
              <p className="text-sm mb-2">{hi ? `जवाब आने में ${status.daysRemaining} दिन बाकी। सरकार को 30 दिन मिलते हैं।` : `${status.daysRemaining} days remaining for response. Government gets 30 days.`}</p>
              <p className="text-xs text-[var(--color-text-muted)]">{hi ? `समयसीमा: ${status.appealDeadline.toLocaleDateString('hi-IN')}` : `Deadline: ${status.appealDeadline.toLocaleDateString('en-IN')}`}</p>
            </div>
          )}

          {status.stage === 'appeal' && (
            <div className="brutal-card" style={{ borderTop: '6px solid var(--color-yellow)' }}>
              <h3 className="heading-3 mb-2">{hi ? '⚠️ प्रथम अपील दाखिल करें!' : '⚠️ File First Appeal NOW!'}</h3>
              <p className="text-sm mb-3">{hi ? '30 दिन हो गए, जवाब नहीं आया। अब प्रथम अपील का समय है — उसी विभाग के वरिष्ठ अधिकारी को।' : '30 days passed, no response. Time for First Appeal — to a senior officer in the same department.'}</p>
              <Link href="/toolkit" className="brutal-btn brutal-btn-primary">{hi ? 'अपील टेम्पलेट → (कॉपी + भरें)' : 'Appeal Template → (copy + fill)'}</Link>
            </div>
          )}

          {status.stage === 'cic' && (
            <div className="brutal-card" style={{ borderTop: '6px solid var(--color-red)' }}>
              <h3 className="heading-3 mb-2">{hi ? '🔴 CIC शिकायत दाखिल करें!' : '🔴 File CIC Complaint!'}</h3>
              <p className="text-sm mb-3">{hi ? 'प्रथम अपील का भी जवाब नहीं? अब केंद्रीय/राज्य सूचना आयोग में शिकायत। अधिकारी पर ₹250/दिन जुर्माना।' : 'First Appeal also unanswered? Now file with Central/State Information Commission. ₹250/day penalty on the officer.'}</p>
              <Link href="/toolkit" className="brutal-btn brutal-btn-primary">{hi ? 'CIC शिकायत टेम्पलेट →' : 'CIC Complaint Template →'}</Link>
              <p className="text-xs text-[var(--color-text-muted)] mt-2">{hi ? 'CIC वेबसाइट: cic.gov.in | राज्य: अपने राज्य का SIC खोजें' : 'CIC: cic.gov.in | State: search your state SIC'}</p>
            </div>
          )}

          {status.stage === 'pil' && (
            <div className="brutal-card" style={{ borderTop: '6px solid var(--color-accent-2)' }}>
              <h3 className="heading-3 mb-2">{hi ? '💪 PIL पर विचार करें' : '💪 Consider a PIL'}</h3>
              <p className="text-sm mb-3">{hi ? '75+ दिन, कोई जवाब नहीं। यह व्यवस्थागत विफलता है। PIL (जनहित याचिका) हाई कोर्ट में दायर करने का समय।' : '75+ days, no response at all. This is systemic failure. Time to consider PIL (Public Interest Litigation) in High Court.'}</p>
              <Link href="/playbook" className="brutal-btn brutal-btn-primary">{hi ? 'PIL गाइड →' : 'PIL Guide →'}</Link>
              <p className="text-xs text-[var(--color-text-muted)] mt-2">{hi ? 'मुफ्त वकील: HRLN (hrln.org) | DSLSA 1516' : 'Free lawyer: HRLN (hrln.org) | DSLSA 1516'}</p>
            </div>
          )}

          {/* ESCALATION CHAIN VISUAL */}
          <div className="brutal-card">
            <h3 className="heading-3 mb-4">{hi ? 'एस्केलेशन चेन' : 'Escalation Chain'}</h3>
            <div className="space-y-3">
              {[
                { day: '0', label: hi ? 'RTI दाखिल' : 'RTI Filed', done: true },
                { day: '30', label: hi ? 'प्रथम अपील' : 'First Appeal', done: status.daysElapsed > 30 },
                { day: '45', label: hi ? 'CIC/SIC शिकायत (₹250/दिन जुर्माना)' : 'CIC/SIC Complaint (₹250/day penalty)', done: status.daysElapsed > 45 },
                { day: '60', label: hi ? 'प्रतिनिधि को पत्र' : 'Letter to Representative', done: status.daysElapsed > 60 },
                { day: '75+', label: hi ? 'PIL (हाई कोर्ट)' : 'PIL (High Court)', done: status.daysElapsed > 75 },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${status.daysElapsed >= parseInt(item.day) ? 'bg-[var(--color-accent)] text-white border-[var(--color-accent)]' : 'border-[var(--color-border-light)]'}`}>
                    {status.daysElapsed >= parseInt(item.day) ? '✓' : item.day}
                  </div>
                  <span className={`text-sm ${status.daysElapsed >= parseInt(item.day) ? 'font-bold' : 'text-[var(--color-text-muted)]'}`}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* HOW POTHOLE HELPS */}
          <div className="brutal-card" style={{ borderLeft: '6px solid var(--color-accent)' }}>
            <p className="text-sm font-bold mb-2">{hi ? 'Pothole यहाँ कैसे मदद करता है:' : 'How Pothole helps here:'}</p>
            <ul className="text-sm space-y-1 text-[var(--color-text-muted)]">
              <li>→ {hi ? 'ट्रैक करता है कितने दिन हुए' : 'Tracks how many days have passed'}</li>
              <li>→ {hi ? 'बताता है अगला कदम क्या है' : 'Tells you what the next step is'}</li>
              <li>→ {hi ? 'टेम्पलेट तैयार: अपील + CIC + PIL' : 'Templates ready: Appeal + CIC + PIL'}</li>
              <li>→ {hi ? 'एस्केलेशन चेन विज़ुअल — आप कहाँ हैं' : 'Escalation chain visual — where you are'}</li>
            </ul>
          </div>
        </div>
      )}

      {!status && (
        <div className="brutal-card text-center py-8">
          <p className="text-lg mb-2">{hi ? 'अभी तक RTI नहीं दाखिल की?' : 'Haven\'t filed an RTI yet?'}</p>
          <Link href="/rti" className="brutal-btn brutal-btn-primary">{hi ? 'RTI जनरेटर →' : 'RTI Generator →'}</Link>
        </div>
      )}
    </div>
  );
}
