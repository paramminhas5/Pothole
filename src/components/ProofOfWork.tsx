'use client';

import { useState } from 'react';
import { Locale } from '@/types';
import { solveProofOfWork } from '@/lib/pow-solver';

interface Props { locale: Locale; onSolved: (challenge: string, nonce: number) => void; children: React.ReactNode }
export default function ProofOfWork({ locale, onSolved, children }: Props) {
  const [solved, setSolved] = useState(false); const [solving, setSolving] = useState(false); const [progress, setProgress] = useState(''); const [error, setError] = useState(''); const hi = locale === 'hi';
  async function start() { if (solving) return; setSolving(true); setError(''); setProgress(hi ? 'सुरक्षित जाँच शुरू हो रही है…' : 'Starting the safety check…'); try { const response = await fetch('/api/pow'); if (!response.ok) throw new Error('failed'); const { challenge, difficulty } = await response.json(); setProgress(hi ? 'जाँच चल रही है। इसमें कुछ सेकंड लग सकते हैं…' : 'Checking. This may take a few seconds…'); const { nonce } = await solveProofOfWork(challenge, difficulty); setSolved(true); onSolved(challenge, nonce); } catch { setError(hi ? 'जाँच पूरी नहीं हुई। अपना कनेक्शन देखें और फिर कोशिश करें।' : 'The check did not finish. Check your connection and try again.'); setSolving(false); } }
  if (solved) return <>{children}</>;
  return <section className="verification-card" aria-labelledby="verification-title" aria-live="polite"><p className="eyebrow">{hi ? 'पहला चरण' : 'First step'}</p><h2 id="verification-title">{hi ? 'एक छोटी स्पैम जाँच' : 'A quick spam check'}</h2><p>{hi ? 'यह जाँच आपके डिवाइस पर चलती है। हम इसके लिए नाम, ईमेल या फोन नहीं माँगते।' : 'This check runs on your device. We do not ask for your name, email, or phone.'}</p>{solving ? <div className="status-message" role="status"><span className="loading-dot" aria-hidden="true" />{progress}</div> : <button type="button" onClick={start} className="brutal-btn brutal-btn-primary brutal-btn-lg">{error ? (hi ? 'फिर कोशिश करें' : 'Try again') : (hi ? 'स्पैम जाँच शुरू करें' : 'Start spam check')}</button>}{error && <p className="error-message" role="alert">{error}</p>}</section>;
}
