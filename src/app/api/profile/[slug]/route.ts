import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabaseClient } from '@/lib/supabase-server';
import { toCivicProfile } from '@/lib/dto/profile';
import type { CivicProfileRow } from '@/types/database';

/**
 * GET /api/profile/[slug] — Public civic profile
 * The portable, verifiable track record. No login needed to view.
 */
export async function GET(_request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceSupabaseClient();

  // Fetch profile
  const { data: profile } = await service
    .from('civic_profiles')
    .select('*')
    .eq('slug', slug)
    .eq('is_public', true)
    .single();

  if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 });

  const profileRow = profile as CivicProfileRow;

  // Fetch campaigns led/contributed
  const { data: campaigns } = await service
    .from('campaigns')
    .select('id, slug, title, title_hi, city, category, target_institution, primary_demand, deadline, status, supporter_count, filing_count, created_at')
    .or(`creator_identity_id.eq.${profileRow.identity_id}`)
    .neq('status', 'draft')
    .order('created_at', { ascending: false })
    .limit(10);

  // Fetch school progress
  const { data: enrollments } = await service
    .from('school_enrollments')
    .select('track_id, status, progress_pct, school_tracks(title)')
    .eq('identity_id', profileRow.identity_id);

  const { data: completionCounts } = await service
    .from('school_completions')
    .select('track_id')
    .eq('identity_id', profileRow.identity_id)
    .eq('assignment_verified', true);

  const trackProgress = (enrollments || []).map((e: { track_id: string; status: string; progress_pct: number; school_tracks?: { title: string } }) => ({
    track_id: e.track_id,
    track_title: e.school_tracks?.title || '',
    status: e.status,
    progress_pct: e.progress_pct,
    lessons_completed: 0, // would need a count query
    total_lessons: 0,
    assignments_verified: (completionCounts || []).filter(c => c.track_id === e.track_id).length,
  }));

  const dto = toCivicProfile(profileRow, campaigns || [], trackProgress);
  return NextResponse.json({ profile: dto });
}
