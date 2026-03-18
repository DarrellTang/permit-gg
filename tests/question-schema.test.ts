import { describe, it, expect } from "vitest"
import {
  SeedQuestionSchema,
  CategorySlug,
  CATEGORY_WEIGHTS,
  MIN_QUESTIONS_PER_CATEGORY,
  TARGET_TOTAL_QUESTIONS,
} from "@/lib/types/question"

const validQuestion = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  category_id: "550e8400-e29b-41d4-a716-446655440001",
  question_text: "What does a solid yellow line on your side of the road mean?",
  correct_answer: "Do not pass",
  wrong_answers: [
    "Slow down",
    "You may pass when safe",
    "Road construction ahead",
  ],
  explanation:
    "A solid yellow line on your side of the road means passing is not allowed in that direction.",
  handbook_reference: "Chapter 3: Lane Control",
  source: "manual",
}

describe("SeedQuestionSchema", () => {
  it("validates a well-formed question object", () => {
    const result = SeedQuestionSchema.safeParse(validQuestion)
    expect(result.success).toBe(true)
  })

  it("rejects question with only 2 wrong answers", () => {
    const invalid = {
      ...validQuestion,
      wrong_answers: ["Slow down", "You may pass when safe"],
    }
    const result = SeedQuestionSchema.safeParse(invalid)
    expect(result.success).toBe(false)
  })

  it("rejects question with empty question_text", () => {
    const invalid = { ...validQuestion, question_text: "" }
    const result = SeedQuestionSchema.safeParse(invalid)
    expect(result.success).toBe(false)
  })
})

describe("CategorySlug", () => {
  it("accepts all 8 valid category slugs", () => {
    const slugs = [
      "road-signs",
      "right-of-way",
      "traffic-laws",
      "speed-limits",
      "dui-drug-laws",
      "safe-driving",
      "parking",
      "sharing-the-road",
    ]
    for (const slug of slugs) {
      const result = CategorySlug.safeParse(slug)
      expect(result.success).toBe(true)
    }
  })

  it("rejects an invalid slug like 'invalid-category'", () => {
    const result = CategorySlug.safeParse("invalid-category")
    expect(result.success).toBe(false)
  })
})

describe("CATEGORY_WEIGHTS", () => {
  it("values sum to 1.0", () => {
    const sum = Object.values(CATEGORY_WEIGHTS).reduce((a, b) => a + b, 0)
    expect(sum).toBeCloseTo(1.0)
  })
})

describe("Constants", () => {
  it("MIN_QUESTIONS_PER_CATEGORY is 25 and TARGET_TOTAL_QUESTIONS is 300", () => {
    expect(MIN_QUESTIONS_PER_CATEGORY).toBe(25)
    expect(TARGET_TOTAL_QUESTIONS).toBe(300)
  })
})
