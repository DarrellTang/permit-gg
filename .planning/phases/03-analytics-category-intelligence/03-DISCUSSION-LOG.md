# Phase 3: Analytics + Category Intelligence - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-03-25
**Phase:** 03-analytics-category-intelligence
**Areas discussed:** Dashboard layout & density, Readiness score presentation, Category drill mode, Trend visualization

---

## Dashboard Layout & Density

| Option | Description | Selected |
|--------|-------------|----------|
| Single-page overview | Everything on one scrollable page: readiness score hero at top, category mastery grid, recent quiz history, weakest areas | ✓ |
| Hub with drill-in cards | 3-4 high-level cards, clicking opens detail view | |
| Tab-based sections | Dashboard has tabs (Overview / Categories / History) | |

**User's choice:** Single-page overview — but emphasized balancing density with visual hierarchy for teen users. "Younger people are more comfortable with denser amounts of information."

| Option | Description | Selected |
|--------|-------------|----------|
| Card per category | Grid of cards with category name, mastery %, sparkline, question count | ✓ |
| Compact list rows | Table-style rows with mastery bar and trend arrow | |
| Radar chart + list hybrid | Reuse radar chart as hero with sortable list below | |

**User's choice:** Card per category

| Option | Description | Selected |
|--------|-------------|----------|
| Dashboard IS the analytics | /dashboard becomes analytics hub, no separate Analytics page | ✓ |
| Dashboard + separate Analytics | Two distinct pages | |

**User's choice:** Dashboard IS the analytics
**Notes:** User also requested UI/UX Pro Max skill be used during implementation.

---

## Readiness Score Presentation

| Option | Description | Selected |
|--------|-------------|----------|
| Encouraging gauge | Circular gauge/ring with %, color shifts red→yellow→green, positive framing | ✓ |
| Level/rank system | Beginner → Getting There → Almost Ready → Test Ready | |
| Bold percentage hero | Giant number, no sugarcoating | |

**User's choice:** Encouraging gauge

| Option | Description | Selected |
|--------|-------------|----------|
| Weighted recent performance | Recent sessions weighted more, penalizes uncovered categories | ✓ |
| Simple rolling average | Average across last N sessions | |
| You decide | Claude picks algorithm | |

**User's choice:** Weighted recent performance

---

## Category Drill Mode

| Option | Description | Selected |
|--------|-------------|----------|
| Tap category card on dashboard | Each card is tappable, reuses practice quiz UI with category filter | ✓ |
| Dedicated drill page | Separate /drill page listing categories | |
| Smart suggestion only | Dashboard shows "Drill your weakest" button | |

**User's choice:** Tap category card

| Option | Description | Selected |
|--------|-------------|----------|
| 10 questions | Same as practice quiz | |
| All available in category | Every question in category | |
| User chooses (5/10/20) | Quick picker before starting | |

**User's choice:** Other — "Can't we use the same slider picker? Practice test defaults to 15 but allows 10-20."
**Notes:** Reuse existing slider picker from practice mode. Default 15, range 10-20.

| Option | Description | Selected |
|--------|-------------|----------|
| Same summary page as practice | Reuse existing post-quiz summary filtered to drilled category | ✓ (hybrid) |
| Category-specific progress view | Custom summary showing mastery change | |

**User's choice:** Asked "What is the most useful for the user?" — Claude recommended hybrid: reuse summary + add mastery delta banner ("Signs: 60% → 75% +15%").

---

## Trend Visualization

| Option | Description | Selected |
|--------|-------------|----------|
| Per-session points | Each quiz session is a data point, most granular | ✓ |
| Daily averages | Average score per day, smoother | |
| You decide | Claude picks based on data density | |

**User's choice:** Per-session points

| Option | Description | Selected |
|--------|-------------|----------|
| Mini sparklines on cards | Small inline sparkline on each category card, last 5-10 sessions | ✓ |
| Trend arrow only | Simple up/down/flat arrow icon | |
| Full chart section below cards | Dedicated chart section with selectable categories | |

**User's choice:** Mini sparklines on cards

---

## Claude's Discretion

- Sparkline implementation (recharts mini vs custom SVG)
- Readiness score algorithm specifics (exact weighting formula)
- Category card grid responsive breakpoints
- Recent quiz history section design
- Empty state for users with no quiz data
- Mastery percentage calculation methodology

## Deferred Ideas

- AI question variations for weak categories — Phase 4
- Spaced repetition scheduling — Phase 5
- Flashcard mode — Phase 5
- Missed question review sessions — Phase 5
