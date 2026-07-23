import 'server-only';

import type { CampaignStatus } from '@/types/database';

/**
 * Campaign-specific validation rules.
 * Every campaign must have a named institutional target — never private individuals.
 */

export interface CreateCampaignInput {
  title: string;
  titleHi?: string;
  issueStatement: string;
  issueStatementHi?: string;
  city: string;
  area?: string;
  category: string;
  targetInstitution: string;
  targetJurisdiction?: string;
  primaryDemand: string;
  primaryDemandHi?: string;
  deadline: string; // ISO date
  templateSlug?: string;
  chapterId?: string;
}

export interface CampaignValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

const VALID_CATEGORIES = new Set([
  'infrastructure', 'education', 'environment', 'accountability',
  'welfare', 'health', 'housing', 'transport', 'safety', 'governance', 'other',
]);

export function validateCampaignInput(input: CreateCampaignInput): CampaignValidationResult {
  const errors: Record<string, string> = {};

  // Title
  if (!input.title || input.title.trim().length < 5) {
    errors.title = 'Title must be at least 5 characters';
  } else if (input.title.length > 200) {
    errors.title = 'Title must be under 200 characters';
  }

  // Issue statement
  if (!input.issueStatement || input.issueStatement.trim().length < 10) {
    errors.issueStatement = 'Describe the issue in at least 10 characters';
  }

  // City
  if (!input.city || input.city.trim().length < 2) {
    errors.city = 'City is required';
  }

  // Category
  if (!VALID_CATEGORIES.has(input.category)) {
    errors.category = 'Invalid category';
  }

  // Target institution — MUST be an institution, not a person
  if (!input.targetInstitution || input.targetInstitution.trim().length < 3) {
    errors.targetInstitution = 'Target institution is required (office/body, not a person)';
  } else if (input.targetInstitution.length > 300) {
    errors.targetInstitution = 'Target institution name too long';
  }

  // Primary demand
  if (!input.primaryDemand || input.primaryDemand.trim().length < 5) {
    errors.primaryDemand = 'State your demand clearly (min 5 characters)';
  }

  // Deadline
  if (!input.deadline) {
    errors.deadline = 'Deadline is required';
  } else {
    const deadlineDate = new Date(input.deadline);
    const now = new Date();
    if (isNaN(deadlineDate.getTime())) {
      errors.deadline = 'Invalid date';
    } else if (deadlineDate <= now) {
      errors.deadline = 'Deadline must be in the future';
    } else if (deadlineDate.getTime() - now.getTime() > 365 * 86_400_000) {
      errors.deadline = 'Deadline must be within one year';
    }
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

/**
 * Valid status transitions for campaigns.
 */
const VALID_TRANSITIONS: Record<CampaignStatus, CampaignStatus[]> = {
  draft: ['live'],
  live: ['escalating', 'concluded_won', 'concluded_partial', 'concluded_refused', 'concluded_abandoned'],
  escalating: ['concluded_won', 'concluded_partial', 'concluded_refused', 'concluded_abandoned'],
  concluded_won: [],
  concluded_partial: [],
  concluded_refused: ['escalating'], // Can re-escalate after refusal
  concluded_abandoned: [],
};

export function isValidStatusTransition(from: CampaignStatus, to: CampaignStatus): boolean {
  return VALID_TRANSITIONS[from]?.includes(to) ?? false;
}
