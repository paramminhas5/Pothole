import { cookies } from 'next/headers';
import { Locale } from '@/types';

export default async function TelegramGuidePage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const isHindi = locale === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-10">
        <div className="brutal-badge brutal-badge-sky mb-4">{isHindi ? 'टेलीग्राम' : 'TELEGRAM'}</div>
        <h1 className="heading-1 mb-3">{isHindi ? 'टेलीग्राम बॉट / चैनल गाइड' : 'Telegram Bot / Channel Guide'}</h1>
        <p className="text-[var(--color-text-muted)] text-lg">
          {isHindi ? 'अधिकतर लोग वेबसाइट चेक नहीं करते — वे Telegram पर हैं। यह गाइड बताती है कि Sahayata को Telegram से कैसे जोड़ें।' : 'Most people don\'t check websites — they\'re on Telegram. This guide shows how to connect Sahayata to Telegram.'}
        </p>
      </div>

      {/* Option 1: Broadcast Channel */}
      <section className="brutal-card mb-6">
        <div className="brutal-badge brutal-badge-accent mb-4">{isHindi ? 'विकल्प 1' : 'OPTION 1'}</div>
        <h2 className="heading-2 mb-4">{isHindi ? 'प्रसारण चैनल (सबसे आसान)' : 'Broadcast Channel (Easiest)'}</h2>
        <div className="space-y-3 text-sm leading-relaxed">
          <p className="font-bold">{isHindi ? 'यह क्या करता है:' : 'What it does:'}</p>
          <p>{isHindi ? 'एक Telegram channel जहाँ एक coordinator हर नई approved post और directory update मैन्युअली या ऑटोमेटिक share करता है।' : 'A Telegram channel where a coordinator shares every new approved post and directory update manually or automatically.'}</p>
          <div className="brutal-card-flat !p-4">
            <h3 className="font-bold text-xs uppercase tracking-wider mb-2">{isHindi ? 'सेटअप (5 मिनट)' : 'SETUP (5 MINUTES)'}</h3>
            <ol className="list-decimal list-inside space-y-1.5">
              <li>{isHindi ? 'Telegram में "New Channel" बनाएं' : 'Create "New Channel" in Telegram'}</li>
              <li>{isHindi ? 'नाम: "Sahayata [शहर]" (e.g. "Sahayata Delhi")' : 'Name: "Sahayata [City]" (e.g. "Sahayata Delhi")'}</li>
              <li>{isHindi ? 'Public करें, link set करें: t.me/sahayata_delhi' : 'Make it Public, set link: t.me/sahayata_delhi'}</li>
              <li>{isHindi ? 'Description में Sahayata website URL डालें' : 'Put Sahayata website URL in Description'}</li>
              <li>{isHindi ? 'अपनी Sahayata directory listing में channel link जोड़ें' : 'Add channel link to your Sahayata directory listing'}</li>
            </ol>
          </div>
          <div className="brutal-card-flat !p-4">
            <h3 className="font-bold text-xs uppercase tracking-wider mb-2">{isHindi ? 'पोस्ट करने का फ़ॉर्मेट' : 'POSTING FORMAT'}</h3>
            <div className="font-mono text-xs bg-[var(--color-bg)] p-3 border-[2px] border-[var(--color-border)]">
              <p>🆘 <strong>NEED — Legal Aid</strong></p>
              <p>📍 Delhi — Central Delhi</p>
              <p>⚡ URGENT</p>
              <p>---</p>
              <p>Friend detained at ITO. Need lawyer ASAP.</p>
              <p>---</p>
              <p>→ Respond: sahayata.org/board</p>
              <p>#sahayata #delhi #legal</p>
            </div>
          </div>
        </div>
      </section>

      {/* Option 2: Automated Bot */}
      <section className="brutal-card mb-6">
        <div className="brutal-badge brutal-badge-purple mb-4">{isHindi ? 'विकल्प 2' : 'OPTION 2'}</div>
        <h2 className="heading-2 mb-4">{isHindi ? 'ऑटोमेटेड बॉट (तकनीकी)' : 'Automated Bot (Technical)'}</h2>
        <div className="space-y-3 text-sm leading-relaxed">
          <p>{isHindi ? 'यह एक Telegram bot बनाता है जो Sahayata API को poll करता है और नई posts अपने आप channel में भेजता है।' : 'This creates a Telegram bot that polls the Sahayata API and auto-posts new content to a channel.'}</p>
          <div className="brutal-card-flat !p-4">
            <h3 className="font-bold text-xs uppercase tracking-wider mb-2">{isHindi ? 'कैसे बनाएं' : 'HOW TO BUILD'}</h3>
            <ol className="list-decimal list-inside space-y-1.5">
              <li>{isHindi ? '@BotFather से bot token लें' : 'Get bot token from @BotFather'}</li>
              <li>{isHindi ? 'Bot को अपने channel में admin बनाएं' : 'Make bot admin of your channel'}</li>
              <li>{isHindi ? 'हर 5 मिनट: GET /api/posts?city=Delhi करें' : 'Every 5 min: GET /api/posts?city=Delhi'}</li>
              <li>{isHindi ? 'नई posts को format करके channel में भेजें via Bot API' : 'Format new posts and send to channel via Bot API'}</li>
              <li>{isHindi ? 'Free hosting: Cloudflare Workers या Deno Deploy' : 'Free hosting: Cloudflare Workers or Deno Deploy'}</li>
            </ol>
          </div>
          <div className="brutal-card-flat !p-4">
            <h3 className="font-bold text-xs uppercase tracking-wider mb-2">{isHindi ? 'उदाहरण कोड' : 'EXAMPLE CODE'}</h3>
            <pre className="font-mono text-xs bg-[var(--color-bg)] p-3 border-[2px] border-[var(--color-border)] overflow-x-auto whitespace-pre-wrap">{`// Cloudflare Worker — polls Sahayata, posts to Telegram
const SAHAYATA_URL = "https://sahayata.vercel.app";
const BOT_TOKEN = "your-bot-token";
const CHANNEL_ID = "@sahayata_delhi";

export default {
  async scheduled(event, env) {
    const res = await fetch(SAHAYATA_URL + "/api/posts?city=Delhi");
    const { posts } = await res.json();
    // Compare with last seen, post new ones
    for (const post of newPosts) {
      const text = formatPost(post);
      await fetch(\`https://api.telegram.org/bot\${BOT_TOKEN}/sendMessage\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHANNEL_ID, text, parse_mode: 'HTML' })
      });
    }
  }
};`}</pre>
          </div>
        </div>
      </section>

      {/* Security Tips */}
      <section className="brutal-card mb-6">
        <div className="brutal-badge brutal-badge-red mb-4">{isHindi ? 'सुरक्षा' : 'SECURITY'}</div>
        <h2 className="heading-2 mb-4">{isHindi ? 'Telegram सुरक्षा' : 'Telegram Security'}</h2>
        <ul className="space-y-2 text-sm">
          <li>→ {isHindi ? 'Settings → Privacy → Phone Number → Nobody (फ़ोन नंबर छुपाएं)' : 'Settings → Privacy → Phone Number → Nobody (hide your number)'}</li>
          <li>→ {isHindi ? 'Channel admin की identity छुपाने के लिए एक बॉट account admin बनाएं' : 'To hide channel admin identity, make a bot account the admin'}</li>
          <li>→ {isHindi ? 'Public channels की सामग्री सभी को दिखती है — संवेदनशील जानकारी private groups में रखें' : 'Public channel content is visible to all — keep sensitive info in private groups'}</li>
          <li>→ {isHindi ? '2FA ज़रूर चालू करें: Settings → Privacy → Two-Step Verification' : 'Enable 2FA: Settings → Privacy → Two-Step Verification'}</li>
        </ul>
      </section>
    </div>
  );
}
