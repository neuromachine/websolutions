# FE-16 — Compred / Offers Stages Map

## Purpose

This document maps the next frontend execution stages after `TASK-FE-003`.

`TASK-FE-003` established that `src/views/Compred.vue` currently mixes:

```text
route shell
page orchestration
store access
data slicing
presentation composition
small inline special cases
```

It also found that existing presentation components in:

```text
src/components/blocks/compred/presentation/
```

are decoupled from stores and APIs and should be reused unchanged when possible.

## Stage split

### FE-004 — Compred.vue practical refactor

Goal:

```text
Separate route shell from orchestration.
```

Expected direction:

```text
src/views/Compred.vue
  -> dumb route/view shell

src/components/blocks/compred/index.vue
  -> orchestration boundary
```

FE-004 may preserve the current standard `fetchBlockItem` data source if that is the smallest safe step.
It may also prepare a local normalization boundary, but it must not fully implement ind_offers rendering unless explicitly approved by the task.

### FE-005 — ind_offers rendering

Goal:

```text
Connect the flat endpoint action fetchFlatOffers(slug) and render individual commercial proposals.
```

Expected direction:

```text
flat endpoint payload
  -> response.data
    -> { category, block, items }
      -> local normalizer
        -> properties-like object expected by presentation components
```

### FE-006 — service offers rendering

Goal:

```text
Return to standard service category pages and activate/repair service offer cards.
```

This stage is separate from Compred and should focus on services category/group rendering.

## Shared principles

```text
- Keep presentation components dumb.
- Stores own fetching, not rendering.
- Orchestrators normalize payload shape.
- Views compose layout and route boundaries.
- Do not normalize legacy backend keys globally.
- Do not run npm run build.
```

