# Pitfalls Research

**Domain:** AI-powered driving permit test prep (safety-critical educational app)
**Researched:** 2026-03-17
**Confidence:** HIGH (most pitfalls verified with official docs and multiple sources)

## Critical Pitfalls

### Pitfall 1: LLM Hallucinations Teach Wrong Driving Rules

**What goes wrong:**
Claude generates a question with an incorrect answer (e.g., "the speed limit in a school zone is 30 mph" when it is 25 mph in California). The user studies the wrong answer, fails the real DMV test, or worse, internalizes incorrect safety-critical driving behavior. Unlike a general trivia app, wrong answers here have real-world safety consequences.

**Why it happens:**
LLMs are trained to produce statistically likely text, not verified facts. Even top models hallucinate at 2-10% rates on domain-specific factual questions. Driving rules vary by state, and the model may conflate California rules with other states. The AI will confidently produce plausible-sounding but wrong distractors or correct answers, especially for edge cases like right-of-way scenarios or BAC limits for minors vs. adults.

**How to avoid:**
- Never let the LLM invent facts. Use a constrained generation pattern: provide the seed question with its verified correct answer and verified distractors, then ask the LLM only to rephrase the question stem and shuffle/rephrase answer options while preserving which answer is correct.
- Store a human-verified seed question bank sourced directly from the CA DMV Driver Handbook (2026 edition). Every generated variation must trace back to a seed question with a known correct answer.
- Add a post-generation validation step: parse the LLM output as structured JSON, verify the `correct_answer` field matches the seed question's correct answer, and reject any generation that changes the factual content.
- Use structured output (JSON schema enforcement) with Haiku 4.5 to constrain the model's output format, reducing free-form hallucination opportunities.

**Warning signs:**
- Users report "the app said X but the DMV handbook says Y"
- Generated questions have answer options that are all partially correct
- Questions about numeric values (speed limits, BAC levels, following distances) drift from official numbers
- Distractors are implausible or obviously wrong (reduces learning value)

**Phase to address:**
Phase 1 (Foundation) -- the seed question bank with verified answers must exist before any AI generation. The prompt engineering and validation pipeline must be built alongside the first AI generation feature, not bolted on later.

---

### Pitfall 2: Cost Blowup from Uncontrolled Real-Time API Calls

**What goes wrong:**
Every quiz attempt triggers multiple Claude API calls in real-time. A teenager doing rapid-fire practice sessions could generate dozens of API calls per session. With multiple users (classmates), costs escalate from dollars to hundreds of dollars per month. A single user hammering "retry" on a quiz could trigger hundreds of calls in minutes.

**Why it happens:**
Developers prototype with real-time generation because it is simpler to build. They test with their own light usage and don't model the actual usage patterns of a bored teenager repeatedly clicking through quizzes. Claude Haiku 4.5 costs $1/MTok input and $5/MTok output -- cheap per call, but it adds up. A single question generation (~500 input tokens + ~300 output tokens) costs roughly $0.002. At 46 questions per simulated test, that is $0.09 per test. Ten tests a day across 5 users = $4.50/day = $135/month.

**How to avoid:**
- Pre-generate question variations in batch using the Claude Batch API (50% discount: $0.50/MTok input, $2.50/MTok output for Haiku 4.5). Generate 5-10 variations per seed question upfront and store them in Supabase.
- Serve pre-generated variations from the database for normal quiz flow. Reserve real-time generation only for the "missed question review" feature where personalized rephrasing adds genuine value.
- Implement per-user rate limiting: max N API calls per hour, with graceful fallback to pre-generated content when the limit is hit.
- Use prompt caching (cache read = 0.1x base price) for the system prompt and CA DMV handbook context that repeats across all generation calls.
- Set hard spending alerts in the Anthropic console. Set a monthly budget cap.
- Track token usage per-call in Supabase for cost monitoring.

**Warning signs:**
- Monthly API bill exceeds $10 (should be near-zero with proper pre-generation)
- Average response time exceeds 2 seconds (indicates real-time generation on the critical path)
- More than 10% of quiz serves require a live API call

**Phase to address:**
Phase 1 (Foundation) -- the batch pre-generation pipeline should be built first. Real-time generation should only be added in a later phase (adaptive/personalized review) with rate limiting already in place.

---

### Pitfall 3: Ambiguous Questions with Multiple Defensible Answers

**What goes wrong:**
The LLM rephrases a question in a way that makes two answer choices seem equally valid. Example: the seed question asks "What should you do when approaching a yellow traffic light?" with the correct answer "Slow down and prepare to stop." The AI rephrases it as "What should you do when a traffic light turns yellow?" and generates a distractor "Proceed through the intersection if safe to do so" -- which is also arguably correct depending on your distance from the intersection.

**Why it happens:**
LLMs excel at generating plausible text but lack the pedagogical awareness to understand that good multiple-choice distractors must be clearly wrong while still being plausible. The model may inadvertently create answer options that are correct in certain contexts, or rephrase the question stem in a way that changes the scenario enough to make a different answer valid. Research shows ~5% of AI-generated MCQs contain ambiguity issues.

**How to avoid:**
- Constrain the LLM prompt to explicitly preserve the original question's context and scenario. Include instructions like: "The correct answer must remain unambiguously correct. All distractors must be clearly wrong in the given scenario."
- For each seed question, store not just the correct answer but also an explanation of WHY each distractor is wrong. Include this context in the generation prompt.
- Implement a "distractor validation" check: after generation, verify that each distractor is present in a known-wrong-answers list or is semantically distant from the correct answer.
- Start with simpler variation types: rephrase the question stem only, keep the same answer options but shuffle order. Graduate to full answer rephrasing only after validating the simpler approach works.
- Include a "report this question" button so users can flag ambiguous questions for review.

**Warning signs:**
- User accuracy on AI-varied questions is significantly lower than on seed questions (may indicate bad questions, not lack of knowledge)
- Users consistently get certain question categories wrong despite studying (ambiguous questions erode confidence)
- The "report question" feature gets frequent use

**Phase to address:**
Phase 2 (AI Integration) -- when building the question variation pipeline, start with question-stem-only rephrasing. Full answer rephrasing is a Phase 3+ feature that requires more sophisticated validation.

---

### Pitfall 4: Supabase Free Tier Silent Failures

**What goes wrong:**
The Supabase free project pauses after 7 days of inactivity (e.g., daughter doesn't study for a week during school break). When she returns, the app shows blank data or errors during the cold restart. Separately, the 500 MB database limit gets hit silently if pre-generated question variations accumulate, putting the database into read-only mode and breaking quiz result saves.

**Why it happens:**
Supabase free tier aggressively manages resources: 2 active projects max, 500 MB database, 1 GB file storage, 5 GB egress, and automatic pausing after 7 days of inactivity. Developers forget about the pause behavior during the exact usage pattern this app will have (a teenager who studies intensely for a few weeks, takes a break, then comes back).

**How to avoid:**
- Set up a Vercel cron job (free on Hobby plan) that pings the Supabase database daily with a lightweight query (SELECT 1) to prevent pausing. This is a well-documented pattern with multiple community solutions.
- Calculate database size budget upfront: seed questions (~200 questions x 1KB = 0.2 MB), pre-generated variations (200 x 10 variations x 0.5 KB = 1 MB), user analytics/history (~50 KB per month of active use). Total: well under 500 MB for single-user, but monitor it.
- Implement graceful error handling for the "database is paused" state: show a friendly "waking up, please wait" message rather than crashing.
- Add a database size check to the admin/analytics view so you can see how close you are to 500 MB.

**Warning signs:**
- App shows empty state or errors after not being used for a week
- Database writes start failing silently (500 MB limit reached, read-only mode)
- Supabase dashboard shows project as "paused"

**Phase to address:**
Phase 1 (Foundation) -- the cron keep-alive and error handling for paused state should be part of initial infrastructure setup. Database size monitoring can come in Phase 2.

---

### Pitfall 5: Spaced Repetition Cold Start Problem

**What goes wrong:**
The spaced repetition algorithm (ts-fsrs) requires review history to calculate optimal intervals. With a new user who has zero history, the algorithm falls back to default parameters that may be poorly calibrated for driving permit material. Questions resurface too frequently (annoying) or too infrequently (user forgets). The user's first week of experience feels generic, not adaptive, undermining the core value proposition.

**Why it happens:**
FSRS needs approximately 1,000 reviews before it can meaningfully personalize parameters. The ts-fsrs documentation explicitly warns against tweaking parameters before accumulating sufficient data. For a permit test prep app, a user might only do 200-500 reviews total before taking the test, meaning the algorithm may never reach its optimization threshold.

**How to avoid:**
- Use FSRS default parameters for all users (they are well-tuned for general-purpose learning). Do NOT attempt to optimize per-user parameters -- the data volume will never justify it for this use case.
- Set desired_retention to 0.90 (90%) rather than the default 0.9 -- driving rules need high retention given the 83% pass threshold.
- Supplement FSRS scheduling with category-based prioritization: if a user scores below 80% in a category, increase that category's review frequency regardless of what FSRS says about individual cards.
- Make the value proposition clear from day one through category analytics ("you're weak in right-of-way questions") rather than relying on the SRS algorithm to seem smart early.

**Warning signs:**
- Users complain "I keep seeing the same questions" (intervals too short)
- Users fail the simulated test on topics they haven't seen in days (intervals too long)
- Engagement drops after the first few sessions (algorithm not providing satisfying variety)

**Phase to address:**
Phase 3 (Adaptive Learning) -- spaced repetition should be built after the basic quiz infrastructure and question bank are solid. Ship category-based prioritization first (simpler, immediately valuable), then layer FSRS on top.

---

### Pitfall 6: Vercel Serverless Function Timeout on AI Generation

**What goes wrong:**
A Claude API call for question generation takes 3-8 seconds depending on model load. On the Vercel Hobby plan, the default function timeout is 10 seconds (configurable up to 60 seconds). If the prompt is complex, the model is under load, or the network has latency, the function times out. The user sees a generic error or a blank quiz. Worse: the API call may have succeeded (you get billed) but the response never reaches the user.

**Why it happens:**
Vercel serverless functions are designed for fast request-response cycles, not waiting on slow upstream APIs. Claude API latency is variable -- Haiku 4.5 is fast (usually 1-3 seconds) but can spike. Developers test during low-traffic periods and don't account for peak latency.

**How to avoid:**
- Default to serving pre-generated content (no API call = no timeout risk). This is the primary mitigation.
- When real-time generation is needed, use streaming responses: Vercel supports edge functions with streaming, and the Claude API supports streaming. This keeps the connection alive and gives the user immediate feedback.
- Set maxDuration to 30 seconds for any route that calls the Claude API (well within the 60-second Hobby limit).
- Implement a fallback: if the API call fails or times out, serve a pre-generated variation instead. Never show an error to the user when content is available in the database.
- Use Haiku 4.5 (not Sonnet or Opus) for real-time generation -- it is 3-5x faster and 3x cheaper.

**Warning signs:**
- Intermittent "quiz failed to load" errors
- Function duration metrics in Vercel dashboard showing p95 latency above 8 seconds
- Users report the app "hangs" when starting a quiz

**Phase to address:**
Phase 2 (AI Integration) -- when the real-time generation feature is built, streaming and fallback must be implemented simultaneously, not as an afterthought.

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Hardcoding CA DMV rules in prompts instead of referencing a structured handbook database | Faster to prototype | Adding other states or updating for new CA laws requires rewriting prompts | MVP only -- refactor before adding any state |
| Storing quiz results as flat JSON instead of normalized tables | Simpler schema, faster to build | Analytics queries become slow and complex; category-level trend analysis requires parsing JSON on every query | Never -- normalize from the start since analytics is a core feature |
| Skipping RLS on Supabase tables (single user, who cares?) | Faster setup | If classmates join or it goes public, every user can read/modify all data. 83% of exposed Supabase databases have RLS misconfigurations (CVE-2025-48757) | Never -- enable RLS from day one even for single user. It takes 5 minutes and prevents a rewrite later |
| Using localStorage instead of Supabase for quiz history | Works offline, no backend dependency | Data lost if browser cache clears; no cross-device sync; analytics impossible at scale | Phase 1 only if you need something working before Supabase is set up. Migrate immediately |
| Generating all question variations at build time (SSG) | Zero runtime cost, fastest possible serving | Build times grow linearly with question bank size; can't add new variations without a redeploy; stale content | Acceptable for MVP with a small question bank (<500 variations total) |

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Claude API | Sending the entire CA DMV handbook as context in every request (~30K tokens = $0.03/call on Haiku) | Use prompt caching: send handbook once as a cached system prompt. Subsequent calls read from cache at 0.1x cost ($0.003/call). Saves 90% on input tokens |
| Claude API | Using Sonnet/Opus for question rephrasing (expensive, slow) | Use Haiku 4.5 for variation generation. It handles constrained rephrasing tasks well. Reserve Sonnet for complex explanation generation only if needed |
| Claude API | Not using structured output, parsing free-form text with regex | Use Claude's structured output (JSON schema) to force the response into `{question, options[], correct_index, explanation}` format. Eliminates parsing errors and reduces output tokens by 40-70% |
| Supabase | Not enabling RLS, exposing anon key in client-side code | Enable RLS on every table immediately. The anon key is public by design but RLS policies ensure it can only access authorized data |
| Supabase | Using the service role key in client-side Next.js code | Service role key bypasses ALL security. Only use in server-side API routes, never in client components. Use the anon key + RLS for client-side access |
| Supabase | Testing RLS policies in the SQL Editor and assuming they work | The SQL Editor bypasses RLS. Always test policies from the client SDK with actual user credentials |
| Vercel | Not setting maxDuration on API routes that call Claude | Default 10-second timeout will kill LLM calls. Set `export const maxDuration = 30` on any route handler that makes an API call |
| ts-fsrs | Manually tweaking FSRS parameters to "improve" scheduling | Use default parameters. Only adjust `desired_retention` (set to 0.90 for high-stakes material). The algorithm needs ~1000 reviews to justify parameter optimization, which this use case will never reach |

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Fetching full question bank on every quiz start | Slow initial load (>2s), high Supabase egress | Query only the questions needed for the current quiz (10-46 questions). Use indexed queries on category and difficulty | 500+ pre-generated variations in the database |
| No database indexes on frequently queried columns | Quiz load time degrades as data grows | Add indexes on: `category`, `seed_question_id`, `user_id + created_at` (for history queries), `next_review_date` (for SRS scheduling) | 1000+ rows in quiz_results table |
| Re-rendering the entire quiz component on every answer | Janky UI, dropped animations, state bugs | Use React state properly: each question card manages its own answer state. Parent component only tracks completion status | Noticeable with 46-question simulated test |
| Storing base64 images in Supabase Postgres instead of Storage | Rapidly fills 500 MB database limit | Use Supabase Storage (1 GB free) for any images (road signs). Store only URLs in the database | 50+ images at ~100KB each = 5 MB database overhead vs. 0 bytes |
| Generating explanations on every wrong answer in real-time | Each wrong answer triggers an API call; in a 46-question test with 8 wrong answers, that is 8 extra API calls and 15+ seconds of latency | Pre-generate explanations alongside question variations. Store them in the database. Serve instantly | Any real-time generation on the critical path of quiz review |

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Exposing Claude API key in client-side JavaScript | Anyone can steal the key and rack up charges on your Anthropic account | All Claude API calls must go through Vercel serverless functions (server-side only). Never import the API key in a client component |
| Not rate-limiting the quiz generation API route | A malicious user (or a curious classmate) could spam the endpoint and burn through API credits | Implement rate limiting: max 5 real-time generation requests per user per minute. Use Vercel's built-in rate limiting or a simple token bucket in Supabase |
| Supabase anon key without RLS | Anyone who inspects network traffic gets the anon key and can read/write all tables | Enable RLS on every table. Write policies that scope data access to the authenticated user (or public read-only for question data) |
| Storing user progress without any authentication | If the app is shared with classmates, anyone can see or modify anyone's quiz history | Even for v1 single-user, use Supabase Auth (anonymous auth is fine). This creates a user ID for RLS policies and makes multi-user trivial to add later |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Making the UI look like a sterile test-prep tool | Teenagers disengage immediately. The app feels like homework, not a tool they want to use | Use the .gg gaming aesthetic. Add streak counters, progress bars, category mastery badges. Make it feel like leveling up, not studying |
| Showing raw percentage scores without context | "You got 72%" means nothing without knowing the pass threshold | Always show score relative to the 83% pass threshold (38/46). Use color coding: red below 75%, yellow 75-82%, green 83%+ |
| Long quiz sessions without save points | If the user closes the browser mid-quiz, they lose all progress. Teenagers have short attention spans and get interrupted | Auto-save after every answer. Allow resuming an incomplete quiz. Show progress indicator ("Question 12 of 46") |
| No immediate feedback on wrong answers | User finishes 46 questions, then scrolls through a wall of corrections. Learning impact is minimal | Show correct/incorrect immediately after each answer with a brief explanation. The post-quiz summary is for analytics, not primary learning |
| Overwhelming the user with all features on first visit | New user sees practice mode, drill mode, flashcards, simulated test, analytics -- decision paralysis | Progressive disclosure: start with a guided "take your first practice quiz" flow. Unlock other modes after the first session |
| Not explaining WHY an answer is correct | User memorizes "B is correct" without understanding the underlying rule. Defeats the purpose of varied questions | Every question must have an explanation tied to the specific CA DMV handbook section. Show this after every wrong answer and optionally after correct ones |

## "Looks Done But Isn't" Checklist

- [ ] **Question Bank:** Seed questions exist, but have they been verified against the CURRENT (2026) CA DMV Driver Handbook? Laws change. Verify publication date of source material
- [ ] **AI Variation Pipeline:** Questions generate successfully, but does every variation preserve the correct answer? Run a validation suite: generate 100 variations, verify all 100 have the same correct answer as the seed
- [ ] **Quiz Scoring:** Score calculation works, but does it match actual DMV rules (46 questions, 38 to pass, specific category distribution)? Verify against official DMV test structure
- [ ] **Analytics Dashboard:** Charts render, but do category scores update after every quiz? Test: take a quiz, check dashboard, take another quiz, verify the trend line includes both sessions
- [ ] **Spaced Repetition:** Cards resurface, but are the intervals actually different based on user performance? Test: mark a card "hard" and mark another "easy" -- verify different next-review dates
- [ ] **Mobile Responsiveness:** App renders on mobile, but are touch targets big enough (44x44px minimum)? Test on an actual phone, not just DevTools. Teenagers will use this on their phones
- [ ] **Error States:** Happy path works, but what happens when Supabase is paused? When the Claude API returns an error? When the user has no internet? Test all three explicitly
- [ ] **Pre-generation Coverage:** Batch generation ran, but did it generate variations for ALL seed questions, or did some fail silently? Check that every seed question has at least 3 stored variations

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Hallucinated wrong answers in production | MEDIUM | Immediately flag all AI-generated content as "unverified" in the database. Add a manual review queue. Re-validate all stored variations against seed question correct answers. Add the post-generation validation check that should have been there from the start |
| Cost blowup from real-time calls | LOW | Switch to serving pre-generated content only (disable real-time endpoint). Review API usage logs to understand the spending pattern. Implement rate limiting before re-enabling real-time generation |
| Database in read-only mode (500 MB) | LOW | Identify and delete unnecessary data (old quiz attempts, excessive variations). Vacuum the database. If data is legitimately needed, upgrade to Supabase Pro ($25/month) |
| Supabase project paused | LOW | Manually unpause in Supabase dashboard (takes 1-2 minutes for cold start). Then implement the cron keep-alive to prevent recurrence |
| User data exposed via missing RLS | HIGH | Enable RLS immediately. Audit what data was accessible. If classmates had access, assume all quiz history was visible. Reset any sensitive data. This is why RLS should be enabled from day one |
| Ambiguous questions eroding user trust | MEDIUM | Add "report question" feature. Review reported questions. Temporarily disable full answer rephrasing and fall back to question-stem-only variations until quality improves |

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| LLM hallucinations | Phase 1 (Foundation) | Run validation suite: 100 generated variations, 100% correct-answer preservation rate |
| Cost blowup | Phase 1 (Foundation) | Batch pre-generation pipeline operational. Real-time generation disabled or rate-limited. Monthly cost <$5 |
| Ambiguous questions | Phase 2 (AI Integration) | User testing: 5 AI-varied quizzes with zero "multiple correct answers" complaints |
| Supabase pausing | Phase 1 (Foundation) | Cron keep-alive deployed. App tested after 8+ days of no manual usage |
| Supabase 500 MB limit | Phase 2 (AI Integration) | Database size monitoring in place. Projected usage calculated and under 250 MB |
| SRS cold start | Phase 3 (Adaptive Learning) | Category-based prioritization working before FSRS is added. First-session experience tested with new user |
| Vercel function timeout | Phase 2 (AI Integration) | maxDuration set on all API routes. Fallback to pre-generated content tested. p95 latency under 5 seconds |
| Missing RLS | Phase 1 (Foundation) | RLS enabled on all tables. Tested from client SDK (not SQL Editor) |
| API key exposure | Phase 1 (Foundation) | All Claude API calls in server-side routes. Client bundle inspected for leaked keys |
| Teen disengagement | Phase 1 (Foundation) | UI review with target user (Darrell's daughter). Gamification elements visible on first visit |

## Sources

- [Lakera -- Guide to Hallucinations in LLMs (2026)](https://www.lakera.ai/blog/guide-to-hallucinations-in-large-language-models)
- [Duke University -- Why Are LLMs Still Hallucinating? (2026)](https://blogs.library.duke.edu/blog/2026/01/05/its-2026-why-are-llms-still-hallucinating/)
- [Helicone -- Monitor and Optimize LLM Costs](https://www.helicone.ai/blog/monitor-and-optimize-llm-costs)
- [Claude API Pricing (Official)](https://platform.claude.com/docs/en/about-claude/pricing)
- [Supabase Pricing (Official)](https://supabase.com/pricing)
- [Supabase Free Tier Breakdown (UI Bakery, 2026)](https://uibakery.io/blog/supabase-pricing)
- [Vercel Hobby Plan (Official)](https://vercel.com/docs/plans/hobby)
- [Vercel Functions Limitations (Official)](https://vercel.com/docs/functions/limitations)
- [Supabase Pause Prevention (GitHub)](https://github.com/travisvn/supabase-pause-prevention)
- [ts-fsrs Documentation](https://open-spaced-repetition.github.io/ts-fsrs/)
- [FSRS ABC Wiki](https://github.com/open-spaced-repetition/fsrs4anki/wiki/abc-of-fsrs)
- [AI-Generated MCQ Quality Study (PMC)](https://pmc.ncbi.nlm.nih.gov/articles/PMC11854382/)
- [Next.js + Supabase Common Mistakes](https://www.iloveblogs.blog/post/nextjs-supabase-common-mistakes)
- [Supabase RLS Guide (2026)](https://vibeappscanner.com/supabase-row-level-security)
- [Vercel Function Pricing Breakdown (Flexprice)](https://flexprice.io/blog/vercel-pricing-breakdown)
- [CA DMV Driver Handbook (Official)](https://www.dmv.ca.gov/portal/driver-handbooks/)
- [Duolingo Gamification Case Study (2025)](https://www.youngurbanproject.com/duolingo-case-study/)
- [EduGenius -- Validate AI Questions for Accuracy](https://www.edugenius.app/blog/validate-ai-questions-accuracy-fairness)

---
*Pitfalls research for: AI-powered driving permit test prep*
*Researched: 2026-03-17*
