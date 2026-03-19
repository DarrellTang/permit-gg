"use client"

import { motion } from "motion/react"
import { useQuizStore } from "@/stores/quiz-store"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface FlaggedReviewProps {
  onNavigateToQuestion: (index: number) => void
  onSubmitTest: () => void
  isSubmitting: boolean
}

export function FlaggedReview({
  onNavigateToQuestion,
  onSubmitTest,
  isSubmitting,
}: FlaggedReviewProps) {
  const flaggedIndices = useQuizStore((s) => s.flaggedIndices)
  const answers = useQuizStore((s) => s.answers)
  const questions = useQuizStore((s) => s.questions)

  const flaggedArray = Array.from(flaggedIndices).sort((a, b) => a - b)

  if (flaggedArray.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex min-h-screen items-center justify-center p-6"
      >
        <div className="w-full max-w-md space-y-6 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Ready to Submit?
          </h2>
          <p className="font-body text-muted-foreground">
            You have answered all 46 questions with no flagged items.
          </p>
          <Button
            onClick={onSubmitTest}
            disabled={isSubmitting}
            className="h-12 w-full bg-gradient-to-r from-neon-purple to-neon-cyan font-ui text-base font-bold text-white shadow-lg shadow-neon-purple/20 transition-all hover:shadow-neon-cyan/30"
          >
            {isSubmitting ? "Submitting..." : "Submit Test"}
          </Button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-2xl space-y-6 p-6"
    >
      <div className="space-y-2 text-center">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Review Flagged Questions
        </h2>
        <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
          {flaggedArray.length} flagged
        </Badge>
        <p className="font-body text-sm text-muted-foreground">
          Tap a question to review and change your answer
        </p>
      </div>

      <div className="grid grid-cols-5 gap-3 sm:grid-cols-8">
        {flaggedArray.map((index) => {
          const answer = answers[index]
          const hasAnswer = !!answer

          return (
            <button
              key={index}
              type="button"
              onClick={() => onNavigateToQuestion(index)}
              className="flex flex-col items-center gap-1 rounded-xl border-2 border-amber-500/40 bg-amber-500/10 p-3 font-ui text-sm font-bold text-amber-400 transition-all hover:border-amber-400 hover:bg-amber-500/20"
            >
              <span>{index + 1}</span>
              {hasAnswer && (
                <span className="text-[10px] font-normal text-muted-foreground">
                  answered
                </span>
              )}
            </button>
          )
        })}
      </div>

      <div className="pt-4">
        <Button
          onClick={onSubmitTest}
          disabled={isSubmitting}
          className="h-12 w-full bg-gradient-to-r from-neon-purple to-neon-cyan font-ui text-base font-bold text-white shadow-lg shadow-neon-purple/20 transition-all hover:shadow-neon-cyan/30"
        >
          {isSubmitting ? "Submitting..." : "Submit Test"}
        </Button>
      </div>
    </motion.div>
  )
}
