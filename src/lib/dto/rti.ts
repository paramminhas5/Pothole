import 'server-only';

import type { RTIFilingRow } from '@/types/database';
import type { RTIFilingSummaryDTO, RTIFilingDetailDTO } from '@/types/dto';

function daysUntilDeadline(deadline: string): number {
  const d = new Date(deadline);
  const now = new Date();
  return Math.ceil((d.getTime() - now.getTime()) / 86_400_000);
}

export function toRTISummary(row: RTIFilingRow): RTIFilingSummaryDTO {
  return {
    id: row.id,
    authorityName: row.authority_name,
    subject: row.subject,
    filedDate: row.filed_date,
    status: row.status,
    deadlineDate: row.deadline_date,
    daysUntilDeadline: daysUntilDeadline(row.deadline_date),
    responseReceived: row.response_received,
    campaignId: row.campaign_id,
    city: row.city,
  };
}

export function toRTIDetail(row: RTIFilingRow): RTIFilingDetailDTO {
  return {
    ...toRTISummary(row),
    authorityAddress: row.authority_address,
    questions: (row.questions as string[]) || [],
    responseDate: row.response_date,
    responseSummary: row.response_summary,
    appealFiledDate: row.appeal_filed_date,
    appealDeadline: row.appeal_deadline,
    icComplaintDate: row.ic_complaint_date,
    penaltyAmount: row.penalty_amount,
    generatedDocuments: (row.generated_documents as Array<{ type: string; title: string; generatedAt: string }>) || [],
  };
}
