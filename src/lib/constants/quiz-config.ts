export const DMV_CONFIG = {
  totalQuestions: 46,
  passingScore: 38,
  passingPercentage: 0.83,
} as const

export const PRACTICE_DEFAULTS = {
  defaultCount: 15,
  minCount: 10,
  maxCount: 20,
} as const

export const CELEBRATION_TIERS = {
  subtle: {
    particleCount: 15,
    spread: 40,
    startVelocity: 20,
  },
  medium: {
    particleCount: 40,
    spread: 60,
    startVelocity: 30,
  },
  fireworks: {
    particleCount: 80,
    spread: 100,
    startVelocity: 45,
  },
} as const

export const AUTO_ADVANCE_DELAY_MS = 1500
