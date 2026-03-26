"use client"

import { Sidebar } from "./sidebar"
import { BottomTabs } from "./bottom-tabs"
import { PageTransition } from "./page-transition"

interface AppShellProps {
  children: React.ReactNode
  displayName?: string
  avatarUrl?: string
  email?: string
}

export function AppShell({
  children,
  displayName,
  avatarUrl,
  email,
}: AppShellProps) {
  return (
    <div className="relative flex min-h-screen bg-background">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_oklch(0.20_0.04_300)_0%,_transparent_70%)]" />
      <div className="pointer-events-none fixed -top-32 -right-32 -z-10 h-96 w-96 rounded-full bg-neon-purple/[0.04] blur-[120px]" />

      <aside className="hidden lg:flex lg:w-64 lg:flex-col">
        <Sidebar
          displayName={displayName}
          avatarUrl={avatarUrl}
          email={email}
        />
      </aside>

      <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
        <PageTransition>{children}</PageTransition>
      </main>

      <BottomTabs />
    </div>
  )
}
