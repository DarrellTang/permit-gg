import confetti from "canvas-confetti"
import { CELEBRATION_TIERS } from "@/lib/constants/quiz-config"

export function fireConfetti(
  streak: number,
  origin?: { x: number; y: number }
) {
  const tier =
    streak >= 10 ? "fireworks" : streak >= 5 ? "medium" : "subtle"
  const config = CELEBRATION_TIERS[tier]

  confetti({
    ...config,
    origin: origin ?? { x: 0.5, y: 0.7 },
    colors: ["#ff69b4", "#a855f7", "#22d3ee"],
    ticks: streak >= 10 ? 200 : 100,
    gravity: 1.2,
    decay: 0.92,
  })

  if (tier === "fireworks") {
    setTimeout(
      () =>
        confetti({
          ...config,
          particleCount: 30,
          origin: { x: 0.3, y: 0.6 },
          colors: ["#ff69b4", "#a855f7", "#22d3ee"],
        }),
      150
    )
    setTimeout(
      () =>
        confetti({
          ...config,
          particleCount: 30,
          origin: { x: 0.7, y: 0.6 },
          colors: ["#ff69b4", "#a855f7", "#22d3ee"],
        }),
      300
    )
  }
}
