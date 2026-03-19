"use client"

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { motion } from "motion/react"
import { CATEGORIES } from "@/lib/constants/categories"

interface CategoryBreakdown {
  categoryName: string
  categorySlug: string
  correct: number
  total: number
  percentage: number
}

interface CategoryRadarProps {
  categoryBreakdown: CategoryBreakdown[]
}

const SHORT_NAMES: Record<string, string> = {
  "road-signs": "Signs",
  "right-of-way": "Right-of-Way",
  "traffic-laws": "Traffic",
  "speed-limits": "Speed",
  "dui-drug-laws": "DUI",
  "safe-driving": "Safe Driving",
  parking: "Parking",
  "sharing-the-road": "Sharing",
}

const chartConfig = {
  score: {
    label: "Score %",
    color: "var(--neon-cyan)",
  },
} satisfies ChartConfig

export function CategoryRadar({ categoryBreakdown }: CategoryRadarProps) {
  const breakdownMap = new Map(
    categoryBreakdown.map((cat) => [cat.categorySlug, cat])
  )

  const data = CATEGORIES.map((cat) => {
    const breakdown = breakdownMap.get(cat.slug)
    return {
      category: SHORT_NAMES[cat.slug] ?? cat.name,
      score: breakdown?.percentage ?? 0,
      fullMark: 100,
    }
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
    >
      <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">
        Category Breakdown
      </h3>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square h-[250px] sm:h-[300px]"
      >
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="80%">
          <PolarGrid stroke="var(--color-border)" />
          <PolarAngleAxis
            dataKey="category"
            tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={false}
            axisLine={false}
          />
          <Radar
            dataKey="score"
            stroke="var(--neon-cyan)"
            fill="var(--neon-cyan)"
            fillOpacity={0.25}
            strokeWidth={2}
          />
          <ChartTooltip
            content={<ChartTooltipContent />}
          />
        </RadarChart>
      </ChartContainer>
    </motion.div>
  )
}
