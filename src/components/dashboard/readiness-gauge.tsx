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
  const cy = 100
  const circumference = Math.PI * radius
  const fillLength = (score / 100) * circumference
  const gapLength = circumference - fillLength

  return (
    <section className="flex flex-col items-center">
      <div className="w-full max-w-[280px]">
        <svg
          viewBox="0 0 240 130"
          className="w-full"
          aria-label={`Readiness score: ${score}%`}
        >
          {/* Track (unfilled arc) */}
          <path
            d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
            fill="none"
            stroke="hsl(var(--muted) / 0.4)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Filled arc */}
          {score > 0 && (
            <circle
              cx={cx}
              cy={cy}
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={`${fillLength} ${gapLength}`}
              strokeDashoffset={0}
              transform={`rotate(180 ${cx} ${cy})`}
              style={{
                filter: `drop-shadow(0 0 8px ${color}80)`,
              }}
            />
          )}
        </svg>

        <div className="flex flex-col items-center text-center -mt-10">
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
