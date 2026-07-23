'use client';

import Link from 'next/link';
import { Locale } from '@/types';

interface SituationProps {
  locale: Locale;
}

export default function SituationBrief({ locale }: SituationProps) {
  const hi = locale === 'hi';

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
            <span className="demand-score-number">5</span>
            <span className="demand-score-label">{hi ? 'माँगें' : 'Demands'}</span>
          </div>
          <div className="demand-score demand-score-red">
            <span className="demand-score-number">0</span>
            <span className="demand-score-label">{hi ? 'पूरी' : 'Met'}</span>
          </div>
          <div className="demand-score">
            <span className="demand-score-number">34</span>
            <span className="demand-score-label">{hi ? 'दिन' : 'Days'}</span>
          </div>
          <div className="demand-score">
            <span className="demand-score-number">47</span>
            <span className="demand-score-label">{hi ? 'RTI दाखिल' : 'RTIs Filed'}</span>
          </div>
        </div>

        {/* SAFETY STATUS */}
        <div className="situation-safety">
          <div className="safety-indicator safety-warning">
            <strong>{hi ? '⚠️ सुरक्षा:' : '⚠️ Safety:'}</strong>
            <span>
              {hi
                ? 'धारा 163 BNSS — मध्य दिल्ली में 5+ व्यक्ति एकत्रित नहीं। भारी पुलिस तैनाती। CRPF मौजूद।'
                : 'Section 163 BNSS — 5+ persons cannot gather in Central Delhi. Heavy police deployment. CRPF present.'}
            </span>
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
