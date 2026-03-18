CREATE TABLE seed_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES categories(id),
  question_text TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  wrong_answers TEXT[] NOT NULL CHECK (array_length(wrong_answers, 1) = 3),
  explanation TEXT NOT NULL,
  handbook_reference TEXT NOT NULL,
  source TEXT DEFAULT 'manual',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_seed_questions_category ON seed_questions(category_id);
