"use client"

import posthog from "posthog-js"
import { useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

export function PostHogIdentify() {
  useEffect(() => {
    if (!posthog.__loaded) return

    const supabase = createClient()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        posthog.identify(session.user.id, {
          email: session.user.email,
        })
      } else if (event === "SIGNED_OUT") {
        posthog.reset()
      }
    })

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        posthog.identify(user.id, { email: user.email })
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  return null
}
