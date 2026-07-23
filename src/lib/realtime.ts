'use client';

/**
 * Supabase Realtime hook for live board updates.
 * Subscribes to Postgres Changes on the `posts` table so new posts appear live.
 */

import { useEffect, useRef, useCallback } from 'react';
import { getPublicSupabaseClient } from '@/lib/supabase';

type RealtimeCallback = (payload: { eventType: string; new?: Record<string, unknown>; old?: Record<string, unknown> }) => void;

/**
 * Subscribe to real-time changes on a Supabase table.
 * Returns cleanup function.
 */
export function useRealtimeSubscription(
  table: string,
  event: 'INSERT' | 'UPDATE' | 'DELETE' | '*',
  callback: RealtimeCallback
) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const supabase = getPublicSupabaseClient();
    const channel = supabase
      .channel(`realtime-${table}`)
      .on(
        'postgres_changes' as unknown as 'system',
        { event, schema: 'public', table } as unknown as Record<string, string>,
        (payload: unknown) => {
          callbackRef.current(payload as { eventType: string; new?: Record<string, unknown>; old?: Record<string, unknown> });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, event]);
}

/**
 * Hook to get live viewer count using Supabase Presence.
 */
export function usePresenceCount(channelName: string) {
  const countRef = useRef(0);
  const setCount = useCallback((n: number) => { countRef.current = n; }, []);

  useEffect(() => {
    const supabase = getPublicSupabaseClient();
    const channel = supabase.channel(channelName);

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        setCount(Object.keys(state).length);
      })
      .subscribe(async (status: string) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({ online_at: new Date().toISOString() });
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [channelName, setCount]);

  return countRef;
}
