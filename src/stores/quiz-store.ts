import { create } from "zustand"
import type {
  QuizMode,
  AnswerState,
  QuizAnswer,
  PreparedQuestion,
} from "@/lib/types/quiz"

interface QuizState {
  mode: QuizMode
  questions: PreparedQuestion[]
  totalQuestions: number

  currentIndex: number
  selectedAnswer: string | null
  answerState: AnswerState
  questionStartTime: number

  answers: QuizAnswer[]
  score: number
  streak: number
  bestStreak: number

  flaggedIndices: Set<number>
  reviewingFlagged: boolean

  sessionStartTime: number
  isComplete: boolean
  isMuted: boolean

  initSession: (questions: PreparedQuestion[], mode: QuizMode) => void
  selectAnswer: (answer: string) => void
  submitAnswer: () => void
  nextQuestion: () => void
  flagQuestion: () => void
  unflagQuestion: () => void
  startFlaggedReview: () => void
  completeQuiz: () => void
  quitQuiz: () => void
  toggleMute: () => void
  reset: () => void
}

const initialState = {
  mode: "practice" as QuizMode,
  questions: [] as PreparedQuestion[],
  totalQuestions: 0,
  currentIndex: 0,
  selectedAnswer: null as string | null,
  answerState: "idle" as AnswerState,
  questionStartTime: 0,
  answers: [] as QuizAnswer[],
  score: 0,
  streak: 0,
  bestStreak: 0,
  flaggedIndices: new Set<number>(),
  reviewingFlagged: false,
  sessionStartTime: 0,
  isComplete: false,
  isMuted: false,
}

export const useQuizStore = create<QuizState>()((set, get) => ({
  ...initialState,

  initSession: (questions, mode) => {
    get().reset()
    set({
      questions,
      mode,
      totalQuestions: questions.length,
      sessionStartTime: Date.now(),
      questionStartTime: Date.now(),
    })
  },

  selectAnswer: (answer) => {
    const { answerState } = get()
    if (answerState !== "idle") return
    set({ selectedAnswer: answer, answerState: "selected" })
  },

  submitAnswer: () => {
    const { answerState, selectedAnswer, questions, currentIndex, questionStartTime, mode, score, streak, bestStreak } = get()
    if (answerState !== "selected" || selectedAnswer === null) return

    const currentQuestion = questions[currentIndex]
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer
    const timeTakenMs = Date.now() - questionStartTime

    const answer: QuizAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect,
      timeTakenMs,
    }

    const newStreak = isCorrect ? streak + 1 : 0
    const newBestStreak = Math.max(bestStreak, newStreak)
    const newScore = isCorrect ? score + 1 : score

    if (mode === "sim") {
      const nextIndex = currentIndex + 1
      const isLast = nextIndex >= questions.length

      if (isLast) {
        set((state) => ({
          answers: [...state.answers, answer],
          score: newScore,
          streak: newStreak,
          bestStreak: newBestStreak,
          answerState: "idle",
          selectedAnswer: null,
          currentIndex: nextIndex,
        }))
      } else {
        set((state) => ({
          answers: [...state.answers, answer],
          score: newScore,
          streak: newStreak,
          bestStreak: newBestStreak,
          answerState: "idle",
          selectedAnswer: null,
          currentIndex: nextIndex,
          questionStartTime: Date.now(),
        }))
      }
    } else {
      set((state) => ({
        answers: [...state.answers, answer],
        score: newScore,
        streak: newStreak,
        bestStreak: newBestStreak,
        answerState: "revealed",
      }))
    }
  },

  nextQuestion: () => {
    const { currentIndex, totalQuestions } = get()
    const nextIndex = currentIndex + 1

    if (nextIndex >= totalQuestions) {
      get().completeQuiz()
      return
    }

    set({
      currentIndex: nextIndex,
      selectedAnswer: null,
      answerState: "idle",
      questionStartTime: Date.now(),
    })
  },

  flagQuestion: () => {
    set((state) => {
      const newFlagged = new Set(state.flaggedIndices)
      newFlagged.add(state.currentIndex)
      return { flaggedIndices: newFlagged }
    })
  },

  unflagQuestion: () => {
    set((state) => {
      const newFlagged = new Set(state.flaggedIndices)
      newFlagged.delete(state.currentIndex)
      return { flaggedIndices: newFlagged }
    })
  },

  startFlaggedReview: () => {
    set({ reviewingFlagged: true })
  },

  completeQuiz: () => {
    const { sessionStartTime } = get()
    set({
      isComplete: true,
    })
  },

  quitQuiz: () => {
    set({ isComplete: false })
  },

  toggleMute: () => {
    set((state) => ({ isMuted: !state.isMuted }))
  },

  reset: () => {
    set({
      ...initialState,
      flaggedIndices: new Set<number>(),
    })
  },
}))
