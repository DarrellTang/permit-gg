"use client"

import { CategoryCard } from "./category-card"
import type { CategoryMastery } from "@/lib/types/analytics"

interface CategoryGridProps {
  categories: CategoryMastery[]
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  const sorted = [...categories].sort(
    (a, b) => a.masteryPct - b.masteryPct
  )

  return (
    <section>
      <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">
        Category Mastery
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sorted.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </section>
  )
}
