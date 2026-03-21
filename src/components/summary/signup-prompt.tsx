"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { analytics } from "@/lib/posthog/events"

export function SignupPrompt() {
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        setShowPrompt(true)
      }
    })
  }, [])

  if (!showPrompt) return null

  return (
    <div className="rounded-xl border border-neon-cyan/20 bg-neon-cyan/5 p-6 text-center">
      <h3 className="font-display text-lg font-bold tracking-wider text-neon-cyan">
        Save your progress
      </h3>
      <p className="mt-2 font-body text-sm text-muted-foreground">
        Create a free account to track your improvement and unlock more features
      </p>
      <Link
        href="/login"
        className="mt-4 inline-block rounded-lg bg-neon-cyan/20 px-6 py-2.5 font-ui text-sm font-semibold text-neon-cyan transition-all hover:bg-neon-cyan/30"
        onClick={() => analytics.signupPromptClicked()}
      >
        Sign Up Free
      </Link>
    </div>
  )
}
