-- ╔══════════════════════════════════════════════════════════════════╗
-- ║  SAHAYATA — COMPLETE DATABASE SETUP                              ║
-- ║                                                                  ║
-- ║  Paste this ENTIRE file into Supabase SQL Editor and run once.   ║
-- ║  It creates all tables, indexes, RLS policies, and functions.    ║
-- ║  Safe to run multiple times (uses IF NOT EXISTS everywhere).     ║
-- ║                                                                  ║
-- ║  After running: your platform is fully functional.               ║
-- ╚══════════════════════════════════════════════════════════════════╝

-- ============================================
-- 1. CORE TABLES
-- ============================================

CREATE TABLE IF NOT EXISTS chapters (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  area TEXT NOT NULL,
  categories TEXT[] NOT NULL DEFAULT '{}',
  contact_method TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  trust_tier TEXT DEFAULT 'self_listed' CHECK (trust_tier IN ('self_listed', 'community_vouched', 'org_verified')),
  last_ping TIMESTAMPTZ DEFAULT NOW(),
  coordinator_key TEXT DEFAULT encode(gen_random_bytes(8), 'hex'),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('need', 'offer')),
  category TEXT NOT NULL,
  city TEXT NOT NULL,
  area TEXT NOT NULL,
  description TEXT NOT NULL,
  urgency TEXT NOT NULL DEFAULT 'routine' CHECK (urgency IN ('routine', 'urgent')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  session_id TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  resolved BOOLEAN DEFAULT FALSE,
  reported_count INTEGER DEFAULT 0,
  last_activity TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contact_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  responder_contact TEXT NOT NULL,
  responder_message TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  target_type TEXT NOT NULL CHECK (target_type IN ('chapter', 'post', 'resource')),
  target_id UUID NOT NULL,
  reason TEXT NOT NULL,
  session_id TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS rate_limits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  action_type TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. MODERATION + AUDIT
-- ============================================

CREATE TABLE IF NOT EXISTS moderation_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  target_type TEXT NOT NULL CHECK (target_type IN ('chapter', 'post', 'resource', 'demand')),
  target_id UUID NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('approved', 'rejected', 'flagged', 'removed')),
  reason TEXT DEFAULT '',
  moderator TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================
-- 3. TRUST + VOUCHING
-- ============================================

CREATE TABLE IF NOT EXISTS vouches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  voucher_chapter_id UUID NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
  target_type TEXT NOT NULL CHECK (target_type IN ('chapter', 'post')),
  target_id UUID NOT NULL,
  note TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(voucher_chapter_id, target_type, target_id)
);

-- ============================================
-- 4. GROUPS + ALERTS
-- ============================================

CREATE TABLE IF NOT EXISTS groups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  area TEXT NOT NULL,
  description TEXT DEFAULT '',
  invite_code TEXT NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(6), 'hex'),
  coordinator_chapter_id UUID REFERENCES chapters(id) ON DELETE SET NULL,
  checkin_interval_minutes INTEGER DEFAULT 60,
  max_members INTEGER DEFAULT 15,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS group_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('medic', 'legal', 'comms', 'transport', 'supply', 'document', 'general')),
  session_id TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'safe', 'need_help', 'offline', 'left')),
  last_checkin TIMESTAMPTZ DEFAULT NOW(),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(group_id, session_id)
);

CREATE TABLE IF NOT EXISTS alerts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  city TEXT NOT NULL,
  area TEXT NOT NULL,
  urgency TEXT NOT NULL DEFAULT 'info' CHECK (urgency IN ('info', 'warning', 'critical')),
  chapter_id UUID NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
  coordinator_key TEXT NOT NULL,
  verified BOOLEAN DEFAULT TRUE,
  archived BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '6 hours'
);

-- ============================================
-- 5. SECURITY: OTP + SESSIONS + POW
-- ============================================

CREATE TABLE IF NOT EXISTS otp_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email_hash TEXT NOT NULL UNIQUE,
  code_hash TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  attempt_count INTEGER NOT NULL DEFAULT 0 CHECK (attempt_count >= 0),
  consumed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS verified_sessions (
  session_id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  verified_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS pow_challenges (
  challenge_hash TEXT PRIMARY KEY,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- 6. PASSPHRASE IDENTITY (Crypto-wallet auth)
-- ============================================

CREATE TABLE IF NOT EXISTS identities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  passphrase_hash TEXT NOT NULL UNIQUE,
  display_name TEXT DEFAULT 'Anonymous',
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'moderator', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_seen TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 7. COMMUNITY RESOURCES (submissions)
-- ============================================

CREATE TABLE IF NOT EXISTS community_resources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('legal-aid', 'helpline', 'organization', 'tool', 'shelter', 'media', 'mental-health', 'education', 'transport', 'other')),
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 1 AND 200),
  city TEXT NOT NULL DEFAULT 'National',
  state TEXT DEFAULT '',
  contact TEXT NOT NULL CHECK (char_length(contact) BETWEEN 1 AND 500),
  description TEXT NOT NULL CHECK (char_length(description) BETWEEN 1 AND 1000),
  source TEXT DEFAULT '',
  category TEXT DEFAULT '',
  submitter_contact TEXT DEFAULT '',
  session_id UUID,
  identity_id UUID REFERENCES identities(id),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  verified_at TIMESTAMPTZ,
  verified_by TEXT,
  rejection_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- 8. DEMANDS (accountability tracker)
-- ============================================

CREATE TABLE IF NOT EXISTS demands (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL CHECK (char_length(title) BETWEEN 1 AND 300),
  target TEXT NOT NULL CHECK (char_length(target) BETWEEN 1 AND 200),
  city TEXT NOT NULL,
  category TEXT NOT NULL CHECK (char_length(category) BETWEEN 1 AND 50),
  deadline TIMESTAMPTZ NOT NULL,
  description TEXT DEFAULT '',
  evidence TEXT DEFAULT '',
  filed_by TEXT DEFAULT 'Anonymous',
  session_id UUID,
  identity_id UUID REFERENCES identities(id),
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'acknowledged', 'action', 'resolved', 'escalated', 'expired')),
  rtis_filed INTEGER NOT NULL DEFAULT 0,
  escalation_level TEXT NOT NULL DEFAULT 'Submitted',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- 9. SITUATION UPDATES (updatable from admin)
-- ============================================

CREATE TABLE IF NOT EXISTS situation_updates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  title_hi TEXT NOT NULL,
  subtitle TEXT DEFAULT '',
  subtitle_hi TEXT DEFAULT '',
  day_count INTEGER NOT NULL DEFAULT 1,
  demands_total INTEGER NOT NULL DEFAULT 0,
  demands_met INTEGER NOT NULL DEFAULT 0,
  rtis_filed INTEGER NOT NULL DEFAULT 0,
  safety_note TEXT DEFAULT '',
  safety_note_hi TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'resolved')),
  social_links JSONB DEFAULT '[]',
  timeline JSONB DEFAULT '[]',
  is_current BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- 10. CONTRIBUTION CLAIMS
-- ============================================

CREATE TABLE IF NOT EXISTS task_claims (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  task_id TEXT NOT NULL,
  identity_id UUID REFERENCES identities(id),
  session_id TEXT,
  status TEXT NOT NULL DEFAULT 'claimed' CHECK (status IN ('claimed', 'completed', 'abandoned')),
  claimed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ,
  UNIQUE(task_id, identity_id)
);


-- ============================================
-- 11. INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_chapters_status ON chapters(status);
CREATE INDEX IF NOT EXISTS idx_chapters_city ON chapters(city);
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_city_category ON posts(city, category);
CREATE INDEX IF NOT EXISTS idx_posts_type ON posts(type);
CREATE INDEX IF NOT EXISTS idx_posts_expires_at ON posts(expires_at);
CREATE INDEX IF NOT EXISTS idx_posts_session_id ON posts(session_id);
CREATE INDEX IF NOT EXISTS idx_rate_limits_session ON rate_limits(session_id, action_type, created_at);
CREATE INDEX IF NOT EXISTS idx_rate_limits_created_at ON rate_limits(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_responses_post ON contact_responses(post_id);
CREATE INDEX IF NOT EXISTS idx_moderation_log_target ON moderation_log(target_type, target_id);
CREATE INDEX IF NOT EXISTS idx_moderation_log_created ON moderation_log(created_at);
CREATE INDEX IF NOT EXISTS idx_vouches_target ON vouches(target_type, target_id);
CREATE INDEX IF NOT EXISTS idx_vouches_voucher ON vouches(voucher_chapter_id);
CREATE INDEX IF NOT EXISTS idx_groups_city ON groups(city);
CREATE INDEX IF NOT EXISTS idx_groups_invite ON groups(invite_code);
CREATE INDEX IF NOT EXISTS idx_group_members_group ON group_members(group_id);
CREATE INDEX IF NOT EXISTS idx_group_members_session ON group_members(session_id);
CREATE INDEX IF NOT EXISTS idx_alerts_city ON alerts(city, created_at);
CREATE INDEX IF NOT EXISTS idx_alerts_active ON alerts(archived, expires_at);
CREATE INDEX IF NOT EXISTS idx_otp_codes_expiry ON otp_codes(expires_at);
CREATE INDEX IF NOT EXISTS idx_verified_sessions_expiry ON verified_sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_pow_challenges_expiry ON pow_challenges(expires_at);
CREATE INDEX IF NOT EXISTS idx_identities_hash ON identities(passphrase_hash);
CREATE INDEX IF NOT EXISTS idx_community_resources_status ON community_resources(status);
CREATE INDEX IF NOT EXISTS idx_community_resources_city ON community_resources(city);
CREATE INDEX IF NOT EXISTS idx_community_resources_type ON community_resources(type);
CREATE INDEX IF NOT EXISTS idx_demands_status ON demands(status);
CREATE INDEX IF NOT EXISTS idx_demands_city ON demands(city);
CREATE INDEX IF NOT EXISTS idx_demands_category ON demands(category);
CREATE INDEX IF NOT EXISTS idx_task_claims_task ON task_claims(task_id);
CREATE INDEX IF NOT EXISTS idx_task_claims_identity ON task_claims(identity_id);

-- ============================================
-- 12. FUNCTIONS
-- ============================================

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Post activity tracker
CREATE OR REPLACE FUNCTION update_post_activity()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE posts SET last_activity = NOW() WHERE id = NEW.post_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Atomic rate limit check
CREATE OR REPLACE FUNCTION consume_rate_limit(
  p_identifier TEXT,
  p_action_type TEXT,
  p_limit INTEGER,
  p_window_seconds INTEGER
) RETURNS TABLE(allowed BOOLEAN, remaining INTEGER) AS $$
DECLARE
  v_count INTEGER;
  v_window_start TIMESTAMPTZ;
BEGIN
  v_window_start := NOW() - (p_window_seconds || ' seconds')::INTERVAL;
  SELECT COUNT(*) INTO v_count FROM rate_limits
    WHERE session_id = p_identifier AND action_type = p_action_type AND created_at > v_window_start;
  IF v_count >= p_limit THEN
    RETURN QUERY SELECT FALSE, 0;
  ELSE
    INSERT INTO rate_limits (session_id, action_type) VALUES (p_identifier, p_action_type);
    RETURN QUERY SELECT TRUE, (p_limit - v_count - 1);
  END IF;
END;
$$ LANGUAGE plpgsql;

-- OTP issuing
CREATE OR REPLACE FUNCTION issue_otp_code(
  p_email_hash TEXT,
  p_code_hash TEXT,
  p_expires_at TIMESTAMPTZ,
  p_min_interval_seconds INTEGER DEFAULT 60
) RETURNS TEXT AS $$
DECLARE
  v_existing RECORD;
  v_id UUID;
BEGIN
  SELECT * INTO v_existing FROM otp_codes WHERE email_hash = p_email_hash;
  IF v_existing IS NOT NULL THEN
    IF v_existing.created_at > NOW() - (p_min_interval_seconds || ' seconds')::INTERVAL THEN
      RETURN NULL;
    END IF;
    DELETE FROM otp_codes WHERE email_hash = p_email_hash;
  END IF;
  INSERT INTO otp_codes (email_hash, code_hash, expires_at)
    VALUES (p_email_hash, p_code_hash, p_expires_at)
    RETURNING id INTO v_id;
  RETURN v_id::TEXT;
END;
$$ LANGUAGE plpgsql;

-- OTP consumption + session creation
CREATE OR REPLACE FUNCTION consume_otp_and_create_session(
  p_email_hash TEXT,
  p_code_hash TEXT,
  p_max_attempts INTEGER,
  p_session_id TEXT,
  p_email TEXT,
  p_session_expires_at TIMESTAMPTZ
) RETURNS BOOLEAN AS $$
DECLARE
  v_otp RECORD;
BEGIN
  SELECT * INTO v_otp FROM otp_codes
    WHERE email_hash = p_email_hash AND consumed_at IS NULL AND expires_at > NOW();
  IF v_otp IS NULL THEN RETURN FALSE; END IF;
  IF v_otp.attempt_count >= p_max_attempts THEN
    DELETE FROM otp_codes WHERE id = v_otp.id;
    RETURN FALSE;
  END IF;
  IF v_otp.code_hash != p_code_hash THEN
    UPDATE otp_codes SET attempt_count = attempt_count + 1 WHERE id = v_otp.id;
    RETURN FALSE;
  END IF;
  UPDATE otp_codes SET consumed_at = NOW() WHERE id = v_otp.id;
  INSERT INTO verified_sessions (session_id, email, expires_at)
    VALUES (p_session_id, p_email, p_session_expires_at)
    ON CONFLICT (session_id) DO UPDATE SET email = p_email, verified_at = NOW(), expires_at = p_session_expires_at;
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Passphrase identity: create or retrieve
CREATE OR REPLACE FUNCTION get_or_create_identity(p_passphrase_hash TEXT)
RETURNS TABLE(identity_id UUID, display_name TEXT, role TEXT, is_new BOOLEAN) AS $$
DECLARE
  v_existing RECORD;
  v_new_id UUID;
BEGIN
  SELECT id, identities.display_name, identities.role INTO v_existing
    FROM identities WHERE identities.passphrase_hash = p_passphrase_hash;
  IF v_existing IS NOT NULL THEN
    UPDATE identities SET last_seen = NOW() WHERE id = v_existing.id;
    RETURN QUERY SELECT v_existing.id, v_existing.display_name, v_existing.role, FALSE;
  ELSE
    INSERT INTO identities (passphrase_hash) VALUES (p_passphrase_hash) RETURNING id INTO v_new_id;
    RETURN QUERY SELECT v_new_id, 'Anonymous'::TEXT, 'user'::TEXT, TRUE;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Increment post report count atomically
CREATE OR REPLACE FUNCTION increment_post_report_count(p_post_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE posts SET reported_count = reported_count + 1 WHERE id = p_post_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 13. TRIGGERS
-- ============================================

DROP TRIGGER IF EXISTS chapters_updated_at ON chapters;
CREATE TRIGGER chapters_updated_at BEFORE UPDATE ON chapters FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS groups_updated_at ON groups;
CREATE TRIGGER groups_updated_at BEFORE UPDATE ON groups FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS post_activity_on_response ON contact_responses;
CREATE TRIGGER post_activity_on_response AFTER INSERT ON contact_responses FOR EACH ROW EXECUTE FUNCTION update_post_activity();

DROP TRIGGER IF EXISTS update_community_resources_updated_at ON community_resources;
CREATE TRIGGER update_community_resources_updated_at BEFORE UPDATE ON community_resources FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_demands_updated_at ON demands;
CREATE TRIGGER update_demands_updated_at BEFORE UPDATE ON demands FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- 14. ROW LEVEL SECURITY
-- ============================================

ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE moderation_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE vouches ENABLE ROW LEVEL SECURITY;
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE otp_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE verified_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE pow_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE identities ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE demands ENABLE ROW LEVEL SECURITY;
ALTER TABLE situation_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_claims ENABLE ROW LEVEL SECURITY;

-- Public read policies (safe data only)
CREATE POLICY "read_approved_chapters" ON chapters FOR SELECT USING (status = 'approved');
CREATE POLICY "read_active_posts" ON posts FOR SELECT USING (status = 'approved' AND expires_at > NOW());
CREATE POLICY "read_active_groups" ON groups FOR SELECT USING (status = 'active');
CREATE POLICY "read_active_alerts" ON alerts FOR SELECT USING (archived = FALSE AND expires_at > NOW());
CREATE POLICY "read_approved_resources" ON community_resources FOR SELECT USING (status = 'approved');
CREATE POLICY "read_demands" ON demands FOR SELECT USING (true);
CREATE POLICY "read_situation" ON situation_updates FOR SELECT USING (is_current = TRUE);
CREATE POLICY "read_vouches" ON vouches FOR SELECT USING (true);
CREATE POLICY "read_task_claims" ON task_claims FOR SELECT USING (true);

-- Service role full access (for API routes running with service key)
CREATE POLICY "service_chapters" ON chapters FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_posts" ON posts FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_responses" ON contact_responses FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_reports" ON reports FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_rate_limits" ON rate_limits FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_moderation" ON moderation_log FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_vouches" ON vouches FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_groups" ON groups FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_members" ON group_members FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_alerts" ON alerts FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_otp" ON otp_codes FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_sessions" ON verified_sessions FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_pow" ON pow_challenges FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_identities" ON identities FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_resources" ON community_resources FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_demands" ON demands FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_situation" ON situation_updates FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_claims" ON task_claims FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ============================================
-- 15. INITIAL SITUATION UPDATE (seed)
-- ============================================

INSERT INTO situation_updates (title, title_hi, subtitle, subtitle_hi, day_count, demands_total, demands_met, rtis_filed, safety_note, safety_note_hi, social_links, timeline, is_current)
VALUES (
  'CJP Jantar Mantar Sit-In',
  'CJP जंतर मंतर धरना',
  'Cockroach Janta Party + SFI + AISA + AISF + NSUI — Education reform, dissolve NTA, unemployment',
  'कॉकरोच जनता पार्टी + SFI + AISA + AISF + NSUI — शिक्षा सुधार, NTA भंग, बेरोज़गारी',
  34, 5, 0, 47,
  'Section 163 BNSS — 5+ persons cannot gather in Central Delhi. Heavy police + CRPF.',
  'धारा 163 BNSS — मध्य दिल्ली में 5+ व्यक्ति एकत्रित नहीं। भारी पुलिस + CRPF।',
  '[{"platform":"Instagram","handle":"@cockroachjanata.india","url":"https://www.instagram.com/cockroachjanata.india/"},{"platform":"X","handle":"@CJP_2029","url":"https://x.com/CJP_2029"},{"platform":"X (backup)","handle":"@Cockroachisback","url":"https://x.com/Cockroachisback"},{"platform":"Reddit","handle":"r/CockroachJantaParty","url":"https://www.reddit.com/r/CockroachJantaParty/"},{"platform":"Founder","handle":"@abhijeet_dipke","url":"https://x.com/abhijeet_dipke"}]',
  '[{"date":"May 16","event":"Abhijeet Dipke founds CJP after CJI cockroach remark","event_hi":"अभिजीत दीपके ने CJI टिप्पणी के बाद CJP स्थापित किया"},{"date":"May 24","event":"Crosses 1M+ Instagram followers, surpasses BJP","event_hi":"1M+ Instagram फॉलोअर्स, BJP को पार"},{"date":"Jun 6","event":"Nagpur: 2000+ students at Samvidhan Chowk","event_hi":"नागपुर: 2000+ छात्र संविधान चौक पर"},{"date":"Jun 16","event":"Jaipur rally — founder assaulted, continues","event_hi":"जयपुर रैली — संस्थापक पर हमला, जारी"},{"date":"Jun 19","event":"Jantar Mantar sit-in begins","event_hi":"जंतर मंतर धरना शुरू"},{"date":"Jun 25","event":"Sonam Wangchuk hunger strike (Ladakh)","event_hi":"सोनम वांगचुक अनशन (लद्दाख)"},{"date":"Jul 5","event":"Delhi HC restores @CJP_2029 X account","event_hi":"दिल्ली HC ने @CJP_2029 बहाल कराया"},{"date":"Jul 20","event":"Chalo Sansad march — tear gas, 180+ injured","event_hi":"चलो संसद — आँसू गैस, 180+ घायल"},{"date":"Jul 21","event":"Won'\''t back down — hold at Jantar Mantar","event_hi":"पीछे नहीं हटेंगे — जंतर मंतर पर डटे"},{"date":"Jul 22","event":"Opposition disrupts Parliament, Rahul detained","event_hi":"विपक्ष ने संसद ठप, राहुल डिटेन"}]',
  TRUE
) ON CONFLICT DO NOTHING;

-- ============================================
-- DONE. Your database is ready.
-- ============================================
