'use client';

import type { CivicProfileDTO } from '@/types/dto';
import { StatBlock } from './StatBlock';
import { VerificationBadge } from './VerificationBadge';
import Link from 'next/link';

interface ProfileCardProps {
  profile: CivicProfileDTO;
  locale?: 'en' | 'hi';
  compact?: boolean;
}

export function ProfileCard({ profile, locale = 'en', compact = false }: ProfileCardProps) {
  const href = profile.slug ? `/profile/${profile.slug}` : '#';

  if (compact) {
    return (
      <Link href={href} className="block group">
        <div className="flex items-center gap-3 p-3 border-2 border-[var(--ink)] rounded-[var(--radius-md)] bg-[var(--paper-alt)] group-hover:shadow-[var(--shadow-sm)] transition-shadow">
          <div className="w-10 h-10 rounded-full bg-[var(--purple)] text-white flex items-center justify-center font-bold text-sm">
            {profile.displayName.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold truncate">{profile.displayName}</p>
            <p className="text-xs text-[var(--ink-muted)] font-[var(--font-mono)]">
              {profile.stats.campaignsLed} campaigns · {profile.stats.rtisFiled} RTIs
            </p>
          </div>
          {profile.identityVerified && (
            <VerificationBadge status="staff_verified" locale={locale} />
          )}
        </div>
      </Link>
    );
  }

  return (
    <div className="border-2 border-[var(--ink)] rounded-[var(--radius-lg)] p-6 bg-[var(--paper-alt)] shadow-[var(--shadow-md)]">
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-[var(--purple)] text-white flex items-center justify-center font-bold text-2xl flex-shrink-0">
          {profile.displayName.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="font-[var(--font-display)] text-xl font-bold">{profile.displayName}</h2>
          {profile.city && <p className="text-sm text-[var(--ink-muted)]">{profile.city}</p>}
          {profile.identityVerified && (
            <VerificationBadge status="staff_verified" verifiedWhat={profile.verifiedMethod} locale={locale} />
          )}
        </div>
      </div>

      {/* Bio */}
      {(profile.bio || profile.bioHi) && (
        <p className="text-sm text-[var(--ink-muted)] mb-6">
          {locale === 'hi' && profile.bioHi ? profile.bioHi : profile.bio}
        </p>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-3">
        <StatBlock value={profile.stats.rtisFiled} label="RTIs Filed" labelHi="RTI दायर" locale={locale} size="sm" />
        <StatBlock value={profile.stats.campaignsLed} label="Campaigns" labelHi="अभियान" locale={locale} size="sm" />
        <StatBlock value={profile.stats.tracksCompleted} label="Tracks" labelHi="ट्रैक" locale={locale} size="sm" />
      </div>
    </div>
  );
}

export default ProfileCard;
