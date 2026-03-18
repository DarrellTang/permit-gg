"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useRouter } from "next/navigation"

const STEPS = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16 text-neon-cyan">
        <path d="M12 2a4 4 0 0 0-4 4v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4z" />
        <circle cx="12" cy="15" r="2" />
        <path d="M12 17v2" />
      </svg>
    ),
    title: "AI-Powered Questions",
    description:
      "Every session feels fresh. Our AI generates unique question variations so you actually learn the material -- not just memorize answers.",
    accent: "neon-cyan",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16 text-neon-purple">
        <path d="M3 3v18h18" />
        <path d="m7 16 4-8 4 4 4-8" />
      </svg>
    ),
    title: "Know Your Weaknesses",
    description:
      "Category analytics show exactly where to focus. Stop wasting time on what you already know and drill what matters.",
    accent: "neon-purple",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16 text-neon-pink">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: "Pass Your Test",
    description:
      "Your readiness score tells you when you're truly ready. No guessing -- just confidence backed by data.",
    accent: "neon-pink",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16 text-neon-cyan">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: "Start Studying",
    description:
      "Jump into your first practice quiz. It only takes a few minutes to see how Permit.GG works.",
    accent: "neon-cyan",
  },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const router = useRouter()
  const step = STEPS[currentStep]

  function handleNext() {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      router.push("/dashboard")
    }
  }

  function handleSkip() {
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center p-6 lg:min-h-screen">
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="flex flex-col items-center space-y-6 text-center"
          >
            <div className="rounded-2xl bg-card p-8 ring-1 ring-border/60">
              {step.icon}
            </div>

            <h2 className="font-display text-2xl font-bold tracking-wide text-foreground">
              {step.title}
            </h2>

            <p className="font-body text-base leading-relaxed text-muted-foreground">
              {step.description}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex flex-col items-center gap-6">
          <div className="flex items-center gap-2">
            {STEPS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentStep
                    ? "w-8 bg-neon-pink shadow-[0_0_8px_var(--neon-pink)]"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex w-full gap-3">
            {currentStep < STEPS.length - 1 && (
              <button
                onClick={handleSkip}
                className="flex-1 rounded-lg px-4 py-3 font-ui text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Skip
              </button>
            )}
            <button
              onClick={handleNext}
              className="flex-1 rounded-lg bg-neon-pink px-4 py-3 font-ui text-sm font-semibold text-white shadow-[0_0_12px_var(--neon-pink)/0.4] transition-all hover:shadow-[0_0_20px_var(--neon-pink)/0.6] active:scale-[0.98]"
            >
              {currentStep === STEPS.length - 1 ? "Let's Go!" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
