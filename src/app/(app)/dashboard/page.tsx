import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { fetchUserAnalytics } from "@/server/actions/analytics"
import { ReadinessGauge } from "@/components/dashboard/readiness-gauge"
import { CategoryGrid } from "@/components/dashboard/category-grid"
import { QuizHistoryList } from "@/components/dashboard/quiz-history-list"
import { EmptyState } from "@/components/dashboard/empty-state"

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return (
      <div className="mx-auto max-w-5xl space-y-8 p-6 lg:p-8">
        <EmptyState variant="unauthenticated" />
      </div>
    )
  }

  let displayName = "there"
  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name")
    .eq("id", user.id)
    .single()

  displayName = profile?.display_name ?? user.email?.split("@")[0] ?? "there"

  const analytics = await fetchUserAnalytics()

  if (!analytics || analytics.totalSessions === 0) {
    return (
      <div className="mx-auto max-w-5xl space-y-8 p-6 lg:p-8">
        <div className="space-y-2">
          <h1 className="font-display text-3xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan lg:text-4xl">
            Welcome back, {displayName}
          </h1>
          <p className="font-ui text-xs text-neon-lavender/60 tracking-widest mt-1">&#10022; Your journey continues</p>
          <p className="font-ui text-base text-muted-foreground">
            Your CA permit test prep starts here
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/practice"
            className="neon-glow inline-block rounded-lg bg-neon-cyan/20 px-4 py-2 font-ui text-sm font-semibold text-neon-cyan transition-all hover:bg-neon-cyan/30"
          >
            Start Practice
          </Link>
          <Link
            href="/simulated-test"
            className="neon-glow inline-block rounded-lg bg-neon-purple/20 px-4 py-2 font-ui text-sm font-semibold text-neon-purple transition-all hover:bg-neon-purple/30"
          >
            Try Sim Test
          </Link>
        </div>

        <EmptyState variant="no-data" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-6 lg:p-8">
      <div className="space-y-2">
        <h1 className="font-display text-3xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan lg:text-4xl">
          Welcome back, {displayName}
        </h1>
        <p className="font-ui text-xs text-neon-lavender/60 tracking-widest mt-1">&#10022; Your journey continues</p>
        <p className="font-ui text-base text-muted-foreground">
          Your CA permit test prep starts here
        </p>
      </div>

      <div className="flex gap-3">
        <Link
          href="/practice"
          className="neon-glow inline-block rounded-lg bg-neon-cyan/20 px-4 py-2 font-ui text-sm font-semibold text-neon-cyan transition-all hover:bg-neon-cyan/30"
        >
          Quick Practice
        </Link>
        <Link
          href="/simulated-test"
          className="neon-glow inline-block rounded-lg bg-neon-purple/20 px-4 py-2 font-ui text-sm font-semibold text-neon-purple transition-all hover:bg-neon-purple/30"
        >
          Sim Test
        </Link>
      </div>

      <ReadinessGauge
        score={analytics.readinessScore}
        message={analytics.readinessMessage}
      />

      <CategoryGrid categories={analytics.categories} />

      <QuizHistoryList sessions={analytics.sessionTrends} />
    </div>
  )
}
