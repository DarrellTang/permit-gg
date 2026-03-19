import type { SupabaseClient } from "@supabase/supabase-js"
import { CATEGORY_WEIGHTS, type CategorySlug } from "@/lib/types/question"
import type { PreparedQuestion } from "@/lib/types/quiz"

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

interface SeedQuestionRow {
  id: string
  category_id: string
  question_text: string
  correct_answer: string
  wrong_answers: string[]
  explanation: string
  handbook_reference: string
  categories: { slug: string; name: string }
}

function toPreparedQuestion(row: SeedQuestionRow): PreparedQuestion {
  return {
    id: row.id,
    questionText: row.question_text,
    correctAnswer: row.correct_answer,
    shuffledOptions: shuffleArray([row.correct_answer, ...row.wrong_answers]),
    explanation: row.explanation,
    handbookReference: row.handbook_reference,
    categorySlug: row.categories.slug,
    categoryName: row.categories.name,
  }
}

export async function selectPracticeQuestions(
  supabase: SupabaseClient,
  count: number = 15
): Promise<PreparedQuestion[]> {
  const { data, error } = await supabase
    .from("seed_questions")
    .select("*, categories(slug, name)")
    .limit(count * 2)
    .order("id")

  if (error) throw error

  const shuffled = shuffleArray(data as SeedQuestionRow[])
  return shuffled.slice(0, count).map(toPreparedQuestion)
}

export async function selectSimQuestions(
  supabase: SupabaseClient
): Promise<PreparedQuestion[]> {
  const totalQuestions = 46

  const { data, error } = await supabase
    .from("seed_questions")
    .select("*, categories(slug, name)")

  if (error) throw error

  const rows = data as SeedQuestionRow[]
  const byCategory: Record<string, SeedQuestionRow[]> = {}

  for (const row of rows) {
    const slug = row.categories.slug
    if (!byCategory[slug]) byCategory[slug] = []
    byCategory[slug].push(row)
  }

  // Shuffle each category pool
  for (const slug of Object.keys(byCategory)) {
    byCategory[slug] = shuffleArray(byCategory[slug])
  }

  // Use floor for initial allocation, then distribute remainder
  const picks: Record<string, number> = {}
  let allocated = 0

  for (const [slug, weight] of Object.entries(CATEGORY_WEIGHTS)) {
    picks[slug] = Math.floor(totalQuestions * weight)
    allocated += picks[slug]
  }

  // Distribute remainder to categories with largest fractional parts
  let remainder = totalQuestions - allocated
  const fractionals = Object.entries(CATEGORY_WEIGHTS)
    .map(([slug, weight]) => ({
      slug,
      frac: (totalQuestions * weight) - Math.floor(totalQuestions * weight),
    }))
    .sort((a, b) => b.frac - a.frac)

  for (const { slug } of fractionals) {
    if (remainder <= 0) break
    picks[slug]++
    remainder--
  }

  // Select from each category pool
  const selected: SeedQuestionRow[] = []

  for (const [slug, count] of Object.entries(picks)) {
    const pool = byCategory[slug] || []
    const pick = Math.min(count, pool.length)
    selected.push(...pool.slice(0, pick))
  }

  // Fill any shortfall from largest available pools
  if (selected.length < totalQuestions) {
    const sortedCategories = Object.entries(byCategory)
      .sort((a, b) => b[1].length - a[1].length)

    for (const [slug, pool] of sortedCategories) {
      if (selected.length >= totalQuestions) break
      const alreadyPicked = selected.filter(
        (q) => q.categories.slug === slug
      ).length
      const remaining = pool.slice(alreadyPicked)
      const needed = totalQuestions - selected.length
      selected.push(...remaining.slice(0, needed))
    }
  }

  return shuffleArray(selected).map(toPreparedQuestion)
}
