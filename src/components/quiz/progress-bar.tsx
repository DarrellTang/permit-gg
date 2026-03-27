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
      <div className="flex items-center justify-between font-ui text-[10px] tracking-[0.1em] uppercase">
        <span className="text-muted-foreground/60">
          Q{current + 1} / {total}
        </span>
        <div className="flex items-center gap-3">
          {streak > 0 && (
            <motion.span
              key={streak}
              initial={{ scale: 1.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`font-bold bloom-secondary ${
                streak >= 10
                  ? "text-neon-pink"
                  : streak >= 5
                    ? "text-neon-purple"
                    : "text-neon-mint"
              }`}
            >
              ✦ {streak} STREAK
            </motion.span>
          )}
          <span className="text-neon-mint/60">
            {correctCount}/{total} CORRECT
          </span>
        </div>
      </div>

      <div className="relative h-2 overflow-hidden bg-muted/20">
        <motion.div
          className="absolute inset-y-0 left-0 bg-muted-foreground/10"
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-neon-purple to-neon-cyan"
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
