export const TRANSITION_DURATION = {
  fast: 0.15,
  normal: 0.25,
  slow: 0.4,
} as const

export const SPRING_CONFIG = {
  snappy: { type: "spring" as const, stiffness: 500, damping: 30 },
  bouncy: { type: "spring" as const, stiffness: 300, damping: 20 },
  smooth: { type: "spring" as const, stiffness: 200, damping: 25 },
} as const

export const GLOW_SHADOWS = {
  neonPink: "0 0 10px oklch(0.70 0.30 340), 0 0 40px oklch(0.70 0.30 340 / 0.3)",
  neonPurple: "0 0 10px oklch(0.60 0.28 300), 0 0 40px oklch(0.60 0.28 300 / 0.3)",
  neonCyan: "0 0 10px oklch(0.80 0.18 195), 0 0 40px oklch(0.80 0.18 195 / 0.3)",
} as const

export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  glitchIn: {
    initial: { opacity: 0, x: 8, filter: "blur(4px)" },
    animate: { opacity: 1, x: 0, filter: "blur(0px)" },
    exit: { opacity: 0, x: -8, filter: "blur(4px)" },
  },
} as const
