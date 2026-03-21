import posthog from "posthog-js"

function capture(event: string, properties?: Record<string, unknown>) {
  if (typeof window !== "undefined") {
    posthog.capture(event, properties)
  }
}

export const analytics = {
  quizStarted: (mode: string, questionCount: number) =>
    capture("quiz_started", { mode, question_count: questionCount }),

  quizCompleted: (
    mode: string,
    score: number,
    percentage: number,
    timeMs: number
  ) =>
    capture("quiz_completed", {
      mode,
      score,
      percentage,
      time_ms: timeMs,
    }),

  quizQuit: (mode: string, questionsAnswered: number, score: number) =>
    capture("quiz_quit", {
      mode,
      questions_answered: questionsAnswered,
      score,
    }),

  simTestStarted: () => capture("sim_test_started"),

  simTestPassed: (score: number, percentage: number) =>
    capture("sim_test_passed", { score, percentage }),

  answerSubmitted: (
    isCorrect: boolean,
    categorySlug: string,
    streak: number
  ) =>
    capture("answer_submitted", {
      is_correct: isCorrect,
      category_slug: categorySlug,
      streak,
    }),

  categoryDrillStarted: (categorySlug: string) =>
    capture("category_drill_started", { category_slug: categorySlug }),

  streakAchieved: (streakCount: number) =>
    capture("streak_achieved", { streak_count: streakCount }),

  wrongAnswerReviewed: () => capture("wrong_answer_reviewed"),

  signupCompleted: (provider: "google" | "discord" | "email") =>
    capture("signup_completed", { provider }),

  loginCompleted: (provider: "google" | "discord" | "email") =>
    capture("login_completed", { provider }),

  signupPromptClicked: () => capture("signup_prompt_clicked"),
}
