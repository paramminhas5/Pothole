import { NextRequest, NextResponse } from 'next/server';

// Telegram Bot webhook handler
// Set up: https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://your-domain.com/api/telegram

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const ADMIN_CHAT_ID = process.env.TELEGRAM_ADMIN_CHAT_ID || '';
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sahayata.vercel.app';

interface TelegramMessage {
  message_id: number;
  chat: { id: number; first_name?: string };
  text?: string;
}

interface TelegramUpdate {
  message?: TelegramMessage;
}

const RESPONSES: Record<string, { en: string; hi: string }> = {
  rights: {
    en: `⚖️ *YOUR RIGHTS IF STOPPED/ARRESTED*\n\n1. "Tell me the reason."\n2. "I want a lawyer."\n3. "Inform my family."\n4. "I won't unlock my phone."\n5. "No statement without lawyer."\n\n📞 Free lawyer: *1516* (24/7)\n📞 Emergency: *112*\n\n🔗 Full guide: ${BASE_URL}/safety`,
    hi: `⚖️ *अगर रोकें/गिरफ्तार करें*\n\n1. "कारण बताएँ।"\n2. "मुझे वकील चाहिए।"\n3. "परिवार को बताएँ।"\n4. "फोन अनलॉक नहीं करूँगा।"\n5. "बिना वकील कोई बयान नहीं।"\n\n📞 मुफ्त वकील: *1516* (24/7)\n📞 आपातकालीन: *112*\n\n🔗 पूरी गाइड: ${BASE_URL}/safety`,
  },
  rti: {
    en: `📄 *RTI IN 3 STEPS*\n\n1. Go to rtionline.gov.in\n2. Pay ₹10 online\n3. Ask your specific question\n\n⏰ They MUST respond in 30 days\n💰 No response? → ₹250/day penalty on officer\n\n🔗 Auto-generate your RTI: ${BASE_URL}/rti\n🔗 Track your RTI: ${BASE_URL}/rti/track`,
    hi: `📄 *RTI 3 कदम में*\n\n1. rtionline.gov.in पर जाएँ\n2. ₹10 ऑनलाइन भुगतान\n3. अपना प्रश्न पूछें\n\n⏰ 30 दिन में जवाब अनिवार्य\n💰 जवाब नहीं? → अधिकारी पर ₹250/दिन जुर्माना\n\n🔗 RTI ऑटो-जनरेट: ${BASE_URL}/rti\n🔗 RTI ट्रैक: ${BASE_URL}/rti/track`,
  },
  help: {
    en: `🤝 *WHAT I CAN HELP WITH*\n\nType any of these:\n• *rights* — What to say if arrested\n• *rti* — How to file an RTI\n• *lawyer* — Free legal aid\n• *protest* — What's happening now\n• *safety* — Digital security tips\n• *start* — Personalized action plan\n\n🔗 Full platform: ${BASE_URL}`,
    hi: `🤝 *मैं किसमें मदद कर सकता हूँ*\n\nये टाइप करें:\n• *rights* — गिरफ्तारी में क्या बोलें\n• *rti* — RTI कैसे दाखिल करें\n• *lawyer* — मुफ्त कानूनी सहायता\n• *protest* — अभी क्या हो रहा है\n• *safety* — डिजिटल सुरक्षा\n• *start* — आपके लिए एक्शन प्लान\n\n🔗 पूरा प्लेटफॉर्म: ${BASE_URL}`,
  },
  lawyer: {
    en: `⚖️ *FREE LEGAL AID*\n\n📞 *1516* — DSLSA (Delhi, 24/7)\n📞 *15100* — NALSA (National)\n🌐 hrln.org — Human Rights Law Network (26 states)\n\n*Who's eligible:* BPL, SC/ST, women, children, disabled, disaster victims — anyone who can't afford a lawyer.\n\n*How:* Visit DLSA office at nearest district court. Free. 3 days.\n\n🔗 Full list: ${BASE_URL}/resources#legal`,
    hi: `⚖️ *मुफ्त कानूनी सहायता*\n\n📞 *1516* — DSLSA (दिल्ली, 24/7)\n📞 *15100* — NALSA (राष्ट्रीय)\n🌐 hrln.org — मानवाधिकार विधि नेटवर्क (26 राज्य)\n\n*कौन पात्र:* BPL, SC/ST, महिला, बच्चे, विकलांग, आपदा पीड़ित।\n\n*कैसे:* नजदीकी ज़िला अदालत में DLSA कार्यालय। मुफ्त। 3 दिन।\n\n🔗 पूरी सूची: ${BASE_URL}/resources#legal`,
  },
  protest: {
    en: `✊ *CURRENT SITUATION*\n\nCJP Jantar Mantar Sit-In — Day 34+\n5 demands | 0 met | 47 RTIs filed\n\n⚠️ Section 163 active in Central Delhi\n⚠️ Heavy police + CRPF deployment\n\n🔗 Full situation: ${BASE_URL}\n🔗 Going? Prepare: ${BASE_URL}/expect\n🔗 Protest Mode: ${BASE_URL}/protest-mode`,
    hi: `✊ *वर्तमान स्थिति*\n\nCJP जंतर मंतर धरना — दिन 34+\n5 माँगें | 0 पूरी | 47 RTI दाखिल\n\n⚠️ धारा 163 मध्य दिल्ली में लागू\n⚠️ भारी पुलिस + CRPF तैनाती\n\n🔗 पूरी स्थिति: ${BASE_URL}\n🔗 जा रहे? तैयारी: ${BASE_URL}/expect\n🔗 प्रोटेस्ट मोड: ${BASE_URL}/protest-mode`,
  },
  safety: {
    en: `🔒 *DIGITAL SAFETY QUICK*\n\n*Before protest:*\n• PIN 6+ digits, biometrics OFF\n• Location OFF, Bluetooth OFF\n• Signal: auto-delete 1hr\n• Log out banking/social apps\n• Backup to cloud\n\n*If phone seized:*\n• "I will not unlock."\n• Ask for seizure receipt\n• Inform lawyer\n\n🔗 Full guide: ${BASE_URL}/communication`,
    hi: `🔒 *डिजिटल सुरक्षा*\n\n*विरोध से पहले:*\n• PIN 6+ अंक, बायोमेट्रिक बंद\n• लोकेशन बंद, Bluetooth बंद\n• Signal: ऑटो-डिलीट 1 घंटा\n• बैंकिंग/सोशल ऐप लॉगआउट\n• क्लाउड बैकअप\n\n*फोन ज़ब्त हो:*\n• "अनलॉक नहीं करूँगा।"\n• ज़ब्ती रसीद माँगें\n• वकील को बताएँ\n\n🔗 पूरी गाइड: ${BASE_URL}/communication`,
  },
  start: {
    en: `🚀 *GET YOUR PERSONALIZED ACTION PLAN*\n\n3 questions → custom next steps for your specific situation.\n\n🔗 ${BASE_URL}/start\n\nOr type: rights, rti, lawyer, protest, safety`,
    hi: `🚀 *अपनी एक्शन प्लान पाएँ*\n\n3 सवाल → आपकी स्थिति के लिए कस्टम अगले कदम।\n\n🔗 ${BASE_URL}/start\n\nया टाइप करें: rights, rti, lawyer, protest, safety`,
  },
};

async function sendMessage(chatId: number, text: string) {
  if (!BOT_TOKEN) return;
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown', disable_web_page_preview: true }),
  });
}

async function notifyAdmin(text: string) {
  if (!BOT_TOKEN || !ADMIN_CHAT_ID) return;
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: ADMIN_CHAT_ID, text, parse_mode: 'Markdown' }),
  });
}

export async function POST(request: NextRequest) {
  try {
    const update: TelegramUpdate = await request.json();
    const msg = update.message;
    if (!msg?.text) return NextResponse.json({ ok: true });

    const text = msg.text.trim().toLowerCase();
    const chatId = msg.chat.id;

    // Detect language (simple: if Devanagari chars present)
    const isHindi = /[\u0900-\u097F]/.test(msg.text);
    const lang = isHindi ? 'hi' : 'en';

    // Match keywords
    let response: string | null = null;

    if (text.includes('right') || text.includes('अधिकार') || text.includes('arrest') || text.includes('गिरफ्तार')) {
      response = RESPONSES.rights[lang];
    } else if (text.includes('rti') || text.includes('सूचना')) {
      response = RESPONSES.rti[lang];
    } else if (text.includes('lawyer') || text.includes('वकील') || text.includes('legal') || text.includes('कानूनी')) {
      response = RESPONSES.lawyer[lang];
    } else if (text.includes('protest') || text.includes('विरोध') || text.includes('situation') || text.includes('स्थिति')) {
      response = RESPONSES.protest[lang];
    } else if (text.includes('safety') || text.includes('सुरक्षा') || text.includes('digital') || text.includes('डिजिटल')) {
      response = RESPONSES.safety[lang];
    } else if (text.includes('start') || text.includes('शुरू') || text.includes('plan') || text.includes('योजना')) {
      response = RESPONSES.start[lang];
    } else {
      response = RESPONSES.help[lang];
    }

    await sendMessage(chatId, response);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}

// Export the notifyAdmin function for use in other routes
export { notifyAdmin };
