# Phase 1: Foundation + Question Bank - Research

**Researched:** 2026-03-17
**Domain:** Next.js 16 project scaffold, Supabase schema, CA DMV question bank, cyberpunk UI shell
**Confidence:** HIGH

## Summary

Phase 1 establishes the entire project foundation: a Next.js 16 App Router scaffold deployed on Vercel, a Supabase Postgres database with the question bank schema and ~300 verified CA DMV seed questions, and a "Magical Girl Cyberpunk" UI shell with adaptive navigation and a marketing landing page. This is a greenfield project with no existing code.

The critical technical decisions are: Tailwind CSS 4 with CSS-first theming using OKLCH color variables for the neon cyberpunk palette, shadcn/ui v4 as the component foundation with heavy customization, route groups to separate the marketing landing page from the app shell, and Supabase CLI migrations for schema version control with SQL seed files for the question bank.

**Primary recommendation:** Build in dependency order -- project scaffold first, then Supabase schema + migrations, then seed question data, then UI shell with theming, then landing page. Each layer depends on the previous.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **Visual Identity:** "Magical Girl Cyberpunk" aesthetic inspired by Bubblegum Crisis anime -- feminine meets high-tech, neon-soaked on dark chrome
- **Color palette:** Hot pinks, electric purples, cyan highlights on dark backgrounds (pastel neons over dark steel)
- **Dark mode is primary;** light mode available as toggle for bright environments
- **Full animation effects:** Particle effects on correct answers, screen shake on wrong, combo counters, XP-bar-style progress
- **Sound effects** on correct/wrong answers with mute toggle in settings
- **Logo + wordmark design:** Cyberpunk-styled "PERMIT.GG" plus icon
- **Cyberpunk mascot character:** Magical Girl style, reacts to progress, encourages, celebrates milestones
- **Gaming/competitive UI energy** matching the .gg domain
- **Question Sourcing:** Hybrid approach -- compile from existing free practice test databases + AI-generate from handbook sections with low coverage
- **CA DMV handbook** ingested both ways: PDF download as authoritative source, web scrape for easier parsing
- **Verification:** Claude cross-validates against handbook, human spot-checks ~20% sample
- **Each question includes:** Inline explanation + CA DMV handbook section/page reference
- **Adaptive navigation:** Sidebar with hub on desktop, bottom tab bar on mobile
- **Home screen:** Smart dashboard with readiness score, today's recommended action, recent quiz scores, quick-start buttons
- **Onboarding:** 3-4 screen quick intro walkthrough, under 30 seconds
- **Landing/marketing page** at root URL with "Start Studying" CTA; app lives behind the CTA
- **8 categories:** Road Signs, Right-of-Way, Traffic Laws, Speed Limits, DUI/Drug Laws, Safe Driving, Parking, Sharing the Road
- **Distribution:** Weighted by real CA DMV test emphasis, minimum 25 questions per category
- **No difficulty tagging at seed time** -- difficulty inferred from miss rates later
- **~300 total seed questions** across all categories

### Claude's Discretion
- Font selection (within Magical Girl Cyberpunk aesthetic)
- Question transition animations
- Exact spacing, sizing, micro-interaction details
- Light mode palette adaptation
- Mascot design details (personality, poses, reactions)
- Landing page copy and structure (using marketing skills)
- Database schema design
- Exact loading skeleton design

### Deferred Ideas (OUT OF SCOPE)
- None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| QENG-01 | User sees questions sourced from a verified CA DMV question bank (~300 seed questions) | Supabase schema design, seed data strategy, CA DMV handbook sourcing, SQL seed files |
| QENG-02 | Every question is tagged to a CA DMV category (road signs, right-of-way, traffic laws, speed limits, DUI/drug laws, safe driving, parking, sharing the road) | Category taxonomy as typed constants, category column with index, weighted distribution config |
| QENG-06 | All questions use 4-option multiple choice format matching the real CA DMV test | Question schema: question_text + correct_answer + wrong_answers[3] + explanation + handbook_reference |
| UI-01 | App is mobile-responsive with touch-friendly targets | Tailwind CSS 4 responsive utilities, shadcn/ui mobile-friendly components, adaptive nav pattern |
| UI-02 | App supports dark mode from launch | next-themes + Tailwind dark: variant + OKLCH CSS variables, dark-first design |
| UI-03 | UI is engaging for a teen audience (not sterile/corporate) | Cyberpunk theming, Motion animations, custom font pairing, neon color palette, mascot character |
</phase_requirements>

## Standard Stack

### Core (Phase 1 Specific)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1 | Full-stack React framework | App Router, Turbopack, React 19.2. `create-next-app` scaffolds with TS + Tailwind + ESLint |
| React | 19.2 | UI library | Ships with Next.js 16. Server Components for data fetching |
| TypeScript | 5.1+ | Type safety | Zero-config with Next.js 16 |
| Tailwind CSS | 4.2 | Styling | CSS-first config via `@theme` directive. OKLCH color format. No `tailwind.config.js` |
| shadcn/ui | v4 (CLI) | Component library | Copies into codebase. Built on Radix UI + Tailwind 4. Full control for cyberpunk customization |
| next-themes | latest | Dark mode toggle | 2-line integration. `attribute="class"` works with Tailwind `dark:` variant. No flash |
| Motion | 12.x | Animations | Import from `motion/react`. AnimatePresence for page transitions. React 19 compatible |
| @supabase/supabase-js | 2.99 | Database client | Isomorphic client for server and browser |
| @supabase/ssr | 0.9 | SSR integration | Cookie handling for Next.js App Router. Replaces deprecated auth-helpers |
| Zod | 4.3 | Schema validation | Question schema definition. Shared between seed validation and future AI output |

### Supporting (Phase 1 Specific)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Supabase CLI | latest | Local dev, migrations, seeding | Schema management, `supabase/migrations/` for SQL, `supabase/seed.sql` for questions |
| Prettier | latest | Code formatting | With `prettier-plugin-tailwindcss` for class sorting |

### Fonts (Claude's Discretion -- Recommendation)

| Font | Source | Role | Rationale |
|------|--------|------|-----------|
| Orbitron | Google Fonts | Display / headings | Geometric, futuristic, strong cyberpunk identity. Best for logo-adjacent text, section headers, scores |
| Chakra Petch | Google Fonts | UI / subheadings | Angular strokes with readability. "All-time favorite cyberpunk UI font." Great for nav items, labels, buttons |
| Inter | Google Fonts (variable) | Body text | Maximum readability at all sizes. Clean, neutral, lets the cyberpunk elements shine without hurting legibility |

**Font loading via `next/font/google`** -- zero layout shift, automatic self-hosting, CSS variable integration with Tailwind.

### Installation (Phase 1)

```bash
# Scaffold project
npx create-next-app@latest permit-gg --typescript --tailwind --eslint --app --src-dir --turbopack

# Phase 1 dependencies
npm install @supabase/supabase-js @supabase/ssr zod next-themes motion

# Dev dependencies
npm install -D prettier prettier-plugin-tailwindcss

# shadcn/ui initialization (after scaffold)
npx shadcn@latest init

# shadcn/ui components needed for Phase 1
npx shadcn@latest add button card tabs navigation-menu sheet separator badge skeleton toggle

# Supabase CLI (if not installed globally)
npm install -D supabase
npx supabase init
```

## Architecture Patterns

### Phase 1 Project Structure

```
src/
├── app/
│   ├── (marketing)/           # Landing page - separate layout, no app shell
│   │   ├── layout.tsx         # Minimal layout (no sidebar/nav)
│   │   └── page.tsx           # Landing/marketing page at root URL "/"
│   ├── (app)/                 # App shell - shared layout with navigation
│   │   ├── layout.tsx         # App layout with sidebar (desktop) / bottom tabs (mobile)
│   │   ├── dashboard/
│   │   │   └── page.tsx       # Smart dashboard (home screen after CTA)
│   │   └── onboarding/
│   │       └── page.tsx       # Quick intro walkthrough
│   ├── layout.tsx             # Root layout: fonts, ThemeProvider, metadata
│   └── globals.css            # Tailwind + theme CSS variables
├── components/
│   ├── layout/
│   │   ├── sidebar.tsx        # Desktop sidebar navigation
│   │   ├── bottom-tabs.tsx    # Mobile bottom tab bar
│   │   ├── theme-toggle.tsx   # Dark/light mode switch
│   │   └── app-shell.tsx      # Responsive shell (sidebar vs tabs)
│   ├── landing/
│   │   ├── hero.tsx           # Landing page hero section
│   │   ├── features.tsx       # Feature highlights
│   │   └── cta.tsx            # Call-to-action button/section
│   ├── ui/                    # shadcn/ui base components
│   └── mascot/
│       └── mascot.tsx         # Cyberpunk mascot character component
├── lib/
│   ├── supabase/
│   │   ├── server.ts          # Server-side Supabase client
│   │   └── client.ts          # Browser-side Supabase client
│   ├── constants/
│   │   ├── categories.ts      # 8 CA DMV categories with weights + metadata
│   │   └── theme.ts           # Color tokens, animation config
│   └── types/
│       └── question.ts        # Question, Category types + Zod schemas
├── hooks/
│   └── use-media-query.ts     # Responsive breakpoint detection
└── fonts/
    └── index.ts               # Font configuration (Orbitron, Chakra Petch, Inter)
supabase/
├── config.toml                # Supabase CLI configuration
├── migrations/
│   ├── 00001_create_categories.sql
│   ├── 00002_create_seed_questions.sql
│   └── 00003_enable_rls.sql
└── seed.sql                   # ~300 CA DMV seed questions
```

### Pattern 1: Route Groups for Marketing vs App

**What:** Use Next.js route groups `(marketing)` and `(app)` to create completely different layouts for the landing page vs the app shell, without affecting URLs.

**When to use:** This phase. The landing page at `/` has no sidebar/nav. The app at `/dashboard` has the full app shell.

**Example:**
```typescript
// src/app/(marketing)/layout.tsx
// Source: https://nextjs.org/docs/app/building-your-application/routing/route-groups
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen">{children}</div>
}

// src/app/(app)/layout.tsx
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar className="hidden lg:block" />
      <main className="flex-1 pb-16 lg:pb-0">{children}</main>
      <BottomTabs className="fixed bottom-0 lg:hidden" />
    </div>
  )
}
```

**Important:** Both route groups share the root `layout.tsx` (fonts, ThemeProvider, metadata). Navigating between `(marketing)` and `(app)` triggers a full page reload if they have separate root layouts -- avoid this by keeping one root layout.

### Pattern 2: CSS-First Cyberpunk Theming with Tailwind 4

**What:** Define the entire "Magical Girl Cyberpunk" color system as OKLCH CSS variables in `globals.css`, referenced by Tailwind via `@theme inline`. Dark mode is primary; light mode is the alternate.

**When to use:** All styling in this phase and every subsequent phase.

**Example:**
```css
/* src/app/globals.css */
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-border: var(--border);
  --color-ring: var(--ring);
  --color-neon-pink: var(--neon-pink);
  --color-neon-purple: var(--neon-purple);
  --color-neon-cyan: var(--neon-cyan);
  --font-display: var(--font-orbitron);
  --font-ui: var(--font-chakra);
  --font-body: var(--font-inter);
}

/* DARK MODE IS PRIMARY -- .dark class applied by default via next-themes */
.dark {
  --background: oklch(0.13 0.01 280);         /* Deep chrome/steel */
  --foreground: oklch(0.95 0.01 280);         /* Near-white */
  --primary: oklch(0.65 0.28 340);            /* Hot pink */
  --primary-foreground: oklch(0.98 0 0);      /* White on pink */
  --secondary: oklch(0.55 0.25 300);          /* Electric purple */
  --secondary-foreground: oklch(0.98 0 0);
  --accent: oklch(0.75 0.15 195);             /* Cyan highlight */
  --accent-foreground: oklch(0.15 0.01 280);
  --muted: oklch(0.20 0.02 280);             /* Dark steel */
  --muted-foreground: oklch(0.65 0.02 280);
  --card: oklch(0.17 0.02 280);              /* Slightly lighter than bg */
  --card-foreground: oklch(0.95 0.01 280);
  --border: oklch(0.30 0.04 300);            /* Subtle purple border */
  --ring: oklch(0.65 0.28 340);              /* Pink focus ring */
  --neon-pink: oklch(0.70 0.30 340);         /* Glow effects */
  --neon-purple: oklch(0.60 0.28 300);       /* Glow effects */
  --neon-cyan: oklch(0.80 0.18 195);         /* Glow effects */
}

:root {
  /* Light mode -- inverted for readability */
  --background: oklch(0.97 0.01 280);
  --foreground: oklch(0.15 0.02 280);
  --primary: oklch(0.55 0.28 340);
  --primary-foreground: oklch(0.98 0 0);
  --secondary: oklch(0.45 0.22 300);
  --secondary-foreground: oklch(0.98 0 0);
  --accent: oklch(0.55 0.15 195);
  --accent-foreground: oklch(0.98 0 0);
  --muted: oklch(0.92 0.01 280);
  --muted-foreground: oklch(0.45 0.02 280);
  --card: oklch(0.98 0.005 280);
  --card-foreground: oklch(0.15 0.02 280);
  --border: oklch(0.85 0.02 300);
  --ring: oklch(0.55 0.28 340);
  --neon-pink: oklch(0.55 0.28 340);
  --neon-purple: oklch(0.45 0.22 300);
  --neon-cyan: oklch(0.55 0.15 195);
}
```

**Note:** OKLCH values above are starting points. Tune visually in the browser. The three-number format is `oklch(lightness chroma hue)` where lightness 0-1, chroma 0-0.4, hue 0-360.

### Pattern 3: Adaptive Navigation (Sidebar Desktop / Tabs Mobile)

**What:** Single app shell component that renders a sidebar on desktop (lg breakpoint) and a bottom tab bar on mobile, using Tailwind responsive classes.

**When to use:** The `(app)` route group layout.

**Example:**
```typescript
// src/components/layout/app-shell.tsx
"use client"

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar - hidden on mobile */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-border">
        <Sidebar />
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
        {children}
      </main>

      {/* Mobile bottom tabs - hidden on desktop */}
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card lg:hidden">
        <BottomTabs />
      </nav>
    </div>
  )
}
```

### Pattern 4: Supabase Client Factory (Server vs Browser)

**What:** Two separate Supabase client factories -- one for server components/actions, one for browser components. The server client reads cookies for auth (future-proofing); the browser client uses the anon key.

**When to use:** Every database interaction.

**Example:**
```typescript
// src/lib/supabase/server.ts
// Source: https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )
}
```

### Anti-Patterns to Avoid

- **Using `tailwind.config.js` with Tailwind 4:** CSS-first config is the standard. All theming in `globals.css` via `@theme`.
- **Importing from `"framer-motion"`:** Deprecated entry point. Use `"motion/react"` instead.
- **Using `@supabase/auth-helpers-nextjs`:** Deprecated. Use `@supabase/ssr` for App Router.
- **Putting business logic in `page.tsx` files:** Pages are thin -- compose components, call server actions. Logic lives in `server/services/`.
- **Hardcoding colors instead of CSS variables:** Every color must go through the theme variable system for dark/light mode switching.
- **Single root layout for both marketing and app:** Use route groups with separate layouts to keep the landing page clean.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Dark mode toggle + persistence | Custom localStorage + class management | next-themes | Handles SSR flash prevention, system preference detection, localStorage persistence, class toggling |
| Responsive sidebar/tabs detection | Custom resize listeners | Tailwind `lg:hidden` / `hidden lg:flex` | CSS-only, no JavaScript, no hydration mismatch |
| Component primitives (button, card, dialog) | Custom styled components | shadcn/ui (copies into codebase) | Accessible, Radix-based, fully customizable, Tailwind 4 compatible |
| Schema validation | Custom type guards | Zod schemas | Runtime validation + TypeScript inference in one definition |
| Database migrations | Manual SQL in dashboard | Supabase CLI migrations | Version controlled, repeatable, team-friendly |
| Font optimization | Manual @font-face + preload | `next/font/google` | Zero layout shift, automatic self-hosting, CSS variable integration |
| Page transitions | Custom CSS transitions | Motion `AnimatePresence` | Handles mount/unmount animations, spring physics, gesture support |

## Common Pitfalls

### Pitfall 1: Tailwind 4 CSS Variable Scoping with shadcn/ui

**What goes wrong:** shadcn/ui v4 generates CSS variables in OKLCH format. If you define your own theme variables without matching the exact naming convention (e.g., `--primary`, `--primary-foreground`), shadcn components render with wrong colors.
**Why it happens:** shadcn/ui components reference specific CSS variable names like `bg-primary`, `text-primary-foreground`. These map to `--primary` and `--primary-foreground` via the `@theme inline` directive.
**How to avoid:** Follow the exact shadcn/ui variable naming convention. Override values, not names. Run `npx shadcn@latest init` first, then customize the generated CSS variables.
**Warning signs:** Components appear unstyled or have jarring color mismatches.

### Pitfall 2: Route Group Full Page Reload

**What goes wrong:** Navigation between the landing page `(marketing)` and the app `(app)` causes a full page reload, killing the SPA feel.
**Why it happens:** If `(marketing)` and `(app)` each have their own root `layout.tsx` (i.e., no shared root layout above them), Next.js treats them as separate applications.
**How to avoid:** Keep a single root `layout.tsx` at `src/app/layout.tsx` that wraps both route groups. Each route group has its own nested layout for structural differences (sidebar vs no sidebar), but they share the root (fonts, ThemeProvider, metadata).
**Warning signs:** Full page flash when clicking "Start Studying" CTA on landing page.

### Pitfall 3: Font Loading Flash / Layout Shift

**What goes wrong:** Cyberpunk fonts (Orbitron, Chakra Petch) load after the page renders, causing a visible font swap and layout shift.
**Why it happens:** Loading multiple Google Fonts without `next/font` optimization means the browser downloads fonts after the HTML is parsed.
**How to avoid:** Use `next/font/google` for all three fonts. Set `display: 'swap'` and use CSS variables (`variable` option) so Tailwind can reference them. Define fallback font stacks.
**Warning signs:** Text briefly appears in default sans-serif before switching to Orbitron/Chakra Petch.

### Pitfall 4: Supabase Free Tier Pausing

**What goes wrong:** The Supabase free project pauses after 7 days of inactivity. When the user returns, the app shows errors.
**Why it happens:** Supabase aggressively manages free tier resources.
**How to avoid:** Set up a Vercel cron job (free on Hobby plan) that pings the database daily. Add graceful error handling for the "database is waking up" state.
**Warning signs:** App shows empty/error state after a week of no usage.

### Pitfall 5: Question Bank Quality Issues

**What goes wrong:** Seed questions contain incorrect answers, outdated information (laws changed), or ambiguous wording.
**Why it happens:** Scraping existing practice test sites often yields questions from older handbook editions. AI-generated questions may conflate California rules with other states.
**How to avoid:** Use the 2026 CA DMV Driver Handbook (official PDF) as the single source of truth. Every seed question must include a handbook section reference. Human spot-check 20% of questions against the handbook.
**Warning signs:** Questions reference speed limits or BAC levels that don't match current CA law.

### Pitfall 6: Missing RLS on Supabase Tables

**What goes wrong:** All data is publicly accessible via the anon key. When classmates are added later, everyone can see and modify all data.
**Why it happens:** Developers skip RLS for single-user MVP.
**How to avoid:** Enable RLS on every table from day one. For Phase 1 (no auth), create simple policies: `SELECT` allowed for all (questions are public), `INSERT/UPDATE/DELETE` denied (admin operations only via service key in migrations/seeds).
**Warning signs:** Anyone who inspects network traffic can read all database tables.

## Code Examples

### Font Configuration with next/font/google

```typescript
// src/fonts/index.ts
// Source: https://nextjs.org/docs/app/getting-started/fonts
import { Inter, Orbitron, Chakra_Petch } from "next/font/google"

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
})

export const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-chakra",
  display: "swap",
})
```

### Root Layout with ThemeProvider

```typescript
// src/app/layout.tsx
// Source: https://ui.shadcn.com/docs/dark-mode/next
import { ThemeProvider } from "@/components/theme-provider"
import { inter, orbitron, chakraPetch } from "@/fonts"
import "./globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${orbitron.variable} ${chakraPetch.variable}`}
    >
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### Supabase Migration: Categories Table

```sql
-- supabase/migrations/00001_create_categories.sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  weight DECIMAL(3,2) NOT NULL DEFAULT 0.125,
  sort_order INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO categories (slug, name, description, weight, sort_order) VALUES
  ('road-signs', 'Road Signs', 'Traffic signs, signals, and pavement markings', 0.15, 1),
  ('right-of-way', 'Right-of-Way', 'Who goes first at intersections and crosswalks', 0.15, 2),
  ('traffic-laws', 'Traffic Laws', 'Rules of the road, turns, lanes, and signals', 0.15, 3),
  ('speed-limits', 'Speed Limits', 'Speed zones, adjusting speed for conditions', 0.10, 4),
  ('dui-drug-laws', 'DUI/Drug Laws', 'Blood alcohol limits, drug impairment, penalties', 0.10, 5),
  ('safe-driving', 'Safe Driving', 'Following distance, weather, night driving, emergencies', 0.15, 6),
  ('parking', 'Parking', 'Parallel parking, curb colors, restricted zones', 0.10, 7),
  ('sharing-the-road', 'Sharing the Road', 'Pedestrians, cyclists, motorcycles, large vehicles', 0.10, 8);
```

### Supabase Migration: Seed Questions Table

```sql
-- supabase/migrations/00002_create_seed_questions.sql
CREATE TABLE seed_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES categories(id),
  question_text TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  wrong_answers TEXT[] NOT NULL CHECK (array_length(wrong_answers, 1) = 3),
  explanation TEXT NOT NULL,
  handbook_reference TEXT NOT NULL,
  source TEXT DEFAULT 'manual',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_seed_questions_category ON seed_questions(category_id);
```

### Supabase Migration: RLS Policies

```sql
-- supabase/migrations/00003_enable_rls.sql
-- Source: https://supabase.com/docs/guides/database/postgres/row-level-security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE seed_questions ENABLE ROW LEVEL SECURITY;

-- Public read access (questions are not sensitive)
CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Seed questions are viewable by everyone"
  ON seed_questions FOR SELECT
  TO anon, authenticated
  USING (true);

-- No public write access (admin only via service role key)
-- INSERT/UPDATE/DELETE require service_role, which is server-side only
```

### Question Type Definition

```typescript
// src/lib/types/question.ts
import { z } from "zod"

export const CategorySlug = z.enum([
  "road-signs",
  "right-of-way",
  "traffic-laws",
  "speed-limits",
  "dui-drug-laws",
  "safe-driving",
  "parking",
  "sharing-the-road",
])
export type CategorySlug = z.infer<typeof CategorySlug>

export const SeedQuestionSchema = z.object({
  id: z.string().uuid(),
  category_id: z.string().uuid(),
  question_text: z.string().min(10),
  correct_answer: z.string().min(1),
  wrong_answers: z.array(z.string().min(1)).length(3),
  explanation: z.string().min(10),
  handbook_reference: z.string().min(1),
  source: z.string().default("manual"),
})
export type SeedQuestion = z.infer<typeof SeedQuestionSchema>

export const CATEGORY_WEIGHTS: Record<CategorySlug, number> = {
  "road-signs": 0.15,
  "right-of-way": 0.15,
  "traffic-laws": 0.15,
  "speed-limits": 0.10,
  "dui-drug-laws": 0.10,
  "safe-driving": 0.15,
  "parking": 0.10,
  "sharing-the-road": 0.10,
}

export const MIN_QUESTIONS_PER_CATEGORY = 25
export const TARGET_TOTAL_QUESTIONS = 300
```

### Motion Page Transition (Cyberpunk Glitch)

```typescript
// src/components/layout/page-transition.tsx
"use client"
import { motion, AnimatePresence } from "motion/react"
import { usePathname } from "next/navigation"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, x: 8, filter: "blur(4px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, x: -8, filter: "blur(4px)" }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.js` | CSS-first `@theme` directive | Tailwind 4 (Jan 2026) | No JS config file. All theme tokens in CSS |
| HSL color format | OKLCH color format | shadcn/ui v4 + Tailwind 4 | Perceptually uniform colors. Better for neon/vivid palettes |
| `framer-motion` import | `motion/react` import | Motion v12 (2025) | Rebranded. Old import still works but deprecated |
| `@supabase/auth-helpers-nextjs` | `@supabase/ssr` | 2024 | Old package deprecated. SSR package works with App Router |
| `tailwind.config.js` dark mode | `@custom-variant dark` in CSS | Tailwind 4 | No JS needed for dark mode config |

## Open Questions

1. **Seed Question Sourcing Strategy**
   - What we know: Hybrid approach decided (scrape existing databases + AI from handbook). CA DMV handbook 2026 edition is the authoritative source. Sites like epermittest.com have "enormous databases" of approved questions.
   - What's unclear: Copyright/licensing of scraped questions from third-party sites. Whether to use Claude to generate all 300 from the handbook directly (cleanest IP) or adapt existing public domain questions.
   - Recommendation: Generate all seed questions using Claude from the official CA DMV handbook PDF. This avoids copyright issues entirely. Cross-validate with public practice tests for coverage gaps, but write original question text. Human spot-check 20% as decided.

2. **Mascot Character Implementation**
   - What we know: "Magical Girl Cyberpunk" mascot that reacts to progress, encourages, celebrates milestones.
   - What's unclear: Whether to use static SVG illustrations (multiple poses), animated Lottie files, or CSS-animated character. Scope for Phase 1 vs later phases.
   - Recommendation: Phase 1 should include 3-5 static SVG mascot poses (neutral, encouraging, celebrating). Animation of the mascot can layer on in Phase 2+. Focus on character design and a few key poses that appear on the dashboard and onboarding.

3. **Landing Page Deployment URL**
   - What we know: Landing page at root URL with "Start Studying" CTA. App lives "behind" the CTA.
   - What's unclear: Whether to use `permit.gg` root vs `app.permit.gg` subdomain vs `/app` route prefix.
   - Recommendation: Use route groups. Root `/` is the landing page via `(marketing)`. The app is at `/dashboard`, `/quiz`, etc. via `(app)`. No subdomain needed. Simplest to deploy and maintain on Vercel.

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Vitest + @testing-library/react |
| Config file | `vitest.config.mts` (created in Wave 0) |
| Quick run command | `npx vitest run --reporter=verbose` |
| Full suite command | `npx vitest run` |

### Phase Requirements -> Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| QENG-01 | Seed questions exist in database (~300) | integration | `npx vitest run tests/seed-questions.test.ts -t "seed count"` | Wave 0 |
| QENG-02 | Every question tagged to a category | integration | `npx vitest run tests/seed-questions.test.ts -t "category tags"` | Wave 0 |
| QENG-06 | All questions have 4 options (1 correct + 3 wrong) | unit | `npx vitest run tests/question-schema.test.ts -t "4-option format"` | Wave 0 |
| UI-01 | Responsive layout renders on mobile/desktop | smoke | Manual -- visual check in Chrome DevTools responsive mode | manual-only (CSS layout) |
| UI-02 | Dark mode toggle works | smoke | Manual -- toggle theme, verify CSS variables apply | manual-only (visual) |
| UI-03 | Teen-friendly UI (not sterile) | smoke | Manual -- visual review of cyberpunk theme application | manual-only (subjective) |

### Sampling Rate

- **Per task commit:** `npx vitest run --reporter=verbose`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green + manual visual checks for UI requirements

### Wave 0 Gaps

- [ ] `vitest.config.mts` -- Vitest configuration with jsdom, React plugin, tsconfig paths
- [ ] `tests/question-schema.test.ts` -- Zod schema validation tests for question format
- [ ] `tests/seed-questions.test.ts` -- Integration tests verifying seed data in Supabase
- [ ] Dev dependencies: `vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom vite-tsconfig-paths`

## Sources

### Primary (HIGH confidence)
- [Next.js 16 Installation Docs](https://nextjs.org/docs/app/getting-started/installation) -- create-next-app defaults, Node 20.9+ requirement
- [Next.js Route Groups](https://nextjs.org/docs/app/building-your-application/routing/route-groups) -- Separate layouts for marketing vs app
- [shadcn/ui Theming](https://ui.shadcn.com/docs/theming) -- CSS variable convention, OKLCH format, @theme inline
- [shadcn/ui Dark Mode (Next.js)](https://ui.shadcn.com/docs/dark-mode/next) -- ThemeProvider setup, next-themes integration
- [shadcn/ui Next.js Installation](https://ui.shadcn.com/docs/installation/next) -- Init command, component additions
- [Tailwind CSS 4 Dark Mode](https://tailwindcss.com/docs/dark-mode) -- @custom-variant, class-based toggling
- [Supabase Database Seeding](https://supabase.com/docs/guides/local-development/seeding-your-database) -- seed.sql location, config.toml, execution order
- [Supabase Database Migrations](https://supabase.com/docs/guides/deployment/database-migrations) -- Migration file conventions
- [Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security) -- Policy creation, anon role, public read patterns
- [Supabase Next.js Quickstart](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs) -- Server client setup, env vars
- [Motion for React Docs](https://motion.dev/docs/react) -- Import from motion/react, AnimatePresence
- [Next.js Font Optimization](https://nextjs.org/docs/app/getting-started/fonts) -- next/font/google, CSS variables, display swap
- [Next.js Vitest Guide](https://nextjs.org/docs/app/guides/testing/vitest) -- Configuration, jsdom, React Testing Library

### Secondary (MEDIUM confidence)
- [Chakra Petch (Google Fonts)](https://fonts.google.com/specimen/Chakra+Petch) -- Character set, weights, cyberpunk suitability
- [epermittest.com CA Practice Tests](https://www.epermittest.com/california/practice-permit-test) -- CA DMV question categories, test format
- [driving-tests.org CA DMV](https://driving-tests.org/california/) -- Question distribution, category structure
- [Cyberpunk UI Fonts (Wendy Zhou)](https://www.wendyzhou.se/blog/4-best-cyberpunk-ui-font-tips-examples/) -- Chakra Petch as "all-time favorite cyberpunk UI font"
- [shadcn/ui Tailwind v4 Migration](https://www.shadcnblocks.com/blog/tailwind4-shadcn-themeing/) -- Real-world theming patterns

### Tertiary (LOW confidence)
- CA DMV test category weights are estimated from practice test proportions across multiple sites. The real DMV does not publish exact category weights. The weights in this research (0.10-0.15 per category) are reasonable approximations. Validate against the official handbook chapter lengths.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- All libraries verified via official docs and npm
- Architecture: HIGH -- Route groups, Supabase patterns verified with official Next.js and Supabase docs
- Theming/fonts: HIGH -- shadcn/ui v4 theming docs verified, font availability confirmed on Google Fonts
- Question bank schema: HIGH -- Standard Postgres patterns, Supabase migration workflow verified
- Category weights: LOW -- No official CA DMV category distribution published; estimated from practice test sites
- Pitfalls: HIGH -- Verified against official docs and PITFALLS.md research

**Research date:** 2026-03-17
**Valid until:** 2026-04-17 (stable domain; Next.js 16 and Tailwind 4 are established)
