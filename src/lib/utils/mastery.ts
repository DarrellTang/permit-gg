import type { CategoryMastery } from "@/lib/types/analytics"

export function getMasteryColor(pct: number): string {
  if (pct >= 83) return "var(--neon-cyan)"
  if (pct >= 60) return "var(--neon-purple)"
  return "var(--neon-pink)"
}

export function getMasteryLevel(pct: number): "strong" | "moderate" | "weak" {
  if (pct >= 83) return "strong"
  if (pct >= 60) return "moderate"
  return "weak"
}

export function getWeakestCategories(
  categories: CategoryMastery[],
  limit: number
): CategoryMastery[] {
  return [...categories]
    .sort((a, b) => a.masteryPct - b.masteryPct)
    .slice(0, limit)
}
