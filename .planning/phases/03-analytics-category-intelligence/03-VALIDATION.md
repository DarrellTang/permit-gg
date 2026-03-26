---
phase: 03
slug: analytics-category-intelligence
status: draft
nyquist_compliant: true
wave_0_complete: true
created: 2026-03-25
---

# Phase 03 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest (already configured) |
| **Config file** | vitest.config.ts |
| **Quick run command** | `npx vitest run --reporter=verbose` |
| **Full suite command** | `npx vitest run && npx tsc --noEmit && npx next build` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx tsc --noEmit`
- **After every plan wave:** Run `npx vitest run && npx next build`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 03-01-01 | 01 | 1 | ANAL-02, ANAL-05, DRILL-01 | unit | `npx vitest run tests/readiness.test.ts tests/analytics-mastery.test.ts --reporter=verbose` | Yes (Wave 0) | pending |
| 03-01-02 | 01 | 1 | ANAL-03, ANAL-04, DRILL-01 | unit+build | `npx vitest run tests/category-questions.test.ts --reporter=verbose && npx tsc --noEmit` | Yes (Wave 0) | pending |
| 03-02-01 | 02 | 2 | ANAL-05, DRILL-02 | build | `npx tsc --noEmit && npx next build` | Yes | pending |
| 03-02-02 | 02 | 2 | ANAL-02 | build | `npx tsc --noEmit && npx next build` | Yes | pending |
| 03-03-01 | 03 | 2 | DRILL-01, DRILL-02 | build | `npx tsc --noEmit` | Yes | pending |
| 03-03-02 | 03 | 2 | MISS-01 | build | `npx tsc --noEmit` | Yes | pending |

*Status: pending / green / red / flaky*

---

## Wave 0 Requirements

Plan 01 Task 1 creates all test scaffolds as Wave 0:
- [x] `tests/readiness.test.ts` -- covers ANAL-05 readiness computation (pure function, no DB)
- [x] `tests/analytics-mastery.test.ts` -- covers ANAL-02, ANAL-03, ANAL-04, DRILL-02, MISS-01 (pure function tests)
- [x] `tests/category-questions.test.ts` -- covers DRILL-01 (category question filtering with mock Supabase client)

All three test files are created by Plan 01 Task 1. The category-questions tests start RED and go GREEN in Plan 01 Task 2 when selectCategoryQuestions is implemented.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Dashboard renders category cards with correct mastery % | ANAL-02 | Visual layout verification | Load /dashboard, verify cards show category names with mastery percentages |
| Sparklines show trend direction | ANAL-03 | Visual chart verification | Complete 3+ quizzes, verify sparklines appear on category cards |
| Readiness gauge color reflects score | ANAL-05 | Visual color verification | Check gauge shifts red->yellow->green based on score range |
| Drill mode filters questions correctly | DRILL-01 | End-to-end flow | Tap category card, verify all quiz questions belong to that category |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references (category-questions.test.ts added for DRILL-01)
- [x] No watch-mode flags
- [x] Feedback latency < 30s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** ready
