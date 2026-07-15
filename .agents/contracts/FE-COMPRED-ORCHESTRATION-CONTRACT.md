# FE Contract — Compred Orchestration Boundary

## Scope

This contract applies to:

```text
src/views/Compred.vue
src/components/blocks/compred/index.vue
src/components/blocks/compred/presentation/*
```

## Target boundary

```text
Compred.vue
  - route/view shell
  - imports Header/Footer if current layout requires it
  - reads route params only if needed to pass slug
  - does not import stores directly
  - does not call usePageOrchestrator directly after FE-004

components/blocks/compred/index.vue
  - owns data orchestration for commercial proposal rendering
  - may call usePageOrchestrator or blockStore actions
  - normalizes payload into props expected by presentation components
  - owns special inline blocks until they are extracted

presentation/*
  - dumb components
  - props only
  - no store imports
  - no API calls
```

## Protected keys

Preserve the following keys exactly:

```text
acticle
items
hero
benefits
includes
reelsSystem
extras
important
childs
section
```

`acticle` is intentionally misspelled and must not be renamed without a migration task.

## Validation expectations

```text
- Compred route still renders.
- Presentation components receive equivalent props.
- No global backend key normalization is introduced.
- npm run test:run passes.
- npm run build is not run.
```

