-- Add category_slug column to quiz_sessions for drill mode tracking
ALTER TABLE quiz_sessions ADD COLUMN category_slug TEXT DEFAULT NULL;

-- Single RPC function returning all dashboard analytics in one round-trip
CREATE OR REPLACE FUNCTION get_user_analytics(p_user_id UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'categories', (
      SELECT COALESCE(json_agg(cat_row ORDER BY cat_row.sort_order), '[]'::json)
      FROM (
        SELECT
          c.slug,
          c.name,
          c.weight,
          c.sort_order,
          COUNT(CASE WHEN qa.is_correct THEN 1 END)::int AS correct,
          COUNT(qa.id)::int AS total,
          CASE
            WHEN COUNT(qa.id) = 0 THEN 0
            ELSE ROUND(
              COUNT(CASE WHEN qa.is_correct THEN 1 END)::numeric
              / COUNT(qa.id) * 100
            )::int
          END AS mastery_pct,
          (SELECT COUNT(*) FROM seed_questions sq2 WHERE sq2.category_id = c.id)::int AS question_count
        FROM categories c
        LEFT JOIN seed_questions sq ON sq.category_id = c.id
        LEFT JOIN quiz_answers qa ON qa.question_id = sq.id
          AND qa.user_id = p_user_id
        GROUP BY c.id, c.slug, c.name, c.weight, c.sort_order
      ) cat_row
    ),
    'session_trends', (
      SELECT COALESCE(json_agg(trend_row), '[]'::json)
      FROM (
        SELECT
          qs.id AS session_id,
          qs.mode,
          qs.score,
          qs.total,
          qs.started_at,
          CASE
            WHEN qs.total = 0 THEN 0
            ELSE ROUND(qs.score::numeric / qs.total * 100)::int
          END AS percentage
        FROM quiz_sessions qs
        WHERE qs.user_id = p_user_id AND qs.is_complete = true
        ORDER BY qs.started_at DESC
        LIMIT 20
      ) trend_row
    ),
    'category_trends', (
      SELECT COALESCE(json_agg(cat_trend_row), '[]'::json)
      FROM (
        SELECT
          c.slug AS category_slug,
          (
            SELECT COALESCE(json_agg(
              json_build_object(
                'session_id', sub.session_id,
                'pct', sub.pct,
                'date', sub.started_at
              )
              ORDER BY sub.started_at DESC
            ), '[]'::json)
            FROM (
              SELECT
                qs.id AS session_id,
                qs.started_at,
                ROUND(
                  COUNT(CASE WHEN qa.is_correct THEN 1 END)::numeric
                  / NULLIF(COUNT(qa.id), 0) * 100
                )::int AS pct
              FROM quiz_sessions qs
              JOIN quiz_answers qa ON qa.session_id = qs.id AND qa.user_id = p_user_id
              JOIN seed_questions sq ON sq.id = qa.question_id
              WHERE qs.user_id = p_user_id
                AND qs.is_complete = true
                AND sq.category_id = c.id
              GROUP BY qs.id, qs.started_at
              HAVING COUNT(qa.id) > 0
              ORDER BY qs.started_at DESC
              LIMIT 10
            ) sub
          ) AS sessions
        FROM categories c
      ) cat_trend_row
    ),
    'missed_question_ids', (
      SELECT COALESCE(json_agg(missed.question_id), '[]'::json)
      FROM (
        SELECT DISTINCT qa.question_id
        FROM quiz_answers qa
        WHERE qa.user_id = p_user_id
          AND qa.is_correct = false
          AND NOT EXISTS (
            SELECT 1 FROM quiz_answers qa2
            WHERE qa2.user_id = p_user_id
              AND qa2.question_id = qa.question_id
              AND qa2.is_correct = true
              AND qa2.answered_at > qa.answered_at
          )
      ) missed
    ),
    'total_sessions', (
      SELECT COUNT(*)::int FROM quiz_sessions
      WHERE user_id = p_user_id AND is_complete = true
    )
  ) INTO result;

  RETURN result;
END;
$$;
