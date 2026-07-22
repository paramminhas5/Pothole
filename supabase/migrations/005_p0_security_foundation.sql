-- P0 backend security foundation: least privilege, atomic abuse controls, OTPs, and audit writes.

-- Private server-managed state.
CREATE TABLE IF NOT EXISTS otp_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email_hash TEXT NOT NULL UNIQUE,
  code_hash TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  attempt_count INTEGER NOT NULL DEFAULT 0 CHECK (attempt_count >= 0),
  consumed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_otp_codes_expiry ON otp_codes(expires_at);

CREATE TABLE IF NOT EXISTS verified_sessions (
  session_id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  verified_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_verified_sessions_expiry ON verified_sessions(expires_at);

CREATE TABLE IF NOT EXISTS pow_challenges (
  challenge_hash TEXT PRIMARY KEY,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_pow_challenges_expiry ON pow_challenges(expires_at);
CREATE INDEX IF NOT EXISTS idx_rate_limits_created_at ON rate_limits(created_at);

ALTER TABLE otp_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE verified_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE pow_challenges ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE otp_codes, verified_sessions, pow_challenges FROM PUBLIC, anon, authenticated;

-- Remove permissive policies. All mutations now pass through validated service routes.
DROP POLICY IF EXISTS "Anyone can submit chapters" ON chapters;
DROP POLICY IF EXISTS "Anyone can create posts" ON posts;
DROP POLICY IF EXISTS "Users can read own posts" ON posts;
DROP POLICY IF EXISTS "Anyone can create responses" ON contact_responses;
DROP POLICY IF EXISTS "Anyone can create reports" ON reports;
DROP POLICY IF EXISTS "Anyone can insert rate limits" ON rate_limits;
DROP POLICY IF EXISTS "Anyone can create groups" ON groups;
DROP POLICY IF EXISTS "Anyone can read group members" ON group_members;
DROP POLICY IF EXISTS "Anyone can join groups" ON group_members;
DROP POLICY IF EXISTS "Anyone can read vouches" ON vouches;
DROP POLICY IF EXISTS "Anyone can read approved chapters" ON chapters;
DROP POLICY IF EXISTS "Anyone can read approved posts" ON posts;
DROP POLICY IF EXISTS "Anyone can read active groups" ON groups;
DROP POLICY IF EXISTS "Anyone can read alerts" ON alerts;

-- Remove inherited table privileges, then expose only explicit public DTO columns.
REVOKE ALL ON TABLE chapters, posts, contact_responses, reports, rate_limits, moderation_log,
  groups, group_members, alerts, vouches FROM anon, authenticated;
REVOKE ALL ON TABLE chapters_with_trust, posts_with_trust FROM anon, authenticated;

GRANT SELECT (id, name, city, area, categories, contact_method, description, updated_at)
  ON TABLE chapters TO anon, authenticated;
GRANT SELECT (id, type, category, city, area, description, urgency, expires_at, created_at)
  ON TABLE posts TO anon, authenticated;
GRANT SELECT (id, name, city, area, description, coordinator_chapter_id,
  checkin_interval_minutes, max_members, status, created_at, updated_at)
  ON TABLE groups TO anon, authenticated;
GRANT SELECT (id, title, body, city, area, urgency, chapter_id, verified, created_at, expires_at)
  ON TABLE alerts TO anon, authenticated;

CREATE POLICY "Public reads approved chapter DTOs" ON chapters
  FOR SELECT TO anon, authenticated USING (status = 'approved');
CREATE POLICY "Public reads active post DTOs" ON posts
  FOR SELECT TO anon, authenticated
  USING (status = 'approved' AND resolved = FALSE AND expires_at > NOW());
CREATE POLICY "Public reads active group DTOs" ON groups
  FOR SELECT TO anon, authenticated USING (status = 'active');
CREATE POLICY "Public reads active alert DTOs" ON alerts
  FOR SELECT TO anon, authenticated
  USING (archived = FALSE AND verified = TRUE AND expires_at > NOW());

-- Group membership is intentionally not publicly enumerable or writable. There is not yet
-- an authenticated membership capability model, so group/member mutations remain disabled.

-- Realtime previously published sensitive owner/session, coordinator, invitation, and
-- membership columns. Disable these publications until dedicated public views exist.
-- Publication membership can drift in restored or partially migrated projects.
-- Guard removals so this migration remains recoverable.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'group_members'
  ) THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime DROP TABLE public.group_members';
  END IF;
  IF EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'alerts'
  ) THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime DROP TABLE public.alerts';
  END IF;
END
$$;

-- Atomic, service-only rate-limit check + record.
CREATE OR REPLACE FUNCTION consume_rate_limit(
  p_identifier TEXT,
  p_action_type TEXT,
  p_limit INTEGER,
  p_window_seconds INTEGER
) RETURNS TABLE(allowed BOOLEAN, remaining INTEGER)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp AS $$
DECLARE
  v_used INTEGER;
BEGIN
  IF p_identifier IS NULL OR length(p_identifier) > 200
     OR p_action_type IS NULL OR length(p_action_type) > 80
     OR p_limit < 1 OR p_limit > 10000
     OR p_window_seconds < 1 OR p_window_seconds > 2592000 THEN
    RAISE EXCEPTION 'invalid rate limit parameters';
  END IF;

  PERFORM pg_advisory_xact_lock(hashtextextended(p_identifier || ':' || p_action_type, 0));
  IF random() < 0.01 THEN
    DELETE FROM rate_limits WHERE created_at < NOW() - INTERVAL '30 days';
  END IF;
  DELETE FROM rate_limits
    WHERE session_id = p_identifier AND action_type = p_action_type
      AND created_at < NOW() - make_interval(secs => p_window_seconds);
  SELECT COUNT(*)::INTEGER INTO v_used FROM rate_limits
    WHERE session_id = p_identifier AND action_type = p_action_type
      AND created_at >= NOW() - make_interval(secs => p_window_seconds);

  IF v_used >= p_limit THEN
    RETURN QUERY SELECT FALSE, 0;
    RETURN;
  END IF;
  INSERT INTO rate_limits(session_id, action_type) VALUES (p_identifier, p_action_type);
  RETURN QUERY SELECT TRUE, GREATEST(0, p_limit - v_used - 1);
END;
$$;

-- Signed proof-of-work challenges are recorded only after successful verification;
-- the unique hash makes replay consumption atomic without issuance-time writes.
CREATE OR REPLACE FUNCTION consume_pow_challenge(p_challenge_hash TEXT)
RETURNS BOOLEAN LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp AS $$
DECLARE v_hash TEXT;
BEGIN
  DELETE FROM pow_challenges WHERE expires_at <= NOW();
  INSERT INTO pow_challenges(challenge_hash, expires_at)
    VALUES (p_challenge_hash, NOW() + INTERVAL '5 minutes')
    ON CONFLICT (challenge_hash) DO NOTHING
    RETURNING challenge_hash INTO v_hash;
  RETURN v_hash IS NOT NULL;
END;
$$;

-- OTP issuance is serialized per email and has a minimum resend interval, preventing
-- concurrent sends from silently replacing a code that was already delivered.
CREATE OR REPLACE FUNCTION issue_otp_code(
  p_email_hash TEXT,
  p_code_hash TEXT,
  p_expires_at TIMESTAMPTZ,
  p_min_interval_seconds INTEGER DEFAULT 60
) RETURNS UUID
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp AS $$
DECLARE v_id UUID; v_last_created TIMESTAMPTZ;
BEGIN
  IF p_expires_at <= NOW() OR p_expires_at > NOW() + INTERVAL '15 minutes'
     OR p_min_interval_seconds < 1 OR p_min_interval_seconds > 600 THEN
    RETURN NULL;
  END IF;
  PERFORM pg_advisory_xact_lock(hashtextextended('otp:' || p_email_hash, 0));
  DELETE FROM otp_codes WHERE expires_at <= NOW();
  DELETE FROM verified_sessions WHERE expires_at <= NOW();
  SELECT created_at INTO v_last_created FROM otp_codes WHERE email_hash = p_email_hash;
  IF v_last_created IS NOT NULL
     AND v_last_created > NOW() - make_interval(secs => p_min_interval_seconds) THEN
    RETURN NULL;
  END IF;
  INSERT INTO otp_codes(email_hash, code_hash, expires_at, attempt_count, consumed_at, created_at)
    VALUES (p_email_hash, p_code_hash, p_expires_at, 0, NULL, NOW())
    ON CONFLICT (email_hash) DO UPDATE SET
      code_hash = EXCLUDED.code_hash,
      expires_at = EXCLUDED.expires_at,
      attempt_count = 0,
      consumed_at = NULL,
      created_at = NOW()
    RETURNING id INTO v_id;
  RETURN v_id;
END;
$$;

-- OTP comparison, attempt accounting, one-time consumption, and creation of the
-- associated private notification session commit in one transaction.
CREATE OR REPLACE FUNCTION consume_otp_and_create_session(
  p_email_hash TEXT,
  p_code_hash TEXT,
  p_max_attempts INTEGER,
  p_session_id TEXT,
  p_email TEXT,
  p_session_expires_at TIMESTAMPTZ
) RETURNS BOOLEAN
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp AS $$
DECLARE v_code otp_codes%ROWTYPE;
BEGIN
  IF p_max_attempts < 1 OR p_max_attempts > 20 OR length(p_session_id) > 100
     OR length(p_email) > 254 OR p_session_expires_at <= NOW()
     OR p_session_expires_at > NOW() + INTERVAL '8 days' THEN
    RETURN FALSE;
  END IF;
  SELECT * INTO v_code FROM otp_codes WHERE email_hash = p_email_hash FOR UPDATE;
  IF NOT FOUND OR v_code.consumed_at IS NOT NULL OR v_code.expires_at <= NOW()
     OR v_code.attempt_count >= p_max_attempts THEN
    RETURN FALSE;
  END IF;
  UPDATE otp_codes SET attempt_count = attempt_count + 1 WHERE id = v_code.id;
  IF v_code.code_hash <> p_code_hash THEN RETURN FALSE; END IF;
  INSERT INTO verified_sessions(session_id, email, verified_at, expires_at)
    VALUES (p_session_id, p_email, NOW(), p_session_expires_at)
    ON CONFLICT (session_id) DO UPDATE SET
      email = EXCLUDED.email,
      verified_at = EXCLUDED.verified_at,
      expires_at = EXCLUDED.expires_at;
  UPDATE otp_codes SET consumed_at = NOW() WHERE id = v_code.id AND consumed_at IS NULL;
  RETURN FOUND;
END;
$$;

-- Moderation state and audit record are committed atomically.
CREATE OR REPLACE FUNCTION moderate_content(
  p_target_type TEXT,
  p_target_id UUID,
  p_new_status TEXT,
  p_moderator TEXT DEFAULT 'admin'
) RETURNS BOOLEAN
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp AS $$
DECLARE v_updated INTEGER;
BEGIN
  IF p_new_status NOT IN ('approved', 'rejected') THEN RETURN FALSE; END IF;
  IF p_target_type = 'post' THEN
    UPDATE posts SET status = p_new_status WHERE id = p_target_id AND status = 'pending';
  ELSIF p_target_type = 'chapter' THEN
    UPDATE chapters SET status = p_new_status WHERE id = p_target_id AND status = 'pending';
  ELSE
    RETURN FALSE;
  END IF;
  GET DIAGNOSTICS v_updated = ROW_COUNT;
  IF v_updated <> 1 THEN RETURN FALSE; END IF;
  INSERT INTO moderation_log(target_type, target_id, action, moderator)
    VALUES (p_target_type, p_target_id, p_new_status, left(p_moderator, 100));
  RETURN TRUE;
END;
$$;

CREATE OR REPLACE FUNCTION increment_post_report_count(p_post_id UUID)
RETURNS VOID LANGUAGE sql SECURITY DEFINER SET search_path = public, pg_temp AS $$
  UPDATE posts SET reported_count = COALESCE(reported_count, 0) + 1 WHERE id = p_post_id;
$$;

REVOKE ALL ON FUNCTION consume_rate_limit(TEXT, TEXT, INTEGER, INTEGER) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION consume_pow_challenge(TEXT) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION issue_otp_code(TEXT, TEXT, TIMESTAMPTZ, INTEGER) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION consume_otp_and_create_session(TEXT, TEXT, INTEGER, TEXT, TEXT, TIMESTAMPTZ) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION moderate_content(TEXT, UUID, TEXT, TEXT) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION increment_post_report_count(UUID) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION consume_rate_limit(TEXT, TEXT, INTEGER, INTEGER) TO service_role;
GRANT EXECUTE ON FUNCTION consume_pow_challenge(TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION issue_otp_code(TEXT, TEXT, TIMESTAMPTZ, INTEGER) TO service_role;
GRANT EXECUTE ON FUNCTION consume_otp_and_create_session(TEXT, TEXT, INTEGER, TEXT, TEXT, TIMESTAMPTZ) TO service_role;
GRANT EXECUTE ON FUNCTION moderate_content(TEXT, UUID, TEXT, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION increment_post_report_count(UUID) TO service_role;
