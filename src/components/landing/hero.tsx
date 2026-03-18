"use client"

import Link from "next/link"
import * as motion from "motion/react-client"
import { Mascot } from "@/components/mascot/mascot"

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden px-6 py-20">
      {/* Gradient background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-neon-pink/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-neon-purple/10 blur-[100px]" />
        <div className="absolute right-1/3 top-1/2 h-64 w-64 rounded-full bg-neon-cyan/5 blur-[80px]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-12 lg:flex-row lg:gap-16">
        {/* Content */}
        <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl"
          >
            <span className="neon-text">Crush</span> Your{" "}
            <br className="hidden sm:block" />
            CA Permit Test
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-6 max-w-lg font-ui text-lg text-muted-foreground sm:text-xl"
          >
            AI-powered practice that adapts to how you learn.
            <br className="hidden sm:block" />{" "}
            <span className="text-foreground">Not your boring practice test.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            className="mt-10"
          >
            <Link
              href="/dashboard"
              className="group relative inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 font-ui text-lg font-semibold text-primary-foreground transition-all hover:scale-105 hover:shadow-[0_0_30px_var(--neon-pink),0_0_60px_oklch(from_var(--neon-pink)_l_c_h_/_0.3)] active:scale-[0.98]"
            >
              <span>Start Studying</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
              {/* Glow ring */}
              <span className="neon-glow absolute inset-0 rounded-xl opacity-60 transition-opacity group-hover:opacity-100" />
            </Link>
          </motion.div>
        </div>

        {/* Mascot */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="flex flex-shrink-0 items-center justify-center"
        >
          <Mascot size="lg" pose="encouraging" />
        </motion.div>
      </div>
    </section>
  )
}
