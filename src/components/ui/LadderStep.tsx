'use client';

interface Step {
  label: string;
  labelHi?: string;
  status: 'completed' | 'current' | 'upcoming';
  date?: string;
}

interface LadderStepProps {
  steps: Step[];
  locale?: 'en' | 'hi';
}

export function LadderStep({ steps, locale = 'en' }: LadderStepProps) {
  return (
    <div className="relative">
      {steps.map((step, i) => (
        <div key={i} className="relative flex gap-4 pb-6 last:pb-0">
          {/* Connector line */}
          {i < steps.length - 1 && (
            <div className={[
              'absolute left-[15px] top-[32px] bottom-0 w-[3px]',
              step.status === 'completed' ? 'bg-[var(--saffron)]' : 'bg-[var(--paper-dark)]',
            ].join(' ')} />
          )}

          {/* Step marker */}
          <div className={[
            'relative z-10 flex-shrink-0 w-8 h-8 rounded-full border-[3px] flex items-center justify-center',
            'font-[var(--font-mono)] text-xs font-bold',
            step.status === 'completed' ? 'bg-[var(--saffron)] border-[var(--ink)] text-[var(--ink)]' : '',
            step.status === 'current' ? 'bg-[var(--paper)] border-[var(--saffron)] text-[var(--saffron)] shadow-[0_0_0_3px_var(--saffron-light)]' : '',
            step.status === 'upcoming' ? 'bg-[var(--paper-dark)] border-[var(--ink-faint)] text-[var(--ink-faint)]' : '',
          ].join(' ')}>
            {step.status === 'completed' ? '✓' : i + 1}
          </div>

          {/* Step content */}
          <div className="flex-1 min-w-0 pt-1">
            <p className={[
              'text-sm font-bold leading-snug',
              step.status === 'current' ? 'text-[var(--saffron)]' : '',
              step.status === 'upcoming' ? 'text-[var(--ink-muted)]' : '',
            ].join(' ')}>
              {locale === 'hi' && step.labelHi ? step.labelHi : step.label}
            </p>
            {step.date && (
              <p className="text-xs font-[var(--font-mono)] text-[var(--ink-muted)] mt-0.5">
                {step.date}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default LadderStep;
