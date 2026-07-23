import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabaseClient } from '@/lib/supabase-server';
import { getRequestIdentity } from '@/lib/identity';
import { toSkillExchange } from '@/lib/dto/skill-exchange';
import { parseJsonObject, cleanString } from '@/lib/validation';
import type { SkillExchangeRow } from '@/types/database';

const VALID_SKILL_TYPES = new Set([
  'legal', 'design', 'translation', 'photography', 'video',
  'writing', 'research', 'field_volunteer', 'medical', 'tech',
  'transport', 'supplies', 'training', 'media', 'other',
]);

/**
 * GET /api/exchange — Skill exchange (public, anchored to campaigns)
 * Every ask/offer is tied to a campaign or chapter.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  const type = searchParams.get('type'); // 'need' or 'offer'
  const skillType = searchParams.get('skillType');
  const campaignId = searchParams.get('campaignId');
  const limit = Math.min(50, parseInt(searchParams.get('limit') || '20'));

  const service = getServiceSupabaseClient();
  let query = service
    .from('skill_exchange')
    .select('*, campaigns(title)')
    .eq('status', 'open')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (city) query = query.eq('city', city);
  if (type === 'need' || type === 'offer') query = query.eq('type', type);
  if (skillType && VALID_SKILL_TYPES.has(skillType)) query = query.eq('skill_type', skillType);
  if (campaignId) query = query.eq('campaign_id', campaignId);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: 'Failed to load exchanges' }, { status: 500 });

  const exchanges = (data || []).map((row: SkillExchangeRow & { campaigns?: { title: string } }) =>
    toSkillExchange({ ...row, campaign_title: row.campaigns?.title })
  );

  return NextResponse.json({ exchanges, count: exchanges.length });
}

/**
 * POST /api/exchange — Post a skill need or offer (requires identity, must be anchored)
 */
export async function POST(request: NextRequest) {
  const identity = await getRequestIdentity(request);
  if (!identity) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });

  const body = await parseJsonObject(request, 5_000);
  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 });

  const type = body.type === 'need' || body.type === 'offer' ? body.type : null;
  const skillType = cleanString(body.skillType, 50);
  const title = cleanString(body.title, 200);
  const description = cleanString(body.description, 1000);
  const city = cleanString(body.city, 100);
  const campaignId = (typeof body.campaignId === 'string' && body.campaignId.length === 36) ? body.campaignId : null;
  const chapterId = (typeof body.chapterId === 'string' && body.chapterId.length === 36) ? body.chapterId : null;

  if (!type || !skillType || !title || !description || !city) {
    return NextResponse.json({ error: 'Type, skill, title, description, and city are required' }, { status: 400 });
  }

  if (!VALID_SKILL_TYPES.has(skillType)) {
    return NextResponse.json({ error: 'Invalid skill type' }, { status: 400 });
  }

  // Must be anchored to a campaign or chapter (no unanchored posts)
  if (!campaignId && !chapterId) {
    return NextResponse.json({ error: 'Skill exchange must be linked to a campaign or chapter' }, { status: 400 });
  }

  const service = getServiceSupabaseClient();
  const { data, error } = await service
    .from('skill_exchange')
    .insert({
      campaign_id: campaignId,
      chapter_id: chapterId,
      type,
      skill_type: skillType,
      title,
      description,
      city,
      area: (body.area as string) || '',
      urgency: ['normal', 'urgent', 'flexible'].includes(body.urgency as string) ? body.urgency as string : 'normal',
      identity_id: identity.id,
      status: 'open',
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: 'Failed to create exchange' }, { status: 500 });

  return NextResponse.json({ success: true, exchange: toSkillExchange(data as SkillExchangeRow) }, { status: 201 });
}
