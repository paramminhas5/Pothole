/**
 * Public-safe DTO types. These are the ONLY shapes
 * that leave the API boundary. Never expose database rows directly.
 */

import type { CampaignStatus, RTIStatus, LedgerResponseStatus, VerificationStatus, SkillType, TeamRole, TaskStatus, TaskPriority, EvidenceType } from './database';

// ============================================
// CAMPAIGN DTOs
// ============================================

export interface CampaignSummaryDTO {
  id: string;
  slug: string;
  title: string;
  titleHi: string;
  city: string;
  category: string;
  targetInstitution: string;
  primaryDemand: string;
  deadline: string;
  status: CampaignStatus;
  supporterCount: number;
  filingCount: number;
  daysRemaining: number;
  daysElapsed: number;
  createdAt: string;
}


export interface CampaignDetailDTO extends CampaignSummaryDTO {
  issueStatement: string;
  issueStatementHi: string;
  area: string;
  targetJurisdiction: string;
  primaryDemandHi: string;
  secondaryDemands: Array<{ text: string; textHi: string }>;
  evidenceSummary: string;
  escalationPlan: Array<{ step: number; action: string; actionHi: string; status: string }>;
  outcomeSummary: string;
  outcomeSummaryHi: string;
  taskCount: number;
  publishedAt: string | null;
  concludedAt: string | null;
  chapterId: string | null;
  templateSlug: string | null;
  team: CampaignTeamMemberDTO[];
  recentUpdates: CampaignUpdateDTO[];
}

export interface CampaignTeamMemberDTO {
  identityId: string;
  displayName: string;
  role: TeamRole;
  joinedAt: string;
}

export interface CampaignUpdateDTO {
  id: string;
  updateType: string;
  title: string;
  titleHi: string;
  body: string;
  bodyHi: string;
  createdAt: string;
}

export interface CampaignTaskDTO {
  id: string;
  campaignId: string;
  title: string;
  description: string;
  skillNeeded: string | null;
  assignedTo: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  createdAt: string;
}

export interface CampaignEvidenceDTO {
  id: string;
  type: EvidenceType;
  title: string;
  description: string;
  fileUrl: string | null;
  sourceUrl: string | null;
  provenance: string;
  createdAt: string;
}

// ============================================
// RTI DTOs
// ============================================

export interface RTIFilingSummaryDTO {
  id: string;
  authorityName: string;
  subject: string;
  filedDate: string;
  status: RTIStatus;
  deadlineDate: string;
  daysUntilDeadline: number;
  responseReceived: boolean;
  campaignId: string | null;
  city: string;
}

export interface RTIFilingDetailDTO extends RTIFilingSummaryDTO {
  authorityAddress: string;
  questions: string[];
  responseDate: string | null;
  responseSummary: string;
  appealFiledDate: string | null;
  appealDeadline: string | null;
  icComplaintDate: string | null;
  penaltyAmount: number;
  generatedDocuments: Array<{ type: string; title: string; generatedAt: string }>;
}

// ============================================
// SKILL EXCHANGE DTOs
// ============================================

export interface SkillExchangeDTO {
  id: string;
  campaignId: string | null;
  campaignTitle: string | null;
  chapterId: string | null;
  type: 'need' | 'offer';
  skillType: SkillType;
  title: string;
  description: string;
  city: string;
  area: string;
  urgency: 'normal' | 'urgent' | 'flexible';
  status: string;
  createdAt: string;
  expiresAt: string;
}

// ============================================
// DIRECTORY DTOs
// ============================================

export interface DirectoryEntryDTO {
  id: string;
  type: string;
  name: string;
  nameHi: string;
  city: string;
  area: string;
  state: string;
  contactMethod: string;
  description: string;
  descriptionHi: string;
  website: string;
  specializations: string[];
  operatingHours: string;
  languages: string[];
  verificationStatus: VerificationStatus;
  verifiedWhat: string;
  lastConfirmedActive: string;
  campaignAffiliations: string[];
  chapterId: string | null;
}

// ============================================
// POWER SCHOOL DTOs
// ============================================

export interface SchoolTrackDTO {
  id: string;
  slug: string;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  difficulty: string;
  estimatedHours: number;
  lessonCount: number;
  fieldAssignmentCount: number;
  prerequisiteTrackId: string | null;
}

export interface SchoolLessonDTO {
  id: string;
  slug: string;
  title: string;
  titleHi: string;
  contentMd: string;
  contentMdHi: string;
  estimatedMinutes: number;
  fieldAssignment: { description: string; verificationMethod: string; proofType: string } | null;
  resources: Array<{ title: string; url: string; type: string }>;
}

export interface SchoolProgressDTO {
  trackId: string;
  trackTitle: string;
  status: string;
  progressPct: number;
  lessonsCompleted: number;
  totalLessons: number;
  assignmentsVerified: number;
}

// ============================================
// CIVIC PROFILE DTOs
// ============================================

export interface CivicProfileDTO {
  id: string;
  slug: string | null;
  displayName: string;
  bio: string;
  bioHi: string;
  city: string;
  stats: {
    rtisFiled: number;
    rtisResponded: number;
    rtisPenalties: number;
    campaignsLed: number;
    campaignsContributed: number;
    campaignsWon: number;
    tracksCompleted: number;
    peopleTrained: number;
    fieldAssignmentsVerified: number;
  };
  identityVerified: boolean;
  verifiedMethod: string;
  campaigns: CampaignSummaryDTO[];
  tracks: SchoolProgressDTO[];
}

// ============================================
// LEDGER DTOs
// ============================================

export interface LedgerEntryDTO {
  id: string;
  campaignId: string;
  campaignSlug: string;
  campaignTitle: string;
  demandText: string;
  demandTextHi: string;
  targetInstitution: string;
  targetCity: string;
  targetJurisdiction: string;
  filedDate: string;
  deadlineDate: string;
  daysElapsed: number;
  responseStatus: LedgerResponseStatus;
  responseText: string;
  responseDate: string | null;
  sourceDocumentUrl: string | null;
  isVerified: boolean;
}

// ============================================
// NOTIFICATION DTOs
// ============================================

export interface NotificationDTO {
  id: string;
  type: string;
  title: string;
  body: string;
  link: string;
  relatedCampaignId: string | null;
  read: boolean;
  createdAt: string;
}

// ============================================
// CAMPAIGN TEMPLATE DTOs
// ============================================

export interface CampaignTemplateDTO {
  slug: string;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  category: string;
  typicalTargetType: string;
  typicalInstruments: string[];
  typicalTimelineDays: number;
  steps: Array<{ step: number; action: string; actionHi?: string }>;
}

// ============================================
// AUTH DTOs
// ============================================

export interface IdentityDTO {
  id: string;
  displayName: string;
  role: string;
  city: string;
  skills: string[];
  emailVerified: boolean;
  onboarded: boolean;
  chapterId: string | null;
  profileId: string | null;
}

// ============================================
// CONNECTED ECOSYSTEM — Hub view
// ============================================

export interface CampaignEcosystemDTO {
  campaign: CampaignDetailDTO;
  rtiFilings: RTIFilingSummaryDTO[];
  skillNeeds: SkillExchangeDTO[];
  directorySupport: DirectoryEntryDTO[];
  ledgerEntries: LedgerEntryDTO[];
  supporters: Array<{ displayName: string; supportType: string; createdAt: string }>;
}
