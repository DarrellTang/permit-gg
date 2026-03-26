"use client"

import { getMasteryColor } from "@/lib/utils/mastery"

interface ReadinessGaugeProps {
  score: number
  message: string
}

export function ReadinessGauge({ score, message }: ReadinessGaugeProps) {
  const color = getMasteryColor(score)
  const displayScore = score > 0 ? `${score}%` : "--%"
  const displayMessage =
    score > 0 ? message : "Complete quizzes to see your readiness score"

  const radius = 90
  const strokeWidth = 20
  const cx = 120
  const cy = 110
  const halfCircumference = Math.PI * radius
  const fillLength = (score / 100) * halfCircumference
  const gapLength = halfCircumference - fillLength

  // Semicircle arc path from left to right (180° arc)
  const arcPath = `M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`

  return (
    <section className="flex flex-col items-center">
      <div className="w-full max-w-[280px]">
        <svg
          viewBox="0 0 240 140"
          className="w-full"
          aria-label={`Readiness score: ${score}%`}
        >
          {/* Track (unfilled arc) */}
          <path
            d={arcPath}
            fill="none"
            stroke="hsl(var(--muted) / 0.4)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Filled arc — same path, clipped by dasharray */}
          {score > 0 && (
            <path
              d={arcPath}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={`${fillLength} ${halfCircumference}`}
              style={{
                filter: `drop-shadow(0 0 8px ${color}80)`,
              }}
            />
          )}
        </svg>

        <div className="flex flex-col items-center text-center -mt-12">
          <span
            className="font-display text-5xl font-bold"
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
