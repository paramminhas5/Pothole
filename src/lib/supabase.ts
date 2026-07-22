import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let publicClient: SupabaseClient | undefined;

function requiredPublicConfig(name: 'NEXT_PUBLIC_SUPABASE_URL' | 'NEXT_PUBLIC_SUPABASE_ANON_KEY'): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required public Supabase configuration: ${name}`);
  }
  return value;
}

// This client is safe for browser use and must only rely on the anonymous key + RLS.
export function getPublicSupabaseClient(): SupabaseClient {
  if (!publicClient) {
    publicClient = createClient(
      requiredPublicConfig('NEXT_PUBLIC_SUPABASE_URL'),
      requiredPublicConfig('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
      { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } }
    );
  }
  return publicClient;
}
