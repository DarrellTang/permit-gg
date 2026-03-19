"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { PRACTICE_DEFAULTS } from "@/lib/constants/quiz-config"

interface QuestionCountConfigProps {
  count: number
  onChange: (count: number) => void
}

export function QuestionCountConfig({
  count,
  onChange,
}: QuestionCountConfigProps) {
  const [open, setOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return

    function handleClickOutside(e: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [open])

  return (
    <div className="relative inline-block">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(!open)}
        className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label="Configure question count"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={popoverRef}
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full z-10 mt-2 w-56 rounded-xl border border-border/60 bg-card p-4 shadow-lg"
          >
            <p className="mb-3 font-ui text-xs font-semibold text-muted-foreground">
              Question Count
            </p>
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() =>
                  onChange(Math.max(PRACTICE_DEFAULTS.minCount, count - 1))
                }
                disabled={count <= PRACTICE_DEFAULTS.minCount}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted font-ui text-lg font-bold text-foreground transition-colors hover:bg-muted-foreground/20 disabled:opacity-30"
              >
                -
              </button>
              <span className="font-display text-2xl font-bold text-neon-cyan">
                {count}
              </span>
              <button
                type="button"
                onClick={() =>
                  onChange(Math.min(PRACTICE_DEFAULTS.maxCount, count + 1))
                }
                disabled={count >= PRACTICE_DEFAULTS.maxCount}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted font-ui text-lg font-bold text-foreground transition-colors hover:bg-muted-foreground/20 disabled:opacity-30"
              >
                +
              </button>
            </div>
            <input
              type="range"
              min={PRACTICE_DEFAULTS.minCount}
              max={PRACTICE_DEFAULTS.maxCount}
              step={1}
              value={count}
              onChange={(e) => onChange(Number(e.target.value))}
              className="mt-3 w-full accent-neon-cyan"
            />
            <p className="mt-1 text-center font-body text-xs text-muted-foreground">
              {count} questions
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
