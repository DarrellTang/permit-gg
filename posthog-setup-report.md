<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics for PERMIT.GG. Key improvements include:

- **Reverse proxy** configured in `next.config.ts` to route PostHog requests through `/ingest`, improving ad-blocker resilience
- **Error tracking** enabled via `capture_exceptions: true` in the PostHog init config
- **Page view tracking** activated by mounting `PostHogPageView` in the root layout
- **Server-side analytics** added via a new `posthog-node` client (`src/lib/posthog/server.ts`) used in server actions
- **6 new events** added across authentication, quiz, and summary flows; all previously-defined but uncalled events now fire correctly
- **User identification** added server-side on email signup

## Events

| Event | Description | File |
|-------|-------------|------|
| `login_completed` | User completes login (OAuth or email) | `src/app/(marketing)/login/page.tsx`, `src/server/actions/auth.ts` |
| `signup_completed` | User creates a new account | `src/server/actions/auth.ts` |
| `category_drill_started` | User clicks recommended category drill after quiz | `src/components/summary/smart-actions.tsx` |
| `streak_achieved` | User hits a 5× streak milestone during practice | `src/hooks/use-quiz.ts` |
| `wrong_answer_reviewed` | User navigates wrong answers in post-quiz carousel | `src/components/summary/wrong-answer-carousel.tsx` |
| `signup_prompt_clicked` | Anonymous user clicks "Sign Up Free" after completing a quiz | `src/components/summary/signup-prompt.tsx` |

Previously instrumented events now confirmed active:

| Event | File |
|-------|------|
| `quiz_started` | `src/hooks/use-quiz.ts` |
| `quiz_completed` | `src/hooks/use-quiz.ts` |
| `quiz_quit` | `src/hooks/use-quiz.ts` |
| `sim_test_started` | `src/hooks/use-quiz.ts` |
| `sim_test_passed` | `src/hooks/use-quiz.ts` |
| `answer_submitted` | `src/hooks/use-quiz.ts` |

## Next steps

We've built a dashboard and insights to track user behavior based on these events:

**Dashboard**
- [Analytics basics](https://us.posthog.com/project/277219/dashboard/1384452)

**Insights**
- [Quiz completion funnel](https://us.posthog.com/project/277219/insights/tGNG4Y64) — tracks drop-off from quiz start to completion
- [Signup conversion funnel](https://us.posthog.com/project/277219/insights/EEmbJaCN) — tracks anonymous → signup conversion after quiz
- [Quiz quit rate (churn)](https://us.posthog.com/project/277219/insights/xS5Cs9u4) — daily comparison of quizzes started vs. quit
- [Simulated test pass rate](https://us.posthog.com/project/277219/insights/RwGmkhOH) — weekly sim test volume and pass counts
- [Daily active users (DAU)](https://us.posthog.com/project/277219/insights/YTgQlysU) — unique users submitting answers per day

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
