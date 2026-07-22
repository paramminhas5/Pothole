import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { checkRateLimit, recordRateLimit } from '@/lib/rate-limit';
import { POST_EXPIRY_HOURS, MAX_DESCRIPTION_LENGTH } from '@/lib/constants';
import { hasBlockingPII } from '@/lib/moderation';

// GET /api/posts — public, returns approved non-expired posts
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const city = searchParams.get('city');
  const category = searchParams.get('category');

  const now = new Date().toISOString();

  let query = supabase
    .from('posts')
    .select('*')
    .eq('status', 'approved')
    .eq('resolved', false)
    .gte('expires_at', now)
    .order('urgency', { ascending: false }) // urgent first
    .order('created_at', { ascending: false });

  if (type) {
    query = query.eq('type', type);
  }
  if (city) {
    query = query.eq('city', city);
  }
  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }

  return NextResponse.json({ posts: data || [] });
}

// POST /api/posts — create a new post (goes to moderation queue)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, category, city, area, urgency, description } = body;

    // Validate
    if (!type || !category || !city || !area || !description?.trim()) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!['need', 'offer'].includes(type)) {
      return NextResponse.json({ error: 'Invalid post type' }, { status: 400 });
    }

    if (!['routine', 'urgent'].includes(urgency || 'routine')) {
      return NextResponse.json({ error: 'Invalid urgency' }, { status: 400 });
    }

    // Check for PII leakage (phone numbers, Aadhaar, etc.)
    if (hasBlockingPII(description)) {
      return NextResponse.json(
        { error: 'Your post contains personal information (phone number, ID number). Please remove it for safety.' },
        { status: 422 }
      );
    }

    // Get or create session
    let sessionId = request.cookies.get('session_id')?.value;
    if (!sessionId) {
      sessionId = crypto.randomUUID();
    }

    // Check rate limit for posting
    const { allowed: postAllowed } = await checkRateLimit(sessionId, 'post');
    if (!postAllowed) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }

    // Check urgent rate limit separately
    if (urgency === 'urgent') {
      const { allowed: urgentAllowed } = await checkRateLimit(sessionId, 'urgent');
      if (!urgentAllowed) {
        return NextResponse.json({ error: 'Urgent post rate limit exceeded' }, { status: 429 });
      }
    }

    // Calculate expiry
    const expiresAt = new Date(Date.now() + POST_EXPIRY_HOURS * 60 * 60 * 1000).toISOString();

    // Insert post as pending
    const { error } = await supabase.from('posts').insert({
      type,
      category,
      city,
      area,
      urgency: urgency || 'routine',
      description: description.trim().slice(0, MAX_DESCRIPTION_LENGTH),
      session_id: sessionId,
      expires_at: expiresAt,
      status: 'pending',
    });

    if (error) {
      return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
    }

    // Record rate limits
    await recordRateLimit(sessionId, 'post');
    if (urgency === 'urgent') {
      await recordRateLimit(sessionId, 'urgent');
    }

    // Set session cookie
    const response = NextResponse.json({ success: true });
    if (!request.cookies.get('session_id')) {
      response.cookies.set('session_id', sessionId, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      });
    }

    return response;
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
