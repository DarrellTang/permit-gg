import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))

const VALID_SLUGS = [
  "road-signs",
  "right-of-way",
  "traffic-laws",
  "speed-limits",
  "dui-drug-laws",
  "safe-driving",
  "parking",
  "sharing-the-road",
]

const MIN_PER_CATEGORY = 25

interface ParsedQuestion {
  index: number
  categorySlug: string
  questionText: string
  correctAnswer: string
  wrongAnswers: string[]
  explanation: string
  handbookReference: string
}

function parseSeedSql(content: string): ParsedQuestion[] {
  const questions: ParsedQuestion[] = []

  const insertRegex =
    /INSERT\s+INTO\s+seed_questions\s*\([^)]*\)\s*VALUES\s*\(\s*\(SELECT\s+id\s+FROM\s+categories\s+WHERE\s+slug\s*=\s*'([^']+)'\s*\)\s*,\s*'((?:[^']|'')+)'\s*,\s*'((?:[^']|'')+)'\s*,\s*ARRAY\s*\[\s*'((?:[^']|'')+)'\s*,\s*'((?:[^']|'')+)'\s*,\s*'((?:[^']|'')+)'\s*\]\s*,\s*'((?:[^']|'')+)'\s*,\s*'((?:[^']|'')+)'\s*\)/gs

  let match: RegExpExecArray | null
  let idx = 0

  while ((match = insertRegex.exec(content)) !== null) {
    idx++
    questions.push({
      index: idx,
      categorySlug: match[1],
      questionText: match[2].replace(/''/g, "'"),
      correctAnswer: match[3].replace(/''/g, "'"),
      wrongAnswers: [
        match[4].replace(/''/g, "'"),
        match[5].replace(/''/g, "'"),
        match[6].replace(/''/g, "'"),
      ],
      explanation: match[7].replace(/''/g, "'"),
      handbookReference: match[8].replace(/''/g, "'"),
    })
  }

  return questions
}

function validate(questions: ParsedQuestion[]): { errors: string[]; warnings: string[] } {
  const errors: string[] = []
  const warnings: string[] = []
  const seenTexts = new Set<string>()

  for (const q of questions) {
    const prefix = `Q#${q.index}`

    if (!VALID_SLUGS.includes(q.categorySlug)) {
      errors.push(`${prefix}: Invalid category slug '${q.categorySlug}'`)
    }

    if (q.questionText.length < 10) {
      errors.push(`${prefix}: question_text too short (${q.questionText.length} chars)`)
    }

    if (q.correctAnswer.length < 1) {
      errors.push(`${prefix}: empty correct_answer`)
    }

    if (q.wrongAnswers.length !== 3) {
      errors.push(`${prefix}: expected 3 wrong_answers, got ${q.wrongAnswers.length}`)
    }

    for (let i = 0; i < q.wrongAnswers.length; i++) {
      if (q.wrongAnswers[i].length < 1) {
        errors.push(`${prefix}: empty wrong_answer[${i}]`)
      }
    }

    if (q.explanation.length < 10) {
      errors.push(`${prefix}: explanation too short (${q.explanation.length} chars)`)
    }

    if (q.handbookReference.length < 1) {
      errors.push(`${prefix}: empty handbook_reference`)
    }

    const normalizedText = q.questionText.toLowerCase().trim()
    if (seenTexts.has(normalizedText)) {
      errors.push(`${prefix}: duplicate question_text: "${q.questionText.slice(0, 60)}..."`)
    }
    seenTexts.add(normalizedText)
  }

  return { errors, warnings }
}

function printDistribution(questions: ParsedQuestion[]): void {
  const counts: Record<string, number> = {}
  for (const slug of VALID_SLUGS) {
    counts[slug] = 0
  }
  for (const q of questions) {
    if (counts[q.categorySlug] !== undefined) {
      counts[q.categorySlug]++
    }
  }

  console.log("\n=== Category Distribution ===\n")
  console.log("Category".padEnd(25) + "Count".padStart(6) + "  Status")
  console.log("-".repeat(45))

  let belowMinimum = 0
  for (const slug of VALID_SLUGS) {
    const count = counts[slug]
    const status = count >= MIN_PER_CATEGORY ? "OK" : `BELOW MIN (need ${MIN_PER_CATEGORY})`
    if (count < MIN_PER_CATEGORY) belowMinimum++
    console.log(`${slug.padEnd(25)}${String(count).padStart(6)}  ${status}`)
  }

  console.log("-".repeat(45))
  console.log(`${"TOTAL".padEnd(25)}${String(questions.length).padStart(6)}`)
  console.log()

  if (belowMinimum > 0) {
    console.log(`WARNING: ${belowMinimum} categories below minimum of ${MIN_PER_CATEGORY}`)
  }
}

function main(): void {
  const seedPath = resolve(__dirname, "../supabase/seed.sql")

  let content: string
  try {
    content = readFileSync(seedPath, "utf-8")
  } catch {
    console.error(`ERROR: Cannot read ${seedPath}`)
    process.exit(1)
  }

  console.log(`Validating: ${seedPath}\n`)

  const questions = parseSeedSql(content)
  console.log(`Parsed ${questions.length} INSERT statements`)

  const { errors } = validate(questions)

  printDistribution(questions)

  if (errors.length > 0) {
    console.log("\n=== Validation Errors ===\n")
    for (const err of errors) {
      console.log(`  ERROR: ${err}`)
    }
    console.log(`\n${errors.length} error(s) found`)
    process.exit(1)
  }

  const categoryCounts = new Map<string, number>()
  for (const q of questions) {
    categoryCounts.set(q.categorySlug, (categoryCounts.get(q.categorySlug) ?? 0) + 1)
  }
  for (const slug of VALID_SLUGS) {
    if ((categoryCounts.get(slug) ?? 0) < MIN_PER_CATEGORY) {
      console.error(`\nFAIL: Category '${slug}' has fewer than ${MIN_PER_CATEGORY} questions`)
      process.exit(1)
    }
  }

  console.log("\nAll validations passed!")
  process.exit(0)
}

main()
