export interface CategoryMastery {
  slug: string
  name: string
  weight: number
  correct: number
  total: number
  masteryPct: number
  recentMastery: number | null
  trendData: { sessionId: string; pct: number; date: string }[]
  questionCount: number
}

export interface SessionTrend {
  sessionId: string
  mode: string
  score: number
  total: number
  startedAt: string
  percentage: number
}

export interface CategoryTrend {
  categorySlug: string
  sessions: { sessionId: string; pct: number; date: string }[]
}

export interface UserAnalytics {
  categories: CategoryMastery[]
  sessionTrends: SessionTrend[]
  missedQuestionIds: string[]
  totalSessions: number
  readinessScore: number
  readinessMessage: string
}
