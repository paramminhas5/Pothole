import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabaseClient } from '@/lib/supabase-server';
import { toLedgerEntry } from '@/lib/dto/ledger';
import type { LedgerEntryRow } from '@/types/database';

/**
 * GET /api/ledger — Public accountability ledger
 * Filterable by city, institution, status. No login needed.
 * This is the journalist's bookmark and the SEO surface.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  const institution = searchParams.get('institution');
  const status = searchParams.get('status');
  const limit = Math.min(100, parseInt(searchParams.get('limit') || '50'));
  const offset = parseInt(searchParams.get('offset') || '0');

  const service = getServiceSupabaseClient();
  let query = service
    .from('ledger_entries')
    .select(`
      *,
      campaigns!inner(slug, title)
    `)
    .order('days_elapsed', { ascending: false })
    .range(offset, offset + limit - 1);

  if (city) query = query.eq('target_city', city);
  if (institution) query = query.ilike('target_institution', `%${institution}%`);
  if (status) query = query.eq('response_status', status);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: 'Failed to load ledger' }, { status: 500 });

  const entries = (data || []).map((row: LedgerEntryRow & { campaigns: { slug: string; title: string } }) =>
    toLedgerEntry({
      ...row,
      campaign_slug: row.campaigns?.slug || '',
      campaign_title: row.campaigns?.title || '',
    })
  );

  // Aggregate stats
  const { data: stats } = await service
    .from('ledger_entries')
    .select('response_status');

  const totalEntries = stats?.length || 0;
  const silentCount = stats?.filter(s => s.response_status === 'silent').length || 0;
  const respondedCount = stats?.filter(s => ['full_response', 'partial_response', 'acknowledged'].includes(s.response_status)).length || 0;

  return NextResponse.json({
    entries,
    stats: { total: totalEntries, silent: silentCount, responded: respondedCount },
    count: entries.length,
  });
}
