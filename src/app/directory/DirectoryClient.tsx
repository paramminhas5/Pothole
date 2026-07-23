'use client';

import { useState, useEffect } from 'react';
import { PageShell, PageHeader } from '@/components/ui/PageShell';
import { Card } from '@/components/ui/Card';
import { FilterPanel } from '@/components/ui/FilterPanel';
import { VerificationBadge } from '@/components/ui/VerificationBadge';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { LoadingState, EmptyState } from '@/components/ui/EmptyState';
import type { DirectoryEntryDTO } from '@/types/dto';
import type { VerificationStatus } from '@/types/database';

export function DirectoryClient() {
  const [entries, setEntries] = useState<DirectoryEntryDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('');
  const [type, setType] = useState('');

  useEffect(() => { loadDirectory(); }, [city, type]);

  async function loadDirectory() {
    setLoading(true);
    const params = new URLSearchParams();
    if (city) params.set('city', city);
    if (type) params.set('type', type);

    const res = await fetch(`/api/directory?${params}`);
    if (res.ok) {
      const data = await res.json();
      setEntries(data.entries);
    }
    setLoading(false);
  }

  return (
    <PageShell>
      <PageHeader
        title="Support Directory"
        titleHi="सहायता निर्देशिका"
        subtitle="Verified organizations, lawyers, and helplines. Each entry states what was verified and by whom."
        subtitleHi="सत्यापित संगठन, वकील और हेल्पलाइन। हर प्रविष्टि बताती है कि क्या सत्यापित किया गया।"
        action={<Button variant="outline">Submit Entry</Button>}
      />

      <FilterPanel title="Filter" columns={2}>
        <div>
          <label className="text-xs font-bold uppercase text-[var(--ink-muted)] mb-1 block">City</label>
          <select value={city} onChange={e => setCity(e.target.value)}
            className="w-full min-h-[var(--touch-min)] px-3 py-2 border-2 border-[var(--ink)] rounded-[var(--radius-md)] bg-[var(--paper-alt)] text-sm">
            <option value="">All Cities</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="National">National</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-bold uppercase text-[var(--ink-muted)] mb-1 block">Type</label>
          <select value={type} onChange={e => setType(e.target.value)}
            className="w-full min-h-[var(--touch-min)] px-3 py-2 border-2 border-[var(--ink)] rounded-[var(--radius-md)] bg-[var(--paper-alt)] text-sm">
            <option value="">All Types</option>
            <option value="legal-aid">Legal Aid</option>
            <option value="helpline">Helpline</option>
            <option value="ngo">NGO</option>
            <option value="lawyer">Lawyer</option>
            <option value="mental-health">Mental Health</option>
            <option value="shelter">Shelter</option>
          </select>
        </div>
      </FilterPanel>

      {loading ? <LoadingState /> : entries.length === 0 ? (
        <EmptyState icon="📇" title="No entries found" description="Try different filters or submit a new entry." />
      ) : (
        <div className="grid gap-3 mt-6 sm:grid-cols-2">
          {entries.map(entry => (
            <Card key={entry.id} padding="md">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-bold text-sm">{entry.name}</h3>
                <VerificationBadge status={entry.verificationStatus as VerificationStatus} verifiedWhat={entry.verifiedWhat} />
              </div>
              <div className="flex flex-wrap gap-1 mb-2">
                <Badge variant="ghost" size="sm">{entry.type}</Badge>
                <Badge variant="ghost" size="sm">{entry.city}</Badge>
                {entry.specializations.slice(0, 2).map(s => (
                  <Badge key={s} variant="purple" size="sm">{s}</Badge>
                ))}
              </div>
              <p className="text-xs text-[var(--ink-muted)] line-clamp-2 mb-2">{entry.description}</p>
              {entry.campaignAffiliations.length > 0 && (
                <p className="text-xs text-[var(--saffron)] font-bold">
                  Linked to {entry.campaignAffiliations.length} campaign(s)
                </p>
              )}
              <div className="mt-3 pt-2 border-t border-dashed border-[var(--ink-faint)]">
                <a href={entry.contactMethod} className="text-xs font-bold text-[var(--saffron)]" target="_blank" rel="noopener">
                  Contact →
                </a>
              </div>
            </Card>
          ))}
        </div>
      )}
    </PageShell>
  );
}
