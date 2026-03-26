"use client"

import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts"
import {
  ChartContainer,
  type ChartConfig,
} from "@/components/ui/chart"
import { getMasteryColor } from "@/lib/utils/mastery"

interface ReadinessGaugeProps {
  score: number
  message: string
}

const chartConfig = {
  readiness: {
    label: "Readiness",
    color: "var(--neon-cyan)",
  },
} satisfies ChartConfig

export function ReadinessGauge({ score, message }: ReadinessGaugeProps) {
  const color = getMasteryColor(score)
  const displayScore = score > 0 ? `${score}%` : "--%"
  const displayMessage =
    score > 0 ? message : "Complete quizzes to see your readiness score"

  const data = [{ name: "readiness", value: score, fill: color }]

  return (
    <section className="flex flex-col items-center">
      <div className="relative w-full max-w-[280px]">
        <ChartContainer
          config={chartConfig}
          className="aspect-[2/1.2] w-full"
        >
          <RadialBarChart
            data={data}
            startAngle={180}
            endAngle={0}
            innerRadius="80%"
            outerRadius="100%"
            barSize={16}
            cx="50%"
            cy="80%"
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar
              dataKey="value"
              background={{ fill: "var(--surface-container-low)" }}
              cornerRadius={10}
              isAnimationActive={false}
            />
          </RadialBarChart>
        </ChartContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-end pb-4 pointer-events-none">
          <span
            className="font-display text-5xl font-bold lg:text-6xl"
            style={{ color }}
          >
            {displayScore}
          </span>
          <span className="font-ui text-sm text-muted-foreground mt-1 text-center px-4">
            {displayMessage}
          </span>
        </div>
      </div>
    </section>
  )
}
