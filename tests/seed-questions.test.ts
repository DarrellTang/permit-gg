import { describe, it, expect } from "vitest"
import { readFileSync } from "node:fs"
import { resolve } from "node:path"

const seedPath = resolve(__dirname, "../supabase/seed.sql")
const seedContent = readFileSync(seedPath, "utf-8")

const CATEGORY_SLUGS = [
  "road-signs",
  "right-of-way",
  "traffic-laws",
  "speed-limits",
  "dui-drug-laws",
  "safe-driving",
  "parking",
  "sharing-the-road",
]

function countInserts(): number {
  const matches = seedContent.match(/INSERT\s+INTO\s+seed_questions/gi)
  return matches ? matches.length : 0
}

function extractCategorySlugs(): string[] {
  const regex = /WHERE\s+slug\s*=\s*'([^']+)'/g
  const slugs: string[] = []
  let match: RegExpExecArray | null
  while ((match = regex.exec(seedContent)) !== null) {
    slugs.push(match[1])
  }
  return slugs
}

function extractQuestionTexts(): string[] {
  const regex =
    /INSERT\s+INTO\s+seed_questions\s*\([^)]*\)\s*VALUES\s*\(\s*\(SELECT[^)]+\)\s*,\s*'((?:[^']|'')+)'/gs
  const texts: string[] = []
  let match: RegExpExecArray | null
  while ((match = regex.exec(seedContent)) !== null) {
    texts.push(match[1].replace(/''/g, "'").toLowerCase().trim())
  }
  return texts
}

function countArrayElements(): number[] {
  const regex = /ARRAY\s*\[\s*'(?:[^']|'')+'\s*,\s*'(?:[^']|'')+'\s*,\s*'(?:[^']|'')+'\s*\]/gs
  const matches = seedContent.match(regex)
  if (!matches) return []
  return matches.map(() => 3)
}

describe("seed.sql", () => {
  it("contains at least 280 INSERT statements", () => {
    const count = countInserts()
    expect(count).toBeGreaterThanOrEqual(280)
  })

  it("all 8 categories are referenced in seed.sql", () => {
    const slugs = new Set(extractCategorySlugs())
    for (const cat of CATEGORY_SLUGS) {
      expect(slugs.has(cat)).toBe(true)
    }
  })

  it("each question has exactly 3 wrong answers (ARRAY syntax)", () => {
    const insertCount = countInserts()
    const arrayMatches = countArrayElements()
    expect(arrayMatches.length).toBe(insertCount)
    for (const count of arrayMatches) {
      expect(count).toBe(3)
    }
  })

  it("no duplicate question_text values", () => {
    const texts = extractQuestionTexts()
    const unique = new Set(texts)
    expect(unique.size).toBe(texts.length)
  })

  it("each category has at least 25 questions", () => {
    const slugs = extractCategorySlugs()
    const counts: Record<string, number> = {}
    for (const slug of CATEGORY_SLUGS) {
      counts[slug] = 0
    }
    for (const slug of slugs) {
      if (counts[slug] !== undefined) {
        counts[slug]++
      }
    }
    for (const cat of CATEGORY_SLUGS) {
      expect(counts[cat]).toBeGreaterThanOrEqual(25)
    }
  })
})
