import { describe, it, expect } from "vitest"
import type { CategorySlug } from "@/lib/types/question"

function makeSeedRow(categorySlug: string, categoryName: string, index: number) {
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

function mockSupabaseCategoryClient(data: ReturnType<typeof makeSeedRow>[], filterSlug: string) {
  const filtered = data.filter((row) => row.categories.slug === filterSlug)
  return {
    from: () => ({
      select: () => ({
        eq: () => ({
          limit: () => ({
            order: () => Promise.resolve({ data: filtered, error: null }),
          }),
        }),
      }),
    }),
  }
}

describe("Category Question Selection", () => {
  it("selectCategoryQuestions returns only questions from specified category", async () => {
    const { selectCategoryQuestions } = await import("@/server/db/queries/questions")

    const rows = [
      ...Array.from({ length: 10 }, (_, i) => makeSeedRow("road-signs", "Road Signs", i)),
      ...Array.from({ length: 10 }, (_, i) => makeSeedRow("parking", "Parking", i)),
      ...Array.from({ length: 10 }, (_, i) => makeSeedRow("speed-limits", "Speed Limits", i)),
    ]

    const client = mockSupabaseCategoryClient(rows, "road-signs")
    const result = await selectCategoryQuestions(client as any, "road-signs", 15)

    expect(result.length).toBeGreaterThan(0)
    for (const q of result) {
      expect(q.categorySlug).toBe("road-signs")
    }
  })

  it("selectCategoryQuestions returns at most count questions", async () => {
    const { selectCategoryQuestions } = await import("@/server/db/queries/questions")

    const rows = Array.from({ length: 40 }, (_, i) => makeSeedRow("road-signs", "Road Signs", i))
    const client = mockSupabaseCategoryClient(rows, "road-signs")

    const result = await selectCategoryQuestions(client as any, "road-signs", 10)
    expect(result.length).toBe(10)
  })

  it("selectCategoryQuestions returns PreparedQuestion shape", async () => {
    const { selectCategoryQuestions } = await import("@/server/db/queries/questions")

    const rows = Array.from({ length: 20 }, (_, i) => makeSeedRow("road-signs", "Road Signs", i))
    const client = mockSupabaseCategoryClient(rows, "road-signs")

    const result = await selectCategoryQuestions(client as any, "road-signs", 5)
    const q = result[0]
    expect(q).toHaveProperty("id")
    expect(q).toHaveProperty("questionText")
    expect(q).toHaveProperty("correctAnswer")
    expect(q).toHaveProperty("shuffledOptions")
    expect(q.shuffledOptions).toHaveLength(4)
    expect(q).toHaveProperty("categorySlug")
    expect(q).toHaveProperty("categoryName")
    expect(q.categorySlug).toBe("road-signs")
    expect(q.categoryName).toBe("Road Signs")
  })

  it("selectCategoryQuestions with empty category returns empty array", async () => {
    const { selectCategoryQuestions } = await import("@/server/db/queries/questions")

    const rows = Array.from({ length: 10 }, (_, i) => makeSeedRow("parking", "Parking", i))
    const client = mockSupabaseCategoryClient(rows, "nonexistent-slug")

    const result = await selectCategoryQuestions(client as any, "nonexistent-slug", 15)
    expect(result).toHaveLength(0)
  })
})
