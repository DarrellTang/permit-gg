"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { DmvResultLetter } from "@/components/summary/dmv-result-letter"
import { useQuizStore } from "@/stores/quiz-store"

export default function SimSummaryPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session")

  const score = useQuizStore((s) => s.score)
  const totalQuestions = useQuizStore((s) => s.totalQuestions)

  return (
    <DmvResultLetter
      score={score}
      total={totalQuestions}
      onBackToDashboard={() => router.push("/dashboard")}
    />
  )
}
