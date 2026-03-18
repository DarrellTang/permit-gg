"use client"

import { motion, AnimatePresence } from "motion/react"
import { usePathname } from "next/navigation"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, x: 8, filter: "blur(4px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, x: -8, filter: "blur(4px)" }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
