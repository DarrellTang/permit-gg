-- Quiz sessions: tracks each practice or sim quiz attempt
CREATE TABLE quiz_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mode TEXT NOT NULL CHECK (mode IN ('practice', 'sim')),
  question_count INT NOT NULL,
  score INT,
  total INT NOT NULL,
  passed BOOLEAN,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ,
  is_complete BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Quiz answers: per-question results for each session
CREATE TABLE quiz_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES quiz_sessions(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES seed_questions(id),
  selected_answer TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  time_taken_ms INT,
  answered_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for common query patterns
CREATE INDEX idx_quiz_sessions_mode ON quiz_sessions(mode);
CREATE INDEX idx_quiz_sessions_created_at ON quiz_sessions(created_at DESC);
CREATE INDEX idx_quiz_answers_session_id ON quiz_answers(session_id);
CREATE INDEX idx_quiz_answers_question_id ON quiz_answers(question_id);

-- Row Level Security (open for single-user v1, no auth)
ALTER TABLE quiz_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_answers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access to quiz_sessions" ON quiz_sessions
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all access to quiz_answers" ON quiz_answers
  FOR ALL USING (true) WITH CHECK (true);
