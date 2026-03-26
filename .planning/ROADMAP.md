# Roadmap: Permit.GG

## Overview

Permit.GG delivers a CA DMV permit test prep app in five phases that follow the dependency chain: data foundation, quiz engine, analytics intelligence, targeted AI variation, and adaptive learning. Each phase produces a usable, testable capability — Phase 2 alone delivers a functional quiz app (shipped as MVP). Analytics (Phase 3) makes studying strategic, then AI variation (Phase 4) targets weak areas with fresh questions to prevent memorization. Spaced repetition ties everything into an optimal learning system in Phase 5.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation + Question Bank** - Project scaffold, database schema, verified seed questions, and base UI shell
- [x] **Phase 2: Core Quiz Flow** - Practice quiz and simulated DMV test with scoring, feedback, and post-quiz summaries (completed 2026-03-19)
- [ ] **Phase 2.1: Auth, Profiles & Instrumentation** - INSERTED — Supabase Auth, user profiles with Stripe/tier columns, PostHog analytics, user-scoped data (UAT gap closure in progress)
- [ ] **Phase 3: Analytics + Category Intelligence** - Persistent dashboard, category mastery tracking, trends, drill mode, and readiness score
- [ ] **Phase 3.1: UI Polish & Style Reconciliation** - INSERTED — Glass cards, bloom-hover effects, neon borders, atmospheric background, StitchU redesign integration
- [ ] **Phase 4: AI Question Variation Engine** - Analytics-targeted AI variation generation for weak areas, real-time fallback, missed question tracking
- [ ] **Phase 5: Adaptive Learning** - Spaced repetition scheduling, flashcard mode, and missed question review with AI rephrasing

## Phase Details

### Phase 1: Foundation + Question Bank
**Goal**: A deployed app shell with a complete, verified CA DMV question bank stored in Supabase, ready to serve questions to a quiz engine
**Depends on**: Nothing (first phase)
**Requirements**: QENG-01, QENG-02, QENG-06, UI-01, UI-02, UI-03
**Success Criteria** (what must be TRUE):
  1. User can load the app on mobile and desktop browsers and see a responsive, dark-mode-enabled UI shell with navigation
  2. Database contains ~300 seed questions sourced from the CA DMV handbook, each tagged to a specific category (signs, right-of-way, traffic laws, speed limits, DUI/drug laws, safe driving, parking, sharing the road)
  3. All seed questions use 4-option multiple choice format matching the real CA DMV test
  4. App has a teen-friendly visual identity (not sterile/corporate) with engaging colors, typography, and micro-interactions
**Plans**: 4 plans

Plans:
- [x] 01-01-PLAN.md — Project scaffold, cyberpunk theming, type contracts, and test infrastructure
- [x] 01-02-PLAN.md — Supabase schema migrations and ~300 CA DMV seed questions
- [x] 01-03-PLAN.md — Responsive app shell with adaptive navigation and dashboard placeholder
- [x] 01-04-PLAN.md — Marketing landing page, mascot character, and visual verification checkpoint

### Phase 2: Core Quiz Flow
**Goal**: Users can take practice quizzes and simulated DMV tests with immediate feedback, explanations, and post-quiz summaries
**Depends on**: Phase 1
**Requirements**: QUIZ-01, QUIZ-02, QUIZ-03, SIM-01, SIM-02, SIM-03, SIM-04, QENG-07, ANAL-01, ANAL-06
**Success Criteria** (what must be TRUE):
  1. User can start a practice quiz of 10-20 mixed-topic questions and see one question at a time (no peeking ahead or going back)
  2. User can take a simulated DMV test with 46 questions using realistic category distribution, receiving a pass/fail result at the 83% threshold
  3. User sees an immediate explanation referencing the relevant CA DMV handbook section when answering incorrectly
  4. After completing any quiz, user sees a summary with score, wrong answers with explanations, and category breakdown
  5. All quiz history and progress persists across browser sessions
**Plans**: 4 plans

Plans:
- [x] 02-01-PLAN.md — Quiz engine foundation: types, DB migration, Zustand store, question selection, test scaffolds
- [x] 02-02-PLAN.md — Practice quiz UI: shared components, answer feedback, celebrations, sound FX, persistence
- [x] 02-03-PLAN.md — Simulated DMV test: flag-for-review, no-feedback mode, DMV letter-style result
- [x] 02-04-PLAN.md — Post-quiz summary: animated score, wrong answer carousel, radar chart, smart actions

### Phase 2.1: Auth, Profiles & Instrumentation (INSERTED)
**Goal**: Multi-user support with Supabase Auth, user profiles with future-proof Stripe/tier columns, PostHog product analytics, and user-scoped quiz data
**Depends on**: Phase 2
**Requirements**: (infrastructure — no user-facing requirement IDs, enables MULTI-01/02 from v2)
**Success Criteria** (what must be TRUE):
  1. User can sign up and log in with email/password
  2. All quiz sessions are scoped to the authenticated user (user_id FK)
  3. Profiles table exists with stripe_customer_id and tier columns (defaulting to 'free')
  4. Unauthenticated users are redirected to login when accessing /dashboard or quiz routes
  5. PostHog tracks page views and identifies authenticated users
  6. RLS policies enforce user-scoped data access
  7. Existing Lilly quiz data is preserved (migration backfills her user_id)
**Plans**: 4 plans

Plans:
- [x] 2.1-01-PLAN.md — Database migrations (profiles + user-scoped quiz data), Supabase client updates, auth middleware, OAuth callback, auth server actions, login page
- [x] 2.1-02-PLAN.md — PostHog analytics (provider, page views, identify, events), free quiz gating, user-scoped quiz data wiring, personalized app shell
- [ ] 2.1-03-PLAN.md — Gap closure: fix free quiz completion flow, quiz gate enforcement, and summary data persistence
- [ ] 2.1-04-PLAN.md — Gap closure: fix PostHog pageview conflicts and verify production event delivery

### Phase 3: Analytics + Category Intelligence
**Goal**: Users can see exactly where they are strong and weak, with data-driven recommendations that connect insight to targeted practice
**Depends on**: Phase 2
**Requirements**: ANAL-02, ANAL-03, ANAL-04, ANAL-05, DRILL-01, DRILL-02, MISS-01
**Success Criteria** (what must be TRUE):
  1. User sees a persistent dashboard showing category mastery scores aggregated across all quiz sessions
  2. Dashboard shows trend lines per category (improving/declining over time)
  3. Dashboard highlights weakest categories and recommends specific categories to drill
  4. User can select a specific category and practice only questions from that category
  5. User sees a readiness prediction score ("X% likely to pass") based on their overall performance
  6. System tracks all incorrectly answered questions per user for future review sessions
**Plans**: 4 plans

Plans:
- [x] 03-01-PLAN.md — Analytics data foundation: types, RPC migration, server actions, readiness/mastery utils, category question selection, unit tests
- [x] 03-02-PLAN.md — Dashboard UI: readiness gauge, category card grid with sparklines, quiz history, nav cleanup
- [x] 03-03-PLAN.md — Category drill mode: practice page category filtering, mastery delta banner, smart actions wiring
- [x] 03-04-PLAN.md — Gap closure: fix readiness gauge ring visibility and mastery delta banner for all user types

### Phase 3.1: UI Polish & Style Reconciliation (INSERTED)

**Goal:** Reconcile app interior visual language with landing page cyberpunk aesthetic — glass cards, bloom-hover effects, directional neon borders, atmospheric background depth, and StitchU redesign integration (grid background, SVG circle gauge, terminal-style history, sidebar redesign)
**Requirements**: (visual polish — no user-facing requirement IDs)
**Depends on:** Phase 3
**Plans:** 6 plans

Plans:
- [x] 03.1-01-PLAN.md — Card component glass defaults, CSS utility updates, atmospheric app background
- [x] 03.1-02-PLAN.md — Component-level glass treatment, bloom-hover effects, neon border accents, visual checkpoint
- [x] 03.1-03-PLAN.md — Gap closure: sharpen border radii, boost question card border, cyberpunk OAuth buttons, neon-glow CTAs
- [x] 03.1-04-PLAN.md — StitchU redesign: CSS utilities (bg-grid, bloom filters), sidebar redesign with right-border accents and Settings/Logout
- [ ] 03.1-05-PLAN.md — StitchU redesign: SVG circle readiness gauge, hero section layout, category card status badges and progress bars
- [ ] 03.1-06-PLAN.md — StitchU redesign: terminal-style quiz history with session log header and fetch-more link

### Phase 4: AI Question Variation Engine
**Goal**: Analytics-informed AI generates question variations targeted at weak categories, preventing memorization where it matters most while minimizing API costs
**Depends on**: Phase 3
**Requirements**: QENG-03, QENG-04, QENG-05
**Success Criteria** (what must be TRUE):
  1. User sees differently-phrased versions of questions in weak categories across sessions (same concept, different wording)
  2. AI variation generation is targeted — only generates for categories where analytics show weakness or high repetition
  3. When a question has been seen 3+ times in a weak category, a variation is generated on-demand via Claude API
  4. Generated variations preserve factual accuracy (correct answer unchanged, wrong answers plausible)
**Plans**: TBD

Plans:
- [ ] 04-01: TBD
- [ ] 04-02: TBD

### Phase 5: Adaptive Learning
**Goal**: The app optimally schedules what to study and when, with flashcard review and AI-rephrased missed question sessions that close knowledge gaps
**Depends on**: Phase 4
**Requirements**: SRS-01, SRS-02, SRS-03, FLASH-01, FLASH-02, FLASH-03, MISS-02, MISS-03
**Success Criteria** (what must be TRUE):
  1. User can study concepts in flip-style flashcard format with spaced repetition scheduling (cards they are about to forget appear first)
  2. Questions answered correctly are spaced out to longer intervals; incorrect questions resurface sooner
  3. User can start a missed question review session that re-quizzes previously missed concepts with AI-rephrased questions (not identical repeats)
  4. Questions leave the missed pool once answered correctly in a review session
  5. SRS data feeds into the readiness prediction score, improving its accuracy over time
**Plans**: TBD

Plans:
- [ ] 05-01: TBD
- [ ] 05-02: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 2.1 -> 3 -> 3.1 -> 4 -> 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation + Question Bank | 4/4 | Complete | 2026-03-18 |
| 2. Core Quiz Flow | 4/4 | Complete | 2026-03-19 |
| 2.1. Auth, Profiles & Instrumentation | 2/4 | Gap closure | - |
| 3. Analytics + Category Intelligence | 4/4 | Complete | - |
| 3.1. UI Polish & Style Reconciliation | 3/6 | StitchU redesign | - |
| 4. AI Question Variation Engine | 0/0 | Not started | - |
| 5. Adaptive Learning | 0/0 | Not started | - |
