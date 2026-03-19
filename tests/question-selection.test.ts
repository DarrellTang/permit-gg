import { describe, it, expect, vi } from "vitest"
import { CATEGORY_WEIGHTS, type CategorySlug } from "@/lib/types/question"

function makeSeedRow(categorySlug: CategorySlug, categoryName: string, index: number) {
  return {
    id: crypto.randomUUID(),
    category_id: crypto.randomUUID(),
    question_text: `Question ${index} for ${categorySlug}`,
    correct_answer: "Correct answer",
    wrong_answers: ["Wrong A", "Wrong B", "Wrong C"],
    explanation: `Explanation for question ${index}`,
    handbook_reference: "CA DMV Handbook",
    source: "manual",
    categories: { slug: categorySlug, name: categoryName },
  }
}

function makeAllCategoryRows(perCategory: number = 40) {
  const categoryNames: Record<CategorySlug, string> = {
    "road-signs": "Road Signs",
    "right-of-way": "Right-of-Way",
    "traffic-laws": "Traffic Laws",
    "speed-limits": "Speed Limits",
    "dui-drug-laws": "DUI/Drug Laws",
    "safe-driving": "Safe Driving",
    "parking": "Parking",
    "sharing-the-road": "Sharing the Road",
  }

  const rows: ReturnType<typeof makeSeedRow>[] = []
  for (const [slug, name] of Object.entries(categoryNames)) {
    for (let i = 0; i < perCategory; i++) {
      rows.push(makeSeedRow(slug as CategorySlug, name, i))
    }
  }
  return rows
}

function mockSupabaseClient(data: unknown[]) {
  return {
    from: () => ({
      select: () => ({
        limit: () => ({
          order: () => Promise.resolve({ data, error: null }),
        }),
        then: undefined,
      }),
    }),
  }
}

function mockSupabaseClientAll(data: unknown[]) {
  return {
    from: () => ({
      select: () => Promise.resolve({ data, error: null }),
    }),
  }
}

describe("Question Selection", () => {
  it("selectPracticeQuestions returns exactly count questions", async () => {
    const { selectPracticeQuestions } = await import("@/server/db/queries/questions")
    const allRows = makeAllCategoryRows(20)
    const client = mockSupabaseClient(allRows)

    const result = await selectPracticeQuestions(client as any, 15)
    expect(result).toHaveLength(15)
  })

  it("selectPracticeQuestions returns PreparedQuestion shape", async () => {
    const { selectPracticeQuestions } = await import("@/server/db/queries/questions")
    const allRows = makeAllCategoryRows(20)
    const client = mockSupabaseClient(allRows)

    const result = await selectPracticeQuestions(client as any, 5)
    const q = result[0]
    expect(q).toHaveProperty("id")
    expect(q).toHaveProperty("questionText")
    expect(q).toHaveProperty("correctAnswer")
    expect(q).toHaveProperty("shuffledOptions")
    expect(q).toHaveProperty("explanation")
    expect(q).toHaveProperty("handbookReference")
    expect(q).toHaveProperty("categorySlug")
    expect(q).toHaveProperty("categoryName")
    expect(q.shuffledOptions).toHaveLength(4)
    expect(q.shuffledOptions).toContain(q.correctAnswer)
  })

  it("selectSimQuestions returns ~46 questions", async () => {
    const { selectSimQuestions } = await import("@/server/db/queries/questions")
    const allRows = makeAllCategoryRows(40)
    const client = mockSupabaseClientAll(allRows)

    const result = await selectSimQuestions(client as any)
    expect(result).toHaveLength(46)
  })

  it("selectSimQuestions distributes questions by category weight", async () => {
    const { selectSimQuestions } = await import("@/server/db/queries/questions")
    const allRows = makeAllCategoryRows(40)
    const client = mockSupabaseClientAll(allRows)

    const result = await selectSimQuestions(client as any)

    // Count per category
    const counts: Record<string, number> = {}
    for (const q of result) {
      counts[q.categorySlug] = (counts[q.categorySlug] || 0) + 1
    }

    // Verify distribution matches weights (+/- 1 due to rounding)
    for (const [slug, weight] of Object.entries(CATEGORY_WEIGHTS)) {
      const expected = Math.round(46 * weight)
      const actual = counts[slug] || 0
      expect(actual).toBeGreaterThanOrEqual(expected - 1)
      expect(actual).toBeLessThanOrEqual(expected + 1)
    }
  })

  it("shuffled options contain correct and all wrong answers", async () => {
    const { selectPracticeQuestions } = await import("@/server/db/queries/questions")
    const allRows = makeAllCategoryRows(20)
    const client = mockSupabaseClient(allRows)

    const result = await selectPracticeQuestions(client as any, 5)
    for (const q of result) {
      expect(q.shuffledOptions).toHaveLength(4)
      expect(q.shuffledOptions).toContain(q.correctAnswer)
    }
  })

  it("sim exactly 46: selectSimQuestions always returns exactly 46 regardless of rounding", async () => {
    const { selectSimQuestions } = await import("@/server/db/queries/questions")

    for (let run = 0; run < 5; run++) {
      const allRows = makeAllCategoryRows(40)
      const client = mockSupabaseClientAll(allRows)
      const result = await selectSimQuestions(client as any)
      expect(result).toHaveLength(46)
    }
  })

  it("sim all categories represented: at least 1 question from each of the 8 categories", async () => {
    const { selectSimQuestions } = await import("@/server/db/queries/questions")
    const allRows = makeAllCategoryRows(40)
    const client = mockSupabaseClientAll(allRows)

    const result = await selectSimQuestions(client as any)

    const categories = new Set(result.map((q) => q.categorySlug))

    const expectedCategories = [
      "road-signs",
      "right-of-way",
      "traffic-laws",
      "speed-limits",
      "dui-drug-laws",
      "safe-driving",
      "parking",
      "sharing-the-road",
    ]

    for (const cat of expectedCategories) {
      expect(categories.has(cat)).toBe(true)
    }
    expect(categories.size).toBe(8)
  })
})
