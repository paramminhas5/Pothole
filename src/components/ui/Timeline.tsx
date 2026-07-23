'use client';

interface TimelineEvent {
  date: string;
  title: string;
  titleHi?: string;
  description?: string;
  type?: 'action' | 'response' | 'escalation' | 'outcome' | 'default';
}

interface TimelineProps {
  events: TimelineEvent[];
  locale?: 'en' | 'hi';
}

const typeColors: Record<string, string> = {
  action: 'bg-[var(--saffron)]',
  response: 'bg-[var(--lime)]',
  escalation: 'bg-[var(--red)]',
  outcome: 'bg-[var(--purple)]',
  default: 'bg-[var(--ink)]',
};

export function Timeline({ events, locale = 'en' }: TimelineProps) {
  return (
    <div className="relative pl-6">
      {/* Vertical line */}
      <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-[var(--paper-dark)]" />

      {events.map((event, i) => (
        <div key={i} className="relative pb-5 last:pb-0">
          {/* Dot */}
          <div className={[
            'absolute left-[-19px] top-1.5 w-4 h-4 rounded-full border-2 border-[var(--paper)]',
            typeColors[event.type || 'default'],
          ].join(' ')} />

          {/* Content */}
          <div>
            <time className="text-[11px] font-[var(--font-mono)] font-bold text-[var(--ink-muted)] uppercase">
              {event.date}
            </time>
            <p className="text-sm font-bold mt-0.5">
              {locale === 'hi' && event.titleHi ? event.titleHi : event.title}
            </p>
            {event.description && (
              <p className="text-xs text-[var(--ink-muted)] mt-0.5">{event.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Timeline;
