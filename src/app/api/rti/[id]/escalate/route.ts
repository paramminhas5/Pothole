import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabaseClient } from '@/lib/supabase-server';
import { getRequestIdentity } from '@/lib/identity';
import { generateFirstAppeal, generateICComplaint } from '@/lib/rti-engine';
import type { RTIFilingRow } from '@/types/database';

/**
 * POST /api/rti/[id]/escalate — Generate next escalation document
 * Day 31+: First Appeal
 * After appeal expiry: IC Complaint
 */
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const identity = await getRequestIdentity(request);
  if (!identity) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });

  const service = getServiceSupabaseClient();
  const { data: filing } = await service
    .from('rti_filings')
    .select('*')
    .eq('id', id)
    .eq('identity_id', identity.id)
    .single();

  if (!filing) return NextResponse.json({ error: 'Filing not found' }, { status: 404 });

  const row = filing as RTIFilingRow;

  // Determine which escalation is next
  if (!row.appeal_filed_date) {
    // Generate First Appeal
    const daysElapsed = Math.floor((Date.now() - new Date(row.filed_date).getTime()) / 86_400_000);
    if (daysElapsed < 30) {
      return NextResponse.json({ error: 'Cannot appeal before 30-day deadline expires' }, { status: 400 });
    }

    const doc = generateFirstAppeal({
      authorityName: row.authority_name,
      subject: row.subject,
      filedDate: row.filed_date,
      city: row.city,
    });

    // Update filing status
    await service.from('rti_filings').update({
      status: 'first_appeal',
      appeal_filed_date: doc.filedDate,
      appeal_deadline: doc.deadlineDate,
      generated_documents: [
        ...(row.generated_documents as Array<Record<string, string>> || []),
        { type: doc.type, title: doc.title, generatedAt: new Date().toISOString() },
      ],
    }).eq('id', id);

    return NextResponse.json({ success: true, document: doc, nextAction: 'Wait for appeal response or file IC complaint after 30 days' });
  }

  if (!row.ic_complaint_date) {
    // Generate IC Complaint
    const doc = generateICComplaint({
      authorityName: row.authority_name,
      subject: row.subject,
      filedDate: row.filed_date,
      appealDate: row.appeal_filed_date,
      city: row.city,
    });

    await service.from('rti_filings').update({
      status: 'ic_complaint',
      ic_complaint_date: doc.filedDate,
      generated_documents: [
        ...(row.generated_documents as Array<Record<string, string>> || []),
        { type: doc.type, title: doc.title, generatedAt: new Date().toISOString() },
      ],
    }).eq('id', id);

    return NextResponse.json({ success: true, document: doc, nextAction: 'Await Information Commission hearing' });
  }

  return NextResponse.json({ error: 'All escalation steps completed' }, { status: 400 });
}
