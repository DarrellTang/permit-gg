"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CategorySparkline } from "./category-sparkline"
import { getMasteryColor, getMasteryLevel } from "@/lib/utils/mastery"
import type { CategoryMastery } from "@/lib/types/analytics"

interface CategoryCardProps {
  category: CategoryMastery
}

export function CategoryCard({ category }: CategoryCardProps) {
  const color = getMasteryColor(category.masteryPct)
  const level = getMasteryLevel(category.masteryPct)
  const hasData = category.total > 0
  const displayPct = hasData ? `${Math.round(category.masteryPct)}%` : "--%"

  const sparklineData = category.trendData.map((d) => ({ value: d.pct }))

  return (
    <Link href={`/practice?category=${category.slug}`}>
      <Card
        className="group transition-all bloom-hover cursor-pointer h-full"
        style={{
          borderLeft: hasData ? `3px solid ${color}` : undefined,
        }}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="font-display text-sm font-bold tracking-wide">
              {category.name}
            </CardTitle>
            {level === "weak" && hasData && (
              <Badge className="bg-neon-pink/15 text-neon-pink border-neon-pink/25 text-[10px] font-bold">
                Needs Work
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-baseline justify-between">
            <span
              className="font-display text-2xl font-bold"
              style={{ color: hasData ? color : undefined }}
            >
              {displayPct}
            </span>
            <span className="font-ui text-xs text-muted-foreground">
              {category.questionCount} questions
            </span>
          </div>

          {sparklineData.length >= 2 && (
            <CategorySparkline data={sparklineData} color={color} />
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
