"use client"

import { motion, AnimatePresence } from "motion/react"
import { AnswerOption } from "./answer-option"
import { AnswerFeedback } from "./answer-feedback"
import { FlagButton } from "./flag-button"
import { Button } from "@/components/ui/button"
import type { PreparedQuestion, AnswerState, QuizMode } from "@/lib/types/quiz"

interface QuestionCardProps {
  question: PreparedQuestion
  questionIndex: number
  selectedAnswer: string | null
  answerState: AnswerState
  mode: QuizMode
  isLastQuestion: boolean
  onSelect: (answer: string) => void
  onSubmit: () => void
  onNext: () => void
  isFlaggedReview?: boolean
  onSubmitFlagged?: () => void
  onReturnToReview?: () => void
}

export function QuestionCard({
  question,
  questionIndex,
  selectedAnswer,
  answerState,
  mode,
  isLastQuestion,
  onSelect,
  onSubmit,
  onNext,
  isFlaggedReview,
  onSubmitFlagged,
  onReturnToReview,
}: QuestionCardProps) {
  const isRevealed = answerState === "revealed"
  const isCorrect = selectedAnswer === question.correctAnswer

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={questionIndex}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="space-y-4"
      >
        <div className="rounded-xl glass ghost-border border-l-4 border-neon-cyan p-5">
          <div className="mb-2 flex items-center gap-2">
            <span className="font-ui text-xs text-muted-foreground">
              Q{questionIndex + 1}
            </span>
            {mode === "sim" && <FlagButton />}
          </div>
          <p className="font-ui text-base leading-relaxed text-foreground">
            {question.questionText}
          </p>
        </div>

        <div className="space-y-3">
          {question.shuffledOptions.map((option, i) => (
            <AnswerOption
              key={`${questionIndex}-${i}`}
              text={option}
              index={i}
              isSelected={selectedAnswer === option}
              isCorrect={
                isRevealed ? option === question.correctAnswer : null
              }
              answerState={answerState}
              onSelect={() => onSelect(option)}
            />
          ))}
        </div>

        {mode === "practice" && (
          <AnswerFeedback
            explanation={question.explanation}
            handbookReference={question.handbookReference}
            answerState={answerState}
            isCorrect={isCorrect}
            mode={mode}
          />
        )}

        <div className="flex items-center justify-end gap-3 pt-2">
          {isFlaggedReview && onReturnToReview && (
            <Button
              onClick={onReturnToReview}
              variant="ghost"
              className="font-display text-xs tracking-wider text-muted-foreground hover:text-foreground uppercase"
            >
              Back to Review
            </Button>
          )}

          {isFlaggedReview && onSubmitFlagged ? (
            <button
              onClick={onSubmitFlagged}
              disabled={answerState !== "selected"}
              className="min-w-[140px] py-3 bg-neon-cyan/15 border border-neon-cyan/30 font-display text-xs font-bold tracking-[0.15em] text-neon-cyan uppercase transition-all hover:bg-neon-cyan/25 hover:shadow-[0_0_15px_rgba(169,255,222,0.3)] disabled:opacity-30 disabled:hover:shadow-none active:scale-95 cursor-pointer"
            >
              UPDATE ANSWER
            </button>
          ) : (
            <>
              {!isRevealed && (
                <button
                  onClick={onSubmit}
                  disabled={answerState !== "selected"}
                  className="min-w-[140px] py-3 bg-neon-cyan/15 border border-neon-cyan/30 font-display text-xs font-bold tracking-[0.15em] text-neon-cyan uppercase transition-all hover:bg-neon-cyan/25 hover:shadow-[0_0_15px_rgba(169,255,222,0.3)] disabled:opacity-30 disabled:hover:shadow-none active:scale-95 cursor-pointer"
                >
                  SUBMIT
                </button>
              )}
              {isRevealed && !isCorrect && (
                <button
                  onClick={onNext}
                  className="min-w-[140px] py-3 bg-neon-purple/15 border border-neon-purple/30 font-display text-xs font-bold tracking-[0.15em] text-neon-purple uppercase transition-all hover:bg-neon-purple/25 hover:shadow-[0_0_15px_rgba(234,178,255,0.3)] active:scale-95 cursor-pointer"
                >
                  {isLastQuestion ? "FINISH" : "NEXT →"}
                </button>
              )}
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
