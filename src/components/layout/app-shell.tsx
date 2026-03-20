"use client"

import { Sidebar } from "./sidebar"
import { BottomTabs } from "./bottom-tabs"
import { PageTransition } from "./page-transition"

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden lg:flex lg:w-64 lg:flex-col">
        <Sidebar />
      </aside>

      <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
        <PageTransition>{children}</PageTransition>
      </main>

      <BottomTabs />
    </div>
  )
}
