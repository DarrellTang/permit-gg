import Link from "next/link"
import { ThemeToggle } from "@/components/layout/theme-toggle"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 z-50 w-full border-b border-neon-pink/10 bg-background/80 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="font-display text-2xl font-black tracking-wider text-neon-pink drop-shadow-[0_0_8px_rgba(255,174,216,0.6)]"
          >
            PERMIT.GG
          </Link>
          <div className="hidden gap-8 font-display text-sm uppercase tracking-wider md:flex">
            <Link
              href="/practice"
              className="text-neon-cyan/70 transition-colors hover:text-neon-cyan"
            >
              Practice
            </Link>
            <Link
              href="/simulated-test"
              className="text-neon-cyan/70 transition-colors hover:text-neon-cyan"
            >
              Mock Test
            </Link>
            <Link
              href="/dashboard"
              className="text-neon-cyan/70 transition-colors hover:text-neon-cyan"
            >
              Dashboard
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/login"
              className="bg-primary/10 px-6 py-2 font-display text-sm font-bold tracking-widest text-primary transition-all duration-300 hover:bg-primary/20 hover:shadow-[0_0_15px_rgba(255,174,216,0.3)] active:scale-95"
            >
              LOGIN
            </Link>
          </div>
        </div>
      </nav>
      <main className="pt-[72px]">{children}</main>
    </div>
  )
}
