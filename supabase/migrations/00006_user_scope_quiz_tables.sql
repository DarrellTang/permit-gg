-- Add user_id to quiz tables (nullable for free quiz)
ALTER TABLE quiz_sessions ADD COLUMN user_id UUID REFERENCES auth.users(id);
ALTER TABLE quiz_answers ADD COLUMN user_id UUID REFERENCES auth.users(id);

-- Index for performance with RLS
CREATE INDEX idx_quiz_sessions_user_id ON quiz_sessions(user_id);
CREATE INDEX idx_quiz_answers_user_id ON quiz_answers(user_id);

-- Drop old open policies
DROP POLICY "Allow all access to quiz_sessions" ON quiz_sessions;
DROP POLICY "Allow all access to quiz_answers" ON quiz_answers;

-- User-scoped policies for quiz_sessions
CREATE POLICY "Users can view their own sessions"
  ON quiz_sessions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can insert their own sessions"
  ON quiz_sessions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sessions"
  ON quiz_sessions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- User-scoped policies for quiz_answers
CREATE POLICY "Users can view their own answers"
  ON quiz_answers FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can insert their own answers"
  ON quiz_answers FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Anon policies for free quiz (user_id must be NULL)
CREATE POLICY "Anon users can insert sessions"
  ON quiz_sessions FOR INSERT
  TO anon
  WITH CHECK (user_id IS NULL);

CREATE POLICY "Anon users can insert answers"
  ON quiz_answers FOR INSERT
  TO anon
  WITH CHECK (user_id IS NULL);

CREATE POLICY "Anon users can view anon sessions"
  ON quiz_sessions FOR SELECT
  TO anon
  USING (user_id IS NULL);

CREATE POLICY "Anon users can view anon answers"
  ON quiz_answers FOR SELECT
  TO anon
  USING (user_id IS NULL);
