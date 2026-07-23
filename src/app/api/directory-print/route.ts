import { NextRequest, NextResponse } from 'next/server';
import { CATEGORIES, CITIES_AREAS } from '@/lib/constants';
import { escapeHtml, staticHtmlHeaders } from '@/lib/output';
import { getPublicSupabaseClient } from '@/lib/supabase';

const CITIES = new Set(CITIES_AREAS.map(({ city }) => city));
const PUBLIC_CHAPTER_FIELDS = 'id, name, city, area, categories, contact_method, description, updated_at';

export async function GET(request: NextRequest) {
  const city = new URL(request.url).searchParams.get('city') || '';
  if (city && !CITIES.has(city)) return NextResponse.json({ error: 'Invalid city' }, { status: 400 });

  let query = getPublicSupabaseClient().from('chapters')
    .select(PUBLIC_CHAPTER_FIELDS)
    .order('name')
    .limit(500);
  if (city) query = query.eq('city', city);
  const { data: chapters, error } = await query;
  if (error) return NextResponse.json({ error: 'Directory unavailable' }, { status: 500 });

  const categoryLabel = (category: string) => CATEGORIES.find((item) => item.value === category)?.labelEn || category;
  const safeCity = escapeHtml(city || 'All Cities');
  const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Sahayata Directory — ${safeCity}</title><style>*{box-sizing:border-box}body{font-family:system-ui,sans-serif;padding:20px;max-width:800px;margin:auto;font-size:12px;line-height:1.5}h1{font-size:24px;border-bottom:3px solid #000}.chapter{border:2px solid #000;padding:10px;margin:6px 0;page-break-inside:avoid}.meta{font-size:10px;color:#525252}.cat{display:inline-block;border:1px solid #000;padding:1px 5px;margin:1px;font-weight:600}.contact{font-size:11px;font-weight:600}.footer{margin-top:20px;border-top:2px solid #000;font-size:10px;text-align:center}@media print{body{padding:10px}.chapter{border-width:1px}}</style></head><body>
<h1>SAHAYATA — ${safeCity} Directory</h1><p>Printed: ${escapeHtml(new Date().toLocaleDateString('en-IN'))}</p>
${(chapters || []).length === 0 ? '<p>No chapters found for this city.</p>' : (chapters || []).map((chapter) => {
  const categoryValues = Array.isArray(chapter.categories) ? chapter.categories.filter((item): item is string => typeof item === 'string') : [];
  return `<div class="chapter"><h3>${escapeHtml(chapter.name)}</h3><p class="meta">Location: ${escapeHtml(chapter.city)} — ${escapeHtml(chapter.area)}</p>
  ${chapter.description ? `<p>${escapeHtml(chapter.description)}</p>` : ''}<p>${categoryValues.map((category) => `<span class="cat">${escapeHtml(categoryLabel(category))}</span>`).join(' ')}</p>
  <p class="contact">Contact: ${escapeHtml(chapter.contact_method)}</p></div>`;
}).join('')}
<div class="footer"><p><strong>sahayata.vercel.app</strong> · Emergency: 112</p></div></body></html>`;
  return new NextResponse(html, { headers: { ...staticHtmlHeaders('public, max-age=300'), 'Access-Control-Allow-Origin': '*' } });
}
