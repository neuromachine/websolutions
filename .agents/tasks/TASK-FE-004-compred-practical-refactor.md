# TASK-FE-004 — Compred.vue Practical Refactor

## Status

Ready for frontend agent execution.

## Phase

Stage 4 — Compred.vue practical refactor.

## Core principle

Separate orchestration from presentation without changing the visible behavior intentionally.

This task is a practical frontend refactor. It is not the full `ind_offers` rendering task.

---

## Source context

Read first:

```text
.agents/reports/REPORT-FE-003-compred-refactor-preparation.md
.agents/info/FE-16-compred-offers-stages-map.md
.agents/contracts/FE-COMPRED-ORCHESTRATION-CONTRACT.md
.agents/contracts/FE-IND-OFFERS-RENDERING-CONTRACT.md
.agents/workflows/FRONTEND-COMMAND-POLICY.md
```

If some files are absent, continue with the files present and report the gap.

---

## Main goal

Refactor:

```text
src/views/Compred.vue
```

so that it becomes a clean route/view shell, while moving data orchestration and proposal composition into:

```text
src/components/blocks/compred/index.vue
```

---

## Current problem

`Compred.vue` currently combines:

```text
- route shell
- page/data orchestration
- store access
- uiStore/header side effects
- Tidio chat integration
- data slicing from blockStore.item.properties
- presentation component composition
- inline acticle/qrcode rendering
```

This is too much responsibility for a route view and makes future flat endpoint integration risky.

---

## Required implementation direction

### 1. Modify `src/views/Compred.vue`

Target shape:

```text
- import/compose layout shell
- read current route slug if needed
- render compred orchestrator component
- no direct blockStore import
- no direct usePageOrchestrator call
- no manual properties slicing
```

It may still keep route-level layout wrappers if this matches the current app style.

### 2. Create `src/components/blocks/compred/index.vue`

Responsibilities:

```text
- own the current commercial proposal orchestration
- call current data source safely
- compute a properties-like object
- pass slices to presentation components
- preserve current rendering behavior
- keep presentation components unchanged
```

### 3. Preserve existing data source unless needed

Prefer a safe step:

```text
current fetchBlockItem flow stays working
```

Do not force `fetchFlatOffers` into FE-004 unless the existing code already requires it and the change remains small.

The full flat endpoint rendering belongs to FE-005.

---

## Allowed changes

```text
src/views/Compred.vue
src/components/blocks/compred/index.vue
.agents/reports/REPORT-FE-004-compred-practical-refactor.md
```

Small local helper code inside `compred/index.vue` is allowed.

If absolutely necessary, a very small test file may be added.

---

## Forbidden changes

Do not:

```text
- edit backend repo
- run npm run build
- implement full ind_offers rendering
- activate service offers
- modify presentation components in src/components/blocks/compred/presentation/* unless a tiny import path correction is unavoidable
- rename legacy keys: acticle, items, hero, benefits, includes, reelsSystem, extras, important
- rewrite routes
- redesign UI
- introduce new dependencies
- run broad formatting
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

Also inspect:

```bash
git status --short
```

---

## Expected report

Create:

```text
.agents/reports/REPORT-FE-004-compred-practical-refactor.md
```

Include:

```text
1. Files inspected.
2. Files changed.
3. What moved out of Compred.vue.
4. What remains in Compred.vue.
5. Whether presentation components were untouched.
6. Whether current rendering/data source was preserved.
7. Commands run and results.
8. Readiness for FE-005.
```

---

## Success criteria

```text
- Compred.vue is a clean route/view shell.
- A compred index/orchestrator exists.
- Presentation components remain dumb and reusable.
- Current behavior is preserved as much as possible.
- npm run test:run passes.
- npm run build is not run.
```

