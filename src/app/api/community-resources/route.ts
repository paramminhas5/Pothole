import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabaseClient } from '@/lib/supabase-server';

const PUBLIC_FIELDS = 'id, type, name, city, state, contact, description, source, created_at';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const city = searchParams.get('city');

  try {
    let query = getServiceSupabaseClient()
      .from('community_resources')
      .select(PUBLIC_FIELDS)
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .limit(100);

    if (type) query = query.eq('type', type);
    if (city) query = query.eq('city', city);

    const { data, error } = await query;
    if (error) return NextResponse.json({ resources: [] }, { headers: { 'Cache-Control': 'public, max-age=60' } });
    return NextResponse.json({ resources: data || [] }, { headers: { 'Cache-Control': 'public, max-age=60' } });
  } catch {
    return NextResponse.json({ resources: [] });
  }
}
