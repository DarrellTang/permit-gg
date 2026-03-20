import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 p-6 lg:p-8">
      <div className="space-y-2">
        <h1 className="font-display text-3xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan lg:text-4xl">
          Welcome to PERMIT.GG
        </h1>
        <p className="font-ui text-xs text-neon-lavender/60 tracking-widest mt-1">&#10022; Your journey starts here</p>
        <p className="font-ui text-base text-muted-foreground">
          Your CA permit test prep starts here
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="group border-0 bg-[var(--surface-container-low)] transition-all hover:bg-[var(--surface-container-high)] hover:shadow-[0_-2px_0_0_var(--neon-pink),0_0_20px_2px_rgba(255,174,216,0.15)]">
          <CardHeader>
            <CardTitle className="font-ui text-lg">
              <span className="mr-2 inline-block text-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="inline h-6 w-6 text-neon-pink">
                  <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
                </svg>
              </span>
              &#10022; Readiness Score
            </CardTitle>
            <CardDescription className="font-body">
              How prepared are you for the real test?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-5xl font-bold text-muted-foreground/40">
                --%
              </span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Complete quizzes to see your readiness score
            </p>
          </CardContent>
        </Card>

        <Card className="group border-0 bg-[var(--surface-container-low)] transition-all hover:bg-[var(--surface-container-high)] hover:shadow-[0_-2px_0_0_var(--neon-cyan),0_0_20px_2px_rgba(169,255,222,0.15)]">
          <CardHeader>
            <CardTitle className="font-ui text-lg">
              <span className="mr-2 inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="inline h-6 w-6 text-neon-cyan">
                  <polygon points="6 3 20 12 6 21 6 3" />
                </svg>
              </span>
              &#10022; Quick Practice
            </CardTitle>
            <CardDescription className="font-body">
              Jump into a practice quiz with mixed topics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href="/practice"
              className="inline-block rounded-lg bg-neon-cyan/20 px-4 py-2 font-ui text-sm font-semibold text-neon-cyan transition-all hover:bg-neon-cyan/30"
            >
              Start Practice
            </Link>
          </CardContent>
        </Card>

        <Card className="group border-0 bg-[var(--surface-container-low)] transition-all hover:bg-[var(--surface-container-high)] hover:shadow-[0_-2px_0_0_var(--neon-purple),0_0_20px_2px_rgba(234,178,255,0.15)]">
          <CardHeader>
            <CardTitle className="font-ui text-lg">
              <span className="mr-2 inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="inline h-6 w-6 text-neon-purple">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                  <path d="m9 14 2 2 4-4" />
                </svg>
              </span>
              &#10022; Simulated Test
            </CardTitle>
            <CardDescription className="font-body">
              46 questions, just like the real DMV test
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href="/simulated-test"
              className="inline-block rounded-lg bg-neon-purple/20 px-4 py-2 font-ui text-sm font-semibold text-neon-purple transition-all hover:bg-neon-purple/30"
            >
              Start Sim Test
            </Link>
          </CardContent>
        </Card>

        <Card className="group border-0 bg-[var(--surface-container-low)] transition-all hover:bg-[var(--surface-container-high)] hover:shadow-[0_-2px_0_0_var(--neon-pink),0_0_20px_2px_rgba(255,174,216,0.15)]">
          <CardHeader>
            <CardTitle className="font-ui text-lg">
              <span className="mr-2 inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="inline h-6 w-6 text-muted-foreground">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </span>
              &#10022; Recent Activity
            </CardTitle>
            <CardDescription className="font-body">
              Your latest quiz results and progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground/60">
              No quizzes yet. Start practicing to track your progress!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
