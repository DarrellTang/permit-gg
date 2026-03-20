"use client"

import Link from "next/link"
import * as motion from "motion/react-client"

export function CTA() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden bg-gradient-to-br from-card to-card/60 p-12 text-center md:p-20"
        >
          {/* Corner accents */}
          <div className="absolute left-0 top-0 h-32 w-32 border-l border-t border-neon-pink/40" />
          <div className="absolute bottom-0 right-0 h-32 w-32 border-b border-r border-neon-cyan/40" />

          <h2 className="font-display text-4xl font-black md:text-6xl">
            GET YOUR LICENSE <br />
            ON THE FIRST TRY
          </h2>
          <p className="mx-auto mb-12 mt-8 max-w-2xl font-body text-xl font-light text-muted-foreground">
            Stop stressing about the DMV. 15 minutes a day with verified CA
            handbook questions is all it takes.
          </p>
          <div className="flex flex-col justify-center gap-6 md:flex-row">
            <Link
              href="/practice"
              className="neon-glow bg-primary px-10 py-5 font-display font-bold tracking-widest text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
            >
              START PRACTICING
            </Link>
            <Link
              href="/simulated-test"
              className="border border-border bg-card px-10 py-5 font-display font-bold tracking-widest text-foreground transition-all hover:bg-card/80"
            >
              TAKE THE SIM TEST
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
