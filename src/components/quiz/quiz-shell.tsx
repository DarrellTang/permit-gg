"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "motion/react"
import { useQuiz } from "@/hooks/use-quiz"
import { QuizProgressBar } from "./progress-bar"
import { QuestionCard } from "./question-card"
import { QuitDialog } from "./quit-dialog"
import { QuestionCountConfig } from "./question-count-config"
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

  const quiz = useQuiz()

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
    quiz.handleSubmit()
  }, [quiz.handleSubmit])

  const onSubmitEffect = useCallback(() => {
    if (quiz.answerState !== "revealed") return
    if (quiz.mode !== "practice") return

    const lastAnswer = quiz.answers[quiz.answers.length - 1]
    if (!lastAnswer) return

    if (lastAnswer.isCorrect) {
      quiz.scheduleAutoAdvance()
    }
  }, [
    quiz.answerState,
    quiz.mode,
    quiz.answers,
    quiz.scheduleAutoAdvance,
  ])

  useEffect(() => {
    onSubmitEffect()
  }, [quiz.answerState, quiz.answers.length])

  useEffect(() => {
    if (quiz.isComplete && shellState === "active") {
      setShellState("complete")
      quiz.handleComplete()
    }
  }, [quiz.isComplete, shellState])

  useEffect(() => {
    if (mode === "sim" && shellState === "loading") {
      handleStart()
    }
  }, [])

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

  if (!quiz.currentQuestion) return null

  return (
    <div className="fixed inset-0 z-40 overflow-y-auto bg-gradient-to-b from-background via-background to-muted/30">
      <div className="mx-auto max-w-2xl p-4 sm:p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex-1">
            <QuizProgressBar
              current={quiz.currentIndex}
              total={quiz.totalQuestions}
              correctCount={quiz.score}
              streak={quiz.streak}
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
