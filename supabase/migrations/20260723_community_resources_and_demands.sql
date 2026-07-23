-- ============================================
-- MIGRATION: Community Resources + Demands tables
-- Date: 2026-07-23
-- Purpose: Enable community-submitted resources and demand tracking
-- ============================================

-- Community-submitted resources (lawyers, helplines, orgs, tools)
CREATE TABLE IF NOT EXISTS community_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  verified_at TIMESTAMPTZ,
  verified_by TEXT,
  rejection_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for common queries
CREATE INDEX IF NOT EXISTS idx_community_resources_status ON community_resources(status);
CREATE INDEX IF NOT EXISTS idx_community_resources_city ON community_resources(city);
CREATE INDEX IF NOT EXISTS idx_community_resources_type ON community_resources(type);
CREATE INDEX IF NOT EXISTS idx_community_resources_created ON community_resources(created_at DESC);

-- Demands table (for the demand tracker)
CREATE TABLE IF NOT EXISTS demands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL CHECK (char_length(title) BETWEEN 1 AND 300),
  target TEXT NOT NULL CHECK (char_length(target) BETWEEN 1 AND 200),
  city TEXT NOT NULL,
  category TEXT NOT NULL CHECK (char_length(category) BETWEEN 1 AND 50),
  deadline TIMESTAMPTZ NOT NULL,
  description TEXT DEFAULT '',
  evidence TEXT DEFAULT '',
  filed_by TEXT DEFAULT 'Anonymous',
  session_id UUID,
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'acknowledged', 'action', 'resolved', 'escalated', 'expired')),
  rtis_filed INTEGER NOT NULL DEFAULT 0,
  days_elapsed INTEGER NOT NULL DEFAULT 0,
  escalation_level TEXT NOT NULL DEFAULT 'Submitted',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for common queries
CREATE INDEX IF NOT EXISTS idx_demands_status ON demands(status);
CREATE INDEX IF NOT EXISTS idx_demands_city ON demands(city);
CREATE INDEX IF NOT EXISTS idx_demands_category ON demands(category);
CREATE INDEX IF NOT EXISTS idx_demands_created ON demands(created_at DESC);

-- RLS Policies for community_resources
ALTER TABLE community_resources ENABLE ROW LEVEL SECURITY;

-- Public can read approved resources (without submitter_contact or session_id)
CREATE POLICY "Public can read approved resources"
  ON community_resources FOR SELECT
  USING (status = 'approved');

-- Service role can do everything (for API routes)
CREATE POLICY "Service role full access to resources"
  ON community_resources FOR ALL
  USING (true)
  WITH CHECK (true);

-- RLS Policies for demands
ALTER TABLE demands ENABLE ROW LEVEL SECURITY;

-- Public can read all demands
CREATE POLICY "Public can read demands"
  ON demands FOR SELECT
  USING (true);

-- Service role can do everything
CREATE POLICY "Service role full access to demands"
  ON demands FOR ALL
  USING (true)
  WITH CHECK (true);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_community_resources_updated_at
  BEFORE UPDATE ON community_resources
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_demands_updated_at
  BEFORE UPDATE ON demands
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Auto-calculate days_elapsed for demands (optional scheduled job)
-- This would run daily via pg_cron or an external scheduler:
-- UPDATE demands SET days_elapsed = EXTRACT(DAY FROM now() - created_at)::integer WHERE status NOT IN ('resolved', 'expired');
