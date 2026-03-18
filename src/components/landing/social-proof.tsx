"use client"

import * as motion from "motion/react-client"

const categories = [
  "Road Signs",
  "Right-of-Way",
  "Traffic Laws",
  "Speed Limits",
  "DUI / Drug Laws",
  "Safe Driving",
  "Parking",
  "Sharing the Road",
]

const stats = [
  { value: "300+", label: "Verified Questions" },
  { value: "8", label: "DMV Categories" },
  { value: "83%", label: "Passing Score" },
]

export function SocialProof() {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      {/* Subtle background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-neon-purple/5 to-transparent" />

      <div className="relative mx-auto max-w-5xl">
        {/* Loss aversion hook */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="text-destructive">67%</span> of Teens Fail the First Time
          </h2>
          <p className="mt-4 font-ui text-lg text-muted-foreground">
            Don&apos;t be one of them. We&apos;ll get you ready.
          </p>
        </motion.div>

        {/* Stats row */}
        <div className="mb-16 grid grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col items-center rounded-xl border border-border/40 bg-card/30 px-4 py-6 text-center backdrop-blur-sm"
            >
              <span className="neon-text font-display text-3xl font-bold sm:text-4xl">
                {stat.value}
              </span>
              <span className="mt-2 font-ui text-xs text-muted-foreground sm:text-sm">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Category badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="mb-6 font-ui text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Built for California &mdash; All 8 DMV Categories
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat, i) => (
              <motion.span
                key={cat}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.05 * i }}
                className="rounded-full border border-neon-purple/30 bg-card/50 px-4 py-1.5 font-ui text-sm text-foreground/80 transition-colors hover:border-neon-cyan/50 hover:text-neon-cyan"
              >
                {cat}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Sourced from line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center font-body text-sm text-muted-foreground/70"
        >
          All questions sourced from the official CA DMV Handbook
        </motion.p>
      </div>
    </section>
  )
}
