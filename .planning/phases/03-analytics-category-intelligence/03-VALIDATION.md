---
phase: 03
slug: analytics-category-intelligence
status: draft
nyquist_compliant: false
wave_0_complete: false
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
| 03-01-01 | 01 | 1 | ANAL-02 | build | `npx tsc --noEmit` | ✅ | ⬜ pending |
| 03-01-02 | 01 | 1 | ANAL-03, ANAL-04 | build | `npx tsc --noEmit` | ✅ | ⬜ pending |
| 03-02-01 | 02 | 2 | ANAL-05, DRILL-01 | build | `npx tsc --noEmit && npx next build` | ✅ | ⬜ pending |
| 03-02-02 | 02 | 2 | DRILL-02, MISS-01 | build | `npx tsc --noEmit && npx next build` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. Vitest, TypeScript, and Next.js build are all configured.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Dashboard renders category cards with correct mastery % | ANAL-02 | Visual layout verification | Load /dashboard, verify cards show category names with mastery percentages |
| Sparklines show trend direction | ANAL-03 | Visual chart verification | Complete 3+ quizzes, verify sparklines appear on category cards |
| Readiness gauge color reflects score | ANAL-05 | Visual color verification | Check gauge shifts red→yellow→green based on score range |
| Drill mode filters questions correctly | DRILL-01 | End-to-end flow | Tap category card, verify all quiz questions belong to that category |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
