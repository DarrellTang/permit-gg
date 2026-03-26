"use server"

import { createClient } from "@/lib/supabase/server"
import { getUserAnalytics } from "@/server/db/queries/analytics"
import type { UserAnalytics } from "@/lib/types/analytics"

export async function fetchUserAnalytics(): Promise<UserAnalytics | null> {
  const supabase = await createClient()

  let userId: string | null = null
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    userId = user?.id ?? null
  } catch {
    userId = null
  }

  if (!userId) return null

  return getUserAnalytics(supabase, userId)
}
