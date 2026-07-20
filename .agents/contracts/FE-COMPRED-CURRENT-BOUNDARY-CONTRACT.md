# FE-COMPRED-CURRENT-BOUNDARY-CONTRACT

## Purpose

This contract protects the current `Compred.vue` boundary while preparing its refactor.

The task is to understand the current boundary before changing it.

---

## Protected files during FE-003

Do not modify source files in this preparation task.

Especially do not modify:

```text
src/views/Compred.vue
src/components/blocks/compred/**
src/stores/blockStore.js
src/utils/apiResponse.js
src/router/**
src/components/blocks/services/**
src/components/blocks/general/**
```

The only expected created/changed file is the report:

```text
.agents/reports/REPORT-FE-003-compred-refactor-preparation.md
```

---

## Existing adapter context

`TASK-FE-002` introduced the API response distinction:

```text
unwrapResourceData(response) -> response.data.data
unwrapFlatData(response)     -> response.data
```

The future `ind_offers`/CP endpoint must use the flat data path.

---

## Future CP endpoint rule

The future commercial proposal rendering path must use:

```text
blockStore.fetchFlatOffers(slug)
```

or a thin wrapper around it, unless a better frontend-local adapter is proposed and justified.

Do not consume the flat CP endpoint through standard `fetchBlockItem` unless the backend contract changes.

---

## Legacy key protection

Do not normalize or rename legacy keys during Compred preparation:

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

If spelling or structure looks wrong, document it as compatibility debt.

---

## Presentation component rule

Presentation sections should remain store-free.

Allowed:

```text
props
computed derived from props
local formatting helpers
emits
```

Forbidden in presentation components:

```text
direct Pinia imports
direct API calls
route reads unless explicitly justified
backend contract assumptions hidden inside templates
```

---

## Output expectation for FE-003

The report must produce a recommended FE-004 implementation boundary:

```text
Files safe to modify
Files not to modify
Data flow proposal
Component split proposal
Risk list
Validation checklist
```

