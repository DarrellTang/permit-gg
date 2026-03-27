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
    <div className="flex h-full w-64 flex-col glass border-r border-neon-pink/15">
      <div className="px-6 pt-6 pb-2">
        <Link href="/dashboard" className="font-display text-xl font-bold tracking-wider text-neon-pink neon-text">
          PERMIT.GG
        </Link>
        <p className="font-ui text-[10px] tracking-[0.2em] text-neon-mint/50 uppercase mt-1">
          CA DMV PREP // ACTIVE
        </p>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 px-3 py-2.5 font-ui text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "rounded-l-lg rounded-r-none border-r-4 border-neon-pink bg-neon-pink/10 text-neon-pink"
                  : "rounded-lg text-muted-foreground/60 hover:text-foreground hover:translate-x-1"
              }`}
            >
              <span className={isActive ? "bloom-primary" : ""}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-neon-pink/10 space-y-1 px-3 py-3">
        {(displayName || email) && (
          <div className="flex items-center gap-3 px-3 py-2">
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
          </div>
        )}

        <div className="my-2 border-t border-neon-pink/10" />

        <Link
          href="/dashboard"
          className="group flex items-center gap-3 rounded-lg px-3 py-2.5 font-ui text-sm font-medium text-muted-foreground/60 transition-all duration-200 hover:text-foreground hover:translate-x-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          Settings
        </Link>

        <form action={signOut}>
          <button
            type="submit"
            className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 font-ui text-sm font-medium text-neon-pink/60 transition-all duration-200 hover:text-neon-pink hover:translate-x-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sign Out
          </button>
        </form>

        <div className="flex items-center justify-between pt-1">
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
