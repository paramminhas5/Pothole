import { supabase } from './supabase';
import { RATE_LIMIT_POSTS_PER_HOUR, RATE_LIMIT_URGENT_PER_DAY } from './constants';

export async function checkRateLimit(
  sessionId: string,
  actionType: 'post' | 'urgent' | 'chapter_submit'
): Promise<{ allowed: boolean; remaining: number }> {
  const now = new Date();

  if (actionType === 'urgent') {
    // 2 urgent posts per day
    const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
    const { count } = await supabase
      .from('rate_limits')
      .select('*', { count: 'exact', head: true })
      .eq('session_id', sessionId)
      .eq('action_type', 'urgent')
      .gte('created_at', dayAgo);

    const used = count || 0;
    return {
      allowed: used < RATE_LIMIT_URGENT_PER_DAY,
      remaining: Math.max(0, RATE_LIMIT_URGENT_PER_DAY - used),
    };
  }

  // 5 posts per hour for general posting
  const hourAgo = new Date(now.getTime() - 60 * 60 * 1000).toISOString();
  const { count } = await supabase
    .from('rate_limits')
    .select('*', { count: 'exact', head: true })
    .eq('session_id', sessionId)
    .eq('action_type', actionType)
    .gte('created_at', hourAgo);

  const used = count || 0;
  const limit = RATE_LIMIT_POSTS_PER_HOUR;
  return {
    allowed: used < limit,
    remaining: Math.max(0, limit - used),
  };
}

export async function recordRateLimit(sessionId: string, actionType: string): Promise<void> {
  await supabase.from('rate_limits').insert({
    session_id: sessionId,
    action_type: actionType,
  });
}
