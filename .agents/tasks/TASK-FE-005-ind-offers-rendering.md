# TASK-FE-005 — ind_offers Rendering

## Status

Prepared as a separate frontend execution task.

## Phase

Stage 5 — ind_offers rendering.

## Dependency

Recommended after FE-004, but may be executed independently if the agent first verifies the current `Compred.vue` / compred orchestrator boundary.

## Core principle

Connect flat commercial proposal data to UI without breaking legacy presentation expectations.

---

## Source context

Read first:

```text
.agents/reports/REPORT-FE-003-compred-refactor-preparation.md
.agents/reports/REPORT-FE-004-compred-practical-refactor.md if present
.agents/contracts/FE-IND-OFFERS-RENDERING-CONTRACT.md
.agents/contracts/FE-COMPRED-ORCHESTRATION-CONTRACT.md
.agents/info/FE-12-ind-offers-rendering-map.md
.agents/workflows/FRONTEND-COMMAND-POLICY.md
```

---

## Main goal

Use the existing store action:

```text
blockStore.fetchFlatOffers(slug)
```

to fetch and render individual commercial proposal data from the flat endpoint family.

---

## Required behavior

The flat endpoint unwraps:

```text
response.data
```

The old standard endpoint unwraps:

```text
response.data.data
```

Do not mix these contracts.

---

## Implementation direction

In the compred orchestration layer, introduce a local normalizer that maps the flat payload into a view model suitable for existing presentation components.

Preferred local flow:

```text
fetchFlatOffers(slug)
  -> flat payload { category, block, items }
    -> normalizeCommercialProposalPayload(payload)
      -> {
           proposal,
           properties,
           meta
         }
      -> presentation props
```

The exact function name/location may vary, but keep it local and small.

---

## Files to inspect

```text
src/stores/blockStore.js
src/utils/apiResponse.js
src/views/Compred.vue
src/components/blocks/compred/index.vue
src/components/blocks/compred/presentation/*
src/router/index.js
src/router/routes/services.js
```

---

## Allowed changes

```text
src/components/blocks/compred/index.vue
src/views/Compred.vue only if FE-004 boundary needs a small compatibility update
src/stores/blockStore.js only if fetchFlatOffers has a small bug, not for redesign
src/utils/apiResponse.js only if unwrapFlatData needs a tiny safety correction
.agents/reports/REPORT-FE-005-ind-offers-rendering.md
```

Optional:

```text
src/components/blocks/compred/presentation/*
```

Only if a tiny props compatibility adjustment is unavoidable.

---

## Forbidden changes

Do not:

```text
- edit backend repo
- run npm run build
- rename legacy keys
- globally normalize acticle -> article
- implement service offer cards
- build calculator logic
- rewrite router structure unless strictly necessary
- introduce new dependencies
- run broad formatting
```

---

## Legacy keys to preserve

```text
acticle
items
hero
benefits
includes
reelsSystem
extras
important
```

---

## Validation

Run:

```bash
npm run test:run
```

Do not run:

```bash
npm run build
```

Manual browser/dev validation is recommended if available:

```text
/compred/{known-proposal-slug}
```

Known proposal slugs should be taken from the backend handoff/context, not invented.

---

## Expected report

Create:

```text
.agents/reports/REPORT-FE-005-ind-offers-rendering.md
```

Include:

```text
1. Actual payload shape observed or assumed from contract.
2. Files changed.
3. Normalization strategy.
4. How flat endpoint differs from standard endpoints.
5. Which presentation components were reused.
6. Legacy keys preserved.
7. Commands run and results.
8. Remaining gaps.
```

---

## Success criteria

```text
- ind_offers / commercial proposal page can fetch flat offer data.
- Flat response is not treated as response.data.data.
- Existing presentation components receive compatible props.
- No backend changes are made.
- npm run test:run passes.
- npm run build is not run.
```

