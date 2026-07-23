import 'server-only';

import type { CampaignRow, CampaignTeamRow, CampaignUpdateRow } from '@/types/database';
import type { CampaignSummaryDTO, CampaignDetailDTO, CampaignTeamMemberDTO, CampaignUpdateDTO } from '@/types/dto';

function daysRemaining(deadline: string): number {
  const d = new Date(deadline);
  const now = new Date();
  return Math.ceil((d.getTime() - now.getTime()) / 86_400_000);
}

function daysElapsed(created: string): number {
  const d = new Date(created);
  const now = new Date();
  return Math.floor((now.getTime() - d.getTime()) / 86_400_000);
}

export function toCampaignSummary(row: CampaignRow): CampaignSummaryDTO {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    titleHi: row.title_hi,
    city: row.city,
    category: row.category,
    targetInstitution: row.target_institution,
    primaryDemand: row.primary_demand,
    deadline: row.deadline,
    status: row.status,
    supporterCount: row.supporter_count,
    filingCount: row.filing_count,
    daysRemaining: daysRemaining(row.deadline),
    daysElapsed: daysElapsed(row.created_at),
    createdAt: row.created_at,
  };
}


export function toCampaignDetail(
  row: CampaignRow,
  team: Array<CampaignTeamRow & { display_name?: string }>,
  updates: CampaignUpdateRow[]
): CampaignDetailDTO {
  return {
    ...toCampaignSummary(row),
    issueStatement: row.issue_statement,
    issueStatementHi: row.issue_statement_hi,
    area: row.area,
    targetJurisdiction: row.target_jurisdiction,
    primaryDemandHi: row.primary_demand_hi,
    secondaryDemands: (row.secondary_demands as Array<{ text: string; textHi: string }>) || [],
    evidenceSummary: row.evidence_summary,
    escalationPlan: (row.escalation_plan as Array<{ step: number; action: string; actionHi: string; status: string }>) || [],
    outcomeSummary: row.outcome_summary,
    outcomeSummaryHi: row.outcome_summary_hi,
    taskCount: row.task_count,
    publishedAt: row.published_at,
    concludedAt: row.concluded_at,
    chapterId: row.chapter_id,
    templateSlug: row.template_slug,
    team: team.map(toTeamMember),
    recentUpdates: updates.slice(0, 10).map(toUpdate),
  };
}

function toTeamMember(row: CampaignTeamRow & { display_name?: string }): CampaignTeamMemberDTO {
  return {
    identityId: row.identity_id,
    displayName: row.display_name || 'Member',
    role: row.role,
    joinedAt: row.joined_at,
  };
}

function toUpdate(row: CampaignUpdateRow): CampaignUpdateDTO {
  return {
    id: row.id,
    updateType: row.update_type,
    title: row.title,
    titleHi: row.title_hi,
    body: row.body,
    bodyHi: row.body_hi,
    createdAt: row.created_at,
  };
}
