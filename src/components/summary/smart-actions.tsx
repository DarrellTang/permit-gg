"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { QuizMode } from "@/lib/types/quiz"

interface CategoryBreakdown {
  categoryName: string
  categorySlug: string
  correct: number
  total: number
  percentage: number
}

interface SmartActionsProps {
  mode: QuizMode
  categoryBreakdown: CategoryBreakdown[]
}

export function SmartActions({ mode, categoryBreakdown }: SmartActionsProps) {
  const weakest =
    categoryBreakdown.length > 0
      ? categoryBreakdown.reduce((min, cat) =>
          cat.percentage < min.percentage ? cat : min
        )
      : null

  const tryAgainHref = mode === "practice" ? "/practice" : "/simulated-test"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="space-y-3"
    >
      {weakest && (
        <Link href="/practice" data-category={weakest.categorySlug}>
          <div className="relative overflow-hidden rounded-xl border-2 border-neon-pink/40 bg-gradient-to-r from-neon-pink/5 to-neon-purple/5 p-4 transition-all hover:border-neon-pink/60 hover:shadow-lg hover:shadow-neon-pink/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-neon-pink"
                >
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
                <div>
                  <p className="font-display text-sm font-bold text-foreground">
                    Drill {weakest.categoryName}
                  </p>
                  <p className="font-ui text-xs text-muted-foreground">
                    Your weakest area ({weakest.percentage}%)
                  </p>
                </div>
              </div>
              <Badge className="bg-neon-pink/15 text-neon-pink border-neon-pink/25 text-[10px] font-bold">
                Recommended
              </Badge>
            </div>
          </div>
        </Link>
      )}

      <div className="grid grid-cols-2 gap-3">
        <Link href={tryAgainHref}>
          <Button
            variant="outline"
            size="lg"
            className="h-12 w-full font-ui text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1.5 h-4 w-4"
            >
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
              <path d="M16 16h5v5" />
            </svg>
            Try Again
          </Button>
        </Link>

        <Link href="/dashboard">
          <Button
            variant="outline"
            size="lg"
            className="h-12 w-full font-ui text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1.5 h-4 w-4"
            >
              <rect width="7" height="9" x="3" y="3" rx="1" />
              <rect width="7" height="5" x="14" y="3" rx="1" />
              <rect width="7" height="9" x="14" y="12" rx="1" />
              <rect width="7" height="5" x="3" y="16" rx="1" />
            </svg>
            Dashboard
          </Button>
        </Link>
      </div>
    </motion.div>
  )
}
