"use client"

import { Suspense, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useQuizStore } from "@/stores/quiz-store"
import { computeQuizSummary } from "@/lib/utils/quiz-summary"
import { fetchSessionSummary } from "@/server/actions/quiz"
import { ScoreReveal } from "@/components/summary/score-reveal"
import { QuizStats } from "@/components/summary/quiz-stats"
import { CategoryRadar } from "@/components/summary/category-radar"
import { WrongAnswerCarousel } from "@/components/summary/wrong-answer-carousel"
import { SmartActions } from "@/components/summary/smart-actions"
import { SignupPrompt } from "@/components/summary/signup-prompt"
import type { QuizSummary } from "@/lib/utils/quiz-summary"

export default function PracticeSummaryPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background via-background to-muted/30">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-neon-cyan border-t-transparent" />
      </div>
    }>
      <PracticeSummaryContent />
    </Suspense>
  )
}

function PracticeSummaryContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session")

  const answers = useQuizStore((s) => s.answers)
  const questions = useQuizStore((s) => s.questions)
  const bestStreak = useQuizStore((s) => s.bestStreak)
  const sessionStartTime = useQuizStore((s) => s.sessionStartTime)

  const [totalTimeMs, setTotalTimeMs] = useState(0)
  const [remoteSummary, setRemoteSummary] = useState<QuizSummary | null>(null)
  const [remoteBestStreak, setRemoteBestStreak] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (sessionStartTime > 0) {
      setTotalTimeMs(Date.now() - sessionStartTime)
    }
  }, [sessionStartTime])

  const localSummary = useMemo(() => {
    if (answers.length === 0 || questions.length === 0) return null
    return computeQuizSummary(answers, questions)
  }, [answers, questions])

  useEffect(() => {
    if (!localSummary && sessionId) {
      setLoading(true)
      fetchSessionSummary(sessionId)
        .then((result) => {
          if (result) {
            setRemoteSummary(result.summary)
            setRemoteBestStreak(result.bestStreak)
            setTotalTimeMs(result.totalTimeMs)
          }
        })
        .catch(() => {})
        .finally(() => setLoading(false))
    }
  }, [localSummary, sessionId])

  const summary = localSummary ?? remoteSummary
  const effectiveBestStreak = localSummary ? bestStreak : remoteBestStreak

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background via-background to-muted/30">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-neon-cyan border-t-transparent" />
      </div>
    )
  }

  if (!summary) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background via-background to-muted/30">
        <p className="font-ui text-sm text-muted-foreground">
          No quiz data found. Start a new quiz from the dashboard.
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      <div className="mx-auto max-w-lg space-y-8 px-4 py-8 sm:px-6">
        <ScoreReveal score={summary.score} total={summary.total} />

        <QuizStats
          bestStreak={effectiveBestStreak}
          totalTimeMs={totalTimeMs}
          score={summary.score}
          total={summary.total}
        />

        <CategoryRadar categoryBreakdown={summary.categoryBreakdown} />

        <WrongAnswerCarousel
          wrongAnswers={summary.wrongAnswers}
          questions={questions}
        />

        <SignupPrompt />

        <SmartActions
          mode="practice"
          categoryBreakdown={summary.categoryBreakdown}
        />
      </div>
    </div>
  )
}
