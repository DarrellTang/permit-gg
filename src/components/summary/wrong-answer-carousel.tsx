"use client"

import { motion, AnimatePresence } from "motion/react"
import { useState, useCallback } from "react"
import { Badge } from "@/components/ui/badge"
import type { QuizAnswer, PreparedQuestion } from "@/lib/types/quiz"

const SWIPE_THRESHOLD = 100
const SWIPE_VELOCITY = 500

interface WrongAnswerCarouselProps {
  wrongAnswers: QuizAnswer[]
  questions: PreparedQuestion[]
}

export function WrongAnswerCarousel({
  wrongAnswers,
  questions,
}: WrongAnswerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const questionMap = new Map(questions.map((q) => [q.id, q]))

  const navigate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection)
      setCurrentIndex((prev) =>
        Math.max(0, Math.min(wrongAnswers.length - 1, prev + newDirection))
      )
    },
    [wrongAnswers.length]
  )

  function handleDragEnd(
    _: never,
    info: { offset: { x: number }; velocity: { x: number } }
  ) {
    const { offset, velocity } = info
    if (
      Math.abs(offset.x) > SWIPE_THRESHOLD ||
      Math.abs(velocity.x) > SWIPE_VELOCITY
    ) {
      const newDirection = offset.x > 0 ? -1 : 1
      const nextIndex = currentIndex + newDirection
      if (nextIndex >= 0 && nextIndex < wrongAnswers.length) {
        navigate(newDirection)
      }
    }
  }

  if (wrongAnswers.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="rounded-xl border border-neon-cyan/30 bg-neon-cyan/5 p-8 text-center"
      >
        <div className="font-display text-4xl">100%</div>
        <p className="mt-2 font-display text-xl font-bold text-neon-cyan">
          Perfect Score!
        </p>
        <p className="mt-1 font-body text-sm text-muted-foreground">
          You got every question right. Amazing work!
        </p>
      </motion.div>
    )
  }

  const answer = wrongAnswers[currentIndex]
  const question = questionMap.get(answer.questionId)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.4 }}
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">
          Wrong Answers ({wrongAnswers.length})
        </h3>
        <span className="font-ui text-xs text-muted-foreground">
          {currentIndex + 1} of {wrongAnswers.length}
        </span>
      </div>

      <div className="relative overflow-hidden">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            disabled={currentIndex === 0}
            className="shrink-0 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent"
            aria-label="Previous card"
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
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="min-h-[280px] flex-1 overflow-hidden">
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{ x: direction * 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction * -300, opacity: 0 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.3}
                onDragEnd={handleDragEnd}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="cursor-grab active:cursor-grabbing"
              >
                <div className="rounded-xl border border-neon-pink/20 bg-gradient-to-b from-card to-card/80 p-5 shadow-lg shadow-neon-pink/5">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="font-ui text-xs font-bold text-muted-foreground">
                      Q{questions.findIndex((q) => q.id === answer.questionId) + 1}
                    </span>
                    {question && (
                      <Badge
                        className="bg-neon-purple/15 text-neon-purple border-neon-purple/25 text-[10px]"
                      >
                        {question.categoryName}
                      </Badge>
                    )}
                  </div>

                  <p className="mb-4 font-body text-sm leading-relaxed text-foreground">
                    {question?.questionText ?? "Question not found"}
                  </p>

                  <div className="mb-3 space-y-2">
                    <div className="flex items-start gap-2 rounded-lg bg-red-500/10 p-2.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mt-0.5 h-4 w-4 shrink-0 text-red-400"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                      <div>
                        <span className="font-ui text-[10px] font-bold uppercase tracking-wider text-red-400">
                          Your answer
                        </span>
                        <p className="font-body text-sm text-red-300">
                          {answer.selectedAnswer}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 rounded-lg bg-green-500/10 p-2.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mt-0.5 h-4 w-4 shrink-0 text-green-400"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <div>
                        <span className="font-ui text-[10px] font-bold uppercase tracking-wider text-green-400">
                          Correct answer
                        </span>
                        <p className="font-body text-sm text-green-300">
                          {answer.correctAnswer}
                        </p>
                      </div>
                    </div>
                  </div>

                  {question?.explanation && (
                    <p className="mb-2 font-body text-xs leading-relaxed text-muted-foreground">
                      {question.explanation}
                    </p>
                  )}

                  {question?.handbookReference && (
                    <p className="font-ui text-[10px] text-muted-foreground/60">
                      CA DMV Handbook: {question.handbookReference}
                    </p>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={() => navigate(1)}
            disabled={currentIndex === wrongAnswers.length - 1}
            className="shrink-0 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent"
            aria-label="Next card"
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
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        <div className="mt-4 flex justify-center gap-1.5">
          {wrongAnswers.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === currentIndex
                  ? "w-6 bg-neon-pink"
                  : "w-1.5 bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
