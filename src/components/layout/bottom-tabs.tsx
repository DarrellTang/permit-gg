"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const TAB_ITEMS = [
  {
    label: "Home",
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
    label: "Test",
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
    label: "Cards",
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

export function BottomTabs() {
  const pathname = usePathname()

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 bg-[var(--surface-container)]/80 backdrop-blur-[16px] lg:hidden">
      <nav className="flex items-stretch justify-around pb-[env(safe-area-inset-bottom)]">
        {TAB_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-h-[56px] min-w-[56px] flex-1 flex-col items-center justify-center gap-0.5 px-1 py-2 text-[10px] font-ui font-medium transition-all ${
                isActive
                  ? "text-neon-pink drop-shadow-[0_0_10px_rgba(255,174,216,0.5)]"
                  : "text-muted-foreground active:text-foreground"
              }`}
            >
              <span className={`transition-colors ${isActive ? "text-neon-pink drop-shadow-[0_0_6px_var(--neon-pink)]" : ""}`}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
