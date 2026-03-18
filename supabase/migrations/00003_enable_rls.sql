ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE seed_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Seed questions are viewable by everyone"
  ON seed_questions FOR SELECT
  TO anon, authenticated
  USING (true);
