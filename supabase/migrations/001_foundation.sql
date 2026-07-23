-- ============================================================
-- SAHAYATA PLATFORM — Complete Database Schema
-- ============================================================
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- This creates ALL tables needed for the platform to work.
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- 1. POSTS (Needs & Offers Board)
-- ============================================================
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('need', 'offer')),
  category TEXT NOT NULL,
  city TEXT NOT NULL,
  area TEXT NOT NULL,
  description TEXT NOT NULL CHECK (char_length(description) <= 500),
  urgency TEXT NOT NULL DEFAULT 'routine' CHECK (urgency IN ('routine', 'urgent')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  session_id TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  resolved BOOLEAN NOT NULL DEFAULT FALSE,
  reported_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_posts_status_expires ON posts (status, expires_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_session ON posts (session_id);
CREATE INDEX IF NOT EXISTS idx_posts_city_category ON posts (city, category);
CREATE INDEX IF NOT EXISTS idx_posts_type ON posts (type);

-- ============================================================
-- 2. CHAPTERS (Groups / Organizations)
-- ============================================================
CREATE TABLE IF NOT EXISTS chapters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL CHECK (char_length(name) <= 200),
  city TEXT NOT NULL,
  area TEXT NOT NULL,
  categories TEXT[] NOT NULL DEFAULT '{}',
  contact_method TEXT NOT NULL CHECK (char_length(contact_method) <= 500),
  description TEXT NOT NULL DEFAULT '' CHECK (char_length(description) <= 500),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_chapters_status ON chapters (status);
CREATE INDEX IF NOT EXISTS idx_chapters_city ON chapters (city);
CREATE INDEX IF NOT EXISTS idx_chapters_updated ON chapters (updated_at DESC);

-- ============================================================
-- 3. CONTACT RESPONSES (Private responses to posts)
-- ============================================================
CREATE TABLE IF NOT EXISTS contact_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  responder_contact TEXT NOT NULL CHECK (char_length(responder_contact) <= 300),
  responder_message TEXT NOT NULL DEFAULT '' CHECK (char_length(responder_message) <= 500),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_responses_post ON contact_responses (post_id);

-- ============================================================
-- 4. REPORTS (Content flagging)
-- ============================================================
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  target_type TEXT NOT NULL CHECK (target_type IN ('post', 'chapter')),
  target_id UUID NOT NULL,
  reason TEXT NOT NULL CHECK (char_length(reason) <= 300),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_reports_target ON reports (target_type, target_id);

-- ============================================================
-- 5. PROOF OF WORK CHALLENGES
-- ============================================================
CREATE TABLE IF NOT EXISTS pow_challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge TEXT NOT NULL UNIQUE,
  difficulty INTEGER NOT NULL DEFAULT 18,
  consumed BOOLEAN NOT NULL DEFAULT FALSE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_pow_challenge ON pow_challenges (challenge) WHERE consumed = FALSE;
CREATE INDEX IF NOT EXISTS idx_pow_expires ON pow_challenges (expires_at);

-- ============================================================
-- 6. RATE LIMITS
-- ============================================================
CREATE TABLE IF NOT EXISTS rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL,
  bucket TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 1,
  window_start TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (key, bucket)
);

CREATE INDEX IF NOT EXISTS idx_rate_limits_lookup ON rate_limits (key, bucket);

-- ============================================================
-- 7. OTP CODES (Email verification)
-- ============================================================
CREATE TABLE IF NOT EXISTS otp_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email_hash TEXT NOT NULL,
  code_hash TEXT NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_otp_email ON otp_codes (email_hash);
CREATE INDEX IF NOT EXISTS idx_otp_expires ON otp_codes (expires_at);

-- ============================================================
-- 8. VERIFIED SESSIONS (After email verification)
-- ============================================================
CREATE TABLE IF NOT EXISTS verified_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  email TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_verified_session ON verified_sessions (session_id);
CREATE INDEX IF NOT EXISTS idx_verified_expires ON verified_sessions (expires_at);
