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
    <div className="flex min-h-screen bg-background">
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
