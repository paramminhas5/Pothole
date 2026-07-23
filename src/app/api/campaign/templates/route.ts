import { NextResponse } from 'next/server';
import { getServiceSupabaseClient } from '@/lib/supabase-server';
import type { CampaignTemplateDTO } from '@/types/dto';

/**
 * GET /api/campaign/templates — List all campaign templates (public)
 * These are the 10 pre-built skeletons for common fights.
 */
export async function GET() {
  const service = getServiceSupabaseClient();
  const { data, error } = await service
    .from('campaign_templates')
    .select('slug, title, title_hi, description, description_hi, category, typical_target_type, typical_instruments, typical_timeline_days, steps')
    .eq('status', 'active')
    .order('sort_order');

  if (error) return NextResponse.json({ error: 'Failed to load templates' }, { status: 500 });

  const templates: CampaignTemplateDTO[] = (data || []).map(row => ({
    slug: row.slug,
    title: row.title,
    titleHi: row.title_hi,
    description: row.description,
    descriptionHi: row.description_hi,
    category: row.category,
    typicalTargetType: row.typical_target_type,
    typicalInstruments: row.typical_instruments || [],
    typicalTimelineDays: row.typical_timeline_days,
    steps: row.steps || [],
  }));

  return NextResponse.json({ templates });
}
