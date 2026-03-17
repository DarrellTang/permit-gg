# Requirements: Permit.GG

**Defined:** 2026-03-17
**Core Value:** Dynamic question variation powered by AI ensures users learn the material rather than memorize specific Q&A pairs, while category-based analytics identify exactly where to focus study time.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Question Engine

- [ ] **QENG-01**: User sees questions sourced from a verified CA DMV question bank (~300 seed questions)
- [ ] **QENG-02**: Every question is tagged to a CA DMV category (road signs, right-of-way, traffic laws, speed limits, DUI/drug laws, safe driving, parking, sharing the road)
- [ ] **QENG-03**: User sees AI-generated variations of seed questions (different phrasing, same concept, same correct answer)
- [ ] **QENG-04**: AI variations are pre-generated in batches (3-5 per seed) via Claude Batch API
- [ ] **QENG-05**: When pre-generated pool is depleted, system generates new variations in real-time via Claude API
- [ ] **QENG-06**: All questions use 4-option multiple choice format matching the real CA DMV test
- [ ] **QENG-07**: User sees an immediate explanation when answering incorrectly, referencing the relevant CA DMV handbook section

### Practice Quiz

- [ ] **QUIZ-01**: User can start a practice quiz with 10-20 mixed-topic questions
- [ ] **QUIZ-02**: Each practice session serves AI-varied questions so no two sessions feel identical
- [ ] **QUIZ-03**: User sees one question at a time (no peeking ahead)

### Simulated DMV Test

- [ ] **SIM-01**: User can take a simulated DMV test with 46 questions
- [ ] **SIM-02**: Simulated test uses realistic category distribution matching the actual CA DMV exam
- [ ] **SIM-03**: User sees pass/fail result at 83% threshold (38/46 correct)
- [ ] **SIM-04**: User cannot go back to change previous answers (matching real test behavior)

### Category Drill

- [ ] **DRILL-01**: User can select a specific category and practice only questions from that category
- [ ] **DRILL-02**: Analytics dashboard recommends which category to drill based on weakest areas

### Missed Question Review

- [ ] **MISS-01**: System tracks all incorrectly answered questions per user
- [ ] **MISS-02**: User can start a review session that re-quizzes missed concepts with AI-rephrased questions
- [ ] **MISS-03**: Questions leave the missed pool once answered correctly in a review session

### Flashcard Mode

- [ ] **FLASH-01**: User can study concepts in flip-style flashcard format
- [ ] **FLASH-02**: Flashcard scheduling is powered by spaced repetition (ts-fsrs) for optimal review intervals
- [ ] **FLASH-03**: User sees cards they are about to forget first

### Analytics & Progress

- [ ] **ANAL-01**: After each quiz, user sees a summary with score, wrong answers with explanations, and category breakdown
- [ ] **ANAL-02**: User has a persistent dashboard showing category mastery scores across all sessions
- [ ] **ANAL-03**: Dashboard shows trends over time (improving/declining per category)
- [ ] **ANAL-04**: Dashboard highlights weakest categories with drill recommendations
- [ ] **ANAL-05**: User sees a readiness prediction score ("X% likely to pass")
- [ ] **ANAL-06**: All quiz history and progress persists across sessions (stored in Supabase)

### Spaced Repetition

- [ ] **SRS-01**: System schedules question review using ts-fsrs algorithm
- [ ] **SRS-02**: Questions answered correctly are spaced out; incorrect questions resurface sooner
- [ ] **SRS-03**: SRS data feeds into readiness score calculation

### UI/UX

- [ ] **UI-01**: App is mobile-responsive with touch-friendly targets
- [ ] **UI-02**: App supports dark mode from launch
- [ ] **UI-03**: UI is engaging for a teen audience (not sterile/corporate)

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Multi-User

- **MULTI-01**: User can create an account and log in
- **MULTI-02**: Multiple users can use the app independently with separate progress
- **MULTI-03**: Classmates can be invited to join

### Extended Content

- **EXT-01**: Support for additional states beyond California
- **EXT-02**: Road sign image questions (visual recognition)

### Engagement

- **ENG-01**: Daily study streak tracking
- **ENG-02**: Study reminder notifications
- **ENG-03**: "Daily challenge" short quiz to maintain habit

## Out of Scope

| Feature | Reason |
|---------|--------|
| Social leaderboards | Creates anxiety for struggling students; requires multi-tenancy |
| Gamification (points, badges, levels) | Adds complexity without proportional learning value; intrinsic motivation (passing the test) is stronger |
| AI chatbot tutor | Quizlet killed Q-Chat; expensive per-interaction, hard to keep accurate |
| Multi-state support in v1 | Massive content effort; dilutes quality; CA-only ensures every question is verified |
| User-generated questions | Quality control nightmare in safety-critical domain |
| Timer on practice quizzes | Real CA DMV test is not timed; adding pressure doesn't help learning |
| Audio/podcast mode | Driving test content is visual (road signs); audio doesn't work |
| Drivers ed curriculum | Scope explosion; different product entirely |
| Native mobile app | Web-first responsive design is sufficient; reduces development scope |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| (Populated during roadmap creation) | | |

**Coverage:**
- v1 requirements: 30 total
- Mapped to phases: 0
- Unmapped: 30 (pending roadmap)

---
*Requirements defined: 2026-03-17*
*Last updated: 2026-03-17 after initial definition*
