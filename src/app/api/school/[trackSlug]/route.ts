import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabaseClient } from '@/lib/supabase-server';
import { getRequestIdentity } from '@/lib/identity';
import { toSchoolTrack, toSchoolLesson } from '@/lib/dto/school';
import type { SchoolTrackRow, SchoolLessonRow } from '@/types/database';

/**
 * GET /api/school/[trackSlug] — Track detail with lessons
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ trackSlug: string }> }) {
  const { trackSlug } = await params;
  const service = getServiceSupabaseClient();

  const { data: track } = await service
    .from('school_tracks')
    .select('*')
    .eq('slug', trackSlug)
    .eq('status', 'active')
    .single();

  if (!track) return NextResponse.json({ error: 'Track not found' }, { status: 404 });

  const { data: lessons } = await service
    .from('school_lessons')
    .select('*')
    .eq('track_id', track.id)
    .order('sort_order');

  const trackDTO = toSchoolTrack(track as SchoolTrackRow);
  const lessonDTOs = (lessons as SchoolLessonRow[] || []).map(toSchoolLesson);

  // Include user progress if authenticated
  const identity = await getRequestIdentity(request);
  let completions: string[] = [];
  if (identity) {
    const { data: completed } = await service
      .from('school_completions')
      .select('lesson_id')
      .eq('identity_id', identity.id)
      .eq('track_id', track.id);
    completions = (completed || []).map(c => c.lesson_id);
  }

  return NextResponse.json({
    track: trackDTO,
    lessons: lessonDTOs.map(l => ({ ...l, completed: completions.includes(l.id) })),
    progress: {
      completed: completions.length,
      total: lessonDTOs.length,
      pct: lessonDTOs.length > 0 ? Math.round((completions.length / lessonDTOs.length) * 100) : 0,
    },
  });
}

/**
 * POST /api/school/[trackSlug] — Enroll in a track
 */
export async function POST(request: NextRequest, { params }: { params: Promise<{ trackSlug: string }> }) {
  const { trackSlug } = await params;
  const identity = await getRequestIdentity(request);
  if (!identity) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });

  const service = getServiceSupabaseClient();
  const { data: track } = await service
    .from('school_tracks')
    .select('id')
    .eq('slug', trackSlug)
    .single();

  if (!track) return NextResponse.json({ error: 'Track not found' }, { status: 404 });

  const { error } = await service
    .from('school_enrollments')
    .upsert({
      identity_id: identity.id,
      track_id: track.id,
      status: 'active',
    }, { onConflict: 'identity_id,track_id' });

  if (error) return NextResponse.json({ error: 'Failed to enroll' }, { status: 500 });

  return NextResponse.json({ success: true });
}
