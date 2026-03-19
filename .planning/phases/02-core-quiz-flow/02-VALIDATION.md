---
phase: 2
slug: core-quiz-flow
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-18
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 4.1 + @testing-library/react 16.3 |
| **Config file** | `vitest.config.mts` (exists from Phase 1) |
| **Quick run command** | `npx vitest run --reporter=verbose` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run --reporter=verbose`
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 1 | QUIZ-01 | unit | `npx vitest run tests/quiz-store.test.ts -t "practice session"` | W0 | pending |
| 02-01-02 | 01 | 1 | QUIZ-03 | unit | `npx vitest run tests/quiz-store.test.ts -t "one at a time"` | W0 | pending |
| 02-01-03 | 01 | 1 | QUIZ-02 | unit | `npx vitest run tests/question-selection.test.ts -t "random selection"` | W0 | pending |
| 02-01-04 | 01 | 1 | SIM-01 | unit | `npx vitest run tests/quiz-store.test.ts -t "sim 46 questions"` | W0 | pending |
| 02-01-05 | 01 | 1 | SIM-02 | unit | `npx vitest run tests/question-selection.test.ts -t "category distribution"` | W0 | pending |
| 02-01-06 | 01 | 1 | SIM-03 | unit | `npx vitest run tests/quiz-store.test.ts -t "pass threshold"` | W0 | pending |
| 02-01-07 | 01 | 1 | SIM-04 | unit | `npx vitest run tests/quiz-store.test.ts -t "no back navigation"` | W0 | pending |
| 02-02-01 | 02 | 2 | QENG-07 | unit | `npx vitest run tests/answer-feedback.test.ts -t "explanation display"` | W0 | pending |
| 02-02-02 | 02 | 2 | ANAL-01 | unit | `npx vitest run tests/quiz-summary.test.ts -t "summary data"` | W0 | pending |
| 02-02-03 | 02 | 2 | ANAL-06 | integration | `npx vitest run tests/quiz-persistence.test.ts -t "save results"` | W0 | pending |

*Status: pending · green · red · flaky*

---

## Wave 0 Requirements

- [ ] `tests/quiz-store.test.ts` — Zustand store: session init, answer flow, scoring, streaks, reset
- [ ] `tests/question-selection.test.ts` — Random selection, category distribution for sim mode
- [ ] `tests/answer-feedback.test.ts` — Explanation rendering, handbook reference, correct/wrong states
- [ ] `tests/quiz-summary.test.ts` — Score calculation, category breakdown, wrong answer extraction
- [ ] `tests/quiz-persistence.test.ts` — Server action validation, Supabase insert shape (mock client)

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Streak-scaled celebrations | QUIZ-01 | Visual particle effects cannot be automated | Start practice quiz, answer 10+ correct in a row, verify particle intensity scales |
| Sound FX on correct/wrong | QENG-07 | Audio playback verification | Enable sound, answer correctly and incorrectly, verify distinct sounds play |
| XP-bar progress animation | QUIZ-01 | CSS animation visual check | Take a quiz, verify progress bar fills and glows on streaks |
| Radar chart readability | ANAL-01 | Data visualization visual check | Complete a quiz, verify radar chart renders with category labels and scores |
| Card carousel swipe | ANAL-01 | Touch/drag interaction | On summary, swipe through wrong answer cards, verify smooth transitions |
| DMV letter-style result | SIM-03 | Visual design verification | Complete a sim test, verify pass/fail styled as official DMV letter |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
