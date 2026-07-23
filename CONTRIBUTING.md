# Contributing to Sahayata

Every line of code you write is protecting someone's rights. Welcome.

## Quick Start

```bash
git clone https://github.com/paramminhas5/Pothole.git
cd Pothole
npm install
cp .env.local.example .env.local  # Add your Supabase keys
npm run dev                        # http://localhost:3000
npm run check                      # lint + typecheck + test + build
```

## What We Need

### P0 — Security (before public launch)
- [ ] Supabase RLS policy rewrite (prevent session_id leaks)
- [ ] Replace shared admin secret with role-based auth + MFA
- [ ] Data retention jobs (actually delete expired posts)
- [ ] OTP flow fix (hash + single-use + expire)

### P1 — Core Features
- [ ] MapLibre GL integration (replace CSS map with real tiles)
- [ ] WebPush notifications + SMS alerts (Twilio)
- [ ] i18n extraction (strings → message files)
- [ ] Search (across resources, demands, groups)
- [ ] Community translation interface
- [ ] RTI auto-escalation (30-day timer → appeal → CIC)

### P2 — Growth
- [ ] Tor hidden service (.onion mirror)
- [ ] IPFS static export
- [ ] Client-side encrypted evidence vault
- [ ] Regional languages (Tamil, Bengali, Marathi, Telugu)
- [ ] SMS/IVR interface for feature phones
- [ ] WCAG 2.2 AA accessibility audit

## Workflow

1. **Pick an issue** — Check [GitHub Issues](https://github.com/paramminhas5/Pothole/issues) or the list above
2. **Fork & branch** — `feat/your-feature` or `fix/your-fix`
3. **Build** — Follow code standards below
4. **Test** — `npm run check` must pass (zero errors)
5. **PR** — Describe what, why, and what was tested
6. **Review** — We respond within 48 hours
7. **Ship** — Merged PRs auto-deploy

## Code Standards

### TypeScript
- Strict mode, no `any`
- Explicit return types on exported functions
- Use `src/lib/validation.ts` for all input validation

### Bilingual
- Every user-facing string must have English AND Hindi
- Use the `hi` variable pattern (see any existing page)
- `const hi = locale === 'hi';` then `{hi ? 'हिंदी' : 'English'}`

### Accessibility
- Semantic HTML (`<section>`, `<nav>`, `<article>`, not `<div>` for everything)
- ARIA labels on interactive elements
- Keyboard navigable (tab order, focus visible)
- Minimum 48px touch targets
- Test with screen reader if possible

### Security (Non-Negotiable)
- **Never** expose `session_id`, tokens, or secrets in API responses
- **Never** use `.select('*')` — always explicit field lists
- **Never** trust client input — validate server-side
- **Never** present unverified data as "verified"
- **Never** store raw secrets — hash everything
- **Never** log sensitive data (emails, OTPs, session tokens)

### Performance
- Target: <100KB initial JS bundle
- Server-render all static content
- Lazy-load maps, charts, heavy components
- Test on 2G simulation + low-end Android

### Offline
- Core guides must work without internet
- Service worker caches all guide pages
- Clear online/offline indicator for users
- Never cache private/authenticated API responses

## Architecture

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/                # Server-side API routes
│   ├── [page]/             # Each route = one feature
│   └── layout.tsx          # Root layout + nav + footer
├── components/             # Shared React components
├── lib/                    # Server utilities
│   ├── constants.ts        # Shared constants
│   ├── validation.ts       # Input validation
│   ├── session.ts          # Cookie-based session (HMAC-signed)
│   ├── rate-limit.ts       # Rate limiting via Supabase RPC
│   ├── supabase.ts         # Public (anon) Supabase client
│   └── supabase-server.ts  # Service-role client (server only!)
├── types/                  # TypeScript interfaces
└── i18n/                   # (planned) Message files
```

## Deployment

- **Primary:** Vercel (auto-deploys from `feat/stage-1-platform` branch)
- **Mirrors:** Cloudflare Pages, self-hosted VPS, IPFS
- **Database:** Supabase Cloud (PostgreSQL)
- **Domains:** Managed via Cloudflare/Njalla

## License

AGPL-3.0 — Use it, fork it, improve it. But share your improvements.

## Code of Conduct

- Be kind. Many contributors are at personal risk.
- No harassment, doxxing, or discrimination.
- Critique code, not people.
- If you see something unsafe in the code, report it privately first.
- We prioritize safety over speed, always.

## Questions?

- Open a [GitHub Discussion](https://github.com/paramminhas5/Pothole/discussions)
- Or reach out to the maintainer via the repo

---

**Remember: this platform exists because people need it RIGHT NOW. Speed matters, but safety matters more. Ship fast, ship safe.**
