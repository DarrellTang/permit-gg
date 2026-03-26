# Requirements: Permit.GG

**Defined:** 2026-03-17
**Core Value:** Dynamic question variation powered by AI ensures users learn the material rather than memorize specific Q&A pairs, while category-based analytics identify exactly where to focus study time.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Question Engine

- [x] **QENG-01**: User sees questions sourced from a verified CA DMV question bank (~300 seed questions)
- [x] **QENG-02**: Every question is tagged to a CA DMV category (road signs, right-of-way, traffic laws, speed limits, DUI/drug laws, safe driving, parking, sharing the road)
- [ ] **QENG-03**: User sees AI-generated variations of seed questions (different phrasing, same concept, same correct answer)
- [ ] **QENG-04**: AI variations are pre-generated in batches (3-5 per seed) via Claude Batch API
- [ ] **QENG-05**: When pre-generated pool is depleted, system generates new variations in real-time via Claude API
- [x] **QENG-06**: All questions use 4-option multiple choice format matching the real CA DMV test
- [x] **QENG-07**: User sees an immediate explanation when answering incorrectly, referencing the relevant CA DMV handbook section

### Practice Quiz

- [x] **QUIZ-01**: User can start a practice quiz with 10-20 mixed-topic questions
- [x] **QUIZ-02**: Each practice session serves AI-varied questions so no two sessions feel identical
- [x] **QUIZ-03**: User sees one question at a time (no peeking ahead)

### Simulated DMV Test

- [x] **SIM-01**: User can take a simulated DMV test with 46 questions
- [x] **SIM-02**: Simulated test uses realistic category distribution matching the actual CA DMV exam
- [x] **SIM-03**: User sees pass/fail result at 83% threshold (38/46 correct)
- [x] **SIM-04**: User cannot go back to change previous answers (matching real test behavior)

### Category Drill

- [x] **DRILL-01**: User can select a specific category and practice only questions from that category
- [ ] **DRILL-02**: Analytics dashboard recommends which category to drill based on weakest areas

### Missed Question Review

- [x] **MISS-01**: System tracks all incorrectly answered questions per user
- [ ] **MISS-02**: User can start a review session that re-quizzes missed concepts with AI-rephrased questions
- [ ] **MISS-03**: Questions leave the missed pool once answered correctly in a review session

### Flashcard Mode

- [ ] **FLASH-01**: User can study concepts in flip-style flashcard format
- [ ] **FLASH-02**: Flashcard scheduling is powered by spaced repetition (ts-fsrs) for optimal review intervals
- [ ] **FLASH-03**: User sees cards they are about to forget first

### Analytics & Progress

- [x] **ANAL-01**: After each quiz, user sees a summary with score, wrong answers with explanations, and category breakdown
- [x] **ANAL-02**: User has a persistent dashboard showing category mastery scores across all sessions
- [x] **ANAL-03**: Dashboard shows trends over time (improving/declining per category)
- [x] **ANAL-04**: Dashboard highlights weakest categories with drill recommendations
- [x] **ANAL-05**: User sees a readiness prediction score ("X% likely to pass")
- [x] **ANAL-06**: All quiz history and progress persists across sessions (stored in Supabase)

### Spaced Repetition

- [ ] **SRS-01**: System schedules question review using ts-fsrs algorithm
- [ ] **SRS-02**: Questions answered correctly are spaced out; incorrect questions resurface sooner
- [ ] **SRS-03**: SRS data feeds into readiness score calculation

### UI/UX

- [x] **UI-01**: App is mobile-responsive with touch-friendly targets
- [x] **UI-02**: App supports dark mode from launch
- [x] **UI-03**: UI is engaging for a teen audience (not sterile/corporate)

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Multi-User

- [x] **MULTI-01**: User can create an account and log in
- [x] **MULTI-02**: Multiple users can use the app independently with separate progress
- [ ] **MULTI-03**: Classmates can be invited to join

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
| QENG-01 | Phase 1 | Complete |
| QENG-02 | Phase 1 | Complete |
| QENG-03 | Phase 4 | Pending |
| QENG-04 | Phase 4 | Pending |
| QENG-05 | Phase 4 | Pending |
| QENG-06 | Phase 1 | Complete |
| QENG-07 | Phase 2 | Complete |
| QUIZ-01 | Phase 2 | Complete |
| QUIZ-02 | Phase 2 | Complete |
| QUIZ-03 | Phase 2 | Complete |
| SIM-01 | Phase 2 | Complete |
| SIM-02 | Phase 2 | Complete |
| SIM-03 | Phase 2 | Complete |
| SIM-04 | Phase 2 | Complete |
| DRILL-01 | Phase 3 | Complete |
| DRILL-02 | Phase 3 | Pending |
| MISS-01 | Phase 3 | Complete |
| MISS-02 | Phase 5 | Pending |
| MISS-03 | Phase 5 | Pending |
| FLASH-01 | Phase 5 | Pending |
| FLASH-02 | Phase 5 | Pending |
| FLASH-03 | Phase 5 | Pending |
| ANAL-01 | Phase 2 | Complete |
| ANAL-02 | Phase 3 | Complete |
| ANAL-03 | Phase 3 | Complete |
| ANAL-04 | Phase 3 | Complete |
| ANAL-05 | Phase 3 | Complete |
| ANAL-06 | Phase 2 | Complete |
| SRS-01 | Phase 5 | Pending |
| SRS-02 | Phase 5 | Pending |
| SRS-03 | Phase 5 | Pending |
| UI-01 | Phase 1 | Complete |
| UI-02 | Phase 1 | Complete |
| UI-03 | Phase 1 | Complete |

**Coverage:**
- v1 requirements: 34 total
- Mapped to phases: 34
- Unmapped: 0

---
*Requirements defined: 2026-03-17*
*Last updated: 2026-03-17 after roadmap creation*
