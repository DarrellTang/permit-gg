import { describe, it, expect } from "vitest"
import type { AnswerState, QuizMode } from "@/lib/types/quiz"

function shouldShowFeedback(
  answerState: AnswerState,
  isCorrect: boolean,
  mode: QuizMode
): boolean {
  if (mode === "sim") return false
  if (answerState !== "revealed") return false
  if (isCorrect) return false
  return true
}

describe("Answer Feedback", () => {
  it("shows explanation when revealed and answer is wrong in practice mode", () => {
    expect(shouldShowFeedback("revealed", false, "practice")).toBe(true)
  })

  it("hides explanation when answer is correct in practice mode", () => {
    expect(shouldShowFeedback("revealed", true, "practice")).toBe(false)
  })

  it("hides explanation in sim mode regardless of correctness", () => {
    expect(shouldShowFeedback("revealed", false, "sim")).toBe(false)
    expect(shouldShowFeedback("revealed", true, "sim")).toBe(false)
  })

  it("hides explanation when answer state is not revealed", () => {
    expect(shouldShowFeedback("idle", false, "practice")).toBe(false)
    expect(shouldShowFeedback("selected", false, "practice")).toBe(false)
    expect(shouldShowFeedback("submitted", false, "practice")).toBe(false)
  })
})
