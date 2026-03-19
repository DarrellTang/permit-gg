---
phase: 02-core-quiz-flow
plan: 03
subsystem: quiz-sim
tags: [zustand, motion, flag-review, dmv-result-letter, sim-mode, quiz-shell]

requires:
  - phase: 02-core-quiz-flow
    provides: QuizShell with mode prop, useQuiz orchestration hook, quiz store with flag/unflag/review actions, server actions for fetch/save
  - phase: 01-foundation
    provides: Card/Button/Badge UI components, app-shell layout, Supabase client
provides:
  - Simulated DMV test mode at /simulated-test with 46 weighted-distribution questions
  - Flag-for-review toggle button with visual state (flagged/unflagged)
  - Flagged question review screen with navigable grid and submit-test flow
  - DMV letter-style pass/fail result component with animation
  - Sim-specific quiz-shell behavior (no feedback, SIM badge, purple border, answer-recorded toast)
  - navigateToFlagged, submitFlaggedAnswer, returnToReview store actions
  - 7 new sim-specific tests (5 quiz-store + 2 question-selection)
affects: [02-04-PLAN, analytics, dashboard]

tech-stack:
  added: []
  patterns: [flagged-review-navigation, sim-no-reveal-auto-advance, dmv-letter-reveal-animation]

key-files:
  created:
    - src/components/quiz/flag-button.tsx
    - src/components/quiz/flagged-review.tsx
    - src/components/summary/dmv-result-letter.tsx
    - src/app/(app)/simulated-test/page.tsx
    - src/app/(app)/simulated-test/summary/page.tsx
  modified:
    - src/components/quiz/quiz-shell.tsx
    - src/components/quiz/question-card.tsx
    - src/stores/quiz-store.ts
    - src/hooks/use-quiz.ts
    - src/app/(app)/dashboard/page.tsx
    - tests/quiz-store.test.ts
    - tests/question-selection.test.ts

key-decisions:
  - "Flagged review uses navigateToFlagged store action that validates index is in flaggedIndices before navigation"
  - "submitFlaggedAnswer replaces existing answer in-place and adjusts score delta rather than appending duplicate"
  - "Sim summary page reads score from Zustand store (populated during quiz) until Plan 04 wires server-side session fetch"

patterns-established:
  - "Sim mode auto-advances immediately on submit with no reveal state -- answerState goes idle -> selected -> idle"
  - "FlaggedReview screen is a separate render path in quiz-shell, shown when reviewingFlagged is true"
  - "DMV result letter uses staggered motion animations with letter slide-up and delayed PASS/FAIL badge scale-in"

requirements-completed: [SIM-01, SIM-02, SIM-03, SIM-04]

duration: 5min
completed: 2026-03-19
---

# Phase 2 Plan 03: Simulated DMV Test Summary

**Sim mode with flag-for-review, no-feedback-during-test, flagged question review screen, and DMV letter-style pass/fail result at 83% threshold**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-19T03:22:17Z
- **Completed:** 2026-03-19T03:27:30Z
- **Tasks:** 3
- **Files modified:** 12

## Accomplishments
- Full sim mode behavior in quiz-shell: SIM badge, neon-purple border, no answer feedback (just "Answer recorded" toast), immediate auto-advance, streak celebrations disabled
- Flag-for-review button on each question with filled amber flag (flagged) vs outlined muted flag (unflagged) states, calling store flagQuestion/unflagQuestion
- Flagged review screen after answering all 46 questions: grid of flagged question buttons, navigate to re-answer flagged questions only, "Submit Test" to finalize
- DMV result letter component with staggered reveal animation (slide-up + rotate settle), "STATE OF CALIFORNIA / Department of Motor Vehicles" header, large PASS/FAIL badge with glow effect
- Store extended with navigateToFlagged (validates flagged-only access), submitFlaggedAnswer (in-place answer replacement with score delta), returnToReview
- Dashboard Simulated Test card now active with link to /simulated-test

## Task Commits

Each task was committed atomically:

1. **Task 1: Sim mode quiz-shell with flag-for-review and flagged review screen** - `fa9cf45` (feat)
2. **Task 2: DMV result letter, sim test page, and dashboard wiring** - `b70fc6c` (feat)
3. **Task 3: Sim mode integration tests** - `e82e244` (feat)

## Files Created/Modified
- `src/components/quiz/flag-button.tsx` - Toggle button with flag icon, calls flagQuestion/unflagQuestion store actions
- `src/components/quiz/flagged-review.tsx` - Review screen with flagged question grid, navigate-to-question, and submit-test button
- `src/components/summary/dmv-result-letter.tsx` - DMV letter-style result with PASS/FAIL badge, score display, staggered animations
- `src/app/(app)/simulated-test/page.tsx` - Server component rendering QuizShell with mode="sim"
- `src/app/(app)/simulated-test/summary/page.tsx` - Placeholder summary page rendering DmvResultLetter (full wiring in Plan 04)
- `src/components/quiz/quiz-shell.tsx` - Extended with sim mode: SIM badge, purple border, no celebrations, "answer recorded" toast, flagged review render path
- `src/components/quiz/question-card.tsx` - Extended with flag button display, flagged review mode (update answer + back to review buttons)
- `src/stores/quiz-store.ts` - Added navigateToFlagged, submitFlaggedAnswer, returnToReview actions
- `src/hooks/use-quiz.ts` - Exposed flagged state, review actions, and handleSimComplete (saves + navigates to summary)
- `src/app/(app)/dashboard/page.tsx` - Simulated Test card now links to /simulated-test (no longer disabled)
- `tests/quiz-store.test.ts` - 5 new tests: sim no-reveal, flag toggle, flagged review flow, sim complete with passed, non-flagged navigation blocked
- `tests/question-selection.test.ts` - 2 new tests: sim exactly 46, sim all 8 categories represented

## Decisions Made
- Flagged review uses store-level validation: navigateToFlagged checks flaggedIndices.has(index) and rejects non-flagged indices, enforcing the "no going back to non-flagged answers" requirement at the data layer
- submitFlaggedAnswer finds existing answer by questionId and replaces it in-place, adjusting score delta (oldCorrect -> newCorrect), so flagged questions can be re-answered without duplicating answer records
- Sim summary page currently reads score from Zustand store; Plan 04 will wire server-side session fetch by sessionId query param for persistence across page refreshes

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Sim mode fully functional at /simulated-test with all 46 questions, flag-for-review, and flagged review screen
- DmvResultLetter component ready for Plan 04 to render on the full summary page with category breakdown and wrong answer review
- handleSimComplete navigates to /simulated-test/summary?session={sessionId} -- Plan 04 will wire the session data fetch
- All 63 tests passing (56 existing + 7 new sim-specific)

## Self-Check: PASSED

All 5 created files verified present. All 3 task commits verified in git log.

---
*Phase: 02-core-quiz-flow*
*Completed: 2026-03-19*
