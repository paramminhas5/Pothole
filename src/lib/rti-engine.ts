/**
 * RTI Escalation Engine — turns document generation into a tracked machine.
 * 
 * The statutory clock: ₹10 filing → 30 days → response or ₹250/day penalty
 * Day 31: First Appeal (auto-generated)
 * Day 31+30: Second Appeal / IC Complaint (auto-generated)
 */

export interface RTIGenerationInput {
  authorityName: string;
  authorityAddress: string;
  subject: string;
  questions: string[];
  filedDate?: string; // defaults to today
  city?: string;
}

export interface GeneratedRTIDocument {
  type: 'rti_application' | 'first_appeal' | 'ic_complaint' | 'silence_card';
  title: string;
  content: string;
  filedDate: string;
  deadlineDate: string;
}

/**
 * Generate the initial RTI application document
 */
export function generateRTIApplication(input: RTIGenerationInput): GeneratedRTIDocument {
  const filedDate = input.filedDate || new Date().toISOString().split('T')[0];
  const deadline = new Date(filedDate);
  deadline.setDate(deadline.getDate() + 30);
  const deadlineDate = deadline.toISOString().split('T')[0];

  const questionsText = input.questions
    .map((q, i) => `${i + 1}. ${q}`)
    .join('\n');

  const content = `
TO,
The Public Information Officer,
${input.authorityName}
${input.authorityAddress}

Subject: Application under Right to Information Act, 2005
Re: ${input.subject}

Sir/Madam,

Under the provisions of the Right to Information Act, 2005, I request the following information:

${questionsText}

I am depositing the prescribed fee of ₹10 (Ten Rupees) via [Indian Postal Order / Online Payment / Cash].

As per Section 7(1) of the RTI Act, you are required to provide the information within 30 days of receipt of this application. Failure to respond within the stipulated time may attract a penalty of ₹250 per day under Section 20 of the Act.

If the information sought is held by another public authority, please transfer this application to the concerned authority within 5 days as mandated under Section 6(3) of the Act.

Date: ${filedDate}
Place: ${input.city || ''}

Thanking you,
[Applicant Name]
[Address]
[Contact]
`.trim();

  return {
    type: 'rti_application',
    title: `RTI Application — ${input.subject}`,
    content,
    filedDate,
    deadlineDate,
  };
}

/**
 * Generate First Appeal (Day 31+)
 */
export function generateFirstAppeal(originalRTI: {
  authorityName: string;
  subject: string;
  filedDate: string;
  city?: string;
}): GeneratedRTIDocument {
  const appealDate = new Date().toISOString().split('T')[0];
  const appealDeadline = new Date();
  appealDeadline.setDate(appealDeadline.getDate() + 30);

  const content = `
TO,
The First Appellate Authority,
${originalRTI.authorityName}

Subject: First Appeal under Section 19(1) of RTI Act, 2005
Re: Non-response to RTI Application dated ${originalRTI.filedDate}

Sir/Madam,

I filed an RTI application dated ${originalRTI.filedDate} seeking information regarding "${originalRTI.subject}" from the Public Information Officer of ${originalRTI.authorityName}.

Despite the expiry of the 30-day statutory period under Section 7(1), I have NOT received any response.

Under Section 19(1) of the RTI Act, 2005, I hereby file this First Appeal against the deemed refusal of information.

I request:
1. The information originally sought be provided immediately.
2. A penalty be imposed on the PIO for failure to respond within the statutory period, as per Section 20 of the Act (₹250 per day of delay).
3. Disciplinary action be recommended against the PIO.

Date of original application: ${originalRTI.filedDate}
Date of this appeal: ${appealDate}
Days of delay: ${Math.floor((Date.now() - new Date(originalRTI.filedDate).getTime()) / 86_400_000) - 30}

Place: ${originalRTI.city || ''}

[Applicant Name]
[Address]
`.trim();

  return {
    type: 'first_appeal',
    title: `First Appeal — ${originalRTI.subject}`,
    content,
    filedDate: appealDate,
    deadlineDate: appealDeadline.toISOString().split('T')[0],
  };
}

/**
 * Generate IC Complaint (after First Appeal expiry)
 */
export function generateICComplaint(originalRTI: {
  authorityName: string;
  subject: string;
  filedDate: string;
  appealDate: string;
  city?: string;
  state?: string;
}): GeneratedRTIDocument {
  const complaintDate = new Date().toISOString().split('T')[0];
  const commission = originalRTI.state
    ? `State Information Commission, ${originalRTI.state}`
    : 'Central Information Commission, New Delhi';

  const content = `
TO,
The ${commission}

Subject: Second Appeal / Complaint under Section 19(3) of RTI Act, 2005
Re: Non-response to RTI and First Appeal regarding "${originalRTI.subject}"

Hon'ble Commission,

1. I filed an RTI application dated ${originalRTI.filedDate} with ${originalRTI.authorityName}.
2. No response was received within 30 days.
3. I filed a First Appeal dated ${originalRTI.appealDate}.
4. No response has been received to the First Appeal either.

I hereby file this Second Appeal / Complaint under Section 19(3) requesting:
1. Direction to the PIO to provide the information sought.
2. Imposition of penalty under Section 20 (₹250/day since ${originalRTI.filedDate} + 30 days).
3. Compensation for loss caused by denial of information.
4. Disciplinary action against the erring officers.

Total days of delay from original filing: ${Math.floor((Date.now() - new Date(originalRTI.filedDate).getTime()) / 86_400_000)}
Estimated penalty accrued: ₹${(Math.max(0, Math.floor((Date.now() - new Date(originalRTI.filedDate).getTime()) / 86_400_000) - 30) * 250).toLocaleString('en-IN')}

Date: ${complaintDate}
Place: ${originalRTI.city || ''}

[Applicant Name]
[Address]
`.trim();

  return {
    type: 'ic_complaint',
    title: `IC Complaint — ${originalRTI.subject}`,
    content,
    filedDate: complaintDate,
    deadlineDate: '', // IC has no fixed deadline
  };
}

/**
 * Calculate RTI status based on dates
 */
export function calculateRTIStatus(filing: {
  filedDate: string;
  responseReceived: boolean;
  appealFiledDate: string | null;
  icComplaintDate: string | null;
}): { status: string; daysElapsed: number; penalty: number; nextAction: string } {
  const now = Date.now();
  const filed = new Date(filing.filedDate).getTime();
  const daysElapsed = Math.floor((now - filed) / 86_400_000);

  if (filing.responseReceived) {
    return { status: 'responded', daysElapsed, penalty: 0, nextAction: 'Review response' };
  }

  if (filing.icComplaintDate) {
    const penalty = Math.max(0, daysElapsed - 30) * 250;
    return { status: 'ic_complaint', daysElapsed, penalty, nextAction: 'Await IC hearing' };
  }

  if (filing.appealFiledDate) {
    const appealDays = Math.floor((now - new Date(filing.appealFiledDate).getTime()) / 86_400_000);
    const penalty = Math.max(0, daysElapsed - 30) * 250;
    if (appealDays > 30) {
      return { status: 'appeal_expired', daysElapsed, penalty, nextAction: 'File IC Complaint' };
    }
    return { status: 'first_appeal', daysElapsed, penalty, nextAction: 'Await appeal response' };
  }

  if (daysElapsed > 30) {
    const penalty = (daysElapsed - 30) * 250;
    return { status: 'overdue', daysElapsed, penalty, nextAction: 'File First Appeal' };
  }

  return { status: 'awaiting', daysElapsed, penalty: 0, nextAction: `Wait ${30 - daysElapsed} more days` };
}
