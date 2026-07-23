import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabaseClient } from '@/lib/supabase-server';
import { getRequestIdentity } from '@/lib/identity';
import { toDirectoryEntry } from '@/lib/dto/directory';
import { parseJsonObject, cleanString } from '@/lib/validation';
import type { DirectoryEntryRow } from '@/types/database';

/**
 * GET /api/directory — Public support directory
 * Verified orgs, lawyers, helplines — linked to active campaigns.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  const type = searchParams.get('type');
  const specialization = searchParams.get('specialization');
  const campaignId = searchParams.get('campaignId');
  const limit = Math.min(100, parseInt(searchParams.get('limit') || '50'));

  const service = getServiceSupabaseClient();
  let query = service
    .from('directory_entries')
    .select('*')
    .eq('status', 'active')
    .order('verification_status', { ascending: false })
    .order('last_confirmed_active', { ascending: false })
    .limit(limit);

  if (city) query = query.eq('city', city);
  if (type) query = query.eq('type', type);
  if (specialization) query = query.contains('specializations', [specialization]);
  if (campaignId) query = query.contains('campaign_affiliations', [campaignId]);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: 'Failed to load directory' }, { status: 500 });

  const entries = (data as DirectoryEntryRow[]).map(toDirectoryEntry);
  return NextResponse.json({ entries, count: entries.length });
}

/**
 * POST /api/directory — Submit a new directory entry (requires identity)
 */
export async function POST(request: NextRequest) {
  const identity = await getRequestIdentity(request);
  if (!identity) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });

  const body = await parseJsonObject(request, 5_000);
  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 });

  const name = cleanString(body.name, 300);
  const type = cleanString(body.type, 50);
  const city = cleanString(body.city, 100);
  const contactMethod = cleanString(body.contactMethod, 500);
  const description = cleanString(body.description, 1000);

  if (!name || !type || !city || !contactMethod || !description) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  const service = getServiceSupabaseClient();
  const { data, error } = await service
    .from('directory_entries')
    .insert({
      type,
      name,
      name_hi: (body.nameHi as string) || '',
      city,
      area: (body.area as string) || '',
      state: (body.state as string) || '',
      contact_method: contactMethod,
      description,
      description_hi: (body.descriptionHi as string) || '',
      website: (body.website as string) || '',
      specializations: Array.isArray(body.specializations) ? body.specializations.slice(0, 10) : [],
      operating_hours: (body.operatingHours as string) || '',
      languages: Array.isArray(body.languages) ? body.languages : ['en', 'hi'],
      submitted_by: identity.id,
      chapter_id: (body.chapterId as string) || null,
      campaign_affiliations: Array.isArray(body.campaignAffiliations) ? body.campaignAffiliations : [],
      status: 'pending',
      verification_status: 'self_claimed',
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: 'Failed to submit entry' }, { status: 500 });

  return NextResponse.json({ success: true, entry: toDirectoryEntry(data as DirectoryEntryRow) }, { status: 201 });
}
