import { describe, it, expect } from "vitest"
import { computeReadinessScore, getReadinessMessage } from "@/lib/utils/readiness"
import type { CategoryMastery } from "@/lib/types/analytics"

function makeCategoryMastery(
  slug: string,
  weight: number,
  masteryPct: number,
  recentMastery: number | null = null,
  total: number = 10
): CategoryMastery {
  return {
    slug,
    name: slug,
    weight,
    correct: Math.round((masteryPct / 100) * total),
    total,
    masteryPct,
    recentMastery,
    trendData: [],
    questionCount: 30,
  }
}

describe("Readiness Score", () => {
  it("all categories at 100% mastery returns 100", () => {
    const categories: CategoryMastery[] = [
      makeCategoryMastery("road-signs", 0.15, 100),
      makeCategoryMastery("right-of-way", 0.15, 100),
      makeCategoryMastery("traffic-laws", 0.15, 100),
      makeCategoryMastery("speed-limits", 0.10, 100),
      makeCategoryMastery("dui-drug-laws", 0.10, 100),
      makeCategoryMastery("safe-driving", 0.15, 100),
      makeCategoryMastery("parking", 0.10, 100),
      makeCategoryMastery("sharing-the-road", 0.10, 100),
    ]
    expect(computeReadinessScore(categories)).toBe(100)
  })

  it("all categories at 0% returns 0", () => {
    const categories: CategoryMastery[] = [
      makeCategoryMastery("road-signs", 0.15, 0, null, 10),
      makeCategoryMastery("right-of-way", 0.15, 0, null, 10),
      makeCategoryMastery("traffic-laws", 0.15, 0, null, 10),
      makeCategoryMastery("speed-limits", 0.10, 0, null, 10),
      makeCategoryMastery("dui-drug-laws", 0.10, 0, null, 10),
      makeCategoryMastery("safe-driving", 0.15, 0, null, 10),
      makeCategoryMastery("parking", 0.10, 0, null, 10),
      makeCategoryMastery("sharing-the-road", 0.10, 0, null, 10),
    ]
    expect(computeReadinessScore(categories)).toBe(0)
  })

  it("empty categories array returns 0", () => {
    expect(computeReadinessScore([])).toBe(0)
  })

  it("partial coverage penalizes uncovered categories", () => {
    const categories: CategoryMastery[] = [
      makeCategoryMastery("road-signs", 0.15, 100),
      makeCategoryMastery("right-of-way", 0.15, 100),
    ]
    const score = computeReadinessScore(categories)
    expect(score).toBeLessThan(100)
    expect(score).toBe(30)
  })

  it("recent performance weighted more heavily (recentMastery 90 + overall 60 with 0.6/0.4 blend = 78)", () => {
    const categories: CategoryMastery[] = [
      makeCategoryMastery("road-signs", 0.15, 60, 90),
      makeCategoryMastery("right-of-way", 0.15, 60, 90),
      makeCategoryMastery("traffic-laws", 0.15, 60, 90),
      makeCategoryMastery("speed-limits", 0.10, 60, 90),
      makeCategoryMastery("dui-drug-laws", 0.10, 60, 90),
      makeCategoryMastery("safe-driving", 0.15, 60, 90),
      makeCategoryMastery("parking", 0.10, 60, 90),
      makeCategoryMastery("sharing-the-road", 0.10, 60, 90),
    ]
    expect(computeReadinessScore(categories)).toBe(78)
  })

  it("score >= 83 returns test-ready message, < 50 returns encouraging message", () => {
    expect(getReadinessMessage(90)).toBe("You're ready! Go ace that test!")
    expect(getReadinessMessage(85)).toBe("Looking good! Almost test-ready!")
    expect(getReadinessMessage(83)).toBe("Looking good! Almost test-ready!")
    expect(getReadinessMessage(70)).toBe("Great progress! Keep it up!")
    expect(getReadinessMessage(50)).toBe("You're getting there! Keep practicing!")
    expect(getReadinessMessage(49)).toBe("Keep practicing! Every session helps!")
    expect(getReadinessMessage(0)).toBe("Keep practicing! Every session helps!")
  })
})
