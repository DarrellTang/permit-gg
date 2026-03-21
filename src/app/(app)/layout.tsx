import { createClient } from "@/lib/supabase/server"
import { AppShell } from "@/components/layout/app-shell"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let displayName: string | undefined
  let avatarUrl: string | undefined
  let email: string | undefined

  if (user) {
    email = user.email

    const { data: profile } = await supabase
      .from("profiles")
      .select("display_name, avatar_url")
      .eq("id", user.id)
      .single()

    displayName = profile?.display_name ?? user.email?.split("@")[0]
    avatarUrl = profile?.avatar_url ?? undefined
  }

  return (
    <AppShell displayName={displayName} avatarUrl={avatarUrl} email={email}>
      {children}
    </AppShell>
  )
}
