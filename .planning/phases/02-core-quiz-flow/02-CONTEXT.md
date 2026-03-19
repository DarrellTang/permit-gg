# Phase 2: Core Quiz Flow - Context

**Gathered:** 2026-03-18
**Status:** Ready for planning

<domain>
## Phase Boundary

Practice quizzes and simulated DMV tests with immediate feedback, explanations, and post-quiz summaries. Users can take quick 10-20 question practice sessions and a 46-question simulated DMV test. Includes scoring, answer explanations, category breakdowns, and quiz history persistence. Does NOT include AI question variation (Phase 3), analytics dashboard (Phase 4), or spaced repetition (Phase 5). Questions served are from the static seed bank established in Phase 1.

</domain>

<decisions>
## Implementation Decisions

### Answer Feedback Experience
- Confirm-then-reveal: tap answer to select (highlight as selected), tap "Submit" to lock in, THEN green/red reveal + explanation
- Streak-scaled celebrations: intensity grows with streak length (1st correct = subtle particle burst + chime, 5+ = bigger burst, 10+ = full fireworks). Rewards consistency.
- Wrong answers are informative, not punishing: red highlight on wrong, green on correct, gentle shake, soft error tone. Explanation slides in immediately. Focus is on learning, not penalty.
- Explanations display inline — slide open below the question. She reads it, taps "Next" to continue. Stays on the same screen.
- Sound FX with mute toggle (carried from Phase 1 decision)

### Quiz Session Flow
- Smart default + config: tapping "Practice" starts immediately with 15 questions. Small gear icon allows changing count (10-20) before starting.
- XP-bar style progress: gaming-style bar that fills with correct answers, glows on streaks. Shows question count + streak counter.
- Auto-advance on correct answers after ~1.5s. Wrong answers require tapping "Next" (ensures she reads the explanation).
- Quit with confirmation: X button in corner, confirm dialog "Quit quiz? Your progress so far will be saved." Partial results count toward analytics.
- One question at a time — no peeking ahead or going back (practice mode)

### Post-Quiz Summary Screen
- Animated score reveal that counts up from 0 to final percentage, with a skip button for repeat runs
- Streak stats, best run in session, time taken included
- Wrong answer review as swipeable card carousel — each card shows question, her answer, correct answer, and explanation. Cyberpunk-styled flashcard feel.
- Category performance shown as a radar/spider chart with all 8 categories as axes. Visual shape of strengths/weaknesses. Gaming stats screen energy.
- Smart actions at bottom: "Try Again" (same mode) + "Drill [Weakest Category]" (auto-selects weakest from results) + "Back to Dashboard". Three paths, one is smart-recommended.

### Simulated DMV Test
- Subtle visual shift from practice: border color change + "SIM" badge. Same cyberpunk styling, different enough to feel official.
- No feedback during the test: no green/red, no explanations. Just "Answer recorded, next question." Full reveal only at the end. Matches real DMV experience.
- DMV letter-style pass/fail reveal: styled like the actual DMV results letter. "Your score: 40/46 (87%) — PASS". Official feel, then transitions to the detailed summary with radar chart and card carousel.
- 46 questions with realistic category distribution, pass at 83% (38/46)
- Flag-for-review: she can flag uncertain questions and review flagged ones at the end before final submission
- No going back to change already-submitted answers (only flagged questions can be revisited)

### Data Persistence
- All quiz results persisted to Supabase: score, per-question answers (correct/wrong + which option), timestamp, mode (practice/sim), completion status
- Partial quiz results saved on quit (for analytics accuracy)
- Quiz history queryable for post-quiz summary and future dashboard/analytics phases

### Claude's Discretion
- Exact animation timing and easing curves
- XP bar visual design details (glow color, fill speed)
- Card carousel swipe mechanics and animation
- Radar chart library choice and styling
- Loading states between questions
- Mobile touch target sizing for answer options
- Database schema for quiz sessions and answers

</decisions>

<specifics>
## Specific Ideas

- Streak-scaled celebrations tie into Goal-Gradient Effect — the more she gets right, the more the app rewards her
- Auto-advance on correct keeps momentum flowing; manual "Next" on wrong forces engagement with the explanation
- The radar chart on the summary screen doubles as a preview of what the full analytics dashboard will look like in Phase 4
- DMV letter-style result creates an emotional anchor — "this is what the real thing looks like"
- Flag-for-review mimics real standardized test behavior — teaches good test-taking strategy
- Use UI/UX Pro Max skill for all visual implementation
- Use marketing psychology (loss aversion on wrong answers, goal-gradient on streaks, endowment effect on progress)

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/ui/card.tsx` — Card component for quiz cards and summary cards
- `src/components/ui/button.tsx` — Button component for Submit, Next, actions
- `src/components/ui/badge.tsx` — Badge for SIM mode indicator, category labels
- `src/components/ui/tabs.tsx` — Tabs for summary screen sections
- `src/components/layout/app-shell.tsx` — Wraps quiz pages with sidebar/bottom nav
- `src/components/layout/page-transition.tsx` — Motion page transitions (can be adapted for question transitions)
- `src/lib/types/question.ts` — Zod schema for SeedQuestion type (question_text, correct_answer, wrong_answers, explanation, handbook_reference, category_id)
- `src/lib/supabase/server.ts` and `client.ts` — Supabase client factories
- `src/lib/constants/categories.ts` — Category definitions and slugs
- `src/hooks/use-media-query.ts` — SSR-safe media query hook for responsive behavior

### Established Patterns
- OKLCH color system with CSS variables (--neon-pink, --neon-purple, --neon-cyan)
- `html.dark` class for dark mode with `next-themes`
- shadcn/ui components with Tailwind utility classes
- Motion (framer-motion) for animations
- App Router with route groups: `(app)` for dashboard, `(marketing)` for landing

### Integration Points
- New routes needed: `(app)/practice/page.tsx`, `(app)/simulated-test/page.tsx`
- Sidebar nav already has links to `/practice` and `/simulated-test` (currently dead links)
- Supabase tables: `seed_questions` (read), new `quiz_sessions` and `quiz_answers` tables needed
- Dashboard placeholder cards ("Quick Practice", "Simulated Test") need to link to actual quiz pages

</code_context>

<deferred>
## Deferred Ideas

- None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-core-quiz-flow*
*Context gathered: 2026-03-18*
