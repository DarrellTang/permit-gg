"use client"

import * as motion from "motion/react-client"

export function Features() {
  return (
    <section className="relative py-24">
      <div className="container mx-auto px-8">
        <div className="mb-16">
          <h2 className="mb-4 flex items-center gap-4 font-display text-4xl font-bold">
            <span className="text-neon-pink">&#10022;</span> SMART STUDY TOOLS
          </h2>
          <div className="h-1 w-24 bg-neon-pink" />
        </div>

        <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-12">
          {/* Card 1: Randomized Practice — wide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="group relative overflow-hidden bg-card p-8 transition-all hover:bg-card/80 md:col-span-8"
          >
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
              <div className="max-w-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mb-6 h-12 w-12 text-neon-cyan"
                >
                  <rect width="7" height="7" x="14" y="3" rx="1" />
                  <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" />
                </svg>
                <h3 className="mb-4 font-display text-2xl text-foreground">
                  Randomized Practice
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  290+ verified questions from the official CA DMV handbook.
                  Every session shuffles differently so you learn the material,
                  not memorize the order.
                </p>
              </div>
              <div className="flex w-full flex-1 justify-end">
                <div className="h-48 w-full border border-border bg-card/50 p-4 backdrop-blur-2xl md:w-64">
                  <div className="space-y-3">
                    <div className="h-2 w-3/4 bg-neon-pink/20" />
                    <div className="h-2 w-full bg-neon-cyan/10" />
                    <div className="h-2 w-5/6 bg-muted-foreground/10" />
                    <div className="flex gap-2 pt-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-neon-pink text-[10px] font-bold text-neon-pink">
                        A
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-[10px] text-muted-foreground">
                        B
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-[10px] text-muted-foreground">
                        C
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-[10px] text-muted-foreground">
                        D
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Weak Spot Detection — narrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="group relative border-t-2 border-neon-pink/40 bg-card p-8 transition-all hover:bg-card/80 md:col-span-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mb-6 h-12 w-12 text-neon-pink"
            >
              <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
            </svg>
            <h3 className="mb-4 font-display text-2xl text-foreground">
              Weak Spot Detection
            </h3>
            <p className="text-muted-foreground">
              Category radar charts flag what you&apos;re missing. Smart
              recommendations drill your weak spots until they become strengths.
            </p>
          </motion.div>

          {/* Card 3: Simulated DMV Test — medium */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="group relative border-b-2 border-neon-purple/40 bg-card p-8 transition-all hover:bg-card/80 md:col-span-5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mb-6 h-12 w-12 text-neon-purple"
            >
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
              <path d="m9 14 2 2 4-4" />
            </svg>
            <h3 className="mb-4 font-display text-2xl text-foreground">
              Simulated DMV Test
            </h3>
            <p className="text-muted-foreground">
              46 questions, real CA DMV format, 83% to pass. Flag questions for
              review. DMV letter-style results so you know exactly where you
              stand.
            </p>
          </motion.div>

          {/* Card 4: Gamified Practice — wide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="group relative overflow-hidden bg-card p-8 transition-all hover:bg-card/80 md:col-span-7"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-cyan/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative z-10 flex flex-col items-center gap-8 md:flex-row">
              <div className="shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-12 w-12 text-neon-cyan"
                >
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                </svg>
              </div>
              <div>
                <h3 className="mb-4 font-display text-2xl text-foreground">
                  Level-Up Your Score
                </h3>
                <p className="text-muted-foreground">
                  Streak celebrations, XP progress bars, and instant answer
                  feedback with handbook references. Practice that feels like
                  playing, not studying.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
