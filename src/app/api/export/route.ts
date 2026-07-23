import { NextRequest, NextResponse } from 'next/server';
import { escapeHtml, safePublicHref, staticHtmlHeaders } from '@/lib/output';
import { getPublicSupabaseClient } from '@/lib/supabase';

const PUBLIC_CHAPTER_FIELDS = 'id, name, city, area, categories, contact_method, description, updated_at';
const PUBLIC_POST_FIELDS = 'id, type, category, city, area, description, urgency, expires_at, created_at';

type ExportRecord = Record<string, unknown>;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get('format') || 'json';
  const scope = searchParams.get('scope') || 'all';
  if (!['json', 'html'].includes(format) || !['all', 'directory', 'board'].includes(scope)) {
    return NextResponse.json({ error: 'Invalid export options' }, { status: 400 });
  }

  const now = new Date().toISOString();
  const exportData: ExportRecord = {
    meta: {
      platform: 'Sahayata',
      exported_at: now,
      version: '1.0',
      description: 'Public prototype data export. Records are submissions, not verified services.',
    },
  };
  const supabase = getPublicSupabaseClient();

  if (scope === 'all' || scope === 'directory') {
    const { data, error } = await supabase.from('chapters')
      .select(PUBLIC_CHAPTER_FIELDS)
      .order('city')
      .order('name')
      .limit(1_000);
    if (error) return NextResponse.json({ error: 'Export unavailable' }, { status: 500 });
    exportData.chapters = (data || []).map((chapter) => ({
      ...chapter,
      contact_method: safePublicHref(chapter.contact_method) || '',
    }));
  }

  if (scope === 'all' || scope === 'board') {
    const { data, error } = await supabase.from('posts')
      .select(PUBLIC_POST_FIELDS)
      .gte('expires_at', now)
      .order('urgency', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(1_000);
    if (error) return NextResponse.json({ error: 'Export unavailable' }, { status: 500 });
    exportData.posts = data || [];
  }

  if (format === 'json') {
    return NextResponse.json(exportData, {
      headers: { 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'public, max-age=300', 'X-Content-Type-Options': 'nosniff' },
    });
  }

  return new NextResponse(generateStaticHTML(exportData), {
    headers: { ...staticHtmlHeaders(), 'Access-Control-Allow-Origin': '*' },
  });
}

function categories(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
}

function generateStaticHTML(data: ExportRecord): string {
  const chapters = Array.isArray(data.chapters) ? data.chapters as ExportRecord[] : [];
  const posts = Array.isArray(data.posts) ? data.posts as ExportRecord[] : [];
  const meta = data.meta as ExportRecord;

  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Sahayata — Civic Mutual-Aid Directory</title><style>
*{box-sizing:border-box}body{font-family:system-ui,sans-serif;background:#FFFDF7;color:#0F0F0F;padding:16px;max-width:800px;margin:auto;line-height:1.6}h1{border-bottom:3px solid #000}h2{font-size:1.25rem;background:#FF6B00;color:#fff;padding:8px 12px}.card{border:2.5px solid #000;padding:16px;margin:8px 0;box-shadow:4px 4px 0 #000}.badge{display:inline-block;padding:2px 8px;font-size:11px;font-weight:700;text-transform:uppercase;border:2px solid #000;margin:2px}.meta{font-size:12px;color:#525252}.banner{background:#FBBF24;border:2.5px solid #000;padding:12px;text-align:center;font-weight:700}a{color:#B54700}</style></head><body>
<h1>SAHAYATA</h1><div class="banner">PROTOTYPE SNAPSHOT — Exported: ${escapeHtml(meta.exported_at)} — Listings are not verified services.</div>
<h2>DIRECTORY (${chapters.length} groups)</h2>
${chapters.map((chapter) => {
  const contact = String(chapter.contact_method ?? '');
  const href = safePublicHref(contact);
  return `<div class="card"><strong>${escapeHtml(chapter.name)}</strong><br>Location: ${escapeHtml(chapter.city)} — ${escapeHtml(chapter.area)}
  ${chapter.description ? `<p>${escapeHtml(chapter.description)}</p>` : ''}
  <div>${categories(chapter.categories).map((category) => `<span class="badge">${escapeHtml(category)}</span>`).join('')}</div>
  <p class="meta">Contact: ${href ? `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(contact)}</a>` : escapeHtml(contact)}</p></div>`;
}).join('')}
<h2>ACTIVE NEEDS &amp; OFFERS (${posts.length})</h2>
${posts.map((post) => `<div class="card"><span class="badge">${escapeHtml(post.type)}</span><span class="badge">${escapeHtml(post.urgency)}</span><span class="badge">${escapeHtml(post.category)}</span>
<p>${escapeHtml(post.description)}</p><p class="meta">Location: ${escapeHtml(post.city)} — ${escapeHtml(post.area)} | Expires: ${escapeHtml(post.expires_at)}</p></div>`).join('')}
</body></html>`;
}
