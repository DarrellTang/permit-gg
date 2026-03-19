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
import type { QuizMode } from "@/lib/types/quiz"

type ShellState = "pre-start" | "loading" | "active" | "complete"

interface QuizShellProps {
  mode: QuizMode
  questionCount?: number
}

export function QuizShell({ mode }: QuizShellProps) {
  const [shellState, setShellState] = useState<ShellState>(
    mode === "practice" ? "pre-start" : "loading"
  )
  const [count, setCount] = useState<number>(PRACTICE_DEFAULTS.defaultCount)
  const [quitDialogOpen, setQuitDialogOpen] = useState(false)
  const [showStreak, setShowStreak] = useState(false)
  const [simSubmitting, setSimSubmitting] = useState(false)
  const [answerRecorded, setAnswerRecorded] = useState(false)
  const prevAnswerCountRef = useRef(0)

  const quiz = useQuiz()
  const sounds = useQuizSounds()

  const handleStart = useCallback(async () => {
    setShellState("loading")
    try {
      await quiz.startQuiz(mode, mode === "practice" ? count : undefined)
      setShellState("active")
    } catch {
      setShellState("pre-start")
    }
  }, [mode, count, quiz.startQuiz])

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
      quiz.handleComplete()
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

  if (shellState === "pre-start") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background via-background to-muted/30 p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-8 text-center"
        >
          <div>
            <h1 className="font-display text-3xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan">
              Practice Quiz
            </h1>
            <p className="mt-2 font-body text-muted-foreground">
              Mixed topics from the CA DMV handbook
            </p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <span className="font-display text-5xl font-bold text-neon-cyan">
              {count}
            </span>
            <span className="font-body text-lg text-muted-foreground">
              questions
            </span>
            <QuestionCountConfig count={count} onChange={setCount} />
          </div>

          <Button
            onClick={handleStart}
            className="h-12 w-full bg-gradient-to-r from-neon-purple to-neon-cyan font-ui text-base font-bold text-white shadow-lg shadow-neon-purple/20 transition-all hover:shadow-neon-cyan/30"
          >
            Start Practice
          </Button>
        </motion.div>
      </div>
    )
  }

  if (shellState === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background via-background to-muted/30">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
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
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background via-background to-muted/30 p-6">
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

  if (quiz.mode === "sim" && quiz.reviewingFlagged) {
    return (
      <div className="fixed inset-0 z-40 overflow-y-auto bg-gradient-to-b from-background via-background to-muted/30">
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

  return (
    <div
      className={`fixed inset-0 z-40 overflow-y-auto bg-gradient-to-b from-background via-background to-muted/30 ${
        mode === "sim" ? "ring-2 ring-inset ring-neon-purple/30" : ""
      }`}
    >
      {mode === "practice" && (
        <StreakCelebration streak={quiz.streak} show={showStreak} />
      )}
      <div className="mx-auto max-w-2xl p-4 sm:p-6">
        <div className="mb-6 flex items-center gap-3">
          {mode === "sim" && (
            <Badge className="shrink-0 bg-neon-purple/20 text-neon-purple border-neon-purple/30 font-ui text-[10px] font-bold uppercase tracking-widest">
              SIM
            </Badge>
          )}
          <div className="flex-1">
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
          <button
            type="button"
            onClick={() => setQuitDialogOpen(true)}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Quit quiz"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
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
