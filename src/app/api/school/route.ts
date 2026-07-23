import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabaseClient } from '@/lib/supabase-server';
import { getRequestIdentity } from '@/lib/identity';
import { toSchoolTrack } from '@/lib/dto/school';
import type { SchoolTrackRow } from '@/types/database';

/**
 * GET /api/school — List all Power School tracks (public)
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const includeProgress = searchParams.get('progress') === 'true';

  const service = getServiceSupabaseClient();
  const { data: tracks, error } = await service
    .from('school_tracks')
    .select('*')
    .eq('status', 'active')
    .order('sort_order');

  if (error) return NextResponse.json({ error: 'Failed to load tracks' }, { status: 500 });

  const trackDTOs = (tracks as SchoolTrackRow[]).map(toSchoolTrack);

  // If user is authenticated, include their progress
  if (includeProgress) {
    const identity = await getRequestIdentity(request);
    if (identity) {
      const { data: enrollments } = await service
        .from('school_enrollments')
        .select('track_id, status, progress_pct')
        .eq('identity_id', identity.id);

      const progressMap = new Map((enrollments || []).map(e => [e.track_id, e]));

      return NextResponse.json({
        tracks: trackDTOs.map(t => ({
          ...t,
          enrollment: progressMap.get(t.id) || null,
        })),
      });
    }
  }

  return NextResponse.json({ tracks: trackDTOs });
}
