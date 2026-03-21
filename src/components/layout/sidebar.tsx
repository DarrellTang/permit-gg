"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "@/server/actions/auth"
import { ThemeToggle } from "./theme-toggle"

const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    label: "Practice",
    href: "/practice",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <polygon points="6 3 20 12 6 21 6 3" />
      </svg>
    ),
  },
  {
    label: "Simulated Test",
    href: "/simulated-test",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
        <path d="M9 14h6" />
        <path d="M9 18h6" />
        <path d="M9 10h6" />
      </svg>
    ),
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
  },
  {
    label: "Flashcards",
    href: "/flashcards",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <rect width="18" height="12" x="3" y="8" rx="2" />
        <path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
        <path d="M12 12v4" />
        <path d="M8 14h8" />
      </svg>
    ),
  },
]

interface SidebarProps {
  displayName?: string
  avatarUrl?: string
  email?: string
}

export function Sidebar({ displayName, avatarUrl, email }: SidebarProps) {
  const pathname = usePathname()

  const initial = (displayName ?? email ?? "U")[0].toUpperCase()

  return (
    <div className="flex h-full w-64 flex-col bg-[var(--surface-container)]/80 backdrop-blur-[16px]">
      <div className="flex h-16 items-center px-6">
        <Link href="/dashboard" className="font-display text-xl font-bold tracking-wider text-neon-pink neon-text">
          PERMIT.GG
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 font-ui text-sm font-medium transition-all ${
                isActive
                  ? "bg-neon-pink/10 text-neon-pink shadow-[0_-2px_0_0_var(--neon-pink)_inset] shadow-neon-pink/60"
                  : "text-muted-foreground hover:bg-[var(--surface-container-high)] hover:text-foreground"
              }`}
            >
              <span className={`transition-colors ${isActive ? "text-neon-pink" : "text-muted-foreground group-hover:text-foreground"}`}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="space-y-2 bg-[var(--surface-container-low)] px-4 py-3">
        {(displayName || email) && (
          <div className="flex items-center gap-3">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName ?? "Avatar"}
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neon-purple/20 font-ui text-sm font-bold text-neon-purple">
                {initial}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="truncate font-ui text-sm font-medium text-foreground">
                {displayName ?? email}
              </p>
            </div>
            <form action={signOut}>
              <button
                type="submit"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-[var(--surface-container-high)] hover:text-foreground"
                aria-label="Sign out"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </button>
            </form>
          </div>
        )}
        <div className="flex items-center justify-between">
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
