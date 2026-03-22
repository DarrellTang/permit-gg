import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"

const PROTECTED_PATHS = [
  "/dashboard",
  "/simulated-test",
  "/analytics",
  "/flashcards",
]

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value)
          })
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const { data, error } = await supabase.auth.getClaims()
  const isAuthenticated = !error && !!data?.claims

  const pathname = request.nextUrl.pathname

  const isProtected = PROTECTED_PATHS.some((path) =>
    pathname.startsWith(path)
  )

  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("next", pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (pathname === "/practice" && !isAuthenticated) {
    const freeQuizUsed = request.cookies.get("permit_free_quiz_used")
    if (freeQuizUsed) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("next", "/practice")
      return NextResponse.redirect(loginUrl)
    }
  }

  return response
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|ingest|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp3)$).*)",
  ],
}
