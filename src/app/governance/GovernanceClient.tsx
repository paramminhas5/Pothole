'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Locale } from '@/types';

interface Representative {
  id: string;
  name: string;
  nameHi: string;
  constituency: string;
  constituencyHi: string;
  state: string;
  party: string;
  level: 'MP' | 'MLA' | 'Councillor';
  attendance: number; // percentage
  questionsAsked: number;
  rtiResponded: number;
  rtiPending: number;
  scorecard: number; // 0-100
  contact: string;
}

interface Demand {
  id: string;
  title: string;
  titleHi: string;
  target: string;
  targetHi: string;
  deadline: string;
  status: 'submitted' | 'acknowledged' | 'action' | 'resolved' | 'escalated' | 'expired';
  filedBy: string;
  rtisFiled: number;
  daysElapsed: number;
  escalationLevel: string;
}

const REPRESENTATIVES: Representative[] = [
  { id: '1', name: 'Dr. Mahesh Joshi', nameHi: 'डॉ. महेश जोशी', constituency: 'New Delhi', constituencyHi: 'नई दिल्ली', state: 'Delhi', party: 'INC', level: 'MP', attendance: 72, questionsAsked: 45, rtiResponded: 3, rtiPending: 2, scorecard: 65, contact: 'https://sansad.in' },
  { id: '2', name: 'Smt. Priya Singh', nameHi: 'श्रीमती प्रिया सिंह', constituency: 'South Delhi', constituencyHi: 'दक्षिण दिल्ली', state: 'Delhi', party: 'BJP', level: 'MP', attendance: 84, questionsAsked: 23, rtiResponded: 1, rtiPending: 5, scorecard: 45, contact: 'https://sansad.in' },
  { id: '3', name: 'Shri Ramesh Kumar', nameHi: 'श्री रमेश कुमार', constituency: 'Chandni Chowk', constituencyHi: 'चाँदनी चौक', state: 'Delhi', party: 'AAP', level: 'MLA', attendance: 91, questionsAsked: 67, rtiResponded: 8, rtiPending: 1, scorecard: 82, contact: 'https://delhiassembly.nic.in' },
  { id: '4', name: 'Ms. Anjali Deshmukh', nameHi: 'सुश्री अंजलि देशमुख', constituency: 'Andheri East', constituencyHi: 'अंधेरी पूर्व', state: 'Maharashtra', party: 'NCP(SP)', level: 'MLA', attendance: 88, questionsAsked: 34, rtiResponded: 5, rtiPending: 3, scorecard: 71, contact: 'https://mls.org.in' },
  { id: '5', name: 'Shri Vikram Patel', nameHi: 'श्री विक्रम पटेल', constituency: 'Koramangala Ward', constituencyHi: 'कोरमंगला वार्ड', state: 'Karnataka', party: 'IND', level: 'Councillor', attendance: 95, questionsAsked: 12, rtiResponded: 10, rtiPending: 0, scorecard: 90, contact: 'https://bbmp.gov.in' },
];

const DEMANDS: Demand[] = [
  { id: '1', title: 'Dissolve NTA and create independent exam body', titleHi: 'NTA भंग करें और स्वतंत्र परीक्षा निकाय बनाएँ', target: 'Education Minister', targetHi: 'शिक्षा मंत्री', deadline: '2026-08-15', status: 'submitted', filedBy: 'CJP Coalition', rtisFiled: 47, daysElapsed: 3, escalationLevel: 'Parliament' },
  { id: '2', title: 'Publish independent investigation report on NEET leaks', titleHi: 'NEET लीक पर स्वतंत्र जाँच रिपोर्ट प्रकाशित करें', target: 'NTA Chairman', targetHi: 'NTA अध्यक्ष', deadline: '2026-07-30', status: 'acknowledged', filedBy: 'Student Coalition', rtisFiled: 23, daysElapsed: 18, escalationLevel: 'CIC Appeal' },
  { id: '3', title: 'Legal guarantee for MSP', titleHi: 'MSP के लिए कानूनी गारंटी', target: 'Agriculture Minister', targetHi: 'कृषि मंत्री', deadline: '2026-09-01', status: 'escalated', filedBy: 'SKM', rtisFiled: 120, daysElapsed: 45, escalationLevel: 'Supreme Court PIL' },
  { id: '4', title: 'Compensation for July 2026 internet shutdown', titleHi: 'जुलाई 2026 इंटरनेट शटडाउन के लिए मुआवज़ा', target: 'DoT Secretary', targetHi: 'DoT सचिव', deadline: '2026-08-20', status: 'submitted', filedBy: 'IFF + Citizens', rtisFiled: 8, daysElapsed: 5, escalationLevel: 'RTI Filed' },
  { id: '5', title: 'Ward road repair — Sector 15 Chandigarh', titleHi: 'वार्ड सड़क मरम्मत — सेक्टर 15 चंडीगढ़', target: 'Municipal Commissioner', targetHi: 'नगर आयुक्त', deadline: '2026-08-01', status: 'action', filedBy: 'Local RWA', rtisFiled: 3, daysElapsed: 30, escalationLevel: 'Councillor follow-up' },
  { id: '6', title: 'Stop illegal demolitions without 30-day notice', titleHi: '30 दिन नोटिस बिना अवैध तोड़फोड़ बंद करें', target: 'UP Chief Secretary', targetHi: 'UP मुख्य सचिव', deadline: '2026-07-25', status: 'escalated', filedBy: 'Housing Rights Coalition', rtisFiled: 35, daysElapsed: 60, escalationLevel: 'High Court PIL' },
];

const STATUS_CONFIG: Record<string, { color: string; label: string; labelHi: string }> = {
  submitted: { color: 'bg-gray-200 text-gray-800', label: 'Submitted', labelHi: 'जमा' },
  acknowledged: { color: 'bg-blue-100 text-blue-800', label: 'Acknowledged', labelHi: 'स्वीकृत' },
  action: { color: 'bg-yellow-100 text-yellow-800', label: 'Action Taken', labelHi: 'कार्रवाई' },
  resolved: { color: 'bg-green-100 text-green-800', label: 'Resolved', labelHi: 'समाधान' },
  escalated: { color: 'bg-red-100 text-red-800', label: 'Escalated', labelHi: 'एस्केलेट' },
  expired: { color: 'bg-gray-100 text-gray-500', label: 'Expired', labelHi: 'समाप्त' },
};

type Tab = 'tracker' | 'representatives' | 'scorecard';

export default function GovernanceClient({ locale }: { locale: Locale }) {
  const hi = locale === 'hi';
  const [tab, setTab] = useState<Tab>('tracker');
  const [stateFilter, setStateFilter] = useState('');

  const filteredReps = useMemo(() => {
    if (!stateFilter) return REPRESENTATIVES;
    return REPRESENTATIVES.filter(r => r.state === stateFilter);
  }, [stateFilter]);

  const states = useMemo(() => [...new Set(REPRESENTATIVES.map(r => r.state))].sort(), []);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-8">
        <h1 className="heading-display mb-2">{hi ? 'शासन ट्रैकर' : 'Governance Tracker'}</h1>
        <p className="text-[var(--color-text-muted)]">{hi ? 'माँगें ट्रैक करें, जनप्रतिनिधियों को जवाबदेह बनाएँ, संस्थागत प्रतिक्रिया मापें।' : 'Track demands, hold representatives accountable, measure institutional response.'}</p>
      </div>

      {/* TABS */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button type="button" onClick={() => setTab('tracker')} className={`brutal-btn ${tab === 'tracker' ? 'brutal-btn-primary' : ''}`}>
          {hi ? '📋 माँग ट्रैकर' : '📋 Demand Tracker'}
        </button>
        <button type="button" onClick={() => setTab('representatives')} className={`brutal-btn ${tab === 'representatives' ? 'brutal-btn-primary' : ''}`}>
          {hi ? '👤 जनप्रतिनिधि' : '👤 Representatives'}
        </button>
        <button type="button" onClick={() => setTab('scorecard')} className={`brutal-btn ${tab === 'scorecard' ? 'brutal-btn-primary' : ''}`}>
          {hi ? '📊 स्कोरकार्ड' : '📊 Scorecard'}
        </button>
      </div>

      {/* DEMAND TRACKER TAB */}
      {tab === 'tracker' && (
        <div>
          <div className="brutal-card mb-6 !border-[var(--color-primary)]">
            <h2 className="heading-3 mb-3">{hi ? 'माँग ट्रैकर कैसे काम करता है' : 'How the Demand Tracker Works'}</h2>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2 py-1 bg-gray-200 rounded">1. {hi ? 'जमा' : 'Submit'}</span>
              <span>→</span>
              <span className="px-2 py-1 bg-blue-100 rounded">2. {hi ? 'स्वीकृत' : 'Acknowledged'}</span>
              <span>→</span>
              <span className="px-2 py-1 bg-yellow-100 rounded">3. {hi ? 'कार्रवाई' : 'Action'}</span>
              <span>→</span>
              <span className="px-2 py-1 bg-green-100 rounded">4. {hi ? 'समाधान' : 'Resolved'}</span>
              <span>/</span>
              <span className="px-2 py-1 bg-red-100 rounded">{hi ? 'एस्केलेट' : 'Escalate'}</span>
            </div>
            <p className="text-xs mt-2 text-[var(--color-text-muted)]">{hi ? '30 दिन जवाब नहीं → RTI प्रथम अपील → 45 दिन → CIC/SIC → PIL' : '30 days no response → RTI First Appeal → 45 days → CIC/SIC → PIL'}</p>
          </div>

          <div className="space-y-4">
            {DEMANDS.map((demand) => (
              <article key={demand.id} className="brutal-card">
                <div className="flex justify-between items-start gap-4 mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold">{hi ? demand.titleHi : demand.title}</h3>
                    <p className="text-sm text-[var(--color-text-muted)]">{hi ? 'लक्ष्य:' : 'Target:'} {hi ? demand.targetHi : demand.target}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded font-bold ${STATUS_CONFIG[demand.status].color}`}>
                    {hi ? STATUS_CONFIG[demand.status].labelHi : STATUS_CONFIG[demand.status].label}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div><strong>{hi ? 'समयसीमा:' : 'Deadline:'}</strong> {demand.deadline}</div>
                  <div><strong>{hi ? 'दिन बीते:' : 'Days elapsed:'}</strong> {demand.daysElapsed}</div>
                  <div><strong>RTIs {hi ? 'दाखिल:' : 'filed:'}</strong> {demand.rtisFiled}</div>
                  <div><strong>{hi ? 'स्तर:' : 'Level:'}</strong> {demand.escalationLevel}</div>
                </div>
                <p className="text-xs text-[var(--color-text-muted)] mt-2">{hi ? 'दाखिलकर्ता:' : 'Filed by:'} {demand.filedBy}</p>
              </article>
            ))}
          </div>

          <div className="brutal-card mt-6 text-center">
            <h3 className="heading-3 mb-2">{hi ? 'नई माँग दर्ज करें' : 'File a New Demand'}</h3>
            <p className="text-sm text-[var(--color-text-muted)] mb-4">{hi ? 'स्पष्ट माँग + लक्ष्य + समयसीमा = जवाबदेही' : 'Clear demand + target + deadline = accountability'}</p>
            <Link href="/demands" className="brutal-btn brutal-btn-primary">{hi ? 'माँग दर्ज करें →' : 'File Demand →'}</Link>
          </div>
        </div>
      )}

      {/* REPRESENTATIVES TAB */}
      {tab === 'representatives' && (
        <div>
          <div className="mb-4">
            <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)} className="brutal-select" aria-label={hi ? 'राज्य फ़िल्टर' : 'State filter'}>
              <option value="">{hi ? 'सभी राज्य' : 'All States'}</option>
              {states.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="space-y-4">
            {filteredReps.map((rep) => (
              <article key={rep.id} className="brutal-card">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-bold">{hi ? rep.nameHi : rep.name}</h3>
                    <p className="text-sm text-[var(--color-text-muted)]">{rep.level} · {hi ? rep.constituencyHi : rep.constituency} · {rep.party}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-black ${rep.scorecard >= 70 ? 'text-green-600' : rep.scorecard >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {rep.scorecard}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)]">{hi ? 'स्कोर' : 'Score'}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 text-xs">
                  <div className="p-2 bg-[var(--color-surface-alt)] rounded text-center">
                    <p className="font-bold text-lg">{rep.attendance}%</p>
                    <p>{hi ? 'उपस्थिति' : 'Attendance'}</p>
                  </div>
                  <div className="p-2 bg-[var(--color-surface-alt)] rounded text-center">
                    <p className="font-bold text-lg">{rep.questionsAsked}</p>
                    <p>{hi ? 'प्रश्न' : 'Questions'}</p>
                  </div>
                  <div className="p-2 bg-[var(--color-surface-alt)] rounded text-center">
                    <p className="font-bold text-lg">{rep.rtiResponded}</p>
                    <p>RTI {hi ? 'जवाब' : 'Responded'}</p>
                  </div>
                  <div className="p-2 bg-[var(--color-surface-alt)] rounded text-center">
                    <p className="font-bold text-lg text-red-600">{rep.rtiPending}</p>
                    <p>RTI {hi ? 'लंबित' : 'Pending'}</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <Link href="/rti" className="brutal-btn text-xs">{hi ? 'RTI दाखिल करें' : 'File RTI'}</Link>
                  <Link href="/representatives" className="brutal-btn text-xs">{hi ? 'पत्र लिखें' : 'Write Letter'}</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* SCORECARD TAB */}
      {tab === 'scorecard' && (
        <div>
          <div className="brutal-card mb-6">
            <h2 className="heading-3 mb-3">{hi ? 'संस्थागत जवाबदेही स्कोरकार्ड' : 'Institutional Accountability Scorecard'}</h2>
            <p className="text-sm text-[var(--color-text-muted)]">{hi ? 'RTI प्रतिक्रिया समय, माँग पूर्ति दर, और नागरिक जुड़ाव के आधार पर।' : 'Based on RTI response times, demand fulfillment rate, and citizen engagement.'}</p>
          </div>

          <div className="space-y-4">
            {[
              { name: hi ? 'शिक्षा मंत्रालय' : 'Ministry of Education', score: 18, rtis: 47, responded: 3, avgDays: 45 },
              { name: hi ? 'दिल्ली नगर निगम' : 'Delhi Municipal Corp', score: 62, rtis: 120, responded: 89, avgDays: 22 },
              { name: hi ? 'कृषि मंत्रालय' : 'Ministry of Agriculture', score: 34, rtis: 65, responded: 18, avgDays: 38 },
              { name: hi ? 'दूरसंचार विभाग (DoT)' : 'Dept of Telecom (DoT)', score: 28, rtis: 30, responded: 5, avgDays: 42 },
              { name: hi ? 'UP मुख्य सचिव' : 'UP Chief Secretary', score: 22, rtis: 55, responded: 8, avgDays: 50 },
              { name: 'BBMP (Bengaluru)', score: 75, rtis: 40, responded: 35, avgDays: 15 },
            ].map((inst, i) => (
              <article key={i} className="brutal-card">
                <div className="flex justify-between items-center gap-4">
                  <div className="flex-1">
                    <h3 className="font-bold">{inst.name}</h3>
                    <div className="flex gap-4 text-xs text-[var(--color-text-muted)] mt-1">
                      <span>RTIs: {inst.rtis}</span>
                      <span>{hi ? 'जवाब:' : 'Responded:'} {inst.responded}</span>
                      <span>{hi ? 'औसत दिन:' : 'Avg days:'} {inst.avgDays}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-3xl font-black ${inst.score >= 70 ? 'text-green-600' : inst.score >= 40 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {inst.score}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)]">/100</p>
                  </div>
                </div>
                {/* Score bar */}
                <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${inst.score >= 70 ? 'bg-green-500' : inst.score >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${inst.score}%` }} />
                </div>
              </article>
            ))}
          </div>

          <div className="brutal-card mt-6 text-center">
            <p className="text-sm">{hi ? 'जितने ज़्यादा RTI, उतना सटीक स्कोर। RTI दाखिल करें →' : 'More RTIs = more accurate score. File an RTI →'}</p>
            <Link href="/rti" className="brutal-btn brutal-btn-primary mt-3">{hi ? 'RTI जनरेटर →' : 'RTI Generator →'}</Link>
          </div>
        </div>
      )}

      {/* CTAs */}
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <Link href="/rti" className="brutal-btn brutal-btn-primary brutal-btn-lg text-center">{hi ? 'RTI दाखिल करें →' : 'FILE RTI →'}</Link>
        <Link href="/representatives" className="brutal-btn brutal-btn-lg text-center">{hi ? 'प्रतिनिधि खोजें →' : 'FIND REP →'}</Link>
        <Link href="/playbook" className="brutal-btn brutal-btn-lg text-center">{hi ? 'प्लेबुक →' : 'PLAYBOOK →'}</Link>
      </div>
    </div>
  );
}
