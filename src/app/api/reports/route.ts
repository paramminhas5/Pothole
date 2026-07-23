import { NextRequest, NextResponse } from 'next/server';
import { enforceRateLimits } from '@/lib/rate-limit';
import { getOrCreateRequestSession, setSessionCookie } from '@/lib/session';
import { getServiceSupabaseClient } from '@/lib/supabase-server';
import { cleanString, isUuid, parseJsonObject } from '@/lib/validation';

export async function POST(request: NextRequest) {
  const body = await parseJsonObject(request, 3_000);
  const targetType = body?.target_type;
  const targetId = body?.target_id;
  const reason = body ? cleanString(body.reason, 500) : null;
  if ((targetType !== 'chapter' && targetType !== 'post') || !isUuid(targetId) || !reason) {
    return NextResponse.json({ error: 'Invalid report data' }, { status: 400 });
  }

  try {
    const session = getOrCreateRequestSession(request);
    if (!await enforceRateLimits(request, session.id, 'report', 10, 86_400)) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }

    const service = getServiceSupabaseClient();
    const table = targetType === 'post' ? 'posts' : 'chapters';
    const { data: target, error: targetError } = await service
      .from(table)
      .select('id')
      .eq('id', targetId)
      .eq('status', 'approved')
      .maybeSingle();
    if (targetError) return NextResponse.json({ error: 'Failed to submit report' }, { status: 500 });
    if (!target) return NextResponse.json({ error: 'Target not found' }, { status: 404 });

    const { error } = await service.from('reports').insert({
      target_type: targetType,
      target_id: targetId,
      reason,
      session_id: session.id,
    });
    if (error) return NextResponse.json({ error: 'Failed to submit report' }, { status: 500 });
    if (targetType === 'post') {
      await service.rpc('increment_post_report_count', { p_post_id: targetId });
    }

    const response = NextResponse.json({ success: true }, { status: 201 });
    if (session.isNew) setSessionCookie(response, session.token);
    return response;
  } catch {
    return NextResponse.json({ error: 'Report service unavailable' }, { status: 503 });
  }
}
