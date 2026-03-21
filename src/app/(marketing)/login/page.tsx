"use client"

import { Suspense, useState, useTransition } from "react"
import { useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { signInWithEmail, signUpWithEmail } from "@/server/actions/auth"

type AuthMode = "signin" | "signup"

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[calc(100vh-72px)] items-center justify-center">
          <div className="font-display text-sm tracking-widest text-muted-foreground">
            LOADING...
          </div>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  )
}

function LoginContent() {
  const searchParams = useSearchParams()
  const next = searchParams.get("next") ?? "/dashboard"
  const urlError = searchParams.get("error")

  const [mode, setMode] = useState<AuthMode>("signin")
  const [error, setError] = useState<string | null>(
    urlError === "auth-code-error"
      ? "Authentication failed. Please try again."
      : null
  )
  const [oauthLoading, setOauthLoading] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  async function handleOAuth(provider: "google" | "discord") {
    setError(null)
    setOauthLoading(provider)
    const supabase = createClient()
    const { data, error: oauthError } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${next}`,
      },
    })
    if (oauthError) {
      setError(oauthError.message)
      setOauthLoading(null)
      return
    }
    if (data.url) {
      window.location.href = data.url
    }
  }

  async function handleEmailSubmit(formData: FormData) {
    setError(null)
    startTransition(async () => {
      const result =
        mode === "signin"
          ? await signInWithEmail(formData)
          : await signUpWithEmail(formData)
      if (result?.error) {
        setError(result.error)
      }
    })
  }

  return (
    <div className="flex min-h-[calc(100vh-72px)] items-center justify-center px-4 py-12">
      <div className="relative w-full max-w-md">
        {/* Corner accents */}
        <div className="absolute -left-2 -top-2 h-16 w-16 border-l-2 border-t-2 border-neon-pink/50" />
        <div className="absolute -bottom-2 -right-2 h-16 w-16 border-b-2 border-r-2 border-neon-cyan/50" />

        <div className="border border-border/50 bg-card/80 p-8 backdrop-blur-lg md:p-10">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="neon-text font-display text-3xl font-black tracking-wider md:text-4xl">
              SIGN IN
            </h1>
            <p className="mt-3 font-body text-sm text-muted-foreground">
              Join the quest to ace your DMV test
            </p>
          </div>

          {/* Error display */}
          {error && (
            <div className="mb-6 border border-destructive/30 bg-destructive/10 px-4 py-3 font-body text-sm text-destructive">
              {error}
            </div>
          )}

          {/* OAuth buttons */}
          <div className="space-y-3">
            <button
              onClick={() => handleOAuth("google")}
              disabled={oauthLoading !== null}
              className="flex w-full items-center justify-center gap-3 bg-white px-6 py-4 font-ui text-sm font-bold tracking-wide text-gray-800 transition-all hover:shadow-lg hover:shadow-white/10 active:scale-[0.98] disabled:opacity-50"
            >
              {oauthLoading === "google" ? <LoadingSpinner /> : <GoogleIcon />}
              Continue with Google
            </button>

            <button
              onClick={() => handleOAuth("discord")}
              disabled={oauthLoading !== null}
              className="flex w-full items-center justify-center gap-3 px-6 py-4 font-ui text-sm font-bold tracking-wide text-white transition-all hover:shadow-lg hover:shadow-[#5865F2]/20 active:scale-[0.98] disabled:opacity-50"
              style={{ backgroundColor: "#5865F2" }}
            >
              {oauthLoading === "discord" ? (
                <LoadingSpinner />
              ) : (
                <DiscordIcon />
              )}
              Continue with Discord
            </button>
          </div>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-border/50" />
            <span className="font-ui text-xs tracking-widest text-muted-foreground/50">
              OR
            </span>
            <div className="h-px flex-1 bg-border/50" />
          </div>

          {/* Mode toggle */}
          <div className="mb-6 flex justify-center gap-1 border border-border/30 p-1">
            <button
              onClick={() => {
                setMode("signin")
                setError(null)
              }}
              className={`flex-1 px-4 py-2 font-ui text-xs font-bold tracking-widest transition-all ${
                mode === "signin"
                  ? "bg-neon-pink/15 text-neon-pink"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              SIGN IN
            </button>
            <button
              onClick={() => {
                setMode("signup")
                setError(null)
              }}
              className={`flex-1 px-4 py-2 font-ui text-xs font-bold tracking-widest transition-all ${
                mode === "signup"
                  ? "bg-neon-pink/15 text-neon-pink"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              SIGN UP
            </button>
          </div>

          {/* Email/password form */}
          <form action={handleEmailSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label
                  htmlFor="displayName"
                  className="mb-1.5 block font-ui text-xs font-bold tracking-wider text-muted-foreground"
                >
                  DISPLAY NAME
                </label>
                <input
                  id="displayName"
                  name="displayName"
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full border border-border/50 bg-surface-container-low px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-neon-pink/50 focus:outline-none focus:ring-1 focus:ring-neon-pink/30"
                />
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block font-ui text-xs font-bold tracking-wider text-muted-foreground"
              >
                EMAIL
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full border border-border/50 bg-surface-container-low px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-neon-pink/50 focus:outline-none focus:ring-1 focus:ring-neon-pink/30"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block font-ui text-xs font-bold tracking-wider text-muted-foreground"
              >
                PASSWORD
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                placeholder="Min 6 characters"
                className="w-full border border-border/50 bg-surface-container-low px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-neon-pink/50 focus:outline-none focus:ring-1 focus:ring-neon-pink/30"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="neon-glow w-full bg-primary px-6 py-4 font-display text-sm font-bold tracking-widest text-primary-foreground transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <LoadingSpinner />
                  {mode === "signin"
                    ? "SIGNING IN..."
                    : "CREATING ACCOUNT..."}
                </span>
              ) : mode === "signin" ? (
                "SIGN IN"
              ) : (
                "CREATE ACCOUNT"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

function LoadingSpinner() {
  return (
    <svg
      className="h-5 w-5 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}

function DiscordIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}
