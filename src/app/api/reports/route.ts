import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// POST /api/reports — report a chapter or post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { target_type, target_id, reason } = body;

    if (!target_type || !target_id || !reason?.trim()) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!['chapter', 'post'].includes(target_type)) {
      return NextResponse.json({ error: 'Invalid target type' }, { status: 400 });
    }

    const sessionId = request.cookies.get('session_id')?.value || 'anonymous';

    const { error } = await supabase.from('reports').insert({
      target_type,
      target_id,
      reason: reason.trim().slice(0, 500),
      session_id: sessionId,
    });

    if (error) {
      return NextResponse.json({ error: 'Failed to submit report' }, { status: 500 });
    }

    // Increment reported_count on posts (best-effort)
    if (target_type === 'post') {
      try {
        await supabase
          .from('posts')
          .update({ reported_count: 1 })
          .eq('id', target_id);
      } catch {
        // Best-effort operation
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
