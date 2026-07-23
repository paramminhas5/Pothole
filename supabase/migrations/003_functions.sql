-- ============================================================
-- DATABASE FUNCTIONS
-- ============================================================
-- Called by the application via supabase.rpc()
-- ============================================================

-- ============================================================
-- Issue OTP Code (called by /api/auth/send-code)
-- Returns the OTP ID if successful, NULL if rate-limited
-- ============================================================
CREATE OR REPLACE FUNCTION issue_otp_code(
  p_email_hash TEXT,
  p_code_hash TEXT,
  p_expires_at TIMESTAMPTZ,
  p_min_interval_seconds INTEGER DEFAULT 60
)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_last_created TIMESTAMPTZ;
  v_id UUID;
BEGIN
  -- Check minimum interval between OTP sends
  SELECT created_at INTO v_last_created
  FROM otp_codes
  WHERE email_hash = p_email_hash
  ORDER BY created_at DESC
  LIMIT 1;

  IF v_last_created IS NOT NULL
     AND v_last_created > (now() - (p_min_interval_seconds || ' seconds')::INTERVAL) THEN
    RETURN NULL; -- Rate limited
  END IF;

  -- Delete old codes for this email
  DELETE FROM otp_codes WHERE email_hash = p_email_hash;

  -- Insert new code
  INSERT INTO otp_codes (email_hash, code_hash, expires_at)
  VALUES (p_email_hash, p_code_hash, p_expires_at)
  RETURNING id INTO v_id;

  RETURN v_id::TEXT;
END;
$$;

-- ============================================================
-- Consume OTP and Create Session (called by /api/auth/verify)
-- Returns TRUE if verification succeeded
-- ============================================================
CREATE OR REPLACE FUNCTION consume_otp_and_create_session(
  p_email_hash TEXT,
  p_code_hash TEXT,
  p_max_attempts INTEGER DEFAULT 5,
  p_session_id TEXT DEFAULT NULL,
  p_email TEXT DEFAULT NULL,
  p_session_expires_at TIMESTAMPTZ DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_otp RECORD;
BEGIN
  -- Find the matching OTP
  SELECT * INTO v_otp
  FROM otp_codes
  WHERE email_hash = p_email_hash
    AND expires_at > now()
  ORDER BY created_at DESC
  LIMIT 1;

  IF v_otp IS NULL THEN
    RETURN FALSE; -- No valid OTP found
  END IF;

  -- Check max attempts
  IF v_otp.attempts >= p_max_attempts THEN
    DELETE FROM otp_codes WHERE id = v_otp.id;
    RETURN FALSE;
  END IF;

  -- Increment attempts
  UPDATE otp_codes SET attempts = attempts + 1 WHERE id = v_otp.id;

  -- Check code
  IF v_otp.code_hash != p_code_hash THEN
    RETURN FALSE; -- Wrong code
  END IF;

  -- Code is correct — consume it
  DELETE FROM otp_codes WHERE id = v_otp.id;

  -- Create verified session if session info provided
  IF p_session_id IS NOT NULL AND p_email IS NOT NULL AND p_session_expires_at IS NOT NULL THEN
    -- Remove old sessions for this email
    DELETE FROM verified_sessions WHERE email = p_email;

    INSERT INTO verified_sessions (session_id, email, expires_at)
    VALUES (p_session_id, p_email, p_session_expires_at);
  END IF;

  RETURN TRUE;
END;
$$;

-- ============================================================
-- Consume Rate Limit (called by rate-limit.ts)
-- Returns current count and whether the request is allowed
-- ============================================================
CREATE OR REPLACE FUNCTION consume_rate_limit(
  p_key TEXT,
  p_bucket TEXT,
  p_max_count INTEGER,
  p_window_seconds INTEGER
)
RETURNS TABLE (current_count INTEGER, allowed BOOLEAN)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_record RECORD;
  v_window_start TIMESTAMPTZ;
BEGIN
  v_window_start := now() - (p_window_seconds || ' seconds')::INTERVAL;

  -- Try to get existing record
  SELECT * INTO v_record
  FROM rate_limits
  WHERE key = p_key AND bucket = p_bucket;

  IF v_record IS NULL THEN
    -- First request in this window
    INSERT INTO rate_limits (key, bucket, count, window_start)
    VALUES (p_key, p_bucket, 1, now());
    RETURN QUERY SELECT 1, TRUE;
  ELSIF v_record.window_start < v_window_start THEN
    -- Window expired, reset
    UPDATE rate_limits
    SET count = 1, window_start = now()
    WHERE key = p_key AND bucket = p_bucket;
    RETURN QUERY SELECT 1, TRUE;
  ELSE
    -- Within window, increment
    UPDATE rate_limits
    SET count = count + 1
    WHERE key = p_key AND bucket = p_bucket;
    RETURN QUERY SELECT (v_record.count + 1)::INTEGER, (v_record.count + 1 <= p_max_count);
  END IF;
END;
$$;
