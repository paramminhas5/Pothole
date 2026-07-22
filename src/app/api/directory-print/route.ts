import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { CATEGORIES } from '@/lib/constants';

// GET /api/directory-print?city=Delhi — printable HTML for a specific city
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city') || '';

  let query = supabase
    .from('chapters')
    .select('*')
    .eq('status', 'approved')
    .order('name');

  if (city) {
    query = query.eq('city', city);
  }

  const { data: chapters } = await query;

  const getCatLabel = (cat: string) => CATEGORIES.find(c => c.value === cat)?.labelEn || cat;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sahayata Directory${city ? ` — ${city}` : ''}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; font-size: 12px; line-height: 1.5; }
    h1 { font-size: 24px; font-weight: 900; border-bottom: 3px solid #000; padding-bottom: 8px; margin-bottom: 16px; }
    h2 { font-size: 14px; font-weight: 800; margin: 16px 0 8px; padding: 4px 8px; background: #FF6B00; color: white; }
    .chapter { border: 2px solid #000; padding: 10px; margin: 6px 0; page-break-inside: avoid; }
    .chapter h3 { font-size: 13px; font-weight: 700; }
    .meta { font-size: 10px; color: #525252; }
    .cats { font-size: 10px; }
    .cat { display: inline-block; border: 1px solid #000; padding: 1px 5px; margin: 1px; font-weight: 600; }
    .contact { font-size: 11px; font-weight: 600; color: #FF6B00; }
    .footer { margin-top: 20px; padding-top: 12px; border-top: 2px solid #000; font-size: 10px; text-align: center; color: #525252; }
    .qr { text-align: center; margin-top: 12px; }
    @media print { body { padding: 10px; } .chapter { border-width: 1px; } }
  </style>
</head>
<body>
  <h1>🤝 SAHAYATA — ${city || 'All Cities'} Directory</h1>
  <p style="margin-bottom: 16px; font-size: 11px;">Civic Mutual-Aid & Coordination Platform · Printed: ${new Date().toLocaleDateString('en-IN')}</p>

  ${(chapters || []).length === 0
    ? '<p>No chapters found for this city.</p>'
    : (chapters || []).map(ch => `
    <div class="chapter">
      <h3>${ch.name}</h3>
      <p class="meta">📍 ${ch.city} — ${ch.area}</p>
      ${ch.description ? `<p style="margin: 4px 0; font-size: 11px;">${ch.description}</p>` : ''}
      <p class="cats">${(ch.categories as string[]).map(c => `<span class="cat">${getCatLabel(c)}</span>`).join(' ')}</p>
      <p class="contact">Contact: ${ch.contact_method}</p>
    </div>
  `).join('')}

  <div class="footer">
    <p><strong>sahayata.vercel.app</strong> · No tracking · No ads · Posts expire in 72h</p>
    <p>NALSA Free Legal Aid: 15100 (toll-free) · Emergency: 112</p>
    <div class="qr">
      <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://sahayata.vercel.app/directory${city ? `?city=${encodeURIComponent(city)}` : ''}" alt="QR Code" width="80" height="80" />
      <p style="font-size: 9px; margin-top: 4px;">Scan for live version</p>
    </div>
  </div>
</body>
</html>`;

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
