import { describe, it, expect } from "vitest"

describe("Quiz Persistence", () => {
  it("SaveQuizResultsInput validates correct shape", async () => {
    const { SaveQuizResultsInput } = await import("@/lib/types/quiz")
    const valid = {
      mode: "practice" as const,
      totalQuestions: 15,
      answers: [
        {
          questionId: "123e4567-e89b-12d3-a456-426614174000",
          selectedAnswer: "Option A",
          correctAnswer: "Option A",
          isCorrect: true,
          timeTakenMs: 3200,
        },
        {
          questionId: "223e4567-e89b-12d3-a456-426614174000",
          selectedAnswer: "Option B",
          correctAnswer: "Option C",
          isCorrect: false,
          timeTakenMs: 5100,
        },
      ],
      startedAt: "2026-03-18T10:00:00Z",
      completedAt: "2026-03-18T10:05:00Z",
      isComplete: true,
    }

    const result = SaveQuizResultsInput.safeParse(valid)
    expect(result.success).toBe(true)
  })

  it("SaveQuizResultsInput rejects missing required fields", async () => {
    const { SaveQuizResultsInput } = await import("@/lib/types/quiz")

    const missingMode = {
      totalQuestions: 15,
      answers: [],
      startedAt: "2026-03-18T10:00:00Z",
      completedAt: null,
      isComplete: false,
    }
    expect(SaveQuizResultsInput.safeParse(missingMode).success).toBe(false)

    const missingAnswers = {
      mode: "practice",
      totalQuestions: 15,
      startedAt: "2026-03-18T10:00:00Z",
      completedAt: null,
      isComplete: false,
    }
    expect(SaveQuizResultsInput.safeParse(missingAnswers).success).toBe(false)

    const missingStartedAt = {
      mode: "practice",
      totalQuestions: 15,
      answers: [],
      completedAt: null,
      isComplete: false,
    }
    expect(SaveQuizResultsInput.safeParse(missingStartedAt).success).toBe(false)
  })

  it("SaveQuizResultsInput rejects invalid mode", async () => {
    const { SaveQuizResultsInput } = await import("@/lib/types/quiz")
    const invalid = {
      mode: "invalid",
      totalQuestions: 15,
      answers: [],
      startedAt: "2026-03-18T10:00:00Z",
      completedAt: null,
      isComplete: false,
    }
    expect(SaveQuizResultsInput.safeParse(invalid).success).toBe(false)
  })

  it("SaveQuizResultsInput accepts sim mode", async () => {
    const { SaveQuizResultsInput } = await import("@/lib/types/quiz")
    const valid = {
      mode: "sim" as const,
      totalQuestions: 46,
      answers: [],
      startedAt: "2026-03-18T10:00:00Z",
      completedAt: "2026-03-18T10:20:00Z",
      isComplete: true,
    }
    expect(SaveQuizResultsInput.safeParse(valid).success).toBe(true)
  })

  it("SaveQuizResultsInput accepts null completedAt for partial results", async () => {
    const { SaveQuizResultsInput } = await import("@/lib/types/quiz")
    const partial = {
      mode: "practice" as const,
      totalQuestions: 15,
      answers: [
        {
          questionId: "123e4567-e89b-12d3-a456-426614174000",
          selectedAnswer: "Option A",
          correctAnswer: "Option B",
          isCorrect: false,
          timeTakenMs: 2800,
        },
      ],
      startedAt: "2026-03-18T10:00:00Z",
      completedAt: null,
      isComplete: false,
    }
    expect(SaveQuizResultsInput.safeParse(partial).success).toBe(true)
  })

  it("SaveQuizResultsInput rejects negative timeTakenMs", async () => {
    const { SaveQuizResultsInput } = await import("@/lib/types/quiz")
    const invalid = {
      mode: "practice" as const,
      totalQuestions: 15,
      answers: [
        {
          questionId: "123e4567-e89b-12d3-a456-426614174000",
          selectedAnswer: "Option A",
          correctAnswer: "Option A",
          isCorrect: true,
          timeTakenMs: -100,
        },
      ],
      startedAt: "2026-03-18T10:00:00Z",
      completedAt: null,
      isComplete: false,
    }
    expect(SaveQuizResultsInput.safeParse(invalid).success).toBe(false)
  })

  it("SaveQuizResultsInput validates answer shape", async () => {
    const { SaveQuizResultsInput } = await import("@/lib/types/quiz")
    const invalidAnswer = {
      mode: "practice" as const,
      totalQuestions: 15,
      answers: [
        {
          questionId: "123e4567-e89b-12d3-a456-426614174000",
          // Missing selectedAnswer
          correctAnswer: "Option A",
          isCorrect: true,
          timeTakenMs: 3200,
        },
      ],
      startedAt: "2026-03-18T10:00:00Z",
      completedAt: null,
      isComplete: false,
    }
    expect(SaveQuizResultsInput.safeParse(invalidAnswer).success).toBe(false)
  })
})
