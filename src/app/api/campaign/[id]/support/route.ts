import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabaseClient } from '@/lib/supabase-server';
import { getRequestIdentity } from '@/lib/identity';
import { parseJsonObject } from '@/lib/validation';

/**
 * POST /api/campaign/[id]/support — Join/support a campaign
 * Connects people to campaigns through endorsement or volunteering
 */
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const identity = await getRequestIdentity(request);
  if (!identity) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });

  const body = await parseJsonObject(request, 2_000);
  const supportType = (body?.supportType as string) || 'endorse';
  const message = (body?.message as string) || '';

  if (!['endorse', 'volunteer', 'skill_offer', 'resource'].includes(supportType)) {
    return NextResponse.json({ error: 'Invalid support type' }, { status: 400 });
  }

  const service = getServiceSupabaseClient();

  // Verify campaign exists and is active
  const { data: campaign } = await service
    .from('campaigns')
    .select('id, status')
    .eq('id', id)
    .single();

  if (!campaign || campaign.status === 'draft') {
    return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
  }

  // Add supporter (upsert to handle duplicates)
  const { error } = await service
    .from('campaign_supporters')
    .upsert({
      campaign_id: id,
      identity_id: identity.id,
      support_type: supportType,
      message: message.slice(0, 500),
    }, { onConflict: 'campaign_id,identity_id' });

  if (error) return NextResponse.json({ error: 'Failed to register support' }, { status: 500 });

  return NextResponse.json({ success: true });
}
