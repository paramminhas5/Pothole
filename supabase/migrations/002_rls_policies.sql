-- ============================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================
-- These control what the anonymous/public client can access.
-- The service-role client bypasses RLS entirely.
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE pow_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE otp_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE verified_sessions ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- POSTS: Public can read approved, unexpired posts (limited fields)
-- ============================================================
CREATE POLICY "Public can read approved posts"
  ON posts FOR SELECT
  USING (
    status = 'approved'
    AND expires_at > now()
    AND resolved = FALSE
  );

-- ============================================================
-- CHAPTERS: Public can read approved chapters
-- ============================================================
CREATE POLICY "Public can read approved chapters"
  ON chapters FOR SELECT
  USING (status = 'approved');

-- ============================================================
-- POW_CHALLENGES: Public can read unconsumed challenges
-- ============================================================
CREATE POLICY "Public can read active challenges"
  ON pow_challenges FOR SELECT
  USING (
    consumed = FALSE
    AND expires_at > now()
  );

-- ============================================================
-- ALL OTHER TABLES: No public access (service-role only)
-- ============================================================
-- contact_responses: PRIVATE (only via service-role for post owner)
-- reports: PRIVATE (only via service-role for moderation)
-- rate_limits: PRIVATE (only via service-role)
-- otp_codes: PRIVATE (only via service-role)
-- verified_sessions: PRIVATE (only via service-role)

-- Note: The server API routes use the SERVICE ROLE client
-- which bypasses RLS. This is intentional — the API routes
-- handle authorization logic in application code.
