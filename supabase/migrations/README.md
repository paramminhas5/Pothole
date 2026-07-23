# Database Migrations

## How to Run

1. Go to your Supabase Dashboard → SQL Editor → New Query
2. Run the files **in order**:
   - `001_foundation.sql` — Creates all tables and indexes
   - `002_rls_policies.sql` — Sets up Row Level Security
   - `003_functions.sql` — Creates database functions (OTP, rate limiting)

## What Gets Created

| Table | Purpose |
|-------|---------|
| `posts` | Needs & offers on the board |
| `chapters` | Groups / organizations |
| `contact_responses` | Private responses to posts |
| `reports` | Content flags |
| `pow_challenges` | Proof-of-work spam prevention |
| `rate_limits` | Request throttling |
| `otp_codes` | Email verification codes |
| `verified_sessions` | Authenticated sessions |

## After Running Migrations

Set these environment variables (in `.env.local` for dev, Vercel dashboard for prod):

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SESSION_SIGNING_SECRET=any-random-32-character-string
ADMIN_SECRET=any-random-24-character-string
```

Get your Supabase keys from: Dashboard → Settings → API

## Security Notes

- The `anon key` is safe to expose (it's in the browser)
- The `service role key` is **SECRET** — server-only, never in client code
- RLS ensures the anon key can only read approved public data
- All writes go through API routes using the service-role client
