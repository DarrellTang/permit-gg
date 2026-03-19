"use server"

import { createClient } from "@/lib/supabase/server"
import { SaveQuizResultsInput } from "@/lib/types/quiz"
import type { QuizMode, PreparedQuestion, QuizAnswer } from "@/lib/types/quiz"
import type { QuizSummary } from "@/lib/utils/quiz-summary"
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

export async function fetchSessionSummary(
  sessionId: string
): Promise<{
  summary: QuizSummary
  bestStreak: number
  totalTimeMs: number
} | null> {
  const supabase = await createClient()

  const { data: session, error: sessionError } = await supabase
    .from("quiz_sessions")
    .select("*")
    .eq("id", sessionId)
    .single()

  if (sessionError || !session) return null

  const { data: answerRows, error: answersError } = await supabase
    .from("quiz_answers")
    .select("*, seed_questions(question_text, correct_answer, wrong_answers, explanation, handbook_reference, categories(slug, name))")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true })

  if (answersError || !answerRows) return null

  const wrongAnswers: QuizAnswer[] = []
  const categoryStats = new Map<
    string,
    { name: string; slug: string; correct: number; total: number }
  >()

  let bestStreak = 0
  let currentStreak = 0

  for (const row of answerRows) {
    const q = row.seed_questions as {
      question_text: string
      correct_answer: string
      wrong_answers: string[]
      explanation: string
      handbook_reference: string
      categories: { slug: string; name: string }
    } | null

    const isCorrect = row.is_correct
    const catSlug = q?.categories?.slug ?? "unknown"
    const catName = q?.categories?.name ?? "Unknown"

    if (!isCorrect) {
      wrongAnswers.push({
        questionId: row.question_id,
        selectedAnswer: row.selected_answer,
        correctAnswer: row.correct_answer,
        isCorrect: false,
        timeTakenMs: row.time_taken_ms ?? 0,
      })
    }

    if (isCorrect) {
      currentStreak++
      bestStreak = Math.max(bestStreak, currentStreak)
    } else {
      currentStreak = 0
    }

    const existing = categoryStats.get(catSlug)
    if (existing) {
      existing.total++
      if (isCorrect) existing.correct++
    } else {
      categoryStats.set(catSlug, {
        name: catName,
        slug: catSlug,
        correct: isCorrect ? 1 : 0,
        total: 1,
      })
    }
  }

  const categoryBreakdown = Array.from(categoryStats.values()).map((cat) => ({
    categoryName: cat.name,
    categorySlug: cat.slug,
    correct: cat.correct,
    total: cat.total,
    percentage:
      cat.total > 0 ? Math.round((cat.correct / cat.total) * 100) : 0,
  }))

  const startedAt = new Date(session.started_at).getTime()
  const completedAt = session.completed_at
    ? new Date(session.completed_at).getTime()
    : Date.now()

  return {
    summary: {
      score: session.score,
      total: session.total,
      percentage:
        session.total > 0
          ? Math.round((session.score / session.total) * 100)
          : 0,
      wrongAnswers,
      categoryBreakdown,
      bestStreak,
    },
    bestStreak,
    totalTimeMs: completedAt - startedAt,
  }
}
