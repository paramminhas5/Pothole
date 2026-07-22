import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';
import PrintButton from '@/components/PrintButton';

export default async function ToolkitPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const hi = locale === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-10 flex justify-between items-start gap-4">
        <div>
          <h1 className="heading-display mb-3">
            {hi ? 'टेम्पलेट और उपकरण' : 'Templates & Tools'}
          </h1>
          <p className="text-[var(--color-text-muted)] text-lg">
            {hi ? 'कॉपी करें, भरें, जमा करें। हर संस्थागत कार्रवाई के लिए तैयार टेम्पलेट।' : 'Copy, fill, submit. Ready templates for every institutional action.'}
          </p>
        </div>
        <PrintButton locale={locale} />
      </div>


      {/* RTI TEMPLATE */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'RTI आवेदन टेम्पलेट' : 'RTI Application Template'}</h2>
        <div className="p-4 bg-[var(--color-surface-alt)] rounded text-xs font-mono whitespace-pre-line leading-relaxed">
{`To,
The Public Information Officer,
[DEPARTMENT NAME],
[ADDRESS]

Subject: Application under Right to Information Act, 2005

Sir/Madam,

I, [YOUR NAME], a citizen of India, hereby seek the following information under the Right to Information Act, 2005:

1. [YOUR SPECIFIC QUESTION - be precise]
2. [SECOND QUESTION if any]
3. [THIRD QUESTION if any]

Period: [FROM DATE] to [TO DATE]

I am paying the prescribed fee of ₹10 via [Indian Postal Order / Online Payment / Court Fee Stamp].

If the information sought is held by another public authority, kindly transfer this application under Section 6(3) of the RTI Act.

Yours faithfully,
[YOUR NAME]
[YOUR ADDRESS]
[PHONE/EMAIL - optional]
Date: [DATE]`}
        </div>
        <div className="mt-3 text-sm space-y-1">
          <p><strong>{hi ? 'कहाँ जमा करें:' : 'Where to submit:'}</strong> rtionline.gov.in ({hi ? 'केंद्र' : 'central'}) | {hi ? 'राज्य RTI पोर्टल' : 'State RTI portal'} | {hi ? 'डाक/व्यक्तिगत रूप से' : 'Post/in-person'}</p>
          <p><strong>{hi ? 'शुल्क:' : 'Fee:'}</strong> ₹10 | {hi ? 'BPL को छूट' : 'BPL exempted'}</p>
          <p><strong>{hi ? 'जवाब:' : 'Response:'}</strong> {hi ? '30 दिन (जीवन/स्वतंत्रता मामले: 48 घंटे)' : '30 days (life/liberty matters: 48 hours)'}</p>
        </div>
        <Link href="/rti" className="text-link mt-3 inline-block">{hi ? '→ RTI जनरेटर (ऑटो-भरा PDF) →' : '→ RTI Generator (auto-filled PDF) →'}</Link>
      </section>

      {/* RTI FIRST APPEAL */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'RTI प्रथम अपील टेम्पलेट' : 'RTI First Appeal Template'}</h2>
        <div className="p-4 bg-[var(--color-surface-alt)] rounded text-xs font-mono whitespace-pre-line leading-relaxed">
{`To,
The First Appellate Authority,
[DEPARTMENT NAME],
[ADDRESS]

Subject: First Appeal under Section 19(1) of RTI Act, 2005

Ref: RTI Application dated [DATE], Registration No. [NUMBER]

Sir/Madam,

I filed an RTI application on [DATE] (copy enclosed). The PIO has:
[ ] Not responded within 30 days
[ ] Provided incomplete information
[ ] Refused without valid reason

I request you to:
1. Direct the PIO to provide complete information
2. Take disciplinary action for non-compliance

Yours faithfully,
[YOUR NAME]
[ADDRESS]
Date: [DATE]

Encl: Copy of original RTI application and receipt`}
        </div>
        <p className="text-sm mt-3">{hi ? '30 दिन बाद कोई जवाब नहीं? → यह अपील जमा करें।' : 'No response after 30 days? → Submit this appeal.'}</p>
      </section>

      {/* FIR COMPLAINT TEMPLATE */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'FIR शिकायत टेम्पलेट' : 'FIR Complaint Template'}</h2>
        <div className="p-4 bg-[var(--color-surface-alt)] rounded text-xs font-mono whitespace-pre-line leading-relaxed">
{`To,
The Station House Officer,
[POLICE STATION NAME],
[ADDRESS]

Subject: Written complaint for registration of FIR

Sir/Madam,

I wish to report the following cognizable offence:

Date of incident: [DATE]
Time: [APPROXIMATE TIME]
Place: [LOCATION]

Details of incident:
[DESCRIBE WHAT HAPPENED - factual, chronological]

Accused (if known):
[NAME / DESCRIPTION / BADGE NUMBER if police]

Witnesses:
[NAME AND CONTACT - with their consent]

Evidence:
[PHOTOS/VIDEOS/DOCUMENTS available]

I request you to register an FIR under appropriate sections and investigate.

Yours faithfully,
[YOUR NAME]
[ADDRESS]
Date: [DATE]`}
        </div>
        <p className="text-sm mt-3">{hi ? '→ पुलिस मना करे? SP को पत्र (नीचे), फिर मजिस्ट्रेट शिकायत।' : '→ Police refuse? Letter to SP (below), then magistrate complaint.'}</p>
        <Link href="/fir" className="text-link mt-2 inline-block">{hi ? 'FIR असिस्टेंट (गाइडेड विज़ार्ड) →' : 'FIR Assistant (guided wizard) →'}</Link>
      </section>


      {/* LETTER TO SP */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'SP को पत्र (FIR दर्ज न होने पर)' : 'Letter to SP (When FIR Not Registered)'}</h2>
        <div className="p-4 bg-[var(--color-surface-alt)] rounded text-xs font-mono whitespace-pre-line leading-relaxed">
{`To,
The Superintendent of Police,
[DISTRICT], [STATE]

Subject: Failure to register FIR at [POLICE STATION]

Sir/Madam,

I visited [POLICE STATION] on [DATE] to file an FIR regarding [BRIEF DESCRIPTION]. The SHO/duty officer refused to register my complaint.

This is a violation of BNSS Section 173 (mandatory registration of cognizable offences).

I request you to:
1. Direct the SHO to register my FIR immediately
2. Take departmental action against the officer who refused

If no action is taken within 7 days, I will approach the Magistrate under Section 175(3) BNSS.

Yours faithfully,
[YOUR NAME]
[ADDRESS]
[PHONE]
Date: [DATE]

Encl: Copy of original written complaint to police station`}
        </div>
      </section>

      {/* DEMAND DOCUMENT */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'माँग दस्तावेज़ टेम्पलेट' : 'Demand Document Template'}</h2>
        <div className="p-4 bg-[var(--color-surface-alt)] rounded text-xs font-mono whitespace-pre-line leading-relaxed">
{`DEMAND DOCUMENT
===============

DEMAND: [One sentence - specific, measurable]

TARGET: [Institution/Person with authority to act]

DEADLINE: [Date]

EVIDENCE:
1. [What proves this is a problem]
2. [Data, documents, incidents]
3. [Affected people/scale]

ACTIONS TAKEN SO FAR:
- [RTI filed on DATE - status]
- [Complaint filed on DATE - status]
- [Media coverage on DATE]

IF NO ACTION BY DEADLINE:
1. [Next escalation step]
2. [Legal action planned]
3. [Public accountability action]

SUPPORTED BY:
- [Group/Coalition names]
- [Number of signatories]

CONTACT: [Spokesperson - dedicated email only]
DATE: [Date]`}
        </div>
        <Link href="/demands" className="text-link mt-3 inline-block">{hi ? 'डिमांड ट्रैकर में बनाएँ →' : 'Create in Demand Tracker →'}</Link>
      </section>

      {/* EVIDENCE LOG */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'सबूत रिकॉर्ड टेम्पलेट' : 'Evidence Log Template'}</h2>
        <div className="p-4 bg-[var(--color-surface-alt)] rounded text-xs font-mono whitespace-pre-line leading-relaxed">
{`EVIDENCE LOG
============

Item #: [Sequential number]
Type: [ ] Photo [ ] Video [ ] Document [ ] Audio [ ] Testimony
Date captured: [DATE + TIME]
Location: [Where]
Captured by: [Who - code name OK]
Device: [Phone model / Camera]
File name: [Original filename]
SHA-256 hash: [If using Evidence Vault]

Description:
[What does this show? Why is it relevant?]

Chain of custody:
- Captured: [DATE] by [WHO]
- Stored: [WHERE - cloud service / Evidence Vault]
- Shared with: [WHO, WHEN, WHY]

Notes:
[Any additional context]`}
        </div>
        <Link href="/vault" className="text-link mt-3 inline-block">{hi ? 'एविडेंस वॉल्ट में स्टोर करें →' : 'Store in Evidence Vault →'}</Link>
      </section>

      {/* PRESS RELEASE */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'प्रेस रिलीज टेम्पलेट' : 'Press Release Template'}</h2>
        <div className="p-4 bg-[var(--color-surface-alt)] rounded text-xs font-mono whitespace-pre-line leading-relaxed">
{`FOR IMMEDIATE RELEASE
[DATE]

[HEADLINE - action-oriented, specific]

[CITY] — [First paragraph: WHO is doing WHAT, WHERE, WHEN, and WHY in 2-3 sentences]

[Second paragraph: CONTEXT - why this matters, scale of problem, evidence]

[Third paragraph: SPECIFIC DEMAND - what action is being demanded from whom by when]

[Quote from spokesperson: "One clear statement expressing the demand"]

[Background paragraph: Brief history, previous actions taken, institutional failures]

CONTACT:
[Spokesperson name]
[Dedicated email - not personal]
[Phone - dedicated number if possible]

###`}
        </div>
      </section>

      {/* MEETING AGENDA */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'बैठक एजेंडा टेम्पलेट' : 'Meeting Agenda Template'}</h2>
        <div className="p-4 bg-[var(--color-surface-alt)] rounded text-xs font-mono whitespace-pre-line leading-relaxed">
{`MEETING AGENDA
==============
Date: [DATE] | Time: [TIME] | Duration: [30-60 min max]
Facilitator: [Name] | Note-taker: [Name]

1. CHECK-IN (5 min)
   - Is everyone safe? Any concerns?

2. UPDATES (10 min)
   - [RTI status]
   - [Media coverage]
   - [Institutional responses]

3. DECISIONS NEEDED (15 min)
   - [Decision 1: options, pros/cons]
   - [Decision 2: options, pros/cons]

4. NEXT ACTIONS (10 min)
   - WHO does WHAT by WHEN
   - WHO does WHAT by WHEN

5. NEXT MEETING (2 min)
   - Date, time, facilitator rotation

NOTES:
[Record decisions and action items here]`}
        </div>
      </section>

      {/* NHRC COMPLAINT */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'NHRC शिकायत टेम्पलेट' : 'NHRC Complaint Template'}</h2>
        <div className="p-4 bg-[var(--color-surface-alt)] rounded text-xs font-mono whitespace-pre-line leading-relaxed">
{`To,
The Chairperson,
National Human Rights Commission,
Manav Adhikar Bhawan, Block-C,
GPO Complex, INA, New Delhi - 110023

Subject: Complaint of human rights violation

1. Name of complainant: [NAME]
2. Address: [ADDRESS]
3. Details of violation:
   - Date: [DATE]
   - Place: [LOCATION]
   - Authority responsible: [POLICE/GOVT BODY]
   - Nature: [Excessive force / Custodial torture / False arrest / Other]
4. Victims: [Names if consent given, or "identity protected"]
5. Brief facts: [CHRONOLOGICAL DESCRIPTION]
6. Evidence: [List of enclosed documents/photos]
7. Relief sought: [What action you want NHRC to take]

Declaration: The facts stated above are true.

Signature: _______________
Date: [DATE]

Online: nhrc.nic.in → Lodge Complaint`}
        </div>
      </section>

      {/* CTA */}
      <div className="grid md:grid-cols-2 gap-4 mt-8">
        <Link href="/rti" className="brutal-btn brutal-btn-primary brutal-btn-lg text-center">{hi ? 'RTI जनरेटर (ऑटो PDF) →' : 'RTI GENERATOR (Auto PDF) →'}</Link>
        <Link href="/fir" className="brutal-btn brutal-btn-lg text-center">{hi ? 'FIR असिस्टेंट (विज़ार्ड) →' : 'FIR ASSISTANT (Wizard) →'}</Link>
      </div>
    </div>
  );
}
