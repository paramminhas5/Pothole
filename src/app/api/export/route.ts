import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/export — public JSON export of all approved data
// This powers static mirrors, IPFS pins, and offline redistribution.
// Anyone can fetch this and stand up a mirror.
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get('format') || 'json';
  const scope = searchParams.get('scope') || 'all'; // 'all', 'directory', 'board'

  const now = new Date().toISOString();
  const exportData: Record<string, unknown> = {
    meta: {
      platform: 'Sahayata',
      exported_at: now,
      version: '1.0',
      description: 'Civic Mutual-Aid & Coordination Platform — public data export',
      license: 'CC0-1.0 (public domain)',
      mirrors: [
        'https://sahayata.vercel.app',
        'https://sahayata.pages.dev',
        'https://sahayata.netlify.app',
        // Add more as they come online
      ],
    },
  };

  if (scope === 'all' || scope === 'directory') {
    const { data: chapters } = await supabase
      .from('chapters')
      .select('id, name, city, area, categories, contact_method, description, updated_at')
      .eq('status', 'approved')
      .order('city')
      .order('name');

    exportData.chapters = chapters || [];
  }

  if (scope === 'all' || scope === 'board') {
    const { data: posts } = await supabase
      .from('posts')
      .select('id, type, category, city, area, description, urgency, expires_at, created_at')
      .eq('status', 'approved')
      .eq('resolved', false)
      .gte('expires_at', now)
      .order('urgency', { ascending: false })
      .order('created_at', { ascending: false });

    exportData.posts = posts || [];
  }

  if (format === 'json') {
    return NextResponse.json(exportData, {
      headers: {
        'Access-Control-Allow-Origin': '*', // CORS open — anyone can mirror
        'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
      },
    });
  }

  // HTML format — self-contained static page
  if (format === 'html') {
    const html = generateStaticHTML(exportData);
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300',
      },
    });
  }

  return NextResponse.json(exportData);
}

function generateStaticHTML(data: Record<string, unknown>): string {
  const chapters = (data.chapters as Array<Record<string, unknown>>) || [];
  const posts = (data.posts as Array<Record<string, unknown>>) || [];
  const meta = data.meta as Record<string, unknown>;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sahayata — Civic Mutual-Aid Directory (Static Mirror)</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; background: #FFFDF7; color: #0F0F0F; padding: 16px; max-width: 800px; margin: 0 auto; line-height: 1.6; }
    h1 { font-size: 2rem; font-weight: 900; border-bottom: 3px solid #000; padding-bottom: 12px; margin-bottom: 24px; }
    h2 { font-size: 1.25rem; font-weight: 800; margin: 24px 0 12px; padding: 8px 12px; background: #FF6B00; color: white; }
    .card { border: 2.5px solid #000; padding: 16px; margin: 8px 0; box-shadow: 4px 4px 0 #000; }
    .badge { display: inline-block; padding: 2px 8px; font-size: 11px; font-weight: 700; text-transform: uppercase; border: 2px solid #000; margin: 2px; }
    .badge-need { background: #EF4444; color: white; }
    .badge-offer { background: #84CC16; color: #000; }
    .badge-urgent { background: #EF4444; color: white; }
    .meta { font-size: 12px; color: #525252; margin-top: 8px; }
    .banner { background: #FBBF24; border: 2.5px solid #000; padding: 12px; text-align: center; font-weight: 700; font-size: 13px; text-transform: uppercase; margin-bottom: 24px; }
    a { color: #FF6B00; }
    .mirrors { margin-top: 32px; padding: 16px; border: 2.5px solid #000; background: #f5f5f5; }
  </style>
</head>
<body>
  <h1>🤝 SAHAYATA</h1>
  <div class="banner">STATIC MIRROR — Last exported: ${meta.exported_at} — If this site is down, try the mirrors below</div>

  <h2>📋 DIRECTORY (${chapters.length} groups)</h2>
  ${chapters.map(ch => `
    <div class="card">
      <strong>${ch.name}</strong><br>
      📍 ${ch.city} — ${ch.area}<br>
      ${ch.description ? `<p style="margin:8px 0;font-size:14px;">${ch.description}</p>` : ''}
      <div>${(ch.categories as string[]).map(c => `<span class="badge">${c}</span>`).join('')}</div>
      <p class="meta">Contact: <a href="${ch.contact_method}" target="_blank">${ch.contact_method}</a></p>
    </div>
  `).join('')}

  <h2>🔄 ACTIVE NEEDS & OFFERS (${posts.length})</h2>
  ${posts.map(p => `
    <div class="card">
      <span class="badge badge-${p.type}">${(p.type as string).toUpperCase()}</span>
      ${p.urgency === 'urgent' ? '<span class="badge badge-urgent">⚡ URGENT</span>' : ''}
      <span class="badge">${p.category}</span>
      <p style="margin:8px 0;font-size:14px;">${p.description}</p>
      <p class="meta">📍 ${p.city} — ${p.area} | Expires: ${new Date(p.expires_at as string).toLocaleString()}</p>
    </div>
  `).join('')}

  <div class="mirrors">
    <strong>MIRRORS — If this site is blocked, try:</strong><br>
    ${(meta.mirrors as string[]).map(m => `<a href="${m}" target="_blank">${m}</a><br>`).join('')}
    <p class="meta" style="margin-top:12px;">To create your own mirror: fetch /api/export?format=html and host the HTML anywhere.</p>
  </div>

  <p class="meta" style="margin-top:24px; text-align:center;">
    This data is public domain (CC0). Redistribute freely. No tracking. No ads.
  </p>
</body>
</html>`;
}
