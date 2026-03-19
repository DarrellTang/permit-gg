import { describe, it, expect } from "vitest"

describe("Quiz Types", () => {
  it("SaveQuizResultsInput validates correct shape", async () => {
    const { SaveQuizResultsInput } = await import("@/lib/types/quiz")
    const valid = {
      mode: "practice",
      totalQuestions: 15,
      answers: [
        {
          questionId: "123e4567-e89b-12d3-a456-426614174000",
          selectedAnswer: "Option A",
          correctAnswer: "Option A",
          isCorrect: true,
          timeTakenMs: 3200,
        },
      ],
      startedAt: "2026-03-18T10:00:00Z",
      completedAt: "2026-03-18T10:05:00Z",
      isComplete: true,
    }
    const result = SaveQuizResultsInput.safeParse(valid)
    expect(result.success).toBe(true)
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
    const result = SaveQuizResultsInput.safeParse(invalid)
    expect(result.success).toBe(false)
  })

  it("exports QuizMode, AnswerState types", async () => {
    const mod = await import("@/lib/types/quiz")
    expect(mod.SaveQuizResultsInput).toBeDefined()
  })
})

describe("Quiz Config", () => {
  it("DMV_CONFIG has correct values", async () => {
    const { DMV_CONFIG } = await import("@/lib/constants/quiz-config")
    expect(DMV_CONFIG.totalQuestions).toBe(46)
    expect(DMV_CONFIG.passingScore).toBe(38)
    expect(DMV_CONFIG.passingPercentage).toBe(0.83)
  })

  it("PRACTICE_DEFAULTS has valid range", async () => {
    const { PRACTICE_DEFAULTS } = await import("@/lib/constants/quiz-config")
    expect(PRACTICE_DEFAULTS.defaultCount).toBe(15)
    expect(PRACTICE_DEFAULTS.minCount).toBe(10)
    expect(PRACTICE_DEFAULTS.maxCount).toBe(20)
  })

  it("CELEBRATION_TIERS has three tiers", async () => {
    const { CELEBRATION_TIERS } = await import("@/lib/constants/quiz-config")
    expect(CELEBRATION_TIERS.subtle).toBeDefined()
    expect(CELEBRATION_TIERS.medium).toBeDefined()
    expect(CELEBRATION_TIERS.fireworks).toBeDefined()
    expect(CELEBRATION_TIERS.subtle.particleCount).toBe(15)
    expect(CELEBRATION_TIERS.medium.particleCount).toBe(40)
    expect(CELEBRATION_TIERS.fireworks.particleCount).toBe(80)
  })

  it("AUTO_ADVANCE_DELAY_MS is exported", async () => {
    const { AUTO_ADVANCE_DELAY_MS } = await import(
      "@/lib/constants/quiz-config"
    )
    expect(AUTO_ADVANCE_DELAY_MS).toBe(1500)
  })
})
