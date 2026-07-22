import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { checkRateLimit, recordRateLimit } from '@/lib/rate-limit';

// GET /api/chapters — public, returns approved chapters
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  const category = searchParams.get('category');

  let query = supabase
    .from('chapters')
    .select('*')
    .eq('status', 'approved')
    .order('updated_at', { ascending: false });

  if (city) {
    query = query.eq('city', city);
  }
  if (category) {
    query = query.contains('categories', [category]);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch chapters' }, { status: 500 });
  }

  return NextResponse.json({ chapters: data || [] });
}

// POST /api/chapters — submit new chapter (goes to moderation queue)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, city, area, categories, contact_method, description } = body;

    // Validate required fields
    if (!name || !city || !area || !categories?.length || !contact_method) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get or create session for rate limiting
    const sessionId = request.cookies.get('session_id')?.value || 'anonymous';

    // Check rate limit
    const { allowed } = await checkRateLimit(sessionId, 'chapter_submit');
    if (!allowed) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }

    // Insert chapter as pending
    const { error } = await supabase.from('chapters').insert({
      name: name.slice(0, 200),
      city,
      area,
      categories,
      contact_method: contact_method.slice(0, 500),
      description: (description || '').slice(0, 500),
      status: 'pending',
    });

    if (error) {
      return NextResponse.json({ error: 'Failed to submit chapter' }, { status: 500 });
    }

    // Record rate limit
    await recordRateLimit(sessionId, 'chapter_submit');

    // Set session cookie if not present
    const response = NextResponse.json({ success: true });
    if (!request.cookies.get('session_id')) {
      response.cookies.set('session_id', crypto.randomUUID(), {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });
    }

    return response;
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
