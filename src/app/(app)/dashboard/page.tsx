import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { fetchUserAnalytics } from "@/server/actions/analytics"
import { ReadinessGauge } from "@/components/dashboard/readiness-gauge"
import { CategoryGrid } from "@/components/dashboard/category-grid"
import { QuizHistoryList } from "@/components/dashboard/quiz-history-list"
import { EmptyState } from "@/components/dashboard/empty-state"
import { Card } from "@/components/ui/card"

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
        <Card className="relative overflow-hidden border-l-4 border-neon-pink/50 p-6">
          <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-neon-cyan/[0.06] blur-[80px]" />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-center">
            <div className="space-y-4">
              <div className="space-y-2">
                <h1 className="font-display text-3xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan lg:text-4xl">
                  Welcome back, {displayName}
                </h1>
                <p className="font-ui text-xs text-neon-lavender/60 tracking-widest mt-1">&#10022; YOUR QUEST CONTINUES</p>
                <p className="font-ui text-base text-muted-foreground">
                  Start studying to unlock your readiness score. 15 mins a day is all it takes.
                </p>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/practice"
                  className="bloom-secondary neon-glow inline-block bg-neon-cyan/20 px-6 py-3 font-display text-sm font-bold tracking-wider text-neon-cyan transition-all hover:bg-neon-cyan/30 hover:scale-105 active:scale-95"
                >
                  START PRACTICE
                </Link>
                <Link
                  href="/simulated-test"
                  className="bloom-primary neon-glow inline-block border border-neon-purple px-6 py-3 font-display text-sm font-bold tracking-wider text-neon-purple transition-all hover:bg-neon-purple/10 hover:scale-105 active:scale-95"
                >
                  RUN SIMULATION
                </Link>
              </div>
            </div>
            <ReadinessGauge score={0} message="" />
          </div>
        </Card>

        <EmptyState variant="no-data" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-6 lg:p-8">
      <Card className="relative overflow-hidden border-l-4 border-neon-pink/50 p-6">
        <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-neon-cyan/[0.06] blur-[80px]" />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-center">
          <div className="space-y-4">
            <div className="space-y-2">
              <h1 className="font-display text-3xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan lg:text-4xl">
                Welcome back, {displayName}
              </h1>
              <p className="font-ui text-xs text-neon-lavender/60 tracking-widest mt-1">&#10022; SYNC STATUS: ACTIVE</p>
              <p className="font-ui text-base text-muted-foreground">
                Your readiness is building. Keep drilling your weak spots to reach 83%.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/practice"
                className="bloom-secondary neon-glow inline-block bg-neon-cyan/20 px-6 py-3 font-display text-sm font-bold tracking-wider text-neon-cyan transition-all hover:bg-neon-cyan/30 hover:scale-105 active:scale-95"
              >
                QUICK DRILL
              </Link>
              <Link
                href="/simulated-test"
                className="bloom-primary neon-glow inline-block border border-neon-purple px-6 py-3 font-display text-sm font-bold tracking-wider text-neon-purple transition-all hover:bg-neon-purple/10 hover:scale-105 active:scale-95"
              >
                RUN SIMULATION
              </Link>
            </div>
          </div>
          <ReadinessGauge
            score={analytics.readinessScore}
            message={analytics.readinessMessage}
          />
        </div>
      </Card>

      <CategoryGrid categories={analytics.categories} />

      <QuizHistoryList sessions={analytics.sessionTrends} />
    </div>
  )
}
