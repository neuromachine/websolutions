# FE-14 — API / Store Adapter Readiness

## Status

Stage 2 planning document for a small frontend-only refactor.

This document explains why the frontend needs a light API/store adapter readiness pass before moving to:

```text
- Compred.vue refactor;
- ind_offers / commercial proposal rendering;
- service offers rendering;
- calculator data draft.
```

---

## 1. Current known state

The frontend consumes backend content through Vue + Pinia + Axios.

Standard Laravel Resource endpoints are consumed through:

```text
response.data.data
```

The individual commercial proposal endpoint is different. It returns a flat JSON object:

```text
response.data
```

Example:

```text
GET /api/{locale}/blocks/categories/offers/{proposalKey}
```

Expected flat shape:

```json
{
  "category": {},
  "block": {},
  "items": []
}
```

The FE-001 audit found that the frontend has no active consumption path for this flat endpoint yet.

---

## 2. Why Stage 2 exists

Do not jump directly into UI rendering.

Before `Compred.vue` or offer-card work, the frontend needs a small adapter layer that makes endpoint expectations explicit.

The goal is not a big refactor.

The goal is to make this distinction hard to forget:

```text
standard endpoint -> unwrapResourceData(response) -> response.data.data
flat endpoint     -> unwrapFlatData(response)     -> response.data
```

---

## 3. Desired result

After Stage 2, the codebase should have a clearer local convention for API responses.

Possible implementation options:

```text
Option A:
  src/utils/apiResponse.js
    unwrapResourceData(response)
    unwrapFlatData(response)
    normalizeApiError(error)

Option B:
  src/services/contentApi.js
    getCategory(slug)
    getItem(slug)
    getCommercialProposal(slug)

Option C:
  minimal store-level helper methods if a new module is too early
```

The agent must inspect the current source before choosing the smallest useful option.

---

## 4. What this stage must not do

This stage must not:

```text
- refactor Compred.vue;
- change visible UI behavior;
- add commercial proposal rendering;
- activate service offer cards;
- rename legacy payload keys;
- change routes;
- introduce backend assumptions not present in handoff docs;
- run npm run build.
```

---

## 5. Compatibility rules

Preserve backend/frontend compatibility keys:

```text
childs
child
acticle
section
items
content
sections
subcategories
blocks
```

Do not normalize these globally.

If a local alias is needed for component readability later, it must be introduced as a local adapter with explicit compatibility comments, not as a global payload mutation.

---

## 6. Relationship to later stages

Stage 2 prepares the ground.

Future stages may then safely proceed:

```text
Stage 3:
  Refactor src/views/Compred.vue.

Stage 4:
  Add ind_offers data consumption and rendering.

Stage 5:
  Restore/implement service offers rendering.

Stage 6:
  Draft calculator data adapter.
```
