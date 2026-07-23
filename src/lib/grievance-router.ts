/**
 * Grievance Router — "I'm angry, what do I do?"
 * Answer 4 questions → routed to the correct civic instrument.
 * 
 * This is the platform's smartest 10 minutes.
 */

export type GrievanceCategory =
  | 'corruption' | 'negligence' | 'harassment' | 'denial_of_service'
  | 'environmental' | 'discrimination' | 'property' | 'educational'
  | 'consumer' | 'police' | 'other';

export type InstrumentType =
  | 'rti' | 'fir' | 'municipal_complaint' | 'consumer_forum'
  | 'cpgrams' | 'pil_worthy' | 'ngt' | 'shrc'
  | 'lokpal' | 'election_commission' | 'press_council';

export interface GrievanceInput {
  whatHappened: GrievanceCategory;
  where: string; // city
  whoResponsible: 'government' | 'police' | 'private_company' | 'educational_institution' | 'unknown';
  hasProof: boolean;
}

export interface GrievanceRoute {
  instrument: InstrumentType;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  effort: 'low' | 'medium' | 'high';
  estimatedDays: number;
  odds: 'good' | 'moderate' | 'uncertain';
  nextStep: string;
  nextStepHi: string;
  link: string;
}

export function routeGrievance(input: GrievanceInput): GrievanceRoute[] {
  const routes: GrievanceRoute[] = [];

  // RTI is almost always applicable for government bodies
  if (input.whoResponsible === 'government' || input.whoResponsible === 'police') {
    routes.push({
      instrument: 'rti',
      title: 'File an RTI',
      titleHi: 'RTI दायर करें',
      description: '₹10, 30-day statutory deadline, ₹250/day penalty for silence. Forces a documented response.',
      descriptionHi: '₹10, 30 दिन की समय सीमा, मौन पर ₹250/दिन जुर्माना। दस्तावेजी उत्तर मजबूर करता है।',
      effort: 'low',
      estimatedDays: 30,
      odds: 'good',
      nextStep: 'Use our RTI Generator to create your application',
      nextStepHi: 'हमारे RTI जनरेटर से आवेदन बनाएं',
      link: '/rti',
    });
  }

  // FIR for criminal matters
  if (input.whatHappened === 'harassment' || input.whatHappened === 'corruption' || input.whatHappened === 'discrimination') {
    routes.push({
      instrument: 'fir',
      title: 'File an FIR',
      titleHi: 'FIR दर्ज करें',
      description: 'If the police refuse, Section 173 BNSS provides routes to the SP and Magistrate.',
      descriptionHi: 'अगर पुलिस मना करे, तो धारा 173 BNSS के तहत SP और मजिस्ट्रेट के पास जा सकते हैं।',
      effort: 'medium',
      estimatedDays: 7,
      odds: input.hasProof ? 'good' : 'moderate',
      nextStep: 'Use our FIR Assistant to generate all three documents',
      nextStepHi: 'हमारे FIR सहायक से तीनों दस्तावेज बनाएं',
      link: '/fir',
    });
  }

  // Municipal complaint for infrastructure
  if (input.whatHappened === 'negligence' && input.whoResponsible === 'government') {
    routes.push({
      instrument: 'municipal_complaint',
      title: 'Municipal Complaint',
      titleHi: 'नगर निगम शिकायत',
      description: 'Formal complaint to the Municipal Commissioner with a copy to the elected councillor.',
      descriptionHi: 'नगर आयुक्त को औपचारिक शिकायत, निर्वाचित पार्षद की प्रतिलिपि के साथ।',
      effort: 'low',
      estimatedDays: 15,
      odds: 'moderate',
      nextStep: 'Start a campaign using the "Bad Roads" or "Garbage" template',
      nextStepHi: '"खराब सड़कें" या "कचरा" टेम्पलेट से अभियान शुरू करें',
      link: '/campaign/create',
    });
  }

  // Consumer forum for private companies
  if (input.whoResponsible === 'private_company') {
    routes.push({
      instrument: 'consumer_forum',
      title: 'Consumer Forum',
      titleHi: 'उपभोक्ता फोरम',
      description: 'For services/products you paid for. District forum for claims up to ₹1 crore.',
      descriptionHi: 'जिन सेवाओं/उत्पादों के लिए भुगतान किया। ₹1 करोड़ तक के दावों के लिए जिला फोरम।',
      effort: 'medium',
      estimatedDays: 90,
      odds: 'moderate',
      nextStep: 'Gather purchase receipts and complaint records',
      nextStepHi: 'खरीद रसीदें और शिकायत रिकॉर्ड इकट्ठा करें',
      link: '/directory?type=legal-aid',
    });
  }

  // CPGRAMS for central government
  if (input.whoResponsible === 'government') {
    routes.push({
      instrument: 'cpgrams',
      title: 'CPGRAMS (Central Portal)',
      titleHi: 'CPGRAMS (केंद्रीय पोर्टल)',
      description: 'Centralized Public Grievance Redress system. Good for central ministries.',
      descriptionHi: 'केंद्रीय सार्वजनिक शिकायत निवारण प्रणाली। केंद्रीय मंत्रालयों के लिए।',
      effort: 'low',
      estimatedDays: 60,
      odds: 'moderate',
      nextStep: 'File online at pgportal.gov.in — RTI follow-up recommended',
      nextStepHi: 'pgportal.gov.in पर ऑनलाइन दायर करें — RTI फॉलो-अप अनुशंसित',
      link: '/rti',
    });
  }

  // Environmental — NGT
  if (input.whatHappened === 'environmental') {
    routes.push({
      instrument: 'ngt',
      title: 'National Green Tribunal',
      titleHi: 'राष्ट्रीय हरित अधिकरण',
      description: 'For environmental damage, pollution, and violations. No court fee for individuals.',
      descriptionHi: 'पर्यावरण क्षति, प्रदूषण और उल्लंघन के लिए। व्यक्तियों के लिए कोई कोर्ट फीस नहीं।',
      effort: 'high',
      estimatedDays: 120,
      odds: 'good',
      nextStep: 'Document evidence thoroughly. Find a local environmental lawyer.',
      nextStepHi: 'साक्ष्य अच्छी तरह दस्तावेज करें। स्थानीय पर्यावरण वकील खोजें।',
      link: '/directory?type=legal-aid&specialization=environmental',
    });
  }

  // Police inaction / human rights
  if (input.whoResponsible === 'police') {
    routes.push({
      instrument: 'shrc',
      title: 'State Human Rights Commission',
      titleHi: 'राज्य मानवाधिकार आयोग',
      description: 'For police excess, custodial violence, or systematic rights violations.',
      descriptionHi: 'पुलिस ज्यादती, हिरासत हिंसा, या व्यवस्थित अधिकार उल्लंघन के लिए।',
      effort: 'medium',
      estimatedDays: 90,
      odds: 'moderate',
      nextStep: 'File complaint with evidence. Consider parallel FIR to SP.',
      nextStepHi: 'साक्ष्य के साथ शिकायत दायर करें। SP को समानांतर FIR पर विचार करें।',
      link: '/fir',
    });
  }

  // Always suggest starting a campaign for accountability
  routes.push({
    instrument: 'rti' as InstrumentType,
    title: 'Start a Campaign',
    titleHi: 'अभियान शुरू करें',
    description: 'Combine instruments into a coordinated campaign with deadlines, evidence, and public accountability.',
    descriptionHi: 'साधनों को एक समन्वित अभियान में जोड़ें — समय सीमा, साक्ष्य और सार्वजनिक जवाबदेही के साथ।',
    effort: 'medium',
    estimatedDays: 60,
    odds: 'good',
    nextStep: 'Choose a campaign template that matches your situation',
    nextStepHi: 'अपनी स्थिति से मेल खाता टेम्पलेट चुनें',
    link: '/campaign/create',
  });

  return routes;
}
