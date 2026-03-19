"use client"

import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "motion/react"
import { useQuizStore } from "@/stores/quiz-store"
import { computeQuizSummary } from "@/lib/utils/quiz-summary"
import { DmvResultLetter } from "@/components/summary/dmv-result-letter"
import { ScoreReveal } from "@/components/summary/score-reveal"
import { QuizStats } from "@/components/summary/quiz-stats"
import { CategoryRadar } from "@/components/summary/category-radar"
import { WrongAnswerCarousel } from "@/components/summary/wrong-answer-carousel"
import { SmartActions } from "@/components/summary/smart-actions"

export default function SimSummaryPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session")

  const score = useQuizStore((s) => s.score)
  const totalQuestions = useQuizStore((s) => s.totalQuestions)
  const answers = useQuizStore((s) => s.answers)
  const questions = useQuizStore((s) => s.questions)
  const bestStreak = useQuizStore((s) => s.bestStreak)
  const sessionStartTime = useQuizStore((s) => s.sessionStartTime)

  const [showFullResults, setShowFullResults] = useState(false)
  const [totalTimeMs, setTotalTimeMs] = useState(0)

  useEffect(() => {
    if (sessionStartTime > 0) {
      setTotalTimeMs(Date.now() - sessionStartTime)
    }
  }, [sessionStartTime])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFullResults(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const summary = useMemo(() => {
    if (answers.length === 0 || questions.length === 0) return null
    return computeQuizSummary(answers, questions)
  }, [answers, questions])

  if (!summary) {
    return (
      <DmvResultLetter
        score={score}
        total={totalQuestions}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      <DmvResultLetter
        score={summary.score}
        total={summary.total}
      />

      <AnimatePresence>
        {!showFullResults && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center pb-4"
          >
            <button
              type="button"
              onClick={() => setShowFullResults(true)}
              className="rounded-lg bg-muted/50 px-6 py-2.5 font-ui text-sm font-semibold text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
            >
              View Full Results
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {showFullResults && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-lg space-y-8 px-4 pb-8 sm:px-6"
        >
          <ScoreReveal score={summary.score} total={summary.total} />

          <QuizStats
            bestStreak={bestStreak}
            totalTimeMs={totalTimeMs}
            score={summary.score}
            total={summary.total}
          />

          <CategoryRadar categoryBreakdown={summary.categoryBreakdown} />

          <WrongAnswerCarousel
            wrongAnswers={summary.wrongAnswers}
            questions={questions}
          />

          <SmartActions
            mode="sim"
            categoryBreakdown={summary.categoryBreakdown}
          />
        </motion.div>
      )}
    </div>
  )
}
