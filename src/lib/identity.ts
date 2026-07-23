import 'server-only';

import { NextRequest } from 'next/server';
import { readRequestSessionId } from './session';
import { getServiceSupabaseClient } from './supabase-server';

export interface AuthenticatedIdentity {
  id: string;
  displayName: string;
  role: string;
  email: string | null;
  emailVerified: boolean;
  city: string;
  skills: string[];
  chapterId: string | null;
  onboarded: boolean;
}

/**
 * Get the authenticated identity from the request session.
 * Returns null if not authenticated (street layer user).
 * This is the gateway between street and power layer.
 */
export async function getRequestIdentity(request: NextRequest): Promise<AuthenticatedIdentity | null> {
  const sessionId = readRequestSessionId(request);
  if (!sessionId) return null;

  const service = getServiceSupabaseClient();

  // Look up verified session → identity binding
  const { data: session } = await service
    .from('verified_sessions')
    .select('email')
    .eq('session_id', sessionId)
    .gt('expires_at', new Date().toISOString())
    .single();

  if (!session?.email) return null;

  // Check if it's an identity-bound session
  if (session.email.startsWith('identity:')) {
    const identityId = session.email.replace('identity:', '');
    const { data: identity } = await service
      .from('identities')
      .select('id, display_name, role, email, email_verified, city, skills, chapter_id, onboarded')
      .eq('id', identityId)
      .single();

    if (!identity) return null;

    return {
      id: identity.id,
      displayName: identity.display_name,
      role: identity.role,
      email: identity.email,
      emailVerified: identity.email_verified ?? false,
      city: identity.city ?? '',
      skills: identity.skills ?? [],
      chapterId: identity.chapter_id,
      onboarded: identity.onboarded ?? false,
    };
  }

  // Email-verified session — find or bind identity
  const { data: identity } = await service
    .from('identities')
    .select('id, display_name, role, email, email_verified, city, skills, chapter_id, onboarded')
    .eq('email', session.email)
    .single();

  if (!identity) return null;

  return {
    id: identity.id,
    displayName: identity.display_name,
    role: identity.role,
    email: identity.email,
    emailVerified: identity.email_verified ?? true,
    city: identity.city ?? '',
    skills: identity.skills ?? [],
    chapterId: identity.chapter_id,
    onboarded: identity.onboarded ?? false,
  };
}

/**
 * Require authenticated identity or return 401 response.
 */
export async function requireIdentity(request: NextRequest): Promise<AuthenticatedIdentity | null> {
  return getRequestIdentity(request);
}
