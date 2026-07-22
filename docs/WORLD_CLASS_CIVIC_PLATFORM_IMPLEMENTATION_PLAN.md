# Sahayata: World-Class Civic Platform Implementation Plan

**Audience:** Engineering, product, design, content, security, legal/compliance, trust-and-safety, accessibility, and research agents

**Status:** Implementation handoff based on the July 2026 repository and product audit

**Repository:** `paramminhas5/Pothole`

**Purpose:** Turn the current prototype into trustworthy, India-focused civic infrastructure for mutual aid, civic problem-solving, peaceful organizing, campaigns, support groups, and public participation.

> The current application is a prototype, not production-ready civic infrastructure. Do not publicly launch, promote, or expose high-risk users to the existing system until every P0 release gate in this document passes.

---

## 1. Product direction

The platform should not become another political social network optimized for feeds, virality, followers, signatures, or outrage. It should become:

> **India's trusted civic-action operating system: helping people understand an issue, find verified support, organize safely, coordinate meaningful action, reach an accountable institution, and see what changed.**

The target participation ladder is:

1. **Learn** — understand an issue, rights, jurisdiction, evidence, and available support.
2. **Find support** — locate current, verified organizations and services.
3. **Request or offer help** — complete a privacy-preserving mutual-aid workflow.
4. **Contribute** — verify, translate, volunteer, document, donate supplies, or attend training.
5. **Organize** — coordinate a local team with roles, tasks, shifts, and safeguards.
6. **Campaign** — define a specific demand, target, deadline, evidence base, and escalation path.
7. **Deliberate** — participate in structured, facilitated discussion rather than an unbounded comment feed.
8. **Co-decide** — participate in a real decision process when an institution has delegated authority.
9. **Track outcomes** — see acknowledgement, action, official response, resolution, appeal, and implementation.

The product's value is the completed outcome loop:

`problem -> accountable target -> evidence -> assignment -> action -> update -> resolution -> appeal/reopen -> public learning`

A submission, view, signature, or comment is not an outcome.

---

## 2. Non-negotiable operating rules for every agent

1. **Safety outranks engagement and growth.** Do not add virality, public social graphs, precise-location discovery, public attendance lists, or engagement leaderboards.
2. **Never expose secrets or ownership tokens.** Session IDs, invite codes, coordinator keys, OTPs, moderation metadata, private contacts, and internal audit data must never appear in public DTOs.
3. **Minimize high-risk data.** Do not add Aadhaar, exact protest locations, identity-document uploads, caste/religion inference, political profiling, contact-book ingestion, or facial recognition without a separately approved legal and safety design.
4. **No fictional production data.** Synthetic records must be visibly marked and isolated from production. Never invent lawyers, shelters, emergency contacts, detentions, institutions, or professional credentials.
5. **No unqualified trust language.** `Verified` must identify what was checked, by whom, how, and when. Moderation approval is not verification.
6. **No unsupported product claims.** Do not claim realtime, encrypted, anonymous, auto-deleted, offline, verified, safe, secure, or private unless the implementation and tests prove it.
7. **No categorical legal or medical claims without expert review.** Every consequential claim needs a primary source, jurisdiction, review owner, effective date, and expiry/review date.
8. **Public and private models must be separate.** Never expose a database row through `.select('*')` merely because part of it is public.
9. **Accessibility is a release requirement.** Core journeys must meet WCAG 2.2 AA and be manually tested with assistive technology.
10. **Language support must cover the complete journey.** A translated navigation label is not localization. Consent, errors, safety material, notifications, and support must work in the selected language.
11. **Offline behavior must not leak sensitive data.** Do not cache private posts, group membership, contact details, or safety alerts without an approved encrypted-storage and expiry design.
12. **No custom cryptography.** Use well-maintained protocols and libraries. Do not imply end-to-end encryption unless it is genuinely implemented and independently reviewed.
13. **Every feature needs an accountable operator.** A workflow cannot launch without moderation ownership, response expectations, escalation, abuse handling, and lifecycle management.
14. **Record decisions, not unnecessary user activity.** Audit privileged actions while minimizing participant surveillance.
15. **Do not implement paid political advertising in the initial product.** It requires a separate legal, election-integrity, sponsor-verification, targeting, archive, and operational workstream.

---

## 3. Current-state truth and stop-ship findings

Agents must validate these findings before changing the affected area, but should assume they are release blockers until disproved.

### Security and authorization

- Server routes use the public anonymous Supabase client for privileged operations.
- `posts` has a `FOR SELECT USING (true)` policy that exposes all post rows, including non-public records and `session_id` values, through direct Supabase access.
- `/api/my-posts` accepts a caller-supplied session ID and can expose another user's records and attempted responses.
- Public chapter queries use `.select('*')`; after migration 004, this can expose `coordinator_key`.
- Active group reads can expose `invite_code`.
- Group-member rows are publicly readable, exposing a high-risk membership graph.
- RLS blocks several operations that the anonymous server client attempts, including administrative updates, private-response reads, OTP reads/deletes, and rate-limit reads.
- Admin authentication is a shared static secret stored in `sessionStorage`, with an unsafe development fallback.
- HTML export interpolates untrusted database fields without context-aware escaping.
- Notification emails interpolate untrusted content into HTML.
- The service worker trusts hardcoded mirrors without signed-data verification.
- There is no demonstrated Content Security Policy or complete security-header policy.

### Identity, ownership, and abuse controls

- OTP send generates a code but does not persist it.
- OTP verification expects a stored code that cannot exist through the current flow.
- Client email verification stores a base64 email address in a readable cookie; base64 is not encryption or hashing.
- Proof of work is optional when fields are omitted and is replayable.
- Rate limiting is unreliable because reads are blocked by RLS.
- Chapter rate limiting begins with a shared literal `anonymous` identity.
- Reports are unthrottled and `reported_count` is set rather than atomically incremented.

### Data lifecycle and privacy

- Expired posts are filtered, not deleted.
- No scheduled deletion exists for posts, responses, reports, groups, memberships, OTPs, or rate-limit data.
- Privacy language overstates deletion, anonymity, and data minimization.
- Public chapter contacts and raw responder contacts require explicit threat modelling and consent design.
- There is no user-facing rights workflow for access, correction, erasure, grievance, or consent withdrawal.
- There is no field-level data classification, processor inventory, legal-hold workflow, or retention matrix.

### Trust and content

- Seed data contains realistic fictional legal, medical, shelter, transport, and emergency-support records.
- Homepage metrics are hardcoded rather than calculated from verified production data.
- Organizations and numbers are described as current or verified without auditable provenance.
- Legal, medical, protest, communications, and digital-security guidance contains broad claims requiring expert review.
- Trust tiers, vouches, and `last_ping` exist conceptually but are not complete operational workflows.
- `updated_at` is not evidence that an organization is active or verified.

### Incomplete product promises

- Groups have schema/content but no secure end-to-end product.
- Alerts are not operational and push notifications do not exist.
- Realtime hooks are not integrated into the main journeys.
- There is no offline mutation queue.
- Cached content does not match all offline claims.
- Mirror deployments described in product copy are not supported by repository deployment configuration.
- Moderation does not have a report queue, reason codes, appeals, SLA tracking, or consistent audit-log writes.
- There is no analytics, monitoring, backup verification, incident response, status page, or transparency reporting implementation.
- There are no automated unit, integration, E2E, accessibility, migration/RLS, security, or offline tests.

---

## 4. Delivery sequence and release gates

Work must proceed in this order. Later work may be designed in parallel, but no later phase may ship before its preceding gate passes.

| Phase | Goal | Release condition |
|---|---|---|
| **Phase 0 / P0** | Contain immediate harm and make claims truthful | No critical data exposure; dangerous placeholders disabled; production data honest |
| **Phase 1 / P0** | Establish secure, private, operable foundations | Security, privacy, moderation, content, accessibility, and incident gates pass |
| **Phase 2 / P1** | Launch a reliable directory and mutual-aid MVP | Complete support journey works safely in pilot locations |
| **Phase 3 / P2** | Add organizer and institutional workflows | Real partners and trained operators own every workflow |
| **Phase 4 / P3** | Expand to national civic infrastructure | Independent audits and pilot outcome evidence support scaling |

---

# 5. P0 backlog: immediate containment and trustworthy foundations

## P0-01 — Freeze unsafe public launch and reset claims

**Depends on:** Nothing  
**Primary areas:** Product, content, deployment  
**Affected files:** `README.md`, `src/app/page.tsx`, `src/app/groups/page.tsx`, `src/app/alerts/page.tsx`, `src/app/safety/page.tsx`, `public/sw.js`, other pages containing product claims

### Required changes

- Add an explicit internal launch status: prototype/private pilot until P0 gates pass.
- Remove or qualify unsupported claims about verification, encryption, realtime updates, push, deletion, anonymity, mirror availability, offline behavior, and group safety.
- Disable links and calls to action for non-operational groups, alerts, check-ins, and push subscriptions.
- Disable HTML export until escaping and data classification are complete.
- Disable automatic mirror failover until signed mirror data exists.
- Replace hardcoded live statistics with either verified database aggregates or clearly labelled demo placeholders not shown in production.
- Add feature flags for incomplete/high-risk capabilities.

### Acceptance criteria

- Production UI does not route users into unfinished high-risk workflows.
- Every public claim maps to an implemented capability and a verification test.
- Build fails if production is configured to load seed/demo records.
- Product copy clearly distinguishes beta limitations from guarantees.

### Verification

- Repository-wide search for: `verified`, `encrypted`, `anonymous`, `auto-delete`, `realtime`, `real-time`, `push`, `offline`, `mirror`, `safe`, and `secure`.
- Manual click-through of every navigation item and CTA.
- Deployment configuration review for every claimed environment.

---

## P0-02 — Remove fictional and dangerous seed data

**Depends on:** P0-01  
**Affected files:** `supabase/seed.sql`, homepage statistics/content, demo setup

### Required changes

- Remove realistic fictional lawyers, shelters, medics, detainees, Telegram accounts, institutions, and emergency events from deployable seed data.
- Create safe development fixtures using unmistakable names such as `Example Organization — Not Real`.
- Never include plausible personal contacts or urgent incidents in fixtures.
- Separate demo fixtures from production migrations and production deployments.
- Add a deployment guard preventing demo fixtures from running against production.
- Remove synthetic responses/reports that look like real private communications.

### Acceptance criteria

- No synthetic record could reasonably be mistaken for real assistance.
- Production deployment cannot run development seed data without an explicit, blocked-by-default override.
- Homepage statistics are real, empty-state-friendly, or clearly marked as demo data in non-production only.

### Verification

- Search production build output and database fixtures for realistic emails, Telegram handles, phone numbers, professional claims, detention claims, and shelter offers.
- Run deployment guard in CI against a production-like environment value.

---

## P0-03 — Rebuild Supabase authorization and public data boundaries

**Depends on:** P0-01  
**Affected files:** `src/lib/supabase.ts`, all `src/app/api/**/route.ts`, all Supabase migrations, shared types

### Required changes

- Define separate clients:
  - browser/public anonymous client;
  - server user-scoped client that forwards authenticated context;
  - server-only service client for tightly scoped privileged operations.
- Ensure service-role credentials can never enter client bundles or logs.
- Replace all public `.select('*')` calls with explicit allowlists.
- Create public DTOs that exclude session IDs, contact details, invite codes, keys, moderation fields, internal notes, reporter identity, and audit fields.
- Rewrite RLS using actual authenticated ownership or secure capability records.
- Restrict public posts to approved, unexpired, explicitly public fields.
- Restrict pending/rejected content to its owner and authorized moderators.
- Restrict private responses to the post owner, the response owner where appropriate, and authorized moderators.
- Restrict groups and memberships to authorized members; make public group discovery a separate projection.
- Remove all plaintext coordinator/invite secrets from queryable rows.
- Add RLS regression tests for anonymous, owner, non-owner, moderator, administrator, and service roles.

### Acceptance criteria

- Anonymous direct Supabase access cannot retrieve private or non-public fields.
- A user cannot access another user's post management or responses.
- No public API response includes a secret or ownership token.
- Admin and moderation operations succeed through narrowly scoped server code.
- RLS tests prove both allowed and denied cases.

### Verification

- Inspect network responses and direct Supabase queries as anonymous and authenticated users.
- Search compiled client assets for service-role secrets.
- Run automated RLS test matrix against a clean migrated database.
- Conduct a dedicated authorization review before merge.

---

## P0-04 — Replace session-ID ownership with secure identity/capabilities

**Depends on:** P0-03  
**Affected files:** `src/lib/session.ts`, `/api/my-posts`, post creation/update/delete routes, `MyPostsClient.tsx`, database migrations

### Required changes

- Decide between:
  - authenticated email/magic-link ownership; or
  - anonymous ownership through high-entropy, hashed, revocable capabilities.
- Never pass ownership tokens through URL query strings.
- Store capability hashes, not raw tokens.
- Bind management actions to secure, `HttpOnly`, `Secure`, `SameSite` cookies or authenticated sessions.
- Rotate and revoke credentials.
- Add account/session recovery that does not weaken ownership checks.
- Define behavior when cookies are cleared or a device is shared.
- Ensure seeded or imported records cannot be claimed accidentally.

### Acceptance criteria

- Knowing a post ID or database session ID does not grant management access.
- Ownership tokens do not appear in URLs, analytics, logs, exports, or public APIs.
- Users can delete/close their own records and cannot modify others.
- Recovery is rate-limited, auditable, and privacy-preserving.

### Verification

- Attempt IDOR attacks across every owner route.
- Test copied URLs, shared devices, expired sessions, revocation, and cookie clearing.

---

## P0-05 — Replace shared admin secret with role-based administration

**Depends on:** P0-03  
**Affected files:** `src/app/admin/**`, `/api/admin/**`, environment configuration, database roles/audit schema

### Required changes

- Remove static `ADMIN_SECRET`, development fallback secrets, and `sessionStorage` authentication.
- Implement named administrator/moderator accounts with MFA/passkeys where supported.
- Add roles such as `viewer`, `moderator`, `senior_moderator`, `directory_verifier`, `content_reviewer`, `security_responder`, and `administrator`.
- Apply least privilege and separation of duties.
- Require step-up authentication for exports, identity disclosure, role changes, and emergency actions.
- Record actor, action, target, reason, timestamp, and before/after state for privileged changes.
- Prevent audit-log mutation by ordinary admins.
- Add session/device view and remote revocation.

### Acceptance criteria

- Every privileged action is attributable to an individual account.
- No shared secret grants blanket access.
- Moderators cannot access private data unrelated to their assigned case.
- Sensitive exports require approval and are audited.

### Verification

- Role-permission tests.
- MFA/session-expiry/revocation tests.
- Audit-log integrity review.

---

## P0-06 — Fix or remove email verification and notifications

**Depends on:** P0-03, P0-04  
**Affected files:** `src/components/EmailVerification.tsx`, `/api/auth/send-code`, `/api/auth/verify`, `src/lib/email.ts`, notification schema

### Required changes

- Remove the client-only base64 email cookie flow immediately.
- If retaining OTP:
  - generate with a cryptographically secure source;
  - store only a hash;
  - bind to purpose, session, and normalized email;
  - expire quickly;
  - consume once;
  - throttle send and verify attempts;
  - prevent account/email enumeration;
  - redact email in logs.
- Record explicit notification consent and allow easy withdrawal.
- Separate authentication email from optional civic notifications.
- Escape all user-controlled email content.
- Avoid including sensitive post descriptions or protest-related information in subject lines and lock-screen previews.
- Add delivery, bounce, complaint, and unsubscribe handling.

### Acceptance criteria

- OTP can be completed once and cannot be replayed.
- No raw OTP or email appears in logs or readable cookies.
- Notification preference is explicit, purpose-specific, and revocable.
- Email HTML cannot be injected through submissions.

### Verification

- OTP replay, brute force, expiry, resend, enumeration, and cross-session tests.
- Email rendering and injection tests.

---

## P0-07 — Rebuild abuse prevention and rate limiting

**Depends on:** P0-03  
**Affected files:** `src/lib/rate-limit.ts`, `src/lib/proof-of-work.ts`, `/api/pow`, all submission/report/response/auth routes

### Required changes

- Enforce rate limits in trusted server code, not through public client reads.
- Cover posts, chapter submissions, responses, reports, OTP sends, OTP verifies, searches, exports, authentication, and admin login.
- Use layered signals with strict retention and privacy review; do not build long-lived activist fingerprinting.
- If PoW remains:
  - make it mandatory for the intended action;
  - bind it to action/session/challenge;
  - store and consume challenges once;
  - expire challenges;
  - provide an accessible, low-power fallback.
- Use atomic counters or a suitable rate-limit store.
- Detect and respond to spam floods, brigading, scraping, enumeration, and coordinated reporting.
- Atomically increment report counters; do not assign a fixed value.

### Acceptance criteria

- Omitting client fields cannot bypass controls.
- Challenges cannot be replayed or reused for another endpoint.
- Controls work under concurrency.
- Users on low-end devices and assistive technology have a functional alternative.

### Verification

- Concurrent load tests.
- Replay/bypass tests.
- Abuse simulations for submission, reporting, scraping, and OTP endpoints.

---

## P0-08 — Eliminate injection and harden the web application

**Depends on:** P0-03  
**Affected files:** `/api/export`, `src/lib/email.ts`, user-content renderers, `next.config.ts`, URL handling

### Required changes

- Escape HTML text and attributes using maintained libraries.
- Sanitize any intentionally supported rich text through an allowlist.
- Permit only approved URL schemes and normalize links.
- Add Content Security Policy with nonces/hashes where needed.
- Add `X-Content-Type-Options`, strict referrer policy, frame restrictions, permissions policy, HSTS in production, and secure cache controls.
- Prevent formula injection in CSV exports.
- Add safe content-disposition and MIME headers to downloads.
- Validate and constrain all inputs server-side using shared schemas.
- Add request body size, field size, list length, and upload limits.
- Add dependency scanning, secret scanning, SAST, and a software bill of materials.

### Acceptance criteria

- Stored/reflected XSS payloads do not execute in pages, exports, or email.
- `javascript:`, hostile data URLs, and unsafe redirects are rejected.
- Security headers are present on production routes.
- CSV/HTML/JSON exports reveal only explicitly public fields.

### Verification

- Automated XSS and CSV-injection cases.
- Security-header scan.
- Manual export and email review.
- Dependency and secret scans in CI.

---

## P0-09 — Disable and redesign groups, membership, and alerts

**Depends on:** P0-03, P0-05  
**Affected files:** migration 004, `src/app/groups`, `src/app/alerts`, future group/alert APIs, service worker

### Required changes

- Disable existing group and alert UI until replacement authorization is complete.
- Remove public reads of member rows and invitation/coordinator credentials.
- Store invite tokens as hashes with expiry, scope, usage limits, and revoke support.
- Make member lists private by default and limit even member-to-member visibility.
- Define group roles, approval modes, bans, suspensions, and emergency lock.
- Add threat models for infiltration, doxxing, coercion, device seizure, malicious organizers, scraping, and lawful requests.
- Alerts require:
  - source provenance;
  - geographic scope;
  - issue/expiry time;
  - two-person approval for high-impact alerts;
  - correction/retraction;
  - visible freshness;
  - delivery audit without exposing subscriber membership.
- Do not add exact participant locations or public RSVP lists.

### Acceptance criteria

- Anonymous users cannot enumerate groups' private membership or credentials.
- A leaked invite can be revoked without recreating the group.
- An alert cannot be issued by one compromised low-privilege account.
- Corrections and retractions propagate visibly.

### Verification

- Membership enumeration and invite replay tests.
- Role abuse and organizer compromise scenarios.
- Alert expiry/correction/retraction delivery tests.

---

## P0-10 — Implement privacy, retention, and user rights

**Depends on:** P0-03, P0-04  
**Affected files:** database migrations, scheduled jobs, privacy pages, account/ownership UI, all data-producing features

### Required changes

- Create a field-level data inventory containing owner, purpose, legal basis/consent, sensitivity, processors, residency, retention, and access roles.
- Define separate retention for content, private contacts, moderation evidence, audit logs, security logs, OTPs, rate limits, backups, and legal holds.
- Implement scheduled deletion, not only public filtering.
- Build user access, correction, deletion, consent withdrawal, grievance, and nomination workflows where applicable.
- Make withdrawal as easy as opt-in.
- Notify users before lifecycle deletion when appropriate.
- Define backup expiry and deletion propagation.
- Establish processor contracts/register and cross-border review.
- Create breach assessment and user-notification workflows aligned with applicable law.
- Add child-safety product decision: safest initial posture is adults-only for high-risk organizing unless a separately approved child-safe design exists.
- Do not collect Aadhaar merely for age or trust.

### Acceptance criteria

- Every stored field has a documented purpose and retention rule.
- Automated jobs permanently delete eligible records and produce privacy-preserving execution evidence.
- Users can exercise supported rights without emailing an unknown address.
- Production copy accurately describes deletion and retention.

### Verification

- Seed records at each retention boundary and verify deletion/legal-hold behavior.
- Restore a backup and verify expired data does not persist beyond the approved backup window.
- Complete a data-subject workflow end to end.

---

## P0-11 — Build real moderation, grievance, and appeals operations

**Depends on:** P0-05, P0-10  
**Affected files:** admin UI/APIs, reports route, moderation library, moderation/audit schema, policy pages

### Required changes

- Build a case-management model: case ID, source, category, severity, target, reporter visibility, evidence, assignee, SLA, decision, reason code, notes, actions, appeal, and history.
- Separate ordinary reports, India grievance complaints, urgent intimate-image complaints, credible threats, doxxing, child safety, unlawful-content orders, synthetic media, and security incidents.
- Add acknowledgement, status, resolution, and appeal messaging.
- Require reasoned decisions and record legal versus platform-policy basis separately.
- Support India-only restriction where legally appropriate rather than unnecessary global deletion.
- Restrict access to sensitive evidence and log every view/export.
- Add surge controls for brigading and coordinated false reporting.
- Create escalation paths to counsel, security, safeguarding, and emergency services.
- Add moderator wellbeing controls, workload limits, handoffs, and supervision.
- Generate aggregate transparency data without exposing victims or participants.

### Acceptance criteria

- Every report has status, owner, SLA, decision reason, and appeal path.
- Urgent categories reach the appropriate trained queue immediately.
- Moderation actions consistently write immutable audit entries.
- Reporters cannot use the system to discover private target information.

### Verification

- Tabletop exercises for doxxing, threats, intimate-image abuse, misinformation, deepfakes, unlawful orders, and coordinated reporting.
- SLA simulation and audit-log review.

---

## P0-12 — Establish legal/content governance and correct safety resources

**Depends on:** P0-01  
**Affected files:** `src/app/safety`, `guide`, `playbook`, `resources`, `toolkit`, `telegram-guide`, `FreshnessBadge.tsx`, future content system

### Required changes

- Place consequential content into a managed content model with:
  - primary sources;
  - jurisdiction;
  - reviewer name/role;
  - last reviewed date;
  - next review/expiry date;
  - version history;
  - correction history;
  - emergency unpublish.
- Commission qualified review of arrest, detention, evidence, device access, biometrics/passwords, protest permissions, legal observers, medical response, tear gas, hospitals, VPNs, messaging apps, hotlines, and mental-health resources.
- Verify each organization and phone number directly and record verification evidence.
- Replace “verified” badges with precise states such as `contact confirmed on DATE`, `credentials checked`, `community vouched`, or `unverified submission`.
- Remove future-dated, unsupported, or event-specific claims.
- Add a visible `report an error` flow on each resource.
- Clearly separate factual information, safety suggestions, professional advice, and emergency instructions.
- Do not rely on disclaimers to excuse inaccurate content.

### Acceptance criteria

- No high-consequence claim is published without source and accountable reviewer.
- Stale content automatically becomes visibly stale or is unpublished.
- Corrections retain a public history where safe.
- Every hotline/contact has an auditable freshness record.

### Verification

- Expert sign-off checklist.
- Broken-link/contact verification job plus manual sampling.
- Search for uncited categorical claims such as `always`, `never`, `must`, `cannot`, `guaranteed`, and `verified`.

---

## P0-13 — Build observability, incident response, backup, and recovery

**Depends on:** P0-03, P0-10  
**Affected files:** deployment configuration, logging/monitoring modules, runbooks, scheduled jobs

### Required changes

- Implement privacy-preserving application metrics, error tracking, audit events, uptime monitoring, dependency health, queue monitoring, and alert delivery monitoring.
- Never send sensitive descriptions, contacts, tokens, or membership data to analytics/error vendors.
- Add structured redaction and allowlisted telemetry fields.
- Create incident severity levels and 24/7 contacts for critical incidents.
- Build runbooks covering account compromise, data breach, doxxing, malicious insider, spam flood, dependency compromise, mirror compromise, alert misinformation, and database loss.
- Map incident timelines to applicable CERT-In and privacy reporting duties.
- Retain covered security logs in an approved India region for the required period while minimizing content.
- Encrypt backups and test restore.
- Define RTO/RPO, failover, key rotation, and compromised-credential revocation.
- Add a public service-status and incident-communication process.

### Acceptance criteria

- Critical failures trigger actionable alerts without leaking participant data.
- The team can restore from encrypted backups inside the approved RTO/RPO.
- Incident owners can produce required facts within reporting deadlines.
- Secrets can be rotated without rebuilding the whole system.

### Verification

- Quarterly restore drill.
- Security incident tabletop.
- Telemetry data review.
- Fault injection in non-production.

---

## P0-14 — Establish build, test, and CI baselines

**Depends on:** Nothing; can run in parallel  
**Affected files:** `package.json`, lockfile, ESLint/TypeScript/Next config, CI workflows, test configuration

### Required changes

- Ensure a clean environment can install dependencies reproducibly.
- Align documented and actual Node, npm, Next.js, React, and TypeScript versions.
- Add scripts for lint, type-check, unit, integration, migration/RLS, E2E, accessibility, security, and production build.
- Add CI gates for every pull request.
- Use isolated test databases and never production credentials.
- Add dependency update and vulnerability-management process.
- Add migration forward/rollback or compensating-change verification.
- Add preview-environment protection; previews must not expose production data.

### Acceptance criteria

- A clean checkout installs and completes all baseline checks.
- CI blocks merge on build, type, security, RLS, or accessibility regression.
- Version documentation matches `package.json` and lockfile.

### Verification

- Run the full pipeline from a clean environment.
- Verify no test requires interactive/watch mode.
- Verify test logs redact secrets and private data.

---

## P0-15 — Redesign service worker and offline behavior

**Depends on:** P0-01, P0-08, P0-10  
**Affected files:** `public/sw.js`, `manifest.json`, `ServiceWorkerRegister.tsx`, offline UI

### Required changes

- Remove unverified remote mirror fallback.
- Version caches and delete obsolete caches on activation.
- Do not cache authenticated/private API responses by default.
- Add explicit cache policies for public guides, static assets, directory snapshots, and safety cards.
- Provide visible freshness/source/offline status.
- Add an instant `clear offline data` control.
- Encrypt or avoid local storage for sensitive drafts; set short expiry.
- Build an outbox only after conflict, consent, retry, duplicate, and deletion behavior is designed.
- Add update notification and safe service-worker migration behavior.
- Localize manifest metadata and offline pages.

### Acceptance criteria

- Private content cannot be recovered from ordinary browser cache after logout/clear.
- Stale alerts are never shown as current.
- Users know whether content is online, cached, stale, or pending sync.
- Core public safety cards remain usable during network loss.

### Verification

- Browser storage inspection.
- Offline, intermittent-network, update, eviction, and logout tests.
- Shared-device threat scenario.

---

# 6. P1 backlog: reliable directory and mutual-aid MVP

## P1-01 — Verified civic-support directory

**Depends on:** All P0 release gates  
**Affected areas:** Directory UI/API/schema, admin verification, search

### Required changes

- Add organization ownership and secure profile management.
- Store verification dimensions separately: contact confirmed, legal identity where appropriate, professional credentials, service capability, community vouches, and partner status.
- Show exactly what is and is not verified.
- Add service area, hours, capacity, languages, accessibility, eligibility, fees, safeguarding, and response channels.
- Use contact relay when publishing direct contact creates risk.
- Add freshness pings requiring an authenticated owner response.
- Mark stale organizations automatically and remove expired urgent claims.
- Add complaints/corrections and organization appeals.
- Add duplicate detection and change history.
- Publish aggregate response reliability only when statistically fair and abuse-resistant.

### Acceptance criteria

- Every listing has provenance, owner, verification state, and freshness.
- Search excludes stale/unavailable services by default but makes status visible.
- Verification cannot be awarded by one unsupported moderator click.
- Organization secrets and internal evidence remain private.

---

## P1-02 — Safe request/offer matching lifecycle

**Depends on:** P1-01, P0 privacy/moderation/identity work  
**Affected areas:** Board UI/API/schema, notifications, moderation

### Required changes

- Replace generic posts with category-specific schemas and safeguards.
- Add lifecycle: draft, submitted, triaged, published/private-match, accepted, in progress, fulfilled, closed, expired, cancelled, disputed, and removed.
- Add urgency triage without claiming emergency-service capability.
- Reveal the minimum information required at each stage.
- Require consent before contact disclosure.
- Allow trusted intermediaries and organization referrals.
- Add safe decline, block, report, cancellation, and closure.
- Add fulfilment confirmation from both sides where appropriate.
- Treat legal, shelter, health, minors, domestic violence, transport, and crisis categories as separate risk workflows.
- Prevent public precise-location and vulnerable-person exposure.
- Add duplicate and stale-request handling.

### Acceptance criteria

- A request can be completed without public contact information.
- Sensitive categories receive specialized triage.
- Both sides can end contact safely.
- Closure triggers the approved deletion schedule.

---

## P1-03 — Notification center and privacy-preserving delivery

**Depends on:** P0-06, P1-02  

### Required changes

- Build in-app notifications first.
- Add per-purpose email/push consent only after secure delivery exists.
- Avoid sensitive content on lock screens and subject lines.
- Allow frequency, language, geography, category, and quiet-hour controls.
- Support delivery failure, retries, deduplication, and acknowledgement.
- Do not expose group/request membership through notification endpoints.

### Acceptance criteria

- Users can understand and control every notification category.
- Delivery does not reveal sensitive participation to unauthorized viewers.
- Urgent does not mean unbounded or unverified broadcasting.

---

## P1-04 — Trust, freshness, and provenance system

**Depends on:** P1-01  

### Required changes

- Replace one-dimensional trust tiers with auditable trust signals.
- Define who can vouch, what a vouch means, conflict disclosure, expiry, revocation, and abuse handling.
- Separate recency, identity, capability, community reputation, and institutional partnership.
- Require evidence and dual review for consequential verification.
- Show uncertainty and limitations.
- Add correction and revocation timelines.

### Acceptance criteria

- A badge cannot imply broader trust than the checked evidence supports.
- Every trust signal has issuer, scope, evidence, date, and expiry.
- Users can report a false or outdated signal.

---

## P1-05 — Outcome and accountability tracking

**Depends on:** P1-02  

### Required changes

- Define outcomes per category rather than using one `resolved` flag.
- Record acknowledgement, assignment, action, evidence, user confirmation, dispute, reopen, and escalation.
- Keep sensitive case details private while publishing safe aggregate outcomes.
- Prevent organizations from unilaterally claiming success without participant confirmation or documented evidence.
- Add non-resolution reasons and learning loops.

### Acceptance criteria

- Every public success metric can be traced to a defined, auditable outcome.
- Disputed and reopened cases are not counted as completed.
- Users can see what happened after contributing.

---

## P1-06 — Complete accessibility program

**Depends on:** P0-14  
**Affected files:** all pages/components/styles

### Required changes

- Target WCAG 2.2 AA and map applicable GIGW/IS 17802 requirements.
- Add semantic landmarks, skip links, headings, visible focus, keyboard completion, correct labels, live regions, error summaries, and accessible dialogs.
- Replace browser `prompt()` and ambiguous emoji-only controls.
- Support zoom/reflow, reduced motion, high contrast, non-colour status, large touch targets, and accessible authentication.
- Caption/transcribe media and provide text alternatives.
- Test with screen readers, keyboard, switch-like navigation, magnification, and voice input.
- Recruit disabled users for paid usability testing.

### Acceptance criteria

- Every core journey completes without mouse, vision, hearing, or colour perception assumptions.
- Automated checks have no serious violations, and manual assistive-technology tests pass.
- Accessibility feedback has an owned response process.

---

## P1-07 — Build real localization and language operations

**Depends on:** P0-12  
**Affected files:** `src/i18n/**`, all user-facing text, content model, notifications, manifest

### Required changes

- Remove hardcoded user-facing strings from components and routes.
- Localize validation, errors, emails, notifications, consent, moderation, metadata, dates, numbers, and offline states.
- Start with English, Hindi, and pilot-location languages.
- Add Indic-font coverage, language tags, script-aware search, and optional transliteration.
- Use human review for safety, legal, moderation, and consent language.
- Build terminology/version governance and translation QA.
- Preserve selected language across devices/sessions where consented.
- Do not use machine translation alone for consequential content.

### Acceptance criteria

- A selected language works from entry through completion and support.
- Missing translation keys fail CI or visibly fall back in non-production.
- Safety/legal translation has accountable human sign-off.

---

## P1-08 — Low-bandwidth, low-end-device, and assisted access

**Depends on:** P0-15, P1-07  

### Required changes

- Establish performance budgets for critical HTML, CSS, JavaScript, fonts, and images.
- Server-render public core content.
- Paginate and avoid unbounded `.select('*')` queries.
- Add text-only/low-data mode, compressed media, no autoplay, upload resume, and visible retry.
- Test intermittent 2G/3G and low-memory Android devices.
- Design SMS/IVR/callback and assisted-submission interfaces for later integration.
- Provide printable/downloadable safety and organizer materials.

### Acceptance criteria

- Core public content is usable on the agreed low-bandwidth profile.
- Submission survives interruption without duplicates or silent loss.
- Performance budgets are enforced in CI.

---

## P1-09 — Navigation, information architecture, and design system

**Depends on:** Product direction approval  

### Required changes

- Reorganize around user goals: `Get help`, `Offer help`, `Find support`, `Take action`, `Organize`, `Learn`, and `Track outcomes`.
- Distinguish emergency, urgent, and routine paths without implying emergency dispatch.
- Add city/language context and clear privacy expectations before submission.
- Create consistent components for trust state, freshness, source, urgency, progress, errors, consent, and safety warnings.
- Add usable empty states; never fill emptiness with fiction.
- Make mobile navigation expose all core journeys.
- Remove visual patterns that mimic urgency where none exists.

### Acceptance criteria

- First-time users can identify the correct action and its consequences.
- UI consistently communicates source, freshness, privacy, and status.
- Mobile and desktop journeys have feature parity where appropriate.

---

# 7. P2 backlog: organizer and institutional workflows

## P2-01 — Organizer workspace

Build secure organization/team workspaces with roles, volunteer intake, skill/availability matching, task assignment, shifts, checklists, training, inventory, handoffs, contact history, consent, announcements, meeting decisions, workload limits, and impact summaries.

**Guardrails:** private membership; least privilege; no public attendance graph; export approvals; organizer-abuse reporting; emergency lock/revoke; burnout controls.

**Success condition:** pilot organizations can run a real support operation without external spreadsheets for core workflows, while participants retain privacy and exit rights.

---

## P2-02 — Accountable civic issue reporting

Implement jurisdiction/category routing, duplicate clustering, accountable recipient, reference number, acknowledgement, assignment, SLA, updates, resolution evidence, user confirmation, reopen, appeal, and escalation.

**Guardrails:** do not use public maps for vulnerable people, protests, violence, shelter, health, or legal cases. Make partner capability explicit; do not accept a report if nobody has agreed to receive it without clearly saying so.

**Success condition:** every pilot report has an accountable destination and observable lifecycle.

---

## P2-03 — Campaign and petition workspace

Require a specific demand, competent target, jurisdiction, evidence, affected community, delivery date, response deadline, organizer disclosure, escalation path, and implementation tracker.

Add differentiated supporter actions: local sharing, volunteering, evidence gathering, representative contact, event attendance, translation, and delivery participation.

**Guardrails:** signatures are not outcomes; prevent harassment/dogpiling; verify official responses; prohibit deceptive fundraising and fake urgency.

---

## P2-04 — Secure groups and community coordination

After P0-09 threat-model approval, implement private-by-default groups, scoped roles, approvals, invitation lifecycle, tasks, shifts, resources, decisions, safety broadcasts, member exit/deletion, moderation, and organizer accountability.

Do not create a general-purpose public chat product unless there is a separately approved moderation and security model.

---

## P2-05 — Verified alert system

Implement only with trained operators and partner sources. Require provenance, two-person approval for high-impact alerts, issue/expiry timestamps, geographic scope, confidence, correction/retraction, delivery status, and full audit history.

Do not label social-media claims as alerts without corroboration. Never retain subscriber location beyond what is required for chosen geographic subscriptions.

---

## P2-06 — Secure evidence and documentation workflows

- Strip EXIF by default while allowing the uploader to preserve an encrypted original when informed and necessary.
- Blur faces/plates with consent-aware controls.
- Separate private evidentiary copy from public media.
- Timestamp and hash evidence without overstating legal admissibility.
- Record chain of custody and access.
- Add takedown, correction, consent withdrawal, and bystander protection.
- Scan attachments for malware.
- Do not publish precise time/location automatically.

This requires legal, security, journalism, and human-rights review.

---

## P2-07 — Partner and referral infrastructure

Build authenticated partner endpoints, referral acceptance, capability/availability, SLA, status updates, and audit trails for legal aid, civic bodies, hospitals, NGOs, universities, unions, disaster-response groups, and other approved partners.

Partners must agree to data-protection, safeguarding, response, correction, and exit terms. Do not share participant data merely because an organization is listed.

---

## P2-08 — Public transparency and governance

Publish funding, ownership, conflicts, governance, moderation rules, government-request handling, enforcement statistics, appeals, incident summaries, correction history, verification methodology, and service performance.

Establish advisory structures covering affected communities, disability, language, security, legal rights, organizers, and public institutions. Add an independent appeal/ombuds mechanism when scale warrants it.

---

# 8. P3 backlog: national-scale civic infrastructure

## P3-01 — Structured deliberation

Add balanced evidence briefs, sponsor/expert disclosure, representative recruitment, compensation where possible, facilitated small groups, multilingual accessibility, consensus/disagreement mapping, minority reports, and public institutional responses.

Do not launch an open comment feed under the label of deliberation.

## P3-02 — Participatory decision processes

Support participatory budgeting, citizens' recommendations, and co-design only when the decision-maker has publicly committed authority, process rules, response dates, and implementation tracking.

## P3-03 — National language and assisted-access expansion

Expand based on pilot evidence. Add priority regional languages, community translation, IVR/voice, SMS/callback, assisted community access, and offline/print distribution. Maintain state-specific resource and legal content ownership.

## P3-04 — Signed data and resilient mirrors

If mirrors are still required:

- publish signed, versioned, minimized public snapshots;
- verify signatures client-side using pinned public keys;
- implement rollback/replay protection, revocation, timestamp/freshness, and integrity monitoring;
- keep private data out of snapshots;
- display the source and staleness;
- document mirror ownership and incident response.

## P3-05 — Responsible research and evaluation

Pre-register intended outcomes for major interventions, establish baselines, evaluate subgroup effects, publish failures, and use phased/randomized rollout where ethical. Partner with independent researchers and communities; do not experiment on high-risk users without review and informed consent.

---

# 9. Target data architecture

Do not implement this blindly; convert it into reviewed migrations. The target model should separate public records, private participant data, operational workflow, and audit evidence.

## Core identity and access

- `users`
- `user_sessions`
- `roles`
- `role_assignments`
- `organizations`
- `organization_memberships`
- `capabilities` with hashed tokens, scope, expiry, and revocation
- `consent_records` with version and purpose

## Directory and verification

- `organization_profiles_public`
- `organization_private_details`
- `services`
- `service_areas`
- `service_availability`
- `verification_checks`
- `vouches`
- `freshness_confirmations`
- `organization_complaints`

## Mutual aid

- `requests`
- `offers`
- `matches`
- `match_messages` or external secure relay references
- `referrals`
- `outcome_events`
- `contact_disclosures`
- `safeguarding_flags`

## Organizing and civic action

- `groups`
- `group_memberships`
- `invitations`
- `tasks`
- `shifts`
- `events`
- `campaigns`
- `campaign_targets`
- `campaign_actions`
- `official_responses`
- `implementation_updates`
- `civic_reports`
- `institution_assignments`

## Trust, content, and governance

- `content_items`
- `content_sources`
- `content_reviews`
- `content_versions`
- `corrections`
- `alerts`
- `alert_approvals`
- `alert_deliveries`
- `moderation_cases`
- `moderation_actions`
- `appeals`
- `grievances`
- `legal_orders`
- `audit_events`

## Privacy and reliability

- `retention_policies`
- `deletion_jobs`
- `legal_holds`
- `data_requests`
- `security_incidents`
- `notification_preferences`
- `notification_deliveries`

### Data architecture rules

- Use IDs and public DTOs that do not expose internal sequences or ownership credentials.
- Encrypt especially sensitive fields using managed keys and documented rotation.
- Keep public projections physically/logically separate from private operational tables.
- Avoid storing raw IP addresses unless an approved security need and strict retention rule exist.
- Never infer protected or high-risk attributes for engagement, ranking, or advertising.
- Do not expose membership, contact, or participation through aggregate endpoints vulnerable to differencing.

---

# 10. API and engineering standards

Every API must define:

- authentication and authorization;
- input schema and size limits;
- public/private response schema;
- rate limit;
- idempotency behavior;
- audit requirements;
- retention impact;
- localization/error behavior;
- moderation/safety escalation;
- caching policy;
- observability with redaction;
- abuse cases;
- tests for success and denial paths.

Additional standards:

- Prefer server-side rendering for public, low-bandwidth content.
- Use transactions for state transitions and audit writes.
- Use state machines for moderation, matching, alerts, campaigns, and grievances.
- Use idempotency keys for mutation retries.
- Use cursor pagination and explicit fields.
- Validate at client, server, and database levels.
- Store timestamps in UTC and display localized time zones.
- Design retries to avoid duplicate notifications or records.
- Add database indexes based on actual query plans.
- Do not add realtime subscriptions unless authorization is proven per channel and reconnect/stale behavior is tested.

---

# 11. Required test and verification matrix

No feature is complete until applicable rows pass.

| Domain | Required verification |
|---|---|
| Authorization | Anonymous/owner/non-owner/moderator/admin/service-role RLS and API tests |
| Privacy | Retention, deletion, backup expiry, consent withdrawal, rights requests, telemetry inspection |
| Security | XSS, CSRF, SSRF where applicable, IDOR, replay, brute force, secret scan, dependency scan, session tests |
| Abuse | Spam, scraping, report brigading, invitation leakage, notification abuse, account recovery abuse |
| Moderation | SLA routing, evidence access, appeals, reason codes, audit integrity, urgent escalation |
| Accessibility | Automated checks plus keyboard and assistive-technology manual tests |
| Localization | Full journeys, fallback, Indic rendering/search, translated errors/consent/notifications |
| Offline | No-network, intermittent network, cache inspection, stale alerts, logout/clear, update migration |
| Reliability | Load, concurrency, retry/idempotency, queue failure, backup restore, dependency failure |
| Content | Source/reviewer/expiry validation, broken links, correction and emergency unpublish |
| Product | Empty states, safe closure, dispute/reopen, accountable recipient, outcome calculation |
| Mobile | Low-end Android, touch targets, shared device, lock-screen notification privacy |

Testing must use synthetic records that are unmistakably non-real.

---

# 12. Metrics and analytics specification

## North-star metric

> **Verified civic outcomes completed safely per 100 active participants.**

## Outcome metrics

- requests safely fulfilled;
- time to first qualified response;
- reports acknowledged, assigned, resolved, disputed, and reopened;
- campaigns receiving an accountable response;
- recommendations accepted and implemented;
- reasons for non-resolution.

## Participation quality

- learn-to-act conversion;
- first-to-second meaningful action;
- 30/90-day volunteer retention;
- task completion and event attendance;
- local-team continuity;
- participation and completion by language, device/network class, disability mode, gender, and rural/urban context where ethically and lawfully measurable.

## Trust and integrity

- directory coverage by verification state;
- stale listing rate;
- source coverage;
- correction rate;
- moderation time;
- appeal overturn rate;
- partner response reliability;
- coordinated-abuse incidents.

## Safety guardrails

- doxxing or re-identification incidents;
- unauthorized access;
- harmful location exposure;
- urgent takedown latency;
- high-risk cases beyond SLA;
- data retained beyond policy;
- moderator/organizer burden and wellbeing.

## Reliability

- completion on low-end devices;
- accessibility journey completion;
- offline recovery;
- API and queue error rates;
- notification delivery;
- restoration time.

### Analytics restrictions

- Do not optimize for outrage, time-on-site, posting volume, forwarding, or raw signatures.
- Do not use third-party session replay on sensitive journeys.
- Do not place sensitive descriptions, identities, memberships, searches, or contacts in analytics.
- Publish metric definitions and prevent disputed cases from inflating outcomes.

---

# 13. India compliance and policy watchlist

This section is planning information, not legal advice. Qualified Indian counsel must review applicability and each launch geography.

Agents must track:

- phased commencement and notifications under the Digital Personal Data Protection Act, 2023 and DPDP Rules, 2025;
- Consent Manager provisions expected from November 2026 and operational DPDP duties expected from May 2027, subject to authoritative updates;
- current IT Act and Intermediary Rules, including grievance, lawful-order, preservation, rapid-response, appeal, and synthetic-media requirements;
- final status of any 2026 draft intermediary/synthetic-media amendments before implementing them as law;
- CERT-In incident-reporting, point-of-contact, time synchronization, and India log-retention duties;
- election-specific ECI instructions, political advertising certification, expenditure, silence periods, deepfakes, voter suppression, and sponsor transparency;
- state/local public-order and protest requirements;
- accessibility obligations and final status of DEPwD ICT standards, GIGW, IS 17802, and WCAG 2.2;
- sector-specific obligations for payments, health, telecom, legal referrals, children, fundraising, and political donations;
- court orders affecting intermediary, privacy, encryption, traceability, blocking, and data-protection duties.

Do not encode draft law as final law. Record source, publication date, effective date, review date, and counsel decision.

---

# 14. Organizational capabilities required before scale

The software cannot substitute for operations. Establish:

- **Trust and safety team** with training, supervision, escalation, and wellbeing support.
- **Content/legal council** covering Indian law, medical safety, digital security, protest rights, public policy, and regional variation.
- **Community governance council** including organizers, affected communities, disability advocates, language representatives, rural users, and marginalized groups.
- **Security lead/advisor** experienced with at-risk civil society.
- **Privacy owner/DPO readiness** proportionate to legal designation and risk.
- **Institutional partnerships** with organizations that have explicitly agreed to receive and respond to referrals.
- **Accessibility program** with paid disabled-user testing.
- **Language operations** with human reviewers and terminology governance.
- **Incident response/on-call ownership** for critical security and safety incidents.
- **Independent review/ombuds path** as the platform grows.

Publish ownership, funding, conflicts, governance, enforcement policy, government-request handling, correction policy, and aggregate transparency reports.

---

# 15. Suggested parallel agent assignments

Parallel work is encouraged only where dependencies permit it.

| Agent/workstream | Scope | Must not do |
|---|---|---|
| Security/data agent | P0-03 through P0-09 | Must not preserve compatibility with insecure public schemas |
| Privacy/compliance agent | P0-10, legal watchlist | Must not convert legal uncertainty into maximal collection |
| Trust-and-safety agent | P0-11, alert/group threat models | Must not use moderation approval as verification |
| Content/research agent | P0-12 | Must not publish uncited legal/medical claims |
| Reliability agent | P0-13 through P0-15 | Must not send sensitive content to telemetry vendors |
| Accessibility/language agent | P1-06 through P1-08 | Must not treat machine translation/automated scans as completion |
| Directory/mutual-aid agent | P1-01 through P1-05 | Must not expose contact or precise location by default |
| Product/design agent | P1-09 and cross-cutting journeys | Must not optimize vanity engagement metrics |
| Organizer/civic workflows agent | P2-01 through P2-07 | Must not launch without accountable operational partners |
| Governance/research agent | P2-08 and P3 | Must not claim causal impact without appropriate evidence |

Each agent must:

1. read this document and the affected source files;
2. confirm dependencies are satisfied;
3. document threat/abuse cases;
4. implement the smallest complete vertical slice;
5. add required verification;
6. update claims and documentation;
7. record data/retention/operations impact;
8. avoid silently broadening scope.

---

# 16. Pull request checklist

Every implementation PR must answer:

- What user problem and outcome does this solve?
- Which plan item and dependency does it satisfy?
- What public/private data changes?
- Who can access each field and action?
- What are the abuse and safety cases?
- What is retained, for how long, and why?
- What happens on cancellation, expiry, deletion, and appeal?
- What operational team owns the workflow?
- What claims in the UI changed?
- How does it work with keyboard/screen reader and selected language?
- How does it behave on slow/intermittent networks and shared devices?
- What tests prove allowed and denied behavior?
- What monitoring exists without collecting sensitive content?
- What migration/rollback or compensating strategy exists?

A PR is not ready if any applicable answer is missing.

---

# 17. Phase release gates

## P0 production-safety gate

All must pass:

- [ ] No fictional production support records or hardcoded live metrics.
- [ ] No public exposure of session IDs, keys, invite tokens, private contacts, memberships, or moderation data.
- [ ] RLS and API authorization matrices pass.
- [ ] Shared admin secret removed; privileged actions individually attributable.
- [ ] OTP removed or secure; rate limits cannot be bypassed.
- [ ] XSS/CSV/URL injection controls pass.
- [ ] Unsupported groups/alerts/mirrors disabled.
- [ ] Retention jobs and accurate privacy copy exist.
- [ ] Moderation/grievance/appeal/incident workflows have owners.
- [ ] Consequential content has expert review and provenance.
- [ ] Backup restore and security incident drills pass.
- [ ] Clean install, lint, type-check, test, and production build pass.
- [ ] Core journeys meet the agreed accessibility gate.

## P1 pilot gate

- [ ] Directory listings have explicit verification/freshness states.
- [ ] Requests and offers complete a safe matching lifecycle.
- [ ] Contact remains private until consented disclosure.
- [ ] Specialized high-risk-category triage exists.
- [ ] Users can close/delete/dispute/reopen as designed.
- [ ] Outcome metrics exclude disputed or unverifiable success.
- [ ] Full core journey works in pilot languages.
- [ ] Low-bandwidth and low-end-device targets pass.
- [ ] Pilot operators are trained and staffed.

## P2 city-expansion gate

- [ ] At least two or three city pilots show safe use and accountable responses.
- [ ] Partner agreements and service levels are operational.
- [ ] Organizer workflows pass insider/infiltration threat review.
- [ ] Alerts, if enabled, pass source and two-person approval tests.
- [ ] Independent security and accessibility reviews are complete.
- [ ] Public transparency reporting is live.

## P3 national-scale gate

- [ ] State/language ownership exists for every launched region.
- [ ] Independent evaluation shows meaningful outcomes, not just engagement.
- [ ] Governance and appeals have independent participation.
- [ ] National incident, moderation, language, and support staffing is sustainable.
- [ ] Signed mirror/offline architecture has passed independent review if used.

---

# 18. Research anchors

Agents should use current primary/authoritative sources and verify that links and legal status remain current before implementation.

- OECD, *Guidelines for Citizen Participation Processes*: https://doi.org/10.1787/f765caf6-en
- OECD, *Innovative Citizen Participation and New Democratic Institutions*: https://doi.org/10.1787/339306da-en
- Peixoto and Fox, *When Does ICT-Enabled Citizen Voice Lead to Government Responsiveness?*: https://doi.org/10.19088/1968-2016.104
- World Bank, *World Development Report 2016: Digital Dividends*: https://www.worldbank.org/en/publication/wdr2016
- Lorenz-Spreen et al., digital media and democracy systematic review: https://doi.org/10.1038/s41562-022-01460-1
- Kozyreva et al., misinformation intervention review: https://doi.org/10.1038/s41562-024-01881-0
- Badrinathan, India misinformation field experiment: https://doi.org/10.1017/S0003055421000459
- W3C, WCAG 2.2: https://www.w3.org/TR/WCAG22/
- Government of India, GIGW: https://guidelines.india.gov.in/
- MeitY, DPDP framework: https://www.meity.gov.in/data-protection-framework
- CERT-In directions: https://www.cert-in.org.in/PDF/CERT-In_Directions_70B_28.04.2022.pdf
- India Code, IT Act and current rules: https://www.indiacode.nic.in/
- ECI official resources: https://www.eci.gov.in/
- mySociety, FixMyStreet: https://www.mysociety.org/community/fixmystreet/
- Decidim case studies: https://decidim.org/case-studies/
- vTaiwan process: https://info.vtaiwan.tw/
- Access Now Digital Security Helpline: https://accessnow.org/help
- Security in a Box: https://securityinabox.org/en/

External material should be summarized and attributed rather than copied. Platform case studies provide implementation ideas but are not automatically independent proof of impact.

---

# 19. Final definition of world-class

Sahayata is world-class only when:

- people can understand what the platform can and cannot do;
- high-risk participation does not become a public identity/location graph;
- every trust claim is scoped and auditable;
- every consequential resource is current, sourced, and owned;
- every submission has a lifecycle, responsible operator, and safe exit;
- civic action reaches an accountable target and produces a visible response;
- disputed outcomes remain disputed rather than becoming marketing statistics;
- users can access, correct, close, and delete their data as designed;
- the full journey works across language, disability, low bandwidth, low-end devices, and shared devices;
- moderators and organizers have sustainable tools and support;
- security, privacy, accessibility, governance, and impact are independently examined;
- the platform publishes failures and limitations as honestly as successes.

**Build trust before growth. Build accountable outcomes before engagement. Scale operations and governance with the software, not after it.**
