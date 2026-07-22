import { cookies } from 'next/headers';

// Lightweight session management using cookies — no login required
// Just enough to rate-limit abuse without collecting personal data

export async function getSessionId(): Promise<string> {
  const cookieStore = await cookies();
  let sessionId = cookieStore.get('session_id')?.value;

  if (!sessionId) {
    sessionId = generateSessionId();
    // Note: cookies can only be set in Server Actions or Route Handlers
  }

  return sessionId;
}

export function generateSessionId(): string {
  return crypto.randomUUID();
}
