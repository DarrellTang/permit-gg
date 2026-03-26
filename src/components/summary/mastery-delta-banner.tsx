"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { CATEGORIES } from "@/lib/constants/categories"

interface MasteryDeltaBannerProps {
  categorySlug: string
  localAnswers?: { isCorrect: boolean; categorySlug?: string }[]
}

export function MasteryDeltaBanner({ categorySlug, localAnswers }: MasteryDeltaBannerProps) {
  const [before, setBefore] = useState<number | null>(null)
  const [after, setAfter] = useState<number | null>(null)

  const category = CATEGORIES.find((c) => c.slug === categorySlug)
  const categoryName = category?.name ?? categorySlug

  useEffect(() => {
    const preMastery = sessionStorage.getItem(`drill_pre_mastery_${categorySlug}`)
    if (preMastery === null) return

    const preValue = Number(preMastery)
    setBefore(preValue)
    sessionStorage.removeItem(`drill_pre_mastery_${categorySlug}`)

    // Compute "after" locally from this session's answers — avoids race condition
    // with server aggregation that already includes these answers
    if (localAnswers && localAnswers.length > 0) {
      const categoryAnswers = localAnswers.filter(
        (a) => a.categorySlug === categorySlug
      )
      if (categoryAnswers.length > 0) {
        const correct = categoryAnswers.filter((a) => a.isCorrect).length
        const pct = Math.round((correct / categoryAnswers.length) * 100)
        setAfter(pct)
        return
      }
    }

    // Fallback: if no local answers match, show session score as after
    setAfter(0)
  }, [categorySlug, localAnswers])

  if (before === null || after === null) return null

  const delta = after - before

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`w-full overflow-hidden rounded-xl p-4 ${
        delta >= 0
          ? "bg-gradient-to-r from-emerald-500/15 to-neon-cyan/15 ghost-border"
          : "bg-gradient-to-r from-red-500/15 to-neon-pink/15 ghost-border"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {category?.icon && (
            <span className="text-xl">{category.icon}</span>
          )}
          <span className="font-display text-sm font-bold text-foreground">
            {categoryName}
          </span>
        </div>
        <div className="flex items-center gap-2 font-display">
          <span className="text-sm text-muted-foreground">{before}%</span>
          <span className="text-muted-foreground">→</span>
          <span className="text-sm font-bold text-foreground">{after}%</span>
          <span
            className={`text-sm font-bold ${
              delta >= 0 ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {delta >= 0 ? "+" : ""}{delta}%
          </span>
        </div>
      </div>
    </motion.div>
  )
}
