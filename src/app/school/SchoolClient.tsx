'use client';

import { useState, useEffect } from 'react';
import { PageShell, PageHeader } from '@/components/ui/PageShell';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { StatBlock } from '@/components/ui/StatBlock';
import { LoadingState } from '@/components/ui/EmptyState';
import type { SchoolTrackDTO } from '@/types/dto';
import Link from 'next/link';

export function SchoolClient() {
  const [tracks, setTracks] = useState<Array<SchoolTrackDTO & { enrollment?: { status: string; progress_pct: number } }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/school?progress=true')
      .then(r => r.json())
      .then(d => setTracks(d.tracks || []))
      .finally(() => setLoading(false));
  }, []);

  const difficultyColors: Record<string, 'lime' | 'yellow' | 'red'> = {
    beginner: 'lime',
    intermediate: 'yellow',
    advanced: 'red',
  };

  return (
    <PageShell>
      <PageHeader
        title="Power School"
        titleHi="पावर स्कूल"
        subtitle="Learn how Indian power actually works. Complete field assignments. Build a verifiable civic record."
        subtitleHi="भारतीय सत्ता वास्तव में कैसे काम करती है सीखें। फील्ड असाइनमेंट पूरे करें। सत्यापन योग्य रिकॉर्ड बनाएं।"
      />

      {/* Value proposition */}
      <Card variant="accent" padding="md">
        <div className="grid sm:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold">📚</p>
            <p className="text-sm font-bold mt-1">Learn</p>
            <p className="text-xs text-[var(--ink-muted)]">Short text-first lessons, EN/HI</p>
          </div>
          <div>
            <p className="text-2xl font-bold">🏃</p>
            <p className="text-sm font-bold mt-1">Do</p>
            <p className="text-xs text-[var(--ink-muted)]">Real field assignments, not quizzes</p>
          </div>
          <div>
            <p className="text-2xl font-bold">✅</p>
            <p className="text-sm font-bold mt-1">Prove</p>
            <p className="text-xs text-[var(--ink-muted)]">Verified on your civic profile</p>
          </div>
        </div>
      </Card>

      {/* Tracks */}
      {loading ? <LoadingState /> : (
        <div className="grid gap-4 mt-8 sm:grid-cols-2">
          {tracks.map(track => {
            const enrolled = !!track.enrollment;
            const completed = track.enrollment?.status === 'completed';

            return (
              <Card key={track.id} hoverable variant={completed ? 'flat' : 'default'}>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <Badge variant={difficultyColors[track.difficulty] || 'ghost'} size="sm">
                    {track.difficulty}
                  </Badge>
                  {completed && <Badge variant="purple" size="sm">COMPLETED</Badge>}
                  {enrolled && !completed && (
                    <span className="text-xs font-[var(--font-mono)] font-bold text-[var(--saffron)]">
                      {track.enrollment?.progress_pct || 0}%
                    </span>
                  )}
                </div>

                <h3 className="font-[var(--font-display)] text-lg font-bold mb-1">{track.title}</h3>
                <p className="text-sm text-[var(--ink-muted)] mb-3 line-clamp-2">{track.description}</p>

                <div className="flex items-center gap-3 text-[11px] font-[var(--font-mono)] text-[var(--ink-muted)] mb-4">
                  <span>{track.estimatedHours}h</span>
                  <span>{track.lessonCount} lessons</span>
                  <span>{track.fieldAssignmentCount} assignments</span>
                </div>

                {/* Progress bar */}
                {enrolled && !completed && (
                  <div className="h-1.5 bg-[var(--paper-dark)] rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full bg-[var(--saffron)] transition-all"
                      style={{ width: `${track.enrollment?.progress_pct || 0}%` }}
                    />
                  </div>
                )}

                <Link href={`/school/${track.slug}`}>
                  <Button variant={enrolled ? 'primary' : 'outline'} size="sm" fullWidth>
                    {completed ? 'Review' : enrolled ? 'Continue' : 'Start Track'}
                  </Button>
                </Link>
              </Card>
            );
          })}
        </div>
      )}
    </PageShell>
  );
}
