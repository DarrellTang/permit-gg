"use client"

import { motion, useMotionValue, useTransform, animate } from "motion/react"
import { useEffect, useState, useCallback } from "react"
import { fireConfetti } from "@/hooks/use-confetti"

interface ScoreRevealProps {
  score: number
  total: number
}

export function ScoreReveal({ score, total }: ScoreRevealProps) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))
  const percentage = useTransform(count, (v) =>
    total > 0 ? Math.round((v / total) * 100) : 0
  )
  const [isComplete, setIsComplete] = useState(false)
  const [displayScore, setDisplayScore] = useState(0)
  const [displayPercentage, setDisplayPercentage] = useState(0)

  useEffect(() => {
    const unsubRounded = rounded.on("change", (v) => setDisplayScore(v))
    const unsubPercent = percentage.on("change", (v) => setDisplayPercentage(v))
    return () => {
      unsubRounded()
      unsubPercent()
    }
  }, [rounded, percentage])

  useEffect(() => {
    const controls = animate(count, score, {
      duration: 2,
      ease: "easeOut",
      onComplete: () => {
        setIsComplete(true)
        const pct = total > 0 ? (score / total) * 100 : 0
        if (pct >= 90) {
          fireConfetti(10)
        } else if (pct >= 70) {
          fireConfetti(5)
        }
      },
    })
    return controls.stop
  }, [score, total, count])

  const handleSkip = useCallback(() => {
    count.set(score)
    setIsComplete(true)
    setDisplayScore(score)
    setDisplayPercentage(total > 0 ? Math.round((score / total) * 100) : 0)
  }, [count, score, total])

  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="font-display text-7xl font-bold text-neon-cyan"
      >
        <span>{displayScore}</span>
        <span className="text-4xl text-muted-foreground">/{total}</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="mt-2 font-display text-3xl font-bold text-neon-pink"
      >
        <span>{displayPercentage}</span>%
      </motion.div>

      {!isComplete && (
        <motion.button
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={handleSkip}
          className="mt-4 font-ui text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Skip
        </motion.button>
      )}
    </div>
  )
}
