"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useQuiz } from "@/hooks/use-quiz"
import { useQuizSounds } from "@/hooks/use-sound-fx"
import { fireConfetti } from "@/hooks/use-confetti"
import { QuizProgressBar } from "./progress-bar"
import { QuestionCard } from "./question-card"
import { QuitDialog } from "./quit-dialog"
import { QuestionCountConfig } from "./question-count-config"
import { StreakCelebration } from "./streak-celebration"
import { FlaggedReview } from "./flagged-review"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PRACTICE_DEFAULTS } from "@/lib/constants/quiz-config"
import { createClient } from "@/lib/supabase/client"
import { fetchUserAnalytics } from "@/server/actions/analytics"
import type { QuizMode } from "@/lib/types/quiz"

type ShellState = "pre-start" | "loading" | "active" | "complete"

interface QuizShellProps {
  mode: QuizMode
  questionCount?: number
  categorySlug?: string | null
  categoryName?: string | null
  categoryIcon?: string | null
}

export function QuizShell({ mode, categorySlug, categoryName, categoryIcon }: QuizShellProps) {
  const isDrill = !!categorySlug
  const [shellState, setShellState] = useState<ShellState>(
    mode === "practice" ? "pre-start" : "loading"
  )
  const [count, setCount] = useState<number>(PRACTICE_DEFAULTS.defaultCount)
  const [quitDialogOpen, setQuitDialogOpen] = useState(false)
  const [showStreak, setShowStreak] = useState(false)
  const [simSubmitting, setSimSubmitting] = useState(false)
  const [answerRecorded, setAnswerRecorded] = useState(false)
  const [completionError, setCompletionError] = useState(false)
  const [isGated, setIsGated] = useState(false)
  const prevAnswerCountRef = useRef(0)

  const quiz = useQuiz()
  const sounds = useQuizSounds()

  useEffect(() => {
    if (mode === "practice") {
      const freeQuizUsed = localStorage.getItem("permit_free_quiz_used")
      if (freeQuizUsed) {
        const supabase = createClient()
        supabase.auth.getUser().then(({ data: { user } }) => {
          if (!user) {
            setIsGated(true)
            window.location.href = "/login?next=/practice"
          }
        })
      }
    }
  }, [mode])

  const handleStart = useCallback(async () => {
    if (mode === "practice") {
      const freeQuizUsed = localStorage.getItem("permit_free_quiz_used")
      if (freeQuizUsed) {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          const loginNext = isDrill
            ? `/login?next=/practice?category=${categorySlug}`
            : "/login?next=/practice"
          window.location.href = loginNext
          return
        }
      }
    }

    if (isDrill && categorySlug) {
      try {
        const analyticsData = await fetchUserAnalytics()
        if (analyticsData) {
          const catMastery = analyticsData.categories.find(
            (c) => c.slug === categorySlug
          )
          sessionStorage.setItem(
            `drill_pre_mastery_${categorySlug}`,
            String(catMastery?.masteryPct ?? 0)
          )
        } else {
          sessionStorage.setItem(
            `drill_pre_mastery_${categorySlug}`,
            "0"
          )
        }
      } catch {
        sessionStorage.setItem(
          `drill_pre_mastery_${categorySlug}`,
          "0"
        )
      }
    }

    setShellState("loading")
    try {
      await quiz.startQuiz(mode, mode === "practice" ? count : undefined, categorySlug || undefined)
      setShellState("active")
    } catch {
      setShellState("pre-start")
    }
  }, [mode, count, quiz.startQuiz, isDrill, categorySlug])

  const handleSubmit = useCallback(() => {
    if (mode === "practice") {
      sounds.playSubmit()
    }
    quiz.handleSubmit()
  }, [mode, quiz.handleSubmit, sounds.playSubmit])

  useEffect(() => {
    if (quiz.answers.length <= prevAnswerCountRef.current) return
    prevAnswerCountRef.current = quiz.answers.length

    const lastAnswer = quiz.answers[quiz.answers.length - 1]
    if (!lastAnswer) return

    if (quiz.mode === "practice") {
      if (lastAnswer.isCorrect) {
        sounds.playCorrect()
        fireConfetti(quiz.streak)
        if (quiz.streak >= 5) {
          setShowStreak(true)
          setTimeout(() => setShowStreak(false), 1500)
        }
        quiz.scheduleAutoAdvance()
      } else {
        sounds.playWrong()
      }
    }

    if (quiz.mode === "sim") {
      setAnswerRecorded(true)
      setTimeout(() => setAnswerRecorded(false), 800)
    }
  }, [quiz.answers.length])

  useEffect(() => {
    if (quiz.mode === "sim" && quiz.allSimQuestionsAnswered && shellState === "active") {
      if (quiz.flaggedIndices.size > 0) {
        quiz.handleStartFlaggedReview()
      } else {
        quiz.handleStartFlaggedReview()
      }
    }
  }, [quiz.allSimQuestionsAnswered, shellState])

  useEffect(() => {
    if (quiz.mode === "practice" && quiz.isComplete && shellState === "active") {
      setShellState("complete")
      ;(async () => {
        try {
          await quiz.handlePracticeComplete()
        } catch {
          setCompletionError(true)
        }
      })()
    }
  }, [quiz.isComplete, shellState, quiz.mode])

  useEffect(() => {
    if (mode === "sim" && shellState === "loading") {
      handleStart()
    }
  }, [])

  const handleSimSubmit = useCallback(async () => {
    setSimSubmitting(true)
    try {
      await quiz.handleSimComplete()
    } catch {
      setSimSubmitting(false)
    }
  }, [quiz.handleSimComplete])

  if (shellState === "pre-start" && isGated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-6">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-neon-cyan border-t-transparent" />
          <p className="mt-4 font-ui text-sm text-muted-foreground">
            Redirecting to login...
          </p>
        </div>
      </div>
    )
  }

  if (shellState === "pre-start") {
    const QUESTION_OPTIONS = [
      { value: 10, label: "Quick Scan" },
      { value: 15, label: "Standard" },
      { value: 20, label: "Extended" },
    ]

    return (
      <div className="flex min-h-screen items-center justify-center p-6 relative">
        <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-neon-pink/[0.04] blur-[120px]" />
        <div className="pointer-events-none absolute bottom-10 left-10 h-64 w-64 rounded-full bg-neon-mint/[0.04] blur-[100px]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-xl"
        >
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 font-ui text-[10px] tracking-[0.2em] text-muted-foreground/50 uppercase">
            <span>{isDrill ? "DRILL" : "PRACTICE"}</span>
            <span>›</span>
            <span className="text-neon-mint">{isDrill ? categoryName?.toUpperCase() : "PARAMETER SETUP"}</span>
          </div>

          {/* Glass panel with gradient border */}
          <div className="p-[1px] bg-gradient-to-br from-neon-pink/30 via-transparent to-neon-mint/20">
            <div className="glass p-8 md:p-10 relative overflow-hidden">
              <div className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 border border-neon-pink/5 rotate-45" />

              <div className="text-center mb-10">
                <div className="inline-block px-3 py-1 bg-neon-mint/10 text-neon-mint font-ui text-[10px] tracking-[0.2em] uppercase mb-4 border border-neon-mint/20">
                  {isDrill ? `CATEGORY: ${categoryName?.toUpperCase()}` : "MODE: PRACTICE"}
                </div>

                {isDrill && categoryIcon && (
                  <span className="mb-2 block text-4xl">{categoryIcon}</span>
                )}

                <h1 className="font-display text-3xl md:text-4xl font-bold tracking-wider uppercase mb-3">
                  {isDrill ? (
                    <>Drill <span className="text-neon-pink">{categoryName}</span></>
                  ) : (
                    <>Practice <span className="text-neon-pink">Session</span></>
                  )}
                </h1>
                <p className="font-body text-sm text-muted-foreground max-w-md mx-auto">
                  {isDrill
                    ? `Focused questions on ${categoryName}. Sharpen your weak spots.`
                    : "Mixed topics from the CA DMV handbook. Select your question count to begin."}
                </p>
              </div>

              {/* Question count grid */}
              <div className="space-y-4 mb-10">
                <div className="flex items-center justify-between border-b border-muted/10 pb-3">
                  <span className="font-ui text-xs font-bold text-neon-lavender tracking-[0.15em] uppercase">
                    Question Volume
                  </span>
                  <span className="font-body text-[10px] text-muted-foreground/50 uppercase tracking-[0.15em]">
                    Select Count
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {QUESTION_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setCount(opt.value)}
                      className={`group relative py-5 text-center transition-all active:scale-95 cursor-pointer ${
                        count === opt.value
                          ? "bg-neon-pink/15 border-2 border-neon-pink shadow-[0_0_20px_rgba(255,174,216,0.2)]"
                          : "glass ghost-border hover:border-neon-pink/40"
                      }`}
                    >
                      <div className={`font-display text-2xl font-bold ${count === opt.value ? "text-neon-pink" : "group-hover:text-neon-pink"}`}>
                        {opt.value}
                      </div>
                      <div className={`text-[8px] font-ui uppercase tracking-[0.2em] mt-1 ${count === opt.value ? "text-neon-pink/80" : "text-muted-foreground group-hover:text-neon-pink/60"}`}>
                        {opt.label}
                      </div>
                      {opt.value === 15 && (
                        <div className="absolute top-1 right-1 text-neon-pink text-[10px]">✦</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="text-center">
                <button
                  onClick={handleStart}
                  className="group relative inline-flex items-center justify-center w-full md:w-auto overflow-hidden transition-all active:scale-95 cursor-pointer"
                >
                  <div className="absolute inset-0 bg-neon-pink opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />
                  <div className="relative px-16 py-5 bg-gradient-to-r from-neon-purple via-neon-pink to-neon-purple font-display text-lg font-bold tracking-[0.3em] text-white uppercase shadow-[0_0_30px_rgba(191,42,141,0.4)]">
                    {isDrill ? "START DRILL" : "START SESSION"}
                  </div>
                  <span className="absolute top-2 left-2 text-white/60 text-[10px]">✦</span>
                  <span className="absolute bottom-2 right-2 text-white/60 text-[10px]">✦</span>
                </button>
                <p className="mt-6 font-ui text-[10px] text-muted-foreground/40 tracking-[0.2em] uppercase">
                  {isDrill ? "Drill your weak spots" : "Verify parameters before entry"}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  if (shellState === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass rounded-2xl px-12 py-10 text-center"
        >
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-neon-cyan border-t-transparent" />
          <p className="mt-4 font-ui text-sm text-muted-foreground">
            Loading questions...
          </p>
        </motion.div>
      </div>
    )
  }

  if (shellState === "complete") {
    if (completionError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-background p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md space-y-6 text-center"
          >
            <h2 className="font-display text-3xl font-bold text-neon-cyan">
              Quiz Complete!
            </h2>
            <p className="font-body text-lg text-muted-foreground">
              {quiz.score}/{quiz.totalQuestions} correct (
              {quiz.scorePercentage}%)
            </p>
            <Button
              onClick={() => (window.location.href = "/dashboard")}
              variant="outline"
              className="font-ui"
            >
              Back to Dashboard
            </Button>
          </motion.div>
        </div>
      )
    }
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-neon-cyan border-t-transparent" />
          <p className="mt-4 font-ui text-sm text-muted-foreground">
            Saving your results...
          </p>
        </motion.div>
      </div>
    )
  }

  if (quiz.mode === "sim" && quiz.reviewingFlagged) {
    return (
      <div className="min-h-screen overflow-y-auto bg-background">
        <FlaggedReview
          onNavigateToQuestion={quiz.handleNavigateToFlagged}
          onSubmitTest={handleSimSubmit}
          isSubmitting={simSubmitting}
        />
      </div>
    )
  }

  if (!quiz.currentQuestion) return null

  const isFlaggedReviewQuestion =
    quiz.mode === "sim" &&
    quiz.allSimQuestionsAnswered &&
    !quiz.reviewingFlagged

  const sessionLabel = isDrill
    ? `DRILL: ${categoryName?.toUpperCase()}`
    : mode === "sim"
      ? "SIMULATED DMV TEST"
      : "PRACTICE SESSION"

  return (
    <div
      className={`min-h-screen overflow-y-auto relative ${
        mode === "sim" ? "ring-2 ring-inset ring-neon-purple/30" : ""
      }`}
    >
      <div className="pointer-events-none fixed top-0 right-0 h-64 w-64 rounded-full bg-neon-pink/[0.03] blur-[100px]" />

      {mode === "practice" && (
        <StreakCelebration streak={quiz.streak} show={showStreak} />
      )}
      <div className="mx-auto max-w-2xl p-4 sm:p-6">
        {/* Header bar */}
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2 font-ui text-[10px] tracking-[0.15em] text-muted-foreground/50 uppercase">
            {mode === "sim" && (
              <Badge className="shrink-0 bg-neon-purple/20 text-neon-purple border-neon-purple/30 font-ui text-[10px] font-bold uppercase tracking-widest">
                SIM
              </Badge>
            )}
            <span className="text-neon-pink">{sessionLabel}</span>
          </div>
          <button
            type="button"
            onClick={() => setQuitDialogOpen(true)}
            className="p-2 text-muted-foreground/50 transition-colors hover:text-neon-pink"
            aria-label="Quit quiz"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="mb-6">
          <QuizProgressBar
            current={
              quiz.allSimQuestionsAnswered
                ? quiz.totalQuestions - 1
                : quiz.currentIndex
            }
            total={quiz.totalQuestions}
            correctCount={quiz.score}
            streak={mode === "practice" ? quiz.streak : 0}
          />
        </div>

        <AnimatePresence>
          {answerRecorded && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mb-4 text-center font-ui text-sm text-muted-foreground"
            >
              Answer recorded
            </motion.div>
          )}
        </AnimatePresence>

        <QuestionCard
          question={quiz.currentQuestion}
          questionIndex={quiz.currentIndex}
          selectedAnswer={quiz.selectedAnswer}
          answerState={quiz.answerState}
          mode={quiz.mode}
          isLastQuestion={quiz.isLastQuestion}
          onSelect={quiz.handleSelect}
          onSubmit={handleSubmit}
          onNext={quiz.handleNext}
          isFlaggedReview={isFlaggedReviewQuestion}
          onSubmitFlagged={
            isFlaggedReviewQuestion
              ? () => quiz.handleSubmitFlaggedAnswer(quiz.currentIndex)
              : undefined
          }
          onReturnToReview={
            isFlaggedReviewQuestion ? quiz.handleReturnToReview : undefined
          }
        />
      </div>

      <QuitDialog
        open={quitDialogOpen}
        onClose={() => setQuitDialogOpen(false)}
        onQuit={quiz.handleQuit}
      />
    </div>
  )
}
