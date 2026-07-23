-- ============================================
-- Migration 004: Affinity Groups + Verified Alerts
-- ============================================

-- AFFINITY GROUPS (5-15 people units)
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

-- GROUP MEMBERS
CREATE TABLE IF NOT EXISTS group_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL, -- No real names required, can be alias
  role TEXT NOT NULL CHECK (role IN ('medic', 'legal', 'comms', 'transport', 'supply', 'document', 'general')),
  session_id TEXT NOT NULL, -- Links to their session for auth
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'safe', 'need_help', 'offline', 'left')),
  last_checkin TIMESTAMPTZ DEFAULT NOW(),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(group_id, session_id)
);

-- VERIFIED ALERTS (coordinator-only)
CREATE TABLE IF NOT EXISTS alerts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  city TEXT NOT NULL,
  area TEXT NOT NULL,
  urgency TEXT NOT NULL DEFAULT 'info' CHECK (urgency IN ('info', 'warning', 'critical')),
  chapter_id UUID NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
  coordinator_key TEXT NOT NULL, -- Must match chapter's coordinator key
  verified BOOLEAN DEFAULT TRUE,
  archived BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '6 hours'
);

-- COORDINATOR KEYS (issued to chapter coordinators by admin)
ALTER TABLE chapters ADD COLUMN IF NOT EXISTS coordinator_key TEXT DEFAULT encode(gen_random_bytes(8), 'hex');

-- Indexes
CREATE INDEX IF NOT EXISTS idx_groups_city ON groups(city);
CREATE INDEX IF NOT EXISTS idx_groups_invite ON groups(invite_code);
CREATE INDEX IF NOT EXISTS idx_group_members_group ON group_members(group_id);
CREATE INDEX IF NOT EXISTS idx_group_members_session ON group_members(session_id);
CREATE INDEX IF NOT EXISTS idx_alerts_city ON alerts(city, created_at);
CREATE INDEX IF NOT EXISTS idx_alerts_active ON alerts(archived, expires_at);

-- Auto-update timestamps
CREATE TRIGGER groups_updated_at
  BEFORE UPDATE ON groups
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active groups" ON groups FOR SELECT USING (status = 'active');
CREATE POLICY "Anyone can create groups" ON groups FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role full access groups" ON groups FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Anyone can read group members" ON group_members FOR SELECT USING (true);
CREATE POLICY "Anyone can join groups" ON group_members FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role full access members" ON group_members FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Anyone can read alerts" ON alerts FOR SELECT USING (archived = false AND expires_at > NOW());
CREATE POLICY "Service role full access alerts" ON alerts FOR ALL USING (auth.role() = 'service_role');

-- Enable realtime for alerts and group check-ins
ALTER PUBLICATION supabase_realtime ADD TABLE alerts;
ALTER PUBLICATION supabase_realtime ADD TABLE group_members;
