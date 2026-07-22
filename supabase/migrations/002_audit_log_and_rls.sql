-- ============================================
-- Migration 002: Audit Log + Row Level Security
-- ============================================

-- Moderation Audit Log
CREATE TABLE IF NOT EXISTS moderation_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  target_type TEXT NOT NULL CHECK (target_type IN ('chapter', 'post')),
  target_id UUID NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('approved', 'rejected')),
  reason TEXT DEFAULT '',
  moderator TEXT DEFAULT 'admin', -- For future multi-moderator support
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_moderation_log_target ON moderation_log(target_type, target_id);
CREATE INDEX IF NOT EXISTS idx_moderation_log_created ON moderation_log(created_at);

-- Enable Row Level Security on all tables
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE moderation_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies for CHAPTERS
-- Public can read approved chapters
CREATE POLICY "Anyone can read approved chapters" ON chapters
  FOR SELECT USING (status = 'approved');

-- Anon can insert (new submissions go to pending)
CREATE POLICY "Anyone can submit chapters" ON chapters
  FOR INSERT WITH CHECK (status = 'pending');

-- Service role can do everything (admin operations)
CREATE POLICY "Service role full access to chapters" ON chapters
  FOR ALL USING (auth.role() = 'service_role');

-- RLS Policies for POSTS
-- Public can read approved, non-expired posts
CREATE POLICY "Anyone can read approved posts" ON posts
  FOR SELECT USING (status = 'approved' AND expires_at > NOW());

-- Users can read their own posts (any status)
CREATE POLICY "Users can read own posts" ON posts
  FOR SELECT USING (true); -- Session-based, enforced at API level

-- Anyone can create posts (pending status)
CREATE POLICY "Anyone can create posts" ON posts
  FOR INSERT WITH CHECK (status = 'pending');

-- Service role full access
CREATE POLICY "Service role full access to posts" ON posts
  FOR ALL USING (auth.role() = 'service_role');

-- RLS Policies for CONTACT_RESPONSES
-- Only service role can read (sensitive relay data)
CREATE POLICY "Service role only for responses" ON contact_responses
  FOR ALL USING (auth.role() = 'service_role');

-- Anyone can insert responses
CREATE POLICY "Anyone can create responses" ON contact_responses
  FOR INSERT WITH CHECK (true);

-- RLS Policies for REPORTS
CREATE POLICY "Anyone can create reports" ON reports
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role reads reports" ON reports
  FOR SELECT USING (auth.role() = 'service_role');

-- RLS for rate_limits
CREATE POLICY "Anyone can insert rate limits" ON rate_limits
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Rate limits read by service role" ON rate_limits
  FOR SELECT USING (auth.role() = 'service_role');

-- RLS for moderation_log
CREATE POLICY "Moderation log service role only" ON moderation_log
  FOR ALL USING (auth.role() = 'service_role');

-- Enable Realtime for posts and chapters
ALTER PUBLICATION supabase_realtime ADD TABLE posts;
ALTER PUBLICATION supabase_realtime ADD TABLE chapters;
