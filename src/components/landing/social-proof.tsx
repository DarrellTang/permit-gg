"use client"

import * as motion from "motion/react-client"

const stats = [
  {
    value: "290+",
    label: "Verified Questions",
    colorClass: "text-neon-pink border-neon-pink/30",
    barClass: "bg-gradient-to-r from-neon-pink to-transparent",
    bg: "290",
  },
  {
    value: "15 MIN",
    label: "Study Daily",
    colorClass: "text-neon-cyan border-neon-cyan/30",
    barClass: "bg-gradient-to-r from-neon-cyan to-transparent",
    bg: "15",
  },
  {
    value: "8",
    label: "Category Drills",
    colorClass: "text-neon-purple border-neon-purple/30",
    barClass: "bg-gradient-to-r from-neon-purple to-transparent",
    bg: "8",
  },
]

export function SocialProof() {
  return (
    <section className="bg-card/50 py-20">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className={`group relative overflow-hidden border-l bg-card p-8 transition-colors hover:bg-card/80 ${stat.colorClass}`}
            >
              <div className="absolute right-0 top-0 select-none p-2 font-display text-6xl text-foreground/5">
                {stat.bg}
              </div>
              <div className="relative z-10">
                <div
                  className={`mb-2 font-display text-4xl font-black ${stat.colorClass.split(" ")[0]}`}
                >
                  {stat.value}
                </div>
                <div className="font-ui text-sm uppercase tracking-widest text-muted-foreground">
                  {stat.label}
                </div>
              </div>
              <div
                className={`absolute bottom-0 left-0 h-1 w-full opacity-0 transition-opacity group-hover:opacity-100 ${stat.barClass}`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
