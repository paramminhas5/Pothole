import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabaseClient } from '@/lib/supabase-server';
import { getOrCreateRequestSession, setSessionCookie } from '@/lib/session';
import { parseJsonObject } from '@/lib/validation';

export async function POST(request: NextRequest) {
  const body = await parseJsonObject(request, 1_000);
  const taskId = body?.task_id;

  if (!taskId || typeof taskId !== 'string' || taskId.length > 100) {
    return NextResponse.json({ error: 'Valid task_id required' }, { status: 400 });
  }

  try {
    const session = getOrCreateRequestSession(request);
    const service = getServiceSupabaseClient();

    // Check if already claimed by this session
    const { data: existing } = await service
      .from('task_claims')
      .select('id')
      .eq('task_id', taskId)
      .eq('session_id', session.id)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ error: 'Already claimed by you' }, { status: 409 });
    }

    // Check if claimed by someone else
    const { data: otherClaim } = await service
      .from('task_claims')
      .select('id')
      .eq('task_id', taskId)
      .eq('status', 'claimed')
      .maybeSingle();

    if (otherClaim) {
      return NextResponse.json({ error: 'Already claimed by someone else' }, { status: 409 });
    }

    const { error } = await service.from('task_claims').insert({
      task_id: taskId,
      session_id: session.id,
      status: 'claimed',
    });

    if (error) return NextResponse.json({ error: 'Failed to claim task' }, { status: 500 });

    const response = NextResponse.json({ success: true, message: 'Task claimed!' }, { status: 201 });
    if (session.isNew) setSessionCookie(response, session.token);
    return response;
  } catch {
    return NextResponse.json({ error: 'Task service unavailable' }, { status: 503 });
  }
}
