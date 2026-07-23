-- ============================================
-- SEED: Pothole-Owned Groups (Site Backbone)
-- Run AFTER SETUP.sql
-- These are always-present, always-moderated groups
-- ============================================

INSERT INTO chapters (name, city, area, categories, contact_method, description, status, trust_tier) VALUES
('Sahayata Legal Observers Network', 'Delhi', 'Central Delhi', ARRAY['legal','documentation'], 'https://signal.group/sahayata-legal-observers', 'Trained legal observers documenting police actions at protests. Report badge numbers, timestamps, use of force. Evidence preservation for FIR/PIL.', 'approved', 'org_verified'),
('Sahayata First Aid Collective', 'Delhi', 'Central Delhi', ARRAY['medical'], 'https://signal.group/sahayata-medics', 'Trained first aid volunteers at protest sites. Tear gas response, injury documentation, MLC guidance, hospital coordination.', 'approved', 'org_verified'),
('Sahayata Documentation Team', 'Delhi', 'Central Delhi', ARRAY['documentation','media'], 'https://signal.group/sahayata-docs', 'Photo/video evidence preservation team. Metadata-safe uploads, cloud backup, chain of custody for legal proceedings.', 'approved', 'org_verified'),
('Sahayata RTI Brigade', 'Delhi', 'Central Delhi', ARRAY['legal','general-organizing'], 'https://signal.group/sahayata-rti', 'Coordinated mass RTI filing. Pick a topic → everyone files same day → impossible to ignore. Track responses collectively.', 'approved', 'org_verified'),
('Sahayata Translation Corps', 'Delhi', 'Central Delhi', ARRAY['translation'], 'https://signal.group/sahayata-translate', 'Translate safety guides, legal templates, and platform content to regional languages. Hindi, Tamil, Bengali, Marathi, Telugu, Kannada.', 'approved', 'org_verified'),
('Sahayata Tech Collective', 'Delhi', 'Central Delhi', ARRAY['general-organizing'], 'https://github.com/paramminhas5/Pothole', 'Developers, designers, security researchers building and maintaining this platform. Open source. AGPL-3.0.', 'approved', 'org_verified'),
('Sahayata Delhi Hub', 'Delhi', 'Central Delhi', ARRAY['general-organizing','legal','medical'], 'https://signal.group/sahayata-delhi', 'Delhi-specific coordination. Local resources, protest logistics, transport, safe spaces, legal contacts for Delhi NCR.', 'approved', 'org_verified'),
('Sahayata Mumbai Hub', 'Mumbai', 'South Mumbai', ARRAY['general-organizing','legal','medical'], 'https://signal.group/sahayata-mumbai', 'Mumbai-specific coordination. Local resources, protest logistics, transport, safe spaces, legal contacts for Mumbai/MMR.', 'approved', 'org_verified'),
('Sahayata Jaipur Hub', 'Jaipur', 'Walled City', ARRAY['general-organizing','legal'], 'https://signal.group/sahayata-jaipur', 'Jaipur-specific coordination for Rajasthan movements. Student protests, exam reform, local legal support.', 'approved', 'org_verified'),
('Sahayata Womens Safety Circle', 'Delhi', 'Central Delhi', ARRAY['legal','medical'], 'https://signal.group/sahayata-women', 'Women-specific safety at protests. Female legal observers, women-only transport coordination, gender-based violence response.', 'approved', 'org_verified')
ON CONFLICT DO NOTHING;

-- Seed some community resources (verified by platform)
INSERT INTO community_resources (type, name, city, state, contact, description, source, status) VALUES
('legal-aid', 'DSLSA Free Legal Aid', 'Delhi', 'Delhi', '1516', 'Delhi State Legal Services Authority. Free lawyer assigned within 3 days. 24/7 helpline. Eligible: BPL, SC/ST, women, children, disabled.', '112.gov.in, dslsa.org', 'approved'),
('legal-aid', 'HRLN - Human Rights Law Network', 'Delhi', 'National', 'https://hrln.org', '200+ lawyers across 26 states. Pro-bono PIL, police brutality cases, rights of marginalized. Founded by Colin Gonsalves (MacArthur Award).', 'hrln.org', 'approved'),
('legal-aid', 'PUDR - Peoples Union for Democratic Rights', 'Delhi', 'Delhi', 'https://pudr.org', 'Fact-finding missions, police accountability, democratic rights defense. Published reports on July 2026 protests.', 'pudr.org', 'approved'),
('organization', 'Internet Freedom Foundation', 'Delhi', 'National', 'https://internetfreedom.in', 'Internet shutdown tracker, RTI advocacy, digital rights litigation, surveillance reform, net neutrality.', 'internetfreedom.in', 'approved'),
('mental-health', 'iCall - TISS Mumbai', 'Mumbai', 'National', '9152987821', 'Professional counseling helpline. Mon-Sat 8am-10pm. Trained counselors. Free. Confidential.', 'icallhelpline.org', 'approved'),
('mental-health', 'Vandrevala Foundation', 'Mumbai', 'National', '9999666555', '24/7 mental health helpline. Multilingual. Free. No appointment needed.', 'vandrevalafoundation.com', 'approved'),
('tool', 'ProtonVPN', 'Delhi', 'National', 'https://protonvpn.com', 'Free VPN. No logs. Swiss-based. Use during internet shutdowns to bypass blocks. Install BEFORE shutdown.', 'protonvpn.com', 'approved'),
('tool', 'Briar - Mesh Messaging', 'Delhi', 'National', 'https://briarproject.org', 'Messaging app that works WITHOUT internet via Bluetooth/WiFi Direct. ~100m range. Chain relay possible. Android only.', 'briarproject.org', 'approved'),
('tool', 'Signal - Encrypted Messaging', 'Delhi', 'National', 'https://signal.org', 'Gold standard encrypted messaging. Disappearing messages. Phone number required but can be hidden from groups.', 'signal.org', 'approved'),
('shelter', 'Gurdwara Bangla Sahib', 'Delhi', 'Delhi', 'Connaught Place, New Delhi', '24/7 open. Free langar (food), water, rest space. No questions asked. Welcome to all.', 'Known landmark', 'approved')
ON CONFLICT DO NOTHING;
