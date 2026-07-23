import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabaseClient } from '@/lib/supabase-server';
import { getRequestIdentity } from '@/lib/identity';
import { toRTISummary } from '@/lib/dto/rti';
import { generateRTIApplication } from '@/lib/rti-engine';
import { parseJsonObject, cleanString } from '@/lib/validation';
import { readRequestSessionId } from '@/lib/session';
import { enforceRateLimits } from '@/lib/rate-limit';
import type { RTIFilingRow } from '@/types/database';

/**
 * GET /api/rti — List user's RTI filings (requires identity)
 */
export async function GET(request: NextRequest) {
  const identity = await getRequestIdentity(request);
  if (!identity) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });

  const service = getServiceSupabaseClient();
  const { data, error } = await service
    .from('rti_filings')
    .select('*')
    .eq('identity_id', identity.id)
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: 'Failed to load RTI filings' }, { status: 500 });

  const filings = (data as RTIFilingRow[]).map(toRTISummary);
  return NextResponse.json({ filings });
}

/**
 * POST /api/rti — Create a tracked RTI filing
 * Can be anonymous (street layer, save locally) or identity-linked (power layer)
 */
export async function POST(request: NextRequest) {
  const sessionId = readRequestSessionId(request);
  if (sessionId) {
    const allowed = await enforceRateLimits(request, sessionId, 'rti_create', 10, 3600);
    if (!allowed) return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  const body = await parseJsonObject(request, 10_000);
  if (!body) return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });

  const authorityName = cleanString(body.authorityName, 300);
  const authorityAddress = cleanString(body.authorityAddress, 500, 0) || '';
  const subject = cleanString(body.subject, 500);
  const questions = Array.isArray(body.questions) ? body.questions.filter((q: unknown) => typeof q === 'string' && q.length > 0).slice(0, 10) : [];
  const city = cleanString(body.city, 100) || '';
  const campaignId = (typeof body.campaignId === 'string' && /^[0-9a-f-]{36}$/.test(body.campaignId)) ? body.campaignId : null;
  const trackIt = body.track === true; // Power layer: track and escalate

  if (!authorityName || !subject || questions.length === 0) {
    return NextResponse.json({ error: 'Authority name, subject, and at least one question required' }, { status: 400 });
  }

  // Generate the RTI document
  const doc = generateRTIApplication({
    authorityName,
    authorityAddress,
    subject,
    questions,
    city,
  });

  // If user wants to track (power layer), save to DB
  if (trackIt) {
    const identity = await getRequestIdentity(request);
    if (!identity) {
      return NextResponse.json({
        error: 'Authentication required to track RTIs. You can still download the document anonymously.',
        document: doc,
      }, { status: 401 });
    }

    const service = getServiceSupabaseClient();
    const { data, error } = await service
      .from('rti_filings')
      .insert({
        identity_id: identity.id,
        authority_name: authorityName,
        authority_address: authorityAddress,
        subject,
        questions,
        filed_date: doc.filedDate,
        status: 'filed',
        deadline_date: doc.deadlineDate,
        campaign_id: campaignId,
        city,
        generated_documents: [{ type: doc.type, title: doc.title, generatedAt: new Date().toISOString() }],
      })
      .select()
      .single();

    if (error) return NextResponse.json({ error: 'Failed to save filing' }, { status: 500 });

    return NextResponse.json({
      success: true,
      filing: toRTISummary(data as RTIFilingRow),
      document: doc,
    }, { status: 201 });
  }

  // Anonymous mode: just return the document
  return NextResponse.json({ success: true, document: doc });
}
