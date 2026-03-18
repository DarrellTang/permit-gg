"use client"

import Link from "next/link"
import * as motion from "motion/react-client"
import { Mascot } from "@/components/mascot/mascot"

export function CTA() {
  return (
    <section className="relative px-6 py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-1/2 h-64 w-[500px] -translate-x-1/2 rounded-full bg-neon-pink/8 blur-[100px]" />
      </div>

      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <Mascot size="sm" pose="celebrating" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 font-display text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Your Permit Is <span className="neon-text">Waiting</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 max-w-md font-ui text-muted-foreground"
        >
          Stop guessing if you&apos;re ready. Start practicing and find out for real.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8"
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
            <span className="neon-glow absolute inset-0 rounded-xl opacity-60 transition-opacity group-hover:opacity-100" />
          </Link>
        </motion.div>

        {/* Footer line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 font-body text-xs text-muted-foreground/50"
        >
          PERMIT.GG &mdash; AI-powered CA DMV test prep
        </motion.p>
      </div>
    </section>
  )
}
