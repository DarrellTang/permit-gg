"use client"

import { motion } from "motion/react"
import type { AnswerState, QuizMode } from "@/lib/types/quiz"

interface AnswerFeedbackProps {
  explanation: string
  handbookReference: string
  answerState: AnswerState
  isCorrect: boolean
  mode: QuizMode
}

export function AnswerFeedback({
  explanation,
  handbookReference,
  answerState,
  isCorrect,
  mode,
}: AnswerFeedbackProps) {
  if (mode === "sim") return null
  if (answerState !== "revealed") return null
  if (isCorrect) return null

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="overflow-hidden"
    >
      <div className="mt-4 rounded-xl glass ghost-border p-4">
        <p className="font-body text-sm leading-relaxed text-foreground/90">
          {explanation}
        </p>
        {handbookReference && (
          <p className="mt-2 font-ui text-xs text-muted-foreground">
            CA DMV Handbook: {handbookReference}
          </p>
        )}
      </div>
    </motion.div>
  )
}
