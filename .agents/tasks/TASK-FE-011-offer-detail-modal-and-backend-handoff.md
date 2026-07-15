# TASK-FE-011 — Offer Detail Modal and Backend Article Handoff

## Status

Backlog / should run after FE-010 or after service offer cards are clickable.

## Group

Group D — Modal + backend handoff.

## Goal

Introduce a modern responsive modal/popup mechanism for offer details and connect it to click events from service/offer cards.

If backend article/detail data is not available, create a backend handoff request instead of inventing content.

## Context

Existing historical modal approach used functional `DialogModal(Component, options)`, which had limitations around dynamic header updates.

There are existing form/components that may be relevant:

```text
src/components/OfferRequestForm.vue
src/components/OfferRequestForm.vue
src/components/forms/*
src/components/OverlayCat.vue
src/components/OverlayItem.vue
src/services/formService.js
src/stores/formStore.js
```

## Main goals

```text
1. Audit current modal/dialog/popup approach.
2. Decide whether to replace old functional modal with component-based modal.
3. Implement a reusable modal shell if none is suitable.
4. Connect click event from offer/service item to open modal.
5. Show immediately available offer summary.
6. Prepare optional detail/article fetch path.
7. Create backend handoff if no backend detail/article endpoint exists.
```

## Preferred modal direction

Use a flexible modern option only if it fits the existing stack and does not introduce unnecessary dependency weight.

Acceptable approaches:

```text
A. Build a small local Vue modal shell.
B. Use an already installed modal/dialog library if present.
C. Add a lightweight popular package only if justified and approved in report.
```

Do not add a large UI framework.

## Backend handoff

Create/update:

```text
.agents/backend-handoff/HANDOFF-BE-001-offer-article-endpoint.md
```

if the frontend needs an endpoint like:

```text
GET /api/{locale}/blocks/items/{offerKey}/article
```

or another backend-approved content detail endpoint.

## Allowed changes

```text
src/components/ui/AppModal.vue or similar
src/components/blocks/services/presentation/service.vue for emit/open only
src/components/Group.vue if it owns modal state
src/stores/modalStore.js only if justified
src/services/* only if adding a small article/detail fetch helper
.agents/backend-handoff/HANDOFF-BE-001-offer-article-endpoint.md
.agents/reports/REPORT-FE-011-offer-detail-modal-and-backend-handoff.md
```

## Forbidden changes

Do not:

```text
- implement calculator/cart here
- rewrite all forms
- modify backend repo
- run npm run build
- add heavy dependency without explicit report justification
- fetch backend data inside dumb presentation cards directly
```

## Accessibility baseline

```text
- ESC closes
- overlay click closes unless there is unsaved form state
- focus management considered
- mobile responsive
- body scroll lock while open
```

## Validation

Run:

```bash
npm run test:run
```

Manual/dev checks:

```text
click service offer -> modal opens
modal closes
responsive layout acceptable
missing article/detail does not break modal
```

