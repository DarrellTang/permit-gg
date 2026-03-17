# Stack Research

**Domain:** AI-powered quiz web app (CA driving permit test prep)
**Researched:** 2026-03-17
**Confidence:** HIGH

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Next.js | 16.1 | Full-stack React framework | Default on Vercel free tier, App Router for server/client split, Turbopack for fast dev, TypeScript-first. No reason to consider anything else given the Vercel constraint. |
| React | 19.2 | UI library | Required by Next.js 16. Server Components reduce client bundle, `use` hook simplifies async data. |
| TypeScript | 5.1+ | Type safety | Default in Next.js 16, zero config. Zod schema types flow from API validation to UI. Non-negotiable for a project using structured AI output. |
| Tailwind CSS | 4.2 | Styling | CSS-first config in v4 (no `tailwind.config.js`), 5x faster builds. Ships with Next.js 16 via `create-next-app`. Teen-friendly UI needs rapid iteration on visuals. |
| Node.js | 20.9+ | Runtime | Minimum required by Next.js 16. LTS until April 2026. |

### Database & Backend

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Supabase (Postgres) | - | Database, auth (future) | Already decided. Free tier: 500MB storage (2-5M rows), 50K MAU, unlimited API requests. More than enough for single-user quiz app. |
| @supabase/supabase-js | 2.99 | Supabase client | Official isomorphic client. Works in both server and client components. |
| @supabase/ssr | 0.9 | SSR cookie handling | Required for Next.js App Router. Creates `createBrowserClient` and `createServerClient` helpers. Replaces deprecated `@supabase/auth-helpers-nextjs`. |

### AI / LLM

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Vercel AI SDK (`ai`) | 6.x | AI orchestration layer | `generateObject` with Zod schemas is the killer feature: define a `QuestionSchema` in Zod, get typed quiz questions back. Handles streaming, retries, provider switching. Worth the abstraction over raw Anthropic SDK. |
| @ai-sdk/anthropic | 3.x | Claude provider for AI SDK | Plug-and-play Claude integration. Switch models by changing one string (`claude-sonnet-4-20250514`, `claude-haiku-4-20250414`). |
| @anthropic-ai/sdk | 0.79 | Direct Anthropic SDK | Use ONLY for Batch API (pre-generation). AI SDK 6 does not support Batch API yet. Pre-generate question variations via batch at 50% cost discount. |
| Zod | 4.3 | Schema validation | Defines question structure once, used for: AI SDK structured output, API validation, form validation, database type inference. Single source of truth. |

**AI cost strategy:** Use Claude 3.5 Haiku ($0.80/1M input, $4/1M output tokens) for question generation -- it is the cheapest capable model. Use Batch API for pre-generation (additional 50% discount = $0.40/$2 per 1M tokens). Reserve real-time generation for missed-question variation only.

### UI Components

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| shadcn/ui | v4 (CLI) | Component library | Not a dependency -- copies components into your codebase. Built on Radix UI + Tailwind. Full control, no version lock-in. Quiz cards, progress bars, modals all available as blocks. |
| Recharts | 3.8 | Analytics charts | Category score charts, trend lines, weak-area visualization. 1M+ weekly downloads, SVG-based, React-native API. Tremor is built on Recharts but adds unnecessary abstraction for this use case. |
| Motion (Framer Motion) | 12.36 | Animations | Card flips for flashcards, quiz transitions, progress celebrations. `AnimatePresence` for mount/unmount animations. The teen audience needs satisfying micro-interactions, not a sterile quiz UI. |

### Spaced Repetition

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| ts-fsrs | 5.2 | FSRS scheduling algorithm | Already decided. TypeScript implementation of FSRS (same algorithm as Anki). Handles scheduling intervals, difficulty adjustment, card state management. Pure logic, no UI opinions. |

### State Management

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Zustand | 5.x | Client-side state | Quiz session state (current question, score, timer) lives client-side. Zustand is 3KB, zero boilerplate, works with App Router. No need for Redux complexity or Jotai's atomic model for this scope. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| Turbopack | Dev server bundler | Built into Next.js 16, default with `next dev`. 100x faster incremental builds than Webpack. |
| ESLint | Linting | Ships with `create-next-app`. Next.js plugin included. |
| Prettier | Code formatting | Add `prettier-plugin-tailwindcss` for class sorting. |

## Installation

```bash
# Scaffold project
npx create-next-app@latest permit-gg --typescript --tailwind --eslint --app --turbopack

# Core dependencies
npm install @supabase/supabase-js @supabase/ssr ai @ai-sdk/anthropic zod zustand ts-fsrs recharts motion

# Direct Anthropic SDK (for Batch API pre-generation scripts only)
npm install @anthropic-ai/sdk

# Dev dependencies
npm install -D prettier prettier-plugin-tailwindcss

# shadcn/ui (run after project scaffold)
npx shadcn@latest init
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Vercel AI SDK | Direct @anthropic-ai/sdk | If you only ever call one provider and never need streaming to the client. We use both: AI SDK for real-time, direct SDK for batch. |
| Zustand | React Context | If state is trivially simple (1-2 values). Quiz session state is complex enough to warrant Zustand. |
| Zustand | Jotai | If you have many independent atoms of state that compose. Quiz state is more centralized (session object). |
| Recharts | Tremor | If you want pre-built dashboard blocks with zero customization. Tremor is higher-level but less flexible for custom category visualizations. |
| Motion (Framer Motion) | CSS animations | If you only need simple transitions. Flashcard flip, quiz card entrance, and score celebrations need orchestration that CSS alone handles poorly. |
| shadcn/ui | Radix UI directly | If you want lower-level primitives without styling. shadcn gives you Radix + Tailwind styling out of the box. |
| Recharts | Chart.js (react-chartjs-2) | If you need canvas rendering for performance with huge datasets. Our datasets are tiny (hundreds of data points max). SVG is better for styling. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| @supabase/auth-helpers-nextjs | Deprecated. No bug fixes, no new features. Will cause auth issues with App Router. | @supabase/ssr |
| Redux / Redux Toolkit | Massive overkill for single-user quiz app. Boilerplate-heavy. | Zustand |
| Prisma | Adds ORM complexity + cold start latency on serverless. Supabase client is sufficient for direct Postgres access. | @supabase/supabase-js with typed queries |
| Firebase | Wrong ecosystem. You already have Supabase. Firebase's real-time DB is overkill; Supabase Postgres is what you need for analytics queries. | Supabase |
| Pages Router | Legacy Next.js pattern. App Router is the default and future. All new docs/examples target App Router. | App Router |
| Webpack | Slower than Turbopack by 100x on incremental builds. Only use if Turbopack has a specific compatibility issue. | Turbopack |
| D3.js directly | Low-level, imperative API. Recharts wraps D3 in React components. Using D3 directly means fighting React's declarative model. | Recharts |
| OpenAI API | Project specifies Claude. Vercel AI SDK makes switching trivial if needed later, but start with Anthropic. | @ai-sdk/anthropic |

## Stack Patterns by Variant

**For pre-generated questions (batch, cost-optimized):**
- Use `@anthropic-ai/sdk` directly with Batch API
- Define question schema in Zod, validate batch output
- Store validated questions in Supabase
- 50% cost reduction, process up to 10K questions per batch

**For real-time question variation (on-demand):**
- Use Vercel AI SDK `generateObject` with `@ai-sdk/anthropic`
- Stream from Next.js Route Handler or Server Action
- Same Zod schema validates output
- Use for missed-question rephrasing where pre-generation is impractical

**For analytics dashboard:**
- Server Components fetch aggregated data from Supabase
- Pass to Recharts client components for rendering
- No client-side data fetching needed for read-only analytics

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| Next.js 16.1 | React 19.2, Node 20.9+ | React 19.2 is the default; do not use React 18 |
| Tailwind CSS 4.2 | Next.js 16 via @tailwindcss/postcss | CSS-first config, no tailwind.config.js needed |
| shadcn/ui v4 | Tailwind 4, React 19 | Run `npx shadcn@latest init` after project setup |
| @supabase/supabase-js 2.99 | Node 20+ | Dropped Node 18 support in 2.79.0 |
| AI SDK 6.x | @ai-sdk/anthropic 3.x | Must use matching major versions |
| ts-fsrs 5.x | Node 18+ | Pure TypeScript, no native dependencies |
| Zod 4.3 | AI SDK 6.x | AI SDK 6 supports Standard JSON Schema interface; Zod 4 implements it natively |
| Motion 12.x | React 19 | Formerly "framer-motion" -- import from `motion/react` |

## Supabase Free Tier Constraints

| Resource | Limit | Impact on This Project |
|----------|-------|------------------------|
| Database storage | 500 MB | ~2-5M rows. More than enough for questions + analytics for single user. |
| Monthly active users | 50,000 | Irrelevant for single user, plenty for classmates. |
| API requests | Unlimited | No throttling concern. |
| Edge functions | 500K/month | Sufficient for real-time question gen if using edge functions. |
| File storage | 1 GB | Not needed for this app (no uploads). |
| Projects | 2 active | Only need 1. |
| Inactivity pause | 7 days | **PITFALL**: Free projects pause after 1 week of no activity. Must ping or use regularly, or accept cold-start delay. |

## Sources

- [Next.js 16.1 blog post](https://nextjs.org/blog/next-16-1) -- version, features, React 19.2 requirement (HIGH confidence)
- [Next.js 16 blog post](https://nextjs.org/blog/next-16) -- Node.js 20.9 requirement, Turbopack default (HIGH confidence)
- [@supabase/supabase-js npm](https://www.npmjs.com/package/@supabase/supabase-js) -- v2.99.2 (HIGH confidence)
- [@supabase/ssr npm](https://www.npmjs.com/package/@supabase/ssr) -- v0.9.0 (HIGH confidence)
- [Vercel AI SDK 6 announcement](https://vercel.com/blog/ai-sdk-6) -- Agent abstraction, generateObject improvements (HIGH confidence)
- [@ai-sdk/anthropic npm](https://www.npmjs.com/package/@ai-sdk/anthropic) -- v3.0.58 (HIGH confidence)
- [@anthropic-ai/sdk npm](https://www.npmjs.com/package/@anthropic-ai/sdk) -- v0.79.0 (HIGH confidence)
- [Anthropic Batch API docs](https://platform.claude.com/docs/en/build-with-claude/batch-processing) -- 50% cost reduction, 10K batch limit (HIGH confidence)
- [Anthropic pricing](https://platform.claude.com/docs/en/about-claude/pricing) -- Haiku 3.5 at $0.80/$4 per 1M tokens (HIGH confidence)
- [ts-fsrs npm](https://www.npmjs.com/package/ts-fsrs) -- v5.2.3 (HIGH confidence)
- [Zod v4 release notes](https://zod.dev/v4) -- v4.3.6 (HIGH confidence)
- [Tailwind CSS v4 blog](https://tailwindcss.com/blog/tailwindcss-v4) -- CSS-first config, performance (HIGH confidence)
- [tailwindcss npm](https://www.npmjs.com/package/tailwindcss) -- v4.2.1 (HIGH confidence)
- [shadcn/ui CLI v4 changelog](https://ui.shadcn.com/docs/changelog/2026-03-cli-v4) -- project scaffolding, Tailwind v4 support (HIGH confidence)
- [Recharts npm](https://www.npmjs.com/package/recharts) -- v3.8.0 (HIGH confidence)
- [Motion (Framer Motion) npm](https://www.npmjs.com/package/framer-motion) -- v12.36.0 (HIGH confidence)
- [Supabase pricing](https://supabase.com/pricing) -- free tier limits (HIGH confidence)
- [AI SDK generateObject docs](https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data) -- Zod schema integration (HIGH confidence)

---
*Stack research for: permit-gg (AI-powered CA driving permit quiz app)*
*Researched: 2026-03-17*
