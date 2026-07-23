import Link from 'next/link';
import { cookies } from 'next/headers';
import { Locale } from '@/types';

export default async function InfrastructurePage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const hi = locale === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-10">
        <h1 className="heading-display mb-3">{hi ? 'बुनियादी ढाँचा — यह कैसे टिका रहता है' : 'Infrastructure — How This Stays Up'}</h1>
        <p className="text-[var(--color-text-muted)] text-lg">{hi ? 'पारदर्शिता: हम कहाँ होस्ट हैं, क्यों, और अगर एक लिंक बंद हो तो क्या होगा।' : 'Transparency: where we host, why, and what happens if one link goes down.'}</p>
      </div>

      {/* ARCHITECTURE */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'बहु-स्तरीय वास्तुकला' : 'Multi-Layer Architecture'}</h2>
        <div className="font-mono text-sm bg-[var(--color-surface-alt)] p-4 rounded overflow-x-auto">
          <p>{hi ? 'उपयोगकर्ता' : 'User'}</p>
          <p className="pl-4">↓</p>
          <p className="pl-4">{hi ? 'DNS (Cloudflare / Njalla)' : 'DNS (Cloudflare / Njalla)'}</p>
          <p className="pl-8">↓</p>
          <p className="pl-8">{hi ? 'प्राथमिक: Vercel (तेज़, मुफ्त CDN)' : 'Primary: Vercel (fast, free CDN)'}</p>
          <p className="pl-8">{hi ? 'मिरर 1: Cloudflare Pages (अलग CDN, अलग कंपनी)' : 'Mirror 1: Cloudflare Pages (different CDN, different company)'}</p>
          <p className="pl-8">{hi ? 'मिरर 2: Self-hosted VPS (आइसलैंड/नीदरलैंड)' : 'Mirror 2: Self-hosted VPS (Iceland/Netherlands)'}</p>
          <p className="pl-8">{hi ? 'मिरर 3: IPFS (हमेशा के लिए, कोई बंद नहीं कर सकता)' : 'Mirror 3: IPFS (permanent, nobody can take down)'}</p>
          <p className="pl-8">{hi ? 'मिरर 4: Tor (.onion — अनाम, अवरुद्ध नहीं)' : 'Mirror 4: Tor (.onion — anonymous, unblockable)'}</p>
          <p className="pl-12">↓</p>
          <p className="pl-12">{hi ? 'ऑफलाइन: PWA कैश + प्रिंटेड गाइड' : 'Offline: PWA cache + printed guides'}</p>
        </div>
      </section>

      {/* WHY MULTIPLE */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'एक से ज़्यादा क्यों' : 'Why Multiple Layers'}</h2>
        <div className="space-y-3 text-sm">
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'खतरा: सरकारी टेकडाउन' : 'Threat: Government takedown'}</strong>
            <p className="mt-1">{hi ? 'Vercel (अमेरिकी कंपनी) → भारतीय IT Act सेक्शन 69A ब्लॉकिंग आदेश मान सकती है।' : 'Vercel (US company) → may comply with Indian IT Act Section 69A blocking orders.'}</p>
            <p className="mt-1 font-bold">{hi ? 'समाधान: ≥3 अलग-अलग क्षेत्राधिकार में मिरर। एक बंद → बाकी चालू।' : 'Solution: ≥3 mirrors in different jurisdictions. One down → others up.'}</p>
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'खतरा: इंटरनेट शटडाउन' : 'Threat: Internet shutdown'}</strong>
            <p className="mt-1">{hi ? 'भारत दुनिया में सबसे ज़्यादा इंटरनेट शटडाउन करता है (2024 में 100+)।' : 'India has the most internet shutdowns in the world (100+ in 2024).'}</p>
            <p className="mt-1 font-bold">{hi ? 'समाधान: PWA ऑफलाइन + सभी गाइड कैश्ड + प्रिंट करने योग्य + FM रेडियो बैकअप।' : 'Solution: PWA offline + all guides cached + printable + FM radio backup.'}</p>
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'खतरा: DNS ब्लॉकिंग' : 'Threat: DNS blocking'}</strong>
            <p className="mt-1">{hi ? 'ISP स्तर पर डोमेन ब्लॉक — सबसे आम सेंसरशिप तरीका।' : 'Domain blocked at ISP level — most common censorship method.'}</p>
            <p className="mt-1 font-bold">{hi ? 'समाधान: कई डोमेन + .onion पता + IPFS गेटवे + VPN निर्देश।' : 'Solution: Multiple domains + .onion address + IPFS gateway + VPN instructions.'}</p>
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'खतरा: DDoS हमला' : 'Threat: DDoS attack'}</strong>
            <p className="mt-1">{hi ? 'विरोध के दौरान साइट पर ट्रैफिक बम — जानबूझकर या स्वाभाविक।' : 'Traffic bomb during protests — intentional or organic.'}</p>
            <p className="mt-1 font-bold">{hi ? 'समाधान: Cloudflare/Vercel का CDN + एज कैशिंग + स्टैटिक एक्सपोर्ट।' : 'Solution: Cloudflare/Vercel CDN + edge caching + static export.'}</p>
          </div>
        </div>
      </section>

      {/* COSTS */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'लागत (कॉलेज छात्र बजट पर चलता है)' : 'Costs (Runs on a College Student Budget)'}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-[var(--color-border)]">
                <th className="text-left p-2 font-bold">{hi ? 'सेवा' : 'Service'}</th>
                <th className="text-left p-2 font-bold">{hi ? 'उद्देश्य' : 'Purpose'}</th>
                <th className="text-right p-2 font-bold">{hi ? '₹/महीना' : '₹/month'}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[var(--color-border-light)]"><td className="p-2"><a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] underline">Vercel</a> (Hobby)</td><td className="p-2">{hi ? 'प्राथमिक होस्टिंग' : 'Primary hosting'}</td><td className="p-2 text-right">₹0</td></tr>
              <tr className="border-b border-[var(--color-border-light)]"><td className="p-2"><a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] underline">Supabase</a> (Free)</td><td className="p-2">{hi ? 'डेटाबेस + प्रमाणीकरण' : 'Database + Auth'}</td><td className="p-2 text-right">₹0</td></tr>
              <tr className="border-b border-[var(--color-border-light)]"><td className="p-2"><a href="https://pages.cloudflare.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] underline">Cloudflare Pages</a></td><td className="p-2">{hi ? 'मिरर 1' : 'Mirror 1'}</td><td className="p-2 text-right">₹0</td></tr>
              <tr className="border-b border-[var(--color-border-light)]"><td className="p-2"><a href="https://njal.la" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] underline">Njalla VPS</a> (Iceland)</td><td className="p-2">{hi ? 'मिरर 2 + Tor + IPFS' : 'Mirror 2 + Tor + IPFS'}</td><td className="p-2 text-right">~₹400</td></tr>
              <tr className="border-b border-[var(--color-border-light)]"><td className="p-2"><a href="https://njal.la" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] underline">Njalla Domain</a></td><td className="p-2">{hi ? 'गोपनीय डोमेन' : 'Privacy domain'}</td><td className="p-2 text-right">~₹100</td></tr>
              <tr className="border-b border-[var(--color-border-light)]"><td className="p-2"><a href="https://proton.me/mail" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] underline">ProtonMail</a></td><td className="p-2">{hi ? 'एन्क्रिप्टेड ईमेल' : 'Encrypted email'}</td><td className="p-2 text-right">₹0</td></tr>
              <tr className="font-bold"><td className="p-2" colSpan={2}>{hi ? 'कुल' : 'TOTAL'}</td><td className="p-2 text-right">~₹500/mo ($6)</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[var(--color-text-muted)] mt-3">{hi ? 'तुलना: एक बड़ी चाय प्रतिदिन = इस पूरे प्लेटफॉर्म को एक महीने चलाना।' : 'Comparison: one large chai per day = running this entire platform for a month.'}</p>
      </section>

      {/* IF SITE IS DOWN */}
      <section className="brutal-card mb-8 !border-[var(--color-red)]">
        <h2 className="heading-2 mb-4">{hi ? 'अगर यह साइट बंद हो जाए' : 'If This Site Goes Down'}</h2>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li><strong>VPN {hi ? 'आज़माएँ' : 'try'}:</strong> <a href="https://protonvpn.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] underline">ProtonVPN</a> ({hi ? 'मुफ्त' : 'free'}) → {hi ? 'साइट दोबारा खोलें' : 'try site again'}</li>
          <li><strong>{hi ? 'मिरर' : 'Mirrors'}:</strong> {hi ? 'ये URL आज़माएँ (बुकमार्क करें):' : 'Try these URLs (bookmark them):'}</li>
          <li className="ml-4 font-mono text-xs">sahayata.pages.dev</li>
          <li className="ml-4 font-mono text-xs">sahayata.netlify.app</li>
          <li><strong>IPFS:</strong> <span className="font-mono text-xs">dweb.link/ipfs/[CID]</span> {hi ? '(CID हमारे सोशल मीडिया पर)' : '(CID on our social media)'}</li>
          <li><strong>Tor:</strong> <span className="font-mono text-xs">[onion address]</span> {hi ? '(Tor Browser से खोलें)' : '(open with Tor Browser)'}</li>
          <li><strong>{hi ? 'ऑफलाइन' : 'Offline'}:</strong> {hi ? 'अगर PWA इंस्टॉल है → गाइड कैश्ड हैं, बिना इंटरनेट काम करेंगे।' : 'If PWA installed → guides are cached, will work without internet.'}</li>
          <li><strong>{hi ? 'कागज़' : 'Paper'}:</strong> {hi ? 'अधिकार कार्ड + हेल्पलाइन प्रिंट करें — हमेशा काम करता है।' : 'Print rights card + helplines — always works.'}</li>
        </ol>
      </section>

      {/* HOW TO RUN A MIRROR */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'खुद मिरर चलाएँ' : 'Run Your Own Mirror'}</h2>
        <p className="text-sm mb-3">{hi ? 'कोई भी इस साइट का मिरर चला सकता है। यह ओपन सोर्स है।' : 'Anyone can run a mirror of this site. It is open source.'}</p>
        <div className="font-mono text-sm bg-[var(--color-surface-alt)] p-4 rounded overflow-x-auto space-y-1">
          <p className="text-[var(--color-text-muted)]"># Clone + build</p>
          <p>git clone https://github.com/paramminhas5/Pothole.git</p>
          <p>cd Pothole && npm install && npm run build</p>
          <p>&nbsp;</p>
          <p className="text-[var(--color-text-muted)]"># Deploy to Cloudflare Pages (free)</p>
          <p>npx wrangler pages deploy .next/static --project-name sahayata-mirror</p>
          <p>&nbsp;</p>
          <p className="text-[var(--color-text-muted)]"># Or deploy to any VPS with Node.js</p>
          <p>npm start  <span className="text-[var(--color-text-muted)]"># serves on port 3000</span></p>
          <p>&nbsp;</p>
          <p className="text-[var(--color-text-muted)]"># Or generate static HTML (for IPFS/Tor)</p>
          <p>npm run export  <span className="text-[var(--color-text-muted)]"># outputs to /out directory</span></p>
        </div>
        <p className="text-xs text-[var(--color-text-muted)] mt-3">{hi ? 'लाइसेंस AGPL-3.0: मिरर चला सकते हैं, बस कोड सार्वजनिक रखें।' : 'License AGPL-3.0: you can run mirrors, just keep the code public.'}</p>
      </section>

      {/* DATA POLICY */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'डेटा नीति' : 'Data Policy'}</h2>
        <div className="space-y-2 text-sm">
          <p><strong>{hi ? 'हम क्या रखते हैं:' : 'What we store:'}</strong> {hi ? 'जमा किए गए संसाधन, माँगें, सत्र कुकीज़ (HMAC-हस्ताक्षरित UUID)।' : 'Submitted resources, demands, session cookies (HMAC-signed UUIDs).'}</p>
          <p><strong>{hi ? 'हम क्या नहीं रखते:' : 'What we don\'t store:'}</strong> {hi ? 'IP पते, फोन नंबर, वास्तविक नाम, स्थान डेटा, ब्राउज़र फिंगरप्रिंट।' : 'IP addresses, phone numbers, real names, location data, browser fingerprints.'}</p>
          <p><strong>{hi ? 'एन्क्रिप्शन:' : 'Encryption:'}</strong> {hi ? 'HTTPS हमेशा। कुकीज़ HttpOnly + Secure + SameSite। OTP केवल हैश संग्रहीत।' : 'HTTPS always. Cookies HttpOnly + Secure + SameSite. OTP hashes only stored.'}</p>
          <p><strong>{hi ? 'क्षेत्राधिकार:' : 'Jurisdiction:'}</strong> {hi ? 'डेटाबेस: Supabase (US/EU)। स्टैटिक: Vercel (वैश्विक CDN)। मिरर: आइसलैंड।' : 'Database: Supabase (US/EU). Static: Vercel (global CDN). Mirror: Iceland.'}</p>
          <p><strong>{hi ? 'विलोपन:' : 'Deletion:'}</strong> {hi ? 'पोस्ट 72 घंटे में समाप्त। OTP 10 मिनट। सत्र 30 दिन।' : 'Posts expire in 72 hours. OTPs in 10 minutes. Sessions in 30 days.'}</p>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-4 mt-8">
        <Link href="/developers" className="brutal-btn brutal-btn-primary brutal-btn-lg text-center">{hi ? 'कोड देखें →' : 'View Code →'}</Link>
        <Link href="/manifesto" className="brutal-btn brutal-btn-lg text-center">{hi ? 'घोषणापत्र →' : 'Manifesto →'}</Link>
      </div>
    </div>
  );
}
