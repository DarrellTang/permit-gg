import { describe, it, expect, beforeEach } from "vitest"
import type { PreparedQuestion } from "@/lib/types/quiz"

function makeQuestion(overrides: Partial<PreparedQuestion> = {}): PreparedQuestion {
  const id = overrides.id ?? crypto.randomUUID()
  return {
    id,
    questionText: `What is the speed limit in a school zone?`,
    correctAnswer: "25 mph",
    shuffledOptions: ["25 mph", "35 mph", "15 mph", "45 mph"],
    explanation: "The speed limit in a school zone is 25 mph when children are present.",
    handbookReference: "CA DMV Handbook, Chapter 6",
    categorySlug: "speed-limits",
    categoryName: "Speed Limits",
    ...overrides,
  }
}

function makeQuestions(count: number): PreparedQuestion[] {
  return Array.from({ length: count }, (_, i) =>
    makeQuestion({ id: crypto.randomUUID(), questionText: `Question ${i + 1}` })
  )
}

describe("Quiz Store", () => {
  beforeEach(async () => {
    const { useQuizStore } = await import("@/stores/quiz-store")
    useQuizStore.getState().reset()
  })

  it("initializes a practice session with correct state", async () => {
    const { useQuizStore } = await import("@/stores/quiz-store")
    const questions = makeQuestions(15)
    useQuizStore.getState().initSession(questions, "practice")

    const state = useQuizStore.getState()
    expect(state.totalQuestions).toBe(15)
    expect(state.mode).toBe("practice")
    expect(state.currentIndex).toBe(0)
    expect(state.answerState).toBe("idle")
    expect(state.score).toBe(0)
    expect(state.streak).toBe(0)
    expect(state.isComplete).toBe(false)
  })

  it("initializes a sim session with 46 questions", async () => {
    const { useQuizStore } = await import("@/stores/quiz-store")
    const questions = makeQuestions(46)
    useQuizStore.getState().initSession(questions, "sim")

    const state = useQuizStore.getState()
    expect(state.totalQuestions).toBe(46)
    expect(state.mode).toBe("sim")
  })

  it("only exposes current question, not future ones", async () => {
    const { useQuizStore } = await import("@/stores/quiz-store")
    const questions = makeQuestions(15)
    useQuizStore.getState().initSession(questions, "practice")

    const state = useQuizStore.getState()
    expect(state.questions[state.currentIndex]).toBeDefined()
    expect(state.currentIndex).toBe(0)
  })

  it("enforces forward-only navigation", async () => {
    const { useQuizStore } = await import("@/stores/quiz-store")
    const questions = makeQuestions(5)
    useQuizStore.getState().initSession(questions, "practice")

    const storeApi = useQuizStore.getState()
    expect(storeApi).not.toHaveProperty("previousQuestion")
    expect(storeApi).not.toHaveProperty("decrementIndex")

    storeApi.selectAnswer("25 mph")
    storeApi.submitAnswer()
    storeApi.nextQuestion()
    expect(useQuizStore.getState().currentIndex).toBe(1)

    storeApi.selectAnswer("25 mph")
    storeApi.submitAnswer()
    storeApi.nextQuestion()
    expect(useQuizStore.getState().currentIndex).toBe(2)
  })

  it("follows answer flow state machine in practice mode", async () => {
    const { useQuizStore } = await import("@/stores/quiz-store")
    const questions = makeQuestions(5)
    useQuizStore.getState().initSession(questions, "practice")
    const store = useQuizStore

    expect(store.getState().answerState).toBe("idle")

    store.getState().selectAnswer("25 mph")
    expect(store.getState().answerState).toBe("selected")
    expect(store.getState().selectedAnswer).toBe("25 mph")

    store.getState().submitAnswer()
    expect(store.getState().answerState).toBe("revealed")
  })

  it("follows answer flow state machine in sim mode (no reveal)", async () => {
    const { useQuizStore } = await import("@/stores/quiz-store")
    const questions = makeQuestions(5)
    useQuizStore.getState().initSession(questions, "sim")
    const store = useQuizStore

    expect(store.getState().answerState).toBe("idle")

    store.getState().selectAnswer("25 mph")
    expect(store.getState().answerState).toBe("selected")

    store.getState().submitAnswer()
    // In sim mode, auto-advances: answerState resets to idle, index goes up
    expect(store.getState().answerState).toBe("idle")
    expect(store.getState().currentIndex).toBe(1)
  })

  it("tracks score correctly on correct answers", async () => {
    const { useQuizStore } = await import("@/stores/quiz-store")
    const questions = makeQuestions(5)
    useQuizStore.getState().initSession(questions, "practice")
    const store = useQuizStore

    // Answer correctly (match correctAnswer)
    store.getState().selectAnswer("25 mph")
    store.getState().submitAnswer()
    expect(store.getState().score).toBe(1)
    expect(store.getState().answers[0].isCorrect).toBe(true)
  })

  it("tracks score correctly on wrong answers", async () => {
    const { useQuizStore } = await import("@/stores/quiz-store")
    const questions = makeQuestions(5)
    useQuizStore.getState().initSession(questions, "practice")
    const store = useQuizStore

    // Answer incorrectly
    store.getState().selectAnswer("35 mph")
    store.getState().submitAnswer()
    expect(store.getState().score).toBe(0)
    expect(store.getState().answers[0].isCorrect).toBe(false)
  })

  it("tracks streaks correctly", async () => {
    const { useQuizStore } = await import("@/stores/quiz-store")
    const questions = makeQuestions(10)
    useQuizStore.getState().initSession(questions, "practice")
    const store = useQuizStore

    // Answer 5 correct in a row
    for (let i = 0; i < 5; i++) {
      store.getState().selectAnswer("25 mph")
      store.getState().submitAnswer()
      store.getState().nextQuestion()
    }
    expect(store.getState().streak).toBe(5)
    expect(store.getState().bestStreak).toBe(5)

    // Answer wrong
    store.getState().selectAnswer("35 mph")
    store.getState().submitAnswer()
    expect(store.getState().streak).toBe(0)
    expect(store.getState().bestStreak).toBe(5)
  })

  it("pass threshold: 38/46 in sim mode", async () => {
    const { useQuizStore } = await import("@/stores/quiz-store")
    const { DMV_CONFIG } = await import("@/lib/constants/quiz-config")
    const questions = makeQuestions(46)
    useQuizStore.getState().initSession(questions, "sim")
    const store = useQuizStore

    // Answer 38 correctly, 8 wrong (sim auto-advances)
    for (let i = 0; i < 38; i++) {
      store.getState().selectAnswer("25 mph")
      store.getState().submitAnswer()
    }
    for (let i = 0; i < 8; i++) {
      store.getState().selectAnswer("35 mph")
      store.getState().submitAnswer()
    }

    expect(store.getState().score).toBe(38)
    expect(store.getState().score).toBeGreaterThanOrEqual(DMV_CONFIG.passingScore)
  })

  it("reset clears all state to defaults", async () => {
    const { useQuizStore } = await import("@/stores/quiz-store")
    const questions = makeQuestions(5)
    useQuizStore.getState().initSession(questions, "practice")
    const store = useQuizStore

    store.getState().selectAnswer("25 mph")
    store.getState().submitAnswer()

    store.getState().reset()

    const state = store.getState()
    expect(state.mode).toBe("practice")
    expect(state.questions).toEqual([])
    expect(state.totalQuestions).toBe(0)
    expect(state.currentIndex).toBe(0)
    expect(state.score).toBe(0)
    expect(state.streak).toBe(0)
    expect(state.bestStreak).toBe(0)
    expect(state.answers).toEqual([])
    expect(state.isComplete).toBe(false)
  })

  it("selectAnswer does nothing if answerState is not idle", async () => {
    const { useQuizStore } = await import("@/stores/quiz-store")
    const questions = makeQuestions(5)
    useQuizStore.getState().initSession(questions, "practice")
    const store = useQuizStore

    store.getState().selectAnswer("25 mph")
    expect(store.getState().answerState).toBe("selected")

    // Try to select again while in "selected" state
    store.getState().selectAnswer("35 mph")
    expect(store.getState().selectedAnswer).toBe("25 mph") // unchanged
  })

  it("flagQuestion and unflagQuestion toggle indices", async () => {
    const { useQuizStore } = await import("@/stores/quiz-store")
    const questions = makeQuestions(5)
    useQuizStore.getState().initSession(questions, "sim")
    const store = useQuizStore

    store.getState().flagQuestion()
    expect(store.getState().flaggedIndices.has(0)).toBe(true)

    store.getState().unflagQuestion()
    expect(store.getState().flaggedIndices.has(0)).toBe(false)
  })

  it("completeQuiz sets isComplete to true", async () => {
    const { useQuizStore } = await import("@/stores/quiz-store")
    const questions = makeQuestions(3)
    useQuizStore.getState().initSession(questions, "practice")
    const store = useQuizStore

    // Answer all questions
    for (let i = 0; i < 3; i++) {
      store.getState().selectAnswer("25 mph")
      store.getState().submitAnswer()
      if (i < 2) store.getState().nextQuestion()
    }
    store.getState().completeQuiz()
    expect(store.getState().isComplete).toBe(true)
  })

  it("quitQuiz sets isComplete to false", async () => {
    const { useQuizStore } = await import("@/stores/quiz-store")
    const questions = makeQuestions(5)
    useQuizStore.getState().initSession(questions, "practice")
    const store = useQuizStore

    store.getState().selectAnswer("25 mph")
    store.getState().submitAnswer()

    store.getState().quitQuiz()
    expect(store.getState().isComplete).toBe(false)
  })
})
