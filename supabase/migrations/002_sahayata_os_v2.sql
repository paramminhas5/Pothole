-- ╔══════════════════════════════════════════════════════════════════╗
-- ║  SAHAYATA OS v2 — REVISED ARCHITECTURE                         ║
-- ║  Groups = social unit. Everything public. Crowdsourced truth.   ║
-- ╚══════════════════════════════════════════════════════════════════╝

-- ============================================
-- 1. GROUPS v2 — The social unit of the platform
-- ============================================

ALTER TABLE groups ADD COLUMN IF NOT EXISTS visibility TEXT DEFAULT 'public'
  CHECK (visibility IN ('public', 'private'));
ALTER TABLE groups ADD COLUMN IF NOT EXISTS purpose TEXT DEFAULT '';
ALTER TABLE groups ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';
ALTER TABLE groups ADD COLUMN IF NOT EXISTS member_count INTEGER DEFAULT 0;
ALTER TABLE groups ADD COLUMN IF NOT EXISTS action_count INTEGER DEFAULT 0;
ALTER TABLE groups ADD COLUMN IF NOT EXISTS chat_platform TEXT DEFAULT '';
ALTER TABLE groups ADD COLUMN IF NOT EXISTS chat_link TEXT DEFAULT '';
ALTER TABLE groups ADD COLUMN IF NOT EXISTS website TEXT DEFAULT '';
ALTER TABLE groups ADD COLUMN IF NOT EXISTS founded_date DATE;
ALTER TABLE groups ADD COLUMN IF NOT EXISTS banner_url TEXT DEFAULT '';


-- Group actions (what a group does together)
CREATE TABLE IF NOT EXISTS group_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  title_hi TEXT DEFAULT '',
  type TEXT NOT NULL CHECK (type IN (
    'protest','meeting','filing','outreach','training',
    'mutual_aid','documentation','legal','other'
  )),
  description TEXT DEFAULT '',
  location TEXT DEFAULT '',
  scheduled_at TIMESTAMPTZ,
  status TEXT DEFAULT 'planned' CHECK (status IN ('planned','active','completed','cancelled')),
  campaign_id UUID,
  created_by UUID REFERENCES identities(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Group tasks (work assigned within a group)
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
  created_at TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================
-- 2. DIRECTORY v2 — Comprehensive, crowdsourced, vetted
-- ============================================

CREATE TABLE IF NOT EXISTS directory_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Core info
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 2 AND 300),
  name_hi TEXT DEFAULT '',
  type TEXT NOT NULL CHECK (type IN (
    'ngo','legal-aid','lawyer','helpline','shelter','hospital',
    'mental-health','student-union','political-party','movement',
    'media','journalist','government-office','police-station',
    'court','rti-office','consumer-forum','education',
    'transport','food-bank','volunteer-org','tech-support',
    'translation','documentation','other'
  )),
  city TEXT NOT NULL,
  area TEXT DEFAULT '',
  state TEXT DEFAULT '',
  -- Contact
  contact_primary TEXT NOT NULL,
  contact_secondary TEXT DEFAULT '',
  website TEXT DEFAULT '',
  social_links JSONB DEFAULT '{}',
  -- Description
  description TEXT NOT NULL CHECK (char_length(description) BETWEEN 10 AND 2000),
  description_hi TEXT DEFAULT '',
  specializations TEXT[] DEFAULT '{}',
  languages TEXT[] DEFAULT '{"en","hi"}',
  operating_hours TEXT DEFAULT '',
  -- Vetting & reliability
  reliability_score INTEGER DEFAULT 0,
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  feedback_count INTEGER DEFAULT 0,
  verification_status TEXT DEFAULT 'unverified'
    CHECK (verification_status IN ('unverified','community_vetted','staff_verified','proven_active')),
  verified_what TEXT DEFAULT '',
  verified_by TEXT DEFAULT '',
  verified_at TIMESTAMPTZ,
  last_confirmed_active TIMESTAMPTZ DEFAULT NOW(),
  freshness_check_due TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days'),
  -- Submission
  submitted_by UUID REFERENCES identities(id),
  submitted_contact TEXT DEFAULT '',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','active','flagged','inactive','removed')),
  -- Connections
  affiliated_groups UUID[] DEFAULT '{}',
  affiliated_campaigns UUID[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Directory feedback (crowdsourced vetting)
CREATE TABLE IF NOT EXISTS directory_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entry_id UUID NOT NULL REFERENCES directory_entries(id) ON DELETE CASCADE,
  identity_id UUID REFERENCES identities(id),
  type TEXT NOT NULL CHECK (type IN ('upvote','downvote','confirm_active','report_inactive','review')),
  comment TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(entry_id, identity_id, type)
);


-- ============================================
-- 3. EXCHANGE v2 — Standalone, no campaign required
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
  -- Optional connections
  group_id UUID REFERENCES groups(id),
  campaign_id UUID,
  -- Stats
  tasks_completed INTEGER DEFAULT 0,
  last_active TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(identity_id)
);

CREATE TABLE IF NOT EXISTS help_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL CHECK (char_length(title) BETWEEN 3 AND 200),
  description TEXT NOT NULL,
  skill_needed TEXT NOT NULL,
  city TEXT NOT NULL,
  area TEXT DEFAULT '',
  urgency TEXT DEFAULT 'normal' CHECK (urgency IN ('immediate','today','this_week','flexible')),
  -- Who's asking
  requested_by UUID REFERENCES identities(id),
  group_id UUID REFERENCES groups(id),
  campaign_id UUID,
  -- Status
  status TEXT DEFAULT 'open' CHECK (status IN ('open','claimed','fulfilled','expired','cancelled')),
  claimed_by UUID REFERENCES identities(id),
  fulfilled_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '14 days'),
  created_at TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================
-- 4. NEWS & EVIDENCE — Crowdsourced, timestamped
-- ============================================

CREATE TABLE IF NOT EXISTS news_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN (
    'news','alert','law_update','movement','event',
    'call_to_action','evidence','safety_warning'
  )),
  title TEXT NOT NULL CHECK (char_length(title) BETWEEN 5 AND 300),
  title_hi TEXT DEFAULT '',
  body TEXT NOT NULL,
  body_hi TEXT DEFAULT '',
  -- Source & evidence
  source_url TEXT DEFAULT '',
  source_name TEXT DEFAULT '',
  evidence_urls TEXT[] DEFAULT '{}',
  timestamp_evidence TIMESTAMPTZ DEFAULT NOW(),
  -- Location
  city TEXT DEFAULT 'National',
  -- Metadata
  tags TEXT[] DEFAULT '{}',
  urgency TEXT DEFAULT 'normal' CHECK (urgency IN ('normal','important','critical')),
  -- Submission
  submitted_by UUID REFERENCES identities(id),
  is_verified BOOLEAN DEFAULT FALSE,
  verified_by TEXT DEFAULT '',
  -- Engagement
  upvotes INTEGER DEFAULT 0,
  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','published','archived','removed')),
  published_at TIMESTAMPTZ,
  pinned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Laws tracker
CREATE TABLE IF NOT EXISTS laws_tracker (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bill_name TEXT NOT NULL,
  bill_name_hi TEXT DEFAULT '',
  status TEXT NOT NULL CHECK (status IN (
    'introduced','committee','passed_one_house','passed_both','enacted','struck_down'
  )),
  summary TEXT NOT NULL,
  summary_hi TEXT DEFAULT '',
  impact TEXT DEFAULT '',
  impact_hi TEXT DEFAULT '',
  house TEXT DEFAULT '' CHECK (house IN ('','lok_sabha','rajya_sabha','both','state')),
  introduced_date DATE,
  last_action_date DATE,
  source_url TEXT DEFAULT '',
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================
-- 5. REPORT CARD — Public institutional accountability
-- ============================================

CREATE TABLE IF NOT EXISTS report_card (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- The demand
  demand_text TEXT NOT NULL,
  demand_text_hi TEXT DEFAULT '',
  -- The target
  institution TEXT NOT NULL,
  institution_type TEXT DEFAULT '',
  city TEXT NOT NULL,
  jurisdiction TEXT DEFAULT '',
  -- Timeline
  filed_date DATE NOT NULL,
  deadline_date DATE NOT NULL,
  days_elapsed INTEGER GENERATED ALWAYS AS (CURRENT_DATE - filed_date) STORED,
  -- Response
  response_status TEXT DEFAULT 'silent'
    CHECK (response_status IN ('silent','acknowledged','partial','responded','refused','resolved')),
  response_text TEXT DEFAULT '',
  response_date DATE,
  -- Evidence & sourcing
  source_documents TEXT[] DEFAULT '{}',
  evidence_urls TEXT[] DEFAULT '{}',
  filed_by_group UUID REFERENCES groups(id),
  campaign_id UUID,
  -- Crowdsourced verification
  confirmations INTEGER DEFAULT 0,
  disputes INTEGER DEFAULT 0,
  -- Status
  is_verified BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active','resolved','disputed','archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 6. KNOW THE SYSTEM — Empowerment content
-- ============================================

CREATE TABLE IF NOT EXISTS knowledge_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  title_hi TEXT NOT NULL,
  description TEXT NOT NULL,
  description_hi TEXT NOT NULL,
  icon TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS knowledge_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID NOT NULL REFERENCES knowledge_sections(id),
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  title_hi TEXT NOT NULL,
  content_md TEXT NOT NULL,
  content_md_hi TEXT NOT NULL,
  -- Field mission (optional real-world action)
  field_mission TEXT DEFAULT '',
  field_mission_hi TEXT DEFAULT '',
  mission_proof_type TEXT DEFAULT '',
  -- Metadata
  difficulty TEXT DEFAULT 'beginner' CHECK (difficulty IN ('beginner','intermediate','advanced')),
  read_time_minutes INTEGER DEFAULT 5,
  tags TEXT[] DEFAULT '{}',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(section_id, slug)
);


-- Knowledge progress (your record)
CREATE TABLE IF NOT EXISTS knowledge_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identity_id UUID NOT NULL REFERENCES identities(id),
  article_id UUID NOT NULL REFERENCES knowledge_articles(id),
  completed BOOLEAN DEFAULT FALSE,
  mission_submitted BOOLEAN DEFAULT FALSE,
  mission_proof_url TEXT DEFAULT '',
  mission_verified BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  UNIQUE(identity_id, article_id)
);

-- ============================================
-- 7. CAMPAIGNS v2 — Started by groups
-- ============================================

CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Ownership: GROUP starts campaigns, not individuals
  group_id UUID NOT NULL REFERENCES groups(id),
  creator_id UUID NOT NULL REFERENCES identities(id),
  -- Content
  title TEXT NOT NULL CHECK (char_length(title) BETWEEN 5 AND 200),
  title_hi TEXT DEFAULT '',
  slug TEXT UNIQUE,
  issue_statement TEXT NOT NULL,
  issue_statement_hi TEXT DEFAULT '',
  city TEXT NOT NULL,
  category TEXT NOT NULL,
  -- Target (institution only, never individuals)
  target_institution TEXT NOT NULL,
  target_jurisdiction TEXT DEFAULT '',
  -- Demand
  primary_demand TEXT NOT NULL,
  primary_demand_hi TEXT DEFAULT '',
  deadline DATE NOT NULL,
  -- Status
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active','escalating','won','partial_win','refused','closed')),
  -- Stats
  supporter_count INTEGER DEFAULT 0,
  filing_count INTEGER DEFAULT 0,
  -- Lifecycle
  outcome_summary TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================
-- 8. RTI FILINGS — Standalone tool
-- ============================================

CREATE TABLE IF NOT EXISTS rti_filings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Can be anonymous (session-based) or identity-linked
  identity_id UUID REFERENCES identities(id),
  session_token TEXT,
  -- Filing details
  authority_name TEXT NOT NULL,
  authority_address TEXT DEFAULT '',
  subject TEXT NOT NULL,
  questions JSONB DEFAULT '[]',
  filed_date DATE NOT NULL,
  deadline_date DATE NOT NULL,
  -- Tracking
  status TEXT NOT NULL DEFAULT 'filed'
    CHECK (status IN ('filed','awaiting','overdue','first_appeal',
      'ic_complaint','responded','penalty_ordered','closed')),
  response_received BOOLEAN DEFAULT FALSE,
  response_date DATE,
  response_summary TEXT DEFAULT '',
  appeal_filed_date DATE,
  ic_complaint_date DATE,
  penalty_amount INTEGER DEFAULT 0,
  -- Optional connections
  campaign_id UUID REFERENCES campaigns(id),
  group_id UUID REFERENCES groups(id),
  city TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 9. CIVIC PROFILE — Public by default
-- ============================================

CREATE TABLE IF NOT EXISTS civic_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identity_id UUID NOT NULL UNIQUE REFERENCES identities(id),
  display_name TEXT NOT NULL,
  bio TEXT DEFAULT '',
  bio_hi TEXT DEFAULT '',
  city TEXT DEFAULT '',
  slug TEXT UNIQUE,
  -- Stats (auto-updated)
  groups_joined INTEGER DEFAULT 0,
  campaigns_contributed INTEGER DEFAULT 0,
  actions_participated INTEGER DEFAULT 0,
  knowledge_completed INTEGER DEFAULT 0,
  missions_verified INTEGER DEFAULT 0,
  rtis_filed INTEGER DEFAULT 0,
  help_given INTEGER DEFAULT 0,
  directory_contributions INTEGER DEFAULT 0,
  news_submitted INTEGER DEFAULT 0,
  -- Always public (per user requirement)
  is_public BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================
-- 10. NOTIFICATIONS — The return loop
-- ============================================

CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identity_id UUID NOT NULL REFERENCES identities(id),
  type TEXT NOT NULL CHECK (type IN (
    'group_task','group_action','help_match','rti_deadline',
    'campaign_update','news_alert','report_card_update',
    'directory_feedback','knowledge_new','general'
  )),
  title TEXT NOT NULL,
  body TEXT DEFAULT '',
  link TEXT DEFAULT '',
  related_group_id UUID REFERENCES groups(id),
  related_campaign_id UUID REFERENCES campaigns(id),
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 11. INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_group_actions_group ON group_actions(group_id);
CREATE INDEX IF NOT EXISTS idx_group_actions_status ON group_actions(status);
CREATE INDEX IF NOT EXISTS idx_group_tasks_group ON group_tasks(group_id);
CREATE INDEX IF NOT EXISTS idx_group_tasks_assigned ON group_tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_directory_v2_city ON directory_entries(city);
CREATE INDEX IF NOT EXISTS idx_directory_v2_type ON directory_entries(type);
CREATE INDEX IF NOT EXISTS idx_directory_v2_status ON directory_entries(status);
CREATE INDEX IF NOT EXISTS idx_directory_v2_reliability ON directory_entries(reliability_score DESC);
CREATE INDEX IF NOT EXISTS idx_directory_feedback_entry ON directory_feedback(entry_id);
CREATE INDEX IF NOT EXISTS idx_volunteer_pool_city ON volunteer_pool(city, is_active);
CREATE INDEX IF NOT EXISTS idx_volunteer_pool_skills ON volunteer_pool USING gin(skills);
CREATE INDEX IF NOT EXISTS idx_help_requests_city ON help_requests(city, status);
CREATE INDEX IF NOT EXISTS idx_help_requests_skill ON help_requests(skill_needed, status);
CREATE INDEX IF NOT EXISTS idx_news_posts_status ON news_posts(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_posts_type ON news_posts(type);
CREATE INDEX IF NOT EXISTS idx_news_posts_city ON news_posts(city);
CREATE INDEX IF NOT EXISTS idx_laws_tracker_status ON laws_tracker(status);
CREATE INDEX IF NOT EXISTS idx_report_card_city ON report_card(city);
CREATE INDEX IF NOT EXISTS idx_report_card_institution ON report_card(institution);
CREATE INDEX IF NOT EXISTS idx_report_card_status ON report_card(response_status);
CREATE INDEX IF NOT EXISTS idx_campaigns_v2_group ON campaigns(group_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_v2_city ON campaigns(city);
CREATE INDEX IF NOT EXISTS idx_campaigns_v2_status ON campaigns(status);
CREATE INDEX IF NOT EXISTS idx_rti_filings_identity ON rti_filings(identity_id);
CREATE INDEX IF NOT EXISTS idx_rti_filings_status ON rti_filings(status);
CREATE INDEX IF NOT EXISTS idx_civic_profiles_slug ON civic_profiles(slug);
CREATE INDEX IF NOT EXISTS idx_notifications_identity ON notifications(identity_id, read);
CREATE INDEX IF NOT EXISTS idx_knowledge_progress_identity ON knowledge_progress(identity_id);

-- ============================================
-- 12. TRIGGERS
-- ============================================

-- Auto-update group member count
CREATE OR REPLACE FUNCTION update_group_member_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE groups SET member_count = (
    SELECT COUNT(*) FROM group_members WHERE group_id = COALESCE(NEW.group_id, OLD.group_id)
      AND status = 'active'
  ) WHERE id = COALESCE(NEW.group_id, OLD.group_id);
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_group_member_count ON group_members;
CREATE TRIGGER trg_group_member_count
  AFTER INSERT OR UPDATE OR DELETE ON group_members
  FOR EACH ROW EXECUTE FUNCTION update_group_member_count();

-- Auto-update directory reliability score
CREATE OR REPLACE FUNCTION update_directory_reliability()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE directory_entries SET
    reliability_score = (
      SELECT COALESCE(SUM(CASE WHEN type IN ('upvote','confirm_active') THEN 1
        WHEN type IN ('downvote','report_inactive') THEN -1 ELSE 0 END), 0)
      FROM directory_feedback WHERE entry_id = NEW.entry_id
    ),
    feedback_count = (SELECT COUNT(*) FROM directory_feedback WHERE entry_id = NEW.entry_id),
    upvotes = (SELECT COUNT(*) FROM directory_feedback WHERE entry_id = NEW.entry_id AND type = 'upvote'),
    downvotes = (SELECT COUNT(*) FROM directory_feedback WHERE entry_id = NEW.entry_id AND type = 'downvote')
  WHERE id = NEW.entry_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_directory_reliability ON directory_feedback;
CREATE TRIGGER trg_directory_reliability
  AFTER INSERT ON directory_feedback
  FOR EACH ROW EXECUTE FUNCTION update_directory_reliability();

-- Auto-generate campaign slug
CREATE OR REPLACE FUNCTION generate_campaign_slug_v2()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := lower(regexp_replace(
      regexp_replace(NEW.title, '[^a-zA-Z0-9\s-]', '', 'g'),
      '\s+', '-', 'g'
    )) || '-' || substr(NEW.id::text, 1, 8);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_campaign_slug_v2 ON campaigns;
CREATE TRIGGER trg_campaign_slug_v2
  BEFORE INSERT ON campaigns
  FOR EACH ROW EXECUTE FUNCTION generate_campaign_slug_v2();

-- ============================================
-- 13. RLS POLICIES
-- ============================================

ALTER TABLE group_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE directory_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE directory_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_pool ENABLE ROW LEVEL SECURITY;
ALTER TABLE help_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE laws_tracker ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_card ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE rti_filings ENABLE ROW LEVEL SECURITY;
ALTER TABLE civic_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Everything public reads
CREATE POLICY "public_read_group_actions" ON group_actions FOR SELECT USING (TRUE);
CREATE POLICY "public_read_group_tasks" ON group_tasks FOR SELECT USING (TRUE);
CREATE POLICY "public_read_directory" ON directory_entries FOR SELECT USING (status = 'active');
CREATE POLICY "public_read_feedback" ON directory_feedback FOR SELECT USING (TRUE);
CREATE POLICY "public_read_volunteers" ON volunteer_pool FOR SELECT USING (is_active = TRUE);
CREATE POLICY "public_read_help" ON help_requests FOR SELECT USING (status = 'open');
CREATE POLICY "public_read_news" ON news_posts FOR SELECT USING (status = 'published');
CREATE POLICY "public_read_laws" ON laws_tracker FOR SELECT USING (TRUE);
CREATE POLICY "public_read_report_card" ON report_card FOR SELECT USING (status = 'active');
CREATE POLICY "public_read_knowledge_sections" ON knowledge_sections FOR SELECT USING (status = 'active');
CREATE POLICY "public_read_knowledge_articles" ON knowledge_articles FOR SELECT USING (TRUE);
CREATE POLICY "public_read_campaigns" ON campaigns FOR SELECT USING (TRUE);
CREATE POLICY "public_read_profiles" ON civic_profiles FOR SELECT USING (is_public = TRUE);

-- Service role full access
CREATE POLICY "service_all_group_actions" ON group_actions FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "service_all_group_tasks" ON group_tasks FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "service_all_directory" ON directory_entries FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "service_all_feedback" ON directory_feedback FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "service_all_volunteers" ON volunteer_pool FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "service_all_help" ON help_requests FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "service_all_news" ON news_posts FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "service_all_laws" ON laws_tracker FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "service_all_report_card" ON report_card FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "service_all_knowledge_sections" ON knowledge_sections FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "service_all_knowledge_articles" ON knowledge_articles FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "service_all_knowledge_progress" ON knowledge_progress FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "service_all_campaigns" ON campaigns FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "service_all_rti" ON rti_filings FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "service_all_profiles" ON civic_profiles FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "service_all_notifications" ON notifications FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);

-- ============================================
-- 14. SEED KNOWLEDGE SECTIONS
-- ============================================

INSERT INTO knowledge_sections (slug, title, title_hi, description, description_hi, icon, sort_order) VALUES
('how-power-works', 'How Power Works', 'सत्ता कैसे काम करती है', 'Municipality to Union. Who controls what money. How decisions get made.', 'नगरपालिका से केंद्र तक। पैसा किसके पास। फैसले कैसे होते हैं।', '🏛️', 1),
('laws-to-know', 'Laws You Should Know', 'ये कानून जानो', 'Current bills, your rights, acts that matter. Updated every session.', 'चल रहे बिल, आपके अधिकार, ज़रूरी एक्ट। हर सत्र अपडेट।', '⚖️', 2),
('the-playbook', 'The Playbook', 'प्लेबुक', 'How to contest elections. Read budgets. Organize wards. Run campaigns.', 'चुनाव कैसे लड़ें। बजट पढ़ें। वार्ड संगठित करें। अभियान चलाएं।', '📋', 3),
('rti-mastery', 'RTI Mastery', 'RTI में महारत', 'Beyond basics: appeals, IC complaints, penalties, media pressure.', 'बेसिक से आगे: अपील, IC शिकायत, जुर्माना, मीडिया दबाव।', '📄', 4),
('movement-history', 'Movement History', 'आंदोलन इतिहास', 'What won, what failed, why. India-specific case studies.', 'क्या जीता, क्या हारा, क्यों। भारत-विशिष्ट केस स्टडी।', '✊', 5)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- DONE
-- ============================================
