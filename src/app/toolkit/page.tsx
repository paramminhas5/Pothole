import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';
import PrintButton from '@/components/PrintButton';
import CopyBlock from './CopyBlock';

export default async function ToolkitPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const hi = locale === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-8 flex justify-between items-start gap-4">
        <div>
          <h1 className="heading-display mb-2">{hi ? 'टेम्पलेट और उपकरण' : 'Templates & Tools'}</h1>
          <p className="text-[var(--color-text-muted)]">{hi ? 'कॉपी करें। भरें। जमा करें। हर संस्थागत कार्रवाई के लिए तैयार।' : 'Copy. Fill. Submit. Ready for every institutional action.'}</p>
        </div>
        <PrintButton locale={locale} />
      </div>

      <p className="text-sm mb-8 text-[var(--color-text-muted)]">{hi ? '💡 "कॉपी" बटन दबाएँ → अपनी जानकारी भरें → जमा करें। RTI और FIR के लिए ऑटो-जनरेटर भी उपलब्ध है।' : '💡 Press "Copy" → fill your details → submit. Auto-generators also available for RTI and FIR.'}</p>


      {/* AUTO GENERATORS PROMO */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <Link href="/rti" className="brutal-card !p-4 hover:border-[var(--color-primary)] block">
          <strong>{hi ? '⚡ RTI ऑटो-जनरेटर' : '⚡ RTI Auto-Generator'}</strong>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">{hi ? 'फॉर्म भरें → पूरा RTI आवेदन तैयार' : 'Fill form → complete RTI application ready'}</p>
        </Link>
        <Link href="/fir" className="brutal-card !p-4 hover:border-[var(--color-primary)] block">
          <strong>{hi ? '⚡ FIR ऑटो-जनरेटर' : '⚡ FIR Auto-Generator'}</strong>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">{hi ? '3 स्टेप → शिकायत + SP पत्र + मजिस्ट्रेट शिकायत' : '3 steps → complaint + SP letter + magistrate complaint'}</p>
        </Link>
      </div>

      {/* TEMPLATES */}
      <CopyBlock
        title={hi ? '📄 RTI आवेदन' : '📄 RTI Application'}
        hint={hi ? '[...] में अपनी जानकारी भरें। ₹10 शुल्क के साथ rtionline.gov.in पर जमा करें या डाक से भेजें।' : 'Fill [...] with your details. Submit on rtionline.gov.in with ₹10 fee or send by post.'}
        content={`To,
The Public Information Officer,
[DEPARTMENT NAME],
[ADDRESS]

Subject: Application under Right to Information Act, 2005

Sir/Madam,

I, [YOUR NAME], a citizen of India, hereby seek the following information under the Right to Information Act, 2005:

1. [YOUR SPECIFIC QUESTION]
2. [SECOND QUESTION — optional]
3. [THIRD QUESTION — optional]

Period: [FROM DATE] to [TO DATE]

I am paying the prescribed fee of ₹10 via [Indian Postal Order / Online Payment / Court Fee Stamp].

If the information sought is held by another public authority, kindly transfer this application under Section 6(3) of the RTI Act.

Yours faithfully,
[YOUR NAME]
[YOUR ADDRESS]
[PHONE/EMAIL — optional]
Date: [DATE]

---
SUBMIT: rtionline.gov.in (central) | State RTI portal (state level) | Post/in-person
FEE: ₹10 | BPL exempted
RESPONSE: 30 days (life/liberty: 48 hours)
NO RESPONSE → File First Appeal (template below)`}
      />

      <CopyBlock
        title={hi ? '📄 RTI प्रथम अपील (30 दिन बाद)' : '📄 RTI First Appeal (after 30 days)'}
        hint={hi ? '30 दिन में जवाब नहीं आया? यह अपील उसी विभाग के वरिष्ठ अधिकारी को भेजें।' : 'No response in 30 days? Send this appeal to a senior officer in the same department.'}
        content={`To,
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
1. Direct the PIO to provide complete information within 15 days
2. Take disciplinary action for non-compliance

Yours faithfully,
[YOUR NAME]
[ADDRESS]
Date: [DATE]

Encl: Copy of original RTI application and receipt

---
IF THIS ALSO FAILS → Second Appeal to CIC (cic.gov.in) or SIC
CIC can impose penalty: ₹250/day, max ₹25,000 on the officer`}
      />

      <CopyBlock
        title={hi ? '🚨 FIR शिकायत' : '🚨 FIR Complaint'}
        hint={hi ? 'पुलिस स्टेशन में जमा करें। रसीद लें। वे FIR दर्ज करने से मना नहीं कर सकते (BNSS 173)।' : 'Submit at police station. Get receipt. They cannot refuse to register (BNSS 173).'}
        content={`To,
The Station House Officer,
[POLICE STATION NAME],
[ADDRESS]

Subject: Written complaint for registration of FIR

Sir/Madam,

I wish to report the following cognizable offence:

Date of incident: [DATE]
Time: [APPROXIMATE TIME]
Place: [LOCATION — area, landmarks]

Details:
[WHAT HAPPENED — factual, chronological, 3-5 sentences]

Accused (if known):
[NAME / DESCRIPTION / BADGE NUMBER]

Witnesses (with consent):
[NAME — CONTACT]

Evidence available:
[PHOTOS / VIDEOS / DOCUMENTS]

I request you to register an FIR under appropriate sections and investigate. Please provide me with a copy of the FIR as per my legal right.

Yours faithfully,
[YOUR NAME]
[ADDRESS]
[PHONE — optional]
Date: [DATE]

---
IF REFUSED → Letter to SP (next template)
IF SP ALSO REFUSES → Magistrate complaint under BNSS 175(3)
ZERO FIR: Can file at ANY police station — transferred to correct one`}
      />


      <CopyBlock
        title={hi ? '🚨 SP को पत्र (FIR मना करने पर)' : '🚨 Letter to SP (When FIR Refused)'}
        hint={hi ? 'पुलिस ने FIR लिखने से मना किया? यह पत्र SP (पुलिस अधीक्षक) को भेजें।' : 'Police refused FIR? Send this letter to SP (Superintendent of Police).'}
        content={`To,
The Superintendent of Police,
[DISTRICT], [STATE]

Subject: Failure to register FIR at [POLICE STATION NAME]

Sir/Madam,

I visited [POLICE STATION] on [DATE] to file an FIR regarding [BRIEF — one line].

The SHO/duty officer refused to register my complaint. This violates BNSS Section 173 (mandatory registration of cognizable offences).

I request you to:
1. Direct the SHO to register my FIR immediately
2. Take departmental action against the refusing officer

If no action within 7 days, I will approach the Judicial Magistrate under Section 175(3) BNSS.

Yours faithfully,
[YOUR NAME]
[ADDRESS]
[PHONE]
Date: [DATE]

Encl: Copy of written complaint submitted to police station`}
      />

      <CopyBlock
        title={hi ? '✉️ MLA/MP को पत्र' : '✉️ Letter to MLA/MP'}
        hint={hi ? 'अपने जनप्रतिनिधि को। sansad.in/ls/members पर MP खोजें।' : 'To your representative. Find MP on sansad.in/ls/members.'}
        content={`To,
[Shri/Smt] [NAME],
Hon'ble [MLA / Member of Parliament],
[CONSTITUENCY],
[ADDRESS]

Subject: [SPECIFIC ISSUE — one line]

Respected Sir/Madam,

I am a resident of [YOUR AREA] in your constituency. I am writing regarding [ISSUE].

The problem:
[2-3 sentences — facts, dates, scale of problem]

What has been tried:
- RTI filed on [DATE] — [response/no response]
- Complaint to [DEPT] on [DATE] — [response/no response]
- [Any other action taken]

What I request:
[ONE SPECIFIC ACTION you want them to take — measurable, time-bound]

I will file an RTI in 30 days to check what action was taken on this letter.

Yours sincerely,
[YOUR NAME]
[ADDRESS]
[PHONE / EMAIL — optional]
Date: [DATE]

---
FIND YOUR MP: sansad.in/ls/members
FIND YOUR MLA: [Your state] legislative assembly website
ALSO SUBMIT ON: pgportal.gov.in (CPGRAMS — tracked)`}
      />

      <CopyBlock
        title={hi ? '📊 माँग दस्तावेज़' : '📊 Demand Document'}
        hint={hi ? 'अपनी माँग को औपचारिक करें। ग्रुप/गठबंधन में साझा करें। सार्वजनिक करें।' : 'Formalize your demand. Share with group/coalition. Make it public.'}
        content={`DEMAND DOCUMENT
===============

DEMAND: [One sentence — specific, measurable, time-bound]

TARGET: [Institution/Person with authority to act]

DEADLINE: [Date]

EVIDENCE:
1. [What proves this is a problem — data, documents]
2. [Incidents — dates, details]
3. [Scale — how many people affected]

ACTIONS ALREADY TAKEN:
- RTI filed [DATE] — status: [...]
- Complaint filed [DATE] — status: [...]
- Media coverage: [links]

IF NO ACTION BY DEADLINE:
1. [Next RTI — what question]
2. [PIL if systemic]
3. [Electoral accountability plan]

SUPPORTED BY:
- [Group 1 — city]
- [Group 2 — city]
- [Total signatories: X]

CONTACT: [Spokesperson — dedicated email, not personal]
DATE: [Date]
VERSION: [1.0]`}
      />

      <CopyBlock
        title={hi ? '📸 सबूत रिकॉर्ड' : '📸 Evidence Log'}
        hint={hi ? 'हर सबूत के लिए यह भरें। कोर्ट में काम आता है।' : 'Fill this for every piece of evidence. Useful in court.'}
        content={`EVIDENCE LOG
============

Item #: [Sequential number]
Type: [ ] Photo  [ ] Video  [ ] Document  [ ] Audio  [ ] Testimony

Date captured: [DATE + TIME]
Location: [WHERE — area, landmarks]
Captured by: [WHO — code name OK]
Device: [Phone model]

Description:
[What does this show? Why is it relevant? 2-3 sentences]

Chain of custody:
- Captured: [DATE] by [WHO]
- Backed up to: [Google Drive / ProtonDrive / iCloud] on [DATE]
- Original edited: [ ] NO (must be no)
- Shared with: [WHO, WHEN, WHY]

Hash (optional — for tamper proof):
SHA-256: [Use sha256.online to generate]

---
RULES:
• Never edit/crop original
• Backup to cloud IMMEDIATELY
• Note time + place in every shot
• Keep this log with the evidence`}
      />


      <CopyBlock
        title={hi ? '📰 प्रेस रिलीज' : '📰 Press Release'}
        hint={hi ? 'मीडिया को भेजें। एक पेज में सब कुछ। बीट पत्रकार को Signal/email से।' : 'Send to media. Everything on one page. To beat journalist via Signal/email.'}
        content={`FOR IMMEDIATE RELEASE
[DATE]

[HEADLINE — action-oriented, specific, under 15 words]

[CITY] — [First paragraph: WHO is doing WHAT, WHERE, WHEN, WHY — 2-3 sentences maximum]

[Second paragraph: CONTEXT — why this matters, scale, evidence, how many affected]

[Third paragraph: SPECIFIC DEMAND — what action, from whom, by when]

[Quote from spokesperson]: "[One clear statement — the sound bite]"

[Background: 2-3 sentences of history — previous attempts, institutional failures]

CONTACT:
[Spokesperson name — can be code name]
[Dedicated email — NOT personal]
[Phone — dedicated number if possible]

###

---
TIPS:
• One page maximum
• Send to beat journalists (education/law/politics)
• Use Signal or encrypted email
• Attach 1-2 strong photos if available
• Follow up once, not more`}
      />

      <CopyBlock
        title={hi ? '🏛️ NHRC शिकायत' : '🏛️ NHRC Complaint'}
        hint={hi ? 'पुलिस अत्याचार, हिरासत में हिंसा, मानवाधिकार उल्लंघन। ऑनलाइन: nhrc.nic.in' : 'Police brutality, custodial violence, human rights violation. Online: nhrc.nic.in'}
        content={`To,
The Chairperson,
National Human Rights Commission,
Manav Adhikar Bhawan, Block-C,
GPO Complex, INA, New Delhi - 110023

Subject: Complaint of human rights violation

1. Complainant: [YOUR NAME]
2. Address: [YOUR ADDRESS]
3. Date of violation: [DATE]
4. Place: [LOCATION]
5. Authority responsible: [POLICE STATION / UNIT / OFFICER]
6. Nature: [Excessive force / Custodial torture / False arrest / Illegal detention]

7. Brief facts (chronological):
[PARAGRAPH — what happened, in order, with times]

8. Victims:
[Names if consent given, or "identity protected for safety"]

9. Evidence enclosed:
- [ ] Photos/videos (describe)
- [ ] Medical reports / MLC
- [ ] FIR copy (if filed)
- [ ] Witness statements
- [ ] Media reports (links)

10. Relief sought:
[What action you want NHRC to take — investigation, compensation, action against officers]

Declaration: The facts stated above are true to the best of my knowledge.

Signature: _______________
Date: [DATE]

---
SUBMIT ONLINE: nhrc.nic.in → "Lodge Complaint"
PHONE: 011-24663333
TRACK: nhrc.nic.in → "Complaint Status"`}
      />

      <CopyBlock
        title={hi ? '📋 बैठक एजेंडा' : '📋 Meeting Agenda'}
        hint={hi ? 'हर बैठक से पहले शेयर करें। 30-60 मिनट अधिकतम। निर्णय रिकॉर्ड करें।' : 'Share before every meeting. 30-60 minutes max. Record decisions.'}
        content={`MEETING AGENDA
==============
Date: [DATE] | Time: [TIME] | Duration: [30-60 min]
Facilitator: [Name] | Note-taker: [Name — rotating]

1. CHECK-IN (5 min)
   - Everyone safe? Any urgent concerns?

2. UPDATES (10 min)
   - RTI status: [...]
   - FIR/complaint status: [...]
   - Media: [...]
   - Institutional responses: [...]

3. DECISIONS NEEDED (15 min)
   - [Decision 1]: Options A / B / C → DECIDED: [...]
   - [Decision 2]: Options A / B → DECIDED: [...]

4. ACTION ITEMS (10 min)
   - [WHO] does [WHAT] by [WHEN]
   - [WHO] does [WHAT] by [WHEN]
   - [WHO] does [WHAT] by [WHEN]

5. NEXT MEETING (2 min)
   - Date: [...]
   - Facilitator: [next person in rotation]

DECISIONS RECORD:
[List all decisions made with date]`}
      />

      {/* CTAs */}
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <Link href="/rti" className="brutal-btn brutal-btn-primary brutal-btn-lg text-center">{hi ? 'RTI जनरेटर →' : 'RTI GENERATOR →'}</Link>
        <Link href="/fir" className="brutal-btn brutal-btn-lg text-center">{hi ? 'FIR असिस्टेंट →' : 'FIR ASSISTANT →'}</Link>
        <Link href="/playbook" className="brutal-btn brutal-btn-lg text-center">{hi ? 'प्लेबुक →' : 'PLAYBOOK →'}</Link>
      </div>
    </div>
  );
}
