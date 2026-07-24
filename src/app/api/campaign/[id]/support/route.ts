import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabaseClient } from '@/lib/supabase-server';
import { getRequestIdentity } from '@/lib/identity';

/**
 * POST /api/campaign/[id]/support — Support a campaign
 */
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const identity = await getRequestIdentity(request);
  if (!identity) return NextResponse.json({ error: 'Sign in to support' }, { status: 401 });

  const service = getServiceSupabaseClient();

  const { error } = await service
    .from('campaign_supporters')
    .upsert({
      campaign_id: id,
      identity_id: identity.id,
      support_type: 'endorse',
    }, { onConflict: 'campaign_id,identity_id' });

  if (error) return NextResponse.json({ error: 'Failed' }, { status: 500 });
  return NextResponse.json({ success: true });
}
