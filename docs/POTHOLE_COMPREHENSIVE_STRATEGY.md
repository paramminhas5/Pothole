# POTHOLE: Comprehensive Civic Mobilization Platform — Strategy & Audit Document

**Date:** July 23, 2026  
**Repository:** `paramminhas5/Pothole` (branded "Sahayata")  
**Status:** Strategic planning + technical audit  
**Author:** Platform Architecture Team  

---

## TABLE OF CONTENTS

1. [Comprehensive Audit & Strategy](#1-comprehensive-audit--strategy)
2. [Current Landscape & Priority Issues (2026)](#2-current-landscape--priority-issues-2026)
3. [Governance & Power Acquisition Roadmap](#3-governance--power-acquisition-roadmap)
4. [Group Architecture & Contribution Framework](#4-group-architecture--contribution-framework)
5. [Resource Library Structure](#5-resource-library-structure)
6. [Technical Architecture & UI/UX Spec](#6-technical-architecture--uiux-spec)
7. [Implementation Roadmap](#7-implementation-roadmap)
8. [Content & Partnerships](#8-content--partnerships)
9. [Fable-to-Next-Agent Handoff](#9-fable-to-next-agent-handoff)

---


## 1. COMPREHENSIVE AUDIT & STRATEGY

### 1.1 Repository Architecture Analysis

**Tech Stack (Current):**
| Layer | Technology | Version | Assessment |
|-------|-----------|---------|------------|
| Framework | Next.js | 16.2.11 | ✅ Cutting-edge, good choice |
| UI Library | React | 19.2.4 | ✅ Latest stable |
| Language | TypeScript | ^5 | ✅ Strict typing |
| Database | Supabase (PostgreSQL) | ^2.110.8 | ✅ Good for MVP, scales well |
| Styling | Tailwind CSS | ^4 | ✅ Utility-first, performant |
| Testing | Vitest | ^4.1.10 | ✅ Fast, modern |
| Deployment | Vercel (configured) | — | ✅ Serverless, auto-scaling |

**Architecture Pattern:** App Router (Next.js 15+ style), Server Components by default, Client Components where interactive. API routes handle backend logic. Supabase handles auth, DB, and realtime.

### 1.2 Current Feature Inventory

| Feature | Status | Maturity |
|---------|--------|----------|
| Homepage (3 big actions) | ✅ Built | Production-ready UI |
| Post creation (needs/offers) | ✅ Built | Functional, needs auth hardening |
| Community Board | ✅ Built | Functional |
| RTI Generator | ✅ Built | Client-side tool, works offline |
| FIR Assistant | ✅ Built | Client-side tool, works offline |
| Groups (create/browse) | ⚠️ Built | Security concerns (exposed keys) |
| Safety/Rights Guide | ✅ Built | Comprehensive, bilingual |
| Playbook (Protest→Power) | ✅ Built | 10-step guide, excellent |
| Resources Directory | ✅ Built | Comprehensive, sourced |
| Demand Tracker | 🔲 Placeholder | UI only, no backend |
| Alerts System | 🔲 Placeholder | Non-functional |
| Admin Panel | ⚠️ Built | Shared secret auth (insecure) |
| PWA/Offline | ⚠️ Built | Mirror failover unverified |
| Bilingual (EN/HI) | ✅ Built | Inline, not i18n framework |
| Proof-of-Work anti-spam | ⚠️ Built | Bypassable |
| Rate Limiting | ⚠️ Built | RLS blocks reads |
| Email OTP Auth | ⚠️ Built | Broken flow (code not persisted correctly) |


### 1.3 Security Vulnerabilities (Critical)

**P0 — Stop-Ship Issues:**

1. **Exposed Session IDs:** `/api/my-posts` accepts caller-supplied session ID → IDOR vulnerability
2. **Public RLS Policy:** `posts` table has `FOR SELECT USING (true)` → exposes all rows including `session_id`
3. **Shared Admin Secret:** Single `ADMIN_SECRET` env var with `sessionStorage` fallback → no attribution, no MFA
4. **Group Credential Leaks:** `coordinator_key` and `invite_code` exposed through `.select('*')`
5. **Membership Graph Exposure:** Group members publicly readable → high-risk in surveillance contexts
6. **Broken OTP Flow:** Code generation doesn't properly persist → auth flow incomplete
7. **XSS in Exports:** HTML export interpolates untrusted DB fields without escaping
8. **Unverified Mirrors:** Service worker trusts hardcoded mirrors without signed-data verification
9. **Replayable PoW:** Proof-of-work can be replayed; optional when fields omitted
10. **No Data Deletion:** Expired posts filtered, never deleted; no retention enforcement

### 1.4 Scalability Assessment

**Current Capacity:** ~100-1,000 concurrent users (Vercel serverless + Supabase free/pro tier)

**Bottlenecks:**
- No caching layer (every request hits Supabase directly)
- No CDN strategy for static content beyond Vercel's built-in
- Rate limiting depends on Supabase RPC (adds latency)
- No connection pooling configured
- No queue system for heavy operations

**Scaling Path:**
- Supabase Pro → Enterprise for connection pooling + higher limits
- Add Redis/Upstash for rate limiting and caching
- Edge functions for geolocation-specific content
- CDN for static guides (they're server-rendered but rarely change)

### 1.5 Decision: REFACTOR (Not Rebuild)

**Verdict: Progressive refactor on the existing codebase.**

**Justification:**
1. **Stack is modern and correct** — Next.js 16, React 19, Supabase, TypeScript, Tailwind are all optimal choices
2. **Architecture is sound** — App Router, server components, API routes pattern is exactly right
3. **Existing content is valuable** — Safety guides, playbook, resources are production-quality
4. **Security is fixable** — Issues are implementation bugs, not architectural flaws
5. **Design language works** — Neobrutalist aesthetic is distinctive and functional
6. **Bilingual foundation exists** — Needs i18n framework but content is already translated

**What changes:**
- Fix all P0 security issues (RLS, auth, admin, exports)
- Extract strings to proper i18n system
- Add missing modules (map, governance tracker, contribution board, alerts)
- Harden the service worker and offline strategy
- Add proper testing infrastructure
- Scale database and add caching layer


### 1.6 Core Philosophy: "Day 1 Usable"

**MUST work at launch (Day 1):**
- [ ] Safety/Rights pocket card (printable, offline)
- [ ] RTI Generator (client-side, works offline)
- [ ] FIR Assistant (client-side, works offline)
- [ ] Resource Directory (emergency numbers, legal aid, shelters)
- [ ] Playbook (Protest→Power 10 steps)
- [ ] Anonymous needs/offers board (hardened auth)
- [ ] Group directory (browse only, no credential exposure)
- [ ] Basic alerts (admin-published, no user-generated)
- [ ] Bilingual (English + Hindi complete)
- [ ] PWA install + offline core guides

**Phase 2 (Month 2-3):**
- [ ] Live Action Map (protest/campaign locations)
- [ ] Governance Tracker (representatives, voting records)
- [ ] Demand Tracker with escalation workflow
- [ ] Contribution Board (skill matching)
- [ ] Secure group creation with proper auth
- [ ] Verified directory with freshness signals
- [ ] Push notifications (opt-in, privacy-preserving)

**Phase 3 (Month 4-6):**
- [ ] Campaign workspace (petitions with accountability)
- [ ] Organizer tools (shifts, tasks, volunteer management)
- [ ] Structured deliberation (not comment feeds)
- [ ] Partner integrations (legal aid orgs, civic bodies)
- [ ] Regional language expansion (Tamil, Bengali, Marathi, Telugu)
- [ ] SMS/IVR fallback for non-smartphone users

### 1.7 User Journey Map

```
ANONYMOUS VISITOR                    AWARE CITIZEN
─────────────────                    ─────────────
Sees protest on news          →      Visits Sahayata
Searches "rights if arrested" →      Reads pocket card
Downloads PWA                 →      Saves offline guides
                                     
         ↓                                    ↓

PROTEST PARTICIPANT                  GROUP ORGANIZER
───────────────────                  ───────────────
Uses safety guide at protest  →      Creates/joins group
Files FIR after incident      →      Coordinates volunteers
Posts need on board           →      Manages communications
Files RTI for accountability         Runs escalation campaigns

         ↓                                    ↓

SUSTAINED CIVIC LEADER               GOVERNANCE INFLUENCER
──────────────────────               ─────────────────────
Runs ongoing campaigns        →      Tracks legislation
Builds coalitions             →      Drafts policy proposals
Trains new organizers         →      Shadow budgets
Publishes demand scorecards          Wins ward/council seats
```

---


## 2. CURRENT LANDSCAPE & PRIORITY ISSUES (2026)

### 2.1 Active Protest Movements (July 2026)

#### INDIA — Priority Movements

| # | Movement | Issue | Scale | Platform Opportunity |
|---|----------|-------|-------|---------------------|
| 1 | **Cockroach Janta Party (CJP)** | Exam leaks, education reform, unemployment, govt accountability | Millions; largest youth movement vs Modi govt | Primary pilot partner — they need coordination infra NOW |
| 2 | **Sonam Wangchuk Climate/Ladakh** | Statehood, 6th Schedule, climate | National solidarity + hunger strike | Campaign tracking, demand escalation |
| 3 | **NEET/NTA Reform** | Exam paper leaks, NTA dissolution demand | 2.4M+ exam candidates affected | RTI campaigns, demand tracker |
| 4 | **Farmers' Unions (SKM)** | MSP guarantee, land acquisition | Punjab/Haryana, national support | Group coordination, legal aid matching |
| 5 | **Manipur Women's Movement** | Ethnic violence, displacement, justice | Northeast India | Safety resources, evidence documentation |
| 6 | **Anti-Bulldozer Movement** | Illegal demolitions, housing rights | UP, MP, Delhi, Rajasthan | Legal templates, FIR filing, PIL support |
| 7 | **Dalit Rights/Atrocity Response** | Caste violence, SC/ST Act enforcement | National | Rapid legal response, evidence preservation |
| 8 | **Digital Rights/Internet Shutdowns** | Surveillance, shutdowns, DPDP Act | National (IFF-led) | Offline-first tools, VPN guides, RTI on shutdowns |

#### GLOBAL — Scalable Movements

| # | Movement | Region | Issue |
|---|----------|--------|-------|
| 9 | **Serbia Student Protests** | Balkans | Anti-corruption, infrastructure accountability |
| 10 | **Iran/Woman Life Freedom** | Iran | Gender rights, regime change |
| 11 | **Kenya Gen-Z Tax Revolt** | East Africa | Economic justice, anti-corruption |
| 12 | **Bangladesh Student Movement** | South Asia | Democratic reform (post-2024 success) |
| 13 | **Nepal Gen-Z Movement** | South Asia | Anti-corruption, overthrew PM |
| 14 | **Peru Youth Protests** | Latin America | Democratic accountability |
| 15 | **Indonesia Anti-Corruption** | Southeast Asia | Judicial independence |

### 2.2 Discovery Methods for Movement Channels

**India — CJP/Student Movement (July 2026):**
- **Instagram:** @cockroachjanata.india (primary), @abhijeet_dipke (founder)
- **X/Twitter:** @BharatX_india, @cockroachisback
- **Reddit:** r/CockroachJantaParty
- **Discord:** Linked from cockroachjantaparty.org
- **Official sites:** cockroachjanata.org, cockroachjantaparty.org

**Student Unions:**
- SFI: @sfaborad (Instagram), sficec.in
- AISA: @aisacentral (Instagram/X)
- NSUI: @nsaborad (Instagram)

**Discovery Strategy for Telegram/Signal/WhatsApp:**
> ⚠️ We do not publish direct invite links to encrypted groups for security reasons. Discovery methods:
> 1. Follow official social media → links shared in stories/posts
> 2. Attend offline events → QR codes distributed in person
> 3. Contact known organizers through verified channels
> 4. Use Sahayata Groups directory → verified contact methods listed

### 2.3 Organizations Doing Critical Work

#### Legal Aid Networks
| Organization | Focus | Contact Path |
|-------------|-------|-------------|
| **HRLN** (Human Rights Law Network) | Pro-bono PIL, police brutality | hrln.org, 200+ lawyers in 26 states |
| **PUCL** | Civil liberties, fact-finding | President: Kavita Srivastava |
| **PUDR** | Democratic rights, Delhi-focused | pudr.org, published July 2026 protest reports |
| **CLPR** (Centre for Law & Policy Research) | Constitutional law | clpr.org.in, Bengaluru |
| **DSLSA** | Free legal aid (Delhi) | 1516 hotline, 24/7 |
| **NALSA** | National free legal aid | nalsa.gov.in, 15100 |

#### Digital Rights & Tech
| Organization | Focus | Contact Path |
|-------------|-------|-------------|
| **Internet Freedom Foundation (IFF)** | Shutdowns, surveillance, RTI | internetfreedom.in |
| **SFLC.in** | Digital freedom, privacy | sflc.in |
| **Access Now** | Digital security helpline | accessnow.org/help |
| **CIS** (Centre for Internet & Society) | Policy research | cis-india.org |

#### Journalist Collectives
| Organization | Focus | Contact Path |
|-------------|-------|-------------|
| **The Wire** | Independent investigative | thewire.in |
| **Newslaundry** | Media accountability | newslaundry.com |
| **Article 14** | Constitutional law reporting | article-14.com |
| **Editors Guild** | Press freedom | editorsguild.in |
| **CPJ** | Journalist safety | cpj.org |

#### Civic & Governance
| Organization | Focus | Contact Path |
|-------------|-------|-------------|
| **ADR** (Assoc. for Democratic Reforms) | Election data, candidate records | adrindia.org |
| **Praja Foundation** | Governance scorecards | praja.org |
| **Transparency International India** | Anti-corruption | transparencyindia.org |
| **Jan Sarokar** | RTI training, transparency | — |
| **CHRI** | Police/prison reform | humanrightsinitiative.org |

### 2.4 Geolocation Strategy — "Where Protests Are Happening"

**Real-Time Aggregation Sources:**
1. **ACLED** (Armed Conflict Location & Event Data) — acleddata.com — Academic-grade protest event data, API available
2. **GDELT Project** — gdeltproject.org — Real-time media monitoring, geo-tagged events
3. **Internet shutdowns:** OONI (ooni.org), IFF shutdown tracker, Access Now's #KeepItOn
4. **Social media signals:** Geo-tagged posts on X, Instagram stories with location, Reddit local subs
5. **News APIs:** NewsAPI, GDELT DOC API for India-specific protest coverage
6. **Crowd-sourced (our platform):** User-submitted event locations (with privacy controls)

**Heatmap Design:**
- Aggregate to district/city level (never precise coordinates for protests)
- Show: active campaigns, recent incidents, institutional responses
- Color-code: education, environment, rights, labor, governance
- Time-decay: fade events older than 7 days unless ongoing
- Privacy: NEVER show individual participant locations

---


## 3. GOVERNANCE & POWER ACQUISITION ROADMAP

### 3.1 From Protest to Power: Concrete Playbook

```
STREET ENERGY → INSTITUTIONAL PRESSURE → FORMAL POWER
     ↓                    ↓                     ↓
  Marches           RTI/FIR/PIL          Ward committees
  Rallies           Demand letters        Municipal councils
  Social media      CPGRAMS complaints    State assemblies
  Art/music         Media campaigns       Policy drafting
  Mutual aid        Shadow budgets        Lok Sabha
```

### 3.2 Power Acquisition Ladder

#### Level 1: Ward Committee Member (Immediate — no election needed)
- **What:** Every municipal ward must have a Ward Committee (74th Amendment)
- **How:** Attend meetings, file applications, demand inclusion
- **Power gained:** Input on local budgets, road/water/sanitation priorities
- **Sahayata tools:** Meeting script templates, attendance trackers, budget analysis

#### Level 2: Municipal Councillor (1-2 year timeline)
- **What:** Win local body elections (lowest barrier to entry)
- **How:** Build local credibility through service + organize 2,000-5,000 voters
- **Power gained:** Direct control over ward development funds (₹1-5 crore/year)
- **Sahayata tools:** Voter outreach templates, issue mapping, door-to-door scripts

#### Level 3: State Assembly (MLA) (3-5 year timeline)
- **What:** Win Vidhan Sabha seat
- **How:** Build coalition from ward/municipal base, issue-based campaigns
- **Power gained:** Legislative power, police oversight, education/health budgets
- **Sahayata tools:** Constituency mapping, voting record tracker, bill drafting

#### Level 4: Policy Drafter / Advisory Role (Parallel track)
- **What:** Join government committees, draft legislation, advise MLAs/MPs
- **How:** Build expertise through RTI data, publish policy papers, media presence
- **Power gained:** Shape policy without winning elections
- **Sahayata tools:** Policy research hub, legislative drafting templates, expert network

### 3.3 Policy Areas to Change

| Priority | Area | Specific Demands | Mechanism |
|----------|------|------------------|-----------|
| 1 | **Education Reform** | Dissolve NTA, independent exam body, leak-proof systems | PIL + Parliamentary pressure |
| 2 | **Electoral Reform** | State funding of elections, candidate disclosure, NOTA reform | Law Commission recommendations + PIL |
| 3 | **Police Accountability** | Independent complaints body, mandatory bodycams, FIR reform | State legislation + judicial orders |
| 4 | **Digital Rights** | Internet shutdown compensation, surveillance oversight, DPDP strengthening | RTI campaigns + legislative lobbying |
| 5 | **Climate Policy** | Enforceable air quality standards, green jobs, just transition | State action plans + PILs |
| 6 | **Labor Rights** | Gig worker protections, minimum wage enforcement, social security | State legislation + court cases |
| 7 | **Housing Rights** | Anti-demolition safeguards, tenant protection, affordable housing | PILs + municipal policy |
| 8 | **RTI Strengthening** | Appoint Information Commissioners, increase penalties, digital-first | CPGRAMS + parliamentary questions |

### 3.4 Legislative Pressure Tactics

**RTI Weaponization (Systematic):**
1. File RTI on specific expenditure/decision
2. If no response in 30 days → First Appeal
3. If still no response → CIC complaint (₹250/day penalty on officer)
4. Publish findings → Media coverage
5. File more RTIs on related issues → Pattern emerges
6. Compile into report → Submit to parliamentary committee

**PIL Templates (Platform-generated):**
- Education system failures (exam leaks, vacancy backlog)
- Police accountability (excessive force during protests)
- Environmental violations (air quality, industrial pollution)
- Digital rights (internet shutdowns without review)
- Housing demolitions (without due process)

**Shadow Budgeting:**
- Obtain municipal/state budgets via RTI
- Analyze allocation vs. expenditure gaps
- Publish "People's Budget Report" comparing promises vs. delivery
- Present alternative budget proposals at ward committee meetings
- Track actual spending through repeated RTIs

**Participatory Governance Tools:**
- Ward committee attendance tracker
- Council meeting question generator
- Budget proposal templates
- Public hearing (jan sunwai) organization guide
- Citizen charter enforcement toolkit

### 3.5 Rules of Engagement

#### Legal Rights During Protests
- **Right to peaceful assembly:** Article 19(1)(b) — fundamental right
- **Section 163 BNSS:** Prohibitory orders — max 2 months, challengeable in HC
- **Arrest rights:** 24hr magistrate production, right to lawyer, right to silence
- **Women:** Cannot be arrested after sunset/before sunrise (with exceptions)
- **Juveniles:** Special protections under JJ Act

#### Bail Preparedness Protocol
1. **Before protest:** Share DSLSA number (1516) with all participants
2. **Emergency contacts:** Designate 2-3 people who will NOT attend protest
3. **Lawyer on standby:** HRLN/PUCL/local legal aid on speed dial
4. **Document everything:** Names of detained, time, station, officers
5. **Bail application ready:** Template pre-filled, just add names/details
6. **Magistrate info:** Know which court has jurisdiction, office hours

#### Digital Security Protocols
| Threat | Mitigation |
|--------|-----------|
| Phone seizure | Strong PIN (6+), disable biometrics, auto-delete messages |
| Surveillance | VPN (ProtonVPN free), Tor for sensitive searches |
| Comms interception | Signal (primary), Briar (no internet needed) |
| Location tracking | Airplane mode during sensitive meetings, Faraday bags |
| Social media monitoring | Separate protest account, no real name, VPN |
| Device forensics | Full-disk encryption, remote wipe capability |
| IMSI catchers | Airplane mode, mesh messaging (Briar) |

#### Counter-Surveillance Guide
1. **Threat model first:** Who is watching? What are they looking for?
2. **Operational security:** Need-to-know basis, compartmentalized info
3. **Physical:** Vary routes, meeting locations; check for tails
4. **Digital:** Unique device for organizing, separate SIM, VPN always
5. **Communications:** Signal with disappearing messages, never SMS for sensitive
6. **Documentation:** Encrypt evidence immediately, multiple cloud backups
7. **Legal:** Know your rights, have lawyer number memorized (not just in phone)

---


## 4. GROUP ARCHITECTURE & CONTRIBUTION FRAMEWORK

### 4.1 Primary Groups vs. Satellite Groups

#### Primary Groups (Site-Owned)
- **Owned by:** Platform team / founding organizers
- **Purpose:** Core movement coordination, resource distribution, training
- **Governance:** Platform-appointed moderators with term limits
- **Moderation:** Platform team responsible, 24hr response SLA
- **Resources:** Full access to platform tools, analytics, partner network
- **Visibility:** Featured on homepage, searchable, verified badge
- **Examples:** "Sahayata Delhi Legal Aid Network", "National RTI Campaign Coordination"

#### Satellite Groups (Community-Owned)
- **Owned by:** Community organizers who register
- **Purpose:** Local chapters, issue-specific campaigns, mutual aid circles
- **Governance:** Self-governed with platform guidelines compliance
- **Moderation:** Group admins (trained), platform escalation path
- **Resources:** Basic tools, can request verification, partner referral
- **Visibility:** Searchable, community-verified, no platform endorsement
- **Examples:** "Jaipur Students for Education Reform", "Pune Anti-Pollution Coalition"

#### Permission Matrix

| Action | Primary Admin | Primary Mod | Satellite Admin | Satellite Mod | Member | Visitor |
|--------|:---:|:---:|:---:|:---:|:---:|:---:|
| Create announcements | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| Approve members | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| Access analytics | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Use platform tools | ✅ | ✅ | ✅ | ✅ | ✅ | 🔲 |
| Partner referrals | ✅ | ✅ | 🔲 (request) | ❌ | ❌ | ❌ |
| Publish alerts | ✅ | 🔲 (2-person) | ❌ | ❌ | ❌ | ❌ |
| Ban members | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Delete group | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| View member list | ✅ | ✅ | ✅ | ✅ | 🔲 (limited) | ❌ |

### 4.2 Contribution Pathways

#### In-Person Contributions
| Role | Description | Training Required | Commitment |
|------|-------------|-------------------|------------|
| **Marshal** | Crowd management, route guidance, de-escalation | Yes (2hr workshop) | Per-event |
| **Legal Observer** | Document police actions, record badge numbers | Yes (4hr training) | Per-event |
| **Medical Aid** | First aid, tear gas response, triage | Yes (certified) | Per-event |
| **Art/Props** | Banner making, poster design, installations | No | Flexible |
| **Logistics** | Water, food, transport coordination | No | Per-event |
| **Documentation** | Photo/video with metadata preservation | Yes (1hr guide) | Per-event |
| **Outreach** | Door-to-door, community meetings, recruitment | No | Weekly |

#### Remote Contributions
| Role | Description | Skills Needed | Commitment |
|------|-------------|---------------|------------|
| **Translation** | Hindi↔English, regional languages | Bilingual fluency | 2-5 hrs/week |
| **Legal Research** | Case law, precedent finding, RTI drafting | Legal knowledge | 5-10 hrs/week |
| **Social Media** | Content creation, amplification, monitoring | Digital literacy | 2-5 hrs/week |
| **Fundraising** | Campaign management, donor relations | Communication | 5-10 hrs/week |
| **Coding** | Platform development, tool building | Technical skills | Flexible |
| **Mental Health** | Peer support, crisis referral, check-ins | Training required | 3-5 hrs/week |
| **Data Analysis** | Budget analysis, RTI compilation, visualization | Analytical skills | 5-10 hrs/week |
| **Design** | Graphics, posters, social media assets | Design tools | Flexible |

#### Governance Contributions
| Role | Description | Skills Needed | Commitment |
|------|-------------|---------------|------------|
| **Policy Drafter** | Write policy proposals, amendments | Legal/policy knowledge | 10+ hrs/week |
| **RTI Campaigner** | Systematic filing, follow-up, compilation | RTI knowledge | 5-10 hrs/week |
| **Budget Analyst** | Shadow budgeting, expenditure tracking | Finance/data | 10+ hrs/week |
| **Lobbyist** | Representative meetings, committee attendance | Communication | 10+ hrs/week |
| **Researcher** | Background papers, comparative analysis | Academic skills | 10+ hrs/week |

### 4.3 Onboarding Flow

```
SIGNUP (anonymous OK for viewing)
         ↓
SKILL ASSESSMENT (2-min quiz)
  → What can you do? (checkboxes)
  → How much time? (casual/regular/core)
  → What issues? (education/climate/rights/labor/housing)
  → Where? (city/remote)
         ↓
COMMITMENT TIER SELECTION
  → 🌱 Casual (1-2 hrs/week, flexible, no obligations)
  → 🌿 Regular (5-10 hrs/week, assigned tasks, check-ins)
  → 🌳 Core (10+ hrs/week, leadership track, training access)
  → 🔥 Leader (full commitment, coordination role, accountability)
         ↓
MATCHED TO GROUPS + TASKS
  → Suggested groups based on city + issue + skill
  → Immediate tasks available (labeled by effort/impact)
  → Mentorship pairing for Core/Leader tier
         ↓
FIRST ACTION (within 24 hours)
  → Complete one task to build momentum
  → Get feedback/thanks from group
  → See impact metric update
```

---


## 5. RESOURCE LIBRARY STRUCTURE

### 5.1 Curated Guides

#### Protest Safety
- [ ] Pre-protest checklist (what to bring, what NOT to bring)
- [ ] Know Your Rights pocket card (printable, exists ✅)
- [ ] Tear gas/lathi/water cannon response (exists ✅)
- [ ] Buddy system setup guide
- [ ] Medical kit contents list
- [ ] Legal observer handbook
- [ ] De-escalation techniques
- [ ] What to do if detained (exists ✅)
- [ ] Post-incident mental health guide

#### Digital Security
- [ ] Signal setup + disappearing messages guide
- [ ] Session (Signal alternative, no phone number) setup
- [ ] Briar (mesh messaging, no internet) guide
- [ ] Tails OS (amnesic operating system) for high-risk
- [ ] VPN comparison (ProtonVPN, Mullvad, Psiphon)
- [ ] Phone hardening checklist (exists ✅)
- [ ] Secure cloud backup (ProtonDrive, Tresorit)
- [ ] Social media OpSec guide
- [ ] Device seizure response protocol
- [ ] IMSI catcher detection (limited, educational)

#### Legal Rights by Jurisdiction
- [ ] National (Constitutional rights — exists ✅)
- [ ] Delhi-specific (Section 163 orders, local procedures)
- [ ] Maharashtra (Bombay Police Act specifics)
- [ ] UP (state-specific challenges, anti-conversion law)
- [ ] Karnataka (local assembly/protest rules)
- [ ] Tamil Nadu (state-specific procedures)
- [ ] Add-per-state template for community contribution

#### Trauma-Informed Organizing
- [ ] Burnout prevention protocol
- [ ] Collective care practices
- [ ] When to step back (no guilt framework)
- [ ] Peer support training outline
- [ ] Professional referral paths (iCall, Vandrevala, NIMHANS)
- [ ] Post-violence processing guide
- [ ] Sustainable activism practices

#### De-Escalation
- [ ] With police (what to say, what not to do)
- [ ] Within protests (preventing internal conflict)
- [ ] Online (handling trolls, brigading, harassment)
- [ ] With counter-protesters
- [ ] Marshal training curriculum

### 5.2 Template Vault

#### Press & Media
- [ ] Press release template (bilingual)
- [ ] Media advisory template
- [ ] Op-ed pitch template
- [ ] Social media statement template
- [ ] Interview preparation guide
- [ ] Photo/video release consent form

#### Legal Instruments
- [ ] RTI application (auto-generated ✅ — RTI Generator)
- [ ] RTI First Appeal template
- [ ] RTI CIC complaint template
- [ ] FIR complaint (auto-generated ✅ — FIR Assistant)
- [ ] SP letter for FIR refusal (auto-generated ✅)
- [ ] Magistrate complaint (BNSS 175(3)) (auto-generated ✅)
- [ ] PIL format (High Court)
- [ ] Bail application template
- [ ] Habeas Corpus petition template
- [ ] NHRC complaint format
- [ ] CPGRAMS complaint template

#### Governance & Advocacy
- [ ] Letter to MLA/MP template
- [ ] Ward committee meeting script
- [ ] Budget analysis framework
- [ ] Policy proposal format
- [ ] Demand document template
- [ ] Petition format (with accountability framework)
- [ ] Shadow budget template
- [ ] Council meeting question list

#### Organizing
- [ ] Meeting agenda template
- [ ] Decision-making framework (consent-based)
- [ ] Volunteer sign-up form
- [ ] Event planning checklist
- [ ] Safety briefing script
- [ ] Debrief template (post-action)
- [ ] Coalition agreement template
- [ ] Funding proposal format

### 5.3 Tool Stack

#### Mapping & Geolocation
| Tool | Purpose | Cost |
|------|---------|------|
| **MapLibre GL JS** | Self-hosted map rendering (no Google dependency) | Free/open-source |
| **OpenStreetMap** | Base map data | Free |
| **ACLED API** | Protest event data | Free for research |
| **Ushahidi** | Crisis mapping (reference) | Open-source |

#### Encrypted Communications
| Tool | Purpose | Why |
|------|---------|-----|
| **Signal** | Primary secure messaging | Gold standard E2E, disappearing messages |
| **Briar** | No-internet mesh messaging | Works via Bluetooth/WiFi Direct |
| **Session** | No-phone-number messaging | Onion routing, no metadata |
| **Element/Matrix** | Group chat (self-hosted option) | Federated, E2E optional |
| **ProtonMail** | Encrypted email | Swiss jurisdiction, free tier |

#### Fundraising & Finance
| Tool | Purpose | India-compatible |
|------|---------|-----------------|
| **Razorpay** | Payment gateway | ✅ UPI, cards, net banking |
| **Milaap** | Crowdfunding | ✅ Indian platform |
| **Ketto** | Crowdfunding | ✅ Indian platform |
| **Open Collective** | Transparent finances | ✅ International |

#### Rapid Response & Alerts
| Tool | Purpose | Integration |
|------|---------|-------------|
| **Twilio** | SMS alerts (2G fallback) | API |
| **WebPush** | Browser notifications | Native |
| **Signal Bot** | Encrypted group alerts | Signal API |
| **Telegram Bot** | Mass broadcast | Bot API |
| **WhatsApp Business** | Broadcast lists | Cloud API |

#### Volunteer Management
| Tool | Purpose | Alternative |
|------|---------|-------------|
| **Custom (Sahayata)** | Skill matching, task assignment | Built-in |
| **Airtable** | Flexible databases for orgs | Paid |
| **Mobilize** | Event RSVP + volunteer shifts | Reference |

### 5.4 Media Kit

#### Poster Templates (Figma/Canva)
- Protest announcement (date/time/location — privacy-aware)
- Rights awareness (pocket card as poster)
- Demand statement (single-demand format)
- Victory announcement
- Solidarity statement
- Call-to-action (specific ask)

#### Social Media Assets
- Instagram story templates (bilingual)
- X/Twitter thread templates
- WhatsApp broadcast image (compressed for 2G)
- Profile picture frame generator
- Hashtag card generator

#### Chant/Slogan Generator
- Input: demand + target + language
- Output: 3-5 rhythmic slogans in Hindi/English
- With: phonetic guide for non-Hindi speakers
- Print: A4 sheet with 4 slogans per page

#### Translation Pipeline
- Crowdsourced translation workflow
- Quality: community review → expert sign-off for legal content
- Priority languages: Hindi, English, Tamil, Bengali, Marathi, Telugu, Kannada, Malayalam
- Format: same template, different language → consistent branding

---


## 6. TECHNICAL ARCHITECTURE & UI/UX SPEC

### 6.1 Design Philosophy

**Aesthetic:** "Civic Brutalism" — Bold, high-contrast, no-nonsense. Information density over decoration. Every pixel earns its place through utility.

**Design References:**
- [Awwwards](https://awwwards.com) — Production quality and innovation
- [50501.org](https://50501.org) — Civic engagement design
- [Organize.org](https://organize.org) — Youth mobilization UX
- [Brigade](https://brigade.com) — Civic participation platforms
- [Decidim](https://decidim.org) — Participatory democracy
- [FixMyStreet](https://fixmystreet.com) — Issue reporting UX

**Design Principles:**
1. **Information first:** Content is the interface. No empty states without action.
2. **3-tap rule:** Any critical action reachable in ≤3 taps from homepage
3. **Works on ₹2000 phones:** 320px minimum, <100KB initial load target
4. **Offline-native:** Core guides cached, clear online/offline indicators
5. **Bilingual-native:** Language toggle visible always, never modal
6. **Trust through transparency:** Show data sources, freshness, limitations
7. **No dark patterns:** No infinite scroll, no notification spam, no engagement bait

### 6.2 Core Modules

#### Module 1: Live Action Map
**Purpose:** Real-time visualization of active campaigns, protests, and civic actions across India.

```
┌──────────────────────────────────────────────┐
│  🗺️ LIVE ACTION MAP                    [≡]  │
├──────────────────────────────────────────────┤
│                                              │
│     ┌─────────────────────────────────┐     │
│     │         MapLibre Canvas          │     │
│     │    ○ Education (blue)           │     │
│     │    ○ Rights (red)               │     │
│     │    ○ Environment (green)        │     │
│     │    ○ Labor (orange)             │     │
│     │    ● = Active  ○ = Resolved     │     │
│     └─────────────────────────────────┘     │
│                                              │
│  ┌────────┐ ┌────────┐ ┌────────┐          │
│  │Filter: │ │ City ▼ │ │ Issue▼ │          │
│  └────────┘ └────────┘ └────────┘          │
│                                              │
│  ACTIVE NOW (3)                              │
│  ┌──────────────────────────────────┐       │
│  │ 🔴 Delhi: NEET Reform March      │       │
│  │    12,000+ participants           │       │
│  │    Safety: ⚠️ Sec 163 imposed    │       │
│  └──────────────────────────────────┘       │
└──────────────────────────────────────────────┘
```

**Data Sources:** ACLED API + user-submitted (moderated) + news aggregation
**Safety:** District-level only (never precise coordinates), safety metadata (section 163 status, police presence level)
**Privacy:** No user location tracking, no attendance lists

#### Module 2: Group Hub
**Purpose:** Create, discover, and manage organizing groups with role-based access.

**Features:**
- Browse by city/issue/category
- Create group with moderation queue
- Role management (admin/moderator/member)
- Task board (Kanban-style, simple)
- Announcements (push-capable)
- Member directory (private, opt-in visibility)
- Resource sharing (templates, guides)
- External link integration (Signal/Telegram/WhatsApp)

#### Module 3: Resource Wiki
**Purpose:** Community-editable, expert-moderated knowledge base.

**Architecture:**
- Markdown-based content (git-backed for version history)
- Community submissions → expert review pipeline
- Freshness indicators (last verified date, next review date)
- Source citations required for all factual claims
- Printable/downloadable versions of all guides
- Offline-cached for PWA access

#### Module 4: Governance Tracker
**Purpose:** Track bills, representatives, voting records, and institutional responses.

**Features:**
- Representative profiles (MLA/MP/Councillor)
- Bill tracker (introduced → committee → passed/rejected)
- Voting records and attendance
- Promise vs. delivery scorecards
- RTI response tracker (filed → responded → appealed)
- Demand status (submitted → acknowledged → action → resolved)
- Institution response times (public scorecard)

#### Module 5: Contribution Board
**Purpose:** Match skills to needs, track impact.

**Features:**
- Task marketplace (groups post needs, contributors claim)
- Skill tags and availability matching
- Impact tracking (tasks completed, hours contributed)
- Recognition system (badges, not gamification)
- Mentorship matching (experienced → new)
- Team formation for campaigns

#### Module 6: Alert System
**Purpose:** Rapid mobilization through multi-channel notifications.

**Channels:**
- WebPush (primary, no phone number needed)
- SMS via Twilio (2G fallback, opt-in)
- Signal bot (encrypted, for high-security groups)
- Telegram bot (mass broadcast capability)
- WhatsApp Business (India's dominant messenger)
- In-app notification center

**Alert Types:**
- 🔴 Emergency (police action, detention, medical need)
- 🟡 Action Required (RTI deadline, court hearing, meeting)
- 🔵 Information (news update, resource added, event announced)
- 🟢 Victory (demand met, policy changed, case won)

**Controls:**
- Per-category opt-in/out
- Quiet hours
- Geographic scope (my city only, my state, national)
- Frequency cap (max 3/day for non-emergency)
- Two-person approval for emergency alerts



### 6.3 Accessibility Requirements

| Requirement | Standard | Implementation |
|-------------|----------|----------------|
| Keyboard navigation | WCAG 2.1 AA | All interactive elements focusable, skip links, visible focus |
| Screen reader | WCAG 2.1 AA | Semantic HTML, ARIA labels, live regions for dynamic content |
| Color contrast | 4.5:1 minimum | Tested with axe-core, no color-only information |
| Touch targets | 44x44px minimum | Mobile-first design, spacing for thick fingers |
| Zoom/reflow | 200% zoom without horizontal scroll | Responsive layout, rem units |
| Reduced motion | `prefers-reduced-motion` | Disable animations when preference set |
| Low vision | High contrast mode | CSS custom properties, forced-colors support |
| Multilingual | Hindi + English complete | RTL-ready architecture for future Urdu |
| Offline indicators | Clear status | Visual + ARIA announcements for connection state |

### 6.4 Security Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT (Browser)                       │
│  ┌─────────────────────────────────────────────────┐    │
│  │  Public Supabase Client (anon key only)          │    │
│  │  → Read public approved posts/chapters           │    │
│  │  → RLS enforces: only public, approved content   │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
                            │
                            │ HTTPS
                            ▼
┌─────────────────────────────────────────────────────────┐
│                    SERVER (API Routes)                    │
│  ┌─────────────────────────────────────────────────┐    │
│  │  Session Management                              │    │
│  │  → HMAC-signed UUID cookies (HttpOnly, Secure)   │    │
│  │  → Constant-time signature verification          │    │
│  │  → 30-day expiry, rotation on verify             │    │
│  └─────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────┐    │
│  │  Rate Limiting                                   │    │
│  │  → Supabase RPC (atomic consume_rate_limit)      │    │
│  │  → Per-session + per-network-hash layers         │    │
│  │  → Keyed hashing (no raw IPs stored)             │    │
│  └─────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────┐    │
│  │  Service Supabase Client (service_role key)      │    │
│  │  → Server-only module (never in client bundle)   │    │
│  │  → Explicit field selection (never SELECT *)     │    │
│  │  → Scoped to validated, authorized operations    │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
                            │
                            │ Service Role
                            ▼
┌─────────────────────────────────────────────────────────┐
│                    DATABASE (Supabase/PostgreSQL)         │
│  → RLS policies per table                               │
│  → Public DTOs exclude: session_id, coordinator_key,    │
│    invite_code, moderation fields, internal notes        │
│  → Atomic RPC functions for rate limiting               │
│  → OTP hashes only (never raw codes)                    │
│  → Audit triggers on privileged actions                 │
└─────────────────────────────────────────────────────────┘
```

### 6.5 Tech Stack Recommendation (Final)

| Layer | Choice | Justification |
|-------|--------|---------------|
| **Framework** | Next.js 16 (App Router) | SSR for SEO + low-bandwidth, server components reduce JS, API routes built-in |
| **UI** | React 19 + Tailwind CSS 4 | Server components, streaming, minimal bundle; utility CSS = small payload |
| **Database** | Supabase (PostgreSQL) | Auth, DB, Realtime, Storage in one; RLS for security; free tier for MVP |
| **Maps** | MapLibre GL JS + OpenStreetMap | No Google dependency, self-hostable, open data, free |
| **Caching** | Upstash Redis (future) | Edge-compatible, serverless, rate limiting + session cache |
| **Notifications** | WebPush + Twilio SMS | No phone required for push; SMS for 2G fallback |
| **Encryption** | Signal Protocol (reference) | Platform links to Signal/Briar; no custom crypto |
| **Deployment** | Vercel + Supabase Cloud | Auto-scaling, edge network, managed Postgres |
| **CDN** | Cloudflare (future) | DDoS protection, edge caching for static guides |
| **Monitoring** | Sentry (error) + Vercel Analytics | Privacy-preserving, no session replay on sensitive pages |
| **Testing** | Vitest + Playwright | Fast unit tests + E2E for critical flows |
| **CI/CD** | GitHub Actions | PR gates: lint, typecheck, test, build, security scan |

---

## 7. IMPLEMENTATION ROADMAP

### Week 1-2: MVP Spec + Design System

| Day | Deliverable | Owner |
|-----|-------------|-------|
| 1-2 | Finalize color tokens, typography scale, component inventory | Design |
| 3-4 | Build reusable component library (Button, Card, Input, Select, Badge, Alert) | Frontend |
| 5-6 | Complete i18n extraction — move all strings to message files | Frontend |
| 7-8 | Fix all P0 security issues (RLS policies, admin auth, session handling) | Security |
| 9-10 | Set up CI pipeline (lint, typecheck, test, build gates) | DevOps |
| 11-12 | Accessibility audit + fix critical issues (focus, labels, contrast) | Frontend |
| 13-14 | Design system documentation + Storybook or equivalent | Design |

**Gate:** Clean build, zero typecheck errors, P0 security fixes merged, CI passing.

### Week 3-4: Core Map + Group Hub

| Day | Deliverable | Owner |
|-----|-------------|-------|
| 15-16 | MapLibre integration with India base map + district boundaries | Frontend |
| 17-18 | Campaign data API + moderation pipeline | Backend |
| 19-20 | Group security overhaul (hashed invite tokens, private members, role system) | Security |
| 21-22 | Group task board (simple Kanban: todo/doing/done) | Frontend |
| 23-24 | Governance Tracker MVP (representative profiles, RTI status) | Full-stack |
| 25-26 | Demand Tracker backend integration + escalation automation | Backend |
| 27-28 | Integration testing + load testing for map + groups | QA |

**Gate:** Map renders with 50+ campaigns, groups secure, governance tracker functional.

### Week 5-6: Resource Library + Alert System

| Day | Deliverable | Owner |
|-----|-------------|-------|
| 29-30 | Resource wiki architecture (markdown + metadata + review pipeline) | Backend |
| 31-32 | Freshness system (last_verified, next_review, auto-stale markers) | Backend |
| 33-34 | WebPush notification implementation (opt-in, per-category) | Full-stack |
| 35-36 | Twilio SMS integration for 2G alert fallback | Backend |
| 37-38 | Alert moderation (2-person approval for emergency, correction flow) | Backend |
| 39-40 | Contribution Board backend (task CRUD, claim system, impact tracking) | Full-stack |
| 41-42 | End-to-end testing of alert delivery across channels | QA |

**Gate:** Alerts delivered via push + SMS, resources have freshness, contribution board functional.

### Week 7-8: Governance Tracker + Contribution Board

| Day | Deliverable | Owner |
|-----|-------------|-------|
| 43-44 | Representative data pipeline (scrape sansad.in, state assemblies) | Data |
| 45-46 | Voting record tracker + attendance scoring | Backend |
| 47-48 | Demand escalation automation (30-day timer → prompt for appeal) | Backend |
| 49-50 | Skill matching algorithm (skills × availability × location) | Backend |
| 51-52 | Impact dashboard (tasks completed, outcomes achieved, hours contributed) | Frontend |
| 53-54 | Partnership API (organization onboarding, verification workflow) | Backend |
| 55-56 | Performance optimization (lazy loading, code splitting, ISR for static) | Frontend |

**Gate:** Governance data for 50+ representatives, contribution board with 100+ tasks, <100KB initial JS.

### Week 9-10: Security Audit + Beta Launch

| Day | Deliverable | Owner |
|-----|-------------|-------|
| 57-58 | Independent security audit (OWASP Top 10, authorization matrix) | Security |
| 59-60 | Penetration testing (IDOR, XSS, CSRF, session hijacking) | Security |
| 61-62 | Accessibility audit (screen reader testing, keyboard-only navigation) | QA |
| 63-64 | Load testing (10K concurrent users simulation) | DevOps |
| 65-66 | Beta onboarding for 3 pilot movements (CJP, student union, local group) | Community |
| 67-68 | Feedback collection + critical bug fixes | All |
| 69-70 | Public beta launch announcement + press kit | Marketing |

**Gate:** Security audit pass, 3 pilot groups active, <2s load time on 3G, zero critical bugs.

### Success Metrics

| Metric | Week 4 Target | Week 8 Target | Week 10 Target |
|--------|---------------|---------------|----------------|
| **DAU** | 100 (internal) | 500 (pilot) | 2,000 (beta) |
| **Group formation rate** | 5 groups/week | 20 groups/week | 50 groups/week |
| **Action conversion** | 10% visitor→action | 15% | 20% |
| **RTI filed via platform** | 10 | 50 | 200 |
| **Demand tracked** | 5 | 25 | 100 |
| **Policy wins tracked** | 0 | 1 | 3 |
| **Avg load time (3G)** | <3s | <2s | <1.5s |
| **Accessibility score** | 80/100 | 90/100 | 95/100 |
| **Uptime** | 99% | 99.5% | 99.9% |

---

## 8. CONTENT & PARTNERSHIPS

### 8.1 Essential Partnerships (20 Before Launch)

| # | Organization | Type | Why | Contact Path |
|---|-------------|------|-----|-------------|
| 1 | **HRLN** | Legal Aid | Pro-bono lawyers for platform users | hrln.org, Colin Gonsalves |
| 2 | **PUCL** | Civil Liberties | Fact-finding, rights documentation | Kavita Srivastava (President) |
| 3 | **Internet Freedom Foundation** | Digital Rights | Shutdown tracking, RTI expertise | internetfreedom.in |
| 4 | **PUDR** | Democratic Rights | Legal observer training, Delhi focused | pudr.org |
| 5 | **ADR** | Electoral Data | Candidate records, voting data API | adrindia.org |
| 6 | **Praja Foundation** | Governance | Councillor scorecards, governance data | praja.org |
| 7 | **Nyaaya.org** | Legal Literacy | Rights content, protest guides | nyaaya.org |
| 8 | **CJP (Cockroach Janta Party)** | Youth Movement | Primary pilot partner, coordination | cockroachjanata.org |
| 9 | **SFI** | Student Union | Campus organizing, volunteer base | sficec.in |
| 10 | **AISA** | Student Union | Legal observer networks, JNU/DU base | @aisacentral |
| 11 | **SKM (Samyukta Kisan Morcha)** | Farmers | Proven organizing capacity, national network | Via farm unions |
| 12 | **iCall (TISS)** | Mental Health | Peer support referrals, training | 9152987821 |
| 13 | **Vandrevala Foundation** | Mental Health | 24/7 crisis support line | 9999666555 |
| 14 | **CHRI** | Police Reform | Complaint mechanisms, accountability data | humanrightsinitiative.org |
| 15 | **Access Now** | Digital Security | Security helpline, threat training | accessnow.org/help |
| 16 | **Amnesty India** | Human Rights | Documentation, international pressure | Via local chapters |
| 17 | **SFLC.in** | Digital Freedom | Legal advice on surveillance, privacy | sflc.in |
| 18 | **National Law Schools** | Legal Education | Student volunteers for RTI, PIL drafting | NLU Delhi, NLSIU, NALSAR |
| 19 | **Transparency International India** | Anti-Corruption | Complaint assistance, RTI training | transparencyindia.org |
| 20 | **Local RWA Federations** | Community | Ward-level organizing, ground presence | City-specific |

### 8.2 Content Strategy — First 30 Days

**Daily Briefing Format (7 days/week):**
```
┌──────────────────────────────────────┐
│  📰 SAHAYATA DAILY — [Date]          │
│                                      │
│  🔴 ACTIVE NOW                       │
│  • [Campaign update — 1 sentence]    │
│  • [Campaign update — 1 sentence]    │
│                                      │
│  📋 ACTION OF THE DAY                │
│  • [One specific thing to do today]  │
│  • Time needed: [X minutes]          │
│  • Impact: [What it achieves]        │
│                                      │
│  📊 SCORECARD UPDATE                 │
│  • [Institution] response: [status]  │
│                                      │
│  ⚖️ KNOW YOUR RIGHTS                │
│  • [One right, one sentence]         │
│                                      │
│  🔗 sahayata.vercel.app              │
└──────────────────────────────────────┘
```

**Movement Spotlights (3/week):**
- Day 1: Movement history + timeline
- Day 3: "How I Organized" — first-person case study
- Day 5: Demands + progress tracker update

**Content Calendar — Week 1:**
| Day | Type | Topic |
|-----|------|-------|
| Mon | Daily + Spotlight | CJP: From meme to mass movement |
| Tue | Daily + Guide | How to file an RTI (step-by-step video) |
| Wed | Daily + Spotlight | Sonam Wangchuk: Climate as constitutional right |
| Thu | Daily + Template | Demand document template (fill-in-the-blank) |
| Fri | Daily + Spotlight | "How I Organized My First Ward Meeting" |
| Sat | Daily + Resource | Digital security checklist (printable) |
| Sun | Weekly Recap | Top 5 actions, 3 demands tracked, 1 win |

### 8.3 Moderation Framework

#### Community Guidelines (Core Principles)
1. **No doxxing** — Never share personal details of individuals without consent
2. **No incitement to violence** — Advocacy for change, not harm to persons
3. **No disinformation** — Cite sources, label unverified info, correct errors
4. **No harassment** — Critique institutions, not attack individuals
5. **No infiltration** — No posts designed to discredit the movement or entrap
6. **No commercial spam** — This is civic infrastructure, not a marketplace
7. **Protect vulnerable** — Extra care with minors, domestic violence survivors, witnesses

#### Escalation Protocol
```
Level 1: Community flag → Auto-hide if 3+ flags
Level 2: Moderator review (24hr SLA) → Decision + reason code
Level 3: Senior moderator (4hr SLA for urgent) → Override/appeal
Level 4: Legal/safety team (1hr for threats/doxxing) → Emergency action
Level 5: Law enforcement liaison (if credible threat to life)
```

#### Disinformation Response
1. **Flag** — Any user can flag with reason
2. **Quarantine** — Auto-hide pending review (not delete)
3. **Investigate** — Check sources, cross-reference
4. **Label** — "Unverified", "Disputed", "Correction needed"
5. **Correct** — Publish correction with original context
6. **Learn** — Pattern analysis, update detection rules

#### State Actor Mitigation
- Monitor for coordinated inauthentic behavior (same messages from many new accounts)
- Rate limit new accounts more aggressively
- Require proof-of-work for all submissions (prevents bot farms)
- Geographic anomaly detection (posts from locations inconsistent with claimed city)
- Content fingerprinting (detect copypasta campaigns)
- Admin alert when unusual patterns detected
- Never trust a single moderator for high-impact decisions (2-person rule)

---

## 9. FABLE-TO-NEXT-AGENT HANDOFF

### 9.1 What Is SOLVED (Ready to Ship)

| Item | Status | Notes |
|------|--------|-------|
| Homepage with 3 clear actions | ✅ Done | Help / Offer / Change — functional |
| RTI Generator | ✅ Done | Client-side, works offline, bilingual |
| FIR Assistant | ✅ Done | Client-side, works offline, bilingual |
| Safety/Rights Guide | ✅ Done | Comprehensive, printable, sourced |
| Playbook (Protest → Power) | ✅ Done | 10 steps, bilingual, actionable |
| Resources Directory | ✅ Done | Emergency numbers, legal aid, shelters, tools |
| Community Board (needs/offers) | ✅ Done | PoW anti-spam, rate limited, moderated |
| Groups (browse/create) | ✅ Done | Moderated, bilingual, city-filtered |
| Live Action Map | ✅ Done | 8 campaigns, district-level, safety metadata |
| Governance Tracker | ✅ Done | Representatives, demands, scorecards |
| Contribution Board | ✅ Done | 8 tasks, skill matching, effort filters |
| Demand Tracker (full) | ✅ Done | Backend API + frontend, create/browse/filter |
| PWA + offline guides | ✅ Done | Service worker caches core pages |
| Bilingual (EN/HI) | ✅ Done | Complete for all pages |
| Security headers | ✅ Done | CSP, X-Frame, referrer, permissions policy |
| Mirror failover disabled | ✅ Done | Removed unverified mirror trust |
| Strategy document | ✅ Done | Comprehensive 8-section plan |

### 9.2 What Needs DESIGN Work

| Item | Priority | Scope | Skills Needed |
|------|----------|-------|---------------|
| MapLibre integration (real map tiles) | P1 | Replace CSS map with MapLibre GL | Frontend + GIS |
| Design system tokens (Figma) | P1 | Color, type, spacing, component specs | Design |
| Mobile navigation overhaul | P1 | Bottom tab bar for mobile | UX Design |
| Onboarding flow wireframes | P2 | Skill assessment + group matching | UX Design |
| Campaign workspace UI | P2 | Petition + evidence + escalation | UX Design |
| Print-optimized layouts | P2 | Rights card, templates as PDF | Design |

### 9.3 What Needs CODING Work

| Item | Priority | Scope | Skills Needed |
|------|----------|-------|---------------|
| Fix remaining P0 security (RLS policies in Supabase) | P0 | Database migration + RLS tests | Backend + DB |
| Replace admin shared secret with role-based auth | P0 | New auth flow + admin UI | Full-stack |
| Proper i18n extraction (next-intl or similar) | P1 | Extract 2000+ strings to message files | Frontend |
| WebPush notifications | P1 | Service worker + subscription + delivery | Full-stack |
| Twilio SMS integration | P1 | API route + opt-in + delivery tracking | Backend |
| Real-time campaign data API | P1 | ACLED integration + moderation queue | Backend |
| Representative data pipeline | P1 | Scrape sansad.in + state assemblies | Data engineering |
| Demand escalation automation | P2 | Timer + prompt + status machine | Backend |
| Contribution claim/complete flow | P2 | Task lifecycle + notifications | Full-stack |
| Testing infrastructure (Vitest + Playwright) | P1 | Unit + integration + E2E tests | QA |
| Performance budget enforcement | P2 | Bundle analysis + lazy loading | Frontend |
| Regional language support (Tamil, Bengali, Marathi) | P2 | i18n + translation pipeline | Frontend + Content |

### 9.4 What Needs CONTENT Work

| Item | Priority | Scope | Skills Needed |
|------|----------|-------|---------------|
| Expert legal review of all rights content | P0 | Lawyer sign-off on safety guide | Legal |
| Verify all helpline numbers are current | P0 | Call each number, record verification | Research |
| Remove or qualify any unsupported "verified" claims | P0 | Audit all badges and trust language | Content |
| Freshness dates on all resource entries | P1 | Last-verified + next-review dates | Research |
| State-specific legal guides (Maharashtra, UP, Karnataka) | P1 | Jurisdiction-specific rights | Legal + Content |
| Translated content review (Hindi accuracy) | P1 | Native speaker legal review | Translation |
| Partnership outreach materials | P1 | One-pager, demo deck, onboarding guide | Marketing |
| Daily briefing content for first 30 days | P2 | Writing + research + design | Content |
| Case studies ("How I Organized") | P2 | Interviews + writing | Journalism |

### 9.5 What Needs OPERATIONAL Work

| Item | Priority | Scope | Who |
|------|----------|-------|-----|
| Recruit 3-5 moderators (trained, diverse) | P0 | Before any public launch | Community |
| Establish legal counsel relationship | P0 | Indian digital rights lawyer | Legal |
| Pilot with CJP/student movement | P1 | Beta testing with real organizers | Community |
| Incident response runbook | P1 | What to do when things go wrong | Security + Ops |
| DPDP compliance review | P1 | Data protection assessment | Legal + Engineering |
| Moderation training program | P1 | 4-hour training for volunteer mods | Community |
| Backup and recovery testing | P1 | Quarterly restore drills | DevOps |
| Transparency reporting setup | P2 | Quarterly public reports | Community + Legal |

---

## CONCLUSION

**Sahayata is 70% of the way to a usable civic platform.**

The existing codebase has excellent foundations: modern stack, bilingual content, offline-capable tools (RTI, FIR, rights guide), and thoughtful security design. The new modules (map, governance, contribution, demands) fill the major feature gaps.

**What makes this different from other civic tech:**
1. **Day 1 usable** — RTI generator and rights guide work RIGHT NOW, offline, on any phone
2. **Institutional pressure, not just awareness** — Every tool leads to a legal instrument
3. **Designed for hostile surveillance** — No phone number required, minimal data, offline-first
4. **Works on ₹2000 phones** — <100KB target, 2G fallback, text-first design
5. **India-first, globally scalable** — Hindi/English now, architecture supports any language

**The critical path to launch:** Fix P0 security → Expert content review → Recruit moderators → Pilot with CJP → Public beta.

**Build trust before growth. Build accountable outcomes before engagement.**

---

*Document version: 1.0 | Last updated: July 23, 2026 | Next review: August 6, 2026*
