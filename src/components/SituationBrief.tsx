'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Locale } from '@/types';

interface SituationProps {
  locale: Locale;
}

export default function SituationBrief({ locale }: SituationProps) {
  const hi = locale === 'hi';
  const [dbData, setDbData] = useState<{ day_count?: number; demands_total?: number; demands_met?: number; rtis_filed?: number; safety_note?: string; safety_note_hi?: string } | null>(null);

  useEffect(() => {
    fetch('/api/situation')
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.situation) setDbData(data.situation); })
      .catch(() => {});
  }, []);

  const dayCount = dbData?.day_count || 34;
  const demandsTotal = dbData?.demands_total || 5;
  const demandsMet = dbData?.demands_met || 0;
  const rtisFiled = dbData?.rtis_filed || 47;
  const safetyEn = dbData?.safety_note || 'Section 163 BNSS — 5+ persons cannot gather in Central Delhi. Heavy police + CRPF.';
  const safetyHi = dbData?.safety_note_hi || 'धारा 163 BNSS — मध्य दिल्ली में 5+ व्यक्ति एकत्रित नहीं। भारी पुलिस + CRPF।';

  return (
    <section className="situation-module" aria-labelledby="situation-title">
      <div className="page-shell">
        <div className="situation-header">
          <div className="situation-live-dot" aria-hidden="true" />
          <span className="situation-live-label">{hi ? 'अभी सक्रिय' : 'LIVE NOW'}</span>
          <time className="situation-timestamp" dateTime="2026-07-23">
            {hi ? '23 जुलाई 2026 · अपडेटेड' : 'July 23, 2026 · Updated'}
          </time>
        </div>

        <h2 id="situation-title" className="situation-title">
          {hi
            ? 'CJP जंतर मंतर धरना — दिन 34'
            : 'CJP Jantar Mantar Sit-In — Day 34'}
        </h2>

        <p className="situation-subtitle">
          {hi
            ? 'कॉकरोच जनता पार्टी + SFI + AISA + AISF + NSUI — शिक्षा सुधार, NTA भंग, बेरोज़गारी'
            : 'Cockroach Janta Party + SFI + AISA + AISF + NSUI — Education reform, dissolve NTA, unemployment'}
        </p>

        {/* DEMANDS SCORECARD */}
        <div className="situation-demands">
          <div className="demand-score">
            <span className="demand-score-number">{demandsTotal}</span>
            <span className="demand-score-label">{hi ? 'माँगें' : 'Demands'}</span>
          </div>
          <div className="demand-score demand-score-red">
            <span className="demand-score-number">{demandsMet}</span>
            <span className="demand-score-label">{hi ? 'पूरी' : 'Met'}</span>
          </div>
          <div className="demand-score">
            <span className="demand-score-number">{dayCount}</span>
            <span className="demand-score-label">{hi ? 'दिन' : 'Days'}</span>
          </div>
          <div className="demand-score">
            <span className="demand-score-number">{rtisFiled}</span>
            <span className="demand-score-label">{hi ? 'RTI दाखिल' : 'RTIs Filed'}</span>
          </div>
        </div>

        {/* SAFETY STATUS */}
        <div className="situation-safety">
          <div className="safety-indicator safety-warning">
            <strong>{hi ? '⚠️ सुरक्षा:' : '⚠️ Safety:'}</strong>
            <span>{hi ? safetyHi : safetyEn}</span>
          </div>
        </div>

        {/* THE 5 DEMANDS */}
        <details className="situation-demands-detail">
          <summary className="situation-demands-summary">
            {hi ? '5 माँगें देखें' : 'View 5 Demands'}
          </summary>
          <ol className="demands-list">
            <li className="demand-item demand-unmet">
              <span className="demand-status-dot" />
              {hi ? 'NTA तुरंत भंग करो — स्वतंत्र परीक्षा निकाय बनाओ' : 'Dissolve NTA immediately — create independent exam body'}
            </li>
            <li className="demand-item demand-unmet">
              <span className="demand-status-dot" />
              {hi ? 'शिक्षा मंत्री धर्मेंद्र प्रधान इस्तीफा दें' : 'Education Minister Dharmendra Pradhan must resign'}
            </li>
            <li className="demand-item demand-unmet">
              <span className="demand-status-dot" />
              {hi ? 'सभी लीक परीक्षाओं की स्वतंत्र न्यायिक जाँच' : 'Independent judicial investigation of all leaked exams'}
            </li>
            <li className="demand-item demand-unmet">
              <span className="demand-status-dot" />
              {hi ? 'प्रभावित छात्रों की पुन:परीक्षा + मुआवज़ा' : 'Re-examination for affected students + compensation'}
            </li>
            <li className="demand-item demand-unmet">
              <span className="demand-status-dot" />
              {hi ? '₹10,000/माह बेरोज़गारी भत्ता जब तक नौकरी न मिले' : '₹10,000/month unemployment allowance until employment'}
            </li>
          </ol>
        </details>

        {/* MOVEMENT TIMELINE */}
        <details className="situation-demands-detail" style={{ marginBottom: '20px' }}>
          <summary className="situation-demands-summary">
            {hi ? 'टाइमलाइन देखें' : 'View Timeline'}
          </summary>
          <ol className="demands-list" style={{ fontSize: '0.85rem' }}>
            <li className="demand-item"><span style={{ opacity: 0.6 }}>May 16</span> — {hi ? 'अभिजीत दीपके ने CJP की स्थापना की (CJI टिप्पणी के बाद)' : 'Abhijeet Dipke founds CJP (after CJI "cockroach" remark)'}</li>
            <li className="demand-item"><span style={{ opacity: 0.6 }}>May 24</span> — {hi ? 'Instagram पर 1M+ फॉलोअर्स — BJP को पार' : 'Crosses 1M+ Instagram followers — surpasses BJP'}</li>
            <li className="demand-item"><span style={{ opacity: 0.6 }}>Jun 6</span> — {hi ? 'नागपुर: 2,000+ छात्र संविधान चौक पर, 700+ पुलिस' : 'Nagpur: 2,000+ students at Samvidhan Chowk, 700+ police'}</li>
            <li className="demand-item"><span style={{ opacity: 0.6 }}>Jun 16</span> — {hi ? 'जयपुर रैली — संस्थापक पर हमला, फिर भी जारी' : 'Jaipur rally — founder assaulted mid-rally, continued'}</li>
            <li className="demand-item"><span style={{ opacity: 0.6 }}>Jun 19</span> — {hi ? 'जंतर मंतर धरना शुरू' : 'Jantar Mantar sit-in begins'}</li>
            <li className="demand-item"><span style={{ opacity: 0.6 }}>Jun 25</span> — {hi ? 'सोनम वांगचुक अनशन शुरू (लद्दाख अधिकार)' : 'Sonam Wangchuk begins hunger strike (Ladakh rights)'}</li>
            <li className="demand-item"><span style={{ opacity: 0.6 }}>Jul 5</span> — {hi ? 'दिल्ली HC ने X अकाउंट @CJP_2029 बहाल कराया' : 'Delhi HC orders restoration of @CJP_2029 X account'}</li>
            <li className="demand-item"><span style={{ opacity: 0.6 }}>Jul 20</span> — {hi ? 'चलो संसद मार्च — आँसू गैस, लाठी, 180+ घायल' : 'Chalo Sansad march — tear gas, lathi, 180+ injured'}</li>
            <li className="demand-item"><span style={{ opacity: 0.6 }}>Jul 21</span> — {hi ? '"पीछे नहीं हटेंगे" — जंतर मंतर पर डटे' : '"Won\'t back down" — hold position at Jantar Mantar'}</li>
            <li className="demand-item"><span style={{ opacity: 0.6 }}>Jul 22</span> — {hi ? 'विपक्ष ने संसद ठप कराई — राहुल गांधी डिटेन' : 'Opposition disrupts Parliament — Rahul Gandhi detained'}</li>
          </ol>
        </details>

        {/* FOLLOW THE MOVEMENT — Social Links */}
        <div style={{ marginBottom: '24px' }}>
          <p style={{ fontWeight: 800, fontSize: '0.85rem', marginBottom: '10px', opacity: 0.8 }}>
            {hi ? 'आंदोलन से जुड़ें:' : 'Follow the Movement:'}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <a href="https://www.instagram.com/cockroachjanata.india/" target="_blank" rel="noopener noreferrer" className="brutal-btn" style={{ fontSize: '0.75rem', padding: '8px 12px', minHeight: 'auto' }}>Instagram ↗</a>
            <a href="https://x.com/CJP_2029" target="_blank" rel="noopener noreferrer" className="brutal-btn" style={{ fontSize: '0.75rem', padding: '8px 12px', minHeight: 'auto' }}>X @CJP_2029 ↗</a>
            <a href="https://x.com/Cockroachisback" target="_blank" rel="noopener noreferrer" className="brutal-btn" style={{ fontSize: '0.75rem', padding: '8px 12px', minHeight: 'auto' }}>X Backup ↗</a>
            <a href="https://www.reddit.com/r/CockroachJantaParty/" target="_blank" rel="noopener noreferrer" className="brutal-btn" style={{ fontSize: '0.75rem', padding: '8px 12px', minHeight: 'auto' }}>Reddit ↗</a>
            <a href="https://x.com/abhijeet_dipke" target="_blank" rel="noopener noreferrer" className="brutal-btn" style={{ fontSize: '0.75rem', padding: '8px 12px', minHeight: 'auto' }}>{hi ? 'संस्थापक' : 'Founder'} ↗</a>
          </div>
          <p style={{ fontSize: '0.7rem', opacity: 0.5, marginTop: '8px' }}>
            {hi
              ? '⚠️ कई डोमेन "आधिकारिक" होने का दावा करते हैं। Instagram @cockroachjanata.india और X @CJP_2029 मुख्यधारा मीडिया (Reuters, AP, Al Jazeera) में उद्धृत हैं।'
              : '⚠️ Multiple domains claim to be "official." Instagram @cockroachjanata.india and X @CJP_2029 are cited in mainstream media (Reuters, AP, Al Jazeera).'}
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="situation-actions">
          <Link href="/expect" className="brutal-btn brutal-btn-primary">
            {hi ? 'जा रहे हैं? तैयारी करें →' : "Going? Prepare →"}
          </Link>
          <Link href="/safety" className="brutal-btn">
            {hi ? 'अधिकार कार्ड →' : 'Rights Card →'}
          </Link>
          <Link href="/map" className="brutal-btn">
            {hi ? 'सभी अभियान →' : 'All Campaigns →'}
          </Link>
        </div>
      </div>
    </section>
  );
}
