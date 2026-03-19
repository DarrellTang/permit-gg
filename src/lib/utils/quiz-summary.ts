import type { QuizAnswer, PreparedQuestion } from "@/lib/types/quiz"

interface CategoryBreakdown {
  categoryName: string
  categorySlug: string
  correct: number
  total: number
  percentage: number
}

export interface QuizSummary {
  score: number
  total: number
  percentage: number
  wrongAnswers: QuizAnswer[]
  categoryBreakdown: CategoryBreakdown[]
  bestStreak: number
}

export function computeQuizSummary(
  answers: QuizAnswer[],
  questions: PreparedQuestion[]
): QuizSummary {
  const score = answers.filter((a) => a.isCorrect).length
  const total = answers.length
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0

  const wrongAnswers = answers.filter((a) => !a.isCorrect)

  const questionMap = new Map(questions.map((q) => [q.id, q]))
  const categoryStats = new Map<
    string,
    { name: string; slug: string; correct: number; total: number }
  >()

  for (const answer of answers) {
    const question = questionMap.get(answer.questionId)
    if (!question) continue

    const existing = categoryStats.get(question.categorySlug)
    if (existing) {
      existing.total++
      if (answer.isCorrect) existing.correct++
    } else {
      categoryStats.set(question.categorySlug, {
        name: question.categoryName,
        slug: question.categorySlug,
        correct: answer.isCorrect ? 1 : 0,
        total: 1,
      })
    }
  }

  const categoryBreakdown: CategoryBreakdown[] = Array.from(
    categoryStats.values()
  ).map((cat) => ({
    categoryName: cat.name,
    categorySlug: cat.slug,
    correct: cat.correct,
    total: cat.total,
    percentage: cat.total > 0 ? Math.round((cat.correct / cat.total) * 100) : 0,
  }))

  let bestStreak = 0
  let currentStreak = 0
  for (const answer of answers) {
    if (answer.isCorrect) {
      currentStreak++
      bestStreak = Math.max(bestStreak, currentStreak)
    } else {
      currentStreak = 0
    }
  }

  return {
    score,
    total,
    percentage,
    wrongAnswers,
    categoryBreakdown,
    bestStreak,
  }
}
