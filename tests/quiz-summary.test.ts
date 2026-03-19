import { describe, it, expect } from "vitest"
import { computeQuizSummary } from "@/lib/utils/quiz-summary"
import type { QuizAnswer, PreparedQuestion } from "@/lib/types/quiz"

function makeQuestion(
  id: string,
  categorySlug: string,
  categoryName: string
): PreparedQuestion {
  return {
    id,
    questionText: `Question ${id}`,
    correctAnswer: "A",
    shuffledOptions: ["A", "B", "C", "D"],
    explanation: `Explanation for ${id}`,
    handbookReference: "Chapter 1",
    categorySlug,
    categoryName,
  }
}

function makeAnswer(
  questionId: string,
  isCorrect: boolean
): QuizAnswer {
  return {
    questionId,
    selectedAnswer: isCorrect ? "A" : "B",
    correctAnswer: "A",
    isCorrect,
    timeTakenMs: 3000,
  }
}

describe("Quiz Summary", () => {
  const questions: PreparedQuestion[] = [
    makeQuestion("q1", "road-signs", "Road Signs"),
    makeQuestion("q2", "road-signs", "Road Signs"),
    makeQuestion("q3", "right-of-way", "Right of Way"),
    makeQuestion("q4", "right-of-way", "Right of Way"),
    makeQuestion("q5", "speed-limits", "Speed Limits"),
  ]

  const answers: QuizAnswer[] = [
    makeAnswer("q1", true),
    makeAnswer("q2", false),
    makeAnswer("q3", true),
    makeAnswer("q4", true),
    makeAnswer("q5", false),
  ]

  it("computes correct score", () => {
    const result = computeQuizSummary(answers, questions)
    expect(result.score).toBe(3)
    expect(result.total).toBe(5)
    expect(result.percentage).toBe(60)
  })

  it("extracts wrong answers", () => {
    const result = computeQuizSummary(answers, questions)
    expect(result.wrongAnswers).toHaveLength(2)
    expect(result.wrongAnswers.every((a) => !a.isCorrect)).toBe(true)
    expect(result.wrongAnswers.map((a) => a.questionId)).toEqual([
      "q2",
      "q5",
    ])
  })

  it("groups by category with per-category scores", () => {
    const result = computeQuizSummary(answers, questions)
    expect(result.categoryBreakdown).toHaveLength(3)

    const roadSigns = result.categoryBreakdown.find(
      (c) => c.categorySlug === "road-signs"
    )
    expect(roadSigns).toBeDefined()
    expect(roadSigns!.correct).toBe(1)
    expect(roadSigns!.total).toBe(2)
    expect(roadSigns!.percentage).toBe(50)

    const rightOfWay = result.categoryBreakdown.find(
      (c) => c.categorySlug === "right-of-way"
    )
    expect(rightOfWay).toBeDefined()
    expect(rightOfWay!.correct).toBe(2)
    expect(rightOfWay!.total).toBe(2)
    expect(rightOfWay!.percentage).toBe(100)

    const speedLimits = result.categoryBreakdown.find(
      (c) => c.categorySlug === "speed-limits"
    )
    expect(speedLimits).toBeDefined()
    expect(speedLimits!.correct).toBe(0)
    expect(speedLimits!.total).toBe(1)
    expect(speedLimits!.percentage).toBe(0)
  })

  it("computes best streak from answer sequence", () => {
    const result = computeQuizSummary(answers, questions)
    expect(result.bestStreak).toBe(2)
  })

  it("handles empty answers", () => {
    const result = computeQuizSummary([], questions)
    expect(result.score).toBe(0)
    expect(result.total).toBe(0)
    expect(result.percentage).toBe(0)
    expect(result.wrongAnswers).toHaveLength(0)
    expect(result.categoryBreakdown).toHaveLength(0)
    expect(result.bestStreak).toBe(0)
  })

  it("handles perfect score streak", () => {
    const perfectAnswers: QuizAnswer[] = questions.map((q) =>
      makeAnswer(q.id, true)
    )
    const result = computeQuizSummary(perfectAnswers, questions)
    expect(result.score).toBe(5)
    expect(result.bestStreak).toBe(5)
    expect(result.wrongAnswers).toHaveLength(0)
  })
})
