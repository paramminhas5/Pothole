import 'server-only';

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let serviceClient: SupabaseClient | undefined;

function requiredServerConfig(name: 'NEXT_PUBLIC_SUPABASE_URL' | 'SUPABASE_SERVICE_ROLE_KEY'): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required server configuration: ${name}`);
  }
  return value;
}

// Service-role access bypasses RLS. Keep this module server-only and use it only after
// route-level authorization/validation has established the exact permitted operation.
export function getServiceSupabaseClient(): SupabaseClient {
  if (!serviceClient) {
    const url = requiredServerConfig('NEXT_PUBLIC_SUPABASE_URL');
    const serviceRoleKey = requiredServerConfig('SUPABASE_SERVICE_ROLE_KEY');
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

    if (anonKey && serviceRoleKey === anonKey) {
      throw new Error('Service-role key must not equal the public anonymous key');
    }

    serviceClient = createClient(url, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
      global: { headers: { 'X-Client-Info': 'sahayata-server' } },
    });
  }
  return serviceClient;
}
