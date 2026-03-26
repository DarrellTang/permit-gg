"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { SessionTrend } from "@/lib/types/analytics"

interface QuizHistoryListProps {
  sessions: SessionTrend[]
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSeconds = Math.floor(diffMs / 1000)
  const diffMinutes = Math.floor(diffSeconds / 60)
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMinutes < 1) return "Just now"
  if (diffMinutes < 60) return `${diffMinutes}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays === 1) return "Yesterday"
  if (diffDays < 7) return `${diffDays}d ago`
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

function getModeLabel(mode: string): string {
  switch (mode) {
    case "practice":
      return "Practice"
    case "sim":
      return "Sim Test"
    case "drill":
      return "Drill"
    default:
      return mode
  }
}

function getModeColor(mode: string): string {
  switch (mode) {
    case "practice":
      return "bg-neon-cyan/15 text-neon-cyan border-neon-cyan/25"
    case "sim":
      return "bg-neon-purple/15 text-neon-purple border-neon-purple/25"
    case "drill":
      return "bg-neon-pink/15 text-neon-pink border-neon-pink/25"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export function QuizHistoryList({ sessions }: QuizHistoryListProps) {
  const recent = sessions.slice(0, 10)

  if (recent.length === 0) return null

  return (
    <section>
      <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">
        Recent Quizzes
      </h2>
      <Card className="">
        <CardHeader className="pb-2">
          <CardTitle className="font-ui text-xs text-muted-foreground">
            Last {recent.length} sessions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {recent.map((session) => (
            <div
              key={session.sessionId}
              className="flex items-center justify-between rounded-lg px-3 py-2 transition-colors hover:bg-card/60"
            >
              <div className="flex items-center gap-3">
                <Badge
                  className={`${getModeColor(session.mode)} text-[10px] font-bold min-w-[60px] justify-center`}
                >
                  {getModeLabel(session.mode)}
                </Badge>
                <span className="font-ui text-sm font-medium text-foreground">
                  {session.score}/{session.total}
                </span>
                <span className="font-ui text-sm text-muted-foreground">
                  ({Math.round(session.percentage)}%)
                </span>
              </div>
              <span className="font-ui text-xs text-muted-foreground">
                {formatRelativeTime(session.startedAt)}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  )
}
