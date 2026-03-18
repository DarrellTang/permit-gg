# Phase 1: Foundation + Question Bank - Context

**Gathered:** 2026-03-17
**Status:** Ready for planning

<domain>
## Phase Boundary

Deployed app shell with a complete, verified CA DMV question bank stored in Supabase, ready to serve questions to a quiz engine. Includes project scaffold, database schema, seed questions, base UI shell with navigation, landing page, and visual identity. Does NOT include quiz logic, scoring, or any quiz modes — those are Phase 2.

</domain>

<decisions>
## Implementation Decisions

### Visual Identity — "Magical Girl Cyberpunk"
- Aesthetic inspired by Bubblegum Crisis anime — feminine meets high-tech, neon-soaked on dark chrome
- Color palette: hot pinks, electric purples, cyan highlights on dark backgrounds (pastel neons over dark steel)
- Dark mode is the primary experience; light mode available as toggle for bright environments
- Full animation effects: particle effects on correct answers, screen shake on wrong, combo counters, XP-bar-style progress
- Sound effects on correct/wrong answers with mute toggle in settings
- Logo + wordmark design — cyberpunk-styled "PERMIT.GG" plus icon
- Cyberpunk mascot character — Magical Girl style, reacts to progress, encourages, celebrates milestones
- Gaming/competitive UI energy matching the .gg domain

### Typography
- Claude's discretion — pick fonts that nail the Magical Girl Cyberpunk aesthetic
- Must balance readability (study tool) with aesthetic (gaming feel)

### Question Transitions
- Claude's discretion — pick transitions that fit the cyberpunk vibe (glitch, slide, fade)

### Question Sourcing
- Hybrid approach: compile from existing free practice test databases (ePermitTest, DMV-Written-Test, etc.) + AI-generate from handbook sections with low coverage
- CA DMV handbook ingested both ways: PDF download as authoritative source, web scrape for easier parsing
- Verification: Claude cross-validates against handbook, human spot-checks ~20% sample
- Each question includes: inline explanation of why the correct answer is right + CA DMV handbook section/page reference

### App Structure
- Adaptive navigation: sidebar with hub on desktop, bottom tab bar on mobile
- Home screen: smart dashboard with readiness score, today's recommended action, recent quiz scores, quick-start buttons
- Onboarding: 3-4 screen quick intro walkthrough (what makes this different, how modes work, start first quiz) — under 30 seconds
- Landing/marketing page at root URL with "Start Studying" CTA; app lives behind the CTA (app.permit.gg or /app route)
- Use marketing psychology and UI/UX skills during implementation to optimize landing page and onboarding

### Category Taxonomy
- 8 categories: Road Signs, Right-of-Way, Traffic Laws, Speed Limits, DUI/Drug Laws, Safe Driving, Parking, Sharing the Road
- Distribution: weighted by real CA DMV test emphasis, but minimum 25 questions per category
- No difficulty tagging at seed time — difficulty will be inferred from miss rates after enough quiz data accumulates
- ~300 total seed questions across all categories

### Claude's Discretion
- Font selection (within Magical Girl Cyberpunk aesthetic)
- Question transition animations
- Exact spacing, sizing, micro-interaction details
- Light mode palette adaptation
- Mascot design details (personality, poses, reactions)
- Landing page copy and structure (using marketing skills)
- Database schema design
- Exact loading skeleton design

</decisions>

<specifics>
## Specific Ideas

- "Magical Girl Cyberpunk" is the visual language — Bubblegum Crisis anime is the primary reference
- The .gg domain should feel intentional — gaming energy, not accidental
- Mascot should feel like a character you root for, not a corporate mascot
- Landing page should build demand and test positioning for classmate distribution
- Sound FX should feel satisfying (correct) or informative (wrong), not punishing
- Use marketing psychology skills (loss aversion, goal-gradient, social proof) in UI and landing page design
- Use UI/UX Pro Max skill for all visual implementation

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- None — greenfield project, no existing code

### Established Patterns
- None — patterns will be established in this phase

### Integration Points
- Supabase: questions table, categories table, user progress (schema designed here, used by all subsequent phases)
- Next.js App Router: page structure established here, quiz pages added in Phase 2
- UI component library (shadcn/ui): base components configured here, reused everywhere

</code_context>

<deferred>
## Deferred Ideas

- None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-foundation-question-bank*
*Context gathered: 2026-03-17*
