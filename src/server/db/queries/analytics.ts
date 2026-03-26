import type { SupabaseClient } from "@supabase/supabase-js"
import type {
  UserAnalytics,
  CategoryMastery,
  SessionTrend,
  CategoryTrend,
} from "@/lib/types/analytics"
import { computeReadinessScore, getReadinessMessage } from "@/lib/utils/readiness"

interface RpcCategoryRow {
  slug: string
  name: string
  weight: number
  correct: number
  total: number
  mastery_pct: number
  question_count: number
}

interface RpcSessionTrend {
  session_id: string
  mode: string
  score: number
  total: number
  started_at: string
  percentage: number
}

interface RpcCategoryTrend {
  category_slug: string
  sessions: { session_id: string; pct: number; date: string }[]
}

interface RpcResponse {
  categories: RpcCategoryRow[]
  session_trends: RpcSessionTrend[]
  category_trends: RpcCategoryTrend[]
  missed_question_ids: string[]
  total_sessions: number
}

export async function getUserAnalytics(
  supabase: SupabaseClient,
  userId: string
): Promise<UserAnalytics> {
  const { data, error } = await supabase.rpc("get_user_analytics", {
    p_user_id: userId,
  })

  if (error) throw error

  const raw = data as RpcResponse

  const trendMap = new Map<string, { sessionId: string; pct: number; date: string }[]>()
  for (const ct of raw.category_trends ?? []) {
    trendMap.set(
      ct.category_slug,
      (ct.sessions ?? []).map((s) => ({
        sessionId: s.session_id,
        pct: s.pct,
        date: s.date,
      }))
    )
  }

  const categories: CategoryMastery[] = (raw.categories ?? []).map((c) => {
    const trendData = trendMap.get(c.slug) ?? []

    let recentMastery: number | null = null
    if (trendData.length >= 1) {
      const recentPoints = trendData.slice(0, 3)
      recentMastery = Math.round(
        recentPoints.reduce((sum, p) => sum + p.pct, 0) / recentPoints.length
      )
    }

    return {
      slug: c.slug,
      name: c.name,
      weight: Number(c.weight),
      correct: c.correct,
      total: c.total,
      masteryPct: c.mastery_pct,
      recentMastery,
      trendData,
      questionCount: c.question_count,
    }
  })

  const sessionTrends: SessionTrend[] = (raw.session_trends ?? []).map((s) => ({
    sessionId: s.session_id,
    mode: s.mode,
    score: s.score,
    total: s.total,
    startedAt: s.started_at,
    percentage: s.percentage,
  }))

  const missedQuestionIds = raw.missed_question_ids ?? []
  const totalSessions = raw.total_sessions ?? 0

  const readinessScore = computeReadinessScore(categories)
  const readinessMessage = getReadinessMessage(readinessScore)

  return {
    categories,
    sessionTrends,
    missedQuestionIds,
    totalSessions,
    readinessScore,
    readinessMessage,
  }
}
