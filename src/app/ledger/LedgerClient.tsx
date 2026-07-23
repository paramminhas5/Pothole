'use client';

import { useState, useEffect } from 'react';
import { PageShell, PageHeader } from '@/components/ui/PageShell';
import { LedgerRow } from '@/components/ui/LedgerRow';
import { StatBlock } from '@/components/ui/StatBlock';
import { FilterPanel } from '@/components/ui/FilterPanel';
import { LoadingState, EmptyState } from '@/components/ui/EmptyState';
import type { LedgerEntryDTO } from '@/types/dto';

export function LedgerClient() {
  const [entries, setEntries] = useState<LedgerEntryDTO[]>([]);
  const [stats, setStats] = useState({ total: 0, silent: 0, responded: 0 });
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('');
  const [institution, setInstitution] = useState('');

  useEffect(() => { loadLedger(); }, [city, institution]);

  async function loadLedger() {
    setLoading(true);
    const params = new URLSearchParams();
    if (city) params.set('city', city);
    if (institution) params.set('institution', institution);

    const res = await fetch(`/api/ledger?${params}`);
    if (res.ok) {
      const data = await res.json();
      setEntries(data.entries);
      setStats(data.stats);
    }
    setLoading(false);
  }

  return (
    <PageShell size="full">
      <PageHeader
        title="Accountability Ledger"
        titleHi="जवाबदेही रजिस्टर"
        subtitle="Public record of demands, deadlines, and institutional silence. Every row is sourced."
        subtitleHi="माँगों, समय सीमाओं और संस्थागत मौन का सार्वजनिक रिकॉर्ड। हर पंक्ति स्रोत-सहित है।"
      />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <StatBlock value={stats.total} label="Total Demands" labelHi="कुल माँगें" size="sm" />
        <StatBlock value={stats.silent} label="Silent" labelHi="मौन" size="sm" variant="danger" />
        <StatBlock value={stats.responded} label="Responded" labelHi="उत्तर मिला" size="sm" variant="accent" />
      </div>

      {/* Filters */}
      <FilterPanel title="Filter" columns={2}>
        <div>
          <label className="text-xs font-bold uppercase text-[var(--ink-muted)] mb-1 block">City</label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full min-h-[var(--touch-min)] px-3 py-2 border-2 border-[var(--ink)] rounded-[var(--radius-md)] bg-[var(--paper-alt)] text-sm"
          >
            <option value="">All Cities</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Pune">Pune</option>
            <option value="Chennai">Chennai</option>
            <option value="Hyderabad">Hyderabad</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-bold uppercase text-[var(--ink-muted)] mb-1 block">Institution</label>
          <input
            type="text"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            placeholder="Search institution..."
            className="w-full min-h-[var(--touch-min)] px-3 py-2 border-2 border-[var(--ink)] rounded-[var(--radius-md)] bg-[var(--paper-alt)] text-sm"
          />
        </div>
      </FilterPanel>

      {/* Ledger table */}
      <div className="mt-6 border-2 border-[var(--ink)] rounded-[var(--radius-md)] bg-[var(--paper-alt)] overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-[1fr_auto] gap-4 px-4 py-3 border-b-2 border-[var(--ink)] bg-[var(--paper-dark)]">
          <span className="text-xs font-bold uppercase tracking-[var(--tracking-wider)] text-[var(--ink-muted)]">Demand → Institution</span>
          <span className="text-xs font-bold uppercase tracking-[var(--tracking-wider)] text-[var(--ink-muted)]">Days / Status</span>
        </div>

        {loading ? (
          <div className="p-8"><LoadingState /></div>
        ) : entries.length === 0 ? (
          <div className="p-8">
            <EmptyState
              icon="📋"
              title="No entries yet"
              description="The ledger will populate as campaigns file demands with documented evidence."
            />
          </div>
        ) : (
          entries.map(entry => (
            <LedgerRow key={entry.id} entry={entry} />
          ))
        )}
      </div>

      {/* Footer note */}
      <p className="mt-4 text-xs text-[var(--ink-muted)] font-[var(--font-mono)]">
        Every entry requires a filed document as source. No unsourced accusations. Institutions have a right-of-reply.
      </p>
    </PageShell>
  );
}
