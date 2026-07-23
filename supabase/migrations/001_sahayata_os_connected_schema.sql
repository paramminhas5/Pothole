-- ╔══════════════════════════════════════════════════════════════════╗
-- ║  SAHAYATA OS — CONNECTED PLATFORM SCHEMA                       ║
-- ║  Everything connects through campaigns as the atomic unit       ║
-- ╚══════════════════════════════════════════════════════════════════╝

-- ============================================
-- 1. CAMPAIGNS — The Atomic Unit
-- ============================================


CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_identity_id UUID NOT NULL REFERENCES identities(id),
  chapter_id UUID REFERENCES chapters(id),
  title TEXT NOT NULL CHECK (char_length(title) BETWEEN 5 AND 200),
  title_hi TEXT DEFAULT '',
  slug TEXT UNIQUE,
  issue_statement TEXT NOT NULL CHECK (char_length(issue_statement) >= 10),
  issue_statement_hi TEXT DEFAULT '',
  city TEXT NOT NULL,
  area TEXT DEFAULT '',
  category TEXT NOT NULL,
  target_institution TEXT NOT NULL CHECK (char_length(target_institution) BETWEEN 3 AND 300),
  target_jurisdiction TEXT DEFAULT '',
  primary_demand TEXT NOT NULL CHECK (char_length(primary_demand) >= 5),
  primary_demand_hi TEXT DEFAULT '',
  secondary_demands JSONB DEFAULT '[]',
  deadline DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft','live','escalating','concluded_won',
      'concluded_partial','concluded_refused','concluded_abandoned')),
  template_slug TEXT,
  evidence_summary TEXT DEFAULT '',
  escalation_plan JSONB DEFAULT '[]',
  outcome_summary TEXT DEFAULT '',
  outcome_summary_hi TEXT DEFAULT '',
  supporter_count INTEGER DEFAULT 0,
  filing_count INTEGER DEFAULT 0,
  task_count INTEGER DEFAULT 0,
  published_at TIMESTAMPTZ,
  concluded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================
-- 2. CAMPAIGN EVIDENCE — Documents, photos, filings
-- ============================================

CREATE TABLE IF NOT EXISTS campaign_evidence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('document','photo','filing','response','media','rti','fir')),
  title TEXT NOT NULL CHECK (char_length(title) BETWEEN 1 AND 300),
  description TEXT DEFAULT '',
  file_url TEXT,
  source_url TEXT,
  provenance TEXT DEFAULT '',
  uploaded_by UUID REFERENCES identities(id),
  consent_recorded BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. CAMPAIGN TEAM — Roles within a campaign
-- ============================================

CREATE TABLE IF NOT EXISTS campaign_team (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  identity_id UUID NOT NULL REFERENCES identities(id),
  role TEXT NOT NULL CHECK (role IN ('lead','legal','comms','field','welfare','volunteer','medic','transport')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active','left','removed')),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(campaign_id, identity_id)
);

-- ============================================
-- 4. CAMPAIGN TASKS — Work within a campaign
-- ============================================

CREATE TABLE IF NOT EXISTS campaign_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  title TEXT NOT NULL CHECK (char_length(title) BETWEEN 1 AND 300),
  description TEXT DEFAULT '',
  skill_needed TEXT,
  assigned_to UUID REFERENCES identities(id),
  status TEXT DEFAULT 'open' CHECK (status IN ('open','claimed','in_progress','done','cancelled')),
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low','normal','high','urgent')),
  due_date DATE,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================
-- 5. RTI FILINGS — Tracked escalation machines
-- ============================================

CREATE TABLE IF NOT EXISTS rti_filings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identity_id UUID REFERENCES identities(id),
  session_token TEXT,
  campaign_id UUID REFERENCES campaigns(id),
  authority_name TEXT NOT NULL,
  authority_address TEXT DEFAULT '',
  subject TEXT NOT NULL,
  questions JSONB DEFAULT '[]',
  filed_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'filed'
    CHECK (status IN ('filed','awaiting','first_appeal','second_appeal',
      'ic_complaint','responded','penalty_ordered','closed')),
  deadline_date DATE NOT NULL,
  response_received BOOLEAN DEFAULT FALSE,
  response_date DATE,
  response_summary TEXT DEFAULT '',
  appeal_filed_date DATE,
  appeal_deadline DATE,
  ic_complaint_date DATE,
  penalty_amount INTEGER DEFAULT 0,
  generated_documents JSONB DEFAULT '[]',
  city TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 6. SKILL EXCHANGE — Anchored to campaigns
-- ============================================

CREATE TABLE IF NOT EXISTS skill_exchange (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id),
  chapter_id UUID REFERENCES chapters(id),
  type TEXT NOT NULL CHECK (type IN ('need','offer')),
  skill_type TEXT NOT NULL CHECK (skill_type IN (
    'legal','design','translation','photography','video',
    'writing','research','field_volunteer','medical','tech',
    'transport','supplies','training','media','other'
  )),
  title TEXT NOT NULL CHECK (char_length(title) BETWEEN 3 AND 200),
  description TEXT NOT NULL CHECK (char_length(description) BETWEEN 10 AND 1000),
  city TEXT NOT NULL,
  area TEXT DEFAULT '',
  urgency TEXT DEFAULT 'normal' CHECK (urgency IN ('normal','urgent','flexible')),
  identity_id UUID NOT NULL REFERENCES identities(id),
  status TEXT DEFAULT 'open' CHECK (status IN ('open','matched','fulfilled','expired','cancelled')),
  matched_with UUID REFERENCES identities(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days')
);


-- ============================================
-- 7. DIRECTORY — Verified support, linked to campaigns
-- ============================================

CREATE TABLE IF NOT EXISTS directory_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN (
    'legal-aid','helpline','organization','ngo','lawyer','doctor',
    'shelter','media','mental-health','education','transport',
    'student-union','political-party','government-office','other'
  )),
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 2 AND 300),
  name_hi TEXT DEFAULT '',
  city TEXT NOT NULL,
  area TEXT DEFAULT '',
  state TEXT DEFAULT '',
  contact_method TEXT NOT NULL,
  description TEXT NOT NULL CHECK (char_length(description) BETWEEN 10 AND 1000),
  description_hi TEXT DEFAULT '',
  website TEXT DEFAULT '',
  specializations TEXT[] DEFAULT '{}',
  operating_hours TEXT DEFAULT '',
  languages TEXT[] DEFAULT '{"en","hi"}',
  -- verification
  verification_status TEXT DEFAULT 'unverified'
    CHECK (verification_status IN ('unverified','self_claimed','community_vouched','staff_verified')),
  verified_what TEXT DEFAULT '',
  verified_by TEXT DEFAULT '',
  verified_at TIMESTAMPTZ,
  last_confirmed_active TIMESTAMPTZ DEFAULT NOW(),
  -- connections
  campaign_affiliations UUID[] DEFAULT '{}',
  chapter_id UUID REFERENCES chapters(id),
  submitted_by UUID REFERENCES identities(id),
  -- lifecycle
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','active','inactive','removed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 8. CAMPAIGN GROUPS — Groups ARE campaign teams
-- ============================================

ALTER TABLE groups ADD COLUMN IF NOT EXISTS campaign_id UUID REFERENCES campaigns(id);
ALTER TABLE groups ADD COLUMN IF NOT EXISTS group_type TEXT DEFAULT 'campaign'
  CHECK (group_type IN ('campaign','protest','mutual_aid','study','chapter'));


-- ============================================
-- 9. POWER SCHOOL — Curriculum + proof
-- ============================================

CREATE TABLE IF NOT EXISTS school_tracks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  title_hi TEXT NOT NULL,
  description TEXT NOT NULL,
  description_hi TEXT NOT NULL,
  difficulty TEXT DEFAULT 'beginner' CHECK (difficulty IN ('beginner','intermediate','advanced')),
  estimated_hours INTEGER DEFAULT 10,
  lesson_count INTEGER DEFAULT 0,
  field_assignment_count INTEGER DEFAULT 0,
  prerequisite_track_id UUID REFERENCES school_tracks(id),
  sort_order INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('draft','active','archived')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS school_lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  track_id UUID NOT NULL REFERENCES school_tracks(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  title_hi TEXT NOT NULL,
  content_md TEXT NOT NULL,
  content_md_hi TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  estimated_minutes INTEGER DEFAULT 15,
  field_assignment JSONB,
  resources JSONB DEFAULT '[]',
  UNIQUE(track_id, slug)
);

CREATE TABLE IF NOT EXISTS school_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identity_id UUID NOT NULL REFERENCES identities(id),
  track_id UUID NOT NULL REFERENCES school_tracks(id),
  cohort_id UUID,
  status TEXT DEFAULT 'active' CHECK (status IN ('active','completed','paused','dropped')),
  progress_pct INTEGER DEFAULT 0,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  UNIQUE(identity_id, track_id)
);

CREATE TABLE IF NOT EXISTS school_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identity_id UUID NOT NULL REFERENCES identities(id),
  lesson_id UUID NOT NULL REFERENCES school_lessons(id),
  track_id UUID NOT NULL REFERENCES school_tracks(id),
  assignment_submitted BOOLEAN DEFAULT FALSE,
  assignment_proof_url TEXT,
  assignment_proof_type TEXT,
  assignment_verified BOOLEAN DEFAULT FALSE,
  verified_by UUID REFERENCES identities(id),
  verified_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(identity_id, lesson_id)
);


CREATE TABLE IF NOT EXISTS school_cohorts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  track_id UUID NOT NULL REFERENCES school_tracks(id),
  chapter_id UUID REFERENCES chapters(id),
  facilitator_id UUID REFERENCES identities(id),
  name TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming','active','completed','cancelled')),
  max_participants INTEGER DEFAULT 30,
  participant_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 10. CIVIC PROFILES — Portable track record
-- ============================================

CREATE TABLE IF NOT EXISTS civic_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identity_id UUID NOT NULL UNIQUE REFERENCES identities(id),
  display_name TEXT NOT NULL CHECK (char_length(display_name) BETWEEN 2 AND 100),
  bio TEXT DEFAULT '',
  bio_hi TEXT DEFAULT '',
  city TEXT DEFAULT '',
  is_public BOOLEAN DEFAULT FALSE,
  slug TEXT UNIQUE,
  -- aggregated stats (updated by triggers)
  rtis_filed INTEGER DEFAULT 0,
  rtis_responded INTEGER DEFAULT 0,
  rtis_penalties INTEGER DEFAULT 0,
  campaigns_led INTEGER DEFAULT 0,
  campaigns_contributed INTEGER DEFAULT 0,
  campaigns_won INTEGER DEFAULT 0,
  tracks_completed INTEGER DEFAULT 0,
  people_trained INTEGER DEFAULT 0,
  field_assignments_verified INTEGER DEFAULT 0,
  -- verification
  identity_verified BOOLEAN DEFAULT FALSE,
  verified_method TEXT DEFAULT '',
  verified_at TIMESTAMPTZ,
  -- privacy controls
  show_rtis BOOLEAN DEFAULT TRUE,
  show_campaigns BOOLEAN DEFAULT TRUE,
  show_school BOOLEAN DEFAULT TRUE,
  show_skills BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================
-- 11. ACCOUNTABILITY LEDGER — Public record
-- ============================================

CREATE TABLE IF NOT EXISTS ledger_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id),
  demand_text TEXT NOT NULL,
  demand_text_hi TEXT DEFAULT '',
  target_institution TEXT NOT NULL,
  target_city TEXT NOT NULL,
  target_jurisdiction TEXT DEFAULT '',
  filed_date DATE NOT NULL,
  deadline_date DATE NOT NULL,
  days_elapsed INTEGER GENERATED ALWAYS AS (CURRENT_DATE - filed_date) STORED,
  response_status TEXT DEFAULT 'silent'
    CHECK (response_status IN ('silent','acknowledged','partial_response',
      'full_response','refused','escalated')),
  response_text TEXT DEFAULT '',
  response_date DATE,
  source_document_url TEXT,
  source_filing_id UUID REFERENCES rti_filings(id),
  correction_requested BOOLEAN DEFAULT FALSE,
  correction_text TEXT DEFAULT '',
  is_verified BOOLEAN DEFAULT FALSE,
  verified_by TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 12. CAMPAIGN SUPPORTERS — Who backs a campaign
-- ============================================

CREATE TABLE IF NOT EXISTS campaign_supporters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  identity_id UUID NOT NULL REFERENCES identities(id),
  support_type TEXT DEFAULT 'endorse'
    CHECK (support_type IN ('endorse','volunteer','skill_offer','resource')),
  message TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(campaign_id, identity_id)
);

-- ============================================
-- 13. CAMPAIGN UPDATES — Timeline of a campaign
-- ============================================

CREATE TABLE IF NOT EXISTS campaign_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES identities(id),
  update_type TEXT NOT NULL CHECK (update_type IN (
    'progress','escalation','response_received','deadline_passed',
    'team_change','evidence_added','milestone','outcome'
  )),
  title TEXT NOT NULL,
  title_hi TEXT DEFAULT '',
  body TEXT DEFAULT '',
  body_hi TEXT DEFAULT '',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================
-- 14. CAMPAIGN TEMPLATES — Pre-built skeletons
-- ============================================

CREATE TABLE IF NOT EXISTS campaign_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  title_hi TEXT NOT NULL,
  description TEXT NOT NULL,
  description_hi TEXT NOT NULL,
  category TEXT NOT NULL,
  typical_target_type TEXT NOT NULL,
  typical_instruments TEXT[] DEFAULT '{}',
  typical_timeline_days INTEGER DEFAULT 90,
  steps JSONB NOT NULL DEFAULT '[]',
  sort_order INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active'
);

-- ============================================
-- 15. NOTIFICATIONS — Return loop
-- ============================================

CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identity_id UUID NOT NULL REFERENCES identities(id),
  type TEXT NOT NULL CHECK (type IN (
    'rti_deadline','rti_appeal_due','campaign_update','task_assigned',
    'skill_match','campaign_response','school_assignment','cohort_start',
    'team_invite','supporter_joined','general'
  )),
  title TEXT NOT NULL,
  body TEXT DEFAULT '',
  link TEXT DEFAULT '',
  related_campaign_id UUID REFERENCES campaigns(id),
  related_rti_id UUID REFERENCES rti_filings(id),
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 16. ENHANCED IDENTITY — Power layer additions
-- ============================================

ALTER TABLE identities ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE identities ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE;
ALTER TABLE identities ADD COLUMN IF NOT EXISTS city TEXT DEFAULT '';
ALTER TABLE identities ADD COLUMN IF NOT EXISTS skills TEXT[] DEFAULT '{}';
ALTER TABLE identities ADD COLUMN IF NOT EXISTS chapter_id UUID REFERENCES chapters(id);
ALTER TABLE identities ADD COLUMN IF NOT EXISTS onboarded BOOLEAN DEFAULT FALSE;
ALTER TABLE identities ADD COLUMN IF NOT EXISTS profile_id UUID;


-- ============================================
-- 17. INDEXES — Performance at scale
-- ============================================

CREATE INDEX IF NOT EXISTS idx_campaigns_status ON campaigns(status);
CREATE INDEX IF NOT EXISTS idx_campaigns_city ON campaigns(city);
CREATE INDEX IF NOT EXISTS idx_campaigns_category ON campaigns(category);
CREATE INDEX IF NOT EXISTS idx_campaigns_creator ON campaigns(creator_identity_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_chapter ON campaigns(chapter_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_slug ON campaigns(slug);
CREATE INDEX IF NOT EXISTS idx_campaign_evidence_campaign ON campaign_evidence(campaign_id);
CREATE INDEX IF NOT EXISTS idx_campaign_team_campaign ON campaign_team(campaign_id);
CREATE INDEX IF NOT EXISTS idx_campaign_team_identity ON campaign_team(identity_id);
CREATE INDEX IF NOT EXISTS idx_campaign_tasks_campaign ON campaign_tasks(campaign_id);
CREATE INDEX IF NOT EXISTS idx_campaign_tasks_status ON campaign_tasks(status);
CREATE INDEX IF NOT EXISTS idx_campaign_tasks_assigned ON campaign_tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_rti_filings_identity ON rti_filings(identity_id);
CREATE INDEX IF NOT EXISTS idx_rti_filings_campaign ON rti_filings(campaign_id);
CREATE INDEX IF NOT EXISTS idx_rti_filings_status ON rti_filings(status);
CREATE INDEX IF NOT EXISTS idx_rti_filings_deadline ON rti_filings(deadline_date);
CREATE INDEX IF NOT EXISTS idx_skill_exchange_campaign ON skill_exchange(campaign_id);
CREATE INDEX IF NOT EXISTS idx_skill_exchange_type ON skill_exchange(type, skill_type);
CREATE INDEX IF NOT EXISTS idx_skill_exchange_city ON skill_exchange(city);
CREATE INDEX IF NOT EXISTS idx_skill_exchange_status ON skill_exchange(status);
CREATE INDEX IF NOT EXISTS idx_directory_entries_city ON directory_entries(city);
CREATE INDEX IF NOT EXISTS idx_directory_entries_type ON directory_entries(type);
CREATE INDEX IF NOT EXISTS idx_directory_entries_status ON directory_entries(status);
CREATE INDEX IF NOT EXISTS idx_school_enrollments_identity ON school_enrollments(identity_id);
CREATE INDEX IF NOT EXISTS idx_school_completions_identity ON school_completions(identity_id);
CREATE INDEX IF NOT EXISTS idx_school_completions_track ON school_completions(track_id);
CREATE INDEX IF NOT EXISTS idx_civic_profiles_slug ON civic_profiles(slug);
CREATE INDEX IF NOT EXISTS idx_civic_profiles_public ON civic_profiles(is_public);
CREATE INDEX IF NOT EXISTS idx_ledger_entries_campaign ON ledger_entries(campaign_id);
CREATE INDEX IF NOT EXISTS idx_ledger_entries_city ON ledger_entries(target_city);
CREATE INDEX IF NOT EXISTS idx_ledger_entries_institution ON ledger_entries(target_institution);
CREATE INDEX IF NOT EXISTS idx_ledger_entries_status ON ledger_entries(response_status);
CREATE INDEX IF NOT EXISTS idx_campaign_supporters_campaign ON campaign_supporters(campaign_id);
CREATE INDEX IF NOT EXISTS idx_campaign_updates_campaign ON campaign_updates(campaign_id);
CREATE INDEX IF NOT EXISTS idx_notifications_identity ON notifications(identity_id, read);
CREATE INDEX IF NOT EXISTS idx_notifications_campaign ON notifications(related_campaign_id);


-- ============================================
-- 18. TRIGGERS — Auto-update stats
-- ============================================

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

DROP TRIGGER IF EXISTS trg_campaign_supporter_count ON campaign_supporters;
CREATE TRIGGER trg_campaign_supporter_count
  AFTER INSERT OR DELETE ON campaign_supporters
  FOR EACH ROW EXECUTE FUNCTION update_campaign_supporter_count();

CREATE OR REPLACE FUNCTION update_campaign_filing_count()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.campaign_id IS NOT NULL THEN
    UPDATE campaigns SET filing_count = (
      SELECT COUNT(*) FROM rti_filings WHERE campaign_id = NEW.campaign_id
    ) WHERE id = NEW.campaign_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_campaign_filing_count ON rti_filings;
CREATE TRIGGER trg_campaign_filing_count
  AFTER INSERT OR UPDATE OF campaign_id ON rti_filings
  FOR EACH ROW EXECUTE FUNCTION update_campaign_filing_count();

CREATE OR REPLACE FUNCTION update_civic_profile_stats()
RETURNS TRIGGER AS $$
BEGIN
  -- Update RTI stats
  UPDATE civic_profiles SET
    rtis_filed = (SELECT COUNT(*) FROM rti_filings WHERE identity_id = NEW.identity_id),
    rtis_responded = (SELECT COUNT(*) FROM rti_filings WHERE identity_id = NEW.identity_id AND response_received = TRUE)
  WHERE identity_id = NEW.identity_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_civic_profile_rti ON rti_filings;
CREATE TRIGGER trg_civic_profile_rti
  AFTER INSERT OR UPDATE ON rti_filings
  FOR EACH ROW EXECUTE FUNCTION update_civic_profile_stats();

-- Auto-generate campaign slug
CREATE OR REPLACE FUNCTION generate_campaign_slug()
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

DROP TRIGGER IF EXISTS trg_campaign_slug ON campaigns;
CREATE TRIGGER trg_campaign_slug
  BEFORE INSERT ON campaigns
  FOR EACH ROW EXECUTE FUNCTION generate_campaign_slug();

-- Updated_at triggers for new tables
DROP TRIGGER IF EXISTS campaigns_updated_at ON campaigns;
CREATE TRIGGER campaigns_updated_at BEFORE UPDATE ON campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS rti_filings_updated_at ON rti_filings;
CREATE TRIGGER rti_filings_updated_at BEFORE UPDATE ON rti_filings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS directory_entries_updated_at ON directory_entries;
CREATE TRIGGER directory_entries_updated_at BEFORE UPDATE ON directory_entries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS civic_profiles_updated_at ON civic_profiles;
CREATE TRIGGER civic_profiles_updated_at BEFORE UPDATE ON civic_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS ledger_entries_updated_at ON ledger_entries;
CREATE TRIGGER ledger_entries_updated_at BEFORE UPDATE ON ledger_entries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- 19. RLS POLICIES — Secure by default
-- ============================================

ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_team ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE rti_filings ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_exchange ENABLE ROW LEVEL SECURITY;
ALTER TABLE directory_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE school_tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE school_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE school_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE school_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE school_cohorts ENABLE ROW LEVEL SECURITY;
ALTER TABLE civic_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE ledger_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_supporters ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Public read: only published/active data
CREATE POLICY "public_read_live_campaigns" ON campaigns FOR SELECT USING (status != 'draft');
CREATE POLICY "public_read_campaign_evidence" ON campaign_evidence FOR SELECT USING (TRUE);
CREATE POLICY "public_read_campaign_team" ON campaign_team FOR SELECT USING (TRUE);
CREATE POLICY "public_read_campaign_tasks" ON campaign_tasks FOR SELECT USING (TRUE);
CREATE POLICY "public_read_directory" ON directory_entries FOR SELECT USING (status = 'active');
CREATE POLICY "public_read_school_tracks" ON school_tracks FOR SELECT USING (status = 'active');
CREATE POLICY "public_read_school_lessons" ON school_lessons FOR SELECT USING (TRUE);
CREATE POLICY "public_read_civic_profiles" ON civic_profiles FOR SELECT USING (is_public = TRUE);
CREATE POLICY "public_read_ledger" ON ledger_entries FOR SELECT USING (TRUE);
CREATE POLICY "public_read_supporters" ON campaign_supporters FOR SELECT USING (TRUE);
CREATE POLICY "public_read_updates" ON campaign_updates FOR SELECT USING (TRUE);
CREATE POLICY "public_read_templates" ON campaign_templates FOR SELECT USING (status = 'active');
CREATE POLICY "public_read_skill_exchange" ON skill_exchange FOR SELECT USING (status = 'open');

-- Service role full access
CREATE POLICY "service_campaigns" ON campaigns FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "service_campaign_evidence" ON campaign_evidence FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "service_campaign_team" ON campaign_team FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "service_campaign_tasks" ON campaign_tasks FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "service_rti_filings" ON rti_filings FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "service_skill_exchange" ON skill_exchange FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "service_directory_entries" ON directory_entries FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "service_school_tracks" ON school_tracks FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "service_school_lessons" ON school_lessons FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "service_school_enrollments" ON school_enrollments FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "service_school_completions" ON school_completions FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "service_school_cohorts" ON school_cohorts FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "service_civic_profiles" ON civic_profiles FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "service_ledger_entries" ON ledger_entries FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "service_campaign_supporters" ON campaign_supporters FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "service_campaign_updates" ON campaign_updates FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "service_campaign_templates" ON campaign_templates FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "service_notifications" ON notifications FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);

-- ============================================
-- 20. SEED CAMPAIGN TEMPLATES
-- ============================================

INSERT INTO campaign_templates (slug, title, title_hi, description, description_hi, category, typical_target_type, typical_instruments, typical_timeline_days, steps, sort_order) VALUES
('bad-roads', 'Bad Roads / Potholes', 'खराब सड़कें / गड्ढे', 'Campaign against road damage and municipal negligence', 'सड़क क्षति और नगरपालिका लापरवाही के खिलाफ अभियान', 'infrastructure', 'Municipal Corporation / PWD', ARRAY['RTI','complaint','escalation'], 60, '[{"step":1,"action":"Document damage with photos and GPS","action_hi":"फोटो और GPS के साथ नुकसान का दस्तावेज"},{"step":2,"action":"File RTI to Municipal Corporation asking for road maintenance budget and last repair date","action_hi":"नगर निगम को सड़क रखरखाव बजट के लिए RTI"},{"step":3,"action":"File formal complaint to Municipal Commissioner","action_hi":"नगर आयुक्त को शिकायत"},{"step":4,"action":"If no response in 30 days, escalate to District Collector","action_hi":"30 दिन में जवाब न मिले तो जिला कलेक्टर को"},{"step":5,"action":"Generate silence card and share on social media","action_hi":"साइलेंस कार्ड बनाएं और सोशल मीडिया पर शेयर करें"}]', 1),
('water-supply', 'Water Supply Issues', 'पानी की समस्या', 'Campaign for clean and consistent water supply', 'स्वच्छ और नियमित पानी के लिए अभियान', 'infrastructure', 'Jal Board / Municipal Corporation', ARRAY['RTI','complaint','PIL'], 90, '[{"step":1,"action":"Document water quality/supply issues"},{"step":2,"action":"File RTI to Jal Board for water testing reports"},{"step":3,"action":"Organize affected residents"},{"step":4,"action":"File formal complaint"},{"step":5,"action":"Escalate to National Green Tribunal if pollution"}]', 2),
('garbage-collection', 'Garbage & Sanitation', 'कचरा और स्वच्छता', 'Campaign for proper waste management', 'उचित कचरा प्रबंधन के लिए अभियान', 'infrastructure', 'Municipal Corporation / Swachh Bharat', ARRAY['RTI','complaint'], 45, '[]', 3),
('streetlights', 'Streetlight Repair', 'स्ट्रीटलाइट मरम्मत', 'Campaign for functional street lighting', 'कार्यशील स्ट्रीट लाइटिंग के लिए अभियान', 'infrastructure', 'Electricity Board / Municipal Corp', ARRAY['RTI','complaint'], 30, '[]', 4),
('college-fees', 'College Fee Hike', 'कॉलेज फीस बढ़ोतरी', 'Campaign against unreasonable fee increases', 'अनुचित फीस वृद्धि के खिलाफ अभियान', 'education', 'University / UGC / State Education Dept', ARRAY['RTI','representation','legal_notice'], 90, '[]', 5),
('hostel-conditions', 'Hostel Conditions', 'छात्रावास हालात', 'Campaign for better hostel living conditions', 'बेहतर छात्रावास स्थिति के लिए अभियान', 'education', 'University / College Administration', ARRAY['RTI','complaint','representation'], 60, '[]', 6),
('police-inaction', 'Police Inaction', 'पुलिस निष्क्रियता', 'Campaign against police failure to act', 'पुलिस की निष्क्रियता के खिलाफ अभियान', 'accountability', 'SP / Commissioner / State Human Rights Commission', ARRAY['FIR','complaint','SHRC'], 45, '[]', 7),
('pollution', 'Pollution Incident', 'प्रदूषण घटना', 'Campaign against environmental pollution', 'पर्यावरण प्रदूषण के खिलाफ अभियान', 'environment', 'Pollution Control Board / NGT', ARRAY['RTI','complaint','NGT_application'], 120, '[]', 8),
('illegal-construction', 'Illegal Construction', 'अवैध निर्माण', 'Campaign against unauthorized building', 'अनधिकृत निर्माण के खिलाफ अभियान', 'infrastructure', 'Municipal Corporation / DDA', ARRAY['RTI','complaint'], 60, '[]', 9),
('ration-denial', 'Ration/Benefit Denial', 'राशन/लाभ मनाही', 'Campaign for rightful government benefits', 'सरकारी लाभ प्राप्ति के लिए अभियान', 'welfare', 'PDS / District Supply Officer / Social Welfare', ARRAY['RTI','complaint','grievance'], 30, '[]', 10)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- DONE — Connected schema ready
-- ============================================
