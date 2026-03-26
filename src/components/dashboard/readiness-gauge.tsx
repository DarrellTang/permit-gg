"use client"

import { getMasteryColor, getMasteryLevel } from "@/lib/utils/mastery"

interface ReadinessGaugeProps {
  score: number
  message: string
}

export function ReadinessGauge({ score, message }: ReadinessGaugeProps) {
  const color = getMasteryColor(score)
  const level = getMasteryLevel(score)
  const displayScore = score > 0 ? `${score}%` : "--%"
  const displayMessage =
    score > 0 ? message : "Complete quizzes to see your readiness score"

  return (
    <section className="w-full max-w-md mx-auto">
      <div className="flex items-baseline justify-between mb-3">
        <div className="flex items-baseline gap-3">
          <span
            className="font-display text-6xl font-bold"
            style={{ color }}
          >
            {displayScore}
          </span>
          <span className="font-ui text-lg text-muted-foreground uppercase tracking-wider">
            {level}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative h-4 rounded-full bg-muted/30 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
          style={{
            width: `${Math.max(score, 2)}%`,
            backgroundColor: color,
            boxShadow: `0 0 12px ${color}60`,
          }}
        />
        {/* 83% pass threshold marker */}
        <div
          className="absolute inset-y-0 w-0.5 bg-white/40"
          style={{ left: "83%" }}
          title="DMV pass threshold (83%)"
        />
      </div>

      <div className="flex justify-between mt-2">
        <span className="font-ui text-sm text-muted-foreground">
          {displayMessage}
        </span>
        <span className="font-ui text-xs text-muted-foreground/60">
          83% to pass
        </span>
      </div>
    </section>
  )
}
