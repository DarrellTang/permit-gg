# Phase 2: Core Quiz Flow - Research

**Researched:** 2026-03-18
**Domain:** Interactive quiz UI, session state management, answer feedback animations, sound FX, radar charts, Supabase persistence
**Confidence:** HIGH

## Summary

Phase 2 transforms the static Phase 1 shell into a fully functional quiz application. The core technical challenges are: (1) managing quiz session state across question-by-question interactions with server-side persistence, (2) building a rich answer feedback system with streak-scaled celebrations and sound effects, (3) implementing two distinct quiz modes (practice with immediate feedback vs simulated DMV test with deferred feedback), (4) creating a post-quiz summary with animated score reveal, swipeable wrong-answer carousel, and radar chart, and (5) persisting all results to Supabase for future analytics phases.

The architecture decision from Phase 1 research recommended "server actions as the state manager" with minimal client state. For Phase 2, this needs refinement: quiz session state (current question index, selected answer, streak count, score) is inherently ephemeral client state that changes rapidly during interaction. Using Zustand for this ephemeral session state (already in the stack) while using server actions for persistence (submitting answers, saving sessions) is the right split. Questions are fetched server-side in batches but shuffled/served client-side to avoid a round-trip per question -- the anti-cheating concern from the architecture doc is mitigated because this is a single-user learning app for the user's daughter, not a proctored exam.

**Primary recommendation:** Build the shared quiz engine (state + UI components) first, then layer practice mode and simulated test mode as thin configuration wrappers on top. Sound FX, celebrations, and the post-quiz summary are enhancement layers added after the core answer-submit-feedback loop works.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Confirm-then-reveal: tap answer to select (highlight as selected), tap "Submit" to lock in, THEN green/red reveal + explanation
- Streak-scaled celebrations: intensity grows with streak length (1st correct = subtle particle burst + chime, 5+ = bigger burst, 10+ = full fireworks). Rewards consistency.
- Wrong answers are informative, not punishing: red highlight on wrong, green on correct, gentle shake, soft error tone. Explanation slides in immediately. Focus is on learning, not penalty.
- Explanations display inline -- slide open below the question. She reads it, taps "Next" to continue. Stays on the same screen.
- Sound FX with mute toggle (carried from Phase 1 decision)
- Smart default + config: tapping "Practice" starts immediately with 15 questions. Small gear icon allows changing count (10-20) before starting.
- XP-bar style progress: gaming-style bar that fills with correct answers, glows on streaks. Shows question count + streak counter.
- Auto-advance on correct answers after ~1.5s. Wrong answers require tapping "Next" (ensures she reads the explanation).
- Quit with confirmation: X button in corner, confirm dialog "Quit quiz? Your progress so far will be saved." Partial results count toward analytics.
- One question at a time -- no peeking ahead or going back (practice mode)
- Animated score reveal that counts up from 0 to final percentage, with a skip button for repeat runs
- Streak stats, best run in session, time taken included
- Wrong answer review as swipeable card carousel -- each card shows question, her answer, correct answer, and explanation. Cyberpunk-styled flashcard feel.
- Category performance shown as a radar/spider chart with all 8 categories as axes. Visual shape of strengths/weaknesses. Gaming stats screen energy.
- Smart actions at bottom: "Try Again" (same mode) + "Drill [Weakest Category]" (auto-selects weakest from results) + "Back to Dashboard". Three paths, one is smart-recommended.
- Subtle visual shift from practice: border color change + "SIM" badge. Same cyberpunk styling, different enough to feel official.
- No feedback during the test: no green/red, no explanations. Just "Answer recorded, next question." Full reveal only at the end. Matches real DMV experience.
- DMV letter-style pass/fail reveal: styled like the actual DMV results letter. "Your score: 40/46 (87%) -- PASS". Official feel, then transitions to the detailed summary with radar chart and card carousel.
- 46 questions with realistic category distribution, pass at 83% (38/46)
- Flag-for-review: she can flag uncertain questions and review flagged ones at the end before final submission
- No going back to change already-submitted answers (only flagged questions can be revisited)
- All quiz results persisted to Supabase: score, per-question answers (correct/wrong + which option), timestamp, mode (practice/sim), completion status
- Partial quiz results saved on quit (for analytics accuracy)
- Quiz history queryable for post-quiz summary and future dashboard/analytics phases

### Claude's Discretion
- Exact animation timing and easing curves
- XP bar visual design details (glow color, fill speed)
- Card carousel swipe mechanics and animation
- Radar chart library choice and styling
- Loading states between questions
- Mobile touch target sizing for answer options
- Database schema for quiz sessions and answers

### Deferred Ideas (OUT OF SCOPE)
- None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| QUIZ-01 | User can start a practice quiz with 10-20 mixed-topic questions | Zustand quiz store with configurable question count, question selection service fetching from seed_questions with random ordering |
| QUIZ-02 | Each practice session serves AI-varied questions so no two sessions feel identical | Phase 2 uses seed questions only (AI variations are Phase 3). Randomized answer order + random question selection from 290 questions provides sufficient variety for now |
| QUIZ-03 | User sees one question at a time (no peeking ahead) | Client-side question index state, questions loaded but only current question rendered. Single-user app mitigates cheating concern |
| SIM-01 | User can take a simulated DMV test with 46 questions | Same quiz engine with mode="sim" config, 46 questions selected using category weight distribution |
| SIM-02 | Simulated test uses realistic category distribution matching the actual CA DMV exam | CATEGORY_WEIGHTS constant already exists in codebase. Selection algorithm picks proportional questions per category |
| SIM-03 | User sees pass/fail result at 83% threshold (38/46 correct) | DMV_CONFIG constant: { totalQuestions: 46, passingScore: 38, passingPercentage: 0.83 }. Post-quiz summary checks score >= 38 |
| SIM-04 | User cannot go back to change previous answers (matching real test behavior) | Forward-only navigation enforced by quiz store. Flagged questions reviewable before final submission |
| QENG-07 | User sees immediate explanation when answering incorrectly, referencing the relevant CA DMV handbook section | Explanation and handbook_reference fields already on seed_questions table. Inline explanation component slides in below question on wrong answer |
| ANAL-01 | After each quiz, user sees a summary with score, wrong answers with explanations, and category breakdown | Post-quiz summary screen with score animation, wrong answer carousel, radar chart by category |
| ANAL-06 | All quiz history and progress persists across sessions (stored in Supabase) | quiz_sessions and quiz_answers tables, server actions for persistence, partial save on quit |
</phase_requirements>

## Standard Stack

### Core (Phase 2 Specific)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Zustand | 5.x | Quiz session client state | Manages current question, selected answer, streak, score, timer. 1.2KB, zero boilerplate. Already in project stack decision |
| Recharts | 3.8 | Radar chart for category breakdown | shadcn/ui charts are built on Recharts. RadarChart component directly supported. Already in project stack |
| canvas-confetti | 1.9+ | Streak celebration particle effects | ~6KB gzip, performant canvas-based confetti. Customizable angle, spread, colors, particle count. Works off main thread via web worker |
| use-sound | 4.x | Sound effects hook | 1KB + 10KB async Howler.js. React hook wrapping Howler. Sprite support for multiple sounds from one file. Volume, playbackRate, mute control built-in |

### Already Installed (from Phase 1)

| Library | Version | Purpose |
|---------|---------|---------|
| Motion | 12.38 | Answer feedback animations, question transitions, drag gestures for card carousel, score count-up |
| shadcn/ui | v4 | Card, Button, Badge, Tabs, Sheet, Skeleton, Progress components |
| @supabase/supabase-js | 2.99 | Database queries for question fetching and result persistence |
| @supabase/ssr | 0.9 | Server-side Supabase client for server actions |
| Zod | 4.3 | Schema validation for quiz types, form inputs |
| next-themes | 0.4.6 | Theme context (dark mode awareness for chart styling) |

### Installation (Phase 2 additions)

```bash
npm install zustand recharts canvas-confetti use-sound
npm install -D @types/canvas-confetti
```

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| canvas-confetti | react-confetti-explosion | react-confetti-explosion is React-specific but less customizable (no angle/spread control, no fireworks preset) |
| canvas-confetti | Motion particles | Building from scratch with Motion gives full control but costs dev time. canvas-confetti is battle-tested for exactly this use case |
| use-sound | Web Audio API directly | Raw Web Audio API requires managing AudioContext, loading buffers, handling browser autoplay policies. use-sound handles all of this |
| use-sound | Howler.js directly | Howler is what use-sound wraps. The hook provides React lifecycle integration (cleanup on unmount, memoized instances) |
| Recharts RadarChart | Chart.js radar | Recharts integrates with shadcn/ui chart theming. Chart.js would need separate theming work |
| Zustand | React useState/useReducer | Quiz state touches ~15 fields (question index, selected answer, answers history, streak, score, flagged questions, timer, mode, etc.). useReducer could work but Zustand is cleaner for this shape |

## Architecture Patterns

### Project Structure (Phase 2 additions)

```
src/
├── app/(app)/
│   ├── practice/
│   │   └── page.tsx              # Practice quiz entry point
│   └── simulated-test/
│       └── page.tsx              # Simulated DMV test entry point
├── components/
│   ├── quiz/                     # Quiz-specific components
│   │   ├── quiz-shell.tsx        # Shared quiz container (both modes)
│   │   ├── question-card.tsx     # Single question display with answer options
│   │   ├── answer-option.tsx     # Individual answer button with selection/reveal states
│   │   ├── answer-feedback.tsx   # Inline explanation slide-in component
│   │   ├── progress-bar.tsx      # XP-bar style progress with streak glow
│   │   ├── streak-celebration.tsx # Particle burst effects (canvas-confetti wrapper)
│   │   ├── quit-dialog.tsx       # Confirmation dialog on quit
│   │   └── flag-button.tsx       # Flag-for-review toggle (sim mode)
│   ├── summary/                  # Post-quiz summary components
│   │   ├── score-reveal.tsx      # Animated count-up score display
│   │   ├── wrong-answer-carousel.tsx  # Swipeable card carousel
│   │   ├── category-radar.tsx    # Radar chart with 8 category axes
│   │   ├── smart-actions.tsx     # Try Again / Drill Weakest / Dashboard
│   │   ├── dmv-result-letter.tsx # DMV-style pass/fail reveal (sim mode)
│   │   └── quiz-stats.tsx        # Streak stats, time taken, best run
│   └── ui/
│       └── progress.tsx          # shadcn Progress component (add if not present)
├── stores/
│   └── quiz-store.ts             # Zustand store for quiz session state
├── server/
│   ├── actions/
│   │   └── quiz.ts               # Server actions: startQuiz, saveResults, savePartialResults
│   └── db/
│       └── queries/
│           ├── questions.ts      # Query seed_questions with category distribution
│           └── sessions.ts       # Insert/update quiz_sessions and quiz_answers
├── lib/
│   ├── constants/
│   │   └── quiz-config.ts        # DMV test config, practice defaults, celebration thresholds
│   ├── types/
│   │   └── quiz.ts               # QuizSession, QuizAnswer, QuizMode, QuizResult types
│   └── sounds/
│       └── index.ts              # Sound sprite definitions and paths
└── hooks/
    ├── use-quiz.ts               # Orchestration hook: combines store + server actions
    ├── use-sound-fx.ts           # Quiz-specific sound wrapper with mute toggle
    └── use-confetti.ts           # Celebration trigger logic (streak-scaled)
public/
└── sounds/
    ├── quiz-sprites.mp3          # Single sprite file: correct chime, wrong buzz, submit click, celebration
    └── (individual files if sprites are complex)
```

### Pattern 1: Zustand Quiz Store (Client Session State)

**What:** Single Zustand store holds all ephemeral quiz session state. Server actions handle persistence separately.

**When to use:** Always. This is the central state for both quiz modes.

```typescript
// src/stores/quiz-store.ts
import { create } from "zustand"
import type { SeedQuestion } from "@/lib/types/question"

type QuizMode = "practice" | "sim"
type AnswerState = "idle" | "selected" | "submitted" | "revealed"

interface QuizAnswer {
  questionId: string
  selectedAnswer: string
  correctAnswer: string
  isCorrect: boolean
  timeTakenMs: number
}

interface QuizState {
  // Session config
  mode: QuizMode
  questions: SeedQuestion[]
  totalQuestions: number

  // Current question state
  currentIndex: number
  selectedAnswer: string | null
  answerState: AnswerState
  questionStartTime: number

  // Scoring
  answers: QuizAnswer[]
  score: number
  streak: number
  bestStreak: number

  // Sim mode specifics
  flaggedIndices: Set<number>
  reviewingFlagged: boolean

  // Session metadata
  sessionStartTime: number
  isComplete: boolean
  isMuted: boolean

  // Actions
  initSession: (questions: SeedQuestion[], mode: QuizMode) => void
  selectAnswer: (answer: string) => void
  submitAnswer: () => void
  nextQuestion: () => void
  flagQuestion: () => void
  unflagQuestion: () => void
  startFlaggedReview: () => void
  submitFlaggedAnswer: (index: number) => void
  completeQuiz: () => void
  quitQuiz: () => void
  toggleMute: () => void
  reset: () => void
}
```

### Pattern 2: Question Selection with Category Distribution

**What:** For simulated tests, select 46 questions matching CA DMV category weights. For practice, select N random questions across all categories.

**When to use:** When starting a new quiz session.

```typescript
// src/server/db/queries/questions.ts
import { CATEGORY_WEIGHTS } from "@/lib/types/question"
import type { SupabaseClient } from "@supabase/supabase-js"

export async function selectPracticeQuestions(
  supabase: SupabaseClient,
  count: number = 15
) {
  // Random selection across all categories
  const { data, error } = await supabase
    .from("seed_questions")
    .select("*, categories(slug, name)")
    .limit(count * 2) // Fetch extra to allow shuffling
    .order("id") // Deterministic base, shuffle client-side

  if (error) throw error
  // Shuffle and take `count` questions
  return shuffleArray(data).slice(0, count)
}

export async function selectSimQuestions(supabase: SupabaseClient) {
  const totalQuestions = 46
  const questionsByCategory: Record<string, any[]> = {}

  // Fetch all questions grouped by category
  const { data, error } = await supabase
    .from("seed_questions")
    .select("*, categories(slug, name)")

  if (error) throw error

  // Group by category slug
  for (const q of data) {
    const slug = q.categories.slug
    if (!questionsByCategory[slug]) questionsByCategory[slug] = []
    questionsByCategory[slug].push(q)
  }

  // Select proportional to weights
  const selected: any[] = []
  for (const [slug, weight] of Object.entries(CATEGORY_WEIGHTS)) {
    const count = Math.round(totalQuestions * weight)
    const pool = shuffleArray(questionsByCategory[slug] || [])
    selected.push(...pool.slice(0, count))
  }

  // Adjust to exactly 46 (rounding may give 45 or 47)
  return shuffleArray(selected).slice(0, totalQuestions)
}
```

### Pattern 3: Answer Flow State Machine

**What:** Question interaction follows a strict state machine: idle -> selected -> submitted -> revealed. Practice mode auto-advances on correct after 1.5s. Sim mode always auto-advances (no reveal).

```
PRACTICE MODE:
  idle ──[tap answer]──> selected ──[tap Submit]──> submitted
    └── submitted ──[correct]──> revealed (1.5s auto-advance)
    └── submitted ──[wrong]──> revealed (manual "Next" required)

SIM MODE:
  idle ──[tap answer]──> selected ──[tap Submit]──> submitted
    └── submitted ──[auto-advance to next]──> idle
    └── submitted (last question) ──> flagged review OR complete
```

### Pattern 4: Streak-Scaled Celebrations

**What:** Celebration intensity scales with streak length. Uses canvas-confetti with escalating parameters.

```typescript
// src/hooks/use-confetti.ts
import confetti from "canvas-confetti"

const CELEBRATION_TIERS = {
  subtle: { particleCount: 15, spread: 40, startVelocity: 20 },     // streak 1-4
  medium: { particleCount: 40, spread: 60, startVelocity: 30 },     // streak 5-9
  fireworks: { particleCount: 80, spread: 100, startVelocity: 45 }, // streak 10+
} as const

export function fireConfetti(streak: number, origin?: { x: number; y: number }) {
  const tier = streak >= 10 ? "fireworks" : streak >= 5 ? "medium" : "subtle"
  const config = CELEBRATION_TIERS[tier]

  confetti({
    ...config,
    origin: origin ?? { x: 0.5, y: 0.7 },
    colors: [
      "oklch(0.70 0.30 340)", // neon pink
      "oklch(0.60 0.28 300)", // neon purple
      "oklch(0.80 0.18 195)", // neon cyan
    ],
    ticks: streak >= 10 ? 200 : 100,
    gravity: 1.2,
    decay: 0.92,
  })

  // Fireworks tier: multiple bursts
  if (tier === "fireworks") {
    setTimeout(() => confetti({
      ...config,
      particleCount: 30,
      origin: { x: 0.3, y: 0.6 },
    }), 150)
    setTimeout(() => confetti({
      ...config,
      particleCount: 30,
      origin: { x: 0.7, y: 0.6 },
    }), 300)
  }
}
```

**Note:** canvas-confetti accepts CSS color strings. OKLCH may need conversion to hex/rgb depending on browser support in canvas context. Test and fall back to hex if needed: `#ff69b4` (pink), `#a855f7` (purple), `#22d3ee` (cyan).

### Pattern 5: Sound FX with Sprite Map

**What:** Single audio sprite file with multiple sound effects. use-sound hook with global mute toggle stored in Zustand.

```typescript
// src/hooks/use-sound-fx.ts
import useSound from "use-sound"
import { useQuizStore } from "@/stores/quiz-store"

const SPRITE_MAP = {
  correct: [0, 500],       // 0ms start, 500ms duration
  wrong: [600, 400],       // 600ms start, 400ms duration
  submit: [1100, 200],     // click sound
  celebration: [1400, 800], // bigger fanfare
  flagged: [2300, 300],    // soft ping
} as const

export function useQuizSounds() {
  const isMuted = useQuizStore((s) => s.isMuted)

  const [play] = useSound("/sounds/quiz-sprites.mp3", {
    sprite: SPRITE_MAP,
    soundEnabled: !isMuted,
    volume: 0.6,
  })

  return {
    playCorrect: () => play({ id: "correct" }),
    playWrong: () => play({ id: "wrong" }),
    playSubmit: () => play({ id: "submit" }),
    playCelebration: () => play({ id: "celebration" }),
    playFlagged: () => play({ id: "flagged" }),
  }
}
```

### Pattern 6: Swipeable Card Carousel (Motion Drag)

**What:** Wrong answer review cards that swipe left/right using Motion drag gestures. Each card shows question, user's answer, correct answer, and explanation.

```typescript
// src/components/summary/wrong-answer-carousel.tsx
"use client"
import { motion, AnimatePresence } from "motion/react"
import { useState } from "react"

const SWIPE_THRESHOLD = 100 // pixels
const SWIPE_VELOCITY = 500  // pixels/sec

function WrongAnswerCarousel({ wrongAnswers }: { wrongAnswers: QuizAnswer[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0) // -1 = left, 1 = right

  function handleDragEnd(
    _: any,
    info: { offset: { x: number }; velocity: { x: number } }
  ) {
    const { offset, velocity } = info
    if (Math.abs(offset.x) > SWIPE_THRESHOLD || Math.abs(velocity.x) > SWIPE_VELOCITY) {
      const newDirection = offset.x > 0 ? -1 : 1
      setDirection(newDirection)
      setCurrentIndex((prev) =>
        Math.max(0, Math.min(wrongAnswers.length - 1, prev + newDirection))
      )
    }
  }

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="popLayout" custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          initial={{ x: direction * 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction * -300, opacity: 0 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.3}
          onDragEnd={handleDragEnd}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Card content */}
        </motion.div>
      </AnimatePresence>
      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-4">
        {wrongAnswers.map((_, i) => (
          <div key={i} className={`h-1.5 rounded-full transition-all ${
            i === currentIndex ? "w-6 bg-neon-pink" : "w-1.5 bg-muted"
          }`} />
        ))}
      </div>
    </div>
  )
}
```

### Pattern 7: Radar Chart with shadcn/ui + Recharts

**What:** Category performance visualization using Recharts RadarChart, themed with shadcn chart components for automatic dark mode support.

```typescript
// src/components/summary/category-radar.tsx
"use client"
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ResponsiveContainer
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface CategoryScore {
  category: string
  score: number    // 0-100 percentage
  fullMark: 100
}

const chartConfig = {
  score: {
    label: "Score",
    color: "var(--neon-cyan)",
  },
}

function CategoryRadar({ data }: { data: CategoryScore[] }) {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <RadarChart data={data} cx="50%" cy="50%" outerRadius="80%">
        <PolarGrid stroke="var(--border)" />
        <PolarAngleAxis
          dataKey="category"
          tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          tick={false}
          axisLine={false}
        />
        <Radar
          dataKey="score"
          stroke="var(--neon-cyan)"
          fill="var(--neon-cyan)"
          fillOpacity={0.25}
          strokeWidth={2}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
      </RadarChart>
    </ChartContainer>
  )
}
```

### Anti-Patterns to Avoid

- **Round-tripping to server on every answer:** Do NOT use server actions for submitting individual answers during the quiz. Batch-save all answers when the session completes or on quit. The server round-trip latency (100-300ms) would break the fast answer-feedback loop.
- **Loading all 290 questions client-side:** Only fetch the needed set (15 for practice, 46 for sim). Fetch via server component or server action at session start.
- **Putting quiz logic in page.tsx:** Pages should only compose components and call the quiz orchestration hook. All quiz state machine logic lives in the Zustand store.
- **Using Motion for confetti:** Motion is great for element animations but building a particle system from scratch is wasteful when canvas-confetti exists for exactly this.
- **Forgetting to shuffle answer order:** The seed_questions table stores correct_answer and wrong_answers separately. Shuffle all 4 options before displaying to prevent the correct answer from always appearing in the same position.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Confetti/particle celebrations | Custom canvas particle system | canvas-confetti | Handles particle physics, gravity, decay, canvas management, web worker offloading |
| Sound effects in React | Raw Web Audio API with AudioContext | use-sound (wraps Howler.js) | Handles browser autoplay policy, cleanup on unmount, sprite support, volume/rate control |
| Radar/spider chart | Custom SVG polygon drawing | Recharts RadarChart via shadcn/ui chart | Handles polar coordinates, responsive sizing, tooltips, theming |
| Swipeable cards | Custom touch event handling | Motion drag prop + onDragEnd | Handles touch/mouse, momentum, elastic bounds, accessibility |
| Quiz state machine | Custom useReducer with many switch cases | Zustand store with typed actions | Simpler API, devtools, persist middleware available if needed later |
| Animated number count-up | setInterval-based counter | Motion animate prop with spring | Frame-synced, physics-based, interruptible |
| Progress bar with glow | Custom div with width transition | shadcn Progress + Tailwind glow utilities | Accessible (role="progressbar"), smooth transition built-in |

## Common Pitfalls

### Pitfall 1: Sound Not Playing on First Interaction (Autoplay Policy)

**What goes wrong:** Sound effects don't play the first time the user taps an answer.
**Why it happens:** Browsers require a user gesture before audio can play. The AudioContext starts in a "suspended" state.
**How to avoid:** use-sound handles this automatically -- Howler.js unlocks the AudioContext on first user interaction. Ensure the quiz page has a "Start Quiz" button (user gesture) before sounds are needed. The first `play()` call after a user gesture works fine.
**Warning signs:** Sound works on second click but not first.

### Pitfall 2: canvas-confetti Not Rendering on Dark Backgrounds

**What goes wrong:** Confetti particles are invisible or barely visible on the dark cyberpunk background.
**Why it happens:** Default confetti colors are often light/pastel. canvas-confetti renders on a transparent canvas overlay, so particles need to contrast with whatever's behind them.
**How to avoid:** Explicitly set neon colors in the confetti config. Use the brightest neon variants: neon-pink (#ff69b4), neon-cyan (#22d3ee), white (#ffffff). Test on dark background.
**Warning signs:** Confetti fires (you hear the sound) but nothing visible appears.

### Pitfall 3: Answer Shuffling Not Consistent Per Question

**What goes wrong:** Answer options re-shuffle every time the component re-renders, making the UI jump around.
**Why it happens:** Shuffling inside the render function creates new order on every render.
**How to avoid:** Shuffle answer options ONCE when questions are loaded into the store (during `initSession`). Store the shuffled options array alongside each question. Never shuffle in the render path.
**Warning signs:** Answer options visually jump positions when selecting/deselecting.

### Pitfall 4: Zustand Store Not Resetting Between Sessions

**What goes wrong:** Starting a new quiz after completing one shows stale state from the previous session.
**Why it happens:** Zustand stores persist in memory across navigations in Next.js (client-side navigation doesn't unmount the store).
**How to avoid:** Call `reset()` in the store before `initSession()`. Alternatively, reset in the page component's useEffect cleanup. Make `reset()` the first step of `initSession()`.
**Warning signs:** New quiz shows previous score, wrong streak count, or previous questions.

### Pitfall 5: Partial Save Race Condition on Quit

**What goes wrong:** User quits quiz, partial results don't save because navigation happens before the server action completes.
**Why it happens:** The quit confirmation dialog navigates away immediately. The save server action is async and may not complete.
**How to avoid:** Save partial results FIRST, then navigate. Use `await savePartialResults()` before `router.push("/dashboard")`. Show a brief loading state on the quit button ("Saving...").
**Warning signs:** Quiz history shows sessions with 0 answers despite the user having answered some questions.

### Pitfall 6: Radar Chart Labels Overlapping on Mobile

**What goes wrong:** The 8 category names around the radar chart overlap and become unreadable on small screens.
**Why it happens:** RadarChart doesn't auto-abbreviate labels. Full category names like "Sharing the Road" are too long for mobile viewport.
**How to avoid:** Use short labels for the chart (e.g., "Sharing" instead of "Sharing the Road"). Define a `shortName` field in the categories constant. Reduce font size on mobile. Consider hiding the chart below a "View Details" toggle on very small screens.
**Warning signs:** Chart looks great on desktop, unreadable mess on mobile.

### Pitfall 7: use-sound Compatibility with React 19

**What goes wrong:** TypeScript errors or runtime issues with use-sound in React 19.
**Why it happens:** use-sound is described as "semi-maintained" and may not have explicit React 19 support.
**How to avoid:** If use-sound causes issues, the fallback is to use Howler.js directly with a thin custom hook. The Howler API is simple enough: `new Howl({ src: ['/sounds/sprite.mp3'], sprite: {...} })`. Wrap in a useRef to persist across renders.
**Warning signs:** TypeScript peer dependency warnings during install, or "Invalid hook call" errors at runtime.

## Code Examples

### Animated Score Count-Up with Motion

```typescript
// src/components/summary/score-reveal.tsx
"use client"
import { motion, useMotionValue, useTransform, animate } from "motion/react"
import { useEffect, useState } from "react"

function ScoreReveal({ score, total }: { score: number; total: number }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))
  const percentage = useTransform(count, (v) => Math.round((v / total) * 100))
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const controls = animate(count, score, {
      duration: 2,
      ease: "easeOut",
      onComplete: () => setIsComplete(true),
    })
    return controls.stop
  }, [score, total])

  return (
    <div className="text-center">
      <motion.div className="font-display text-7xl font-bold text-neon-cyan">
        <motion.span>{rounded}</motion.span>
        <span className="text-4xl text-muted-foreground">/{total}</span>
      </motion.div>
      <motion.div className="mt-2 font-display text-3xl text-neon-pink">
        <motion.span>{percentage}</motion.span>%
      </motion.div>
    </div>
  )
}
```

### Server Action for Saving Quiz Results

```typescript
// src/server/actions/quiz.ts
"use server"

import { createClient } from "@/lib/supabase/server"
import { z } from "zod"

const SaveQuizResultsSchema = z.object({
  mode: z.enum(["practice", "sim"]),
  totalQuestions: z.number().int().positive(),
  answers: z.array(z.object({
    questionId: z.string().uuid(),
    selectedAnswer: z.string(),
    correctAnswer: z.string(),
    isCorrect: z.boolean(),
    timeTakenMs: z.number().int(),
  })),
  startedAt: z.string().datetime(),
  completedAt: z.string().datetime().nullable(),
  isComplete: z.boolean(),
})

export async function saveQuizResults(input: z.infer<typeof SaveQuizResultsSchema>) {
  const validated = SaveQuizResultsSchema.parse(input)
  const supabase = await createClient()

  const score = validated.answers.filter((a) => a.isCorrect).length
  const passed = validated.mode === "sim" ? score >= 38 : null

  // Insert session
  const { data: session, error: sessionError } = await supabase
    .from("quiz_sessions")
    .insert({
      mode: validated.mode,
      question_count: validated.totalQuestions,
      score,
      total: validated.totalQuestions,
      passed,
      started_at: validated.startedAt,
      completed_at: validated.completedAt,
      is_complete: validated.isComplete,
    })
    .select("id")
    .single()

  if (sessionError) throw sessionError

  // Insert answers
  const answerRows = validated.answers.map((a) => ({
    session_id: session.id,
    question_id: a.questionId,
    selected_answer: a.selectedAnswer,
    correct_answer: a.correctAnswer,
    is_correct: a.isCorrect,
    time_taken_ms: a.timeTakenMs,
  }))

  const { error: answersError } = await supabase
    .from("quiz_answers")
    .insert(answerRows)

  if (answersError) throw answersError

  return { sessionId: session.id, score, total: validated.totalQuestions, passed }
}
```

### Database Migration for Quiz Tables

```sql
-- supabase/migrations/00004_create_quiz_tables.sql

CREATE TABLE quiz_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mode TEXT NOT NULL CHECK (mode IN ('practice', 'sim')),
  question_count INTEGER NOT NULL,
  score INTEGER,
  total INTEGER NOT NULL,
  passed BOOLEAN,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ,
  is_complete BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE quiz_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES quiz_sessions(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES seed_questions(id),
  selected_answer TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  time_taken_ms INTEGER,
  answered_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_quiz_sessions_mode ON quiz_sessions(mode);
CREATE INDEX idx_quiz_sessions_created ON quiz_sessions(created_at DESC);
CREATE INDEX idx_quiz_answers_session ON quiz_answers(session_id);
CREATE INDEX idx_quiz_answers_question ON quiz_answers(question_id);

-- RLS
ALTER TABLE quiz_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_answers ENABLE ROW LEVEL SECURITY;

-- Single-user v1: allow all operations from anon (no auth yet)
CREATE POLICY "Quiz sessions are accessible by everyone"
  ON quiz_sessions FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Quiz answers are accessible by everyone"
  ON quiz_answers FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);
```

### XP-Bar Progress Component

```typescript
// src/components/quiz/progress-bar.tsx
"use client"
import { motion } from "motion/react"

interface ProgressBarProps {
  current: number
  total: number
  correctCount: number
  streak: number
}

function QuizProgressBar({ current, total, correctCount, streak }: ProgressBarProps) {
  const progress = ((current + 1) / total) * 100
  const xpProgress = (correctCount / total) * 100

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-ui">
        <span className="text-muted-foreground">
          Question {current + 1} of {total}
        </span>
        {streak > 0 && (
          <motion.span
            key={streak}
            initial={{ scale: 1.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`font-bold ${
              streak >= 10 ? "text-neon-pink" :
              streak >= 5 ? "text-neon-purple" :
              "text-neon-cyan"
            }`}
          >
            {streak} streak
          </motion.span>
        )}
      </div>

      {/* Question progress (background track) */}
      <div className="relative h-3 overflow-hidden rounded-full bg-muted">
        {/* XP fill (correct answers) */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-neon-purple to-neon-cyan"
          animate={{ width: `${xpProgress}%` }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          style={{
            boxShadow: streak >= 5
              ? "0 0 12px var(--neon-cyan), 0 0 24px var(--neon-cyan)"
              : "none"
          }}
        />
        {/* Question position marker */}
        <motion.div
          className="absolute inset-y-0 w-0.5 bg-foreground/40"
          animate={{ left: `${progress}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>
    </div>
  )
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `useReducer` for complex UI state | Zustand with typed actions | Zustand 5 (2025) | Simpler API, built-in devtools, no context provider needed |
| `react-confetti` (full-screen rain) | canvas-confetti (targeted bursts) | 2024+ | Customizable origin, angle, spread. Better for localized celebrations |
| `framer-motion` import | `motion/react` import | Motion v12 (2025) | Rebranded package. Old import deprecated |
| Server action per answer | Client state + batch save | Next.js App Router pattern | Avoids network latency during interactive quiz flow |
| Recharts standalone | shadcn/ui Chart wrapper + Recharts | shadcn v4 (2026) | Automatic dark mode theming, ChartTooltip, consistent styling |

## Open Questions

1. **use-sound React 19 Compatibility**
   - What we know: use-sound wraps Howler.js, last npm publish was mid-2023. "Semi-maintained" per the author.
   - What's unclear: Whether it works cleanly with React 19.2 and Next.js 16 without peer dependency issues.
   - Recommendation: Install and test early. If it fails, create a thin `useHowler` custom hook (20-30 lines) wrapping Howler.js directly. The Howler API is straightforward.

2. **canvas-confetti OKLCH Color Support**
   - What we know: canvas-confetti draws on an HTML5 Canvas. Canvas 2D context color parsing varies by browser.
   - What's unclear: Whether `oklch()` color strings work in canvas context.
   - Recommendation: Use hex color strings for confetti colors as fallback. The neon colors in hex: pink=#ff69b4, purple=#a855f7, cyan=#22d3ee, white=#ffffff.

3. **Audio Sprite File Creation**
   - What we know: use-sound supports sprite maps with [start, duration] in milliseconds.
   - What's unclear: The actual sound files don't exist yet. Need to source or create quiz sound effects.
   - Recommendation: Use free sound effects from sites like freesound.org or mixkit.co. Combine into a single sprite file using ffmpeg or Audacity. Keep total size under 50KB for fast async loading.

4. **Sim Mode Flag-for-Review UX Flow**
   - What we know: User can flag uncertain questions. Flagged questions are reviewable at the end before final submission.
   - What's unclear: Exact UX for the flag review phase -- does it show a list of flagged questions to pick from, or cycle through them sequentially?
   - Recommendation: Show a list of flagged question numbers. User taps a number to jump to that question, can change their answer, then return to the list. "Submit Test" button finalizes.

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Vitest 4.1 + @testing-library/react 16.3 |
| Config file | `vitest.config.mts` (exists from Phase 1) |
| Quick run command | `npx vitest run --reporter=verbose` |
| Full suite command | `npx vitest run` |

### Phase Requirements -> Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| QUIZ-01 | Practice quiz starts with configurable 10-20 questions | unit | `npx vitest run tests/quiz-store.test.ts -t "practice session"` | Wave 0 |
| QUIZ-02 | Sessions serve randomized questions (no identical sessions) | unit | `npx vitest run tests/question-selection.test.ts -t "random selection"` | Wave 0 |
| QUIZ-03 | Only current question visible (no peek ahead) | unit | `npx vitest run tests/quiz-store.test.ts -t "one at a time"` | Wave 0 |
| SIM-01 | Simulated test has 46 questions | unit | `npx vitest run tests/quiz-store.test.ts -t "sim 46 questions"` | Wave 0 |
| SIM-02 | Category distribution matches weights | unit | `npx vitest run tests/question-selection.test.ts -t "category distribution"` | Wave 0 |
| SIM-03 | Pass/fail at 83% (38/46) | unit | `npx vitest run tests/quiz-store.test.ts -t "pass threshold"` | Wave 0 |
| SIM-04 | Cannot go back to previous answers | unit | `npx vitest run tests/quiz-store.test.ts -t "no back navigation"` | Wave 0 |
| QENG-07 | Wrong answer shows explanation with handbook reference | unit | `npx vitest run tests/answer-feedback.test.ts -t "explanation display"` | Wave 0 |
| ANAL-01 | Post-quiz summary shows score + wrong answers + categories | unit | `npx vitest run tests/quiz-summary.test.ts -t "summary data"` | Wave 0 |
| ANAL-06 | Results persist to Supabase | integration | `npx vitest run tests/quiz-persistence.test.ts -t "save results"` | Wave 0 |

### Sampling Rate

- **Per task commit:** `npx vitest run --reporter=verbose`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] `tests/quiz-store.test.ts` -- Zustand store: session init, answer flow state machine, scoring, streaks, reset
- [ ] `tests/question-selection.test.ts` -- Random selection, category distribution for sim mode, shuffle behavior
- [ ] `tests/answer-feedback.test.ts` -- Explanation rendering, handbook reference display, correct/wrong states
- [ ] `tests/quiz-summary.test.ts` -- Score calculation, category breakdown, wrong answer extraction
- [ ] `tests/quiz-persistence.test.ts` -- Server action input validation, Supabase insert shape (mock Supabase client)

## Sources

### Primary (HIGH confidence)
- [shadcn/ui Radar Charts](https://ui.shadcn.com/charts/radar) -- Built-in radar chart examples using Recharts
- [shadcn/ui Chart Component](https://ui.shadcn.com/docs/components/radix/chart) -- ChartContainer, ChartConfig, ChartTooltip API
- [Recharts RadarChart API](https://recharts.github.io/en-US/api/Radar/) -- RadarChart, PolarGrid, PolarAngleAxis, Radar components
- [Motion React Drag](https://motion.dev/docs/react-drag) -- drag prop, onDragEnd, dragConstraints, velocity info
- [Motion React Gestures](https://motion.dev/docs/react-gestures) -- Gesture event info object (point, delta, offset, velocity)
- [use-sound GitHub README](https://github.com/joshwcomeau/use-sound) -- Full API: sprites, volume, playbackRate, soundEnabled, Howler escape hatch
- [canvas-confetti npm](https://www.npmjs.com/package/canvas-confetti) -- API: particleCount, spread, angle, startVelocity, colors, origin, web worker support
- [Next.js public folder](https://nextjs.org/docs/app/api-reference/file-conventions/public-folder) -- Static assets serving for audio files

### Secondary (MEDIUM confidence)
- [Zustand v5 guide](https://dev.to/vishwark/mastering-zustand-the-modern-react-state-manager-v4-v5-guide-8mm) -- useSyncExternalStore, v5 migration
- [Motion confetti example](https://motion.dev/examples/react-confetti) -- Particle animation pattern (page required JS to load)
- [Next.js Server Actions guide](https://makerkit.dev/blog/tutorials/nextjs-server-actions) -- Zod validation, revalidation patterns

### Tertiary (LOW confidence)
- use-sound React 19 compatibility -- No explicit documentation found. The library was last published in 2023. May need fallback to raw Howler.js.
- canvas-confetti OKLCH support -- Not verified in canvas 2D context. Hex fallback recommended.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- All libraries verified on npm, well-documented, compatible versions confirmed
- Architecture: HIGH -- Patterns based on established Next.js + Zustand + Supabase conventions, verified against Phase 1 codebase
- Quiz state machine: HIGH -- Standard confirm-submit-reveal flow, well-understood pattern
- Celebration/sound FX: MEDIUM -- canvas-confetti and use-sound are well-known but React 19 compatibility of use-sound is unverified
- Radar chart: HIGH -- shadcn/ui provides built-in Recharts radar chart examples
- Pitfalls: HIGH -- Common issues documented from multiple sources and framework knowledge

**Research date:** 2026-03-18
**Valid until:** 2026-04-18 (stable domain; core libraries are well-established)
