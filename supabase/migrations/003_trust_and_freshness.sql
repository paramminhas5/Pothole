-- ============================================
-- Migration 003: Trust Tiers + Freshness + Vouching
-- ============================================

-- Trust tiers for chapters
-- self_listed: anyone can submit (goes through moderation)
-- community_vouched: 3+ existing verified chapters have vouched
-- org_verified: verified by a known civil liberties org (PUCL, PUDR, CJP, etc.)
ALTER TABLE chapters ADD COLUMN IF NOT EXISTS trust_tier TEXT DEFAULT 'self_listed'
  CHECK (trust_tier IN ('self_listed', 'community_vouched', 'org_verified'));

-- Last activity ping — chapters must confirm activity monthly
ALTER TABLE chapters ADD COLUMN IF NOT EXISTS last_ping TIMESTAMPTZ DEFAULT NOW();

-- Vouch system — chapters can vouch for other chapters or posts
CREATE TABLE IF NOT EXISTS vouches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  voucher_chapter_id UUID NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
  target_type TEXT NOT NULL CHECK (target_type IN ('chapter', 'post')),
  target_id UUID NOT NULL,
  note TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  -- One vouch per chapter per target
  UNIQUE(voucher_chapter_id, target_type, target_id)
);

CREATE INDEX IF NOT EXISTS idx_vouches_target ON vouches(target_type, target_id);
CREATE INDEX IF NOT EXISTS idx_vouches_voucher ON vouches(voucher_chapter_id);

-- Post freshness: track last interaction (response or vouch)
ALTER TABLE posts ADD COLUMN IF NOT EXISTS last_activity TIMESTAMPTZ DEFAULT NOW();

-- Auto-update last_activity when a response is added
CREATE OR REPLACE FUNCTION update_post_activity()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE posts SET last_activity = NOW() WHERE id = NEW.post_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER post_activity_on_response
  AFTER INSERT ON contact_responses
  FOR EACH ROW EXECUTE FUNCTION update_post_activity();

-- View: chapters with vouch count
CREATE OR REPLACE VIEW chapters_with_trust AS
SELECT
  c.*,
  COALESCE(v.vouch_count, 0) as vouch_count,
  CASE
    WHEN c.trust_tier = 'org_verified' THEN 3
    WHEN c.trust_tier = 'community_vouched' THEN 2
    WHEN COALESCE(v.vouch_count, 0) >= 3 THEN 2
    ELSE 1
  END as trust_score
FROM chapters c
LEFT JOIN (
  SELECT target_id, COUNT(*) as vouch_count
  FROM vouches WHERE target_type = 'chapter'
  GROUP BY target_id
) v ON c.id = v.target_id;

-- View: posts with vouch count
CREATE OR REPLACE VIEW posts_with_trust AS
SELECT
  p.*,
  COALESCE(v.vouch_count, 0) as vouch_count
FROM posts p
LEFT JOIN (
  SELECT target_id, COUNT(*) as vouch_count
  FROM vouches WHERE target_type = 'post'
  GROUP BY target_id
) v ON p.id = v.target_id;

-- RLS for vouches
ALTER TABLE vouches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read vouches" ON vouches FOR SELECT USING (true);
CREATE POLICY "Service role manages vouches" ON vouches FOR ALL USING (auth.role() = 'service_role');
