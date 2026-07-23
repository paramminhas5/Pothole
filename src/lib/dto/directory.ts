import 'server-only';

import type { DirectoryEntryRow } from '@/types/database';
import type { DirectoryEntryDTO } from '@/types/dto';

export function toDirectoryEntry(row: DirectoryEntryRow): DirectoryEntryDTO {
  return {
    id: row.id,
    type: row.type,
    name: row.name,
    nameHi: row.name_hi,
    city: row.city,
    area: row.area,
    state: row.state,
    contactMethod: row.contact_method,
    description: row.description,
    descriptionHi: row.description_hi,
    website: row.website,
    specializations: row.specializations,
    operatingHours: row.operating_hours,
    languages: row.languages,
    verificationStatus: row.verification_status,
    verifiedWhat: row.verified_what,
    lastConfirmedActive: row.last_confirmed_active,
    campaignAffiliations: row.campaign_affiliations,
    chapterId: row.chapter_id,
  };
}
