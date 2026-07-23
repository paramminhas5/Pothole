# Sahayata — Civic Coordination Prototype

> **Launch status: private prototype.** This repository is not production-ready and must not be used for emergencies, legal or medical support, sensitive organizing, or verified referrals.

Sahayata explores directory and needs/offers workflows for civic coordination in India. The current implementation is for engineering and content review only.

## Current boundaries

- Directory and board entries are submissions or synthetic fixtures, not verified services.
- Groups and alerts are disabled because their authorization and operating workflows are incomplete.
- Safety, legal, medical, resource, and digital-security material is withheld or marked as pending qualified India-specific review.
- The service worker caches only the public manifest and app icons. It does not cache pages, APIs, alerts, directory data, posts, or private content.
- The application does not promise realtime delivery, push notifications, encryption, anonymity, automatic deletion, private contact handling, mirror failover, or emergency response.
- Existing authentication, authorization, moderation, retention, and privacy controls require P0 remediation before any public pilot.

## Tech stack

- Next.js 16, React 19, and TypeScript
- Tailwind CSS 4
- Supabase/Postgres
- Web app manifest and a public-static-assets-only service worker

## Local setup

### Prerequisites

- Node.js 18 or later
- A disposable local or development Supabase project

### Run the app

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Set the development Supabase values in `.env.local`, then apply the migrations in `supabase/migrations/` in order.

### Optional synthetic fixtures

`supabase/seed.sql` contains only unmistakably synthetic, low-stakes UI fixtures. It is blocked by default. Never run it in production or against a database containing real data.

To use it in a disposable local database, set this in the same database session before executing the seed file:

```sql
SET app.allow_synthetic_seed = 'on';
```

All fixture names contain `EXAMPLE` or `SYNTHETIC FIXTURE`, and all fixture contacts use reserved invalid domains.

## Review before deployment

Before any pilot, complete the P0 work described in `docs/WORLD_CLASS_CIVIC_PLATFORM_IMPLEMENTATION_PLAN.md`, including authorization boundaries, moderation operations, data retention, content review, accessibility, security testing, and incident response.

## Project structure

```text
src/app/             Pages and API routes
src/components/      Shared UI components
src/lib/             Application utilities
supabase/migrations/ Database migrations
supabase/seed.sql    Explicitly enabled synthetic local fixtures
public/              Manifest, icons, and service worker
```

## License

MIT
