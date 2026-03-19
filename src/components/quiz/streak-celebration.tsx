"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { fireConfetti } from "@/hooks/use-confetti"

interface StreakCelebrationProps {
  streak: number
  show: boolean
}

function getStreakMessage(streak: number): string {
  if (streak >= 10) return `${streak} in a row!`
  if (streak >= 5) return `${streak} streak!`
  return ""
}

export function StreakCelebration({ streak, show }: StreakCelebrationProps) {
  useEffect(() => {
    if (show && streak > 0) {
      fireConfetti(streak)
    }
  }, [show, streak])

  const message = getStreakMessage(streak)

  if (!message || !show) return null

  return (
    <AnimatePresence>
      <motion.div
        key={`streak-${streak}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 15,
          duration: 0.5,
        }}
        className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center"
      >
        <motion.span
          animate={{ opacity: [1, 1, 0] }}
          transition={{ duration: 1.5, times: [0, 0.6, 1] }}
          className={`font-display text-4xl font-bold drop-shadow-lg ${
            streak >= 10
              ? "text-neon-pink"
              : streak >= 5
                ? "text-neon-purple"
                : "text-neon-cyan"
          }`}
        >
          {message}
        </motion.span>
      </motion.div>
    </AnimatePresence>
  )
}
