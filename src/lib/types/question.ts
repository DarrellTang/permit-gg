import { z } from "zod"

export const CategorySlug = z.enum([
  "road-signs",
  "right-of-way",
  "traffic-laws",
  "speed-limits",
  "dui-drug-laws",
  "safe-driving",
  "parking",
  "sharing-the-road",
])
export type CategorySlug = z.infer<typeof CategorySlug>

export const SeedQuestionSchema = z.object({
  id: z.string().uuid(),
  category_id: z.string().uuid(),
  question_text: z.string().min(10),
  correct_answer: z.string().min(1),
  wrong_answers: z.array(z.string().min(1)).length(3),
  explanation: z.string().min(10),
  handbook_reference: z.string().min(1),
  source: z.string().default("manual"),
})
export type SeedQuestion = z.infer<typeof SeedQuestionSchema>

export const CATEGORY_WEIGHTS: Record<CategorySlug, number> = {
  "road-signs": 0.15,
  "right-of-way": 0.15,
  "traffic-laws": 0.15,
  "speed-limits": 0.10,
  "dui-drug-laws": 0.10,
  "safe-driving": 0.15,
  "parking": 0.10,
  "sharing-the-road": 0.10,
}

export const MIN_QUESTIONS_PER_CATEGORY = 25
export const TARGET_TOTAL_QUESTIONS = 300
