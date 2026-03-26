import { describe, it, expect } from "vitest"
import { getMasteryColor, getMasteryLevel, getWeakestCategories } from "@/lib/utils/mastery"
import type { CategoryMastery } from "@/lib/types/analytics"
import type { UserAnalytics, SessionTrend, CategoryTrend } from "@/lib/types/analytics"

function makeCategoryMastery(
  slug: string,
  masteryPct: number,
  opts: Partial<CategoryMastery> = {}
): CategoryMastery {
  return {
    slug,
    name: slug.replace(/-/g, " "),
    weight: 0.125,
    correct: Math.round((masteryPct / 100) * 10),
    total: 10,
    masteryPct,
    recentMastery: null,
    trendData: [],
    questionCount: 30,
    ...opts,
  }
}

describe("Mastery Color", () => {
  it("returns neon-cyan for >= 83", () => {
    expect(getMasteryColor(83)).toBe("var(--neon-cyan)")
    expect(getMasteryColor(100)).toBe("var(--neon-cyan)")
    expect(getMasteryColor(90)).toBe("var(--neon-cyan)")
  })

  it("returns neon-purple for >= 60 and < 83", () => {
    expect(getMasteryColor(60)).toBe("var(--neon-purple)")
    expect(getMasteryColor(75)).toBe("var(--neon-purple)")
    expect(getMasteryColor(82)).toBe("var(--neon-purple)")
  })

  it("returns neon-pink for < 60", () => {
    expect(getMasteryColor(59)).toBe("var(--neon-pink)")
    expect(getMasteryColor(0)).toBe("var(--neon-pink)")
    expect(getMasteryColor(30)).toBe("var(--neon-pink)")
  })
})

describe("Mastery Level", () => {
  it("returns 'strong' for >= 83", () => {
    expect(getMasteryLevel(83)).toBe("strong")
    expect(getMasteryLevel(100)).toBe("strong")
  })

  it("returns 'moderate' for >= 60 and < 83", () => {
    expect(getMasteryLevel(60)).toBe("moderate")
    expect(getMasteryLevel(82)).toBe("moderate")
  })

  it("returns 'weak' for < 60", () => {
    expect(getMasteryLevel(59)).toBe("weak")
    expect(getMasteryLevel(0)).toBe("weak")
  })
})

describe("Weakest Categories", () => {
  it("returns categories sorted ascending by mastery, limited to N", () => {
    const categories: CategoryMastery[] = [
      makeCategoryMastery("road-signs", 90),
      makeCategoryMastery("right-of-way", 40),
      makeCategoryMastery("traffic-laws", 70),
      makeCategoryMastery("speed-limits", 20),
      makeCategoryMastery("dui-drug-laws", 60),
    ]

    const weakest = getWeakestCategories(categories, 3)
    expect(weakest).toHaveLength(3)
    expect(weakest[0].slug).toBe("speed-limits")
    expect(weakest[1].slug).toBe("right-of-way")
    expect(weakest[2].slug).toBe("dui-drug-laws")
  })

  it("returns all categories if limit exceeds length", () => {
    const categories: CategoryMastery[] = [
      makeCategoryMastery("road-signs", 90),
      makeCategoryMastery("right-of-way", 40),
    ]

    const weakest = getWeakestCategories(categories, 5)
    expect(weakest).toHaveLength(2)
  })

  it("returns empty array for empty input", () => {
    const weakest = getWeakestCategories([], 3)
    expect(weakest).toHaveLength(0)
  })
})

describe("Analytics Types", () => {
  it("UserAnalytics, CategoryMastery, SessionTrend, CategoryTrend types are exported", () => {
    const analytics: UserAnalytics = {
      categories: [],
      sessionTrends: [],
      missedQuestionIds: [],
      totalSessions: 0,
      readinessScore: 0,
      readinessMessage: "",
    }
    expect(analytics).toBeDefined()

    const trend: SessionTrend = {
      sessionId: "abc",
      mode: "practice",
      score: 10,
      total: 15,
      startedAt: "2024-01-01",
      percentage: 67,
    }
    expect(trend).toBeDefined()

    const catTrend: CategoryTrend = {
      categorySlug: "road-signs",
      sessions: [{ sessionId: "abc", pct: 80, date: "2024-01-01" }],
    }
    expect(catTrend).toBeDefined()
  })
})
