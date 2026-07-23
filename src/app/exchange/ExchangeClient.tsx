'use client';

import { useState, useEffect } from 'react';
import { PageShell, PageHeader } from '@/components/ui/PageShell';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SkillTag } from '@/components/ui/SkillTag';
import { LoadingState, EmptyState } from '@/components/ui/EmptyState';
import type { SkillExchangeDTO } from '@/types/dto';
import type { SkillType } from '@/types/database';
import Link from 'next/link';

export function ExchangeClient() {
  const [exchanges, setExchanges] = useState<SkillExchangeDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState<'need' | 'offer' | ''>('');
  const [skillFilter, setSkillFilter] = useState('');

  useEffect(() => { loadExchanges(); }, [typeFilter, skillFilter]);

  async function loadExchanges() {
    setLoading(true);
    const params = new URLSearchParams();
    if (typeFilter) params.set('type', typeFilter);
    if (skillFilter) params.set('skillType', skillFilter);

    const res = await fetch(`/api/exchange?${params}`);
    if (res.ok) {
      const data = await res.json();
      setExchanges(data.exchanges);
    }
    setLoading(false);
  }

  const skills: SkillType[] = ['legal', 'design', 'translation', 'photography', 'writing', 'research', 'field_volunteer', 'tech', 'medical', 'media'];

  return (
    <PageShell>
      <PageHeader
        title="Skill Exchange"
        titleHi="कौशल एक्सचेंज"
        subtitle="Campaigns need skills. People have skills. Every exchange is anchored to a campaign."
        subtitleHi="अभियानों को कौशल चाहिए। लोगों के पास कौशल है। हर एक्सचेंज एक अभियान से जुड़ा है।"
        action={<Button variant="primary">Offer My Skills</Button>}
      />

      {/* Type toggle */}
      <div className="flex gap-2 mb-4">
        <Button variant={typeFilter === '' ? 'dark' : 'ghost'} size="sm" onClick={() => setTypeFilter('')}>All</Button>
        <Button variant={typeFilter === 'need' ? 'dark' : 'ghost'} size="sm" onClick={() => setTypeFilter('need')}>Campaigns Need</Button>
        <Button variant={typeFilter === 'offer' ? 'dark' : 'ghost'} size="sm" onClick={() => setTypeFilter('offer')}>People Offer</Button>
      </div>

      {/* Skill filter */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        <SkillTag skill="other" locale="en" showIcon={false} selected={!skillFilter} onClick={() => setSkillFilter('')} />
        {skills.map(s => (
          <SkillTag key={s} skill={s} selected={skillFilter === s} onClick={() => setSkillFilter(s === skillFilter ? '' : s)} />
        ))}
      </div>

      {loading ? <LoadingState /> : exchanges.length === 0 ? (
        <EmptyState icon="🤝" title="No exchanges yet" description="Start a campaign first, then post skill needs here." />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {exchanges.map(ex => (
            <Card key={ex.id} variant={ex.type === 'need' ? 'urgent' : 'default'} padding="md">
              <div className="flex items-start justify-between gap-2 mb-2">
                <Badge variant={ex.type === 'need' ? 'red' : 'lime'} size="sm">
                  {ex.type === 'need' ? 'NEEDED' : 'OFFERED'}
                </Badge>
                <SkillTag skill={ex.skillType as SkillType} />
              </div>
              <h3 className="font-bold text-sm mb-1">{ex.title}</h3>
              <p className="text-xs text-[var(--ink-muted)] line-clamp-2 mb-2">{ex.description}</p>
              {ex.campaignTitle && (
                <Link href={`/campaign/${ex.campaignId}`} className="text-xs text-[var(--saffron)] font-bold">
                  ⚡ {ex.campaignTitle}
                </Link>
              )}
              <div className="flex items-center gap-2 mt-2 text-[10px] font-[var(--font-mono)] text-[var(--ink-muted)]">
                <span>{ex.city}</span>
                <span>·</span>
                <span>{ex.urgency}</span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </PageShell>
  );
}
