import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Simple admin auth check via header
function isAdmin(request: NextRequest): boolean {
  const adminSecret = process.env.ADMIN_SECRET || 'admin-dev-secret';
  const authHeader = request.headers.get('x-admin-secret');
  return authHeader === adminSecret;
}

// GET /api/admin/chapters — get pending chapters
export async function GET(request: NextRequest) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('chapters')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: true });

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch chapters' }, { status: 500 });
  }

  return NextResponse.json({ chapters: data || [] });
}

// PATCH /api/admin/chapters — approve or reject a chapter
export async function PATCH(request: NextRequest) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, action } = body;

    if (!id || !['approve', 'reject'].includes(action)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const newStatus = action === 'approve' ? 'approved' : 'rejected';

    const { error } = await supabase
      .from('chapters')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: 'Failed to update chapter' }, { status: 500 });
    }

    return NextResponse.json({ success: true, status: newStatus });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
