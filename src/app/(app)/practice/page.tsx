"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { QuizShell } from "@/components/quiz/quiz-shell"
import { CATEGORIES } from "@/lib/constants/categories"

function PracticeContent() {
  const searchParams = useSearchParams()
  const categorySlug = searchParams.get("category")

  const category = categorySlug
    ? CATEGORIES.find((c) => c.slug === categorySlug)
    : null

  return (
    <QuizShell
      mode="practice"
      categorySlug={categorySlug}
      categoryName={category?.name ?? null}
      categoryIcon={category?.icon ?? null}
    />
  )
}

export default function PracticePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-neon-cyan border-t-transparent" />
        </div>
      }
    >
      <PracticeContent />
    </Suspense>
  )
}
