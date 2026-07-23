/**
 * Sahayata OS — Bilingual message system
 * EN/HI full-journey parity. Every label, error, consent text.
 */

export type Locale = 'en' | 'hi';

const messages = {
  // === NAVIGATION ===
  nav: {
    home: { en: 'Home', hi: 'होम' },
    campaigns: { en: 'Campaigns', hi: 'अभियान' },
    ledger: { en: 'Accountability Ledger', hi: 'जवाबदेही रजिस्टर' },
    rti: { en: 'RTI Generator', hi: 'RTI जनरेटर' },
    fir: { en: 'FIR Assistant', hi: 'FIR सहायक' },
    directory: { en: 'Support Directory', hi: 'सहायता निर्देशिका' },
    school: { en: 'Power School', hi: 'पावर स्कूल' },
    exchange: { en: 'Skill Exchange', hi: 'कौशल एक्सचेंज' },
    protestMode: { en: 'Protest Mode', hi: 'प्रोटेस्ट मोड' },
    profile: { en: 'My Profile', hi: 'मेरी प्रोफ़ाइल' },
  },

  // === CAMPAIGNS ===
  campaign: {
    create: { en: 'Start a Campaign', hi: 'अभियान शुरू करें' },
    join: { en: 'Join Campaign', hi: 'अभियान से जुड़ें' },
    support: { en: 'Support This', hi: 'समर्थन करें' },
    demand: { en: 'Demand', hi: 'माँग' },
    target: { en: 'Target Institution', hi: 'लक्षित संस्था' },
    deadline: { en: 'Deadline', hi: 'समय सीमा' },
    evidence: { en: 'Evidence', hi: 'साक्ष्य' },
    team: { en: 'Team', hi: 'टीम' },
    tasks: { en: 'Tasks', hi: 'कार्य' },
    updates: { en: 'Updates', hi: 'अपडेट' },
    status: {
      draft: { en: 'Draft', hi: 'ड्राफ्ट' },
      live: { en: 'Live', hi: 'चालू' },
      escalating: { en: 'Escalating', hi: 'बढ़ रहा है' },
      concluded_won: { en: 'Won', hi: 'जीत' },
      concluded_partial: { en: 'Partial Win', hi: 'आंशिक जीत' },
      concluded_refused: { en: 'Refused', hi: 'मना किया' },
      concluded_abandoned: { en: 'Closed', hi: 'बंद' },
    },
    template: { en: 'Use Template', hi: 'टेम्पलेट उपयोग करें' },
    fromScratch: { en: 'Start from scratch', hi: 'शुरू से शुरू करें' },
  },

  // === RTI ===
  rti: {
    title: { en: 'RTI Filing Tracker', hi: 'RTI ट्रैकर' },
    generate: { en: 'Generate RTI', hi: 'RTI बनाएं' },
    track: { en: 'Track My RTIs', hi: 'मेरी RTI ट्रैक करें' },
    filed: { en: 'Filed', hi: 'दायर' },
    awaiting: { en: 'Awaiting Response', hi: 'उत्तर की प्रतीक्षा' },
    appeal: { en: 'File First Appeal', hi: 'प्रथम अपील दायर करें' },
    icComplaint: { en: 'File IC Complaint', hi: 'IC शिकायत दायर करें' },
    penalty: { en: 'Penalty Accruing', hi: 'जुर्माना बढ़ रहा' },
    penaltyNote: { en: '₹250/day after 30-day deadline', hi: '30 दिन बाद ₹250/दिन जुर्माना' },
    silenceCard: { en: 'Generate Silence Card', hi: 'मौन कार्ड बनाएं' },
    attachToCampaign: { en: 'Attach to Campaign', hi: 'अभियान से जोड़ें' },
    saveLocally: { en: 'Save Locally (Anonymous)', hi: 'स्थानीय सेव करें (गुमनाम)' },
  },

  // === LEDGER ===
  ledger: {
    title: { en: 'Accountability Ledger', hi: 'जवाबदेही रजिस्टर' },
    subtitle: { en: 'Public record of demands, deadlines, and institutional silence', hi: 'माँगों, समय सीमाओं और संस्थागत मौन का सार्वजनिक रिकॉर्ड' },
    demand: { en: 'Demand', hi: 'माँग' },
    institution: { en: 'Institution', hi: 'संस्था' },
    daysElapsed: { en: 'Days', hi: 'दिन' },
    status: { en: 'Status', hi: 'स्थिति' },
    silent: { en: 'SILENT', hi: 'मौन' },
    responded: { en: 'RESPONDED', hi: 'उत्तर दिया' },
  },

  // === SCHOOL ===
  school: {
    title: { en: 'Power School', hi: 'पावर स्कूल' },
    subtitle: { en: 'Learn how power works. Prove you did the work.', hi: 'सत्ता कैसे काम करती है सीखें। काम का सबूत दें।' },
    enroll: { en: 'Enroll', hi: 'नामांकन' },
    continue: { en: 'Continue', hi: 'जारी रखें' },
    completed: { en: 'Completed', hi: 'पूर्ण' },
    fieldAssignment: { en: 'Field Assignment', hi: 'फील्ड असाइनमेंट' },
    submitProof: { en: 'Submit Proof', hi: 'प्रमाण जमा करें' },
  },

  // === DIRECTORY ===
  directory: {
    title: { en: 'Support Directory', hi: 'सहायता निर्देशिका' },
    subtitle: { en: 'Verified organizations, lawyers, helplines — linked to active campaigns', hi: 'सत्यापित संगठन, वकील, हेल्पलाइन — सक्रिय अभियानों से जुड़े' },
    addEntry: { en: 'Submit Entry', hi: 'प्रविष्टि जमा करें' },
  },

  // === EXCHANGE ===
  exchange: {
    title: { en: 'Skill Exchange', hi: 'कौशल एक्सचेंज' },
    subtitle: { en: 'Campaigns need skills. People have skills. Connect them.', hi: 'अभियानों को कौशल चाहिए। लोगों के पास कौशल है। जोड़ें।' },
    offerHelp: { en: 'Offer My Skills', hi: 'मेरा कौशल दें' },
    needHelp: { en: 'Campaign Needs', hi: 'अभियान को चाहिए' },
  },

  // === PROTEST MODE ===
  protest: {
    title: { en: 'Protest Mode', hi: 'प्रोटेस्ट मोड' },
    checklist: { en: 'Tonight Checklist', hi: 'आज रात की चेकलिस्ट' },
    rights: { en: 'Know Your Rights', hi: 'अपने अधिकार जानें' },
    buddy: { en: 'Buddy System', hi: 'बडी सिस्टम' },
    detained: { en: "I'M BEING DETAINED", hi: 'मुझे हिरासत में लिया जा रहा है' },
    aftermath: { en: 'After the Protest', hi: 'प्रोटेस्ट के बाद' },
    sos: { en: 'SOS', hi: 'SOS' },
  },

  // === CONSENT (most important paragraph in the product) ===
  consent: {
    streetToPower: {
      en: 'You are about to create an account. This moves you from anonymous mode to the power layer where your actions build a verifiable civic record. Your street-layer activity (protest mode, rights cards, local RTI saves) will NEVER be linked to this identity. This is a one-way door.',
      hi: 'आप एक खाता बनाने वाले हैं। यह आपको गुमनाम मोड से पावर लेयर में ले जाएगा जहाँ आपकी गतिविधियाँ एक सत्यापन योग्य नागरिक रिकॉर्ड बनाएंगी। आपकी स्ट्रीट-लेयर गतिविधि (प्रोटेस्ट मोड, अधिकार कार्ड, स्थानीय RTI सेव) कभी भी इस पहचान से नहीं जोड़ी जाएगी। यह एक-तरफ़ा दरवाज़ा है।',
    },
    campaignPublic: {
      en: 'Your campaign will become a public page. The demand, target institution, and timeline will be visible to everyone. Your identity will be shown as campaign lead.',
      hi: 'आपका अभियान एक सार्वजनिक पेज बनेगा। माँग, लक्षित संस्था और समयरेखा सभी को दिखेगी। आपकी पहचान अभियान प्रमुख के रूप में दिखेगी।',
    },
  },

  // === COMMON ===
  common: {
    save: { en: 'Save', hi: 'सेव करें' },
    cancel: { en: 'Cancel', hi: 'रद्द करें' },
    submit: { en: 'Submit', hi: 'जमा करें' },
    delete: { en: 'Delete', hi: 'हटाएं' },
    edit: { en: 'Edit', hi: 'संपादित करें' },
    back: { en: 'Back', hi: 'वापस' },
    next: { en: 'Next', hi: 'आगे' },
    loading: { en: 'Loading...', hi: 'लोड हो रहा है...' },
    error: { en: 'Something went wrong', hi: 'कुछ गलत हो गया' },
    retry: { en: 'Try again', hi: 'पुनः प्रयास करें' },
    noResults: { en: 'No results found', hi: 'कोई परिणाम नहीं मिला' },
    city: { en: 'City', hi: 'शहर' },
    category: { en: 'Category', hi: 'श्रेणी' },
    filter: { en: 'Filter', hi: 'फ़िल्टर' },
    share: { en: 'Share', hi: 'शेयर करें' },
    download: { en: 'Download', hi: 'डाउनलोड' },
  },
} as const;

type MessageKey = keyof typeof messages;
type NestedKey<T> = T extends Record<string, Record<string, { en: string; hi: string }>>
  ? { [K in keyof T]: `${K & string}.${keyof T[K] & string}` }[keyof T]
  : never;

export function t(path: string, locale: Locale): string {
  const parts = path.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = messages;
  for (const part of parts) {
    current = current?.[part];
    if (!current) return path; // fallback to key
  }
  if (typeof current === 'object' && locale in current) {
    return current[locale];
  }
  return path;
}

export default messages;
