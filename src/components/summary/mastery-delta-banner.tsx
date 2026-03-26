"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { fetchUserAnalytics } from "@/server/actions/analytics"
import { CATEGORIES } from "@/lib/constants/categories"

interface MasteryDeltaBannerProps {
  categorySlug: string
}

export function MasteryDeltaBanner({ categorySlug }: MasteryDeltaBannerProps) {
  const [before, setBefore] = useState<number | null>(null)
  const [after, setAfter] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  const category = CATEGORIES.find((c) => c.slug === categorySlug)
  const categoryName = category?.name ?? categorySlug

  useEffect(() => {
    const preMastery = sessionStorage.getItem(`drill_pre_mastery_${categorySlug}`)
    if (!preMastery) {
      setLoading(false)
      return
    }

    const preValue = Number(preMastery)
    setBefore(preValue)

    sessionStorage.removeItem(`drill_pre_mastery_${categorySlug}`)

    fetchUserAnalytics()
      .then((data) => {
        if (data) {
          const catMastery = data.categories.find((c) => c.slug === categorySlug)
          if (catMastery) {
            setAfter(catMastery.masteryPct)
          }
        }
      })
      .catch(() => {
        // Failed to fetch post-drill mastery
      })
      .finally(() => setLoading(false))
  }, [categorySlug])

  if (loading || before === null || after === null) return null

  const delta = after - before
  const isPositive = delta >= 0

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`w-full overflow-hidden rounded-xl p-4 ${
        isPositive
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
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
          <span className="text-sm font-bold text-foreground">{after}%</span>
          <span
            className={`text-sm font-bold ${
              isPositive ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {isPositive ? "+" : ""}{delta}%
          </span>
        </div>
      </div>
    </motion.div>
  )
}
