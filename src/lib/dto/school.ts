import 'server-only';

import type { SchoolTrackRow, SchoolLessonRow } from '@/types/database';
import type { SchoolTrackDTO, SchoolLessonDTO } from '@/types/dto';

export function toSchoolTrack(row: SchoolTrackRow): SchoolTrackDTO {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    titleHi: row.title_hi,
    description: row.description,
    descriptionHi: row.description_hi,
    difficulty: row.difficulty,
    estimatedHours: row.estimated_hours,
    lessonCount: row.lesson_count,
    fieldAssignmentCount: row.field_assignment_count,
    prerequisiteTrackId: row.prerequisite_track_id,
  };
}

export function toSchoolLesson(row: SchoolLessonRow): SchoolLessonDTO {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    titleHi: row.title_hi,
    contentMd: row.content_md,
    contentMdHi: row.content_md_hi,
    estimatedMinutes: row.estimated_minutes,
    fieldAssignment: row.field_assignment
      ? {
          description: row.field_assignment.description,
          verificationMethod: row.field_assignment.verification_method,
          proofType: row.field_assignment.proof_type,
        }
      : null,
    resources: (row.resources as Array<{ title: string; url: string; type: string }>) || [],
  };
}
