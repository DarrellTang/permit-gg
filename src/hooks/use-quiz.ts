"use client"

import { useCallback, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useQuizStore } from "@/stores/quiz-store"
import { fetchQuestions, saveQuizResults } from "@/server/actions/quiz"
import { markFreeQuizUsed } from "@/server/actions/auth"
import { analytics } from "@/lib/posthog/events"
import { AUTO_ADVANCE_DELAY_MS } from "@/lib/constants/quiz-config"
import type { QuizMode } from "@/lib/types/quiz"

export function useQuiz() {
  const router = useRouter()
  const autoAdvanceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const categorySlugRef = useRef<string | undefined>(undefined)

  const mode = useQuizStore((s) => s.mode)
  const questions = useQuizStore((s) => s.questions)
  const totalQuestions = useQuizStore((s) => s.totalQuestions)
  const currentIndex = useQuizStore((s) => s.currentIndex)
  const selectedAnswer = useQuizStore((s) => s.selectedAnswer)
  const answerState = useQuizStore((s) => s.answerState)
  const answers = useQuizStore((s) => s.answers)
  const score = useQuizStore((s) => s.score)
  const streak = useQuizStore((s) => s.streak)
  const bestStreak = useQuizStore((s) => s.bestStreak)
  const isComplete = useQuizStore((s) => s.isComplete)
  const isMuted = useQuizStore((s) => s.isMuted)
  const sessionStartTime = useQuizStore((s) => s.sessionStartTime)
  const flaggedIndices = useQuizStore((s) => s.flaggedIndices)
  const reviewingFlagged = useQuizStore((s) => s.reviewingFlagged)

  const initSession = useQuizStore((s) => s.initSession)
  const selectAnswer = useQuizStore((s) => s.selectAnswer)
  const submitAnswer = useQuizStore((s) => s.submitAnswer)
  const nextQuestion = useQuizStore((s) => s.nextQuestion)
  const completeQuiz = useQuizStore((s) => s.completeQuiz)
  const quitQuiz = useQuizStore((s) => s.quitQuiz)
  const toggleMute = useQuizStore((s) => s.toggleMute)
  const reset = useQuizStore((s) => s.reset)
  const startFlaggedReview = useQuizStore((s) => s.startFlaggedReview)
  const navigateToFlagged = useQuizStore((s) => s.navigateToFlagged)
  const submitFlaggedAnswer = useQuizStore((s) => s.submitFlaggedAnswer)
  const returnToReview = useQuizStore((s) => s.returnToReview)

  const currentQuestion =
    questions.length > 0 && currentIndex < questions.length
      ? questions[currentIndex]
      : null

  const isLastQuestion = currentIndex >= totalQuestions - 1

  const allSimQuestionsAnswered =
    mode === "sim" && answers.length >= totalQuestions

  const progress =
    totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0

  const scorePercentage =
    totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0

  useEffect(() => {
    return () => {
      if (autoAdvanceRef.current) {
        clearTimeout(autoAdvanceRef.current)
      }
    }
  }, [])

  const startQuiz = useCallback(
    async (quizMode: QuizMode, questionCount?: number, categorySlug?: string) => {
      categorySlugRef.current = categorySlug
      const fetchedQuestions = await fetchQuestions(quizMode, questionCount, categorySlug)
      initSession(fetchedQuestions, quizMode)

      if (quizMode === "sim") {
        analytics.simTestStarted()
      } else if (categorySlug) {
        analytics.categoryDrillStarted(categorySlug)
      } else {
        analytics.quizStarted(quizMode, fetchedQuestions.length)
      }
    },
    [initSession]
  )

  const handleSelect = useCallback(
    (answer: string) => {
      selectAnswer(answer)
    },
    [selectAnswer]
  )

  const handleSubmit = useCallback(() => {
    submitAnswer()

    const state = useQuizStore.getState()
    const latestAnswer = state.answers[state.answers.length - 1]
    const question = state.questions[state.currentIndex - (state.mode === "sim" ? 1 : 0)]

    if (latestAnswer && question) {
      analytics.answerSubmitted(
        latestAnswer.isCorrect,
        question.categorySlug,
        state.streak
      )
    }

    if (state.streak > 0 && state.streak % 5 === 0) {
      analytics.streakAchieved(state.streak)
    }
  }, [submitAnswer])

  const scheduleAutoAdvance = useCallback(() => {
    if (autoAdvanceRef.current) {
      clearTimeout(autoAdvanceRef.current)
    }
    autoAdvanceRef.current = setTimeout(() => {
      nextQuestion()
      autoAdvanceRef.current = null
    }, AUTO_ADVANCE_DELAY_MS)
  }, [nextQuestion])

  const handleNext = useCallback(() => {
    if (autoAdvanceRef.current) {
      clearTimeout(autoAdvanceRef.current)
      autoAdvanceRef.current = null
    }
    nextQuestion()
  }, [nextQuestion])

  const handleQuit = useCallback(async () => {
    const startedAt = new Date(sessionStartTime).toISOString()

    analytics.quizQuit(mode, answers.length, score)

    await saveQuizResults({
      mode,
      totalQuestions,
      answers,
      startedAt,
      completedAt: null,
      isComplete: false,
      categorySlug: categorySlugRef.current,
    })

    quitQuiz()
    router.push("/dashboard")
  }, [mode, totalQuestions, answers, sessionStartTime, score, quitQuiz, router])

  const handleComplete = useCallback(async () => {
    const startedAt = new Date(sessionStartTime).toISOString()
    const completedAt = new Date().toISOString()
    const totalTimeMs = Date.now() - sessionStartTime

    completeQuiz()

    const result = await saveQuizResults({
      mode,
      totalQuestions,
      answers,
      startedAt,
      completedAt,
      isComplete: true,
      categorySlug: categorySlugRef.current,
    })

    const finalPercentage =
      totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0

    analytics.quizCompleted(mode, score, finalPercentage, totalTimeMs)

    if (mode === "sim" && score >= 38) {
      analytics.simTestPassed(score, finalPercentage)
    }

    return result.sessionId
  }, [mode, totalQuestions, answers, sessionStartTime, score, completeQuiz])

  const handlePracticeComplete = useCallback(async () => {
    try {
      localStorage.setItem("permit_free_quiz_used", "true")
      await markFreeQuizUsed()
    } catch {
      // Cookie setting may fail in some contexts, localStorage is the fallback
    }

    let sessionId: string | undefined
    try {
      sessionId = await handleComplete()
    } catch {
      // Save failed (likely RLS issue for anon user) -- navigate without session ID
      // Summary page will fall back to Zustand store data
      completeQuiz()
    }

    const catParam = categorySlugRef.current
      ? `&category=${categorySlugRef.current}`
      : ""

    if (sessionId) {
      router.push(`/practice/summary?session=${sessionId}${catParam}`)
    } else {
      router.push(`/practice/summary${catParam ? `?${catParam.slice(1)}` : ""}`)
    }

    return sessionId
  }, [handleComplete, router, completeQuiz])

  const handleSimComplete = useCallback(async () => {
    const sessionId = await handleComplete()

    if (mode === "sim" && sessionId) {
      router.push(`/simulated-test/summary?session=${sessionId}`)
    }

    return sessionId
  }, [handleComplete, mode, router])

  const handleNavigateToFlagged = useCallback(
    (index: number) => {
      navigateToFlagged(index)
    },
    [navigateToFlagged]
  )

  const handleSubmitFlaggedAnswer = useCallback(
    (index: number) => {
      submitFlaggedAnswer(index)
    },
    [submitFlaggedAnswer]
  )

  const handleReturnToReview = useCallback(() => {
    returnToReview()
  }, [returnToReview])

  const handleStartFlaggedReview = useCallback(() => {
    startFlaggedReview()
  }, [startFlaggedReview])

  return {
    mode,
    currentQuestion,
    currentIndex,
    totalQuestions,
    selectedAnswer,
    answerState,
    score,
    streak,
    bestStreak,
    progress,
    scorePercentage,
    isComplete,
    isLastQuestion,
    isMuted,
    answers,
    flaggedIndices,
    reviewingFlagged,
    allSimQuestionsAnswered,

    startQuiz,
    handleSelect,
    handleSubmit,
    handleNext,
    handleQuit,
    handleComplete,
    handlePracticeComplete,
    handleSimComplete,
    scheduleAutoAdvance,
    toggleMute,
    reset,
    handleStartFlaggedReview,
    handleNavigateToFlagged,
    handleSubmitFlaggedAnswer,
    handleReturnToReview,
  }
}
