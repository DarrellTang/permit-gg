-- Fix RLS policies for quiz data access
-- 1. Add anon SELECT policies so saveQuizResults .select("id") works for unauthenticated users
-- 2. Update authenticated SELECT policies to also allow reading anon sessions (user_id IS NULL)
--    so summary pages work after sign-in for quizzes taken before auth
-- 3. Re-assert anon INSERT policies for free quiz data saving

-- Drop and recreate authenticated SELECT policies to include anon rows
DROP POLICY IF EXISTS "Users can view their own sessions" ON quiz_sessions;
CREATE POLICY "Users can view their own sessions"
  ON quiz_sessions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR user_id IS NULL);

DROP POLICY IF EXISTS "Users can view their own answers" ON quiz_answers;
CREATE POLICY "Users can view their own answers"
  ON quiz_answers FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR user_id IS NULL);

-- Re-assert anon INSERT policies (idempotent)
DROP POLICY IF EXISTS "Anon users can insert sessions" ON quiz_sessions;
CREATE POLICY "Anon users can insert sessions"
  ON quiz_sessions FOR INSERT
  TO anon
  WITH CHECK (user_id IS NULL);

DROP POLICY IF EXISTS "Anon users can insert answers" ON quiz_answers;
CREATE POLICY "Anon users can insert answers"
  ON quiz_answers FOR INSERT
  TO anon
  WITH CHECK (user_id IS NULL);

-- Re-assert anon SELECT policies (idempotent)
DROP POLICY IF EXISTS "Anon users can view anon sessions" ON quiz_sessions;
CREATE POLICY "Anon users can view anon sessions"
  ON quiz_sessions FOR SELECT
  TO anon
  USING (user_id IS NULL);

DROP POLICY IF EXISTS "Anon users can view anon answers" ON quiz_answers;
CREATE POLICY "Anon users can view anon answers"
  ON quiz_answers FOR SELECT
  TO anon
  USING (user_id IS NULL);
