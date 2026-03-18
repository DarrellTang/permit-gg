# Roadmap: Permit.GG

## Overview

Permit.GG delivers a CA DMV permit test prep app in five phases that follow the dependency chain: data foundation, quiz engine, AI variation engine, analytics intelligence, and adaptive learning. Each phase produces a usable, testable capability -- Phase 2 alone delivers a functional (if static) quiz app. The AI differentiator layers on in Phase 3, analytics makes studying strategic in Phase 4, and spaced repetition ties everything into an optimal learning system in Phase 5.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation + Question Bank** - Project scaffold, database schema, verified seed questions, and base UI shell
- [ ] **Phase 2: Core Quiz Flow** - Practice quiz and simulated DMV test with scoring, feedback, and post-quiz summaries
- [ ] **Phase 3: AI Question Variation Engine** - Batch pre-generation, real-time fallback, and variation pool serving
- [ ] **Phase 4: Analytics + Category Intelligence** - Persistent dashboard, category mastery tracking, trends, drill mode, and readiness score
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
- [ ] 01-01-PLAN.md — Project scaffold, cyberpunk theming, type contracts, and test infrastructure
- [ ] 01-02-PLAN.md — Supabase schema migrations and ~300 CA DMV seed questions
- [ ] 01-03-PLAN.md — Responsive app shell with adaptive navigation and dashboard placeholder
- [ ] 01-04-PLAN.md — Marketing landing page, mascot character, and visual verification checkpoint

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
**Plans**: TBD

Plans:
- [ ] 02-01: TBD
- [ ] 02-02: TBD

### Phase 3: AI Question Variation Engine
**Goal**: Every quiz session serves AI-generated variations of seed questions so no two sessions feel identical, with missed questions tracked for future review
**Depends on**: Phase 2
**Requirements**: QENG-03, QENG-04, QENG-05, MISS-01
**Success Criteria** (what must be TRUE):
  1. User sees differently-phrased versions of questions across sessions (same concept, different wording) rather than identical repeats
  2. Pre-generated variation pool (3-5 per seed via Claude Batch API) serves 95%+ of questions without real-time API calls
  3. When the pre-generated pool is depleted for a given seed, a real-time variation is generated transparently
  4. System tracks all incorrectly answered questions per user for future review sessions
**Plans**: TBD

Plans:
- [ ] 03-01: TBD
- [ ] 03-02: TBD

### Phase 4: Analytics + Category Intelligence
**Goal**: Users can see exactly where they are strong and weak, with data-driven recommendations that connect insight to targeted practice
**Depends on**: Phase 3
**Requirements**: ANAL-02, ANAL-03, ANAL-04, ANAL-05, DRILL-01, DRILL-02
**Success Criteria** (what must be TRUE):
  1. User sees a persistent dashboard showing category mastery scores aggregated across all quiz sessions
  2. Dashboard shows trend lines per category (improving/declining over time)
  3. Dashboard highlights weakest categories and recommends specific categories to drill
  4. User can select a specific category and practice only questions from that category
  5. User sees a readiness prediction score ("X% likely to pass") based on their overall performance
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
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation + Question Bank | 0/4 | Planning complete | - |
| 2. Core Quiz Flow | 0/0 | Not started | - |
| 3. AI Question Variation Engine | 0/0 | Not started | - |
| 4. Analytics + Category Intelligence | 0/0 | Not started | - |
| 5. Adaptive Learning | 0/0 | Not started | - |
