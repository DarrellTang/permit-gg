import type { Metadata } from "next"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { PostHogProvider } from "@/lib/posthog/provider"
import { PostHogPageView } from "@/lib/posthog/page-view"
import { PostHogIdentify } from "@/lib/posthog/identify"
import { inter, orbitron, chakraPetch } from "@/fonts"
import "./globals.css"

export const metadata: Metadata = {
  title: "PERMIT.GG",
  description:
    "Ace your California DMV permit test with AI-powered practice quizzes, smart analytics, and adaptive learning.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`dark ${inter.variable} ${orbitron.variable} ${chakraPetch.variable}`}
    >
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <PostHogProvider>
            <Suspense fallback={null}>
              <PostHogPageView />
            </Suspense>
            <PostHogIdentify />
            {children}
          </PostHogProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
