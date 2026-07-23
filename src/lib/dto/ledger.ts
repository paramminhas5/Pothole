import 'server-only';

import type { LedgerEntryRow } from '@/types/database';
import type { LedgerEntryDTO } from '@/types/dto';

export function toLedgerEntry(
  row: LedgerEntryRow & { campaign_slug?: string; campaign_title?: string }
): LedgerEntryDTO {
  return {
    id: row.id,
    campaignId: row.campaign_id,
    campaignSlug: row.campaign_slug || '',
    campaignTitle: row.campaign_title || '',
    demandText: row.demand_text,
    demandTextHi: row.demand_text_hi,
    targetInstitution: row.target_institution,
    targetCity: row.target_city,
    targetJurisdiction: row.target_jurisdiction,
    filedDate: row.filed_date,
    deadlineDate: row.deadline_date,
    daysElapsed: row.days_elapsed,
    responseStatus: row.response_status,
    responseText: row.response_text,
    responseDate: row.response_date,
    sourceDocumentUrl: row.source_document_url,
    isVerified: row.is_verified,
  };
}
