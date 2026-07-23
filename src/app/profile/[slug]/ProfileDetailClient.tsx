'use client';

import { useState, useEffect } from 'react';
import { PageShell } from '@/components/ui/PageShell';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { StatBlock } from '@/components/ui/StatBlock';
import { CampaignCard } from '@/components/ui/CampaignCard';
import { VerificationBadge } from '@/components/ui/VerificationBadge';
import { LoadingState, ErrorState } from '@/components/ui/EmptyState';
import type { CivicProfileDTO } from '@/types/dto';

export function ProfileDetailClient({ slug }: { slug: string }) {
  const [profile, setProfile] = useState<CivicProfileDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/profile/${slug}`)
      .then(r => r.ok ? r.json() : Promise.reject('Not found'))
      .then(d => setProfile(d.profile))
      .catch(() => setError('Profile not found'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <PageShell><LoadingState /></PageShell>;
  if (error || !profile) return <PageShell><ErrorState message={error} /></PageShell>;

  return (
    <PageShell size="md">
      <div className="pt-8 pb-12">
        {/* Header */}
        <div className="flex items-start gap-5 mb-8">
          <div className="w-20 h-20 rounded-full bg-[var(--purple)] text-white flex items-center justify-center font-bold text-3xl flex-shrink-0 border-4 border-[var(--ink)]">
            {profile.displayName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="font-[var(--font-display)] text-2xl font-black">{profile.displayName}</h1>
            {profile.city && <p className="text-sm text-[var(--ink-muted)]">{profile.city}</p>}
            <div className="flex gap-2 mt-2">
              {profile.identityVerified && (
                <VerificationBadge status="staff_verified" verifiedWhat={profile.verifiedMethod} />
              )}
            </div>
          </div>
        </div>

        {/* Bio */}
        {profile.bio && (
          <p className="text-base text-[var(--ink-muted)] mb-8">{profile.bio}</p>
        )}

        {/* Stats grid — the portable civic record */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-8">
          <StatBlock value={profile.stats.rtisFiled} label="RTIs Filed" size="sm" />
          <StatBlock value={profile.stats.rtisResponded} label="Responded" size="sm" variant="accent" />
          <StatBlock value={profile.stats.campaignsLed} label="Campaigns Led" size="sm" />
          <StatBlock value={profile.stats.campaignsWon} label="Won" size="sm" variant="accent" />
          <StatBlock value={profile.stats.tracksCompleted} label="Tracks Done" size="sm" />
        </div>

        {/* School progress */}
        {profile.tracks.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4">Power School Progress</h2>
            <div className="space-y-3">
              {profile.tracks.map(track => (
                <Card key={track.trackId} variant="flat" padding="sm">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold">{track.trackTitle}</p>
                      <div className="flex gap-2 mt-1">
                        <Badge variant={track.status === 'completed' ? 'purple' : 'ghost'} size="sm">
                          {track.status === 'completed' ? 'COMPLETED' : `${track.progressPct}%`}
                        </Badge>
                        {track.assignmentsVerified > 0 && (
                          <Badge variant="lime" size="sm">{track.assignmentsVerified} verified</Badge>
                        )}
                      </div>
                    </div>
                    <div className="w-16 h-1.5 bg-[var(--paper-dark)] rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--purple)]" style={{ width: `${track.progressPct}%` }} />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Campaigns */}
        {profile.campaigns.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-4">Campaigns</h2>
            <div className="grid gap-3">
              {profile.campaigns.map(campaign => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          </div>
        )}

        {/* Footer — what this profile IS */}
        <Card variant="flat" padding="sm">
          <p className="text-xs text-[var(--ink-muted)] text-center">
            This is a portable civic track record. Actions are verified through filed documents and community confirmation.
            This profile can be shared with parties, newsrooms, NGOs, or electorates.
          </p>
        </Card>
      </div>
    </PageShell>
  );
}
