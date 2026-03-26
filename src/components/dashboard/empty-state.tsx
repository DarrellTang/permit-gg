"use client"

import Link from "next/link"

interface EmptyStateProps {
  variant: "unauthenticated" | "no-data"
}

export function EmptyState({ variant }: EmptyStateProps) {
  if (variant === "unauthenticated") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-16 w-16 text-neon-purple/40"
          >
            <circle cx="12" cy="8" r="5" />
            <path d="M20 21a8 8 0 0 0-16 0" />
          </svg>
        </div>
        <h2 className="font-display text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan">
          Sign in to track your progress
        </h2>
        <p className="mt-2 font-ui text-sm text-muted-foreground max-w-md">
          Create an account to save quiz results, track category mastery, and see your readiness score.
        </p>
        <Link
          href="/login"
          className="neon-glow mt-6 inline-block rounded-lg bg-neon-pink/20 px-6 py-3 font-ui text-sm font-semibold text-neon-pink transition-all hover:bg-neon-pink/30"
        >
          Sign In
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-16 w-16 text-neon-cyan/40"
        >
          <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
        </svg>
      </div>
      <h2 className="font-display text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan">
        No quizzes yet
      </h2>
      <p className="mt-2 font-ui text-sm text-muted-foreground max-w-md">
        Start practicing to track your progress! Your readiness score, category mastery, and trends will appear here.
      </p>
      <div className="mt-6 flex gap-3">
        <Link
          href="/practice"
          className="neon-glow inline-block rounded-lg bg-neon-cyan/20 px-5 py-3 font-ui text-sm font-semibold text-neon-cyan transition-all hover:bg-neon-cyan/30"
        >
          Start Practice
        </Link>
        <Link
          href="/simulated-test"
          className="neon-glow inline-block rounded-lg bg-neon-purple/20 px-5 py-3 font-ui text-sm font-semibold text-neon-purple transition-all hover:bg-neon-purple/30"
        >
          Try Sim Test
        </Link>
      </div>
    </div>
  )
}
