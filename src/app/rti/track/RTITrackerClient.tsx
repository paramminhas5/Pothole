'use client';

import { useState, useEffect } from 'react';
import { PageShell, PageHeader } from '@/components/ui/PageShell';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DeadlineClock } from '@/components/ui/DeadlineClock';
import { ShareCardButton } from '@/components/ui/ShareCardButton';
import { LoadingState, EmptyState } from '@/components/ui/EmptyState';
import type { RTIFilingSummaryDTO } from '@/types/dto';
import Link from 'next/link';

export function RTITrackerClient() {
  const [filings, setFilings] = useState<RTIFilingSummaryDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/rti')
      .then(r => r.ok ? r.json() : { filings: [] })
      .then(d => setFilings(d.filings || []))
      .finally(() => setLoading(false));
  }, []);

  async function escalate(id: string) {
    const res = await fetch(`/api/rti/${id}/escalate`, { method: 'POST' });
    if (res.ok) {
      const data = await res.json();
      // Refresh list
      const updated = await fetch('/api/rti');
      if (updated.ok) {
        const d = await updated.json();
        setFilings(d.filings || []);
      }
      // Download generated document
      if (data.document) {
        const blob = new Blob([data.document.content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${data.document.type}-${Date.now()}.txt`;
        a.click();
        URL.revokeObjectURL(url);
      }
    }
  }

  const statusConfig: Record<string, { label: string; variant: 'saffron' | 'red' | 'lime' | 'purple' | 'yellow' }> = {
    filed: { label: 'FILED', variant: 'saffron' },
    awaiting: { label: 'AWAITING', variant: 'yellow' },
    first_appeal: { label: 'APPEAL FILED', variant: 'red' },
    second_appeal: { label: '2ND APPEAL', variant: 'red' },
    ic_complaint: { label: 'IC COMPLAINT', variant: 'purple' },
    responded: { label: 'RESPONDED', variant: 'lime' },
    penalty_ordered: { label: 'PENALTY ORDERED', variant: 'lime' },
    closed: { label: 'CLOSED', variant: 'purple' },
  };

  return (
    <PageShell size="md">
      <PageHeader
        title="RTI Tracker"
        titleHi="RTI ट्रैकर"
        subtitle="Track deadlines. Auto-escalate. Generate appeals. Every silence costs them ₹250/day."
        subtitleHi="समय सीमा ट्रैक करें। ऑटो-एस्केलेट करें। अपील बनाएं। हर मौन पर ₹250/दिन।"
        action={
          <Link href="/rti">
            <Button variant="primary">File New RTI</Button>
          </Link>
        }
      />

      {loading ? (
        <LoadingState />
      ) : filings.length === 0 ? (
        <EmptyState
          icon="📄"
          title="No RTI filings yet"
          titleHi="अभी कोई RTI नहीं"
          description="File your first RTI and track it here. We'll remind you when the deadline passes."
          descriptionHi="अपनी पहली RTI दायर करें और यहाँ ट्रैक करें। समय सीमा पर हम याद दिलाएंगे।"
          action={
            <Link href="/rti"><Button variant="primary">Generate RTI</Button></Link>
          }
        />
      ) : (
        <div className="space-y-4">
          {filings.map(filing => {
            const config = statusConfig[filing.status] || statusConfig.filed;
            const isOverdue = filing.daysUntilDeadline < 0;
            const canEscalate = isOverdue && filing.status !== 'ic_complaint' && filing.status !== 'responded';

            return (
              <Card key={filing.id} variant={isOverdue ? 'urgent' : 'default'}>
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex gap-2 mb-2">
                      <Badge variant={config.variant} size="sm">{config.label}</Badge>
                      {filing.campaignId && <Badge variant="ghost" size="sm">Campaign linked</Badge>}
                    </div>
                    <h3 className="font-bold text-sm truncate">{filing.subject}</h3>
                    <p className="text-xs text-[var(--ink-muted)] mt-1">→ {filing.authorityName}</p>
                    <p className="text-xs font-[var(--font-mono)] text-[var(--ink-muted)] mt-1">
                      Filed: {filing.filedDate} · Deadline: {filing.deadlineDate}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <DeadlineClock
                      deadline={filing.deadlineDate}
                      filedDate={filing.filedDate}
                      size="sm"
                      showPenalty={isOverdue}
                    />
                  </div>
                </div>

                {/* Actions */}
                {canEscalate && (
                  <div className="flex gap-2 mt-4 pt-3 border-t border-dashed border-[var(--ink-faint)]">
                    <Button variant="danger" size="sm" onClick={() => escalate(filing.id)}>
                      {filing.status === 'first_appeal' ? 'File IC Complaint' : 'File First Appeal'}
                    </Button>
                    <ShareCardButton
                      title={`RTI Silence: ${filing.subject}`}
                      text={`Day ${Math.abs(filing.daysUntilDeadline)}. ${filing.authorityName} has not responded. Penalty: ₹${Math.abs(filing.daysUntilDeadline) * 250}`}
                      url={typeof window !== 'undefined' ? window.location.href : ''}
                    />
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </PageShell>
  );
}
