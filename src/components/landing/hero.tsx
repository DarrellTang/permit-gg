"use client"

import Link from "next/link"
import * as motion from "motion/react-client"

export function Hero() {
  return (
    <header className="relative flex min-h-[calc(100vh-72px)] items-center overflow-hidden">
      {/* Asymmetric background shard */}
      <div className="absolute right-0 top-0 -z-10 h-full w-1/2 skew-x-12 translate-x-32 border-l border-neon-pink/10 bg-card/50" />
      <div className="absolute bottom-0 left-0 -z-10 h-64 w-64 rounded-full bg-neon-purple/5 blur-[120px]" />
      <div className="absolute right-1/4 top-1/3 -z-10 h-48 w-48 rounded-full bg-neon-pink/5 blur-[100px]" />

      <div className="container mx-auto grid items-center gap-12 px-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="z-10"
        >
          <div className="mb-6 inline-block border-l-2 border-neon-cyan bg-neon-cyan/10 px-3 py-1">
            <span className="font-ui text-xs uppercase tracking-widest text-neon-cyan">
              CA DMV Prep // 290+ Verified Questions
            </span>
          </div>

          <h1 className="mb-6 font-display text-5xl font-black leading-tight tracking-tight md:text-7xl">
            DOMINATE THE <br />
            <span className="animate-pulse-glow bg-gradient-to-r from-neon-pink to-neon-purple bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,174,216,0.3)]">
              DMV TEST
            </span>
          </h1>

          <p className="mb-10 max-w-xl font-body text-lg font-light leading-relaxed text-muted-foreground md:text-xl">
            Get your license on the first try with practice that actually feels
            like a game. Study in just 15 mins a day and crush every category.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/practice"
              className="neon-glow bg-gradient-to-r from-neon-pink to-primary px-8 py-4 font-display font-bold tracking-widest text-white transition-all hover:scale-105 active:scale-95"
            >
              START YOUR QUEST
            </Link>
            <Link
              href="/simulated-test"
              className="flex items-center gap-2 border border-border px-8 py-4 font-display font-bold tracking-widest text-neon-cyan transition-all hover:bg-card"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <polygon points="6 3 20 12 6 21 6 3" />
              </svg>
              TAKE SIM TEST
            </Link>
          </div>
        </motion.div>

        {/* Hero visual panel */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative hidden md:block"
        >
          <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-neon-pink/20 bg-card/80 backdrop-blur-2xl">
            {/* Scanline effect */}
            <div className="animate-scanline pointer-events-none" />

            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/10 via-transparent to-neon-purple/10" />

            {/* XP boost chip */}
            <div className="animate-pulse-glow absolute left-10 top-10 border-l-2 border-neon-pink bg-card/90 p-4 backdrop-blur-2xl">
              <div className="mb-1 font-ui text-[10px] text-neon-pink">
                PRACTICE_MODE_ACTIVE
              </div>
              <div className="h-1 w-32 overflow-hidden bg-muted">
                <div className="h-full w-3/4 bg-neon-pink" />
              </div>
            </div>

            {/* Interactive mode chip */}
            <div className="animate-float absolute bottom-12 right-12 max-w-[200px] border-r-2 border-neon-cyan bg-card/90 p-6 backdrop-blur-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mb-2 h-8 w-8 text-neon-cyan"
              >
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
              </svg>
              <div className="mb-1 font-display text-xs uppercase text-foreground">
                Gamified Practice
              </div>
              <div className="text-[10px] leading-tight text-muted-foreground">
                Streak celebrations, category radar charts, and smart
                recommendations.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  )
}
