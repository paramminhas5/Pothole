import 'server-only';

import type { CivicProfileRow } from '@/types/database';
import type { CivicProfileDTO } from '@/types/dto';

export function toCivicProfile(
  row: CivicProfileRow,
  campaigns: Array<{ id: string; slug: string; title: string; title_hi: string; city: string; category: string; target_institution: string; primary_demand: string; deadline: string; status: string; supporter_count: number; filing_count: number; created_at: string }> = [],
  tracks: Array<{ track_id: string; track_title: string; status: string; progress_pct: number; lessons_completed: number; total_lessons: number; assignments_verified: number }> = []
): CivicProfileDTO {
  return {
    id: row.id,
    slug: row.slug,
    displayName: row.display_name,
    bio: row.bio,
    bioHi: row.bio_hi,
    city: row.city,
    stats: {
      rtisFiled: row.show_rtis ? row.rtis_filed : 0,
      rtisResponded: row.show_rtis ? row.rtis_responded : 0,
      rtisPenalties: row.show_rtis ? row.rtis_penalties : 0,
      campaignsLed: row.show_campaigns ? row.campaigns_led : 0,
      campaignsContributed: row.show_campaigns ? row.campaigns_contributed : 0,
      campaignsWon: row.show_campaigns ? row.campaigns_won : 0,
      tracksCompleted: row.show_school ? row.tracks_completed : 0,
      peopleTrained: row.people_trained,
      fieldAssignmentsVerified: row.show_school ? row.field_assignments_verified : 0,
    },
    identityVerified: row.identity_verified,
    verifiedMethod: row.verified_method,
    campaigns: row.show_campaigns ? campaigns.map(c => ({
      id: c.id,
      slug: c.slug,
      title: c.title,
      titleHi: c.title_hi,
      city: c.city,
      category: c.category,
      targetInstitution: c.target_institution,
      primaryDemand: c.primary_demand,
      deadline: c.deadline,
      status: c.status as CivicProfileDTO['campaigns'][0]['status'],
      supporterCount: c.supporter_count,
      filingCount: c.filing_count,
      daysRemaining: Math.ceil((new Date(c.deadline).getTime() - Date.now()) / 86_400_000),
      daysElapsed: Math.floor((Date.now() - new Date(c.created_at).getTime()) / 86_400_000),
      createdAt: c.created_at,
    })) : [],
    tracks: row.show_school ? tracks.map(t => ({
      trackId: t.track_id,
      trackTitle: t.track_title,
      status: t.status,
      progressPct: t.progress_pct,
      lessonsCompleted: t.lessons_completed,
      totalLessons: t.total_lessons,
      assignmentsVerified: t.assignments_verified,
    })) : [],
  };
}
