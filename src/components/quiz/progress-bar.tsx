"use client"

import { motion } from "motion/react"

interface ProgressBarProps {
  current: number
  total: number
  correctCount: number
  streak: number
}

export function QuizProgressBar({
  current,
  total,
  correctCount,
  streak,
}: ProgressBarProps) {
  const progress = ((current + 1) / total) * 100
  const xpProgress = (correctCount / total) * 100

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between font-ui text-xs">
        <span className="text-muted-foreground">
          Question {current + 1} of {total}
        </span>
        {streak > 0 && (
          <motion.span
            key={streak}
            initial={{ scale: 1.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`font-bold ${
              streak >= 10
                ? "text-neon-pink"
                : streak >= 5
                  ? "text-neon-purple"
                  : "text-neon-cyan"
            }`}
          >
            {streak} streak
          </motion.span>
        )}
      </div>

      <div className="relative h-3 overflow-hidden rounded-full bg-muted">
        {/* Question progress — fills as you answer questions */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-muted-foreground/20"
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
        {/* XP bar — fills only with correct answers, glows on streak */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-neon-purple to-neon-cyan"
          animate={{ width: `${xpProgress}%` }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          style={{
            boxShadow:
              streak >= 5
                ? "0 0 12px var(--neon-cyan), 0 0 24px var(--neon-cyan)"
                : "none",
          }}
        />
      </div>
    </div>
  )
}
