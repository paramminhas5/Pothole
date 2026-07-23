# SAHAYATA OS — EXECUTION PLAN
## From PRD to Production: Concrete Work Packages

**Date:** 23 July 2026  
**Based on:** `SAHAYATA_OS_STRATEGIC_PRD.md` (this session)  
**Maps to:** `WORLD_CLASS_CIVIC_PLATFORM_IMPLEMENTATION_PLAN.md` (P0-P3 backlog)  
**Current state:** Next.js 16 + React 19 + Supabase + Tailwind 4 prototype with ~30 routes, 18 components, 18 DB tables

---

## CURRENT STATE INVENTORY (What Exists Today)

### Database (18 tables)
- `chapters` — org/chapter directory (pending/approved/rejected)
- `posts` — need/offer mutual aid board
- `contact_responses` — responses to posts
- `reports` — content reports
- `rate_limits` — rate limiting records
- `moderation_log` — audit trail
- `vouches` — trust/vouching system
- `groups` — buddy/protest groups
- `group_members` — group membership with roles
- `alerts` — city-level alerts
- `otp_codes` — email OTP (broken flow)
- `verified_sessions` — session management
- `pow_challenges` — proof-of-work anti-spam
- `identities` — passphrase-based identity
- `community_resources` — verified support directory
- `demands` — accountability demands (proto-Ledger)
- `situation_updates` — live situation brief
- `task_claims` — contribution tracking

### Frontend (Key Pages)
- `/` — Homepage with situation brief + action chain
- `/protest-mode` — Street safety (exists, needs upgrade)
- `/rti` — RTI generator (exists, no tracking)
- `/fir` — FIR assistant (exists, no escalation)
- `/buddy` — Buddy system (client-only, good)
- `/board` — Community board (need/offer posts)
- `/demands` — Demands tracker (proto-Ledger)
- `/safety` — Safety guides
- `/contribute` — Contribution page
- `/admin` — Admin panel (shared secret auth)
- `/communication` — Comms guide
- `/developers` — Developer docs
- `/alerts` — Alerts (non-operational)
- `/act` — Action page
- `/city/delhi` — City-specific page

### Lib Layer
- `supabase.ts` / `supabase-server.ts` — DB clients (security issues)
- `session.ts` — Session management (leaky)
- `admin-auth.ts` — Admin auth (shared secret)
- `crypto.ts` / `server-crypto.ts` — Crypto utils
- `validation.ts` — Input validation
- `rate-limit.ts` — Rate limiting (RLS-blocked)
- `moderation.ts` — Moderation helpers
- `email.ts` — Email via Resend
- `passphrase.ts` — Passphrase identity
- `proof-of-work.ts` / `pow-solver.ts` — PoW anti-spam
- `realtime.ts` — Supabase realtime (not integrated)

### Design System
- CSS custom properties in `globals.css` (~700 lines)
- Neobrutalist: brutal-card, brutal-btn, brutal-input, brutal-badge, brutal-stat
- Dark mode via `prefers-color-scheme`
- Print styles, reduced-motion, accessibility basics
- No component library (all inline in page files)

### i18n
- `src/i18n/` with en/hi translation files
- Cookie-based locale switching
- Inline bilingual approach in some components

---


## PHASE 0 — FOUNDATION (Weeks 1–4)
### Goal: Make it safe to exist + establish the design system

Phase 0 has two parallel tracks: **Security** (non-negotiable gates from P0-01→P0-15) and **Design** (token system + component library). They don't block each other because security touches API/RLS/lib and design touches components/CSS.

---

### TRACK A: SECURITY & TRUST FOUNDATIONS

#### Work Package 0A-1: Claim Freeze & Seed Cleanup
**Maps to:** P0-01, P0-02  
**Effort:** 2–3 days  
**Files touched:** Homepage, all pages with product claims, seed data

| Task | Detail |
|------|--------|
| Audit all public claims | Search for: verified, encrypted, anonymous, realtime, push, offline, mirror, safe, secure |
| Add prototype banner (exists) | Already have `.prototype-banner` — ensure it's prominent and honest |
| Disable non-operational flows | Groups, alerts, push notifications, mirror failover |
| Remove fictional seed data | Replace with clearly-marked `Example Organization — Not Real` fixtures |
| Add feature flags | Simple env-based flags for incomplete features |
| Gate production deployment | CI check preventing demo fixtures in production |

**Exit:** No public claim without implementation backing it.

---

#### Work Package 0A-2: Authorization Rebuild (RLS + DTOs)
**Maps to:** P0-03, P0-04  
**Effort:** 5–7 days  
**Files touched:** All `/api/*` routes, `supabase.ts`, `supabase-server.ts`, SETUP.sql, new migrations

| Task | Detail |
|------|--------|
| Create public DTO types | `src/types/dto.ts` — never expose full DB rows |
| Split Supabase clients | Public client (anon key, read-only) vs Service client (writes, admin) |
| Rewrite RLS policies | Remove `USING (true)` on posts; scope reads to approved+unexpired |
| Hide sensitive columns | `session_id`, `coordinator_key`, `invite_code` never in public responses |
| Column-level projections | Every `.select()` call lists explicit columns, never `*` |
| Add DTO transformation layer | `src/lib/dto.ts` — maps DB rows to safe public shapes |
| Test: attempt to read private data via direct Supabase | Must fail |

**Exit:** No API route exposes session_id, coordinator_key, or private data.

---

#### Work Package 0A-3: Identity & Capability System
**Maps to:** P0-05, P0-06  
**Effort:** 5–7 days  
**Files touched:** `session.ts`, `admin-auth.ts`, `passphrase.ts`, auth API routes, OTP flow

| Task | Detail |
|------|--------|
| Fix OTP flow | Issue → persist → verify → consume (currently broken) |
| Replace session_id ownership | Capability tokens (signed, scoped, time-limited) |
| Replace admin shared secret | Role-based admin with proper identity binding |
| Implement 2-layer identity | Street: no identity needed. Power: passphrase OR OTP-verified |
| Session security | HttpOnly cookies, SameSite, Secure flag, rotation |
| PoW hardening | Make non-optional, non-replayable |

**Exit:** Working auth flow; no shared secrets; capability-based ownership.

---

#### Work Package 0A-4: Hardening & Headers
**Maps to:** P0-07, P0-08, P0-09  
**Effort:** 3–4 days  
**Files touched:** `next.config.ts`, middleware, output templates, email templates

| Task | Detail |
|------|--------|
| Content Security Policy | Strict CSP in next.config.ts headers |
| Security headers | X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy |
| Input sanitization | Context-aware escaping in HTML export and email templates |
| SQL injection review | Parameterized queries everywhere (Supabase handles this, verify) |
| Rate limit fix | Fix RLS blocking rate_limit reads; make atomic |
| Report throttling | Rate-limit reports; atomic increment for reported_count |

**Exit:** Security headers pass Mozilla Observatory; no injection vectors.

---

#### Work Package 0A-5: Data Lifecycle & Moderation Ops
**Maps to:** P0-10, P0-11, P0-12  
**Effort:** 4–5 days  
**Files touched:** New scheduled jobs, moderation API, content review system

| Task | Detail |
|------|--------|
| Retention jobs | Scheduled deletion: expired posts, OTPs, rate limits, stale sessions |
| User deletion/erasure | Right to erasure workflow |
| Moderation queue | Report queue with reason codes, SLA tracking |
| Appeals workflow | Users can appeal moderation decisions |
| Content sourcing | Every legal/safety claim gets: source, jurisdiction, review date, owner |
| Review calendar | Scheduled content freshness reviews |

**Exit:** Retention jobs running; moderation operational; all legal claims sourced.

---


### TRACK B: DESIGN SYSTEM (runs in parallel with Track A)

#### Work Package 0B-1: Design Tokens & Typography
**Effort:** 2–3 days  
**Files touched:** `globals.css`, new `src/styles/tokens.css`, `layout.tsx`

| Task | Detail |
|------|--------|
| Token audit | Extract all hardcoded values from globals.css into proper token hierarchy |
| Color discipline | Collapse to strict system: ink, paper, saffron(action), purple(verified), red(urgency-only) |
| Demote secondary colors | Lime/yellow/sky to data-viz-only; remove from UI chrome |
| Typography stack | Add Space Grotesk (display), Noto Sans Devanagari (Hindi parity), IBM Plex Mono (evidence/numbers) |
| Type scale | Define heading-display through body with Hindi optical matching |
| Dark mode upgrade | True black (#000) for OLED; rebrand as "Protest Mode / Night Mode" |
| 8pt grid | Formalize spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96 |

**Deliverable:** `src/styles/tokens.css` with all design decisions as custom properties.

---

#### Work Package 0B-2: Component Library v1
**Effort:** 5–7 days  
**Files touched:** New `src/components/ui/` directory

Build ~25 components as proper React components replacing inline brutal-* classes:

| Component | Purpose | Signature element |
|-----------|---------|-------------------|
| `Button` | All actions | Variants: primary/dark/danger/success/ghost, sizes: sm/md/lg |
| `Card` | Content containers | Flat/shadow/urgent variants |
| `Badge` / `Stamp` | Status indicators | "Evidence Brutalism" ink-stamp aesthetic |
| `DeadlineClock` | RTI/demand countdown | **Brand signature** — chunky mono counter + progress bar |
| `LadderStep` | Escalation timeline | Vertical with current-rung burning saffron |
| `ShareCard` | WhatsApp-optimized export | 1080×1350 / 1080×1920 templates |
| `BigRed` | SOS/detention | Full-bleed, max-type, ≥64px touch targets |
| `LedgerRow` | Accountability table row | Demand → Institution → Status → Days |
| `FormField` | Inputs with labels/errors | Built-in validation display |
| `LangSwitch` | Language toggle | Prominent, not hidden |
| `Input` / `Select` / `Textarea` | Form primitives | Token-driven, accessible |
| `Dialog` | Modal overlays | Focus-trapped, keyboard-accessible |
| `LoadingState` / `EmptyState` / `ErrorState` | Feedback patterns | Consistent across app |
| `LiveIndicator` | Realtime dot | Pulse animation |
| `FilterPanel` | Search/filter UI | Responsive grid |
| `StepsList` | Numbered instructions | Checklist rhythm |
| `SafetyStrip` | Warning banners | Yellow/red variants |
| `StatBlock` | Counter display | Mono font, large numbers |
| `Timeline` | Event history | Chronological with sources |
| `Tooltip` | Info on hover/focus | For verification "what was checked" |
| `Toast` | Transient notifications | Auto-dismiss, accessible |
| `SkipLink` | Accessibility | Already exists, formalize |
| `PageShell` | Layout wrapper | Max-width, padding |
| `NavLink` | Navigation items | Active state, responsive |

**Deliverable:** `/src/components/ui/index.ts` barrel export; each component self-contained with props interface.

---

#### Work Package 0B-3: Share-Card Engine
**Effort:** 3–4 days  
**Files touched:** New `src/lib/share-card.ts`, templates

| Task | Detail |
|------|--------|
| Template system | Branded card at 1080×1350 and 1080×1920 |
| Content slots | Bold stat, stamp, QR/short URL, campaign name |
| Generation | Canvas API or SVG → PNG (client-side, no server needed) |
| WhatsApp optimization | Image + caption + URL format |
| RTI silence card | "Day 47. [Office] has not answered. Penalty: ₹X" |
| Demand card | Target + deadline + days elapsed |
| Campaign card | Issue + demand + progress |

**Deliverable:** `generateShareCard(type, data)` → downloadable/shareable image.

---

### Phase 0 EXIT CRITERIA
- [ ] Security review passes (no P0-class vulnerabilities)
- [ ] No unsourced legal claims live
- [ ] Retention/deletion jobs running
- [ ] Component gallery covers 80% of UI needs
- [ ] Design tokens fully replace hardcoded values
- [ ] Hindi typography matches English optical quality
- [ ] Share-card engine produces correct images

---


## PHASE 1 — THE WEDGE (Weeks 4–8)
### Goal: Street layer world-class, offline, EN/HI parity

---

#### Work Package 1-1: Protest Mode 2.0
**Maps to:** PRD M1  
**Effort:** 5–7 days  
**Builds on:** Existing `/protest-mode` page  
**Files touched:** Rewrite `src/app/protest-mode/`, new offline assets

| Feature | Implementation |
|---------|----------------|
| Tonight checklist | Structured checklist → generates saveable image via share-card engine |
| Rights cards | 6–8 one-screen cards, EN+HI, big type, screenshot-optimized |
| Buddy timer v2 | Retain client-only design; add "safety word" check-ins |
| SOS template | Pre-written SMS opened in user's own SMS app (no server) |
| Detention flow | Big Red component → 3 sentences + rights card + SOS fire |
| Aftermath guide | 24h post-protest: medical, legal-aid links, evidence preservation |
| Full offline | Service worker caches all protest-mode assets; works with no network |
| Zero analytics | No tracking, no API calls in street layer — auditably so |
| PWA install | Prompt for add-to-homescreen on protest-mode |

**Technical constraints:**
- Entire module <150KB critical path
- Works on Android Go + 2G
- No server communication whatsoever
- All content in client bundle or SW cache

**Exit:** Real organizer pastes link into 500-person Telegram group → works.

---

#### Work Package 1-2: Legal Arsenal Upgrade
**Maps to:** PRD M2  
**Effort:** 7–10 days  
**Builds on:** Existing `/rti` and `/fir` pages  
**Files touched:** Rewrite RTI/FIR pages, new grievance router, new tracking system

| Feature | Implementation |
|---------|----------------|
| RTI tracker | Statutory clock as DeadlineClock component; visual countdown |
| Day 31 → First Appeal | One-tap generation of appeal document |
| Appeal expiry → IC complaint | Next escalation auto-generated |
| RTI silence share-card | "Day X. No answer. Penalty: ₹Y." — shareable image |
| FIR refusal fork | Section 173 BNSS route (SP + Magistrate) with explainers |
| Grievance router | 4-question flow → routes to correct instrument |
| Save locally (default) | Anonymous, no account needed |
| Attach to campaign (opt-in) | Power layer explicit consent fork |

**New DB requirements:**
```sql
CREATE TABLE IF NOT EXISTS rti_filings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- anonymous or identity-linked
  identity_id UUID REFERENCES identities(id),
  session_token TEXT, -- capability token, not session_id
  -- filing details
  authority_name TEXT NOT NULL,
  subject TEXT NOT NULL,
  filed_date DATE NOT NULL,
  -- tracking
  status TEXT NOT NULL DEFAULT 'filed' 
    CHECK (status IN ('filed','awaiting','first_appeal','ic_complaint','responded','penalty')),
  deadline_date DATE NOT NULL, -- filed_date + 30 days
  response_received BOOLEAN DEFAULT FALSE,
  response_date DATE,
  -- escalation
  appeal_filed_date DATE,
  ic_complaint_date DATE,
  -- optional campaign link
  campaign_id UUID, -- FK added in Phase 2
  -- lifecycle
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Exit:** RTI generate→track→escalate funnel measurable; grievance router tested with 10 real scenarios.

---

#### Work Package 1-3: i18n Framework & Hindi Parity
**Maps to:** NF-6 from PRD  
**Effort:** 4–5 days  
**Files touched:** Layout, all pages, new `next-intl` setup

| Task | Detail |
|------|--------|
| Install next-intl | Replace cookie-based locale with proper routing |
| Extract all strings | From inline JSX to message files |
| EN/HI full parity | Every label, error, consent, safety text in both |
| RTL-ready architecture | Even though Hindi is LTR, structure supports future RTL |
| Content review | Hindi translations reviewed for accuracy (not machine-only) |
| Street layer priority | Protest mode + rights cards + RTI/FIR get Hindi first |

**Exit:** Complete user journey works in Hindi with no English fallbacks visible.

---

#### Work Package 1-4: Page Migration to Component Library
**Effort:** 5–7 days (ongoing)  
**Files touched:** All existing page client components

| Task | Detail |
|------|--------|
| Migrate homepage | Replace inline styles with ui components |
| Migrate protest-mode | Already rebuilt with components in 1-1 |
| Migrate RTI/FIR | Already rebuilt in 1-2 |
| Migrate board | Use Card, Badge, FilterPanel, FormField |
| Migrate demands | Use LedgerRow, DeadlineClock, Badge |
| Migrate buddy | Use BigRed, StepsList components |
| Migrate safety pages | Use Card, StepsList, SafetyStrip |
| Delete inline styles | Remove all per-component CSS; only tokens remain |

**Exit:** No inline styles in JSX; all UI through component library.

---

### Phase 1 EXIT CRITERIA
- [ ] Protest Mode fully offline, tested on Android Go
- [ ] RTI generate→track→escalate flow complete
- [ ] Grievance router correctly routes 10 test scenarios
- [ ] EN/HI parity on all street-layer pages
- [ ] Share-card generation for RTI silence and rights cards
- [ ] Soft-launched to 3–5 partner org group chats
- [ ] All pages on component library; zero inline styles

---


## PHASE 2 — THE LOOP (Weeks 8–14)
### Goal: Campaign HQ + Accountability Ledger + the retention loop

---

#### Work Package 2-1: Campaign Object & Database
**Maps to:** PRD M3  
**Effort:** 7–10 days  
**Files touched:** New migrations, new `/campaign/` routes, new API routes

**New DB schema (core):**
```sql
CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- ownership
  creator_identity_id UUID NOT NULL REFERENCES identities(id),
  chapter_id UUID REFERENCES chapters(id), -- optional chapter affiliation
  -- content
  title TEXT NOT NULL CHECK (char_length(title) BETWEEN 5 AND 200),
  issue_statement TEXT NOT NULL,
  city TEXT NOT NULL,
  category TEXT NOT NULL,
  -- accountability target
  target_institution TEXT NOT NULL, -- office/body, never private individual
  target_jurisdiction TEXT DEFAULT '',
  -- demands
  primary_demand TEXT NOT NULL,
  deadline DATE NOT NULL,
  -- status lifecycle
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft','live','escalating','concluded_won','concluded_partial',
                      'concluded_refused','concluded_abandoned')),
  -- evidence & escalation
  evidence_summary TEXT DEFAULT '',
  escalation_plan TEXT DEFAULT '', -- JSON or markdown
  -- stats (incremented by triggers)
  supporter_count INTEGER DEFAULT 0,
  filing_count INTEGER DEFAULT 0,
  -- lifecycle
  published_at TIMESTAMPTZ,
  concluded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS campaign_evidence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('document','photo','filing','response','media')),
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  file_url TEXT, -- Supabase Storage
  source_url TEXT,
  provenance TEXT DEFAULT '', -- who provided, when, how verified
  uploaded_by UUID REFERENCES identities(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS campaign_team (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  identity_id UUID NOT NULL REFERENCES identities(id),
  role TEXT NOT NULL CHECK (role IN ('lead','legal','comms','field','welfare','volunteer')),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(campaign_id, identity_id)
);

CREATE TABLE IF NOT EXISTS campaign_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  assigned_to UUID REFERENCES identities(id),
  status TEXT DEFAULT 'open' CHECK (status IN ('open','claimed','done','cancelled')),
  due_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Link RTI filings to campaigns
ALTER TABLE rti_filings ADD COLUMN IF NOT EXISTS campaign_id UUID REFERENCES campaigns(id);
```

---

#### Work Package 2-2: Campaign UI & Templates
**Effort:** 7–10 days  
**Files touched:** New `/campaign/[id]/` pages, creation wizard, template system

| Feature | Implementation |
|---------|----------------|
| Campaign creation wizard | Step-by-step: issue → target → demand → deadline → evidence → team |
| 10 campaign templates | Bad roads, water, garbage, streetlights, fee hikes, hostel, police inaction, pollution, illegal construction, ration denial |
| Public campaign page | Auto-generated at `/campaign/[id]` — shareable, citable |
| Team management | Roles, task board, due dates |
| Evidence locker | Upload with provenance metadata and consent |
| Escalation ladder | Visual timeline (LadderStep component) |
| Status transitions | Draft→Live→Escalating→Concluded (honest states) |
| Campaign share-card | Issue + demand + deadline + days elapsed |
| "Start a campaign" fork | Appears after every RTI/FIR generation (consent screen) |

**Time-to-live-campaign target:** Under 20 minutes from template selection.

---

#### Work Package 2-3: Accountability Ledger v1
**Maps to:** PRD M4  
**Effort:** 5–7 days  
**Files touched:** Rewrite `/demands/` as Ledger, new public pages

| Feature | Implementation |
|---------|----------------|
| Ledger table | Demand → Institution → Deadline → Days elapsed → Response status → Sources |
| Silence counter | Running timer displayed prominently (DeadlineClock) |
| City/institution views | Filter by city, filter by institution |
| Sourcing requirement | Every row links a filed document; no unsourced entries |
| Right-of-reply workflow | Institutions can respond; response posted verbatim, annotation separated |
| Correction workflow | Factual corrections via moderation |
| Public page | No login needed to read; journalists' bookmark |
| SEO optimization | Structured data, proper meta tags, city-based URLs |
| Print-friendly | Dense, sortable table; "proudly boring, endlessly citable" |

**Builds on:** Existing `demands` table, but adds sourcing requirement and campaign linkage.

---

#### Work Package 2-4: Skill Exchange (Board Replacement)
**Maps to:** PRD M7  
**Effort:** 3–4 days  
**Files touched:** Rewrite `/board/` as Skill Exchange

| Change | Detail |
|--------|--------|
| Anchor to campaigns | Every ask/offer must link to a campaign |
| Typed skills | lawyer, designer, translator, photographer, field volunteer, etc. |
| Privacy-preserving relay | No raw contact dumps; mediated first-contact |
| Campaign-specific asks | "Need a lawyer to review this appeal" |
| Retire generic posts | No more unanchored need/offer that invites spam |
| Verified allies | Verification for professionals (what was checked, by whom) |

---

#### Work Package 2-5: Day-31 Return Loop (Retention)
**Effort:** 2–3 days  
**Files touched:** Notification system, email templates, in-app alerts

| Feature | Implementation |
|---------|----------------|
| Deadline approaching notification | Email/in-app at day 25, 28, 30 |
| Deadline passed notification | "Your RTI deadline passed. Generate the appeal." |
| One-screen, two-buttons | Appeal generation + silence share-card |
| Campaign status change alerts | When evidence added, response received |
| Opt-in only | No spam; user controls notification frequency |

**This is the retention loop's heartbeat.** The moment that brings people back.

---

### Phase 2 EXIT CRITERIA
- [ ] Campaign creation from template in <20 minutes
- [ ] 5–10 real seeded campaigns running (your org as host node)
- [ ] Accountability Ledger live with real rows (not fixtures)
- [ ] First institutional responses logged
- [ ] First "Day-31 return" retention data collected
- [ ] Skill Exchange replaces generic board
- [ ] Every RTI/FIR offers "attach to campaign" fork

---


## PHASE 3 — THE MOAT (Weeks 14–22)
### Goal: Power School + Chapter OS + Civic Profiles

---

#### Work Package 3-1: Power School
**Maps to:** PRD M5  
**Effort:** 10–14 days  
**Files touched:** New `/school/` routes, curriculum content, verification system

**DB additions:**
```sql
CREATE TABLE IF NOT EXISTS school_tracks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  title_hi TEXT NOT NULL,
  description TEXT NOT NULL,
  description_hi TEXT NOT NULL,
  lesson_count INTEGER NOT NULL DEFAULT 0,
  field_assignment_count INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS school_lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  track_id UUID NOT NULL REFERENCES school_tracks(id),
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  title_hi TEXT NOT NULL,
  content_md TEXT NOT NULL, -- markdown, EN
  content_md_hi TEXT NOT NULL, -- markdown, HI
  sort_order INTEGER DEFAULT 0,
  field_assignment JSONB, -- {description, verification_method, proof_type}
  UNIQUE(track_id, slug)
);

CREATE TABLE IF NOT EXISTS school_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identity_id UUID NOT NULL REFERENCES identities(id),
  track_id UUID NOT NULL REFERENCES school_tracks(id),
  cohort_id UUID, -- FK to cohorts table
  status TEXT DEFAULT 'active' CHECK (status IN ('active','completed','dropped')),
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  UNIQUE(identity_id, track_id)
);

CREATE TABLE IF NOT EXISTS school_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identity_id UUID NOT NULL REFERENCES identities(id),
  lesson_id UUID NOT NULL REFERENCES school_lessons(id),
  -- field assignment proof
  assignment_submitted BOOLEAN DEFAULT FALSE,
  assignment_proof_url TEXT, -- evidence of completion
  assignment_verified BOOLEAN DEFAULT FALSE,
  verified_by UUID REFERENCES identities(id),
  verified_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(identity_id, lesson_id)
);

CREATE TABLE IF NOT EXISTS school_cohorts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  track_id UUID NOT NULL REFERENCES school_tracks(id),
  chapter_id UUID REFERENCES chapters(id), -- city chapter running it
  facilitator_id UUID REFERENCES identities(id),
  name TEXT NOT NULL,
  start_date DATE NOT NULL,
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming','active','completed')),
  max_participants INTEGER DEFAULT 30,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Initial tracks (4):**
1. **How Indian Power Works** — Municipality→State→Union, who controls what money
2. **Your First Election** — Student union, ward, panchayat eligibility/paperwork/budget
3. **Running a Campaign Team** — Roles, tasks, communication, escalation
4. **RTI Mastery** — Beyond the basics: appeals, IC complaints, penalties, media

**Format:** Short text-first lessons (low-bandwidth), EN/HI parity, each ending in a field assignment tied to real actions.

---

#### Work Package 3-2: Civic Profiles
**Effort:** 5–7 days  
**Files touched:** New `/profile/[id]` routes, privacy controls

| Feature | Implementation |
|---------|----------------|
| Public opt-in page | "Filed 12 RTIs (3 answered, 1 penalty ordered) · Led 2 campaigns (1 won)" |
| Verification levels | Explicit: "what was checked, by whom, how" |
| Track completions | With verified field assignments shown |
| Campaign history | Campaigns led/contributed to, with outcomes |
| Privacy controls | User controls what's visible; nothing auto-public |
| Portable | Can be linked from anywhere (party, newsroom, NGO application) |
| No social features | No followers, no likes, no public endorsements |

**This is the moat.** No messenger, petition site, or social network produces a verifiable civic track record.

---

#### Work Package 3-3: Chapter OS (Federation)
**Maps to:** PRD M6  
**Effort:** 7–10 days  
**Builds on:** Existing `chapters` table  
**Files touched:** Rewrite chapter pages, new onboarding flow, coalition mechanics

| Feature | Implementation |
|---------|----------------|
| Chapter home | Campaigns, trainings, member count (not list), join flow |
| Onboarding | In-person/messenger handshake, NOT public member list |
| Membership privacy | Graphs never public or server-plaintext where avoidable |
| Chapter moderators | Delegated moderation with audit trail |
| Inter-chapter coalition | Multiple chapters co-sign a demand on the Ledger |
| Shared resource pool | Cross-chapter skill exchange |
| Partner org identity | Chapters maintain their own branding/identity |
| Chapter metrics | Campaign outcomes, training completions, verified members |

---

#### Work Package 3-4: Cohort System
**Effort:** 3–4 days  
**Files touched:** Power School additions, notification system

| Feature | Implementation |
|---------|----------------|
| Monthly cohort creation | Chapter creates a cohort for a track |
| Facilitator assignment | One per cohort, from chapter leadership |
| Participant enrollment | Capped at 30 per cohort |
| Progress tracking | Facilitator sees cohort progress dashboard |
| Completion ceremony | Civic profile updates on track completion |
| Recruitment engine | "Next cohort starts [date]" — chapter growth mechanism |

---

### Phase 3 EXIT CRITERIA
- [ ] 100 aspirants through Track 1
- [ ] First coalition campaign (multiple chapters co-signing)
- [ ] First civic profile cited externally
- [ ] 3–5 partner movements onboarded as chapters
- [ ] First cohort run completed with facilitator
- [ ] Verification ops running without bottleneck

---


## DEPENDENCY GRAPH

```
Phase 0A (Security) ──────────────────────────── GATE ──→ Phase 1
Phase 0B (Design)  ──────────────────────────────────────→ Phase 1
                                                             │
Phase 1 (Wedge: Protest + Legal + i18n) ──── GATE ──→ Phase 2
                                                             │
Phase 2 (Loop: Campaign + Ledger + Retention) ── GATE ──→ Phase 3
                                                             │
Phase 3 (Moat: School + Profiles + Federation) ──→ PUBLIC LAUNCH
```

**Parallelism opportunities:**
- 0A and 0B run simultaneously (different file domains)
- Within Phase 1: Protest Mode and Legal Arsenal can parallel
- Within Phase 2: Campaign HQ and Ledger can parallel after DB schema lands
- Within Phase 3: Power School content and Chapter OS code can parallel
- Design migration (1-4) is ongoing background work

---

## ARCHITECTURE DECISIONS

### The Two-Layer Airgap (Critical)

```
STREET LAYER                    │    POWER LAYER
─────────────────────────────── │ ──────────────────────────────
No account required             │    Identity required
Client-side only                │    Server-persistent
No analytics                    │    Privacy-respecting analytics
Offline-first                   │    Online-required for writes
Nothing to subpoena             │    Consent-heavy data
                                │
protest-mode, buddy, rights     │    campaigns, school, profiles
cards, RTI/FIR (generate only)  │    ledger, chapters, teams
safety guides, checklist        │    RTI tracking, skill exchange
─────────────────────────────── │ ──────────────────────────────
                                │
        CROSSING THE LINE IS AN EXPLICIT, INFORMED ACT
        (consent screen = most important paragraph in product)
```

**Implementation:**
- Street layer pages: no `fetch()` calls, no cookies read, no Supabase client
- Power layer pages: require identity, show consent on first action
- The fork point: "Save locally" (street) vs "Track & escalate" (power)
- Never silently link street activity to power identity

### The Campaign as Atomic Unit

Everything currently scattered becomes an artifact INSIDE a Campaign:
- RTI filing → `campaign_id` FK
- Demand → becomes a campaign's primary demand
- Board post → becomes a campaign's skill ask
- Map pin → becomes campaign's location context
- Evidence → campaign's evidence locker

This single change converts the toolbox into an OS.

### Distribution = The Document IS the Ad

Every generated artifact must be WhatsApp-shareable:
- RTI document → PDF with campaign URL footer
- Silence card → Image with QR code
- Rights card → Screenshot-optimized image
- Campaign page → OG image auto-generated
- Deadline clock → Animated share-card

The share-to-WhatsApp button is the entire growth strategy.

---

## FILE SYSTEM TARGET STATE (end of Phase 2)

```
src/
├── app/
│   ├── (street)/           # Street layer route group
│   │   ├── protest-mode/
│   │   ├── rights/
│   │   ├── buddy/
│   │   ├── rti/generate/
│   │   ├── fir/generate/
│   │   └── safety/
│   ├── (power)/            # Power layer route group
│   │   ├── campaign/
│   │   │   ├── [id]/
│   │   │   ├── create/
│   │   │   └── templates/
│   │   ├── school/
│   │   │   ├── [track]/
│   │   │   └── [track]/[lesson]/
│   │   ├── rti/track/
│   │   ├── profile/[id]/
│   │   ├── chapter/[id]/
│   │   └── exchange/
│   ├── (public)/           # Public layer (no login)
│   │   ├── ledger/
│   │   ├── campaign/[id]/  # Public view
│   │   ├── profile/[id]/   # Public view
│   │   └── learn/
│   ├── api/
│   │   ├── campaign/
│   │   ├── rti/
│   │   ├── school/
│   │   ├── ledger/
│   │   ├── chapter/
│   │   ├── exchange/
│   │   ├── auth/
│   │   └── admin/
│   ├── admin/
│   └── layout.tsx
├── components/
│   ├── ui/                 # Design system components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── DeadlineClock.tsx
│   │   ├── ShareCard.tsx
│   │   ├── BigRed.tsx
│   │   ├── LedgerRow.tsx
│   │   ├── LadderStep.tsx
│   │   ├── Stamp.tsx
│   │   └── ... (25 total)
│   └── (feature components)
├── lib/
│   ├── supabase/           # Split client
│   │   ├── public.ts
│   │   ├── service.ts
│   │   └── types.ts
│   ├── auth/
│   │   ├── identity.ts
│   │   ├── capabilities.ts
│   │   └── session.ts
│   ├── dto/                # Public/private transformation
│   │   ├── campaign.ts
│   │   ├── chapter.ts
│   │   └── ...
│   ├── share-card/
│   ├── i18n/
│   └── ...
├── styles/
│   └── tokens.css
├── types/
│   ├── db.ts              # Database row types
│   ├── dto.ts             # Public-safe types
│   └── campaign.ts
└── i18n/
    ├── en/
    └── hi/
```

---

## WHAT TO BUILD FIRST (Monday morning answer)

**If you have one developer for one week, do this:**

1. **Day 1–2:** Work Package 0A-2 (RLS rebuild + DTOs) — the security foundation everything depends on
2. **Day 3:** Work Package 0B-1 (Design tokens) — takes a few hours if focused
3. **Day 4–5:** Work Package 0A-3 (Fix OTP + identity) — unblocks all power-layer features

**If you have two developers for two weeks:**
- Dev 1: Track A security (0A-1 through 0A-5)
- Dev 2: Track B design (0B-1 through 0B-3) + begin WP 1-1 (Protest Mode 2.0)

**The single highest-leverage thing:** The RLS/DTO rebuild (0A-2). Everything else is building on sand without it.

---

## METRICS DASHBOARD (what to track, what to ignore)

### Track (outcomes)
- Campaign outcome events (institutional responses) per month
- RTIs: generated → tracked → escalated (funnel)
- Day-31 return rate (the retention heartbeat)
- Ledger rows with institutional responses
- Power School tracks completed with verified assignments
- Civic profiles published
- Chapters onboarded
- Protest-mode weekly loads + share-card generations
- Moderation SLA adherence

### Ignore (vanity)
- Registered users
- Page views
- Posts created
- Signatures collected
- Time on site
- "Engagement"

---

## RISK REGISTER

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Launching before P0 complete | High (pressure) | Critical | Street-layer-only soft launch is the pressure valve; no user data |
| Ledger defamation exposure | Medium | High | Institutions-only targets; filed-document sourcing; right-of-reply; counsel review |
| Platform framed as partisan | Medium | High | Radical procedural neutrality; moderation policy published; tools work on all institutions |
| Verification bottleneck | High | Medium | Honest verification levels; start narrow (documents > people); chapter moderators with audit |
| Ghost-town power layer | High | Medium | Host node seeds it: your org runs first 10 campaigns and first cohort personally |
| Surveillance of members | Medium | Critical | Two-layer airgap; membership never public; minimized server-side data |
| Burnout (small team) | High | High | Phase gates prevent scope creep; each phase is shippable alone |

---

*This document is the bridge between strategy (PRD) and code. Each Work Package is scoped to be a single agent brief or a focused sprint. Begin with Phase 0, Track A, Work Package 0A-2.*
