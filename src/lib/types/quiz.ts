import { z } from "zod"

export type QuizMode = "practice" | "sim"

export type AnswerState = "idle" | "selected" | "submitted" | "revealed"

export interface QuizAnswer {
  questionId: string
  selectedAnswer: string
  correctAnswer: string
  isCorrect: boolean
  timeTakenMs: number
}

export interface QuizSessionResult {
  sessionId: string
  score: number
  total: number
  passed: boolean | null
  answers: QuizAnswer[]
  mode: QuizMode
  bestStreak: number
  totalTimeMs: number
  startedAt: string
  completedAt: string | null
  isComplete: boolean
}

export interface PreparedQuestion {
  id: string
  questionText: string
  correctAnswer: string
  shuffledOptions: string[]
  explanation: string
  handbookReference: string
  categorySlug: string
  categoryName: string
}

export const SaveQuizResultsInput = z.object({
  mode: z.enum(["practice", "sim"]),
  totalQuestions: z.number().int().positive(),
  answers: z.array(
    z.object({
      questionId: z.string(),
      selectedAnswer: z.string(),
      correctAnswer: z.string(),
      isCorrect: z.boolean(),
      timeTakenMs: z.number().int().nonnegative(),
    })
  ),
  startedAt: z.string().datetime(),
  completedAt: z.string().datetime().nullable(),
  isComplete: z.boolean(),
  categorySlug: z.string().optional(),
})
export type SaveQuizResultsInput = z.infer<typeof SaveQuizResultsInput>
