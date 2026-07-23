'use client';

import { useState, useEffect } from 'react';
import { PageShell } from '@/components/ui/PageShell';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Stamp } from '@/components/ui/Stamp';
import { DeadlineClock } from '@/components/ui/DeadlineClock';
import { LadderStep } from '@/components/ui/LadderStep';
import { StatBlock } from '@/components/ui/StatBlock';
import { Timeline } from '@/components/ui/Timeline';
import { ShareCardButton } from '@/components/ui/ShareCardButton';
import { LoadingState, ErrorState } from '@/components/ui/EmptyState';
import type { CampaignDetailDTO } from '@/types/dto';

export function CampaignDetailClient({ slug }: { slug: string }) {
  const [campaign, setCampaign] = useState<CampaignDetailDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/campaign/${slug}`)
      .then(r => r.ok ? r.json() : Promise.reject('Not found'))
      .then(d => setCampaign(d.campaign))
      .catch(() => setError('Campaign not found'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <PageShell><LoadingState /></PageShell>;
  if (error || !campaign) return <PageShell><ErrorState message={error} /></PageShell>;

  const isActive = campaign.status === 'live' || campaign.status === 'escalating';

  return (
    <PageShell size="lg">
      <div className="pt-8 pb-12">
        {/* Header */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant={campaign.status === 'escalating' ? 'red' : campaign.status === 'live' ? 'saffron' : 'lime'}>
            {campaign.status.replace('concluded_', '').toUpperCase()}
          </Badge>
          <Badge variant="ghost">{campaign.category}</Badge>
          <Badge variant="ghost" mono>{campaign.city}</Badge>
        </div>

        <h1 className="font-[var(--font-display)] text-3xl sm:text-4xl font-black tracking-[var(--tracking-tight)] leading-[var(--leading-tight)] mb-4">
          {campaign.title}
        </h1>

        <p className="text-lg text-[var(--ink-muted)] mb-6">
          {campaign.issueStatement}
        </p>

        {/* Target & Demand hero card */}
        <Card variant="accent" padding="lg">
          <div className="grid sm:grid-cols-[1fr_auto] gap-6">
            <div>
              <div className="mb-4">
                <p className="text-xs font-bold uppercase tracking-[var(--tracking-wider)] text-[var(--ink-muted)]">Target</p>
                <p className="text-lg font-bold">→ {campaign.targetInstitution}</p>
                {campaign.targetJurisdiction && <p className="text-sm text-[var(--ink-muted)]">{campaign.targetJurisdiction}</p>}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[var(--tracking-wider)] text-[var(--ink-muted)]">Demand</p>
                <p className="text-base font-bold">{campaign.primaryDemand}</p>
              </div>
            </div>
            {isActive && (
              <div className="flex-shrink-0">
                <DeadlineClock deadline={campaign.deadline} filedDate={campaign.createdAt} size="lg" showPenalty />
              </div>
            )}
          </div>
        </Card>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-3 mt-6">
          <StatBlock value={campaign.supporterCount} label="Supporters" size="sm" />
          <StatBlock value={campaign.filingCount} label="RTIs Filed" size="sm" />
          <StatBlock value={campaign.taskCount} label="Tasks" size="sm" />
          <StatBlock value={campaign.daysElapsed} label="Days Active" size="sm" variant="accent" />
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3 mt-6">
          <Button variant="primary" size="lg">Support This Campaign</Button>
          <ShareCardButton
            title={campaign.title}
            text={`${campaign.primaryDemand} — Campaign targeting ${campaign.targetInstitution}`}
            url={`${typeof window !== 'undefined' ? window.location.origin : ''}/campaign/${slug}`}
          />
        </div>

        {/* Escalation Ladder */}
        {campaign.escalationPlan.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">Escalation Path</h2>
            <LadderStep steps={campaign.escalationPlan.map(s => ({
              label: s.action,
              labelHi: s.actionHi,
              status: s.status === 'completed' ? 'completed' : s.status === 'current' ? 'current' : 'upcoming',
            }))} />
          </div>
        )}

        {/* Team */}
        {campaign.team.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">Team</h2>
            <div className="flex flex-wrap gap-2">
              {campaign.team.map(member => (
                <div key={member.identityId} className="flex items-center gap-2 px-3 py-2 border-2 border-[var(--ink)] rounded-[var(--radius-md)] bg-[var(--paper-alt)]">
                  <div className="w-7 h-7 rounded-full bg-[var(--purple)] text-white flex items-center justify-center text-xs font-bold">
                    {member.displayName.charAt(0)}
                  </div>
                  <span className="text-sm font-bold">{member.displayName}</span>
                  <Stamp variant="verified" label={member.role.toUpperCase()} size="sm" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Updates timeline */}
        {campaign.recentUpdates.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">Updates</h2>
            <Timeline events={campaign.recentUpdates.map(u => ({
              date: new Date(u.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
              title: u.title,
              titleHi: u.titleHi,
              type: u.updateType === 'escalation' ? 'escalation' : u.updateType === 'response_received' ? 'response' : u.updateType === 'outcome' ? 'outcome' : 'action',
            }))} />
          </div>
        )}

        {/* Connected sections */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Card hoverable>
            <h3 className="font-bold mb-1">RTI Filings</h3>
            <p className="text-sm text-[var(--ink-muted)]">{campaign.filingCount} RTIs filed for this campaign</p>
            <p className="text-xs text-[var(--saffron)] font-bold mt-2">View all filings →</p>
          </Card>
          <Card hoverable>
            <h3 className="font-bold mb-1">Skills Needed</h3>
            <p className="text-sm text-[var(--ink-muted)]">This campaign needs help from volunteers</p>
            <p className="text-xs text-[var(--saffron)] font-bold mt-2">Offer your skills →</p>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}
