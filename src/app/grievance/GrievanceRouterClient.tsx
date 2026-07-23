'use client';

import { useState } from 'react';
import { PageShell, PageHeader } from '@/components/ui/PageShell';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { routeGrievance, type GrievanceCategory, type GrievanceInput, type GrievanceRoute } from '@/lib/grievance-router';
import Link from 'next/link';

type Step = 'what' | 'where' | 'who' | 'proof' | 'results';

export function GrievanceRouterClient() {
  const [step, setStep] = useState<Step>('what');
  const [input, setInput] = useState<Partial<GrievanceInput>>({});
  const [routes, setRoutes] = useState<GrievanceRoute[]>([]);

  function selectWhat(what: GrievanceCategory) {
    setInput(prev => ({ ...prev, whatHappened: what }));
    setStep('where');
  }

  function selectWhere(where: string) {
    setInput(prev => ({ ...prev, where }));
    setStep('who');
  }

  function selectWho(who: GrievanceInput['whoResponsible']) {
    setInput(prev => ({ ...prev, whoResponsible: who }));
    setStep('proof');
  }

  function selectProof(hasProof: boolean) {
    const fullInput: GrievanceInput = {
      whatHappened: input.whatHappened || 'other',
      where: input.where || '',
      whoResponsible: input.whoResponsible || 'unknown',
      hasProof,
    };
    setInput(fullInput);
    setRoutes(routeGrievance(fullInput));
    setStep('results');
  }

  function restart() {
    setStep('what');
    setInput({});
    setRoutes([]);
  }

  const categories: Array<{ value: GrievanceCategory; label: string; icon: string }> = [
    { value: 'corruption', label: 'Corruption / Bribery', icon: '💰' },
    { value: 'negligence', label: 'Negligence (roads, water, sanitation)', icon: '🚧' },
    { value: 'harassment', label: 'Harassment / Threat', icon: '⚠️' },
    { value: 'denial_of_service', label: 'Denied a service / benefit', icon: '🚫' },
    { value: 'environmental', label: 'Environmental damage', icon: '🏭' },
    { value: 'discrimination', label: 'Discrimination', icon: '✋' },
    { value: 'educational', label: 'Education institution issue', icon: '🎓' },
    { value: 'consumer', label: 'Consumer / product issue', icon: '🛒' },
    { value: 'police', label: 'Police inaction / excess', icon: '🚔' },
    { value: 'other', label: 'Something else', icon: '❓' },
  ];

  return (
    <PageShell size="sm">
      <PageHeader
        title="What happened?"
        titleHi="क्या हुआ?"
        subtitle="Answer 4 questions. We'll tell you exactly which civic instrument to use."
        subtitleHi="4 सवालों का जवाब दें। हम बताएंगे कि कौन सा नागरिक साधन इस्तेमाल करें।"
      />

      {/* Progress */}
      <div className="flex gap-1 mb-8">
        {(['what', 'where', 'who', 'proof', 'results'] as Step[]).map((s, i) => (
          <div key={s} className={[
            'flex-1 h-2 rounded-full',
            i <= ['what', 'where', 'who', 'proof', 'results'].indexOf(step)
              ? 'bg-[var(--saffron)]' : 'bg-[var(--paper-dark)]',
          ].join(' ')} />
        ))}
      </div>

      {/* Step 1: What happened */}
      {step === 'what' && (
        <div className="grid gap-2">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => selectWhat(cat.value)}
              className="flex items-center gap-3 p-4 text-left border-2 border-[var(--ink)] rounded-[var(--radius-md)] bg-[var(--paper-alt)] hover:shadow-[var(--shadow-sm)] transition-shadow min-h-[var(--touch-min)]"
            >
              <span className="text-xl">{cat.icon}</span>
              <span className="text-sm font-bold">{cat.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Step 2: Where */}
      {step === 'where' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Where did this happen?</h2>
          <div className="grid gap-2 grid-cols-2">
            {['Delhi', 'Mumbai', 'Bengaluru', 'Pune', 'Chennai', 'Hyderabad', 'Kolkata', 'Jaipur', 'Lucknow', 'Other'].map(c => (
              <button
                key={c}
                onClick={() => selectWhere(c)}
                className="p-3 text-sm font-bold border-2 border-[var(--ink)] rounded-[var(--radius-md)] bg-[var(--paper-alt)] hover:bg-[var(--saffron-light)] min-h-[var(--touch-min)]"
              >
                {c}
              </button>
            ))}
          </div>
          <Button variant="ghost" onClick={() => setStep('what')}>Back</Button>
        </div>
      )}

      {/* Step 3: Who is responsible */}
      {step === 'who' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Who is responsible?</h2>
          {([
            { value: 'government', label: 'Government body / office' },
            { value: 'police', label: 'Police' },
            { value: 'private_company', label: 'Private company' },
            { value: 'educational_institution', label: 'Educational institution' },
            { value: 'unknown', label: "I don't know" },
          ] as const).map(opt => (
            <button
              key={opt.value}
              onClick={() => selectWho(opt.value)}
              className="w-full p-4 text-left text-sm font-bold border-2 border-[var(--ink)] rounded-[var(--radius-md)] bg-[var(--paper-alt)] hover:shadow-[var(--shadow-sm)] min-h-[var(--touch-min)]"
            >
              {opt.label}
            </button>
          ))}
          <Button variant="ghost" onClick={() => setStep('where')}>Back</Button>
        </div>
      )}

      {/* Step 4: Proof */}
      {step === 'proof' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Do you have proof?</h2>
          <p className="text-sm text-[var(--ink-muted)]">Photos, documents, witnesses, receipts, recordings, screenshots — anything that supports your claim.</p>
          <div className="grid gap-3 grid-cols-2">
            <Button variant="primary" size="lg" onClick={() => selectProof(true)}>Yes, I have proof</Button>
            <Button variant="outline" size="lg" onClick={() => selectProof(false)}>No proof yet</Button>
          </div>
          <Button variant="ghost" onClick={() => setStep('who')}>Back</Button>
        </div>
      )}

      {/* Results */}
      {step === 'results' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Your options (ranked by effort/odds)</h2>
          {routes.map((route, i) => (
            <Card key={i} variant={i === 0 ? 'accent' : 'default'} padding="md">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-bold">{route.title}</h3>
                <div className="flex gap-1">
                  <Badge variant={route.effort === 'low' ? 'lime' : route.effort === 'medium' ? 'yellow' : 'red'} size="sm">
                    {route.effort}
                  </Badge>
                  <Badge variant="ghost" size="sm" mono>~{route.estimatedDays}d</Badge>
                </div>
              </div>
              <p className="text-sm text-[var(--ink-muted)] mb-3">{route.description}</p>
              <p className="text-sm font-bold text-[var(--saffron)]">→ {route.nextStep}</p>
              <Link href={route.link} className="mt-3 inline-block">
                <Button variant={i === 0 ? 'primary' : 'outline'} size="sm">
                  Start this route
                </Button>
              </Link>
            </Card>
          ))}
          <Button variant="ghost" onClick={restart} fullWidth>Start over</Button>
        </div>
      )}
    </PageShell>
  );
}
