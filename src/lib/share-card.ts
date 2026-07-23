/**
 * Share-Card Engine — generates WhatsApp-optimized images.
 * Client-side Canvas API → PNG. No server needed.
 * Designed at 1080×1350 (4:5 portrait) and 1080×1920 (9:16 story).
 */

export type ShareCardType = 'rti_silence' | 'campaign' | 'demand' | 'rights' | 'deadline';

interface ShareCardData {
  type: ShareCardType;
  title: string;
  stat?: string;
  statLabel?: string;
  institution?: string;
  city?: string;
  campaignUrl?: string;
  daysElapsed?: number;
  penalty?: number;
}

const CARD_WIDTH = 1080;
const CARD_HEIGHT = 1350;

export async function generateShareCard(data: ShareCardData): Promise<Blob | null> {
  if (typeof document === 'undefined') return null;

  const canvas = document.createElement('canvas');
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // Background
  ctx.fillStyle = '#FFFDF7';
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  // Top accent bar
  ctx.fillStyle = '#FF6B00';
  ctx.fillRect(0, 0, CARD_WIDTH, 12);

  // Border
  ctx.strokeStyle = '#0F0F0F';
  ctx.lineWidth = 6;
  ctx.strokeRect(24, 24, CARD_WIDTH - 48, CARD_HEIGHT - 48);

  // Brand
  ctx.font = 'bold 28px "Space Grotesk", system-ui';
  ctx.fillStyle = '#525252';
  ctx.textAlign = 'left';
  ctx.fillText('SAHAYATA', 72, 100);

  // Type label
  const typeLabels: Record<ShareCardType, string> = {
    rti_silence: 'RTI SILENCE REPORT',
    campaign: 'CAMPAIGN UPDATE',
    demand: 'DEMAND TRACKER',
    rights: 'KNOW YOUR RIGHTS',
    deadline: 'DEADLINE ALERT',
  };
  ctx.font = 'bold 24px "IBM Plex Mono", monospace';
  ctx.fillStyle = '#FF6B00';
  ctx.fillText(typeLabels[data.type], 72, 150);

  // Main stat (big number)
  if (data.stat) {
    ctx.font = 'bold 180px "Space Grotesk", system-ui';
    ctx.fillStyle = data.type === 'rti_silence' ? '#DC2626' : '#0F0F0F';
    ctx.textAlign = 'center';
    ctx.fillText(data.stat, CARD_WIDTH / 2, 480);

    if (data.statLabel) {
      ctx.font = 'bold 36px "IBM Plex Mono", monospace';
      ctx.fillStyle = '#525252';
      ctx.fillText(data.statLabel, CARD_WIDTH / 2, 540);
    }
  }

  // Title
  ctx.font = 'bold 48px "Space Grotesk", system-ui';
  ctx.fillStyle = '#0F0F0F';
  ctx.textAlign = 'center';
  wrapText(ctx, data.title, CARD_WIDTH / 2, 680, CARD_WIDTH - 144, 60);

  // Institution
  if (data.institution) {
    ctx.font = 'bold 32px "Inter", system-ui';
    ctx.fillStyle = '#525252';
    ctx.fillText(`→ ${data.institution}`, CARD_WIDTH / 2, 860);
  }

  // City
  if (data.city) {
    ctx.font = '28px "Inter", system-ui';
    ctx.fillStyle = '#9CA3AF';
    ctx.fillText(data.city, CARD_WIDTH / 2, 920);
  }

  // Penalty (RTI specific)
  if (data.penalty && data.penalty > 0) {
    ctx.fillStyle = '#FEF2F2';
    ctx.fillRect(72, 980, CARD_WIDTH - 144, 80);
    ctx.strokeStyle = '#DC2626';
    ctx.lineWidth = 3;
    ctx.strokeRect(72, 980, CARD_WIDTH - 144, 80);
    ctx.font = 'bold 36px "IBM Plex Mono", monospace';
    ctx.fillStyle = '#DC2626';
    ctx.fillText(`PENALTY: ₹${data.penalty.toLocaleString('en-IN')}`, CARD_WIDTH / 2, 1032);
  }

  // Footer with URL
  ctx.fillStyle = '#0F0F0F';
  ctx.fillRect(48, CARD_HEIGHT - 140, CARD_WIDTH - 96, 90);
  ctx.font = 'bold 28px "IBM Plex Mono", monospace';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(data.campaignUrl || 'sahayata.org', CARD_WIDTH / 2, CARD_HEIGHT - 88);

  // Stamp-like verification mark
  ctx.save();
  ctx.translate(CARD_WIDTH - 180, 180);
  ctx.rotate(-0.15);
  ctx.strokeStyle = '#5B21B6';
  ctx.lineWidth = 4;
  ctx.setLineDash([8, 4]);
  ctx.strokeRect(-60, -30, 120, 60);
  ctx.font = 'bold 18px "IBM Plex Mono", monospace';
  ctx.fillStyle = '#5B21B6';
  ctx.textAlign = 'center';
  ctx.fillText('SOURCED', 0, 8);
  ctx.restore();

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), 'image/png', 1.0);
  });
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const words = text.split(' ');
  let line = '';
  let currentY = y;

  for (const word of words) {
    const testLine = line + word + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && line !== '') {
      ctx.fillText(line.trim(), x, currentY);
      line = word + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, currentY);
}

/**
 * Download a share card as PNG
 */
export async function downloadShareCard(data: ShareCardData, filename?: string): Promise<void> {
  const blob = await generateShareCard(data);
  if (!blob) return;

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || `sahayata-${data.type}-${Date.now()}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Share a card via Web Share API (mobile) or download (desktop)
 */
export async function shareCard(data: ShareCardData, shareText: string): Promise<void> {
  const blob = await generateShareCard(data);
  if (!blob) return;

  const file = new File([blob], `sahayata-${data.type}.png`, { type: 'image/png' });

  if (navigator.share && navigator.canShare?.({ files: [file] })) {
    await navigator.share({
      text: shareText,
      files: [file],
      url: data.campaignUrl,
    });
  } else {
    await downloadShareCard(data);
  }
}
