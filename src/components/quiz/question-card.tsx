"use client"

import { motion, AnimatePresence } from "motion/react"
import { AnswerOption } from "./answer-option"
import { AnswerFeedback } from "./answer-feedback"
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
        <div className="rounded-xl border border-border/40 bg-card/80 p-5">
          <p className="font-body text-base leading-relaxed text-foreground">
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

        <AnswerFeedback
          explanation={question.explanation}
          handbookReference={question.handbookReference}
          answerState={answerState}
          isCorrect={isCorrect}
          mode={mode}
        />

        <div className="flex justify-end pt-2">
          {!isRevealed && (
            <Button
              onClick={onSubmit}
              disabled={answerState !== "selected"}
              className="min-w-[120px] bg-neon-cyan/20 font-ui text-sm font-semibold text-neon-cyan hover:bg-neon-cyan/30 disabled:opacity-40"
              variant="ghost"
            >
              Submit
            </Button>
          )}
          {isRevealed && !isCorrect && (
            <Button
              onClick={onNext}
              className="min-w-[120px] bg-neon-purple/20 font-ui text-sm font-semibold text-neon-purple hover:bg-neon-purple/30"
              variant="ghost"
            >
              {isLastQuestion ? "Finish" : "Next"}
            </Button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
