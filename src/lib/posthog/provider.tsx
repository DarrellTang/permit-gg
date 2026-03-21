"use client"

import posthog from "posthog-js"
import { PostHogProvider as PHProvider } from "posthog-js/react"

// Module-level init — exactly as Vercel's official guide recommends
// This runs once when the module is first imported on the client
if (typeof window !== "undefined") {
  posthog.init("phc_G6G0W5qoY5uXOyAbA0674BW4ugdnYFZl6DstK7zUSPJ", {
    api_host: "/ingest",
    ui_host: "https://us.i.posthog.com",
    person_profiles: "always",
    capture_exceptions: true,
  })
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return <PHProvider client={posthog}>{children}</PHProvider>
}
