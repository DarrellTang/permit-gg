# Phase 3: Analytics + Category Intelligence - Research

**Researched:** 2026-03-25
**Domain:** Data aggregation, dashboard visualization, category drill mode (Next.js + Supabase + Recharts)
**Confidence:** HIGH

## Summary

This phase transforms the existing placeholder dashboard into a data-driven analytics hub with category mastery scores, trend sparklines, a readiness prediction gauge, and category drill mode. The existing codebase has strong foundations: quiz_sessions and quiz_answers tables already store all needed data (user_id, question_id, is_correct, timestamps), the categories table defines all 8 CA DMV categories with weights, and Recharts v2.15 is already installed with shadcn/ui chart components.

The primary technical challenge is building efficient Supabase queries that aggregate per-user performance across all sessions, grouped by category. Two viable approaches exist: (1) Supabase PostgREST aggregate functions using `.count()`, `.avg()` etc. in select(), or (2) PostgreSQL RPC functions for complex multi-table aggregation. The RPC approach is recommended for the category mastery query because it requires joining quiz_answers with seed_questions (to get category_id) and grouping by category -- a query too complex for PostgREST's aggregate syntax alone. Sparklines and the readiness gauge can be built entirely with Recharts components already in the project.

**Primary recommendation:** Use a single PostgreSQL RPC function (`get_user_analytics`) that returns category mastery, per-session trend data, and missed question IDs in one call. Build the dashboard as a server component that fetches data via a server action calling the RPC, passing results to client chart components.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Single-page scrollable overview at `/dashboard` -- no separate Analytics page
- **D-02:** Remove or merge the sidebar "Analytics" link -- dashboard IS the analytics
- **D-03:** Visual hierarchy: readiness score hero at top, category mastery card grid below, recent quiz history at bottom
- **D-04:** Optimized for teens -- dense info is fine, but visual hierarchy ensures the most important metric (readiness) pops first
- **D-05:** Use UI/UX Pro Max skill during planning and implementation for design quality
- **D-06:** Card-per-category grid layout -- each card shows: category name, mastery %, mini sparkline (last 5-10 sessions), question count
- **D-07:** Tapping a category card enters drill mode for that category
- **D-08:** Color-coded mastery levels on cards (red/yellow/green spectrum)
- **D-09:** Encouraging circular gauge/ring with percentage, color shifts red-yellow-green as score improves
- **D-10:** Positive framing always -- below 50% says "Keep practicing!" not failure language
- **D-11:** Weighted recent performance algorithm -- recent sessions weighted more heavily, penalizes uncovered categories, mirrors real DMV category sampling
- **D-12:** Enter drill mode by tapping a category card on the dashboard -- no separate drill page
- **D-13:** Reuse existing practice quiz UI with a category filter applied
- **D-14:** Reuse existing slider picker for question count -- default 15, range 10-20, same as practice mode
- **D-15:** After drill completion, show existing summary page with mastery delta banner at top ("Signs: 60% -> 75% +15%")
- **D-16:** Per-session data points -- each quiz session is a data point on trend lines
- **D-17:** Mini sparklines on category cards showing last 5-10 sessions -- compact and glanceable
- **D-18:** Full trend chart available on detail view when tapping into a category

### Claude's Discretion
- Exact sparkline implementation (recharts mini chart vs custom SVG)
- Readiness score algorithm specifics (exact weighting formula)
- Category card grid responsive breakpoints
- Recent quiz history section design
- Empty state for users with no quiz data yet
- Mastery percentage calculation methodology

### Deferred Ideas (OUT OF SCOPE)
- AI question variations for weak categories -- Phase 4
- Spaced repetition scheduling -- Phase 5
- Flashcard mode -- Phase 5
- Missed question review sessions -- Phase 5
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| ANAL-02 | User has a persistent dashboard showing category mastery scores across all sessions | RPC function aggregates quiz_answers by category per user; dashboard page.tsx becomes server component fetching via server action |
| ANAL-03 | Dashboard shows trends over time (improving/declining per category) | RPC returns per-session scores ordered by date; Recharts LineChart sparklines render trend data on category cards |
| ANAL-04 | Dashboard highlights weakest categories with drill recommendations | Client-side sorting of category mastery data; weakest categories get visual emphasis and "Recommended" badge (pattern exists in smart-actions.tsx) |
| ANAL-05 | User sees a readiness prediction score ("X% likely to pass") | Weighted algorithm using category weights from CATEGORY_WEIGHTS, recent session performance, and category coverage; Recharts RadialBarChart for circular gauge |
| DRILL-01 | User can select a specific category and practice only questions from that category | New `selectCategoryQuestions()` query function filtering seed_questions by category_id; QuizShell extended with optional categorySlug prop |
| DRILL-02 | Analytics dashboard recommends which category to drill based on weakest areas | Sorted category mastery data drives recommendation; tapping weakest category card initiates drill |
| MISS-01 | System tracks all incorrectly answered questions per user | quiz_answers table already stores is_correct per answer with user_id; RPC function returns array of missed question IDs for the user |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Recharts | 2.15.x | All charts (sparklines, radar, radial gauge) | Already installed, compatible with shadcn/ui chart component |
| Supabase JS | 2.99.x | Data fetching, RPC calls | Already installed, RLS-scoped queries |
| Zustand | 5.0.x | Quiz state management for drill mode | Already used for quiz-store |
| Motion (Framer Motion) | 12.38.x | Dashboard animations, card interactions | Already used throughout app |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| shadcn/ui Card | installed | Category card containers | Dashboard category grid |
| shadcn/ui Chart | installed | ChartContainer, ChartTooltip wrappers | All Recharts visualizations |
| shadcn/ui Badge | installed | "Recommended", "Weakest" indicators | Category card badges |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Recharts sparklines | react-sparklines library | Would add a dependency; Recharts LineChart with hidden axes achieves the same result with zero new deps |
| PostgreSQL RPC | PostgREST aggregate functions | PostgREST aggregates can't do the multi-table join+group needed; RPC is more maintainable |
| Custom SVG gauge | Recharts RadialBarChart | RadialBarChart already available via shadcn/ui, handles the arc rendering and animation |

**Installation:** No new packages needed. Everything is already in the dependency tree.

## Architecture Patterns

### Recommended Project Structure
```
src/
  app/(app)/dashboard/
    page.tsx                    # Server component - fetches analytics data
  components/dashboard/
    readiness-gauge.tsx         # Circular RadialBarChart gauge (client)
    category-card.tsx           # Single category card with sparkline (client)
    category-grid.tsx           # Grid of category cards (client)
    category-sparkline.tsx      # Mini LineChart sparkline (client)
    quiz-history-list.tsx       # Recent quiz history section (client)
    empty-state.tsx             # No data yet state (client)
    mastery-delta-banner.tsx    # "Signs: 60% -> 75% (+15%)" banner (client)
  server/
    actions/analytics.ts        # Server actions for analytics data fetching
    db/queries/analytics.ts     # Supabase RPC wrappers
    db/queries/questions.ts     # Extended with selectCategoryQuestions()
  lib/
    utils/readiness.ts          # Readiness score calculation (pure function)
    utils/mastery.ts            # Category mastery computation helpers (pure)
    types/analytics.ts          # TypeScript types for analytics data
  supabase/migrations/
    00008_analytics_rpc.sql     # RPC function for user analytics
```

### Pattern 1: Server Component Dashboard with Client Chart Islands
**What:** Dashboard page.tsx is a server component that fetches all analytics data server-side, then passes it as props to client chart components.
**When to use:** For the main dashboard render -- avoids waterfalls, leverages RLS server-side.
**Example:**
```typescript
// src/app/(app)/dashboard/page.tsx (server component)
import { fetchUserAnalytics } from "@/server/actions/analytics"
import { ReadinessGauge } from "@/components/dashboard/readiness-gauge"
import { CategoryGrid } from "@/components/dashboard/category-grid"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return <EmptyState variant="unauthenticated" />
  }

  const analytics = await fetchUserAnalytics(user.id)

  if (!analytics || analytics.totalSessions === 0) {
    return <EmptyState variant="no-data" />
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-6 lg:p-8">
      <ReadinessGauge score={analytics.readinessScore} />
      <CategoryGrid categories={analytics.categories} />
      <QuizHistoryList sessions={analytics.recentSessions} />
    </div>
  )
}
```

### Pattern 2: PostgreSQL RPC for Aggregation
**What:** A single database function that returns all dashboard analytics in one round-trip.
**When to use:** For the dashboard data fetch -- reduces N+1 queries.
**Example:**
```sql
-- Migration: 00008_analytics_rpc.sql
CREATE OR REPLACE FUNCTION get_user_analytics(p_user_id UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'categories', (
      SELECT json_agg(cat_row)
      FROM (
        SELECT
          c.slug,
          c.name,
          c.weight,
          COUNT(CASE WHEN qa.is_correct THEN 1 END) AS correct,
          COUNT(qa.id) AS total,
          ROUND(
            COUNT(CASE WHEN qa.is_correct THEN 1 END)::numeric
            / NULLIF(COUNT(qa.id), 0) * 100
          ) AS mastery_pct
        FROM categories c
        LEFT JOIN seed_questions sq ON sq.category_id = c.id
        LEFT JOIN quiz_answers qa ON qa.question_id = sq.id
          AND qa.user_id = p_user_id
        GROUP BY c.slug, c.name, c.weight, c.sort_order
        ORDER BY c.sort_order
      ) cat_row
    ),
    'session_trends', (
      SELECT json_agg(trend_row)
      FROM (
        SELECT
          qs.id AS session_id,
          qs.mode,
          qs.score,
          qs.total,
          qs.started_at,
          ROUND(qs.score::numeric / NULLIF(qs.total, 0) * 100) AS percentage
        FROM quiz_sessions qs
        WHERE qs.user_id = p_user_id AND qs.is_complete = true
        ORDER BY qs.started_at DESC
        LIMIT 20
      ) trend_row
    ),
    'missed_question_ids', (
      SELECT json_agg(DISTINCT qa.question_id)
      FROM quiz_answers qa
      WHERE qa.user_id = p_user_id AND qa.is_correct = false
        AND qa.question_id NOT IN (
          SELECT qa2.question_id FROM quiz_answers qa2
          WHERE qa2.user_id = p_user_id AND qa2.is_correct = true
          AND qa2.answered_at > qa.answered_at
        )
    ),
    'total_sessions', (
      SELECT COUNT(*) FROM quiz_sessions
      WHERE user_id = p_user_id AND is_complete = true
    )
  ) INTO result;

  RETURN result;
END;
$$;
```

### Pattern 3: Sparkline with Recharts (No Axes)
**What:** Minimal Recharts LineChart with all decoration removed for compact sparkline display.
**When to use:** Category cards showing last 5-10 session trends.
**Recommendation (Claude's Discretion):** Use Recharts LineChart -- no new dependency, consistent with existing chart infrastructure.
**Example:**
```typescript
// src/components/dashboard/category-sparkline.tsx
"use client"
import { LineChart, Line, ResponsiveContainer } from "recharts"

interface SparklineProps {
  data: { value: number }[]
  color?: string
}

export function CategorySparkline({ data, color = "var(--neon-cyan)" }: SparklineProps) {
  if (data.length < 2) return null

  return (
    <ResponsiveContainer width="100%" height={32}>
      <LineChart data={data}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={1.5}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
```

### Pattern 4: Radial Gauge for Readiness Score
**What:** Recharts RadialBarChart configured as a semi-circular or ring gauge showing readiness percentage.
**When to use:** Hero section at top of dashboard.
**Example:**
```typescript
"use client"
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

interface ReadinessGaugeProps {
  score: number // 0-100
}

export function ReadinessGauge({ score }: ReadinessGaugeProps) {
  const color = score >= 83 ? "var(--neon-cyan)" : score >= 60 ? "var(--neon-purple)" : "var(--neon-pink)"
  const data = [{ value: score, fill: color }]

  return (
    <ChartContainer config={{ score: { label: "Readiness", color } }}>
      <RadialBarChart
        innerRadius="80%"
        outerRadius="100%"
        data={data}
        startAngle={180}
        endAngle={0}
      >
        <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
        <RadialBar
          dataKey="value"
          background={{ fill: "var(--surface-container-low)" }}
          cornerRadius={10}
        />
      </RadialBarChart>
    </ChartContainer>
  )
}
```

### Pattern 5: Category Drill Mode via QuizShell Extension
**What:** Extend existing QuizShell and fetchQuestions to accept an optional categorySlug filter.
**When to use:** When user taps a category card to drill that specific category.
**Example:**
```typescript
// Extension to src/server/db/queries/questions.ts
export async function selectCategoryQuestions(
  supabase: SupabaseClient,
  categorySlug: string,
  count: number = 15
): Promise<PreparedQuestion[]> {
  const { data, error } = await supabase
    .from("seed_questions")
    .select("*, categories!inner(slug, name)")
    .eq("categories.slug", categorySlug)
    .limit(count * 2)
    .order("id")

  if (error) throw error
  const shuffled = shuffleArray(data as SeedQuestionRow[])
  return shuffled.slice(0, count).map(toPreparedQuestion)
}
```

### Pattern 6: Mastery Delta Banner (Post-Drill)
**What:** After completing a drill session, show the before/after mastery change for that category.
**When to use:** On the summary page when the mode is "drill".
**Example:**
```typescript
// The drill flow stores pre-drill mastery in sessionStorage before starting
// After drill completion, summary page compares stored value with new mastery
interface MasteryDelta {
  categoryName: string
  before: number
  after: number
  delta: number
}
```

### Anti-Patterns to Avoid
- **Client-side aggregation of all quiz history:** Do NOT fetch all quiz_answers to the client and compute mastery there. With hundreds of sessions, this becomes expensive. Aggregate in PostgreSQL.
- **Separate API call per category:** Do NOT make 8 separate queries (one per category). Use a single RPC call that returns all categories at once.
- **Storing computed mastery in a separate table:** Do NOT create a materialized mastery table. The dataset size (hundreds of sessions, not millions) doesn't justify the complexity. Compute on read.
- **Creating a separate `/drill` route:** Per D-12, drill mode uses `/practice` route with a category parameter, reusing QuizShell.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Sparkline charts | Custom SVG path calculation | Recharts LineChart (no axes) | Edge cases: responsive sizing, retina rendering, animation |
| Circular gauge | Custom SVG arc math | Recharts RadialBarChart | Arc calculation, background track, corner radius -- all handled |
| Category aggregation | Client-side reduce over all answers | PostgreSQL RPC function | Performance at scale, correct user scoping via RLS, single round-trip |
| Color interpolation | Manual HSL calculation for red-yellow-green | CSS clamp + Tailwind conditional classes | Simpler, more maintainable, theme-consistent |
| Trend direction detection | Custom moving average algorithm | Simple comparison: last 3 sessions avg vs previous 3 | Good enough for dashboard context, avoids stats library dependency |

**Key insight:** The project already has Recharts v2.15 and shadcn/ui Chart -- every visualization can be built with existing dependencies. No new packages needed.

## Common Pitfalls

### Pitfall 1: Empty State Handling
**What goes wrong:** Dashboard crashes or shows confusing data when user has 0, 1, or 2 sessions.
**Why it happens:** Sparklines need 2+ data points, percentage calculations divide by zero, readiness algorithm has no data.
**How to avoid:** Explicit empty state component for 0 sessions. Sparkline component returns null for < 2 data points. Readiness shows "--%" with encouraging message until 3+ sessions.
**Warning signs:** NaN or Infinity appearing in the UI, blank chart areas.

### Pitfall 2: RLS Scope for Analytics Query
**What goes wrong:** RPC function runs as `SECURITY DEFINER` which bypasses RLS, potentially exposing other users' data.
**Why it happens:** PostgreSQL functions with SECURITY DEFINER run as the function owner, not the calling user.
**How to avoid:** Always pass user_id as a parameter to the RPC function and filter by it explicitly in every query within the function. Never trust the calling context. Alternatively, use `SECURITY INVOKER` but then the function can only access data the user's RLS policies allow.
**Warning signs:** Analytics showing data from multiple users.

### Pitfall 3: Recharts v2 vs v3 API Confusion
**What goes wrong:** Using Recharts v3 API patterns that don't exist in v2.15.
**Why it happens:** Most current documentation/examples target Recharts v3. The project is pinned to v2.15 for shadcn compatibility.
**How to avoid:** Only reference Recharts v2 API. Key differences: v2 uses `<ResponsiveContainer>` wrapper (v3 has built-in responsive), v2 uses `isAnimationActive` prop, v2 doesn't have `accessibilityLayer`.
**Warning signs:** TypeScript errors about unknown props, runtime "is not a function" errors.

### Pitfall 4: Category Coverage Penalty in Readiness Score
**What goes wrong:** User scores 100% in 2 categories but 0% overall readiness because 6 categories are untouched.
**Why it happens:** Naive average treats uncovered categories as 0%.
**How to avoid:** Per D-11, uncovered categories should penalize the readiness score but not catastrophically. Use the category weights from CATEGORY_WEIGHTS -- uncovered categories contribute 0 weighted score, pulling the average down proportionally to their weight. This naturally mirrors the DMV test's category sampling.
**Warning signs:** User with 100% accuracy on practiced categories seeing a surprisingly low readiness score.

### Pitfall 5: Drill Mode Session Saving with Wrong Mode
**What goes wrong:** Drill sessions saved as mode="practice" making them indistinguishable from regular practice.
**Why it happens:** QuizShell defaults mode to "practice".
**How to avoid:** Add "drill" to the QuizMode type. When saving drill results, use mode="drill" and include the category_slug. Alternatively, keep mode="practice" and add a `category_slug` column to quiz_sessions -- this is simpler and doesn't require updating the mode CHECK constraint.
**Warning signs:** Dashboard analytics can't distinguish drill sessions from mixed practice sessions.

### Pitfall 6: Navigation -- Sidebar Analytics Link Collision
**What goes wrong:** Sidebar has an "Analytics" link pointing to `/analytics` which doesn't exist. Dashboard is at `/dashboard`.
**Why it happens:** The sidebar was built anticipating a separate analytics page.
**How to avoid:** Per D-02, update sidebar NAV_ITEMS and bottom-tabs TAB_ITEMS to remove the separate "Analytics" entry or redirect it to `/dashboard`. The dashboard IS the analytics.
**Warning signs:** 404 errors when clicking Analytics in sidebar or bottom tabs.

## Code Examples

### Server Action for Analytics Data
```typescript
// src/server/actions/analytics.ts
"use server"

import { createClient } from "@/lib/supabase/server"
import type { UserAnalytics } from "@/lib/types/analytics"

export async function fetchUserAnalytics(): Promise<UserAnalytics | null> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data, error } = await supabase.rpc("get_user_analytics", {
    p_user_id: user.id,
  })

  if (error) throw error
  return data as UserAnalytics
}
```

### Readiness Score Algorithm (Claude's Discretion -- Recommendation)
```typescript
// src/lib/utils/readiness.ts
import { CATEGORY_WEIGHTS } from "@/lib/types/question"
import type { CategoryMastery } from "@/lib/types/analytics"

export function computeReadinessScore(categories: CategoryMastery[]): number {
  const categoryMap = new Map(categories.map(c => [c.slug, c]))
  let weightedSum = 0
  let totalWeight = 0

  for (const [slug, weight] of Object.entries(CATEGORY_WEIGHTS)) {
    const cat = categoryMap.get(slug)
    totalWeight += weight

    if (!cat || cat.total === 0) {
      // Uncovered category: contributes 0 to weighted sum
      continue
    }

    // Recent performance weighting: last 3 sessions count 2x
    const recentMastery = cat.recentMastery ?? cat.masteryPct
    const blended = (recentMastery * 0.6) + (cat.masteryPct * 0.4)

    weightedSum += blended * weight
  }

  return totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0
}

export function getReadinessMessage(score: number): string {
  if (score >= 90) return "You're ready! Go ace that test!"
  if (score >= 83) return "Looking good! Almost test-ready!"
  if (score >= 70) return "Great progress! Keep it up!"
  if (score >= 50) return "You're getting there! Keep practicing!"
  return "Keep practicing! Every session helps!"
}
```

### Color-Coded Mastery Level
```typescript
// Mastery color utility (used by category cards and gauge)
export function getMasteryColor(percentage: number): string {
  if (percentage >= 83) return "var(--neon-cyan)"    // green/pass
  if (percentage >= 60) return "var(--neon-purple)"  // yellow/ok
  return "var(--neon-pink)"                          // red/needs work
}

export function getMasteryLevel(percentage: number): "strong" | "moderate" | "weak" {
  if (percentage >= 83) return "strong"
  if (percentage >= 60) return "moderate"
  return "weak"
}
```

### Extended fetchQuestions for Drill Mode
```typescript
// Extension to src/server/actions/quiz.ts
export async function fetchQuestions(
  mode: QuizMode,
  count?: number,
  categorySlug?: string
): Promise<PreparedQuestion[]> {
  const supabase = await createClient()

  if (mode === "sim") {
    return selectSimQuestions(supabase)
  }

  if (categorySlug) {
    return selectCategoryQuestions(supabase, categorySlug, count)
  }

  return selectPracticeQuestions(supabase, count)
}
```

### Per-Category Session Trend Data for Sparklines
```sql
-- Part of the RPC function or a separate query
-- Returns last 10 session scores for each category for sparklines
SELECT
  c.slug AS category_slug,
  json_agg(
    json_build_object('session_id', qs.id, 'pct', session_cat.pct, 'date', qs.started_at)
    ORDER BY qs.started_at DESC
  ) AS trend_data
FROM categories c
CROSS JOIN LATERAL (
  SELECT DISTINCT ON (qs.id)
    qs.id,
    qs.started_at,
    ROUND(
      COUNT(CASE WHEN qa.is_correct THEN 1 END) FILTER (WHERE sq.category_id = c.id)::numeric
      / NULLIF(COUNT(qa.id) FILTER (WHERE sq.category_id = c.id), 0) * 100
    ) AS pct
  FROM quiz_sessions qs
  JOIN quiz_answers qa ON qa.session_id = qs.id
  JOIN seed_questions sq ON sq.id = qa.question_id
  WHERE qs.user_id = p_user_id
    AND qs.is_complete = true
    AND sq.category_id = c.id
  GROUP BY qs.id, qs.started_at
  ORDER BY qs.id, qs.started_at DESC
  LIMIT 10
) session_cat ON true
GROUP BY c.slug;
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Recharts v3 with built-in responsive | Recharts v2.15 with ResponsiveContainer wrapper | Project locked to v2.15 | Must use ResponsiveContainer for all charts |
| Supabase aggregate functions in select() | PostgreSQL RPC for complex aggregation | PostgREST aggregates are available but limited for multi-table joins | RPC function is cleaner for this use case |
| Separate analytics page | Dashboard IS analytics (D-01, D-02) | Phase 3 design decision | Remove /analytics nav entries, consolidate to /dashboard |

**Deprecated/outdated:**
- The existing `/analytics` nav entry in sidebar.tsx and bottom-tabs.tsx: Will be removed per D-02
- The placeholder dashboard page.tsx: Will be fully replaced with analytics dashboard

## Open Questions

1. **Category trend data granularity for sparklines**
   - What we know: Per D-16, each session is a data point. D-17 says show last 5-10 sessions.
   - What's unclear: Should a session that only covered 3 out of 8 categories show as a data point for the untouched categories?
   - Recommendation: Only include sessions where the user answered at least 1 question in that category. This avoids artificial "0%" gaps in sparklines for categories not covered in a given session.

2. **Drill mode: separate QuizMode or metadata on "practice"?**
   - What we know: D-13 says "reuse existing practice quiz UI with category filter applied"
   - What's unclear: Whether to add "drill" to QuizMode enum or keep it as "practice" with a category_slug parameter.
   - Recommendation: Add a `category_slug` nullable column to `quiz_sessions` table. Keep mode as "practice" for drill sessions. This avoids updating the mode CHECK constraint and all mode-dependent logic. The presence of category_slug distinguishes drill from mixed practice.

3. **Missed questions definition for MISS-01**
   - What we know: MISS-01 says "System tracks all incorrectly answered questions per user."
   - What's unclear: Does a question leave the "missed" set when answered correctly in a subsequent session?
   - Recommendation: For Phase 3, simply track all questions ever answered incorrectly. Phase 5 (MISS-02, MISS-03) handles the "leave the pool once correct" logic. Phase 3 just needs the storage -- which already exists in quiz_answers.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 4.1.x |
| Config file | `vitest.config.mts` |
| Quick run command | `npx vitest run --reporter=verbose` |
| Full suite command | `npx vitest run` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| ANAL-02 | Category mastery aggregation returns correct percentages | unit | `npx vitest run tests/analytics-mastery.test.ts -t "mastery" --reporter=verbose` | No -- Wave 0 |
| ANAL-03 | Trend data contains per-session data points | unit | `npx vitest run tests/analytics-mastery.test.ts -t "trend" --reporter=verbose` | No -- Wave 0 |
| ANAL-04 | Weakest category identification is correct | unit | `npx vitest run tests/analytics-mastery.test.ts -t "weakest" --reporter=verbose` | No -- Wave 0 |
| ANAL-05 | Readiness score calculation with weighted categories | unit | `npx vitest run tests/readiness.test.ts --reporter=verbose` | No -- Wave 0 |
| DRILL-01 | Category question selection filters correctly | unit | `npx vitest run tests/category-questions.test.ts --reporter=verbose` | No -- Wave 0 |
| DRILL-02 | Dashboard recommendation matches weakest category | unit | `npx vitest run tests/analytics-mastery.test.ts -t "recommendation" --reporter=verbose` | No -- Wave 0 |
| MISS-01 | Missed question tracking returns incorrect answers | unit | `npx vitest run tests/analytics-mastery.test.ts -t "missed" --reporter=verbose` | No -- Wave 0 |

### Sampling Rate
- **Per task commit:** `npx vitest run --reporter=verbose`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `tests/readiness.test.ts` -- covers ANAL-05 readiness computation (pure function, no DB)
- [ ] `tests/analytics-mastery.test.ts` -- covers ANAL-02, ANAL-03, ANAL-04, DRILL-02, MISS-01 (pure function tests for mastery computation, trend extraction, weakest identification)
- [ ] `tests/category-questions.test.ts` -- covers DRILL-01 (test the filtering logic)

## Sources

### Primary (HIGH confidence)
- Codebase analysis: `src/server/actions/quiz.ts`, `src/hooks/use-quiz.ts`, `src/stores/quiz-store.ts`, `src/components/quiz/quiz-shell.tsx` -- established patterns for quiz flow
- Codebase analysis: `supabase/migrations/00004-00007` -- complete schema for quiz_sessions, quiz_answers with user_id and RLS
- Codebase analysis: `src/components/ui/chart.tsx`, `src/components/summary/category-radar.tsx` -- existing Recharts v2.15 patterns with shadcn/ui
- Codebase analysis: `src/lib/constants/categories.ts`, `src/lib/types/question.ts` -- CATEGORY_WEIGHTS used for DMV category distribution
- Codebase analysis: `src/components/layout/sidebar.tsx`, `src/components/layout/bottom-tabs.tsx` -- current nav structure with /analytics entries
- [Supabase PostgREST Aggregate Functions blog](https://supabase.com/blog/postgrest-aggregate-functions) -- enabling and using `.count()`, `.avg()` etc.

### Secondary (MEDIUM confidence)
- [shadcn/ui Radial Charts](https://ui.shadcn.com/charts/radial) -- RadialBarChart patterns for gauge
- [shadcn/ui Chart docs](https://ui.shadcn.com/docs/components/chart) -- ChartConfig and ChartContainer usage
- [Supabase Database Functions docs](https://supabase.com/docs/guides/database/functions) -- RPC function creation pattern

### Tertiary (LOW confidence)
- None -- all findings verified against codebase or official documentation

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - all libraries already installed and verified in codebase
- Architecture: HIGH - patterns directly derived from existing quiz flow code
- Data aggregation approach: HIGH - verified Supabase RPC pattern against official docs
- Chart patterns: HIGH - Recharts v2.15 API verified against existing category-radar.tsx usage
- Pitfalls: HIGH - derived from actual codebase constraints (v2 vs v3, RLS policies, nav structure)

**Research date:** 2026-03-25
**Valid until:** 2026-04-25 (stable -- no fast-moving dependencies)
