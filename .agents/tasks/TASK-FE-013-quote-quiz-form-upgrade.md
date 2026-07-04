# TASK-FE-013 — Quote Quiz Form Upgrade

## Status

Backlog / follows FE-012 or can be planned independently.

## Group

Group E — Configurator / calculator / dynamic CP.

## Goal

Upgrade the commercial proposal request form into a lightweight quiz flow that can collect structured context for a unique commercial proposal.

The result should support the product path:

```text
Category -> offer/package -> configured service set -> quote quiz -> unique commercial proposal request
```

## Existing context

Relevant existing files:

```text
src/components/OfferRequestForm.vue
src/components/FeedbackForm.vue
src/components/forms/BaseInput.vue
src/components/forms/BaseSelect.vue
src/components/forms/BaseTextarea.vue
src/components/forms/BaseCheckbox.vue
src/components/forms/DynamicForm.vue
src/components/forms/SimplifiedForm.vue
src/schemas/offerRequestForm.js
src/services/formService.js
src/stores/formStore.js
```

Backend form subsystem uses:

```text
POST /api/{locale}/forms/submit
```

with form payloads under `data` and dynamic validation by `form_key`.

## MVP quiz steps

Suggested steps:

```text
1. Business / project type
2. Goal: website, automation, marketing, content, support, other
3. Selected services/packages from cart
4. Timing / urgency
5. Budget range
6. Existing assets: website, CRM, content, design, analytics
7. Contact method and contact data
8. Final comment
```

## Behavior

```text
- step-by-step UI
- progress indicator
- ability to go back
- cart summary visible or collapsible
- final payload includes quiz answers + cart items
```

## Data model

```js
quoteQuizPayload = {
  form_key: 'quote_quiz',
  data: {
    locale,
    source,
    cartItems,
    answers,
    contact,
    comment
  }
}
```

If backend does not support `quote_quiz`, create a backend handoff. Do not modify backend repo from frontend.

## Allowed changes

```text
src/components/forms/QuoteQuizForm.vue
src/schemas/quoteQuizForm.js
src/stores/formStore.js if needed
src/services/formService.js if compatible
src/components/calculator/* if integrating with FE-012 cart
src/i18n/locales/*.json
.agents/backend-handoff/HANDOFF-BE-003-quote-quiz-form-key.md if needed
.agents/reports/REPORT-FE-013-quote-quiz-form-upgrade.md
```

## Forbidden changes

Do not:

```text
- break existing feedback/simplified forms
- modify backend repo
- run npm run build
- store user personal data locally beyond active form state
- create a fake final commercial proposal document
```

## Validation

Run:

```bash
npm run test:run
```

Manual/dev checks:

```text
open quote quiz
navigate steps
validate required fields
include cart payload if present
submit or prepare payload through existing formService
```

