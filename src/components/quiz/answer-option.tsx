"use client"

import { motion } from "motion/react"
import type { AnswerState } from "@/lib/types/quiz"
import { cn } from "@/lib/utils"

interface AnswerOptionProps {
  text: string
  index: number
  isSelected: boolean
  isCorrect: boolean | null
  answerState: AnswerState
  onSelect: () => void
}

const labels = ["A", "B", "C", "D"]

export function AnswerOption({
  text,
  index,
  isSelected,
  isCorrect,
  answerState,
  onSelect,
}: AnswerOptionProps) {
  const isRevealed = answerState === "revealed"
  const isDisabled = answerState === "submitted" || isRevealed

  const getVariant = () => {
    if (isRevealed && isCorrect) {
      return "correct"
    }
    if (isRevealed && isSelected && !isCorrect) {
      return "wrong"
    }
    if (isRevealed && !isSelected && !isCorrect) {
      return "dimmed"
    }
    if (isSelected) {
      return "selected"
    }
    return "idle"
  }

  const variant = getVariant()

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      disabled={isDisabled}
      animate={
        variant === "wrong"
          ? {
              x: [0, -6, 6, -4, 4, 0],
              transition: { duration: 0.4, ease: "easeInOut" },
            }
          : {}
      }
      className={cn(
        "flex min-h-[56px] w-full items-center gap-3 rounded-md px-4 py-3 text-left font-ui text-sm transition-all duration-200",
        variant === "idle" &&
          "cursor-pointer border-0 glass ghost-border bloom-hover hover:scale-[1.01] active:scale-[0.99]",
        variant === "selected" &&
          "cursor-pointer border-0 bg-neon-cyan/10 shadow-[0_0_16px_2px_rgba(169,255,222,0.3)]",
        variant === "correct" &&
          "border-2 border-green-500 bg-green-500/15 text-green-400",
        variant === "wrong" &&
          "border-2 border-red-500 bg-red-500/15 text-red-400",
        variant === "dimmed" && "border-0 bg-card/40 opacity-50"
      )}
    >
      <span
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-ui text-xs font-bold",
          variant === "idle" && "bg-card/60 text-muted-foreground",
          variant === "selected" && "bg-neon-cyan/20 text-neon-cyan",
          variant === "correct" && "bg-green-500/20 text-green-400",
          variant === "wrong" && "bg-red-500/20 text-red-400",
          variant === "dimmed" && "bg-card/30 text-muted-foreground/50"
        )}
      >
        {variant === "correct" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : variant === "wrong" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          labels[index]
        )}
      </span>
      <span className="flex-1">{text}</span>
    </motion.button>
  )
}
