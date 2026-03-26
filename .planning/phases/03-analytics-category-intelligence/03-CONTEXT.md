# Phase 3: Analytics + Category Intelligence - Context

**Gathered:** 2026-03-25
**Status:** Ready for planning

<domain>
## Phase Boundary

Users can see exactly where they are strong and weak, with data-driven recommendations that connect insight to targeted practice. Persistent dashboard with category mastery scores, trend lines, drill mode for specific categories, and a readiness prediction score. Does NOT include AI question variation, spaced repetition, or flashcards — those are Phases 4 and 5.

</domain>

<decisions>
## Implementation Decisions

### Dashboard Layout
- **D-01:** Single-page scrollable overview at `/dashboard` — no separate Analytics page
- **D-02:** Remove or merge the sidebar "Analytics" link — dashboard IS the analytics
- **D-03:** Visual hierarchy: readiness score hero at top, category mastery card grid below, recent quiz history at bottom
- **D-04:** Optimized for teens — dense info is fine, but visual hierarchy ensures the most important metric (readiness) pops first
- **D-05:** Use UI/UX Pro Max skill during planning and implementation for design quality

### Category Display
- **D-06:** Card-per-category grid layout — each card shows: category name, mastery %, mini sparkline (last 5-10 sessions), question count
- **D-07:** Tapping a category card enters drill mode for that category
- **D-08:** Color-coded mastery levels on cards (red/yellow/green spectrum)

### Readiness Score
- **D-09:** Encouraging circular gauge/ring with percentage, color shifts red→yellow→green as score improves
- **D-10:** Positive framing always — below 50% says "Keep practicing!" not failure language
- **D-11:** Weighted recent performance algorithm — recent sessions weighted more heavily, penalizes uncovered categories, mirrors real DMV category sampling

### Category Drill Mode
- **D-12:** Enter drill mode by tapping a category card on the dashboard — no separate drill page
- **D-13:** Reuse existing practice quiz UI with a category filter applied
- **D-14:** Reuse existing slider picker for question count — default 15, range 10-20, same as practice mode
- **D-15:** After drill completion, show existing summary page with mastery delta banner at top ("Signs: 60% → 75% +15%")

### Trend Visualization
- **D-16:** Per-session data points — each quiz session is a data point on trend lines
- **D-17:** Mini sparklines on category cards showing last 5-10 sessions — compact and glanceable
- **D-18:** ~~Full trend chart available on detail view when tapping into a category~~ **DEFERRED** — D-07/D-12 take precedence (tapping a category card enters drill mode, not a detail view). A dedicated category detail page with full trend chart is future work, possibly a long-press or secondary interaction pattern. The sparkline on the card (D-17) provides the trend signal for now.

### Claude's Discretion
- Exact sparkline implementation (recharts mini chart vs custom SVG)
- Readiness score algorithm specifics (exact weighting formula)
- Category card grid responsive breakpoints
- Recent quiz history section design
- Empty state for users with no quiz data yet
- Mastery percentage calculation methodology

</decisions>

<canonical_refs>
## Canonical References

No external specs — requirements fully captured in decisions above and REQUIREMENTS.md (ANAL-02 through ANAL-05, DRILL-01, DRILL-02, MISS-01).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/summary/category-radar.tsx` — Radar chart for category breakdown, used in post-quiz summary. Can be reused or adapted for dashboard.
- `src/components/ui/chart.tsx` — shadcn/ui chart component (recharts-based). Foundation for sparklines and trend charts.
- `src/components/ui/card.tsx` — Card component with shadow/rounded variants. Base for category cards.
- `src/components/summary/score-reveal.tsx` — Animated score reveal. Could inform readiness gauge animation.
- `src/components/summary/smart-actions.tsx` — "Drill Speed Limits" recommendation component. Pattern for drill recommendations.
- `src/hooks/use-quiz.ts` — Quiz state management hook. Drill mode will need a category filter parameter.
- `src/components/quiz/quiz-shell.tsx` — Quiz container component. Drill mode reuses this with category filtering.

### Established Patterns
- Zustand for client state management (quiz store)
- Supabase server actions for data fetching (`src/server/actions/quiz.ts`)
- User-scoped RLS on quiz_sessions and quiz_answers tables
- PostHog events already track `answer_submitted` with `category_slug` and `is_correct`
- Cyberpunk dark theme with neon accents (Tailwind + custom CSS variables)

### Integration Points
- `/dashboard` route already exists as placeholder — replace with analytics dashboard
- Sidebar navigation already has Dashboard entry — active state works
- `quiz_sessions` and `quiz_answers` tables have all needed data (scores, categories, timestamps, user_id)
- Practice quiz slider picker component can be reused for drill session length

</code_context>

<specifics>
## Specific Ideas

- Mastery delta banner after drill completion — "Signs: 60% → 75% (+15%)" — gives the dopamine hit of seeing progress
- Readiness gauge should feel motivating, not judgmental — teens need encouragement
- Category cards should be tappable/interactive — the dashboard is a launchpad for practice, not just a report

</specifics>

<deferred>
## Deferred Ideas

- AI question variations for weak categories — Phase 4
- Spaced repetition scheduling — Phase 5
- Flashcard mode — Phase 5
- Missed question review sessions — Phase 5
- D-18: Full trend chart on category detail view — future work (D-07/D-12 use tap for drill mode; sparklines on cards cover trend signal for now)

</deferred>

---

*Phase: 03-analytics-category-intelligence*
*Context gathered: 2026-03-25*
