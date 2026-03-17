# Architecture Research

**Domain:** AI-powered adaptive quiz/test prep application
**Researched:** 2026-03-17
**Confidence:** HIGH

## System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Presentation Layer                          │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐       │
│  │  Quiz UI  │  │ Dashboard │  │ Flashcard  │  │  DMV Sim  │       │
│  │ (modes)   │  │ Analytics │  │    Mode    │  │   Mode    │       │
│  └─────┬─────┘  └─────┬─────┘  └─────┬─────┘  └─────┬─────┘       │
│        │              │              │              │               │
├────────┴──────────────┴──────────────┴──────────────┴───────────────┤
│                        Application Layer                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │  Quiz Engine  │  │  Scheduler   │  │  Analytics   │              │
│  │  (session,    │  │  (ts-fsrs    │  │  (category   │              │
│  │   scoring)    │  │   wrapper)   │  │   tracking)  │              │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘              │
│         │                 │                 │                       │
├─────────┴─────────────────┴─────────────────┴───────────────────────┤
│                     Question Service Layer                          │
│  ┌──────────────────┐  ┌──────────────────┐                        │
│  │  Question Pool    │  │  AI Generation   │                        │
│  │  Manager          │  │  Service         │                        │
│  │  (select from     │  │  (Claude API     │                        │
│  │   pre-generated)  │  │   real-time)     │                        │
│  └────────┬─────────┘  └────────┬─────────┘                        │
│           │                     │                                   │
├───────────┴─────────────────────┴───────────────────────────────────┤
│                        Data Layer                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │  Supabase    │  │  Supabase    │  │  Claude API  │              │
│  │  Postgres    │  │  Auth (opt)  │  │  (external)  │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
└─────────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| Quiz UI (modes) | Render questions, collect answers, show feedback per mode (practice, category drill, missed review) | Next.js pages + client components with mode-specific layouts |
| Dashboard/Analytics | Visualize category scores, trends, weak areas | Server components fetching aggregated data, lightweight charting lib |
| Flashcard Mode | Flip-card concept review with spaced repetition rating | Client component with ts-fsrs rating buttons (Again/Hard/Good/Easy) |
| DMV Sim Mode | Timed 46-question test mimicking real CA DMV distribution | Quiz Engine configured with DMV category weights and pass threshold |
| Quiz Engine | Session lifecycle: start session, serve questions, collect answers, score, end session | Server Actions orchestrating question selection and response recording |
| Scheduler (ts-fsrs) | Calculate next review dates, select due cards, track learning state | ts-fsrs library wrapped in a service with Supabase persistence |
| Analytics Service | Aggregate performance by category, compute trends, identify weak areas | Postgres queries with materialized views or computed aggregates |
| Question Pool Manager | Select questions from pre-generated variations, avoid repeats within session | Service layer querying Supabase with randomization and dedup logic |
| AI Generation Service | Generate new question variations on-demand when pool is thin | Server-side Claude API calls with structured output prompts |

## Recommended Project Structure

```
src/
├── app/                        # Next.js App Router (routes only)
│   ├── (quiz)/                 # Route group for quiz modes
│   │   ├── practice/           # Practice quiz mode
│   │   │   └── page.tsx
│   │   ├── category/[slug]/    # Category drill mode
│   │   │   └── page.tsx
│   │   ├── review/             # Missed question review
│   │   │   └── page.tsx
│   │   ├── flashcards/         # Flashcard mode
│   │   │   └── page.tsx
│   │   └── dmv-test/           # Simulated DMV test
│   │       └── page.tsx
│   ├── dashboard/              # Analytics dashboard
│   │   └── page.tsx
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Landing/home
├── components/                 # Shared UI components
│   ├── quiz/                   # Quiz-specific components
│   │   ├── question-card.tsx
│   │   ├── answer-options.tsx
│   │   ├── quiz-progress.tsx
│   │   ├── quiz-results.tsx
│   │   └── flashcard.tsx
│   ├── dashboard/              # Dashboard components
│   │   ├── category-chart.tsx
│   │   ├── trend-graph.tsx
│   │   └── weak-areas.tsx
│   └── ui/                     # Base UI primitives (shadcn)
├── server/                     # Server-side logic
│   ├── actions/                # Next.js Server Actions
│   │   ├── quiz.ts             # Start/submit/score quiz sessions
│   │   ├── review.ts           # Spaced repetition reviews
│   │   └── analytics.ts        # Dashboard data fetching
│   ├── services/               # Business logic (pure functions)
│   │   ├── quiz-engine.ts      # Session management, scoring
│   │   ├── question-pool.ts    # Question selection, dedup
│   │   ├── ai-generation.ts    # Claude API integration
│   │   ├── scheduler.ts        # ts-fsrs wrapper
│   │   └── analytics.ts        # Aggregation logic
│   └── db/                     # Data access layer
│       ├── queries/            # Typed Supabase queries
│       │   ├── questions.ts
│       │   ├── sessions.ts
│       │   ├── responses.ts
│       │   └── cards.ts
│       └── client.ts           # Supabase client factory
├── lib/                        # Shared utilities
│   ├── supabase/
│   │   ├── server.ts           # Server-side Supabase client
│   │   └── client.ts           # Browser-side Supabase client
│   ├── constants/
│   │   ├── categories.ts       # CA DMV question categories
│   │   └── dmv-config.ts       # DMV test rules (46 Qs, 38 to pass)
│   └── types/                  # Shared TypeScript types
│       ├── quiz.ts
│       ├── question.ts
│       └── analytics.ts
└── hooks/                      # Client-side React hooks
    ├── use-quiz-session.ts
    ├── use-timer.ts
    └── use-flashcard.ts
```

### Structure Rationale

- **`app/` contains only routes:** Pages are thin -- they compose components and call server actions. No business logic in route files.
- **`server/actions/` vs `server/services/`:** Server Actions handle Next.js concerns (revalidation, cookies, form data). Services are pure functions with business logic, testable without Next.js. Actions call services, never the reverse.
- **`server/db/queries/`:** Typed data access layer isolates all Supabase calls. If you ever swap databases, only this layer changes.
- **Route group `(quiz)/`:** Groups all quiz modes under a shared layout (progress bar, navigation) without affecting URL structure.
- **`lib/constants/`:** CA DMV rules are configuration, not logic. Category lists and test parameters live here as typed constants.

## Architectural Patterns

### Pattern 1: Hybrid Question Pool (Pre-generated + Real-time)

**What:** Pre-generate a pool of AI question variations during a batch job. Serve from the pool during quizzes. Fall back to real-time Claude API generation only when the pool for a seed question is depleted or thin.

**When to use:** Always. This is the core cost-optimization strategy.

**Trade-offs:**
- PRO: 95%+ of quiz interactions hit the database, not the API. Haiku batch pricing ($0.125/MTok input via Haiku 3) makes pre-generation extremely cheap.
- PRO: Consistent latency -- no waiting for AI generation mid-quiz.
- CON: Requires a batch job pipeline (cron or manual trigger).
- CON: Pool can become stale if seed questions change.

**Implementation approach:**
```
Seed Question (human-authored, verified correct)
    │
    ├──[Batch Job]──→ Claude API (Haiku) ──→ 5-10 variations stored in DB
    │                                         (pre-validated against seed)
    │
    └──[Quiz Time]──→ Pick random unused variation from pool
                      │
                      └──[Pool < 2 remaining]──→ Real-time Claude call
                                                  (Haiku, single variation)
```

### Pattern 2: Server Actions as Thin Controllers

**What:** Server Actions handle HTTP/form concerns and delegate to services. Services contain all business logic and are framework-agnostic.

**When to use:** Every mutation (starting a quiz, submitting an answer, recording a review rating).

**Trade-offs:**
- PRO: Services are unit-testable with Vitest without mocking Next.js internals.
- PRO: Same service logic works in API routes, cron jobs, or CLI scripts.
- CON: Slightly more files than putting logic directly in actions.

**Example:**
```typescript
// server/actions/quiz.ts (thin -- handles Next.js concerns)
"use server"
export async function startQuizSession(mode: QuizMode, categorySlug?: string) {
  const supabase = await createClient()
  const session = await quizEngine.createSession(supabase, { mode, categorySlug })
  revalidatePath("/dashboard")
  return session
}

// server/services/quiz-engine.ts (thick -- all business logic)
export async function createSession(
  db: SupabaseClient,
  config: SessionConfig
): Promise<QuizSession> {
  const questions = await questionPool.selectForSession(db, config)
  const session = await db.from("quiz_sessions").insert({...}).select().single()
  return { session, questions }
}
```

### Pattern 3: ts-fsrs Card State as Database Columns

**What:** Store ts-fsrs Card fields (`due`, `stability`, `difficulty`, `state`, `reps`, `lapses`, `elapsed_days`, `scheduled_days`, `learning_steps`, `last_review`) directly as columns on a `user_cards` table rather than serializing to JSON.

**When to use:** For all spaced repetition tracking. Queryable columns enable "fetch all due cards" without deserializing every row.

**Trade-offs:**
- PRO: `SELECT * FROM user_cards WHERE due <= NOW()` is a simple indexed query.
- PRO: Analytics queries can aggregate on `stability`, `lapses`, etc.
- CON: Schema must match ts-fsrs Card type exactly -- version upgrades require migrations.

## Data Flow

### Quiz Session Flow

```
User selects quiz mode
    │
    ▼
[Server Action: startQuizSession]
    │
    ├──→ [Quiz Engine] determines question count, category distribution
    │        │
    │        ▼
    │    [Question Pool Manager]
    │        │
    │        ├──→ SELECT from pre-generated variations (random, unused in session)
    │        │    ← Returns question set
    │        │
    │        └──→ [if pool thin] → Claude API real-time generation
    │                               ← Returns fresh variation
    │
    ├──→ INSERT quiz_sessions row
    │
    ▼
Returns session ID + first question to client
    │
    ▼
User answers question
    │
    ▼
[Server Action: submitAnswer]
    │
    ├──→ INSERT quiz_responses row (question_id, selected_answer, correct)
    │
    ├──→ [Scheduler] update ts-fsrs card state based on correct/incorrect
    │        │
    │        ▼
    │    UPDATE user_cards SET due=, stability=, difficulty=, ...
    │
    ├──→ Return next question (or results if last)
    │
    ▼
[After last question]
    │
    ▼
[Server Action: completeSession]
    │
    ├──→ UPDATE quiz_sessions SET completed_at, score, passed
    │
    ├──→ [Analytics Service] update category aggregates
    │
    ▼
Returns quiz results summary to client
```

### Spaced Repetition Flow (Flashcard Mode)

```
User opens flashcards
    │
    ▼
[Server Action: getDueCards]
    │
    ├──→ SELECT from user_cards WHERE due <= NOW() ORDER BY due ASC LIMIT N
    │
    ▼
Render flashcard (front = question, back = answer + explanation)
    │
    ▼
User rates recall (Again / Hard / Good / Easy)
    │
    ▼
[Server Action: recordReview]
    │
    ├──→ [ts-fsrs] fsrs.next(card, now, rating) → new card state
    │
    ├──→ UPDATE user_cards with new state
    │
    ├──→ INSERT review_logs row (for parameter optimization later)
    │
    ▼
Next due card (or "all caught up" if none due)
```

### AI Question Generation Flow (Batch Pre-generation)

```
[Cron Job or Admin Trigger]
    │
    ▼
SELECT seed_questions WHERE variation_count < target_pool_size
    │
    ▼
For each seed question batch:
    │
    ├──→ Build prompt: seed question + category + CA DMV handbook context
    │
    ├──→ Claude API (Haiku, batch endpoint for 50% discount)
    │       System: "Generate 5 variations of this DMV question.
    │                Same concept, different phrasing. Include
    │                4 answer choices with exactly 1 correct.
    │                Return structured JSON."
    │
    ├──→ Parse structured response
    │
    ├──→ Validate: correct answer must align with seed question's concept
    │       (LLM-as-judge or rule-based check against seed answer)
    │
    ├──→ INSERT question_variations rows
    │
    ▼
Log generation stats (count, cost, any validation failures)
```

### State Management

Client state is minimal -- the server is the source of truth.

```
Server (Supabase)                    Client (React)
┌──────────────────┐                ┌──────────────────┐
│ quiz_sessions    │                │ Current question  │
│ quiz_responses   │ ←─ Server ──→ │ Selected answer   │
│ user_cards       │    Actions     │ Timer state       │
│ question_pool    │                │ UI mode           │
└──────────────────┘                └──────────────────┘
```

- **Server owns:** All quiz data, scores, scheduling state, analytics
- **Client owns:** Current UI state (which question is showing, selected answer before submit, timer countdown for DMV mode)
- **No client-side state library needed** (useState/useReducer sufficient for ephemeral quiz UI state)

### Key Data Flows

1. **Question delivery:** Server selects and sends one question at a time (not the full set) to prevent answer-peeking in browser dev tools.
2. **Answer submission:** Each answer is immediately persisted server-side, so partial sessions are recoverable.
3. **Analytics refresh:** Dashboard fetches aggregated data via server components on page load. No real-time subscriptions needed for single user.

## Database Schema (Conceptual)

```
seed_questions
├── id (uuid, PK)
├── category (text, indexed)          -- "right-of-way", "signs", "speed-limits", etc.
├── question_text (text)              -- The canonical question
├── correct_answer (text)
├── wrong_answers (text[])            -- Array of 3 distractors
├── explanation (text)                -- Why the correct answer is correct
├── handbook_reference (text)         -- CA DMV handbook section
└── difficulty (int)                  -- 1-3 base difficulty

question_variations
├── id (uuid, PK)
├── seed_question_id (uuid, FK → seed_questions)
├── question_text (text)              -- AI-generated variation
├── correct_answer (text)
├── wrong_answers (text[])
├── explanation (text)                -- Adapted explanation
├── generated_at (timestamptz)
├── generation_model (text)           -- e.g., "claude-haiku-3"
└── validated (boolean)               -- Passed quality check

user_cards                            -- ts-fsrs state per seed question
├── id (uuid, PK)
├── seed_question_id (uuid, FK → seed_questions)
├── due (timestamptz, indexed)        -- Next review date
├── stability (float)
├── difficulty (float)
├── elapsed_days (int)
├── scheduled_days (int)
├── learning_steps (int)
├── reps (int)
├── lapses (int)
├── state (int)                       -- 0=New, 1=Learning, 2=Review, 3=Relearning
└── last_review (timestamptz)

review_logs                           -- ts-fsrs review history
├── id (uuid, PK)
├── user_card_id (uuid, FK → user_cards)
├── rating (int)                      -- 1=Again, 2=Hard, 3=Good, 4=Easy
├── state (int)                       -- Card state at time of review
├── due (timestamptz)                 -- Previous due date
├── stability (float)
├── difficulty (float)
├── elapsed_days (int)
├── scheduled_days (int)
├── learning_steps (int)
└── review (timestamptz)              -- When the review happened

quiz_sessions
├── id (uuid, PK)
├── mode (text)                       -- "practice", "category", "review", "dmv-test"
├── category (text, nullable)         -- Set for category drill mode
├── question_count (int)
├── started_at (timestamptz)
├── completed_at (timestamptz, nullable)
├── score (int, nullable)
├── total (int)
└── passed (boolean, nullable)        -- For DMV test mode (>= 38/46)

quiz_responses
├── id (uuid, PK)
├── session_id (uuid, FK → quiz_sessions)
├── variation_id (uuid, FK → question_variations)
├── selected_answer (text)
├── is_correct (boolean)
├── answered_at (timestamptz)
└── time_spent_ms (int)               -- Per-question timing
```

### Schema Notes

- **Spaced repetition tracks seed questions, not variations.** The `user_cards` table has one row per seed question. The user's recall of the concept is what matters, regardless of which variation was shown.
- **`question_variations` includes the seed as variation #0.** The original hand-authored question is also inserted as a variation (with `validated = true`), so the pool manager treats all questions uniformly.
- **No `users` table in v1.** Single-user app. Add user_id FK columns when multi-tenancy is needed. RLS policies can be added later.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 1 user (v1) | Monolith is perfect. No auth, no RLS. Direct Supabase queries. Batch job can be a manual script. |
| 5-20 users (classmates) | Add Supabase Auth + user_id columns + RLS policies. Question pool is shared; user_cards/sessions are per-user. No architectural changes. |
| 1000+ users | Pre-generated pool becomes critical for cost. Add Supabase Edge Functions for batch generation. Consider Redis/Vercel KV for session caching. Monitor Claude API costs. |

### Scaling Priorities

1. **First bottleneck: Claude API cost.** If real-time generation is hit too often, costs spike. Fix by ensuring batch pre-generation keeps pools full (target 10+ variations per seed question).
2. **Second bottleneck: Supabase free tier limits.** 500MB database, 50K monthly active users. Unlikely to hit with <100 users, but monitor variation table growth.

## Anti-Patterns

### Anti-Pattern 1: Real-time AI for Every Question

**What people do:** Call Claude API every time a question is served, generating a fresh variation on each request.
**Why it's wrong:** 500ms-2s latency per question. API costs scale linearly with usage. Rate limits become a concern. If the API is down, the app is broken.
**Do this instead:** Pre-generate a pool of 5-10 variations per seed question using batch API (50% cheaper). Serve from pool. Only call real-time as a fallback when pool is exhausted.

### Anti-Pattern 2: Trusting AI Output Without Validation

**What people do:** Store AI-generated questions directly without checking factual accuracy.
**Why it's wrong:** An incorrect answer on a DMV practice test teaches the user wrong information, which is worse than not studying at all. LLMs hallucinate plausible-sounding but incorrect traffic law details.
**Do this instead:** Every generated variation must reference the seed question's correct concept. Validate that the correct answer maps to the same underlying fact. Use structured output (JSON mode) to enforce format. Flag variations for human review when confidence is low.

### Anti-Pattern 3: Sending All Questions to Client at Session Start

**What people do:** Fetch all 46 questions with answers and send to the client, rendering one at a time.
**Why it's wrong:** All answers are visible in browser DevTools network tab. Teenager + DevTools = guaranteed cheating.
**Do this instead:** Server sends one question at a time. Client submits answer, server responds with correctness + next question. Answers never leave the server until after submission.

### Anti-Pattern 4: Complex Client-Side State Management

**What people do:** Install Redux/Zustand, build elaborate client state for quiz sessions, sync with server periodically.
**Why it's wrong:** Overkill for a quiz app. Creates sync bugs. Session state lives on the server anyway.
**Do this instead:** Server Actions are the state manager. Client holds only ephemeral UI state (current selection, timer). Each answer submission is a server round-trip that returns the next state.

### Anti-Pattern 5: Storing ts-fsrs State as Serialized JSON

**What people do:** Store the entire ts-fsrs Card object as a JSON column.
**Why it's wrong:** Cannot query "all cards due before now" without scanning every row and parsing JSON. Cannot aggregate on stability or difficulty for analytics.
**Do this instead:** Map each ts-fsrs Card field to its own typed column. Index the `due` column. Query with standard SQL.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Claude API (Haiku) | Server-side only, via `@anthropic-ai/sdk`. Batch API for pre-generation, Messages API for real-time fallback. | Use Haiku 3 ($0.25/MTok input, $1.25/MTok output) for cost. Batch = 50% off. System prompt with CA DMV context + seed question. Structured JSON output. |
| Supabase Postgres | `@supabase/supabase-js` via `@supabase/ssr` for Next.js. Server client for actions, browser client for real-time (if needed later). | Environment vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. Use server client exclusively in v1. |
| ts-fsrs | Direct import in `server/services/scheduler.ts`. Pure computation -- no network calls. | `npm install ts-fsrs`. Card state persisted in Supabase. ReviewLog persisted for future parameter optimization. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Pages <-> Server Actions | Next.js Server Actions (form actions / direct calls) | Thin boundary. Actions validate input, delegate to services, return typed results. |
| Server Actions <-> Services | Direct function calls | Services receive Supabase client as parameter (dependency injection for testability). |
| Services <-> Database | Supabase client queries via `server/db/queries/` | All SQL lives in query files. Services never construct raw queries. |
| Quiz Engine <-> Question Pool | Function calls within service layer | Pool manager is a dependency of quiz engine, not the reverse. |
| Question Pool <-> AI Generation | Pool manager calls AI service when pool is depleted | AI service is a leaf dependency -- nothing depends on it except pool manager and batch job. |

## Suggested Build Order

Based on dependency analysis, build in this order:

1. **Database schema + data access layer** -- Everything depends on this. Seed questions must exist before anything else works.
2. **Question Pool Manager (static, no AI)** -- Serve seed questions directly. Validates the quiz flow works end-to-end without AI complexity.
3. **Quiz Engine + Practice Mode** -- Core quiz session lifecycle. Start, answer, score, complete. The primary interaction loop.
4. **ts-fsrs Scheduler + Flashcard Mode** -- Adds spaced repetition. Depends on user_cards table and review_logs.
5. **AI Generation Service (batch)** -- Pre-generate variations from seed questions. Populates question_variations table.
6. **AI Generation Service (real-time fallback)** -- Wire up pool depletion detection + on-demand generation.
7. **Category Drill + Missed Review modes** -- Variations on quiz engine with different question selection strategies.
8. **DMV Simulated Test Mode** -- Specific category distribution logic + pass/fail scoring + timer.
9. **Analytics Dashboard** -- Depends on accumulated quiz_responses and user_cards data to be meaningful.
10. **Post-quiz Summary** -- Enhancement to quiz completion flow.

**Rationale:** Each step builds on the previous. Steps 1-3 deliver a usable (if basic) quiz app. Steps 4-6 add the AI differentiation. Steps 7-10 are feature expansion on a solid foundation.

## Sources

- [ts-fsrs GitHub repository and API documentation](https://github.com/open-spaced-repetition/ts-fsrs) -- Card/ReviewLog types, repeat/next methods, Next.js example
- [ts-fsrs DeepWiki documentation](https://deepwiki.com/open-spaced-repetition/ts-fsrs) -- Integration patterns, data model, Next.js example architecture
- [Claude API Pricing (official)](https://platform.claude.com/docs/en/about-claude/pricing) -- Haiku 3 at $0.25/$1.25 per MTok, Batch API 50% discount, prompt caching 90% savings on reads
- [Supabase Next.js quickstart (official)](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs) -- Server client pattern, cookie-based auth, environment variable conventions
- [Next.js App Router documentation](https://nextjs.org/docs/app) -- Route groups, Server Actions, project structure conventions
- [Quizter AI quiz app](https://github.com/bhaveek424/quizter) -- Reference architecture: Next.js + Prisma + OpenAI + React Query
- [Supabase Row Level Security docs](https://supabase.com/docs/guides/database/postgres/row-level-security) -- RLS patterns for future multi-user expansion

---
*Architecture research for: AI-powered driving permit quiz app (Permit.GG)*
*Researched: 2026-03-17*
