---
phase: 02-core-quiz-flow
plan: 01
subsystem: quiz-engine
tags: [zustand, zod, supabase, quiz-state-machine, fisher-yates, category-distribution]

requires:
  - phase: 01-foundation
    provides: SeedQuestion types, CATEGORY_WEIGHTS, Supabase client, seed_questions table
provides:
  - QuizMode, AnswerState, QuizAnswer, QuizSessionResult, PreparedQuestion, SaveQuizResultsInput types
  - DMV_CONFIG, PRACTICE_DEFAULTS, CELEBRATION_TIERS, AUTO_ADVANCE_DELAY_MS constants
  - quiz_sessions and quiz_answers DB tables with RLS
  - Zustand quiz store with full state machine (useQuizStore)
  - selectPracticeQuestions and selectSimQuestions query functions
  - Wave 0 test suite (27 tests across 3 files)
affects: [02-02-PLAN, 02-03-PLAN, 02-04-PLAN, analytics, persistence]

tech-stack:
  added: [zustand, recharts, canvas-confetti, use-sound, "@types/canvas-confetti"]
  patterns: [zustand-store-with-actions, fisher-yates-shuffle, floor-then-distribute-remainder]

key-files:
  created:
    - src/lib/types/quiz.ts
    - src/lib/constants/quiz-config.ts
    - supabase/migrations/00004_create_quiz_tables.sql
    - src/stores/quiz-store.ts
    - src/server/db/queries/questions.ts
    - tests/quiz-store.test.ts
    - tests/question-selection.test.ts
    - tests/quiz-persistence.test.ts
    - tests/quiz-types.test.ts
  modified:
    - package.json
    - package-lock.json

key-decisions:
  - "Used floor-then-distribute-remainder for sim question allocation instead of Math.round to guarantee exactly 46 questions"
  - "Sim mode auto-advances on submitAnswer (no reveal state) vs practice mode which transitions to revealed"
  - "PreparedQuestion pre-shuffles answer options at load time to avoid shuffle-in-render-path pitfall"

patterns-established:
  - "Zustand store actions enforce state machine transitions (idle -> selected -> submitted -> revealed)"
  - "Question selection transforms raw DB rows to PreparedQuestion shape at query boundary"
  - "Fisher-Yates shuffle used consistently for both question order and answer option randomization"

requirements-completed: [QUIZ-01, QUIZ-02, QUIZ-03, SIM-01, SIM-02, SIM-03, SIM-04, ANAL-06]

duration: 5min
completed: 2026-03-19
---

# Phase 2 Plan 01: Quiz Engine Foundation Summary

**Zustand quiz state machine with practice/sim modes, weighted category question selection, Zod persistence contracts, and 27-test Wave 0 suite**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-19T03:02:33Z
- **Completed:** 2026-03-19T03:07:45Z
- **Tasks:** 3
- **Files modified:** 11

## Accomplishments
- Full type contract layer: QuizMode, AnswerState, QuizAnswer, QuizSessionResult, PreparedQuestion, SaveQuizResultsInput (Zod validated)
- Zustand quiz store implementing complete state machine for both practice (with reveal) and sim (auto-advance) modes with scoring, streaks, flagging, and forward-only navigation
- Question selection service with weighted category distribution for sim mode (exactly 46 questions) and random selection for practice
- Database migration for quiz_sessions and quiz_answers tables with indexes and open RLS
- 27 passing tests covering store initialization, state transitions, scoring, streaks, navigation enforcement, category distribution, answer shuffling, and schema validation

## Task Commits

Each task was committed atomically:

1. **Task 1: Type contracts, quiz config constants, and DB migration** - `1f3f6f5` (feat)
2. **Task 2: Zustand quiz store and question selection service** - `c959f66` (feat)
3. **Task 3: Wave 0 test scaffolds** - `de1b35a` (feat)

## Files Created/Modified
- `src/lib/types/quiz.ts` - QuizMode, AnswerState, QuizAnswer, QuizSessionResult, PreparedQuestion, SaveQuizResultsInput types
- `src/lib/constants/quiz-config.ts` - DMV_CONFIG (46 questions, 38 passing, 0.83%), PRACTICE_DEFAULTS, CELEBRATION_TIERS, AUTO_ADVANCE_DELAY_MS
- `supabase/migrations/00004_create_quiz_tables.sql` - quiz_sessions and quiz_answers tables with indexes and RLS
- `src/stores/quiz-store.ts` - Zustand store with initSession, selectAnswer, submitAnswer, nextQuestion, flag/unflag, complete/quit, reset
- `src/server/db/queries/questions.ts` - selectPracticeQuestions (random N), selectSimQuestions (weighted 46), Fisher-Yates shuffle, toPreparedQuestion transformer
- `tests/quiz-store.test.ts` - 15 tests: init, navigation, state machine, scoring, streaks, pass threshold, reset, flagging
- `tests/question-selection.test.ts` - 5 tests: count verification, PreparedQuestion shape, sim distribution, shuffled options
- `tests/quiz-persistence.test.ts` - 7 tests: Zod schema validation, rejection of invalid inputs, partial results support
- `tests/quiz-types.test.ts` - 7 tests: type exports, config values, celebration tiers

## Decisions Made
- Used `Math.floor` + fractional remainder distribution instead of `Math.round` for sim question allocation. `Math.round(46 * weight)` summed to 48 for the 8 categories, causing over-allocation. The floor-then-distribute approach guarantees exactly 46.
- Sim mode submitAnswer auto-advances to next question (resets answerState to idle, increments currentIndex) instead of transitioning to "revealed" state. This matches the real DMV test experience where no feedback is given during the test.
- PreparedQuestion shuffles answer options once at query time (Fisher-Yates) rather than on each render, following research pitfall #3.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed sim question over-allocation with floor+remainder distribution**
- **Found during:** Task 2 (question selection)
- **Issue:** Math.round on each category weight produced a sum of 48 (not 46) due to rounding up
- **Fix:** Switched to Math.floor for base allocation, then distributed the remainder (2) to categories with largest fractional parts
- **Files modified:** src/server/db/queries/questions.ts
- **Verification:** selectSimQuestions test now returns exactly 46 with correct distribution
- **Committed in:** c959f66 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Essential for correctness. No scope creep.

## Issues Encountered
None beyond the rounding issue documented above.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All type contracts, constants, and store are ready for Plan 02-02 (Practice Quiz UI)
- Quiz store exports all actions needed by UI components
- Question selection service ready to be called from server actions
- Migration SQL ready to apply to Supabase

## Self-Check: PASSED

All 9 created files verified present. All 3 task commits verified in git log.

---
*Phase: 02-core-quiz-flow*
*Completed: 2026-03-19*
