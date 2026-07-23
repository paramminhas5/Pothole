import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';

export default async function OfflinePage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const hi = locale === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-8">
        <h1 className="heading-display mb-2">{hi ? 'इंटरनेट बंद? यह करें।' : 'Internet Down? Do This.'}</h1>
        <p className="text-[var(--color-text-muted)]">{hi ? 'भारत दुनिया में सबसे ज़्यादा इंटरनेट शटडाउन करता है। तैयार रहें।' : 'India has the most internet shutdowns in the world. Be prepared.'}</p>
      </div>

      <section className="brutal-card mb-6" style={{ borderTop: '6px solid var(--color-lime)' }}>
        <h2 className="heading-2 mb-3">{hi ? 'स्तर 1: VPN (अक्सर काम करता है)' : 'Tier 1: VPN (Often Works)'}</h2>
        <div className="text-sm space-y-2">
          <p className="font-bold">{hi ? 'शटडाउन से पहले इंस्टॉल करें! बाद में डाउनलोड नहीं कर पाएँगे।' : 'Install BEFORE shutdown! Can\'t download after.'}</p>
          <div className="grid md:grid-cols-2 gap-3">
            <a href="https://protonvpn.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-[var(--color-surface-alt)] rounded block"><strong>ProtonVPN</strong> — {hi ? 'मुफ्त, कोई लॉग नहीं' : 'Free, no logs'}</a>
            <a href="https://psiphon.ca" target="_blank" rel="noopener noreferrer" className="p-3 bg-[var(--color-surface-alt)] rounded block"><strong>Psiphon</strong> — {hi ? 'सेंसरशिप बायपास, मुफ्त' : 'Censorship bypass, free'}</a>
            <a href="https://www.torproject.org" target="_blank" rel="noopener noreferrer" className="p-3 bg-[var(--color-surface-alt)] rounded block"><strong>Tor Browser</strong> — {hi ? 'अनाम, धीमा लेकिन अवरुद्ध नहीं' : 'Anonymous, slow but unblockable'}</a>
            <a href="https://mullvad.net" target="_blank" rel="noopener noreferrer" className="p-3 bg-[var(--color-surface-alt)] rounded block"><strong>Mullvad</strong> — {hi ? '€5/माह, सबसे सुरक्षित' : '€5/mo, most secure'}</a>
          </div>
        </div>
      </section>

      <section className="brutal-card mb-6" style={{ borderTop: '6px solid var(--color-yellow)' }}>
        <h2 className="heading-2 mb-3">{hi ? 'स्तर 2: बिना इंटरनेट मैसेजिंग' : 'Tier 2: Messaging Without Internet'}</h2>
        <div className="text-sm space-y-3">
          <a href="https://briarproject.org" target="_blank" rel="noopener noreferrer" className="block p-4 bg-[var(--color-surface-alt)] rounded border border-[var(--color-border-light)]">
            <strong>Briar</strong> — {hi ? 'ब्लूटूथ/WiFi Direct से मैसेजिंग (इंटरनेट नहीं चाहिए!)' : 'Messaging via Bluetooth/WiFi Direct (NO internet needed!)'}<br/>
            <span className="text-xs text-[var(--color-text-muted)]">{hi ? 'रेंज: ~100m। चेन रिले: A→B→C (मैसेज आगे बढ़ता है)। Android only।' : 'Range: ~100m. Chain relay: A→B→C (message hops forward). Android only.'}</span>
          </a>
          <div className="p-4 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'SMS कोडवर्ड (पहले से तय करें):' : 'SMS Codewords (pre-set these):'}</strong>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <span className="p-2 border border-[var(--color-border-light)] rounded"><strong>{hi ? '"चाय"' : '"chai"'}</strong> = {hi ? 'मैं सुरक्षित हूँ' : "I'm safe"}</span>
              <span className="p-2 border border-[var(--color-border-light)] rounded"><strong>{hi ? '"डॉक्टर"' : '"doctor"'}</strong> = {hi ? 'मुझे मदद चाहिए' : 'I need help'}</span>
              <span className="p-2 border border-[var(--color-border-light)] rounded"><strong>{hi ? '"घर"' : '"home"'}</strong> = {hi ? 'मैं जा रहा/रही हूँ' : "I'm leaving"}</span>
              <span className="p-2 border border-[var(--color-border-light)] rounded"><strong>{hi ? '"लाइब्रेरी"' : '"library"'}</strong> = {hi ? 'मिलन बिंदु पर आओ' : 'Come to meeting point'}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="brutal-card mb-6" style={{ borderTop: '6px solid var(--color-accent)' }}>
        <h2 className="heading-2 mb-3">{hi ? 'स्तर 3: फोन मर गया / ज़ब्त' : 'Tier 3: Phone Dead / Seized'}</h2>
        <div className="text-sm space-y-3">
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? '📻 FM रेडियो (हमेशा काम करता है):' : '📻 FM Radio (always works):'}</strong>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <span>AIR News: <strong>100.1 FM</strong></span>
              <span>AIR Delhi: <strong>96.7 FM</strong></span>
              <span>Radio One: <strong>94.3 FM</strong></span>
              <span>Big FM: <strong>92.7 FM</strong></span>
            </div>
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? '📍 भौतिक मिलन बिंदु:' : '📍 Physical Meeting Point:'}</strong>
            <p className="mt-1">{hi ? 'विरोध से पहले तय करें: "अगर बिछड़ जाएँ → [जगह] पर [समय] पर मिलेंगे।" जगह: लैंडमार्क (मेट्रो स्टेशन, गुरुद्वारा, मंदिर)।' : 'Set before protest: "If separated → meet at [place] at [time]." Place: landmark (metro station, gurdwara, temple).'}</p>
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? '✋ हाथ के संकेत (ग्रुप के साथ तय करें):' : '✋ Hand Signals (agree with group beforehand):'}</strong>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <span>{hi ? '✊ मुट्ठी = रुको' : '✊ Fist = Stop'}</span>
              <span>{hi ? '🖐️ खुली हथेली = ठीक' : '🖐️ Open palm = All clear'}</span>
              <span>{hi ? '❌ क्रॉस बाहें = खतरा, पीछे' : '❌ Crossed arms = Danger, retreat'}</span>
              <span>{hi ? '👆 एक उंगली = ध्यान दो' : '👆 One finger = Attention'}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="brutal-card mb-6" style={{ borderTop: '6px solid var(--color-red)' }}>
        <h2 className="heading-2 mb-3">{hi ? 'स्तर 4: पूर्ण ब्लैकआउट' : 'Tier 4: Total Blackout'}</h2>
        <div className="text-sm space-y-2">
          <p>{hi ? 'कोई फोन नहीं। कोई इंटरनेट नहीं। कोई रेडियो नहीं।' : 'No phone. No internet. No radio.'}</p>
          <ul className="ml-4 list-disc space-y-1">
            <li>{hi ? 'मुँह-ज़बानी संदेश (व्यक्ति-से-व्यक्ति रिले)' : 'Word-of-mouth relay (person-to-person)'}</li>
            <li>{hi ? 'लिखित नोट (पुराना लेकिन अवरुद्ध नहीं किया जा सकता)' : 'Written notes (old school but unblockable)'}</li>
            <li>{hi ? 'पूर्व-तय कार्य विभाजन (हर कोई जानता है अपना काम)' : 'Pre-set task division (everyone knows their job without communication)'}</li>
            <li>{hi ? 'मिलन बिंदु पर निश्चित समय (जैसे हर 2 घंटे)' : 'Fixed times at meeting point (e.g., every 2 hours)'}</li>
          </ul>
        </div>
      </section>

      <div className="brutal-card text-center">
        <p className="font-bold text-sm mb-3">{hi ? '💡 सबसे ज़रूरी बात: यह सब पहले से तैयार करें। शटडाउन के बाद बहुत देर है।' : '💡 Most important: prepare ALL of this BEFORE a shutdown. After it happens is too late.'}</p>
        <Link href="/expect" className="brutal-btn brutal-btn-primary">{hi ? 'पूरी तैयारी गाइड →' : 'Full Prep Guide →'}</Link>
      </div>
    </div>
  );
}
