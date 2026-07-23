import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabaseClient } from '@/lib/supabase-server';
import { getOrCreateRequestSession, setSessionCookie } from '@/lib/session';
import { parseJsonObject } from '@/lib/validation';

export async function POST(request: NextRequest) {
  const body = await parseJsonObject(request, 2_000);
  const passphraseHash = body?.passphrase_hash;

  if (!passphraseHash || typeof passphraseHash !== 'string' || !/^[0-9a-f]{64}$/.test(passphraseHash)) {
    return NextResponse.json({ error: 'Valid passphrase hash required' }, { status: 400 });
  }

  try {
    const service = getServiceSupabaseClient();
    const { data, error } = await service.rpc('get_or_create_identity', {
      p_passphrase_hash: passphraseHash,
    });

    if (error) {
      return NextResponse.json({ error: 'Identity service unavailable' }, { status: 503 });
    }

    const row = Array.isArray(data) ? data[0] : data;
    if (!row || !row.identity_id) {
      return NextResponse.json({ error: 'Identity creation failed' }, { status: 500 });
    }

    // Bind identity to session
    const session = getOrCreateRequestSession(request);
    const response = NextResponse.json({
      success: true,
      identity: {
        id: row.identity_id,
        displayName: row.display_name,
        role: row.role,
        isNew: row.is_new,
      },
    });

    if (session.isNew) setSessionCookie(response, session.token);

    // Store identity-session binding
    await service.from('verified_sessions').upsert({
      session_id: session.id,
      email: `identity:${row.identity_id}`,
      verified_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 30 * 86_400_000).toISOString(),
    }, { onConflict: 'session_id' });

    return response;
  } catch {
    return NextResponse.json({ error: 'Auth service unavailable' }, { status: 503 });
  }
}
