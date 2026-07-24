-- ╔══════════════════════════════════════════════════════════════════╗
-- ║  SAHAYATA OS v2 — RUN THIS AFTER SETUP.sql                     ║
-- ║                                                                  ║
-- ║  Paste this ENTIRE file into Supabase SQL Editor and run once.   ║
-- ║  Safe to run multiple times (uses IF NOT EXISTS / ADD IF NOT).   ║
-- ║                                                                  ║
-- ║  This adds: Campaigns, Groups v2, Directory v2, Exchange,        ║
-- ║  News, Report Card, Know the System, Buddy Circles, Profiles.   ║
-- ╚══════════════════════════════════════════════════════════════════╝

-- ============================================
-- 1. UPGRADE EXISTING TABLES
-- ============================================

-- Groups: add v2 columns
ALTER TABLE groups ADD COLUMN IF NOT EXISTS group_type TEXT DEFAULT 'general'
  CHECK (group_type IN ('protest','mutual_aid','campaign','study','chapter','general'));
ALTER TABLE groups ADD COLUMN IF NOT EXISTS visibility TEXT DEFAULT 'public'
  CHECK (visibility IN ('public','private'));
ALTER TABLE groups ADD COLUMN IF NOT EXISTS purpose TEXT DEFAULT '';
ALTER TABLE groups ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';
ALTER TABLE groups ADD COLUMN IF NOT EXISTS member_count INTEGER DEFAULT 0;
ALTER TABLE groups ADD COLUMN IF NOT EXISTS action_count INTEGER DEFAULT 0;
ALTER TABLE groups ADD COLUMN IF NOT EXISTS chat_platform TEXT DEFAULT '';
ALTER TABLE groups ADD COLUMN IF NOT EXISTS chat_link TEXT DEFAULT '';
ALTER TABLE groups ADD COLUMN IF NOT EXISTS website TEXT DEFAULT '';
ALTER TABLE groups ADD COLUMN IF NOT EXISTS founded_date DATE;
ALTER TABLE groups ADD COLUMN IF NOT EXISTS creator_id UUID REFERENCES identities(id);
ALTER TABLE groups ADD COLUMN IF NOT EXISTS location_lat DECIMAL(10,6);
ALTER TABLE groups ADD COLUMN IF NOT EXISTS location_lng DECIMAL(10,6);

-- Identities: add v2 columns
ALTER TABLE identities ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE identities ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE;
ALTER TABLE identities ADD COLUMN IF NOT EXISTS city TEXT DEFAULT '';
ALTER TABLE identities ADD COLUMN IF NOT EXISTS skills TEXT[] DEFAULT '{}';
ALTER TABLE identities ADD COLUMN IF NOT EXISTS onboarded BOOLEAN DEFAULT FALSE;

-- Group members: add identity link
ALTER TABLE group_members ADD COLUMN IF NOT EXISTS identity_id UUID REFERENCES identities(id);

-- ============================================
-- 2. CAMPAIGNS — Started by individual OR group
-- ============================================

CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Who started it
  creator_id UUID NOT NULL REFERENCES identities(id),
  group_id UUID REFERENCES groups(id),
  -- Content
  title TEXT NOT NULL CHECK (char_length(title) BETWEEN 3 AND 200),
  title_hi TEXT DEFAULT '',
  slug TEXT UNIQUE,
  issue_statement TEXT NOT NULL DEFAULT '',
  issue_statement_hi TEXT DEFAULT '',
  city TEXT NOT NULL,
  area TEXT DEFAULT '',
  category TEXT NOT NULL DEFAULT 'other',
  -- Target (institution only)
  target_institution TEXT NOT NULL,
  target_jurisdiction TEXT DEFAULT '',
  -- Demand
  primary_demand TEXT NOT NULL,
  primary_demand_hi TEXT DEFAULT '',
  deadline DATE NOT NULL,
  -- Status
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft','live','escalating','won','partial_win','refused','closed')),
  -- Stats
  supporter_count INTEGER DEFAULT 0,
  groups_aligned INTEGER DEFAULT 0,
  filing_count INTEGER DEFAULT 0,
  -- Outcomes
  outcome_summary TEXT DEFAULT '',
  -- Map
  location_lat DECIMAL(10,6),
  location_lng DECIMAL(10,6),
  -- Lifecycle
  published_at TIMESTAMPTZ,
  concluded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Campaign supporters
CREATE TABLE IF NOT EXISTS campaign_supporters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  identity_id UUID NOT NULL REFERENCES identities(id),
  support_type TEXT DEFAULT 'endorse'
    CHECK (support_type IN ('endorse','volunteer','skill_offer')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(campaign_id, identity_id)
);

-- Groups aligned to campaigns (many-to-many)
CREATE TABLE IF NOT EXISTS campaign_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  aligned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(campaign_id, group_id)
);

-- Campaign evidence
CREATE TABLE IF NOT EXISTS campaign_evidence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT DEFAULT 'document' CHECK (type IN ('document','photo','video','filing','response','other')),
  file_url TEXT DEFAULT '',
  source_url TEXT DEFAULT '',
  description TEXT DEFAULT '',
  uploaded_by UUID REFERENCES identities(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. GROUP ACTIONS & TASKS
-- ============================================

CREATE TABLE IF NOT EXISTS group_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  title_hi TEXT DEFAULT '',
  type TEXT NOT NULL CHECK (type IN ('protest','meeting','filing','outreach','training','mutual_aid','documentation','other')),
  description TEXT DEFAULT '',
  location TEXT DEFAULT '',
  location_lat DECIMAL(10,6),
  location_lng DECIMAL(10,6),
  scheduled_at TIMESTAMPTZ,
  status TEXT DEFAULT 'planned' CHECK (status IN ('planned','active','completed','cancelled')),
  campaign_id UUID REFERENCES campaigns(id),
  created_by UUID REFERENCES identities(id),
  attendee_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS group_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  assigned_to UUID REFERENCES identities(id),
  status TEXT DEFAULT 'open' CHECK (status IN ('open','claimed','done','cancelled')),
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low','normal','high','urgent')),
  due_date DATE,
  action_id UUID REFERENCES group_actions(id),
  created_by UUID REFERENCES identities(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================
-- 4. BUDDY CIRCLES — Group safety mesh
-- ============================================

CREATE TABLE IF NOT EXISTS buddy_circles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL DEFAULT 'Safety Circle',
  invite_code TEXT NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(8), 'hex'),
  checkin_interval_minutes INTEGER DEFAULT 30,
  grace_period_minutes INTEGER DEFAULT 5,
  -- Location (voluntary, shared with circle only)
  location_area TEXT DEFAULT '',
  location_city TEXT DEFAULT '',
  -- Lifecycle
  status TEXT DEFAULT 'active' CHECK (status IN ('active','expired','ended')),
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '24 hours'),
  created_by UUID REFERENCES identities(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS buddy_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  circle_id UUID NOT NULL REFERENCES buddy_circles(id) ON DELETE CASCADE,
  identity_id UUID REFERENCES identities(id),
  display_name TEXT NOT NULL,
  -- Status: green/yellow/red
  status TEXT DEFAULT 'active' CHECK (status IN ('active','safe','overdue','sos','offline')),
  last_checkin TIMESTAMPTZ DEFAULT NOW(),
  next_checkin_due TIMESTAMPTZ,
  -- Contact for alerts (email — works when phone is taken)
  alert_email TEXT DEFAULT '',
  alert_phone TEXT DEFAULT '',
  -- Location shared with circle (voluntary)
  shared_location TEXT DEFAULT '',
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(circle_id, identity_id)
);

-- Buddy check-in log (for the timer/status)
CREATE TABLE IF NOT EXISTS buddy_checkins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  circle_id UUID NOT NULL REFERENCES buddy_circles(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES buddy_members(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('checkin','sos','missed')),
  message TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 5. EXCHANGE — Standalone volunteer pool
-- ============================================

CREATE TABLE IF NOT EXISTS volunteer_pool (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identity_id UUID NOT NULL REFERENCES identities(id),
  display_name TEXT NOT NULL,
  skills TEXT[] NOT NULL DEFAULT '{}',
  city TEXT NOT NULL,
  area TEXT DEFAULT '',
  availability TEXT DEFAULT 'flexible'
    CHECK (availability IN ('immediate','this_week','flexible','weekends_only')),
  hours_per_week INTEGER DEFAULT 2,
  bio TEXT DEFAULT '',
  is_active BOOLEAN DEFAULT TRUE,
  group_id UUID REFERENCES groups(id),
  tasks_completed INTEGER DEFAULT 0,
  last_active TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(identity_id)
);

CREATE TABLE IF NOT EXISTS help_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL CHECK (char_length(title) BETWEEN 3 AND 200),
  description TEXT NOT NULL DEFAULT '',
  skill_needed TEXT NOT NULL,
  city TEXT NOT NULL,
  area TEXT DEFAULT '',
  urgency TEXT DEFAULT 'flexible' CHECK (urgency IN ('immediate','today','this_week','flexible')),
  requested_by UUID REFERENCES identities(id),
  group_id UUID REFERENCES groups(id),
  campaign_id UUID REFERENCES campaigns(id),
  status TEXT DEFAULT 'open' CHECK (status IN ('open','claimed','fulfilled','expired','cancelled')),
  claimed_by UUID REFERENCES identities(id),
  fulfilled_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '14 days'),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 6. NEWS & EVIDENCE — Crowdsourced, timestamped
-- ============================================

CREATE TABLE IF NOT EXISTS news_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('news','alert','law_update','movement','event','call_to_action','evidence','safety_warning')),
  title TEXT NOT NULL,
  title_hi TEXT DEFAULT '',
  body TEXT NOT NULL DEFAULT '',
  body_hi TEXT DEFAULT '',
  source_url TEXT DEFAULT '',
  source_name TEXT DEFAULT '',
  evidence_urls TEXT[] DEFAULT '{}',
  city TEXT DEFAULT 'National',
  tags TEXT[] DEFAULT '{}',
  urgency TEXT DEFAULT 'normal' CHECK (urgency IN ('normal','important','critical')),
  submitted_by UUID REFERENCES identities(id),
  is_verified BOOLEAN DEFAULT FALSE,
  upvotes INTEGER DEFAULT 0,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','published','archived','removed')),
  published_at TIMESTAMPTZ,
  pinned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS laws_tracker (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bill_name TEXT NOT NULL,
  bill_name_hi TEXT DEFAULT '',
  status TEXT NOT NULL CHECK (status IN ('introduced','committee','passed_one_house','passed_both','enacted','struck_down')),
  summary TEXT NOT NULL DEFAULT '',
  summary_hi TEXT DEFAULT '',
  impact TEXT DEFAULT '',
  house TEXT DEFAULT '',
  introduced_date DATE,
  last_action_date DATE,
  source_url TEXT DEFAULT '',
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================
-- 7. REPORT CARD — Public institutional silence
-- ============================================

CREATE TABLE IF NOT EXISTS report_card (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  demand_text TEXT NOT NULL,
  demand_text_hi TEXT DEFAULT '',
  institution TEXT NOT NULL,
  institution_type TEXT DEFAULT '',
  city TEXT NOT NULL,
  jurisdiction TEXT DEFAULT '',
  filed_date DATE NOT NULL,
  deadline_date DATE NOT NULL,
  response_status TEXT DEFAULT 'silent'
    CHECK (response_status IN ('silent','acknowledged','partial','responded','refused','resolved')),
  response_text TEXT DEFAULT '',
  response_date DATE,
  source_documents TEXT[] DEFAULT '{}',
  evidence_urls TEXT[] DEFAULT '{}',
  filed_by_group UUID REFERENCES groups(id),
  campaign_id UUID REFERENCES campaigns(id),
  confirmations INTEGER DEFAULT 0,
  disputes INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active','resolved','disputed','archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 8. KNOW THE SYSTEM — Empowerment content
-- ============================================

CREATE TABLE IF NOT EXISTS knowledge_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  title_hi TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  description_hi TEXT NOT NULL DEFAULT '',
  icon TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS knowledge_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID NOT NULL REFERENCES knowledge_sections(id),
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  title_hi TEXT NOT NULL DEFAULT '',
  content_md TEXT NOT NULL DEFAULT '',
  content_md_hi TEXT NOT NULL DEFAULT '',
  field_mission TEXT DEFAULT '',
  field_mission_hi TEXT DEFAULT '',
  difficulty TEXT DEFAULT 'beginner',
  read_time_minutes INTEGER DEFAULT 5,
  tags TEXT[] DEFAULT '{}',
  sort_order INTEGER DEFAULT 0,
  source_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(section_id, slug)
);

-- ============================================
-- 9. DIRECTORY v2 — Comprehensive, vetted
-- ============================================

CREATE TABLE IF NOT EXISTS directory_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_hi TEXT DEFAULT '',
  type TEXT NOT NULL,
  city TEXT NOT NULL,
  area TEXT DEFAULT '',
  state TEXT DEFAULT '',
  contact_primary TEXT NOT NULL DEFAULT '',
  contact_secondary TEXT DEFAULT '',
  website TEXT DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  description_hi TEXT DEFAULT '',
  specializations TEXT[] DEFAULT '{}',
  languages TEXT[] DEFAULT '{"en","hi"}',
  operating_hours TEXT DEFAULT '',
  -- Vetting
  reliability_score INTEGER DEFAULT 0,
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  feedback_count INTEGER DEFAULT 0,
  verification_status TEXT DEFAULT 'unverified',
  verified_what TEXT DEFAULT '',
  last_confirmed_active TIMESTAMPTZ DEFAULT NOW(),
  -- Submission
  submitted_by UUID REFERENCES identities(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','active','flagged','inactive','removed')),
  source_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS directory_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entry_id UUID NOT NULL REFERENCES directory_entries(id) ON DELETE CASCADE,
  identity_id UUID REFERENCES identities(id),
  type TEXT NOT NULL CHECK (type IN ('upvote','downvote','confirm_active','report_inactive','review')),
  comment TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 10. RTI FILINGS — Standalone tracker
-- ============================================

CREATE TABLE IF NOT EXISTS rti_filings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identity_id UUID REFERENCES identities(id),
  campaign_id UUID REFERENCES campaigns(id),
  group_id UUID REFERENCES groups(id),
  authority_name TEXT NOT NULL,
  authority_address TEXT DEFAULT '',
  subject TEXT NOT NULL,
  questions JSONB DEFAULT '[]',
  filed_date DATE NOT NULL,
  deadline_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'filed'
    CHECK (status IN ('filed','awaiting','overdue','first_appeal','ic_complaint','responded','penalty_ordered','closed')),
  response_received BOOLEAN DEFAULT FALSE,
  response_date DATE,
  response_summary TEXT DEFAULT '',
  appeal_filed_date DATE,
  ic_complaint_date DATE,
  penalty_amount INTEGER DEFAULT 0,
  city TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 11. CIVIC PROFILES — Public by default
-- ============================================

CREATE TABLE IF NOT EXISTS civic_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identity_id UUID NOT NULL UNIQUE REFERENCES identities(id),
  display_name TEXT NOT NULL DEFAULT 'Anonymous',
  bio TEXT DEFAULT '',
  city TEXT DEFAULT '',
  slug TEXT UNIQUE,
  is_public BOOLEAN DEFAULT TRUE,
  groups_joined INTEGER DEFAULT 0,
  campaigns_contributed INTEGER DEFAULT 0,
  rtis_filed INTEGER DEFAULT 0,
  help_given INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 12. NOTIFICATIONS
-- ============================================

CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identity_id UUID NOT NULL REFERENCES identities(id),
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT DEFAULT '',
  link TEXT DEFAULT '',
  related_campaign_id UUID REFERENCES campaigns(id),
  related_group_id UUID REFERENCES groups(id),
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================
-- 13. TRIGGERS
-- ============================================

-- Auto-generate campaign slug
CREATE OR REPLACE FUNCTION generate_campaign_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := lower(regexp_replace(regexp_replace(NEW.title, '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g')) || '-' || substr(NEW.id::text, 1, 8);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_campaign_slug ON campaigns;
CREATE TRIGGER trg_campaign_slug BEFORE INSERT ON campaigns FOR EACH ROW EXECUTE FUNCTION generate_campaign_slug();

-- Auto-update campaign supporter count
CREATE OR REPLACE FUNCTION update_campaign_supporter_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE campaigns SET supporter_count = supporter_count + 1 WHERE id = NEW.campaign_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE campaigns SET supporter_count = supporter_count - 1 WHERE id = OLD.campaign_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_supporter_count ON campaign_supporters;
CREATE TRIGGER trg_supporter_count AFTER INSERT OR DELETE ON campaign_supporters FOR EACH ROW EXECUTE FUNCTION update_campaign_supporter_count();

-- Auto-update group member count
CREATE OR REPLACE FUNCTION update_group_member_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE groups SET member_count = (SELECT COUNT(*) FROM group_members WHERE group_id = COALESCE(NEW.group_id, OLD.group_id) AND status = 'active') WHERE id = COALESCE(NEW.group_id, OLD.group_id);
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_group_member_count ON group_members;
CREATE TRIGGER trg_group_member_count AFTER INSERT OR UPDATE OR DELETE ON group_members FOR EACH ROW EXECUTE FUNCTION update_group_member_count();

-- Updated_at triggers
DROP TRIGGER IF EXISTS campaigns_updated_at ON campaigns;
CREATE TRIGGER campaigns_updated_at BEFORE UPDATE ON campaigns FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS rti_filings_updated_at ON rti_filings;
CREATE TRIGGER rti_filings_updated_at BEFORE UPDATE ON rti_filings FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS directory_updated_at ON directory_entries;
CREATE TRIGGER directory_updated_at BEFORE UPDATE ON directory_entries FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS profiles_updated_at ON civic_profiles;
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON civic_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- 14. RLS POLICIES (new tables)
-- ============================================

ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_supporters ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE buddy_circles ENABLE ROW LEVEL SECURITY;
ALTER TABLE buddy_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE buddy_checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_pool ENABLE ROW LEVEL SECURITY;
ALTER TABLE help_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE laws_tracker ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_card ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE directory_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE directory_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE rti_filings ENABLE ROW LEVEL SECURITY;
ALTER TABLE civic_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "pub_campaigns" ON campaigns FOR SELECT USING (status != 'draft');
CREATE POLICY "pub_supporters" ON campaign_supporters FOR SELECT USING (TRUE);
CREATE POLICY "pub_campaign_groups" ON campaign_groups FOR SELECT USING (TRUE);
CREATE POLICY "pub_evidence" ON campaign_evidence FOR SELECT USING (TRUE);
CREATE POLICY "pub_group_actions" ON group_actions FOR SELECT USING (TRUE);
CREATE POLICY "pub_group_tasks" ON group_tasks FOR SELECT USING (TRUE);
CREATE POLICY "pub_buddy_circles" ON buddy_circles FOR SELECT USING (status = 'active');
CREATE POLICY "pub_buddy_members" ON buddy_members FOR SELECT USING (TRUE);
CREATE POLICY "pub_buddy_checkins" ON buddy_checkins FOR SELECT USING (TRUE);
CREATE POLICY "pub_volunteers" ON volunteer_pool FOR SELECT USING (is_active = TRUE);
CREATE POLICY "pub_help_requests" ON help_requests FOR SELECT USING (status = 'open');
CREATE POLICY "pub_news" ON news_posts FOR SELECT USING (status = 'published');
CREATE POLICY "pub_laws" ON laws_tracker FOR SELECT USING (TRUE);
CREATE POLICY "pub_report_card" ON report_card FOR SELECT USING (status = 'active');
CREATE POLICY "pub_knowledge_sections" ON knowledge_sections FOR SELECT USING (status = 'active');
CREATE POLICY "pub_knowledge_articles" ON knowledge_articles FOR SELECT USING (TRUE);
CREATE POLICY "pub_directory" ON directory_entries FOR SELECT USING (status = 'active');
CREATE POLICY "pub_feedback" ON directory_feedback FOR SELECT USING (TRUE);
CREATE POLICY "pub_rti" ON rti_filings FOR SELECT USING (TRUE);
CREATE POLICY "pub_profiles" ON civic_profiles FOR SELECT USING (is_public = TRUE);

-- Service role full access (all new tables)
CREATE POLICY "svc_campaigns" ON campaigns FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "svc_supporters" ON campaign_supporters FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "svc_campaign_groups" ON campaign_groups FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "svc_evidence" ON campaign_evidence FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "svc_group_actions" ON group_actions FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "svc_group_tasks" ON group_tasks FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "svc_buddy_circles" ON buddy_circles FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "svc_buddy_members" ON buddy_members FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "svc_buddy_checkins" ON buddy_checkins FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "svc_volunteers" ON volunteer_pool FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "svc_help_requests" ON help_requests FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "svc_news" ON news_posts FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "svc_laws" ON laws_tracker FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "svc_report_card" ON report_card FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "svc_knowledge_sections" ON knowledge_sections FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "svc_knowledge_articles" ON knowledge_articles FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "svc_directory" ON directory_entries FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "svc_feedback" ON directory_feedback FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "svc_rti" ON rti_filings FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "svc_profiles" ON civic_profiles FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "svc_notifications" ON notifications FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);

-- ============================================
-- 15. SEED: Knowledge sections
-- ============================================

INSERT INTO knowledge_sections (slug, title, title_hi, description, description_hi, icon, sort_order) VALUES
('how-power-works', 'How Power Works', 'सत्ता कैसे काम करती है', 'Municipality to Union. Who controls what money.', 'नगरपालिका से केंद्र। पैसा किसके पास।', '🏛️', 1),
('laws-to-know', 'Laws You Should Know', 'ये कानून जानो', 'Current bills, your rights, acts that matter.', 'चल रहे बिल, आपके अधिकार।', '⚖️', 2),
('the-playbook', 'The Playbook', 'प्लेबुक', 'How to contest elections. Read budgets. Run campaigns.', 'चुनाव लड़ें। बजट पढ़ें। अभियान चलाएं।', '📋', 3),
('rti-mastery', 'RTI Mastery', 'RTI में महारत', 'Appeals, IC complaints, penalties, media pressure.', 'अपील, IC शिकायत, जुर्माना, मीडिया दबाव।', '📄', 4),
('movement-history', 'Movement History', 'आंदोलन इतिहास', 'What won, what failed, why.', 'क्या जीता, क्या हारा, क्यों।', '✊', 5)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- DONE. Your v2 database is ready.
-- Run this AFTER the original SETUP.sql.
-- ============================================
