import type { Metadata } from "next"
import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { SocialProof } from "@/components/landing/social-proof"
import { CTA } from "@/components/landing/cta"

export const metadata: Metadata = {
  title: "PERMIT.GG - Crush Your CA Permit Test",
  description:
    "AI-powered California DMV permit test prep. Smart practice that adapts to how you learn. 300+ verified questions, category analytics, and simulated DMV tests.",
}

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Features />
      <SocialProof />
      <CTA />
    </>
  )
}
