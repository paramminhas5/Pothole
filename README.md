# Sahayata — Civic Mutual-Aid & Coordination Platform

A civic mutual-aid platform connecting people who need help with people who can give it. Built for the Indian protest movement coordination.

## What This Is

Sahayata is civic mutual-aid infrastructure — like a disaster-relief coordination tool, applied to community organizing. It answers three questions:
- **Where do I plug in?** → Chapter Directory
- **What's needed, and what can I offer?** → Needs & Offers Board
- **What's actually true right now?** → (Stage 2+)

## What This Is NOT

- Not a political party
- Not affiliated with any party
- Not a fundraising vehicle
- Not designed to evade lawful authority

## Features (Stage 1)

- **Chapter/Support Group Directory** — Public, filterable listing of active local groups
- **Needs ↔ Offers Board** — Post needs or offers, filter by city/category/urgency
- **Contact Relay** — Private contact forwarding (no public phone numbers)
- **Moderation Queue** — All submissions reviewed before going public
- **Rate Limiting** — Per-session rate limits to prevent spam
- **Privacy by Design** — No real names, city/area only, auto-expiry (72h)
- **Multilingual** — English + Hindi from day one
- **PWA** — Installable, offline-capable for critical content
- **Report System** — Report inappropriate content

## Tech Stack

- **Framework:** Next.js 15 + React 19 + TypeScript
- **Styling:** Tailwind CSS 4
- **Backend:** Supabase (Postgres + REST API + Auth)
- **Deployment:** Vercel + Supabase Cloud
- **PWA:** Service Worker + Web App Manifest

## Getting Started

### Prerequisites
- Node.js 18+
- A Supabase project (free tier works)

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy environment variables:
   ```bash
   cp .env.local.example .env.local
   ```
4. Update `.env.local` with your Supabase credentials
5. Run the database migration in your Supabase SQL editor (see `supabase/migrations/001_initial_schema.sql`)
6. Start the dev server:
   ```bash
   npm run dev
   ```

### Admin / Moderation

- Access moderation queue at `/admin`
- Set `ADMIN_SECRET` in `.env.local` (used as the login password)
- Default dev secret: `admin-dev-secret`

## Privacy Design

- No real names required anywhere
- City/area only (fixed dropdown list, never precise addresses)
- No public phone numbers (contact relay only)
- Posts auto-expire in 72 hours
- Session-based rate limiting (no login required to browse)
- No third-party trackers or analytics pixels
- Designed so a database leak hurts no one

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Root layout
│   ├── directory/            # Chapter directory
│   ├── board/                # Needs & Offers board
│   ├── submit-chapter/       # Chapter submission form
│   ├── create-post/          # Post creation form
│   ├── admin/                # Moderation queue
│   └── api/
│       ├── chapters/         # Chapter CRUD
│       ├── posts/            # Post CRUD + respond relay
│       ├── reports/          # Report submission
│       └── admin/            # Admin moderation endpoints
├── components/               # Shared UI components
├── i18n/                     # Translations (en, hi)
├── lib/                      # Utilities (supabase, rate-limit, constants)
└── types/                    # TypeScript type definitions
supabase/
└── migrations/               # SQL schema migrations
public/
├── manifest.json             # PWA manifest
├── sw.js                     # Service worker
└── icons/                    # App icons
```

## Deployment

### Vercel
1. Connect your GitHub repo to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy

### Supabase
1. Create a Supabase project
2. Run the SQL migration in the SQL Editor
3. Copy the project URL and anon key to your environment variables

## Contributing

All new chapters and posts go through moderation before going public. This is by design — trust is the product.

## License

MIT
