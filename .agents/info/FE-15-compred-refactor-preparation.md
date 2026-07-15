# FE-15 — Compred Refactor Preparation

## Purpose

This document defines the preparation stage before refactoring `src/views/Compred.vue`.

The frontend has now completed a light API/store adapter refactor:

```text
src/utils/apiResponse.js
src/stores/blockStore.js
src/stores/navigationStore.js
```

The key result is that the frontend can now distinguish:

```text
standard Laravel Resource endpoints -> response.data.data
flat CP / ind_offers endpoints      -> response.data
```

This makes the next stage possible, but not automatic.

`Compred.vue` must not be refactored blindly. It is a commercially important page/view and likely mixes orchestration, data fetching, section composition, and presentation behavior.

---

## Current working assumption

`Compred.vue` currently behaves as a legacy/shell commercial proposal view.

Known context from previous frontend audit:

```text
- Compred.vue is not yet wired to the flat offers endpoint.
- It previously relied on standard block item fetching patterns.
- Backend now has prepared ind_offers data.
- FE-002 added fetchFlatOffers(slug) but did not connect it to UI.
```

---

## Desired future direction

Move toward this structure:

```text
src/views/Compred.vue
  -> route/page shell only
  -> no complex section rendering decisions if avoidable

src/components/blocks/compred/index.vue or equivalent
  -> orchestrates CP data loading
  -> receives proposal slug
  -> calls blockStore.fetchFlatOffers(slug)
  -> prepares normalized props for sections

src/components/blocks/compred/presentation/*
  -> pure presentation sections
  -> props only
  -> no store imports
```

The exact file structure must be proposed after inspecting the current code.

---

## Boundaries

This preparation stage must answer:

```text
1. What is Compred.vue doing today?
2. Which data shape does it currently expect?
3. Which components does it import?
4. Which sections are already extracted?
5. Which parts are orchestration vs presentation?
6. Which parts are safe to move in FE-004?
7. Which parts should remain untouched until ind_offers rendering is explicitly implemented?
```

---

## Non-goals

Do not implement:

```text
- actual Compred.vue refactor;
- ind_offers rendering;
- service offers rendering;
- calculator data rendering;
- route redesign;
- design-system migration;
- backend changes.
```

