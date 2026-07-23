/**
 * Database row types — internal only, never exposed via API.
 * Public-facing types are in ./dto.ts
 */

// ============================================
// CAMPAIGNS
// ============================================

export type CampaignStatus =
  | 'draft' | 'live' | 'escalating'
  | 'concluded_won' | 'concluded_partial'
  | 'concluded_refused' | 'concluded_abandoned';

export interface CampaignRow {
  id: string;
  creator_identity_id: string;
  chapter_id: string | null;
  title: string;
  title_hi: string;
  slug: string;
  issue_statement: string;
  issue_statement_hi: string;
  city: string;
  area: string;
  category: string;
  target_institution: string;
  target_jurisdiction: string;
  primary_demand: string;
  primary_demand_hi: string;
  secondary_demands: unknown[];
  deadline: string;
  status: CampaignStatus;
  template_slug: string | null;
  evidence_summary: string;
  escalation_plan: unknown[];
  outcome_summary: string;
  outcome_summary_hi: string;
  supporter_count: number;
  filing_count: number;
  task_count: number;
  published_at: string | null;
  concluded_at: string | null;
  created_at: string;
  updated_at: string;
}


// ============================================
// CAMPAIGN RELATED
// ============================================

export type EvidenceType = 'document' | 'photo' | 'filing' | 'response' | 'media' | 'rti' | 'fir';
export type TeamRole = 'lead' | 'legal' | 'comms' | 'field' | 'welfare' | 'volunteer' | 'medic' | 'transport';
export type TaskStatus = 'open' | 'claimed' | 'in_progress' | 'done' | 'cancelled';
export type TaskPriority = 'low' | 'normal' | 'high' | 'urgent';

export interface CampaignEvidenceRow {
  id: string;
  campaign_id: string;
  type: EvidenceType;
  title: string;
  description: string;
  file_url: string | null;
  source_url: string | null;
  provenance: string;
  uploaded_by: string | null;
  consent_recorded: boolean;
  created_at: string;
}

export interface CampaignTeamRow {
  id: string;
  campaign_id: string;
  identity_id: string;
  role: TeamRole;
  status: 'active' | 'left' | 'removed';
  joined_at: string;
}

export interface CampaignTaskRow {
  id: string;
  campaign_id: string;
  title: string;
  description: string;
  skill_needed: string | null;
  assigned_to: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  due_date: string | null;
  completed_at: string | null;
  created_at: string;
}

export interface CampaignUpdateRow {
  id: string;
  campaign_id: string;
  author_id: string;
  update_type: string;
  title: string;
  title_hi: string;
  body: string;
  body_hi: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface CampaignSupporterRow {
  id: string;
  campaign_id: string;
  identity_id: string;
  support_type: 'endorse' | 'volunteer' | 'skill_offer' | 'resource';
  message: string;
  created_at: string;
}

// ============================================
// RTI FILINGS
// ============================================

export type RTIStatus =
  | 'filed' | 'awaiting' | 'first_appeal' | 'second_appeal'
  | 'ic_complaint' | 'responded' | 'penalty_ordered' | 'closed';

export interface RTIFilingRow {
  id: string;
  identity_id: string | null;
  session_token: string | null;
  campaign_id: string | null;
  authority_name: string;
  authority_address: string;
  subject: string;
  questions: unknown[];
  filed_date: string;
  status: RTIStatus;
  deadline_date: string;
  response_received: boolean;
  response_date: string | null;
  response_summary: string;
  appeal_filed_date: string | null;
  appeal_deadline: string | null;
  ic_complaint_date: string | null;
  penalty_amount: number;
  generated_documents: unknown[];
  city: string;
  created_at: string;
  updated_at: string;
}

// ============================================
// SKILL EXCHANGE
// ============================================

export type SkillType =
  | 'legal' | 'design' | 'translation' | 'photography' | 'video'
  | 'writing' | 'research' | 'field_volunteer' | 'medical' | 'tech'
  | 'transport' | 'supplies' | 'training' | 'media' | 'other';

export interface SkillExchangeRow {
  id: string;
  campaign_id: string | null;
  chapter_id: string | null;
  type: 'need' | 'offer';
  skill_type: SkillType;
  title: string;
  description: string;
  city: string;
  area: string;
  urgency: 'normal' | 'urgent' | 'flexible';
  identity_id: string;
  status: 'open' | 'matched' | 'fulfilled' | 'expired' | 'cancelled';
  matched_with: string | null;
  created_at: string;
  expires_at: string;
}

// ============================================
// DIRECTORY
// ============================================

export type DirectoryType =
  | 'legal-aid' | 'helpline' | 'organization' | 'ngo' | 'lawyer' | 'doctor'
  | 'shelter' | 'media' | 'mental-health' | 'education' | 'transport'
  | 'student-union' | 'political-party' | 'government-office' | 'other';

export type VerificationStatus = 'unverified' | 'self_claimed' | 'community_vouched' | 'staff_verified';

export interface DirectoryEntryRow {
  id: string;
  type: DirectoryType;
  name: string;
  name_hi: string;
  city: string;
  area: string;
  state: string;
  contact_method: string;
  description: string;
  description_hi: string;
  website: string;
  specializations: string[];
  operating_hours: string;
  languages: string[];
  verification_status: VerificationStatus;
  verified_what: string;
  verified_by: string;
  verified_at: string | null;
  last_confirmed_active: string;
  campaign_affiliations: string[];
  chapter_id: string | null;
  submitted_by: string | null;
  status: 'pending' | 'active' | 'inactive' | 'removed';
  created_at: string;
  updated_at: string;
}

// ============================================
// POWER SCHOOL
// ============================================

export interface SchoolTrackRow {
  id: string;
  slug: string;
  title: string;
  title_hi: string;
  description: string;
  description_hi: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimated_hours: number;
  lesson_count: number;
  field_assignment_count: number;
  prerequisite_track_id: string | null;
  sort_order: number;
  status: 'draft' | 'active' | 'archived';
  created_at: string;
}

export interface SchoolLessonRow {
  id: string;
  track_id: string;
  slug: string;
  title: string;
  title_hi: string;
  content_md: string;
  content_md_hi: string;
  sort_order: number;
  estimated_minutes: number;
  field_assignment: { description: string; verification_method: string; proof_type: string } | null;
  resources: unknown[];
}

export interface SchoolEnrollmentRow {
  id: string;
  identity_id: string;
  track_id: string;
  cohort_id: string | null;
  status: 'active' | 'completed' | 'paused' | 'dropped';
  progress_pct: number;
  enrolled_at: string;
  completed_at: string | null;
}

// ============================================
// CIVIC PROFILES
// ============================================

export interface CivicProfileRow {
  id: string;
  identity_id: string;
  display_name: string;
  bio: string;
  bio_hi: string;
  city: string;
  is_public: boolean;
  slug: string | null;
  rtis_filed: number;
  rtis_responded: number;
  rtis_penalties: number;
  campaigns_led: number;
  campaigns_contributed: number;
  campaigns_won: number;
  tracks_completed: number;
  people_trained: number;
  field_assignments_verified: number;
  identity_verified: boolean;
  verified_method: string;
  verified_at: string | null;
  show_rtis: boolean;
  show_campaigns: boolean;
  show_school: boolean;
  show_skills: boolean;
  created_at: string;
  updated_at: string;
}

// ============================================
// LEDGER
// ============================================

export type LedgerResponseStatus =
  | 'silent' | 'acknowledged' | 'partial_response'
  | 'full_response' | 'refused' | 'escalated';

export interface LedgerEntryRow {
  id: string;
  campaign_id: string;
  demand_text: string;
  demand_text_hi: string;
  target_institution: string;
  target_city: string;
  target_jurisdiction: string;
  filed_date: string;
  deadline_date: string;
  days_elapsed: number;
  response_status: LedgerResponseStatus;
  response_text: string;
  response_date: string | null;
  source_document_url: string | null;
  source_filing_id: string | null;
  correction_requested: boolean;
  correction_text: string;
  is_verified: boolean;
  verified_by: string;
  created_at: string;
  updated_at: string;
}

// ============================================
// NOTIFICATIONS
// ============================================

export type NotificationType =
  | 'rti_deadline' | 'rti_appeal_due' | 'campaign_update' | 'task_assigned'
  | 'skill_match' | 'campaign_response' | 'school_assignment' | 'cohort_start'
  | 'team_invite' | 'supporter_joined' | 'general';

export interface NotificationRow {
  id: string;
  identity_id: string;
  type: NotificationType;
  title: string;
  body: string;
  link: string;
  related_campaign_id: string | null;
  related_rti_id: string | null;
  read: boolean;
  created_at: string;
}
