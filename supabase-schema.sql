-- Supabase Database Schema for CourseHub
-- Run this SQL in your Supabase SQL Editor to set up all required tables

-- ============================================
-- 1. USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT false,
  membership_type TEXT,
  membership_expires_at TIMESTAMP,
  membership_active BOOLEAN DEFAULT false,
  phone TEXT,
  country TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_id ON users(id);

-- ============================================
-- 2. PAYMENT REQUESTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS payment_requests (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  user_email TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('course', 'membership')),
  amount DECIMAL(10, 2) NOT NULL,
  course_id TEXT,
  membership_type TEXT CHECK (membership_type IN ('weekly', 'monthly', 'yearly')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  customer_info JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_payment_requests_user_id ON payment_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_requests_status ON payment_requests(status);
CREATE INDEX IF NOT EXISTS idx_payment_requests_created_at ON payment_requests(created_at DESC);

-- ============================================
-- 3. FREE COURSE ENROLLMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS free_course_enrollments (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL,
  enrolled_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_enrollments_user_id ON free_course_enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course_id ON free_course_enrollments(course_id);

-- ============================================
-- 4. ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE free_course_enrollments ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 5. RLS POLICIES
-- ============================================

-- Users table policies
DROP POLICY IF EXISTS "Enable read access for all users" ON users;
CREATE POLICY "Enable read access for all users" ON users FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable insert for all users" ON users;
CREATE POLICY "Enable insert for all users" ON users FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Enable update for users" ON users;
CREATE POLICY "Enable update for users" ON users FOR UPDATE USING (true);

-- Payment requests policies
DROP POLICY IF EXISTS "Enable read access for all payment requests" ON payment_requests;
CREATE POLICY "Enable read access for all payment requests" ON payment_requests FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable insert for all payment requests" ON payment_requests;
CREATE POLICY "Enable insert for all payment requests" ON payment_requests FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Enable update for all payment requests" ON payment_requests;
CREATE POLICY "Enable update for all payment requests" ON payment_requests FOR UPDATE USING (true);

-- Free course enrollments policies
DROP POLICY IF EXISTS "Enable read access for all enrollments" ON free_course_enrollments;
CREATE POLICY "Enable read access for all enrollments" ON free_course_enrollments FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable insert for all enrollments" ON free_course_enrollments;
CREATE POLICY "Enable insert for all enrollments" ON free_course_enrollments FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Enable update for all enrollments" ON free_course_enrollments;
CREATE POLICY "Enable update for all enrollments" ON free_course_enrollments FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Enable delete for all enrollments" ON free_course_enrollments;
CREATE POLICY "Enable delete for all enrollments" ON free_course_enrollments FOR DELETE USING (true);

-- ============================================
-- 6. REALTIME SUBSCRIPTIONS
-- ============================================
-- Enable realtime for tables
ALTER PUBLICATION supabase_realtime ADD TABLE payment_requests;
ALTER PUBLICATION supabase_realtime ADD TABLE free_course_enrollments;
ALTER PUBLICATION supabase_realtime ADD TABLE users;

-- ============================================
-- DONE! Your database is now set up
-- ============================================
