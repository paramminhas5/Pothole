import 'server-only';

import type { SkillExchangeRow } from '@/types/database';
import type { SkillExchangeDTO } from '@/types/dto';

export function toSkillExchange(
  row: SkillExchangeRow & { campaign_title?: string }
): SkillExchangeDTO {
  return {
    id: row.id,
    campaignId: row.campaign_id,
    campaignTitle: row.campaign_title || null,
    chapterId: row.chapter_id,
    type: row.type,
    skillType: row.skill_type,
    title: row.title,
    description: row.description,
    city: row.city,
    area: row.area,
    urgency: row.urgency,
    status: row.status,
    createdAt: row.created_at,
    expiresAt: row.expires_at,
  };
}
