"use client"

import posthog from "posthog-js"
import { PostHogProvider as PHProvider } from "posthog-js/react"

if (typeof window !== "undefined") {
  posthog.init("phc_G6G0W5qoY5uXOyAbA0674BW4ugdnYFZl6DstK7zUSPJ", {
    api_host: "/ingest",
    ui_host: "https://us.i.posthog.com",
    person_profiles: "always",
    capture_pageview: true,
    capture_pageleave: true,
    capture_exceptions: true,
    autocapture: true,
    persistence: "localStorage+cookie",
    loaded: (ph) => {
      ph.capture("$pageview")
    },
  })
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return <PHProvider client={posthog}>{children}</PHProvider>
}
