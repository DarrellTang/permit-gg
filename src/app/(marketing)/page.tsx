import type { Metadata } from "next"
import Link from "next/link"
import { Hero } from "@/components/landing/hero"
import { SocialProof } from "@/components/landing/social-proof"
import { Features } from "@/components/landing/features"
import { CTA } from "@/components/landing/cta"

export const metadata: Metadata = {
  title: "PERMIT.GG — Dominate the DMV",
  description:
    "Get your California driving permit on the first try. 290+ verified DMV questions, simulated tests, category analytics, and gamified practice. Study 15 min a day.",
}

export default function LandingPage() {
  return (
    <>
      <Hero />
      <SocialProof />
      <Features />
      <CTA />
      <Footer />
    </>
  )
}

function Footer() {
  return (
    <footer className="w-full border-t border-neon-purple/5 bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-8 py-12 md:flex-row">
        <div className="font-display text-lg font-bold text-neon-pink">
          Permit.gg
        </div>
        <div className="flex gap-8 font-body text-xs tracking-tight">
          <Link
            href="#"
            className="text-muted-foreground/50 underline decoration-neon-pink/30 transition-opacity hover:text-neon-pink hover:opacity-100"
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-muted-foreground/50 underline decoration-neon-pink/30 transition-opacity hover:text-neon-pink hover:opacity-100"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="text-muted-foreground/50 underline decoration-neon-pink/30 transition-opacity hover:text-neon-pink hover:opacity-100"
          >
            Contact
          </Link>
        </div>
        <div className="font-body text-xs tracking-tight text-neon-purple/80">
          &copy; 2026 Permit.gg
        </div>
      </div>
    </footer>
  )
}
