import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';

export default async function RepresentativesPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const hi = locale === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-10">
        <h1 className="heading-display mb-3">{hi ? 'जनप्रतिनिधि खोजें और पत्र लिखें' : 'Find Representatives & Write Letters'}</h1>
        <p className="text-[var(--color-text-muted)] text-lg">{hi ? 'अपने MLA, MP, नगर पार्षद खोजें। एक क्लिक में पत्र तैयार।' : 'Find your MLA, MP, municipal councillor. Generate a letter in one click.'}</p>
      </div>
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'कौन क्या नियंत्रित करता है' : 'Who Controls What'}</h2>
        <div className="space-y-3 text-sm">
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'नगर पार्षद / नगर निगम' : 'Municipal Councillor / Corporation'}</strong>
            <p>{hi ? 'सड़क, पानी, सफाई, स्ट्रीटलाइट, पार्क, स्थानीय अनुमति' : 'Roads, water, sanitation, streetlights, parks, local permissions'}</p>
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'MLA (विधायक) — राज्य सरकार' : 'MLA — State Government'}</strong>
            <p>{hi ? 'पुलिस, शिक्षा (राज्य), स्वास्थ्य, बिजली, भूमि, सड़क (राज्य), परिवहन' : 'Police, education (state), health, electricity, land, roads (state), transport'}</p>
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'MP (सांसद) — केंद्र सरकार' : 'MP — Central Government'}</strong>
            <p>{hi ? 'रेलवे, रक्षा, दूरसंचार, परीक्षाएँ (NTA/UGC), विदेश नीति, केंद्रीय कानून' : 'Railways, defence, telecom, exams (NTA/UGC), foreign policy, central laws'}</p>
          </div>
        </div>
      </section>
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'अपने प्रतिनिधि कैसे खोजें' : 'How to Find Your Representative'}</h2>
        <div className="space-y-2 text-sm">
          <p>→ <strong>MP:</strong> <a href="https://sansad.in/ls/members" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)]">sansad.in/ls/members ↗</a> — {hi ? 'अपना राज्य/निर्वाचन क्षेत्र खोजें' : 'Search by state/constituency'}</p>
          <p>→ <strong>MLA:</strong> {hi ? 'अपने राज्य विधानसभा की वेबसाइट पर' : 'On your state assembly website'} — {hi ? '"[राज्य] विधानसभा सदस्य" खोजें' : 'Search "[state] legislative assembly members"'}</p>
          <p>→ <strong>{hi ? 'नगर पार्षद:' : 'Councillor:'}</strong> {hi ? 'अपने नगर निगम की वेबसाइट → वार्ड खोजें' : 'Your municipal corporation website → find your ward'}</p>
        </div>
      </section>
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'पत्र टेम्पलेट' : 'Letter Template'}</h2>
        <div className="p-4 bg-[var(--color-surface-alt)] rounded text-xs font-mono whitespace-pre-line leading-relaxed">
{`To,
[Shri/Smt] [NAME],
[MLA / MP / Councillor],
[CONSTITUENCY / WARD],
[ADDRESS]

Subject: [SPECIFIC ISSUE - one line]

Respected Sir/Madam,

I am a resident of [YOUR AREA] in [CONSTITUENCY]. I am writing regarding [SPECIFIC ISSUE].

The problem:
[2-3 sentences describing the problem with facts and dates]

What has been tried:
[RTI filed on DATE / Complaint to dept on DATE / No response for X days]

What I request:
[ONE SPECIFIC, MEASURABLE ACTION you want them to take]

I look forward to your intervention and response within [15/30] days.

Yours sincerely,
[YOUR NAME]
[ADDRESS]
[PHONE / EMAIL - optional]
Date: [DATE]`}
        </div>
      </section>
      <section className="brutal-card mb-8 !border-[var(--color-primary)]">
        <h2 className="heading-2 mb-4">{hi ? 'ऑटो-जनरेटर जल्द आ रहा है' : 'Auto-Generator Coming Soon'}</h2>
        <p className="text-sm">{hi ? 'शहर/क्षेत्र चुनें → प्रतिनिधि दिखें → एक क्लिक में पत्र तैयार। अभी ऊपर का टेम्पलेट उपयोग करें।' : 'Select city/area → see representatives → generate letter in one click. For now use the template above.'}</p>
      </section>
      <div className="grid md:grid-cols-2 gap-4 mt-8">
        <Link href="/rti" className="brutal-btn brutal-btn-primary brutal-btn-lg text-center">{hi ? 'RTI जनरेटर →' : 'RTI GENERATOR →'}</Link>
        <Link href="/playbook" className="brutal-btn brutal-btn-lg text-center">{hi ? 'एस्केलेशन सीढ़ी →' : 'ESCALATION LADDER →'}</Link>
      </div>
    </div>
  );
}
