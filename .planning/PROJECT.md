# Permit.GG

## What This Is

An AI-powered California driving permit test prep web app that solves two fundamental problems with existing practice quizzes: static questions that lead to memorization instead of learning, and lack of meaningful analytics to guide focused study. Built for Darrell's daughter (and potentially her classmates) after she failed her CA permit test.

## Core Value

Dynamic question variation powered by AI ensures users learn the material rather than memorize specific Q&A pairs, while category-based analytics identify exactly where to focus study time.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] AI-generated question variations from seed questions (same concept, different phrasing each time)
- [ ] Question bank sourced from existing practice test databases and CA DMV handbook
- [ ] Category tagging for all questions (right-of-way, signs, speed limits, DUI laws, etc.)
- [ ] Practice quiz mode (quick 10-20 question mixed-topic sessions)
- [ ] Category drill mode (focused practice on a single weak category)
- [ ] Missed question review (re-quiz on previously missed questions with new AI-generated phrasing)
- [ ] Flashcard mode (flip-style cards for concept review)
- [ ] Simulated DMV test mode (46 questions, real category distribution, pass/fail)
- [ ] Post-quiz summary (score, wrong answers with explanations, category breakdown)
- [ ] Persistent analytics dashboard (category scores, trends over time, weak areas highlighted)
- [ ] Spaced repetition scheduling (resurface questions at optimal intervals)

### Out of Scope

- Mobile native app — web-first, responsive design sufficient
- User accounts / multi-tenancy — single user for v1, architect for future expansion
- Payment / monetization — free tool for personal use
- Content for states other than California — CA DMV only for v1

## Context

- Existing CA permit test prep market has no US product combining AI question variation + deep analytics + adaptive learning
- UK product "Driving Theory 4 All" has AI question rewriting but is DVSA-only
- Best open-source components: ts-fsrs (spaced repetition algorithm used by Anki), Quizter (reference architecture for AI quiz apps)
- CA DMV permit test: 46 questions, need 38 correct to pass (83%), covers road signs, right-of-way, traffic laws, DUI/drug laws, safe driving practices
- Target user is a teenager — UI should be engaging, not sterile

## Constraints

- **Hosting**: Vercel free tier (frontend) + Supabase free tier (Postgres backend, auth if needed)
- **LLM**: Claude API for question generation
- **Cost**: Minimize ongoing API costs — prefer pre-generation with real-time as supplement
- **Accuracy**: Generated questions must be factually correct for CA DMV test — wrong answers teach wrong habits

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Vercel + Supabase | Free tier covers single user, Postgres for analytics, scales if classmates join | — Pending |
| Claude API for question gen | Already in ecosystem, high quality output | — Pending |
| Web app over mobile | Faster to build, accessible on any device | — Pending |
| Pre-generate + real-time hybrid | Balance cost vs freshness of question variations | — Pending |
| Repo name: permit-gg | Gaming-flavored .gg TLD appeals to teen audience | — Pending |

---
*Last updated: 2026-03-17 after initialization*
