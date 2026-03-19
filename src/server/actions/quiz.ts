"use server"

import { createClient } from "@/lib/supabase/server"
import { SaveQuizResultsInput } from "@/lib/types/quiz"
import type { QuizMode, PreparedQuestion } from "@/lib/types/quiz"
import {
  selectPracticeQuestions,
  selectSimQuestions,
} from "@/server/db/queries/questions"

export async function fetchQuestions(
  mode: QuizMode,
  count?: number
): Promise<PreparedQuestion[]> {
  const supabase = await createClient()

  if (mode === "sim") {
    return selectSimQuestions(supabase)
  }

  return selectPracticeQuestions(supabase, count)
}

export async function saveQuizResults(input: SaveQuizResultsInput) {
  const validated = SaveQuizResultsInput.parse(input)
  const supabase = await createClient()

  const score = validated.answers.filter((a) => a.isCorrect).length
  const passed = validated.mode === "sim" ? score >= 38 : null

  const { data: session, error: sessionError } = await supabase
    .from("quiz_sessions")
    .insert({
      mode: validated.mode,
      question_count: validated.totalQuestions,
      score,
      total: validated.totalQuestions,
      passed,
      started_at: validated.startedAt,
      completed_at: validated.completedAt,
      is_complete: validated.isComplete,
    })
    .select("id")
    .single()

  if (sessionError) throw sessionError

  const answerRows = validated.answers.map((a) => ({
    session_id: session.id,
    question_id: a.questionId,
    selected_answer: a.selectedAnswer,
    correct_answer: a.correctAnswer,
    is_correct: a.isCorrect,
    time_taken_ms: a.timeTakenMs,
  }))

  if (answerRows.length > 0) {
    const { error: answersError } = await supabase
      .from("quiz_answers")
      .insert(answerRows)

    if (answersError) throw answersError
  }

  return {
    sessionId: session.id,
    score,
    total: validated.totalQuestions,
    passed,
  }
}
