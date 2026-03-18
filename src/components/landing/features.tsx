"use client"

import * as motion from "motion/react-client"

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <path d="M12 3v18" />
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M3 9h18" />
        <path d="M3 15h18" />
        <path d="M9 3v18" />
        <path d="M15 3v18" />
      </svg>
    ),
    title: "AI Question Variations",
    description:
      "Every session is different. AI rephrases questions so you learn the concept, not memorize answers.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
      </svg>
    ),
    title: "Know Your Weak Spots",
    description:
      "Category analytics show exactly where you need to focus. Stop wasting time on stuff you already know.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        <path d="m9 15 2 2 4-4" />
      </svg>
    ),
    title: "Simulated DMV Test",
    description:
      "46 questions, real format, real timer. Know if you're ready before you walk in.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Spaced Repetition",
    description:
      "Science-backed review scheduling. Questions you're about to forget show up right when you need them.",
  },
]

export function Features() {
  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-center font-display text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Study <span className="neon-text">Smarter</span>, Not Harder
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mb-16 max-w-2xl text-center font-ui text-muted-foreground"
        >
          Built on cognitive science and AI to help you actually pass, not just practice.
        </motion.p>

        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-neon-purple/50 hover:shadow-[0_0_20px_oklch(from_var(--neon-purple)_l_c_h_/_0.15)]"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-neon-cyan transition-colors group-hover:text-neon-pink">
                {feature.icon}
              </div>
              <h3 className="mb-2 font-ui text-lg font-semibold">{feature.title}</h3>
              <p className="font-body text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
