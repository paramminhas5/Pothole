import { NextResponse } from 'next/server';
import { getServiceSupabaseClient } from '@/lib/supabase-server';

export async function GET() {
  try {
    const { data, error } = await getServiceSupabaseClient()
      .from('situation_updates')
      .select('*')
      .eq('is_current', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      return NextResponse.json({ situation: null }, { headers: { 'Cache-Control': 'public, max-age=60' } });
    }

    return NextResponse.json({ situation: data }, { headers: { 'Cache-Control': 'public, max-age=60' } });
  } catch {
    return NextResponse.json({ situation: null });
  }
}
