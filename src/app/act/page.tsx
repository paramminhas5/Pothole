import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';

export default async function ActPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const hi = locale === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-8">
        <h1 className="heading-display mb-2">{hi ? 'कार्रवाई करें' : 'Take Action'}</h1>
        <p className="text-[var(--color-text-muted)]">{hi ? 'हर उपकरण एक संस्थागत कार्रवाई की ओर ले जाता है।' : 'Every tool leads to an institutional action.'}</p>
      </div>

      <div className="space-y-4">
        <Link href="/rti" className="brutal-card !p-6 block hover:border-[var(--color-primary)]">
          <div className="flex items-start gap-4">
            <span className="text-3xl">📄</span>
            <div>
              <h2 className="heading-3">{hi ? 'RTI जनरेटर' : 'RTI Generator'}</h2>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">{hi ? 'सरकार को जवाब देने पर मजबूर करें। ₹10। 30 दिन। नहीं दिया → जुर्माना। फॉर्म भरें → कानूनी आवेदन तैयार।' : 'Force government to answer. ₹10. 30 days. No response → penalty. Fill form → legal application ready.'}</p>
            </div>
          </div>
        </Link>

        <Link href="/fir" className="brutal-card !p-6 block hover:border-[var(--color-primary)]">
          <div className="flex items-start gap-4">
            <span className="text-3xl">🚨</span>
            <div>
              <h2 className="heading-3">{hi ? 'FIR असिस्टेंट' : 'FIR Assistant'}</h2>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">{hi ? '2 स्टेप → 3 दस्तावेज़ तैयार (शिकायत + SP पत्र + मजिस्ट्रेट)। पुलिस मना नहीं कर सकती।' : '2 steps → 3 documents ready (complaint + SP letter + magistrate). Police cannot refuse.'}</p>
            </div>
          </div>
        </Link>

        <Link href="/groups" className="brutal-card !p-6 block hover:border-[var(--color-primary)]">
          <div className="flex items-start gap-4">
            <span className="text-3xl">👥</span>
            <div>
              <h2 className="heading-3">{hi ? 'ग्रुप बनाएँ / खोजें' : 'Create / Find Groups'}</h2>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">{hi ? 'संगठित हों। मॉडरेटेड। शहर/श्रेणी से खोजें। अपना ग्रुप रजिस्टर करें।' : 'Organize. Moderated. Search by city/category. Register your group.'}</p>
            </div>
          </div>
        </Link>

        <Link href="/representatives" className="brutal-card !p-6 block hover:border-[var(--color-primary)]">
          <div className="flex items-start gap-4">
            <span className="text-3xl">✉️</span>
            <div>
              <h2 className="heading-3">{hi ? 'जनप्रतिनिधि को लिखें' : 'Write to Representative'}</h2>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">{hi ? 'MLA/MP खोजें। पत्र टेम्पलेट। CPGRAMS लिंक। RTI अनुवर्ती।' : 'Find MLA/MP. Letter template. CPGRAMS link. RTI follow-up.'}</p>
            </div>
          </div>
        </Link>

        <Link href="/create-post" className="brutal-card !p-6 block hover:border-[var(--color-primary)]">
          <div className="flex items-start gap-4">
            <span className="text-3xl">📋</span>
            <div>
              <h2 className="heading-3">{hi ? 'बोर्ड पर पोस्ट करें' : 'Post on the Board'}</h2>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">{hi ? 'ज़रूरत या प्रस्ताव पोस्ट करें। 72 घंटे में गायब। मॉडरेटेड। गोपनीय।' : 'Post a need or offer. Disappears in 72h. Moderated. Private.'}</p>
            </div>
          </div>
        </Link>

        <Link href="/playbook" className="brutal-card !p-6 block hover:border-[var(--color-primary)]">
          <div className="flex items-start gap-4">
            <span className="text-3xl">📖</span>
            <div>
              <h2 className="heading-3">{hi ? 'विरोध → शक्ति प्लेबुक' : 'Protest → Power Playbook'}</h2>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">{hi ? '10 कदम: माँग → दस्तावेज़ → RTI → FIR → PIL → प्रतिनिधि → मीडिया → एस्केलेट → गठबंधन → दबाव।' : '10 steps: demand → document → RTI → FIR → PIL → representative → media → escalate → coalition → pressure.'}</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
