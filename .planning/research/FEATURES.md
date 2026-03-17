# Feature Research

**Domain:** AI-powered driving permit test prep (CA DMV)
**Researched:** 2026-03-17
**Confidence:** HIGH

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = product feels incomplete or untrustworthy.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Question bank with correct answers | Every competitor has 600+ verified questions. Wrong answers destroy trust and teach wrong habits. | MEDIUM | Source from CA DMV handbook and existing practice test databases. Must be factually verified -- AI hallucinations here are catastrophic. |
| Multiple choice format matching real test | CA DMV uses multiple choice. Anything else feels like studying the wrong material. | LOW | 4-option multiple choice. Match the real exam format exactly. |
| Answer explanations on wrong answers | DMV Genie, Zutobi, and every serious competitor provides immediate explanations. Users expect to understand *why* they got it wrong. | MEDIUM | Best practice: show explanation immediately after answering, not batched at end. Reference the specific CA DMV handbook section. |
| Score tracking per quiz | Users need to know how they did. Every quiz app shows a score. | LOW | Show score, percentage, pass/fail threshold (38/46 = 83%). |
| Simulated DMV test mode | 46 questions with real category distribution and pass/fail scoring. Users want to rehearse the real experience. | MEDIUM | Timer optional but category distribution matters. Roughly 25% road signs, rest split across traffic laws, right-of-way, DUI/drugs, safe driving. |
| Mobile-responsive design | Target user is a teenager. They will use their phone. If it does not work on mobile, they will not use it. | MEDIUM | Web-first but must be mobile-first responsive. Touch targets, readable fonts, no horizontal scrolling. |
| Progress persistence | Users expect to close the app, come back, and see their history. Losing progress kills retention. | MEDIUM | Supabase handles this. Even without auth, local storage as fallback. |
| Category-organized questions | Users need to study specific topics (signs, right-of-way, DUI laws). Every competitor organizes by category. | LOW | Tag every question. Categories: road signs, right-of-way, traffic laws, speed limits, DUI/drug laws, safe driving practices, parking, sharing the road. |
| Practice quiz mode (quick sessions) | Users want short 10-20 question sessions. Not everyone has time for a full 46-question sim. | LOW | Mixed-topic, configurable length. The default session for casual study. |
| Dark mode | 82% of mobile users prefer dark mode. Teen audience especially expects it. | LOW | Implement from the start with CSS variables. Retrofitting is painful. |

### Differentiators (Competitive Advantage)

Features that set Permit.GG apart. These are where the product competes.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| AI-generated question variations | Core differentiator. Every competitor uses static question banks, which means users memorize answers instead of learning concepts. AI rewrites the same concept with different phrasing/scenarios each time. Prevents pattern matching, forces genuine understanding. | HIGH | Use Claude API. Pre-generate batches of variations per seed question to control cost. Real-time generation as supplement. Must validate factual accuracy -- wrong AI-generated content is worse than no AI at all. |
| Deep category-based analytics dashboard | Go beyond "you got 75%." Show per-category mastery, trends over time, weakest areas highlighted. DMV Genie has a basic challenge bank; Zutobi has basic progress. Neither has rich trend analytics. | HIGH | Persistent dashboard. Charts showing category scores over sessions. "You are weakest in right-of-way" with drill recommendation. |
| Category drill mode | Focused practice on a single weak category. Existing apps have section tests but do not auto-recommend which section to drill based on analytics. Connecting analytics to targeted drill is the differentiator. | MEDIUM | Must tie into analytics. "Your weakest area is DUI laws -- drill now?" reduces friction from insight to action. |
| Missed question review with re-phrased questions | DMV Genie has a "Challenge Bank" that re-quizzes missed questions, but with the exact same question text. Permit.GG re-quizzes missed concepts with NEW AI-generated phrasing, which tests actual understanding rather than recognition memory. | MEDIUM | Depends on AI variation engine and missed-question tracking. High pedagogical value. |
| Spaced repetition scheduling | Resurface questions at optimal intervals using ts-fsrs algorithm (same as Anki). Most DMV prep apps do not implement real SRS -- they just let users re-take tests. True SRS means the app tells you *when* to study *what*. | HIGH | ts-fsrs library handles the algorithm. Need to track per-question review history, schedule next review dates. |
| Readiness prediction score | "You are 87% likely to pass the real test." Driving-Tests.org has a "Readiness Meter." This goes further by combining category mastery, trend trajectory, and SRS data into a single confidence metric. | MEDIUM | Depends on sufficient quiz history. Show on dashboard. Tie to "Ready to book your test!" encouragement when score is high. |
| Flashcard mode with SRS integration | Flip-style cards for concept review, but powered by spaced repetition rather than random shuffling. Study the cards you are about to forget. | MEDIUM | Integrates with ts-fsrs. Simpler UI than quiz mode but same underlying scheduling. |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems. Deliberately NOT building these.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Social leaderboards / friend competition | Zutobi does this. Seems engaging for teens. | Requires user accounts and multi-tenancy (out of scope for v1). Leaderboards create anxiety in weaker students and incentivize speed over accuracy. A teen who fails repeatedly does not need public humiliation. | Personal progress milestones ("You improved 15% in road signs this week"). Compete with yourself, not others. |
| Gamification with points, badges, levels | Every engagement article recommends it. Zutobi and Driving Theory 4 All use it. | Adds significant UI/UX complexity for questionable learning value. Points become the goal instead of learning. For a focused single-user tool, intrinsic motivation (passing the test) is stronger than extrinsic rewards. | Readiness score and "days studied" streak serve as lightweight motivation without building a reward system. |
| AI chatbot tutor (conversational Q&A) | Quizlet had Q-Chat. Seems like the obvious AI feature. | Quizlet killed Q-Chat (June 2025). Conversational AI for factual test prep is expensive per-interaction, hard to keep accurate, and adds complexity without proportional value. Users need to answer questions, not chat about them. | AI-generated explanations on wrong answers deliver the "AI tutoring" value without the chatbot overhead. |
| Multi-state support | "Add all 50 states!" Bigger market. | Massive content effort. Each state has different handbook, laws, question format. Dilutes quality. CA-only means every question is verified for one jurisdiction. | Architect the data model so state is a dimension, but only populate CA. Expand later if validated. |
| User-generated content / custom question banks | "Let users add their own questions." | Quality control nightmare. Wrong user-submitted content teaches wrong answers. For a safety-critical domain (driving laws), authoritative content matters. | Curated seed questions with AI variations provide variety without quality risk. |
| Timer on practice quizzes | "Make it feel more like the real test." | The real CA DMV test is not timed. Adding time pressure to practice sessions creates unnecessary anxiety and does not simulate real conditions. | Timer only on simulated DMV test mode (optional). Practice should be low-pressure. |
| Audio/podcast study mode | Quizgecko and others generate audio content. | Driving test content is visual (road signs, diagrams). Audio does not work for "What does this sign mean?" questions. Development cost high for low applicability to this domain. | Flashcard mode covers the "passive review" use case more effectively for visual content. |
| Comprehensive drivers ed curriculum | "Teach them to drive, not just pass the test." | Scope explosion. Drivers ed requires video content, behind-the-wheel instruction context, state certification. Different product entirely. | Link to official CA DMV handbook for learning. Permit.GG is test prep, not drivers ed. |

## Feature Dependencies

```
[Question Bank + Category Tags]
    |
    +--requires--> [Practice Quiz Mode]
    |                  |
    |                  +--enhances--> [Post-Quiz Summary]
    |                                    |
    |                                    +--feeds--> [Analytics Dashboard]
    |                                                    |
    |                                                    +--enables--> [Category Drill Mode]
    |                                                    |
    |                                                    +--enables--> [Readiness Score]
    |
    +--requires--> [Simulated DMV Test Mode]
    |
    +--requires--> [Flashcard Mode]
    |
    +--requires--> [Missed Question Tracking]
                       |
                       +--enables--> [Missed Question Review Mode]

[AI Variation Engine]
    |
    +--enhances--> [Practice Quiz Mode] (varied questions each session)
    +--enhances--> [Missed Question Review Mode] (re-phrased missed concepts)
    +--enhances--> [Category Drill Mode] (never repeat exact phrasing)
    +--enhances--> [Flashcard Mode] (varied card content)

[Spaced Repetition (ts-fsrs)]
    |
    +--enhances--> [Flashcard Mode] (optimal review scheduling)
    +--enhances--> [Practice Quiz Mode] (prioritize due questions)
    +--enhances--> [Readiness Score] (memory decay modeling)
    +--requires--> [Per-Question Review History]

[Dark Mode]
    (independent -- no dependencies, implement early)

[Answer Explanations]
    +--requires--> [Question Bank] (explanations per question)
    +--enhanced-by--> [AI Variation Engine] (generate explanations for variations)
```

### Dependency Notes

- **Analytics Dashboard requires Post-Quiz Summary:** Dashboard aggregates data from individual quiz results. Build quiz flow first, then aggregate.
- **Category Drill requires Analytics Dashboard:** The value is "drill your weakest area" which needs weakness identification first. Without analytics, category drill is just filtered practice.
- **AI Variation Engine enhances multiple modes:** This is a horizontal capability, not a mode. Build it as a service that feeds into quiz, drill, missed review, and flashcard modes.
- **Spaced Repetition requires per-question history:** ts-fsrs needs timestamps and correctness data per question per user. Database schema must support this from the start even if SRS features come later.
- **Missed Question Review requires Missed Question Tracking:** Simple dependency, but tracking must be in place before the review mode UI makes sense.

## MVP Definition

### Launch With (v1)

Minimum viable product -- what is needed to validate the core hypothesis that AI variation + analytics beats static question banks.

- [ ] **Question bank with category tags** -- Foundation for everything else. ~300 seed questions covering all CA DMV categories.
- [ ] **AI question variation engine** -- Core differentiator. Pre-generate 3-5 variations per seed question. Validates the entire product thesis.
- [ ] **Practice quiz mode** -- Primary interaction. 10-20 mixed questions per session. Uses AI variations so each session feels fresh.
- [ ] **Answer explanations** -- Immediate feedback on wrong answers. References CA DMV handbook. Without this, users learn nothing from mistakes.
- [ ] **Post-quiz summary** -- Score, wrong answers review, category breakdown. Minimum analytics.
- [ ] **Simulated DMV test mode** -- 46 questions, pass/fail. The "am I ready?" moment users need.
- [ ] **Category drill mode** -- Pick a category, get focused practice. Even without auto-recommendation, manual selection is valuable.
- [ ] **Basic analytics (persistent)** -- Category scores over time, weakest areas. Does not need to be fancy, but must persist across sessions.
- [ ] **Dark mode** -- Build with CSS variables from day one. Teen audience expects it.
- [ ] **Mobile-responsive UI** -- Non-negotiable for teen audience.

### Add After Validation (v1.x)

Features to add once the core loop is working and validated with the target user.

- [ ] **Missed question review with AI re-phrasing** -- Trigger: user has enough quiz history to have meaningful missed questions.
- [ ] **Flashcard mode with SRS** -- Trigger: user wants passive review between quiz sessions.
- [ ] **Spaced repetition scheduling** -- Trigger: users return multiple days. SRS needs multi-day usage patterns to provide value.
- [ ] **Readiness prediction score** -- Trigger: enough data to make predictions meaningful (5+ completed quizzes).
- [ ] **Analytics trend charts** -- Trigger: users have multi-session history. Show improvement trajectory.

### Future Consideration (v2+)

Features to defer until product-market fit is established.

- [ ] **User accounts / multi-tenancy** -- Defer until classmates want to use it. Architect for it but do not build auth flow.
- [ ] **Additional states** -- Defer until CA is solid. Data model should support state dimension.
- [ ] **Lightweight streaks / study reminders** -- Defer until retention is a proven problem. Push notifications need mobile app or browser permissions.
- [ ] **Hazard perception / scenario-based questions** -- Defer. UK tests have this; CA does not. Could be a future differentiator but not table stakes.

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Question bank + category tags | HIGH | MEDIUM | P1 |
| AI variation engine | HIGH | HIGH | P1 |
| Practice quiz mode | HIGH | LOW | P1 |
| Answer explanations | HIGH | MEDIUM | P1 |
| Post-quiz summary | HIGH | LOW | P1 |
| Simulated DMV test mode | HIGH | MEDIUM | P1 |
| Category drill mode | HIGH | LOW | P1 |
| Basic analytics dashboard | HIGH | MEDIUM | P1 |
| Dark mode | MEDIUM | LOW | P1 |
| Mobile-responsive UI | HIGH | MEDIUM | P1 |
| Missed question review (AI re-phrased) | HIGH | MEDIUM | P2 |
| Flashcard mode | MEDIUM | MEDIUM | P2 |
| Spaced repetition (ts-fsrs) | MEDIUM | HIGH | P2 |
| Readiness prediction score | MEDIUM | MEDIUM | P2 |
| Analytics trend charts | MEDIUM | MEDIUM | P2 |
| User accounts / multi-tenancy | LOW | HIGH | P3 |
| Additional states | LOW | HIGH | P3 |
| Study streak / reminders | LOW | LOW | P3 |

**Priority key:**
- P1: Must have for launch -- validates the core hypothesis
- P2: Should have, add when core loop is proven
- P3: Nice to have, future consideration

## Competitor Feature Analysis

| Feature | DMV Genie | Zutobi | Driving-Tests.org | Driving Theory 4 All (UK) | Permit.GG (Our Approach) |
|---------|-----------|--------|-------------------|---------------------------|--------------------------|
| Question bank size | 650+ static | 500+ static | 500+ static | Official DVSA bank | ~300 seed x 5 AI variations = 1500+ unique phrasings |
| AI question variation | No | No | No | Yes (UK-only) | Yes -- core differentiator |
| Answer explanations | Yes | Yes | Yes | Yes | Yes + AI-generated for variations |
| Category organization | Yes | Yes (chapters) | Yes | Yes | Yes -- deeper than competitors |
| Simulated test | Yes (exam simulator) | Yes (practice test) | Yes | Yes (mock test) | Yes -- matching real CA format |
| Spaced repetition | No | No | No | No | Yes (ts-fsrs) -- unique in DMV space |
| Analytics depth | Basic (challenge bank) | Basic (progress %) | Readiness Meter | AI-driven weak areas | Deep category trends over time |
| Missed question review | Same questions repeated | No dedicated mode | No dedicated mode | AI re-phrased | AI re-phrased -- unique approach |
| Gamification | None | Points, leaderboard | None | Achievements | None (intentional) -- readiness score instead |
| Flashcards | No | No | No | No | Yes with SRS |
| Dark mode | Yes | No | No | Unknown | Yes |
| Price | Free w/ ads, $10 premium | $15-20 subscription | Free w/ premium | Subscription | Free (personal use) |
| Target age group | General | Teens | General | General (UK) | Teens |

## Sources

- [DMV Genie - App Store](https://apps.apple.com/us/app/dmv-practice-test-genie/id513850893) -- Competitor feature analysis
- [DMV Genie - driving-tests.org](https://driving-tests.org/dmv-genie/) -- Feature details, 97% pass rate claim
- [Zutobi Permit Test App](https://zutobi.com/us/driver-guides/zutobi-permit-test-app) -- Gamification and teen engagement features
- [Zutobi](https://zutobi.com/us) -- Overall feature set and pricing
- [Driving Theory 4 All](https://www.drivingtheory4all.co.uk/the-first-ai-theory-test-app) -- Only existing AI-powered driving test prep (UK)
- [Driving-Tests.org Premium](https://driving-tests.org/premium/) -- Readiness Meter feature
- [Top 10 AI Exam Preparation Tools 2026](https://www.scmgalaxy.com/tutorials/top-10-ai-exam-preparation-tools-in-2025-features-pros-cons-comparison/) -- General AI test prep landscape
- [Quizlet AI Study Tools](https://quizlet.com/features/ai-study-tools) -- Memory Score, adaptive learning, Q-Chat sunset
- [Quizlet AI Study Era Announcement](https://quizlet.com/blog/ai-study-era) -- Q-Chat discontinued June 2025
- [CA DMV Sample Knowledge Tests](https://www.dmv.ca.gov/portal/driver-education-and-safety/educational-materials/sample-driver-license-dl-knowledge-tests/) -- Official test format reference
- [CA DMV Driver Handbooks](https://www.dmv.ca.gov/portal/driver-handbooks/) -- Source material for question bank

---
*Feature research for: AI-powered CA DMV permit test prep*
*Researched: 2026-03-17*
