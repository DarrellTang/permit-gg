# Project Research Summary

**Project:** Permit.GG
**Domain:** AI-powered adaptive quiz/test prep (CA driving permit)
**Researched:** 2026-03-17
**Confidence:** HIGH

## Executive Summary

Permit.GG is a CA DMV permit test prep app for teenagers that differentiates from static-question-bank competitors (DMV Genie, Zutobi, Driving-Tests.org) through three mechanisms: AI-generated question variations that prevent answer memorization, spaced repetition scheduling (ts-fsrs) for optimal study timing, and deep per-category analytics that connect weakness identification to targeted drill. The recommended stack is Next.js 16 on Vercel + Supabase Postgres + Claude API (Haiku) via Vercel AI SDK, with shadcn/ui for components and Recharts for analytics visualization. This is a well-understood technology combination with high-confidence documentation and version compatibility.

The critical architectural decision is the hybrid question pool pattern: pre-generate 5-10 AI variations per seed question using the Claude Batch API (50% cost discount), serve from the database for 95%+ of interactions, and fall back to real-time generation only for missed-question review. This keeps API costs near zero for normal usage, eliminates latency from the quiz flow, and provides a natural fallback when the API is unavailable. The entire app architecture is server-authoritative -- quiz state, scoring, and scheduling live in Supabase, with the client holding only ephemeral UI state.

The dominant risk is LLM hallucination in a safety-critical domain. A wrong answer about a speed limit or right-of-way rule is not a trivia mistake -- it teaches dangerous driving behavior. Mitigation is non-negotiable: human-verified seed questions sourced from the 2026 CA DMV handbook, constrained AI generation that rephrases but never invents facts, and a post-generation validation pipeline that rejects any variation whose correct answer drifts from the seed. Secondary risks are cost blowup from uncontrolled real-time API calls (solved by the pre-generation strategy) and Supabase free tier pausing after 7 days of inactivity (solved by a cron keep-alive).

## Key Findings

### Recommended Stack

The stack is Next.js 16.1 + React 19.2 on Vercel, Supabase Postgres for persistence, Claude Haiku via both the Vercel AI SDK (real-time) and direct Anthropic SDK (batch), with Zod 4.3 as the single source of truth for question schemas across AI generation, API validation, and database types. UI is Tailwind CSS 4.2 + shadcn/ui v4 + Motion (Framer Motion) for teen-appropriate micro-interactions.

**Core technologies:**
- **Next.js 16.1 (App Router):** Full-stack framework on Vercel free tier. Server Components reduce client bundle; Server Actions replace API routes for mutations.
- **Supabase Postgres:** Database, future auth. Free tier (500MB, 50K MAU) is sufficient for single-user with room for classmates.
- **Vercel AI SDK 6.x + @ai-sdk/anthropic:** `generateObject` with Zod schemas returns typed quiz questions. Handles streaming and retries.
- **@anthropic-ai/sdk (direct):** Required for Batch API pre-generation (AI SDK 6 does not support Batch API). 50% cost discount on batch.
- **Zod 4.3:** Defines question schema once, used everywhere (AI output, API validation, DB types).
- **ts-fsrs 5.2:** FSRS spaced repetition algorithm (same as Anki). Pure TypeScript, no external dependencies.
- **Zustand 5.x:** Client-side quiz session state (current question, timer). 3KB, zero boilerplate.

### Expected Features

**Must have (table stakes):**
- Question bank with verified answers and category tags (~300 seed questions)
- Multiple choice format matching real CA DMV test (4 options)
- Immediate answer explanations referencing CA DMV handbook sections
- Practice quiz mode (10-20 questions, mixed categories)
- Simulated DMV test mode (46 questions, 38/46 pass threshold)
- Score tracking with pass/fail context relative to 83% threshold
- Category-organized questions (signs, right-of-way, DUI, speed limits, etc.)
- Mobile-responsive design (teen audience = phone-first)
- Dark mode (implement from day one with CSS variables)
- Progress persistence across sessions

**Should have (differentiators -- these are why Permit.GG exists):**
- AI-generated question variations (core differentiator vs. all competitors)
- Deep category analytics dashboard with trend tracking
- Category drill mode auto-recommended based on weak areas
- Missed question review with AI-rephrased questions (not identical repeats)
- Spaced repetition scheduling via ts-fsrs
- Readiness prediction score ("87% likely to pass")
- Flashcard mode with SRS integration

**Defer (v2+):**
- User accounts / multi-tenancy (architect for it, don't build auth flow)
- Additional states beyond CA
- Social leaderboards (anti-feature: creates anxiety)
- AI chatbot tutor (Quizlet killed Q-Chat -- high cost, low value)
- Gamification points/badges (readiness score serves as lightweight motivation)

### Architecture Approach

Server-authoritative 4-layer architecture: Presentation (quiz modes, dashboard, flashcards) -> Application (quiz engine, ts-fsrs scheduler, analytics service) -> Question Service (pool manager + AI generation) -> Data (Supabase Postgres + Claude API). Server Actions act as thin controllers delegating to framework-agnostic service functions. Questions are served one at a time (never the full set) to prevent answer-peeking in DevTools. Client state is minimal (current question, selected answer, timer) -- all quiz data, scores, and scheduling state lives server-side.

**Major components:**
1. **Quiz Engine** -- Session lifecycle (start, serve question, collect answer, score, complete). Configurable for practice, category drill, DMV sim, and review modes.
2. **Question Pool Manager** -- Selects from pre-generated variations with randomization and dedup. Triggers real-time AI generation only when pool is depleted.
3. **AI Generation Service** -- Dual-mode: batch pre-generation via Anthropic SDK (50% cost discount) and real-time fallback via Vercel AI SDK. Both use the same Zod schema.
4. **ts-fsrs Scheduler** -- Wraps ts-fsrs library with Supabase persistence. Card state stored as individual columns (not JSON) for queryable scheduling.
5. **Analytics Service** -- Aggregates quiz responses by category, computes trends, identifies weak areas. Feeds dashboard and category drill recommendations.

### Critical Pitfalls

1. **LLM hallucinations teaching wrong driving rules** -- Constrain AI to rephrase, never invent. Seed questions must be human-verified from 2026 CA DMV handbook. Post-generation validation rejects any variation where the correct answer drifts from the seed.
2. **Cost blowup from real-time API calls** -- Pre-generate variations via Batch API (50% discount). Serve from database for 95%+ of interactions. Rate-limit real-time generation. Target: monthly API cost under $5.
3. **Ambiguous AI-generated questions with multiple defensible answers** -- Start with question-stem-only rephrasing (keep original answer options). Graduate to full answer rephrasing only after validation proves reliable. Include "report question" button.
4. **Supabase free tier pausing after 7 days of inactivity** -- Deploy a Vercel cron job that pings the database daily. Handle "paused" state gracefully with a "waking up" message.
5. **Vercel serverless function timeout on AI calls** -- Set `maxDuration = 30` on AI-calling routes. Always fall back to pre-generated content if API call fails or times out.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Foundation + Data Layer

**Rationale:** Everything depends on the database schema and seed question bank. The architecture research confirms this is the critical path -- no quiz flow, AI generation, or analytics can work without the data layer. Pitfalls research demands RLS from day one and a cron keep-alive for Supabase.

**Delivers:** Supabase schema (all 5 tables), seed question bank (~300 verified CA DMV questions with category tags and explanations), data access layer, Supabase client configuration, RLS policies, cron keep-alive, project scaffold (Next.js 16 + Tailwind + shadcn/ui).

**Addresses features:** Question bank with category tags, progress persistence infrastructure, dark mode (CSS variables in root layout).

**Avoids pitfalls:** Missing RLS (enable from day one), Supabase pausing (cron keep-alive), hallucination foundation (verified seed questions are the ground truth for all future AI generation).

### Phase 2: Core Quiz Flow

**Rationale:** The quiz engine is the primary interaction loop. Architecture research recommends building it with static seed questions first (no AI) to validate the flow end-to-end before adding generation complexity. This is the "usable but basic quiz app" milestone.

**Delivers:** Quiz engine (session lifecycle), practice quiz mode, simulated DMV test mode, answer submission with immediate feedback/explanations, post-quiz summary with score and category breakdown, question-card UI with mobile responsiveness.

**Addresses features:** Practice quiz mode, simulated DMV test mode, answer explanations, score tracking, mobile-responsive UI, category-organized questions.

**Avoids pitfalls:** Sending all questions to client (serve one at a time), complex client state (server-authoritative with Server Actions).

### Phase 3: AI Question Variation Engine

**Rationale:** This is the core differentiator but depends on a working quiz flow and verified seed questions. The batch pre-generation pipeline must come first; real-time generation is a fallback only. Pitfalls research is emphatic: validate every generated variation against the seed's correct answer.

**Delivers:** Batch pre-generation script (Anthropic Batch API), question variation Zod schema, post-generation validation pipeline, Question Pool Manager (serve variations instead of seeds), real-time generation fallback with rate limiting and timeout handling.

**Addresses features:** AI-generated question variations, missed question tracking (foundation for review mode).

**Avoids pitfalls:** LLM hallucinations (validation pipeline), cost blowup (batch-first strategy), ambiguous questions (stem-only rephrasing initially), Vercel timeout (streaming + maxDuration + fallback).

### Phase 4: Analytics + Category Intelligence

**Rationale:** Analytics depends on accumulated quiz response data from Phases 2-3. The dashboard is the bridge between "take quizzes" and "study smarter" -- it enables category drill recommendations that connect insight to action.

**Delivers:** Analytics dashboard (category scores, weak area identification), category drill mode with auto-recommendation, trend charts over time, readiness prediction score.

**Addresses features:** Deep category analytics, category drill mode, readiness prediction, analytics trend charts.

**Avoids pitfalls:** None critical -- standard patterns. Ensure category scores update after every quiz (the "looks done but isn't" checklist item).

### Phase 5: Adaptive Learning (SRS + Review)

**Rationale:** Spaced repetition requires multi-session usage data and a working question pool to be meaningful. Pitfalls research warns about the SRS cold start problem -- ship category-based prioritization first (Phase 4), then layer FSRS on top. Flashcard mode and missed-question review with AI rephrasing are the payoff features that tie everything together.

**Delivers:** ts-fsrs integration (scheduler service, card state persistence, review logging), flashcard mode with SRS rating buttons, missed question review with AI-rephrased questions, study session recommendations ("these cards are due today").

**Addresses features:** Spaced repetition scheduling, flashcard mode with SRS, missed question review with AI re-phrasing.

**Avoids pitfalls:** SRS cold start (category prioritization already in place from Phase 4 as supplement), over-tuning FSRS parameters (use defaults, set desired_retention to 0.90).

### Phase Ordering Rationale

- **Data before logic, logic before AI:** The dependency chain is schema -> quiz engine -> AI generation -> analytics -> SRS. Each phase builds on the previous without rework.
- **Validate the loop before adding complexity:** Phase 2 delivers a usable quiz app with static questions. If the quiz flow has UX problems, fixing them without AI complexity is far cheaper.
- **Batch before real-time:** The cost optimization strategy (batch pre-generation) must be operational before real-time generation is wired up, or costs spike during development and testing.
- **Analytics before SRS:** Category intelligence (Phase 4) provides immediate value and mitigates the SRS cold start. Users see "you're weak in right-of-way" before FSRS kicks in.
- **Features that touch the same data layer are grouped:** Quiz modes share the quiz engine (Phase 2). AI features share the generation service and pool manager (Phase 3). Analytics and drill share aggregation logic (Phase 4). SRS features share the scheduler (Phase 5).

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 1 (seed question bank):** Sourcing 300 verified questions from the CA DMV handbook is content work, not code. Needs research into existing open question databases and handbook parsing strategy.
- **Phase 3 (AI variation engine):** Prompt engineering for constrained question rephrasing, batch API integration patterns, and validation pipeline design. The AI SDK + Anthropic SDK dual-use pattern needs careful implementation research.
- **Phase 5 (ts-fsrs integration):** The ts-fsrs API (Card types, repeat/next methods, ReviewLog persistence) needs implementation research. The library has a Next.js example but it is not extensively documented.

Phases with standard patterns (skip deep research):
- **Phase 2 (core quiz flow):** Well-documented Next.js App Router + Server Actions + Supabase patterns. Multiple reference implementations exist.
- **Phase 4 (analytics dashboard):** Standard Supabase aggregate queries + Recharts visualization. No novel technical challenges.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All versions verified against npm/official docs. Compatibility matrix confirmed. No speculative choices. |
| Features | HIGH | Competitor analysis covers 4 direct competitors. Feature priorities grounded in CA DMV test format (official source). Anti-features justified with real examples (Quizlet Q-Chat shutdown). |
| Architecture | HIGH | 4-layer pattern is standard for quiz apps. Hybrid question pool is the only non-obvious pattern, and it is well-justified by cost analysis. Database schema is concrete and complete. |
| Pitfalls | HIGH | All pitfalls cite official documentation (Supabase pricing, Vercel limits, Anthropic pricing). Hallucination risk is well-documented in academic literature. Recovery strategies are concrete. |

**Overall confidence:** HIGH

### Gaps to Address

- **Seed question sourcing:** Research does not specify exactly where 300 verified questions come from. The CA DMV handbook and sample tests are referenced, but a concrete sourcing and verification plan is needed during Phase 1 planning.
- **Road sign images:** The question bank will include road sign identification questions. Architecture mentions Supabase Storage (1GB free) for images but the pipeline for sourcing/storing sign images is unspecified.
- **Prompt engineering specifics:** The AI variation engine depends on well-crafted prompts for constrained rephrasing. The research identifies the pattern but the actual system prompt and few-shot examples need development and testing during Phase 3.
- **AI cost model validation:** The $5/month target assumes 95%+ database-served questions. This needs validation with realistic usage modeling (how many quizzes per day, how fast the pre-generated pool depletes).
- **Teen UX validation:** Pitfalls research flags teen disengagement as a risk and recommends a .gg gaming aesthetic. The specific visual design language (colors, animations, tone of voice) needs user testing with the target user.

## Sources

### Primary (HIGH confidence)
- [Next.js 16.1 blog post](https://nextjs.org/blog/next-16-1) -- version, features, React 19.2 requirement
- [Supabase pricing](https://supabase.com/pricing) -- free tier limits, pause behavior
- [Claude API pricing](https://platform.claude.com/docs/en/about-claude/pricing) -- Haiku costs, batch discount
- [Anthropic Batch API docs](https://platform.claude.com/docs/en/build-with-claude/batch-processing) -- 50% cost reduction
- [CA DMV sample knowledge tests](https://www.dmv.ca.gov/portal/driver-education-and-safety/educational-materials/sample-driver-license-dl-knowledge-tests/) -- test format
- [CA DMV Driver Handbooks](https://www.dmv.ca.gov/portal/driver-handbooks/) -- source material
- [ts-fsrs GitHub](https://github.com/open-spaced-repetition/ts-fsrs) -- API, Card types, examples
- [Vercel AI SDK 6 docs](https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data) -- generateObject, Zod integration
- [Supabase Next.js quickstart](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs) -- server client pattern

### Secondary (MEDIUM confidence)
- [DMV Genie](https://driving-tests.org/dmv-genie/) -- competitor feature analysis
- [Zutobi](https://zutobi.com/us) -- competitor feature analysis
- [Driving Theory 4 All](https://www.drivingtheory4all.co.uk/the-first-ai-theory-test-app) -- only existing AI-powered driving test prep (UK)
- [Quizlet Q-Chat sunset](https://quizlet.com/blog/ai-study-era) -- AI chatbot anti-feature evidence
- [AI-Generated MCQ Quality Study (PMC)](https://pmc.ncbi.nlm.nih.gov/articles/PMC11854382/) -- ~5% ambiguity rate in AI MCQs

### Tertiary (LOW confidence)
- [Supabase pause prevention (GitHub)](https://github.com/travisvn/supabase-pause-prevention) -- community cron pattern (needs verification of current behavior)
- [Duolingo gamification case study](https://www.youngurbanproject.com/duolingo-case-study/) -- referenced for anti-feature decision, not directly applicable

---
*Research completed: 2026-03-17*
*Ready for roadmap: yes*
