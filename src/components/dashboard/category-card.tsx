"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getMasteryColor } from "@/lib/utils/mastery"
import type { CategoryMastery } from "@/lib/types/analytics"

interface CategoryCardProps {
  category: CategoryMastery
}

function getStatusBadge(pct: number) {
  if (pct >= 90)
    return {
      label: "MASTERED",
      classes: "bg-neon-cyan/15 text-neon-cyan border-neon-cyan/25",
    }
  if (pct >= 70)
    return {
      label: "STABILIZING",
      classes: "bg-neon-purple/15 text-neon-purple border-neon-purple/25",
    }
  if (pct >= 50)
    return {
      label: "NEEDS WORK",
      classes: "bg-neon-pink/15 text-neon-pink border-neon-pink/25",
    }
  return {
    label: "CRITICAL",
    classes: "bg-destructive/15 text-destructive border-destructive/25",
  }
}

export function CategoryCard({ category }: CategoryCardProps) {
  const color = getMasteryColor(category.masteryPct)
  const hasData = category.total > 0
  const displayPct = hasData ? `${Math.round(category.masteryPct)}%` : "--%"
  const badge = getStatusBadge(category.masteryPct)

  return (
    <Link href={`/practice?category=${category.slug}`}>
      <Card
        className="group relative transition-all bloom-hover cursor-pointer h-full border-t-2 border-transparent"
        style={{ "--card-accent": color } as React.CSSProperties}
      >
        {/* Top border accent - slides in on hover */}
        <div
          className="absolute inset-x-0 top-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
          style={{ backgroundColor: color }}
        />

        <CardHeader className="pb-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {/* Category icon container */}
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md"
                style={{ backgroundColor: `${color}20` }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  style={{ color }}
                >
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                </svg>
              </div>
              <CardTitle className="font-display text-sm font-bold tracking-wide">
                {category.name}
              </CardTitle>
            </div>
            {hasData && (
              <Badge
                className={`${badge.classes} text-[10px] font-ui uppercase tracking-widest font-bold shrink-0`}
              >
                {badge.label}
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          {/* Mastery label and value */}
          <div className="flex items-center justify-between">
            <span className="font-ui text-[10px] uppercase tracking-widest text-muted-foreground">
              MASTERY
            </span>
            <span
              className="font-display text-lg font-bold"
              style={{ color: hasData ? color : undefined }}
            >
              {displayPct}
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-1.5 rounded-full bg-muted/30 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.max(category.masteryPct, 2)}%`,
                backgroundColor: color,
              }}
            />
          </div>

          <span className="font-ui text-xs text-muted-foreground block">
            {category.questionCount} questions
          </span>
        </CardContent>
      </Card>
    </Link>
  )
}
