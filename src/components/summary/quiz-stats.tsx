"use client"

import { motion } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"

interface QuizStatsProps {
  bestStreak: number
  totalTimeMs: number
  score: number
  total: number
}

function formatDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  if (minutes === 0) return `${seconds}s`
  return `${minutes}m ${seconds}s`
}

export function QuizStats({
  bestStreak,
  totalTimeMs,
  score,
  total,
}: QuizStatsProps) {
  const accuracy = total > 0 ? Math.round((score / total) * 100) : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
    >
      <Card className="">
        <CardContent className="p-0">
          <div className="grid grid-cols-3">
            <div className="flex flex-col items-center gap-1 py-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-orange-400"
              >
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
              </svg>
              <span className="font-display text-2xl font-bold text-neon-cyan">
                {bestStreak}
              </span>
              <span className="font-ui text-[11px] text-muted-foreground">
                Best Streak
              </span>
            </div>

            <div className="flex flex-col items-center gap-1 py-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-blue-400"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="font-display text-2xl font-bold text-neon-cyan">
                {formatDuration(totalTimeMs)}
              </span>
              <span className="font-ui text-[11px] text-muted-foreground">
                Time
              </span>
            </div>

            <div className="flex flex-col items-center gap-1 py-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-green-400"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
              <span className="font-display text-2xl font-bold text-neon-cyan">
                {accuracy}%
              </span>
              <span className="font-ui text-[11px] text-muted-foreground">
                Accuracy
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
