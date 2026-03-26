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

  const radius = 52
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  const thresholdAngle = (83 / 100) * 360 - 90
  const thresholdRad = (thresholdAngle * Math.PI) / 180
  const tickInnerR = 44
  const tickOuterR = 60
  const tickX1 = 60 + tickInnerR * Math.cos(thresholdRad)
  const tickY1 = 60 + tickInnerR * Math.sin(thresholdRad)
  const tickX2 = 60 + tickOuterR * Math.cos(thresholdRad)
  const tickY2 = 60 + tickOuterR * Math.sin(thresholdRad)

  return (
    <section className="flex flex-col items-center">
      <svg
        width="160"
        height="160"
        viewBox="0 0 120 120"
        className="overflow-visible"
        style={{ filter: `drop-shadow(0 0 6px ${color}60)` }}
      >
        {/* Background circle */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="var(--muted)"
          strokeOpacity="0.2"
          strokeWidth="8"
        />

        {/* Foreground arc */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 60 60)"
          className="transition-all duration-500"
        />

        {/* 83% pass threshold tick mark */}
        <line
          x1={tickX1}
          y1={tickY1}
          x2={tickX2}
          y2={tickY2}
          stroke="var(--muted-foreground)"
          strokeWidth="1.5"
          strokeOpacity="0.5"
          strokeLinecap="round"
        />

        {/* Score text */}
        <text
          x="60"
          y="55"
          textAnchor="middle"
          dominantBaseline="middle"
          className="font-display text-2xl font-bold fill-foreground"
          style={{ fontSize: "24px" }}
        >
          {displayScore}
        </text>

        {/* PASS RATE label */}
        <text
          x="60"
          y="72"
          textAnchor="middle"
          dominantBaseline="middle"
          className="font-ui fill-muted-foreground"
          style={{ fontSize: "8px", letterSpacing: "0.1em", textTransform: "uppercase" }}
        >
          PASS RATE
        </text>
      </svg>

      <p className="font-ui text-sm text-muted-foreground mt-2 text-center">
        {displayMessage}
      </p>
    </section>
  )
}
