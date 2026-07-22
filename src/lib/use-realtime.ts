'use client';

import { useEffect } from 'react';
import { supabase } from './supabase';

// Real-time subscription hook for live board updates
export function useRealtimePosts(
  onInsert: () => void,
  onUpdate: () => void
) {
  useEffect(() => {
    const channel = supabase
      .channel('posts-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'posts', filter: 'status=eq.approved' },
        () => onInsert()
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'posts' },
        () => onUpdate()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [onInsert, onUpdate]);
}

export function useRealtimeChapters(onChange: () => void) {
  useEffect(() => {
    const channel = supabase
      .channel('chapters-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'chapters', filter: 'status=eq.approved' },
        () => onChange()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [onChange]);
}
