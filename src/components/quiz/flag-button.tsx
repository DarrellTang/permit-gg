"use client"

import { useQuizStore } from "@/stores/quiz-store"

export function FlagButton() {
  const currentIndex = useQuizStore((s) => s.currentIndex)
  const flaggedIndices = useQuizStore((s) => s.flaggedIndices)
  const flagQuestion = useQuizStore((s) => s.flagQuestion)
  const unflagQuestion = useQuizStore((s) => s.unflagQuestion)

  const isFlagged = flaggedIndices.has(currentIndex)

  const handleToggle = () => {
    if (isFlagged) {
      unflagQuestion()
    } else {
      flagQuestion()
    }
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="rounded-md p-1.5 transition-colors hover:bg-muted"
      aria-label={
        isFlagged ? "Unflag this question" : "Flag this question for review"
      }
    >
      {isFlagged ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4 text-amber-400"
        >
          <path d="M5 2v20l1-1V14l1-.5c.6-.3 1.5-.5 3-.5s2.5.5 4 1 2.5 1 4 1 2-.2 2.5-.5l.5-.3V3.7l-.5.3c-.5.3-1.5.5-2.5.5s-2.5-.5-4-1-2.5-1-4-1c-1.5 0-2.4.2-3 .5L6 3.5V2H5z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
          <line x1="4" y1="22" x2="4" y2="15" />
        </svg>
      )}
    </button>
  )
}
