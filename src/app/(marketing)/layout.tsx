import Link from "next/link"
import { ThemeToggle } from "@/components/layout/theme-toggle"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-border/40 bg-background/80 px-6 py-3 backdrop-blur-md">
        <Link href="/" className="font-display text-lg font-bold tracking-wider text-primary">
          PERMIT<span className="text-neon-cyan">.GG</span>
        </Link>
        <ThemeToggle />
      </nav>
      <main className="pt-14">{children}</main>
    </div>
  )
}
