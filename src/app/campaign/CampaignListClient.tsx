'use client';

import { useState, useEffect } from 'react';
import { PageShell, PageHeader } from '@/components/ui/PageShell';
import { CampaignCard } from '@/components/ui/CampaignCard';
import { FilterPanel } from '@/components/ui/FilterPanel';
import { Button } from '@/components/ui/Button';
import { EmptyState, LoadingState } from '@/components/ui/EmptyState';
import { StatBlock } from '@/components/ui/StatBlock';
import type { CampaignSummaryDTO } from '@/types/dto';
import Link from 'next/link';

export function CampaignListClient() {
  const [campaigns, setCampaigns] = useState<CampaignSummaryDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    loadCampaigns();
  }, [city, category]);

  async function loadCampaigns() {
    setLoading(true);
    const params = new URLSearchParams();
    if (city) params.set('city', city);
    if (category) params.set('category', category);
    params.set('status', 'live,escalating');

    const res = await fetch(`/api/campaign?${params}`);
    if (res.ok) {
      const data = await res.json();
      setCampaigns(data.campaigns);
    }
    setLoading(false);
  }

  const activeCampaigns = campaigns.filter(c => c.status === 'live' || c.status === 'escalating');
  const escalating = campaigns.filter(c => c.status === 'escalating');

  return (
    <PageShell>
      <PageHeader
        title="Active Campaigns"
        titleHi="सक्रिय अभियान"
        subtitle="Every campaign has a named target, a demand, and a deadline. Silence is counted."
        subtitleHi="हर अभियान में एक नामित लक्ष्य, एक माँग और एक समय सीमा है। मौन की गिनती होती है।"
        action={
          <Link href="/campaign/create">
            <Button variant="primary" size="lg">Start a Campaign</Button>
          </Link>
        }
      />

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <StatBlock value={activeCampaigns.length} label="Active" labelHi="सक्रिय" size="sm" />
        <StatBlock value={escalating.length} label="Escalating" labelHi="बढ़ रहे" size="sm" variant="danger" />
        <StatBlock
          value={campaigns.reduce((sum, c) => sum + c.supporterCount, 0)}
          label="Supporters" labelHi="समर्थक" size="sm" variant="accent"
        />
      </div>

      {/* Filters */}
      <FilterPanel title="Filter Campaigns" titleHi="अभियान फ़िल्टर करें" columns={3}>
        <div>
          <label className="text-xs font-bold uppercase tracking-wide text-[var(--ink-muted)] mb-1 block">City</label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full min-h-[var(--touch-min)] px-3 py-2 border-2 border-[var(--ink)] rounded-[var(--radius-md)] bg-[var(--paper-alt)] text-sm font-medium"
          >
            <option value="">All Cities</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Chennai">Chennai</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Pune">Pune</option>
            <option value="Jaipur">Jaipur</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wide text-[var(--ink-muted)] mb-1 block">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full min-h-[var(--touch-min)] px-3 py-2 border-2 border-[var(--ink)] rounded-[var(--radius-md)] bg-[var(--paper-alt)] text-sm font-medium"
          >
            <option value="">All Categories</option>
            <option value="infrastructure">Infrastructure</option>
            <option value="education">Education</option>
            <option value="environment">Environment</option>
            <option value="accountability">Accountability</option>
            <option value="welfare">Welfare</option>
            <option value="health">Health</option>
            <option value="governance">Governance</option>
          </select>
        </div>
        <div className="flex items-end">
          <Button variant="ghost" size="sm" onClick={() => { setCity(''); setCategory(''); }}>
            Clear Filters
          </Button>
        </div>
      </FilterPanel>

      {/* Campaign grid */}
      {loading ? (
        <LoadingState />
      ) : campaigns.length === 0 ? (
        <EmptyState
          icon="📢"
          title="No active campaigns yet"
          titleHi="अभी कोई सक्रिय अभियान नहीं"
          description="Be the first to start a campaign against an institutional failure in your city."
          descriptionHi="अपने शहर में संस्थागत विफलता के खिलाफ पहला अभियान शुरू करें।"
          action={
            <Link href="/campaign/create">
              <Button variant="primary">Start the First Campaign</Button>
            </Link>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {campaigns.map(campaign => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      )}
    </PageShell>
  );
}
