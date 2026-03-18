---
phase: 1
slug: foundation-question-bank
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-17
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest + @testing-library/react |
| **Config file** | `vitest.config.mts` (created in Wave 0) |
| **Quick run command** | `npx vitest run --reporter=verbose` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run --reporter=verbose`
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 01-01-01 | 01 | 1 | QENG-01 | integration | `npx vitest run tests/seed-questions.test.ts -t "seed count"` | ❌ W0 | ⬜ pending |
| 01-01-02 | 01 | 1 | QENG-02 | integration | `npx vitest run tests/seed-questions.test.ts -t "category tags"` | ❌ W0 | ⬜ pending |
| 01-01-03 | 01 | 1 | QENG-06 | unit | `npx vitest run tests/question-schema.test.ts -t "4-option format"` | ❌ W0 | ⬜ pending |
| 01-02-01 | 02 | 1 | UI-01 | smoke | Manual — visual check in Chrome DevTools responsive mode | N/A | ⬜ pending |
| 01-02-02 | 02 | 1 | UI-02 | smoke | Manual — toggle theme, verify CSS variables apply | N/A | ⬜ pending |
| 01-02-03 | 02 | 1 | UI-03 | smoke | Manual — visual review of cyberpunk theme application | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `vitest.config.mts` — Vitest configuration with jsdom, React plugin, tsconfig paths
- [ ] `tests/question-schema.test.ts` — Zod schema validation tests for question format
- [ ] `tests/seed-questions.test.ts` — Integration tests verifying seed data in Supabase
- [ ] Dev dependencies: `vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom vite-tsconfig-paths`

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Responsive layout on mobile/desktop | UI-01 | CSS layout is visual — automated pixel testing is brittle | Open Chrome DevTools, toggle between mobile (375px) and desktop (1440px), verify no overflow/broken layout |
| Dark mode toggle | UI-02 | Theme switching is visual — CSS variable application needs visual confirmation | Click theme toggle, verify background/text/accent colors change, verify no flash of wrong theme on reload |
| Teen-friendly cyberpunk aesthetic | UI-03 | Subjective design quality — cannot be automated | Review against Bubblegum Crisis reference: neon pinks/purples/cyan on dark chrome, engaging typography, mascot presence |

*Three manual-only items — all are visual/subjective UI requirements that cannot be reliably automated.*

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
