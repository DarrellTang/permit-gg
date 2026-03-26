"use client"

import { motion } from "motion/react"
import { DMV_CONFIG } from "@/lib/constants/quiz-config"

interface DmvResultLetterProps {
  score: number
  total: number
  onBackToDashboard?: () => void
}

export function DmvResultLetter({
  score,
  total,
  onBackToDashboard,
}: DmvResultLetterProps) {
  const percentage = Math.round((score / total) * 100)
  const passed = score >= DMV_CONFIG.passingScore

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <motion.div
        initial={{ opacity: 0, y: 80, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
          rotate: { delay: 0.3, duration: 0.5 },
        }}
        className="w-full max-w-lg"
      >
        <div className="rounded-xl glass ghost-border bg-[#faf9f6] dark:bg-card/90 p-8">
          <div className="space-y-6 text-center">
            <div className="space-y-1">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                State of California
              </p>
              <p className="font-body text-sm text-muted-foreground/80">
                Department of Motor Vehicles
              </p>
            </div>

            <div className="border-y border-[var(--border)]/15 py-4">
              <h1 className="font-display text-lg font-bold uppercase tracking-wider text-foreground">
                Knowledge Test Results
              </h1>
            </div>

            <div className="space-y-2">
              <p className="font-body text-base text-muted-foreground">
                Your Score
              </p>
              <p className="font-display text-4xl font-bold text-foreground">
                {score}/{total}{" "}
                <span className="text-2xl text-muted-foreground">
                  ({percentage}%)
                </span>
              </p>
            </div>

            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4, ease: "backOut" }}
            >
              {passed ? (
                <div className="inline-block rounded-lg bg-green-500/15 px-8 py-3">
                  <span
                    className="font-display text-3xl font-black uppercase tracking-widest text-green-500"
                    style={{
                      textShadow:
                        "0 0 20px rgba(34, 197, 94, 0.4), 0 0 40px rgba(34, 197, 94, 0.2)",
                    }}
                  >
                    PASS
                  </span>
                </div>
              ) : (
                <div className="inline-block rounded-lg bg-red-500/15 px-8 py-3">
                  <span className="font-display text-3xl font-black uppercase tracking-widest text-red-500">
                    FAIL
                  </span>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.5 }}
            >
              {passed ? (
                <p className="font-body text-sm leading-relaxed text-green-600 dark:text-green-400">
                  Congratulations! You have passed the knowledge test.
                </p>
              ) : (
                <p className="font-body text-sm leading-relaxed text-red-500/80">
                  You did not pass. You need {DMV_CONFIG.passingScore}/
                  {DMV_CONFIG.totalQuestions} (
                  {Math.round(DMV_CONFIG.passingPercentage * 100)}%) to pass.
                  Study the areas below and try again.
                </p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="pt-2"
            >
              <p className="font-ui text-xs text-muted-foreground/60">
                Passing score: {DMV_CONFIG.passingScore}/
                {DMV_CONFIG.totalQuestions} (
                {Math.round(DMV_CONFIG.passingPercentage * 100)}%)
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.5 }}
          className="mt-6 flex justify-center"
        >
          <button
            type="button"
            onClick={onBackToDashboard}
            className="rounded-lg bg-muted/50 px-6 py-2.5 font-ui text-sm font-semibold text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
          >
            Back to Dashboard
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}
