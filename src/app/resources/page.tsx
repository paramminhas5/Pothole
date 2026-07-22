import { cookies } from 'next/headers';
import { Locale } from '@/types';
import PrintButton from '@/components/PrintButton';

export default async function ResourcesPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const isHindi = locale === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-10 flex justify-between items-start">
        <div>
          <div className="brutal-badge brutal-badge-red mb-4">{isHindi ? 'संसाधन' : 'RESOURCES'}</div>
          <h1 className="heading-1 mb-3">{isHindi ? 'आपातकालीन संसाधन निर्देशिका' : 'Emergency Resource Directory'}</h1>
          <p className="text-[var(--color-text-muted)] text-lg">
            {isHindi ? 'सभी नंबर सत्यापित और सक्रिय। इस पेज को प्रिंट या स्क्रीनशॉट करें।' : 'All numbers verified and active. Print or screenshot this page.'}
          </p>
        </div>
        <PrintButton locale={locale} />
      </div>

      {/* ALL-INDIA EMERGENCY NUMBERS */}
      <section className="brutal-card mb-6 !border-[var(--color-red)]">
        <div className="brutal-badge brutal-badge-red mb-4">{isHindi ? 'आपातकालीन नंबर' : 'EMERGENCY NUMBERS'}</div>
        <h2 className="heading-2 mb-4">{isHindi ? 'राष्ट्रीय आपातकालीन नंबर (24/7, सभी नेटवर्क)' : 'National Emergency Numbers (24/7, all networks)'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="brutal-card-flat !p-3"><strong>112</strong> — {isHindi ? 'एकीकृत आपातकालीन (पुलिस, अग्निशमन, एम्बुलेंस)' : 'Unified emergency (police, fire, ambulance)'}</div>
          <div className="brutal-card-flat !p-3"><strong>100</strong> — {isHindi ? 'पुलिस' : 'Police'}</div>
          <div className="brutal-card-flat !p-3"><strong>101</strong> — {isHindi ? 'अग्निशमन' : 'Fire'}</div>
          <div className="brutal-card-flat !p-3"><strong>102 / 108</strong> — {isHindi ? 'एम्बुलेंस (102 मातृ/शिशु, 108 आपातकालीन)' : 'Ambulance (102 maternal, 108 emergency)'}</div>
          <div className="brutal-card-flat !p-3"><strong>15100</strong> — {isHindi ? 'NALSA मुफ़्त कानूनी सहायता (toll-free)' : 'NALSA free legal aid (toll-free)'}</div>
          <div className="brutal-card-flat !p-3"><strong>181</strong> — {isHindi ? 'महिला हेल्पलाइन' : 'Women helpline'}</div>
          <div className="brutal-card-flat !p-3"><strong>1098</strong> — {isHindi ? 'चाइल्डलाइन (बच्चों के लिए)' : 'Childline (for children)'}</div>
          <div className="brutal-card-flat !p-3"><strong>14567</strong> — {isHindi ? 'एल्डरलाइन (वरिष्ठ नागरिक)' : 'Elderline (senior citizens)'}</div>
          <div className="brutal-card-flat !p-3"><strong>1930</strong> — {isHindi ? 'साइबर फ्रॉड हेल्पलाइन (UPI/बैंकिंग)' : 'Cyber fraud helpline (UPI/banking)'}</div>
          <div className="brutal-card-flat !p-3"><strong>1800-599-0019</strong> — {isHindi ? 'किरण — मानसिक स्वास्थ्य हेल्पलाइन' : 'Kiran — mental health helpline'}</div>
        </div>
      </section>

      {/* LEGAL AID */}
      <section className="brutal-card mb-6">
        <div className="brutal-badge brutal-badge-accent mb-4">{isHindi ? 'कानूनी सहायता' : 'LEGAL AID'}</div>
        <h2 className="heading-2 mb-4">{isHindi ? 'मुफ़्त कानूनी सहायता' : 'Free Legal Aid'}</h2>
        <div className="space-y-4 text-sm">
          <div className="brutal-card-flat !p-4">
            <h3 className="font-bold mb-1">NALSA (National Legal Services Authority)</h3>
            <p>{isHindi ? 'हर गिरफ्तार व्यक्ति को मुफ़्त वकील का अधिकार है।' : 'Every arrested person has the right to a free lawyer.'}</p>
            <ul className="mt-2 space-y-1 text-xs">
              <li><strong>{isHindi ? 'फ़ोन' : 'Phone'}:</strong> 15100 (toll-free, 24/7)</li>
              <li><strong>WhatsApp:</strong> +91 94180 33385</li>
              <li><strong>Web:</strong> nalsa.gov.in</li>
              <li><strong>{isHindi ? 'पात्रता' : 'Eligibility'}:</strong> {isHindi ? 'गिरफ्तार कोई भी व्यक्ति, SC/ST, महिलाएं, बच्चे, विकलांग, आर्थिक रूप से कमज़ोर' : 'Any arrested person, SC/ST, women, children, disabled, economically weaker sections'}</li>
            </ul>
          </div>
          <div className="brutal-card-flat !p-4">
            <h3 className="font-bold mb-1">HRLN (Human Rights Law Network)</h3>
            <p>{isHindi ? 'Pro-bono कानूनी सेवाएं। Supreme Court और High Courts में।' : 'Pro-bono legal services. Supreme Court and High Courts.'}</p>
            <ul className="mt-2 space-y-1 text-xs">
              <li><strong>Delhi:</strong> 011-24316922</li>
              <li><strong>Mumbai:</strong> 022-22023254</li>
              <li><strong>Kolkata:</strong> 033-22174733</li>
              <li><strong>Chennai:</strong> 044-28275025</li>
              <li><strong>Web:</strong> hrln.org</li>
            </ul>
          </div>
          <div className="brutal-card-flat !p-4">
            <h3 className="font-bold mb-1">CJP (Citizens for Justice and Peace)</h3>
            <p>{isHindi ? 'नागरिक अधिकार, अल्पसंख्यक अधिकार, कानूनी हस्तक्षेप।' : 'Civil rights, minority rights, legal interventions.'}</p>
            <ul className="mt-2 space-y-1 text-xs">
              <li><strong>Web:</strong> cjp.org.in</li>
              <li><strong>Twitter/X:</strong> @caborjustice</li>
            </ul>
          </div>
          <div className="brutal-card-flat !p-4">
            <h3 className="font-bold mb-1">PUCL &amp; PUDR</h3>
            <ul className="space-y-1 text-xs">
              <li><strong>PUCL:</strong> pucldelhi.org · puclnat@gmail.com · {isHindi ? 'राष्ट्रव्यापी (1976 से)' : 'Nationwide (since 1976)'}</li>
              <li><strong>PUDR:</strong> pudr.org · {isHindi ? 'दिल्ली (1977 से)' : 'Delhi (since 1977)'}</li>
            </ul>
          </div>
          <div className="brutal-card-flat !p-4">
            <h3 className="font-bold mb-1">{isHindi ? 'DLSA (जिला विधिक सेवा प्राधिकरण)' : 'DLSA (District Legal Services Authority)'}</h3>
            <p>{isHindi ? 'हर जिले में DLSA कार्यालय है। नज़दीकी खोजें:' : 'Every district has a DLSA office. Find nearest:'}</p>
            <ul className="mt-2 space-y-1 text-xs">
              <li><strong>Delhi:</strong> dslsa.org · 011-23073854</li>
              <li><strong>Mumbai:</strong> bombayhighcourt.nic.in/mslsa</li>
              <li><strong>Bengaluru:</strong> kslsa.kar.nic.in</li>
              <li><strong>{isHindi ? 'अन्य' : 'Others'}:</strong> Google &quot;[{isHindi ? 'आपका जिला' : 'your district'}] DLSA&quot;</li>
            </ul>
          </div>
        </div>
      </section>

      {/* HOSPITALS */}
      <section className="brutal-card mb-6">
        <div className="brutal-badge brutal-badge-sky mb-4">{isHindi ? 'अस्पताल' : 'HOSPITALS'}</div>
        <h2 className="heading-2 mb-4">{isHindi ? 'सरकारी अस्पताल (मुफ़्त इलाज)' : 'Government Hospitals (Free Treatment)'}</h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">
          {isHindi ? 'आपातकालीन इलाज सभी सरकारी अस्पतालों में मुफ़्त है — BPL/APL कोई भी हो। Parmanand Katara vs Union of India (1989) के तहत कोई भी अस्पताल आपातकालीन उपचार से मना नहीं कर सकता।' : 'Emergency treatment is free at all government hospitals — BPL/APL doesn\'t matter. Under Parmanand Katara vs Union of India (1989), no hospital can refuse emergency treatment.'}
        </p>
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <div className="brutal-card-flat !p-3">
            <h3 className="font-bold text-xs">DELHI</h3>
            <ul className="text-xs space-y-0.5 mt-1">
              <li>AIIMS — Ansari Nagar</li>
              <li>Safdarjung Hospital — Ring Road</li>
              <li>RML Hospital — Connaught Place</li>
              <li>GTB Hospital — Dilshad Garden</li>
              <li>Lok Nayak (LNJP) — Delhi Gate</li>
              <li>Deen Dayal Upadhyay — Hari Nagar</li>
            </ul>
          </div>
          <div className="brutal-card-flat !p-3">
            <h3 className="font-bold text-xs">MUMBAI</h3>
            <ul className="text-xs space-y-0.5 mt-1">
              <li>KEM Hospital — Parel</li>
              <li>JJ Hospital — Byculla</li>
              <li>Sion Hospital — Sion</li>
              <li>Nair Hospital — Mumbai Central</li>
              <li>Cooper Hospital — Vile Parle</li>
              <li>Rajawadi Hospital — Ghatkopar</li>
            </ul>
          </div>
          <div className="brutal-card-flat !p-3">
            <h3 className="font-bold text-xs">BENGALURU</h3>
            <ul className="text-xs space-y-0.5 mt-1">
              <li>Victoria Hospital — Fort</li>
              <li>Bowring Hospital — Shivajinagar</li>
              <li>KC General Hospital — Malleswaram</li>
              <li>Jayadeva Hospital — Jayanagar</li>
              <li>NIMHANS — Hosur Road</li>
            </ul>
          </div>
          <div className="brutal-card-flat !p-3">
            <h3 className="font-bold text-xs">HYDERABAD</h3>
            <ul className="text-xs space-y-0.5 mt-1">
              <li>Osmania General Hospital — Afzalgunj</li>
              <li>Gandhi Hospital — Secunderabad</li>
              <li>NIMS — Punjagutta</li>
              <li>Niloufer Hospital — Red Hills</li>
            </ul>
          </div>
          <div className="brutal-card-flat !p-3">
            <h3 className="font-bold text-xs">CHENNAI</h3>
            <ul className="text-xs space-y-0.5 mt-1">
              <li>Rajiv Gandhi GGH — Park Town</li>
              <li>Stanley Medical College Hospital — Royapuram</li>
              <li>Kilpauk Medical College — Kilpauk</li>
              <li>Institute of Child Health — Egmore</li>
            </ul>
          </div>
          <div className="brutal-card-flat !p-3">
            <h3 className="font-bold text-xs">KOLKATA</h3>
            <ul className="text-xs space-y-0.5 mt-1">
              <li>SSKM Hospital — Bhowanipore</li>
              <li>NRS Medical College — Sealdah</li>
              <li>RG Kar Medical College — Belgachia</li>
              <li>Calcutta Medical College — College Square</li>
            </ul>
          </div>
          <div className="brutal-card-flat !p-3">
            <h3 className="font-bold text-xs">PUNE</h3>
            <ul className="text-xs space-y-0.5 mt-1">
              <li>Sassoon Hospital — Bund Garden</li>
              <li>B.J. Medical College — Pune Camp</li>
              <li>YCM Hospital — Pimpri</li>
            </ul>
          </div>
          <div className="brutal-card-flat !p-3">
            <h3 className="font-bold text-xs">LUCKNOW</h3>
            <ul className="text-xs space-y-0.5 mt-1">
              <li>KGMU — Chowk</li>
              <li>SGPGI — Raibareli Road</li>
              <li>Civil Hospital — Charbagh</li>
            </ul>
          </div>
        </div>
      </section>

      {/* NGOs & SUPPORT */}
      <section className="brutal-card mb-6">
        <div className="brutal-badge brutal-badge-lime mb-4">{isHindi ? 'सहायता संगठन' : 'SUPPORT ORGS'}</div>
        <h2 className="heading-2 mb-4">{isHindi ? 'सक्रिय सहायता संगठन' : 'Active Support Organizations'}</h2>
        <div className="space-y-3 text-sm">
          <div className="brutal-card-flat !p-4">
            <h3 className="font-bold mb-1">IFF (Internet Freedom Foundation)</h3>
            <p className="text-xs text-[var(--color-text-muted)]">{isHindi ? 'इंटरनेट शटडाउन, डिजिटल अधिकार, RTI' : 'Internet shutdowns, digital rights, RTI'}</p>
            <p className="text-xs">internetfreedom.in · @internetfreedom</p>
          </div>
          <div className="brutal-card-flat !p-4">
            <h3 className="font-bold mb-1">SFLC.in</h3>
            <p className="text-xs text-[var(--color-text-muted)]">{isHindi ? 'डिजिटल अधिकारों पर मुफ़्त कानूनी सहायता, निगरानी विरोध' : 'Free legal aid on digital rights, surveillance opposition'}</p>
            <p className="text-xs">sflc.in</p>
          </div>
          <div className="brutal-card-flat !p-4">
            <h3 className="font-bold mb-1">Nyaaya</h3>
            <p className="text-xs text-[var(--color-text-muted)]">{isHindi ? 'कानून को सरल भाषा में समझाता है। आपके अधिकारों का सरल विवरण।' : 'Explains law in plain language. Simple breakdown of your rights.'}</p>
            <p className="text-xs">nyaaya.org</p>
          </div>
          <div className="brutal-card-flat !p-4">
            <h3 className="font-bold mb-1">{isHindi ? 'इंटरनेट शटडाउन ट्रैकर' : 'Internet Shutdown Tracker'}</h3>
            <p className="text-xs text-[var(--color-text-muted)]">{isHindi ? 'भारत में इंटरनेट बंदी की लाइव ट्रैकिंग' : 'Live tracking of internet shutdowns in India'}</p>
            <p className="text-xs">internetshutdowns.in</p>
          </div>
          <div className="brutal-card-flat !p-4">
            <h3 className="font-bold mb-1">NHRC</h3>
            <p className="text-xs text-[var(--color-text-muted)]">{isHindi ? 'राष्ट्रीय मानवाधिकार आयोग — पुलिस अत्याचार, अवैध हिरासत की शिकायत' : 'National Human Rights Commission — complaints about police excess, illegal detention'}</p>
            <p className="text-xs">{isHindi ? 'फ़ोन' : 'Phone'}: 011-23385368 · nhrc.nic.in</p>
          </div>
          <div className="brutal-card-flat !p-4">
            <h3 className="font-bold mb-1">{isHindi ? 'मानसिक स्वास्थ्य' : 'Mental Health'}</h3>
            <ul className="text-xs space-y-1 mt-1">
              <li><strong>Kiran:</strong> 1800-599-0019 (toll-free, 24/7)</li>
              <li><strong>Vandrevala Foundation:</strong> 1860-2662-345</li>
              <li><strong>iCall (TISS):</strong> 9152987821</li>
              <li><strong>AASRA:</strong> 9820466726</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FIRST AID ESSENTIALS */}
      <section className="brutal-card mb-6">
        <div className="brutal-badge brutal-badge-yellow mb-4">{isHindi ? 'प्राथमिक चिकित्सा' : 'FIRST AID'}</div>
        <h2 className="heading-2 mb-4">{isHindi ? 'ज़रूरी सामान (प्रदर्शन में ले जाएं)' : 'Essential Kit (Take to Protests)'}</h2>
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <div>
            <h3 className="font-bold text-xs mb-2">{isHindi ? 'मेडिकल' : 'MEDICAL'}</h3>
            <ul className="text-xs space-y-1">
              <li>→ ORS sachets (5-10)</li>
              <li>→ {isHindi ? 'बैंडेज, रुई, एंटीसेप्टिक' : 'Bandages, cotton, antiseptic'}</li>
              <li>→ {isHindi ? 'दर्द निवारक (Paracetamol)' : 'Pain relievers (Paracetamol)'}</li>
              <li>→ {isHindi ? 'एंटीहिस्टामिन (एलर्जी/गैस)' : 'Antihistamine (allergy/gas)'}</li>
              <li>→ {isHindi ? 'आई वॉश बोतल (सादा पानी)' : 'Eye wash bottle (plain water)'}</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-xs mb-2">{isHindi ? 'सामान्य' : 'GENERAL'}</h3>
            <ul className="text-xs space-y-1">
              <li>→ {isHindi ? 'पानी (2L+), स्नैक्स' : 'Water (2L+), snacks'}</li>
              <li>→ {isHindi ? 'कैश ₹500-1000 (UPI बंद हो सकता है)' : 'Cash ₹500-1000 (UPI may be down)'}</li>
              <li>→ {isHindi ? 'सैनिटरी पैड, टॉयलेट पेपर' : 'Sanitary pads, toilet paper'}</li>
              <li>→ {isHindi ? 'पोर्टेबल चार्जर, स्थायी मार्कर' : 'Portable charger, permanent marker'}</li>
              <li>→ {isHindi ? 'ID की फ़ोटोकॉपी (मूल घर रखें)' : 'ID photocopy (leave originals home)'}</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="brutal-banner text-center text-xs">
        {isHindi
          ? 'सभी नंबर जुलाई 2026 में सत्यापित। अगर कोई नंबर काम न करे, Sahayata पर रिपोर्ट करें।'
          : 'ALL NUMBERS VERIFIED JULY 2026. IF ANY NUMBER DOESN\'T WORK, REPORT ON SAHAYATA.'}
      </div>
    </div>
  );
}
