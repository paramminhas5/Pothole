-- SAHAYATA DEVELOPMENT FIXTURES
-- Every record below is synthetic and must never be presented as real support.
-- This file is blocked by default. In a disposable local database, explicitly run:
--   SET app.allow_synthetic_seed = 'on';
-- in the same session before executing this file.

DO $$
BEGIN
  IF current_setting('app.allow_synthetic_seed', true) IS DISTINCT FROM 'on' THEN
    RAISE EXCEPTION
      'Synthetic seed blocked. Set app.allow_synthetic_seed=on only in a disposable local database.';
  END IF;
END
$$;

-- Remove only records created by the previous known development seed. This
-- intentionally does not match arbitrary user-created rows.
DELETE FROM reports
WHERE session_id = 'report-session-1';

DELETE FROM posts
WHERE session_id ~ '^seed-session-([1-9]|1[0-9]|2[0-8])$';

DELETE FROM chapters
WHERE name = ANY (ARRAY[
  'Delhi Legal Aid Collective',
  'South Delhi Medics Network',
  'Delhi Food Brigade',
  'New Delhi Documentation Team',
  'West Delhi Transport Volunteers',
  'Mumbai Lawyers Forum',
  'Western Suburbs Aid Network',
  'Navi Mumbai Solidarity',
  'Bengaluru Legal Aid Network',
  'Koramangala First Responders',
  'BLR Translation Corps',
  'Hyderabad Rights Collective',
  'Old City Mutual Aid',
  'Chennai Legal Support',
  'North Chennai Solidarity Kitchen',
  'Kolkata Legal Circle',
  'Salt Lake Tech Volunteers',
  'Pune Advocates Alliance',
  'Pimpri-Chinchwad Workers Collective',
  'Ahmedabad Human Rights Group',
  'Jaipur Legal Aid Society',
  'Mansarovar Community Kitchen',
  'Lucknow Civil Liberties Union',
  'Chandigarh Student Support Network',
  'Bhopal Solidarity Network',
  'Gurgaon Support Group',
  'Thane Medical Volunteers'
]);

INSERT INTO chapters (
  id,
  name,
  city,
  area,
  categories,
  contact_method,
  description,
  status,
  created_at,
  updated_at
) VALUES
(
  '00000000-0000-4000-8000-000000000001',
  'EXAMPLE ORGANIZATION — NOT REAL',
  'Delhi',
  'DEMO AREA — NOT A REAL LOCATION',
  ARRAY['translation'],
  'mailto:demo@example.invalid',
  'SYNTHETIC FIXTURE. This organization does not exist and cannot provide assistance.',
  'approved',
  NOW(),
  NOW()
),
(
  '00000000-0000-4000-8000-000000000002',
  'EXAMPLE PENDING GROUP — NOT REAL',
  'Mumbai',
  'DEMO AREA — NOT A REAL LOCATION',
  ARRAY['general-organizing'],
  'https://example.invalid/not-a-real-group',
  'SYNTHETIC FIXTURE for moderation UI testing. Do not contact or rely on it.',
  'pending',
  NOW(),
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  city = EXCLUDED.city,
  area = EXCLUDED.area,
  categories = EXCLUDED.categories,
  contact_method = EXCLUDED.contact_method,
  description = EXCLUDED.description,
  status = EXCLUDED.status,
  updated_at = NOW();

INSERT INTO posts (
  id,
  type,
  category,
  city,
  area,
  description,
  urgency,
  status,
  session_id,
  expires_at,
  created_at
) VALUES
(
  '00000000-0000-4000-8000-000000000101',
  'need',
  'translation',
  'Delhi',
  'DEMO AREA — NOT A REAL LOCATION',
  'SYNTHETIC FIXTURE: translate a fictional community-garden flyer. No real person needs help.',
  'routine',
  'approved',
  'synthetic-fixture-session-1',
  NOW() + INTERVAL '72 hours',
  NOW()
),
(
  '00000000-0000-4000-8000-000000000102',
  'offer',
  'supplies',
  'Mumbai',
  'DEMO AREA — NOT A REAL LOCATION',
  'SYNTHETIC FIXTURE: offer empty sample boxes for a fictional UI demonstration. Not a real offer.',
  'routine',
  'pending',
  'synthetic-fixture-session-2',
  NOW() + INTERVAL '72 hours',
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  city = EXCLUDED.city,
  area = EXCLUDED.area,
  description = EXCLUDED.description,
  urgency = EXCLUDED.urgency,
  status = EXCLUDED.status,
  session_id = EXCLUDED.session_id,
  expires_at = EXCLUDED.expires_at;

-- Deliberately no contact responses, reports, urgent incidents, professional
-- credentials, personal contacts, shelters, medical services, or legal services.
