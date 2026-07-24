# Sahayata — Complete Setup Guide

## What you need running

### 1. Supabase (you have this ✓)

You've run `SETUP.sql` once. Now run the v2 migration:

```sql
-- Paste the contents of supabase/migrations/002_sahayata_os_v2.sql
-- into Supabase SQL Editor and run it.
-- This adds: groups v2, directory v2, exchange, news, report card,
-- know the system, campaigns v2, RTI filings, civic profiles, notifications
```

### 2. Environment Variables (Vercel)

You need these set in Vercel → Settings → Environment Variables:

| Variable | Where to get it | Required? |
|----------|----------------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Settings → API | ✓ Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → Settings → API | ✓ Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard → Settings → API (service_role) | ✓ Yes (you have this) |
| `SESSION_SIGNING_SECRET` | Generate one (see below) | ✓ Yes (you're missing this) |
| `ADMIN_SECRET` | Any 24+ character random string | ✓ Yes |
| `RESEND_API_KEY` | resend.com (free: 100 emails/day) | Optional (for OTP emails) |
| `FROM_EMAIL` | Your domain email | Optional |
| `NEXT_PUBLIC_BASE_URL` | Your Vercel deployment URL | Optional (for server-side fetches) |

### 3. Generate SESSION_SIGNING_SECRET

Run this in your terminal (or any Node.js console):

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

This gives you a 64-character hex string. Paste it as `SESSION_SIGNING_SECRET` in Vercel.

**What it does:** Signs session cookies so they can't be forged. Without this, all auth is broken.

### 4. Generate ADMIN_SECRET

```bash
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

32-character string. Used to log into the admin panel at `/admin`.

### 5. Local Development (.env.local)

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SESSION_SIGNING_SECRET=your-64-char-hex-from-step-3
ADMIN_SECRET=your-32-char-hex-from-step-4
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 6. Verify Everything Works

After setting env vars, test:

```bash
npm run dev
# Visit http://localhost:3000
# Try: click "Start a Campaign" — should show the form
# Try: click "Start a Group" — should show creation form
# If you get 503 errors in console → env vars are wrong
```

### 7. SQL to Run (after SETUP.sql)

Run in Supabase SQL Editor in this order:

1. `supabase/migrations/002_sahayata_os_v2.sql` — Core v2 schema
2. Any future migrations in numerical order

### 8. Seed Data (optional, for testing)

After migrations, if you want sample data to test with, I can generate a seed file. But per our principle: "real data or no data" — empty states should work cleanly.

---

## Architecture Quick Reference

```
Browser → Next.js API Routes → Supabase (service_role key)
                                    ↓
                              PostgreSQL (RLS policies)
                                    ↓
                              Returns data → API transforms to DTO → Browser
```

- **Public reads:** Use anon key + RLS policies (safe for client-side)
- **Writes/auth:** Use service_role key (server-only, never exposed)
- **Session:** Signed cookie (SESSION_SIGNING_SECRET)
- **Identity:** Passphrase hash → `identities` table → session binding
