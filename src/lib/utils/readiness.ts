import { CATEGORY_WEIGHTS } from "@/lib/types/question"
import type { CategoryMastery } from "@/lib/types/analytics"

export function computeReadinessScore(categories: CategoryMastery[]): number {
  const categoryMap = new Map(categories.map((c) => [c.slug, c]))
  let weightedSum = 0
  let totalWeight = 0

  for (const [slug, weight] of Object.entries(CATEGORY_WEIGHTS)) {
    const cat = categoryMap.get(slug)
    totalWeight += weight

    if (!cat || cat.total === 0) {
      continue
    }

    const recentMastery = cat.recentMastery ?? cat.masteryPct
    const blended = recentMastery * 0.6 + cat.masteryPct * 0.4

    weightedSum += blended * weight
  }

  return totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0
}

export function getReadinessMessage(score: number): string {
  if (score >= 90) return "You're ready! Go ace that test!"
  if (score >= 83) return "Looking good! Almost test-ready!"
  if (score >= 70) return "Great progress! Keep it up!"
  if (score >= 50) return "You're getting there! Keep practicing!"
  return "Keep practicing! Every session helps!"
}
