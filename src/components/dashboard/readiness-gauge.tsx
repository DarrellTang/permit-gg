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
      <div className="w-full max-w-[320px]">
        <ChartContainer
          config={chartConfig}
          className="aspect-[2/1] w-full"
        >
          <RadialBarChart
            data={data}
            startAngle={180}
            endAngle={0}
            innerRadius="80%"
            outerRadius="100%"
            barSize={24}
            cx="50%"
            cy="85%"
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

        <div className="flex flex-col items-center text-center -mt-8">
          <span
            className="font-display text-4xl font-bold"
            style={{ color }}
          >
            {displayScore}
          </span>
          <span className="font-ui text-sm text-muted-foreground mt-1 px-4">
            {displayMessage}
          </span>
        </div>
      </div>
    </section>
  )
}
