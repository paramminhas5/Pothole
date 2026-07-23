import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';
import ShareButton from '@/components/ShareButton';

export default async function DelhiGuidePage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const hi = locale === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-8 flex justify-between items-start gap-4">
        <div>
          <h1 className="heading-display mb-2">
            {hi ? 'दिल्ली शहर गाइड' : 'Delhi City Guide'}
          </h1>
          <p className="text-[var(--color-text-muted)]">
            {hi ? 'दिल्ली-विशिष्ट: नंबर, अदालतें, अस्पताल, थाने, FM।'
              : 'Delhi-specific: numbers, courts, hospitals, stations, FM.'}
          </p>
        </div>
        <ShareButton locale={locale} title={hi ? 'दिल्ली गाइड — Sahayata' : 'Delhi Guide — Sahayata'} />
      </div>


      {/* EMERGENCY — DELHI SPECIFIC */}
      <section className="brutal-card mb-6 !border-[var(--color-red)]">
        <h2 className="heading-2 mb-3">{hi ? 'दिल्ली आपातकालीन' : 'Delhi Emergency'}</h2>
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <a href="tel:112" className="p-3 bg-[var(--color-surface-alt)] rounded block"><strong>112</strong> — {hi ? 'एकीकृत (पुलिस/एम्बुलेंस/फायर)' : 'Unified (Police/Ambulance/Fire)'}</a>
          <a href="tel:1516" className="p-3 bg-[var(--color-surface-alt)] rounded block"><strong>1516</strong> — DSLSA {hi ? 'मुफ्त वकील 24/7' : 'Free Lawyer 24/7'}</a>
          <a href="tel:100" className="p-3 bg-[var(--color-surface-alt)] rounded block"><strong>100</strong> — {hi ? 'दिल्ली पुलिस' : 'Delhi Police'}</a>
          <a href="tel:102" className="p-3 bg-[var(--color-surface-alt)] rounded block"><strong>102</strong> — {hi ? 'एम्बुलेंस (दिल्ली)' : 'Ambulance (Delhi)'}</a>
          <a href="tel:01124663333" className="p-3 bg-[var(--color-surface-alt)] rounded block"><strong>011-24663333</strong> — NHRC</a>
          <a href="tel:181" className="p-3 bg-[var(--color-surface-alt)] rounded block"><strong>181</strong> — {hi ? 'महिला हेल्पलाइन' : 'Women Helpline'}</a>
        </div>
      </section>

      {/* DSLSA - FREE LEGAL AID */}
      <section className="brutal-card mb-6">
        <h2 className="heading-2 mb-3">{hi ? 'DSLSA — मुफ्त कानूनी सहायता' : 'DSLSA — Free Legal Aid'}</h2>
        <div className="text-sm space-y-2">
          <p><strong>{hi ? 'हेल्पलाइन:' : 'Helpline:'}</strong> <a href="tel:1516" className="text-[var(--color-accent)] font-bold">1516</a> (24/7)</p>
          <p><strong>{hi ? 'कार्यालय:' : 'Office:'}</strong> 3rd Floor, Rouse Avenue District Court Complex, New Delhi 110002</p>
          <p><strong>{hi ? 'वेबसाइट:' : 'Website:'}</strong> <a href="https://dslsa.org" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] underline">dslsa.org ↗</a></p>
          <p><strong>{hi ? 'कौन पात्र:' : 'Who is eligible:'}</strong> {hi ? 'BPL, SC/ST, महिला, बच्चे, विकलांग, 18 से कम, आपदा पीड़ित — मुफ्त वकील 3 दिन में' : 'BPL, SC/ST, women, children, disabled, under 18, disaster victims — free lawyer in 3 days'}</p>
        </div>
      </section>

      {/* HOSPITALS NEAR PROTEST SITES */}
      <section className="brutal-card mb-6">
        <h2 className="heading-2 mb-3">{hi ? 'जंतर मंतर के पास अस्पताल (MLC के लिए)' : 'Hospitals Near Jantar Mantar (for MLC)'}</h2>
        <div className="space-y-2 text-sm">
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>RML Hospital</strong> — {hi ? '1.5 km' : '1.5 km'}<br/>
            {hi ? 'पता: बाबा खड़ग सिंह मार्ग, कनॉट प्लेस' : 'Address: Baba Kharak Singh Marg, Connaught Place'}<br/>
            {hi ? 'फोन:' : 'Phone:'} <a href="tel:01123404567" className="text-[var(--color-accent)]">011-23404567</a>
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>Lady Hardinge Medical College</strong> — {hi ? '2 km' : '2 km'}<br/>
            {hi ? 'पता: शाहीद भगत सिंह मार्ग, कनॉट प्लेस' : 'Address: Shaheed Bhagat Singh Marg, Connaught Place'}<br/>
            {hi ? 'फोन:' : 'Phone:'} <a href="tel:01123408295" className="text-[var(--color-accent)]">011-23408295</a>
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>LNJP Hospital</strong> — {hi ? '3 km' : '3 km'}<br/>
            {hi ? 'पता: JLN मार्ग, दिल्ली गेट' : 'Address: JLN Marg, Delhi Gate'}<br/>
            {hi ? 'फोन:' : 'Phone:'} <a href="tel:01123231904" className="text-[var(--color-accent)]">011-23231904</a>
          </div>
        </div>
        <p className="text-xs text-[var(--color-text-muted)] mt-2">{hi ? '💡 MLC (मेडिको-लीगल सर्टिफिकेट) — कोई भी सरकारी अस्पताल देने को बाध्य है। मुफ्त।' : '💡 MLC (Medico-Legal Certificate) — any govt hospital must provide it. Free.'}</p>
      </section>

      {/* DCP CONTACTS */}
      <section className="brutal-card mb-6">
        <h2 className="heading-2 mb-3">{hi ? 'DCP (पुलिस उपायुक्त) — शिकायत के लिए' : 'DCP (Deputy Commissioner) — For Complaints'}</h2>
        <div className="grid md:grid-cols-2 gap-2 text-sm">
          <div className="p-2 bg-[var(--color-surface-alt)] rounded"><strong>New Delhi</strong>: 011-23742100</div>
          <div className="p-2 bg-[var(--color-surface-alt)] rounded"><strong>Central</strong>: 011-23241230</div>
          <div className="p-2 bg-[var(--color-surface-alt)] rounded"><strong>North</strong>: 011-23811011</div>
          <div className="p-2 bg-[var(--color-surface-alt)] rounded"><strong>South</strong>: 011-24121451</div>
          <div className="p-2 bg-[var(--color-surface-alt)] rounded"><strong>East</strong>: 011-22050856</div>
          <div className="p-2 bg-[var(--color-surface-alt)] rounded"><strong>West</strong>: 011-25244012</div>
        </div>
        <p className="text-xs text-[var(--color-text-muted)] mt-2">{hi ? 'स्रोत: delhipolice.gov.in' : 'Source: delhipolice.gov.in'}</p>
      </section>

      {/* COURTS */}
      <section className="brutal-card mb-6">
        <h2 className="heading-2 mb-3">{hi ? 'अदालतें — कहाँ जाएँ' : 'Courts — Where to Go'}</h2>
        <div className="space-y-2 text-sm">
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>{hi ? 'ज़िला अदालतें (बेल/रिमांड):' : 'District Courts (bail/remand):'}</strong><br/>{hi ? 'पटियाला हाउस, तीस हज़ारी, साकेत, रोहिणी, कड़कड़डूमा, द्वारका' : 'Patiala House, Tis Hazari, Saket, Rohini, Karkardooma, Dwarka'}</div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>{hi ? 'दिल्ली हाई कोर्ट (PIL/रिट):' : 'Delhi High Court (PIL/Writ):'}</strong><br/>{hi ? 'शेरशाह रोड, नई दिल्ली 110003' : 'Sher Shah Road, New Delhi 110003'}<br/><a href="https://delhihighcourt.nic.in" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] underline">delhihighcourt.nic.in ↗</a></div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>{hi ? 'सुप्रीम कोर्ट:' : 'Supreme Court:'}</strong><br/>{hi ? 'तिलक मार्ग, नई दिल्ली 110001' : 'Tilak Marg, New Delhi 110001'}<br/><a href="https://sci.gov.in" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] underline">sci.gov.in ↗</a></div>
        </div>
      </section>

      {/* FM RADIO — ANALOG BACKUP */}
      <section className="brutal-card mb-6">
        <h2 className="heading-2 mb-3">{hi ? '📻 FM रेडियो (इंटरनेट बंद हो तो)' : '📻 FM Radio (If Internet is Down)'}</h2>
        <div className="grid md:grid-cols-2 gap-2 text-sm">
          <div className="p-2 bg-[var(--color-surface-alt)] rounded"><strong>All India Radio News</strong>: 100.1 FM</div>
          <div className="p-2 bg-[var(--color-surface-alt)] rounded"><strong>AIR Delhi</strong>: 96.7 FM</div>
          <div className="p-2 bg-[var(--color-surface-alt)] rounded"><strong>Radio One</strong>: 94.3 FM</div>
          <div className="p-2 bg-[var(--color-surface-alt)] rounded"><strong>Big FM</strong>: 92.7 FM</div>
        </div>
        <p className="text-xs text-[var(--color-text-muted)] mt-2">{hi ? 'इंटरनेट शटडाउन में FM रेडियो काम करता है। बुनियादी समाचार और ट्रैफिक अपडेट मिलते हैं।' : 'FM radio works during internet shutdowns. Gives basic news and traffic updates.'}</p>
      </section>

      {/* SOCIAL MEDIA — DELHI POLICE & TRAFFIC */}
      <section className="brutal-card mb-6">
        <h2 className="heading-2 mb-3">{hi ? 'सोशल मीडिया (आधिकारिक)' : 'Social Media (Official)'}</h2>
        <div className="space-y-2 text-sm">
          <p><strong>Delhi Police:</strong> <a href="https://x.com/DelhiPolice" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] underline">@DelhiPolice ↗</a> — {hi ? 'ट्रैफिक, बैरिकेड, रास्ता बंद अपडेट' : 'Traffic, barricade, road closure updates'}</p>
          <p><strong>Delhi Traffic Police:</strong> <a href="https://x.com/dtaborad" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] underline">@dtaborad ↗</a></p>
          <p><strong>DMRC (Metro):</strong> <a href="https://x.com/OfficialDMRC" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] underline">@OfficialDMRC ↗</a> — {hi ? 'मेट्रो बंद/चालू अपडेट' : 'Metro closure/opening updates'}</p>
        </div>
      </section>

      {/* CTAs */}
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <Link href="/safety" className="brutal-btn brutal-btn-primary brutal-btn-lg text-center">{hi ? 'अधिकार कार्ड →' : 'RIGHTS CARD →'}</Link>
        <Link href="/expect" className="brutal-btn brutal-btn-lg text-center">{hi ? 'तैयारी गाइड →' : 'PREP GUIDE →'}</Link>
        <Link href="/resources" className="brutal-btn brutal-btn-lg text-center">{hi ? 'सभी संसाधन →' : 'ALL RESOURCES →'}</Link>
      </div>
    </div>
  );
}
