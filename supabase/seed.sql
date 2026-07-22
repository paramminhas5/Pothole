-- ============================================
-- SAHAYATA PLATFORM — SEED DATA
-- Realistic chapters, posts for 12 cities
-- Makes the platform feel alive on first visit
-- ============================================

-- CHAPTERS (approved, realistic)
INSERT INTO chapters (name, city, area, categories, contact_method, description, status, created_at, updated_at) VALUES
-- Delhi
('Delhi Legal Aid Collective', 'Delhi', 'Central Delhi', ARRAY['legal'], 'https://t.me/delhilegalaid', 'Volunteer lawyers offering free legal advice and representation. Available 24/7 for detentions.', 'approved', NOW() - INTERVAL '5 days', NOW() - INTERVAL '1 hour'),
('South Delhi Medics Network', 'Delhi', 'South Delhi', ARRAY['medical', 'supplies'], 'mailto:southdelhimedics@proton.me', 'Trained first-aid volunteers and paramedics. We carry supplies and can reach most of South Delhi within 30 minutes.', 'approved', NOW() - INTERVAL '7 days', NOW() - INTERVAL '3 hours'),
('Delhi Food Brigade', 'Delhi', 'East Delhi', ARRAY['food-water', 'supplies'], 'https://t.me/delhifoodbrigade', 'Community kitchen providing free meals and water. We can deliver to gatherings of 50+ people.', 'approved', NOW() - INTERVAL '4 days', NOW() - INTERVAL '6 hours'),
('New Delhi Documentation Team', 'Delhi', 'New Delhi', ARRAY['documentation', 'media'], 'mailto:newdelhidocs@proton.me', 'Citizen journalists documenting events. We verify, timestamp, and archive footage safely.', 'approved', NOW() - INTERVAL '3 days', NOW() - INTERVAL '2 hours'),
('West Delhi Transport Volunteers', 'Delhi', 'West Delhi', ARRAY['transport'], 'https://t.me/westdelhirides', 'Volunteer drivers with cars and two-wheelers. Free rides to hospitals, legal aid, or safe locations.', 'approved', NOW() - INTERVAL '6 days', NOW() - INTERVAL '4 hours'),

-- Mumbai
('Mumbai Lawyers Forum', 'Mumbai', 'South Mumbai', ARRAY['legal', 'documentation'], 'https://t.me/mumbailawyers', 'Bar-registered advocates offering pro bono representation. Specialize in civil liberties and wrongful detention cases.', 'approved', NOW() - INTERVAL '8 days', NOW() - INTERVAL '2 hours'),
('Western Suburbs Aid Network', 'Mumbai', 'Western Suburbs', ARRAY['food-water', 'shelter', 'medical'], 'mailto:westernaid@proton.me', 'Multi-service chapter covering Andheri to Borivali. Food, temporary shelter, first aid available.', 'approved', NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 hours'),
('Navi Mumbai Solidarity', 'Mumbai', 'Navi Mumbai', ARRAY['general-organizing', 'transport'], 'https://t.me/navimumbaisolidarity', 'Community organizing and mutual aid. Transport coordination for rallies and emergencies.', 'approved', NOW() - INTERVAL '4 days', NOW() - INTERVAL '1 hour'),

-- Bengaluru
('Bengaluru Legal Aid Network', 'Bengaluru', 'Central Bengaluru', ARRAY['legal'], 'https://t.me/blrlegalaid', 'Network of 15+ lawyers available for emergency legal support. Hindi, Kannada, English speaking.', 'approved', NOW() - INTERVAL '6 days', NOW() - INTERVAL '3 hours'),
('Koramangala First Responders', 'Bengaluru', 'South Bengaluru', ARRAY['medical', 'supplies'], 'mailto:blrfirstresponders@proton.me', 'Trained first-aid team with medical supplies. Can dispatch within 15 minutes in South Bengaluru.', 'approved', NOW() - INTERVAL '3 days', NOW() - INTERVAL '1 hour'),
('BLR Translation Corps', 'Bengaluru', 'Central Bengaluru', ARRAY['translation', 'documentation'], 'https://t.me/blrtranslation', 'Volunteer translators covering Kannada, Hindi, Tamil, Telugu, and English. Available for documents and live interpretation.', 'approved', NOW() - INTERVAL '5 days', NOW() - INTERVAL '4 hours'),

-- Hyderabad
('Hyderabad Rights Collective', 'Hyderabad', 'Central Hyderabad', ARRAY['legal', 'documentation'], 'https://t.me/hydlegalcollective', 'Civil liberties lawyers and paralegals. Focus on wrongful detention and FIR support.', 'approved', NOW() - INTERVAL '7 days', NOW() - INTERVAL '2 hours'),
('Old City Mutual Aid', 'Hyderabad', 'Old City', ARRAY['food-water', 'medical', 'shelter'], 'mailto:oldcitymutualaid@proton.me', 'Community-run mutual aid covering food, medical supplies, and emergency shelter in Old City area.', 'approved', NOW() - INTERVAL '4 days', NOW() - INTERVAL '3 hours'),

-- Chennai
('Chennai Legal Support', 'Chennai', 'Central Chennai', ARRAY['legal', 'translation'], 'https://t.me/chennailegal', 'Tamil and English speaking lawyers. Expertise in preventive detention and bail applications.', 'approved', NOW() - INTERVAL '6 days', NOW() - INTERVAL '5 hours'),
('North Chennai Solidarity Kitchen', 'Chennai', 'North Chennai', ARRAY['food-water', 'supplies'], 'mailto:nchennaikitchen@proton.me', 'Community kitchen serving 200+ meals daily. Free water and basic supplies distribution.', 'approved', NOW() - INTERVAL '3 days', NOW() - INTERVAL '1 hour'),

-- Kolkata
('Kolkata Legal Circle', 'Kolkata', 'Central Kolkata', ARRAY['legal'], 'https://t.me/kolkatalegal', 'Advocate network specializing in constitutional rights. Bengali, Hindi, and English.', 'approved', NOW() - INTERVAL '5 days', NOW() - INTERVAL '2 hours'),
('Salt Lake Tech Volunteers', 'Kolkata', 'Salt Lake', ARRAY['documentation', 'media', 'translation'], 'mailto:saltlaketech@proton.me', 'Digital documentation, secure communications setup, and translation services.', 'approved', NOW() - INTERVAL '4 days', NOW() - INTERVAL '6 hours'),

-- Pune
('Pune Advocates Alliance', 'Pune', 'Central Pune', ARRAY['legal'], 'https://t.me/puneadvocates', 'Coalition of lawyers providing free legal aid. Bail applications, FIR support, and rights counseling.', 'approved', NOW() - INTERVAL '7 days', NOW() - INTERVAL '3 hours'),
('Pimpri-Chinchwad Workers Collective', 'Pune', 'Pimpri-Chinchwad', ARRAY['food-water', 'transport', 'shelter'], 'mailto:pcwc@proton.me', 'Workers solidarity network providing meals, temporary shelter, and transport coordination.', 'approved', NOW() - INTERVAL '5 days', NOW() - INTERVAL '4 hours'),

-- Ahmedabad
('Ahmedabad Human Rights Group', 'Ahmedabad', 'Central Ahmedabad', ARRAY['legal', 'documentation'], 'https://t.me/amdlegal', 'Human rights lawyers and citizen documentation team. Gujarati, Hindi, English.', 'approved', NOW() - INTERVAL '6 days', NOW() - INTERVAL '2 hours'),

-- Jaipur
('Jaipur Legal Aid Society', 'Jaipur', 'Civil Lines', ARRAY['legal', 'translation'], 'https://t.me/jaipurlegal', 'Lawyers providing free consultation and representation. Hindi and English.', 'approved', NOW() - INTERVAL '4 days', NOW() - INTERVAL '5 hours'),
('Mansarovar Community Kitchen', 'Jaipur', 'Mansarovar', ARRAY['food-water', 'supplies'], 'mailto:mansarovarkitchen@proton.me', 'Daily community meals and water distribution. Supplies available for large gatherings.', 'approved', NOW() - INTERVAL '3 days', NOW() - INTERVAL '1 hour'),

-- Lucknow
('Lucknow Civil Liberties Union', 'Lucknow', 'Hazratganj', ARRAY['legal', 'documentation'], 'https://t.me/lucknowclu', 'Senior advocates network for civil liberties cases. 24/7 detention helpline.', 'approved', NOW() - INTERVAL '5 days', NOW() - INTERVAL '3 hours'),

-- Chandigarh
('Chandigarh Student Support Network', 'Chandigarh', 'Sector 1-20', ARRAY['legal', 'medical', 'general-organizing'], 'https://t.me/chdsupport', 'Student-run support network. Legal aid contacts, first aid, and community organizing.', 'approved', NOW() - INTERVAL '6 days', NOW() - INTERVAL '2 hours'),

-- Bhopal
('Bhopal Solidarity Network', 'Bhopal', 'New Bhopal', ARRAY['legal', 'food-water', 'transport'], 'mailto:bhopalsolidarity@proton.me', 'Multi-service mutual aid group. Legal contacts, food distribution, and volunteer drivers.', 'approved', NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 hours');

-- Some pending chapters (for moderation queue demo)
INSERT INTO chapters (name, city, area, categories, contact_method, description, status, created_at) VALUES
('Gurgaon Support Group', 'Delhi', 'West Delhi', ARRAY['general-organizing'], 'https://t.me/gurgaonsupport', 'New chapter forming in Gurgaon/West Delhi area. General coordination and support.', 'pending', NOW() - INTERVAL '1 hour'),
('Thane Medical Volunteers', 'Mumbai', 'Thane', ARRAY['medical', 'supplies'], 'mailto:thanemedics@proton.me', 'Medical professionals volunteering their time for emergency first aid and supplies.', 'pending', NOW() - INTERVAL '2 hours');

-- POSTS (mix of approved needs and offers)
INSERT INTO posts (type, category, city, area, description, urgency, status, session_id, expires_at, created_at) VALUES
-- Delhi needs
('need', 'legal', 'Delhi', 'Central Delhi', 'Need a lawyer urgently — friend was detained at Jantar Mantar area. No charges given. Need someone who can reach ITO police station.', 'urgent', 'approved', 'seed-session-1', NOW() + INTERVAL '48 hours', NOW() - INTERVAL '2 hours'),
('need', 'medical', 'Delhi', 'South Delhi', 'Looking for first aid supplies — bandages, antiseptic, pain relievers. For a group of ~20 people near Saket.', 'routine', 'approved', 'seed-session-2', NOW() + INTERVAL '60 hours', NOW() - INTERVAL '5 hours'),
('need', 'transport', 'Delhi', 'East Delhi', 'Need transport for 8 people from Mayur Vihar to a safe location in Central Delhi. Any volunteer drivers available?', 'urgent', 'approved', 'seed-session-3', NOW() + INTERVAL '24 hours', NOW() - INTERVAL '1 hour'),
('need', 'food-water', 'Delhi', 'North Delhi', 'Water and food needed for about 50 people gathering near Delhi University area. Can someone coordinate delivery?', 'routine', 'approved', 'seed-session-4', NOW() + INTERVAL '48 hours', NOW() - INTERVAL '8 hours'),
('need', 'translation', 'Delhi', 'New Delhi', 'Need someone who can translate a legal document from English to Hindi urgently. About 3 pages.', 'routine', 'approved', 'seed-session-5', NOW() + INTERVAL '65 hours', NOW() - INTERVAL '3 hours'),

-- Delhi offers
('offer', 'legal', 'Delhi', 'Central Delhi', 'Advocate with 8 years experience in civil liberties. Available today for any detention cases in Central/New Delhi area. Can reach any police station within 30 min.', 'routine', 'approved', 'seed-session-6', NOW() + INTERVAL '70 hours', NOW() - INTERVAL '1 hour'),
('offer', 'transport', 'Delhi', 'South Delhi', 'I have a car and free time today. Can provide rides anywhere in South/Central Delhi. DM to coordinate.', 'routine', 'approved', 'seed-session-7', NOW() + INTERVAL '12 hours', NOW() - INTERVAL '4 hours'),
('offer', 'medical', 'Delhi', 'West Delhi', 'Trained paramedic with full first-aid kit. Available in West Delhi area from 6 PM onwards. Can handle injuries, provide basic trauma care.', 'routine', 'approved', 'seed-session-8', NOW() + INTERVAL '48 hours', NOW() - INTERVAL '6 hours'),
('offer', 'food-water', 'Delhi', 'East Delhi', 'Our community kitchen can prepare 100+ meals on short notice. Need 2 hours lead time. Free delivery within East Delhi.', 'routine', 'approved', 'seed-session-9', NOW() + INTERVAL '60 hours', NOW() - INTERVAL '10 hours'),

-- Mumbai
('need', 'legal', 'Mumbai', 'South Mumbai', 'Need a lawyer for bail application. Person detained yesterday evening near Marine Drive. Family has no legal contacts.', 'urgent', 'approved', 'seed-session-10', NOW() + INTERVAL '36 hours', NOW() - INTERVAL '3 hours'),
('need', 'shelter', 'Mumbai', 'Western Suburbs', 'Looking for temporary shelter for 4 people (including 1 elderly) in Andheri/Bandra area for tonight. Can pay for food.', 'urgent', 'approved', 'seed-session-11', NOW() + INTERVAL '18 hours', NOW() - INTERVAL '2 hours'),
('offer', 'legal', 'Mumbai', 'South Mumbai', 'Senior advocate, 15 years experience. Available for pro bono work on detention and civil liberties cases. Can appear in Bombay HC.', 'routine', 'approved', 'seed-session-12', NOW() + INTERVAL '60 hours', NOW() - INTERVAL '4 hours'),
('offer', 'food-water', 'Mumbai', 'Navi Mumbai', 'Restaurant owner — can provide 200+ packed meals daily. Free for anyone who needs. Pickup from Vashi or delivery for large groups.', 'routine', 'approved', 'seed-session-13', NOW() + INTERVAL '48 hours', NOW() - INTERVAL '7 hours'),
('offer', 'shelter', 'Mumbai', 'Western Suburbs', 'Have a spare room in Andheri West. Can accommodate 2-3 people for up to a week. Safe, private, no questions asked.', 'routine', 'approved', 'seed-session-14', NOW() + INTERVAL '70 hours', NOW() - INTERVAL '5 hours'),

-- Bengaluru
('need', 'legal', 'Bengaluru', 'Central Bengaluru', 'Friend picked up by police near Town Hall area. Need a Kannada-speaking lawyer who can reach there ASAP.', 'urgent', 'approved', 'seed-session-15', NOW() + INTERVAL '24 hours', NOW() - INTERVAL '1 hour'),
('need', 'translation', 'Bengaluru', 'South Bengaluru', 'Need someone to translate know-your-rights pamphlet from English to Kannada. About 2 pages. Not super urgent but needed this week.', 'routine', 'approved', 'seed-session-16', NOW() + INTERVAL '65 hours', NOW() - INTERVAL '12 hours'),
('offer', 'medical', 'Bengaluru', 'South Bengaluru', 'Doctor (MBBS) available for teleconsult or in-person in Koramangala/Indiranagar area. Can provide first aid and basic medical care.', 'routine', 'approved', 'seed-session-17', NOW() + INTERVAL '48 hours', NOW() - INTERVAL '3 hours'),
('offer', 'documentation', 'Bengaluru', 'Central Bengaluru', 'Professional photographer with timestamped camera. Available to document peacefully. All footage stored encrypted off-device.', 'routine', 'approved', 'seed-session-18', NOW() + INTERVAL '36 hours', NOW() - INTERVAL '6 hours'),

-- Hyderabad
('need', 'food-water', 'Hyderabad', 'Old City', 'Need water and food packets for ~30 people near Charminar area. Any nearby kitchens or volunteers?', 'routine', 'approved', 'seed-session-19', NOW() + INTERVAL '48 hours', NOW() - INTERVAL '4 hours'),
('offer', 'legal', 'Hyderabad', 'Central Hyderabad', 'Advocate with expertise in habeas corpus petitions. Telugu, Hindi, Urdu, English. Available 24/7 for detention emergencies.', 'routine', 'approved', 'seed-session-20', NOW() + INTERVAL '70 hours', NOW() - INTERVAL '2 hours'),

-- Chennai
('need', 'legal', 'Chennai', 'Central Chennai', 'Two people detained near Marina Beach. Need Tamil-speaking lawyer who can reach Mylapore police station.', 'urgent', 'approved', 'seed-session-21', NOW() + INTERVAL '30 hours', NOW() - INTERVAL '1 hour'),
('offer', 'food-water', 'Chennai', 'North Chennai', 'Our kanji kitchen is open 6 AM to 10 PM. Free meals for anyone. Location: Near Perambur railway station.', 'routine', 'approved', 'seed-session-22', NOW() + INTERVAL '48 hours', NOW() - INTERVAL '8 hours'),

-- Kolkata
('need', 'documentation', 'Kolkata', 'Central Kolkata', 'Need someone with a camera to document a peaceful gathering near College Street tomorrow morning. Will be ~200 people.', 'routine', 'approved', 'seed-session-23', NOW() + INTERVAL '36 hours', NOW() - INTERVAL '5 hours'),
('offer', 'legal', 'Kolkata', 'Central Kolkata', 'Retired High Court judge — can provide legal guidance and connect with active advocates. Bengali, Hindi, English.', 'routine', 'approved', 'seed-session-24', NOW() + INTERVAL '70 hours', NOW() - INTERVAL '3 hours'),

-- Pune
('need', 'transport', 'Pune', 'Pimpri-Chinchwad', 'Need transport for workers from PCMC area to Central Pune. About 15 people. Any buses or shared vehicles?', 'routine', 'approved', 'seed-session-25', NOW() + INTERVAL '24 hours', NOW() - INTERVAL '6 hours'),
('offer', 'food-water', 'Pune', 'Central Pune', 'Catering business owner. Can provide biryani and water for up to 100 people with 4 hours notice. Free of cost.', 'routine', 'approved', 'seed-session-26', NOW() + INTERVAL '48 hours', NOW() - INTERVAL '4 hours'),

-- Some pending posts for moderation demo
('need', 'legal', 'Delhi', 'Central Delhi', 'Urgent legal help needed for detained student activist. Please contact immediately.', 'urgent', 'pending', 'seed-session-27', NOW() + INTERVAL '48 hours', NOW() - INTERVAL '30 minutes'),
('offer', 'supplies', 'Mumbai', 'Western Suburbs', 'Have 50 blankets and 100 water bottles. Free for distribution. Pickup from Goregaon.', 'routine', 'pending', 'seed-session-28', NOW() + INTERVAL '60 hours', NOW() - INTERVAL '1 hour');

-- CONTACT RESPONSES (demo data showing the relay works)
INSERT INTO contact_responses (post_id, responder_contact, responder_message, created_at)
SELECT id, 'advocate.sharma@proton.me', 'I am a criminal lawyer in Central Delhi. Can reach ITO station in 20 minutes. Please confirm the person''s name (first name only is fine).', NOW() - INTERVAL '1 hour'
FROM posts WHERE description LIKE '%ITO police station%' AND status = 'approved' LIMIT 1;

INSERT INTO contact_responses (post_id, responder_contact, responder_message, created_at)
SELECT id, 'https://t.me/driverraj', 'Have a Maruti van, can fit 8 people. Ready to leave in 15 minutes. Where should I come?', NOW() - INTERVAL '30 minutes'
FROM posts WHERE description LIKE '%Mayur Vihar%' AND status = 'approved' LIMIT 1;

INSERT INTO contact_responses (post_id, responder_contact, responder_message, created_at)
SELECT id, 'medic_priya@proton.me', 'I have a full first aid kit and can reach Saket in 20 minutes. Is anyone seriously injured or is this precautionary?', NOW() - INTERVAL '3 hours'
FROM posts WHERE description LIKE '%Saket%' AND status = 'approved' LIMIT 1;

-- REPORTS (show the system works)
INSERT INTO reports (target_type, target_id, reason, session_id, created_at)
SELECT 'post', id, 'This seems like a commercial promotion disguised as mutual aid.', 'report-session-1', NOW() - INTERVAL '2 hours'
FROM posts WHERE status = 'approved' LIMIT 1;
