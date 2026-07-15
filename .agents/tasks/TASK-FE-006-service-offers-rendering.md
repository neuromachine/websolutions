# TASK-FE-006 — Service Offers Rendering

## Status

Prepared as an independent frontend execution task.

## Phase

Stage 6 — service offers rendering.

## Dependency

This task does not depend on FE-004/FE-005 unless the working tree has overlapping changes.

It focuses on standard service/category pages, not individual commercial proposals.

## Core principle

Activate or repair service offer cards using the existing standard category payload without changing backend contract.

---

## Source context

Read first:

```text
.agents/contracts/FE-SERVICE-OFFERS-RENDERING-CONTRACT.md
.agents/info/FE-11-services-category-rendering-map.md
.agents/reports/REPORT-FE-001-content-data-consumption-audit.md
.agents/workflows/FRONTEND-COMMAND-POLICY.md
```

---

## Main goal

Return to the services/category rendering flow and make service offer cards/packages visible and stable where the data already exists.

This is not an `ind_offers` task.

---

## Data contract

Standard category endpoints use:

```text
response.data.data
```

Important payload areas:

```text
data.content
data.subcategories
data.blocks
data.sections
data.children
subcategories[].childs
```

Service offer data may appear through category children, block items, or existing presentation data depending on current implementation. Inspect before editing.

---

## Files to inspect

```text
src/components/blocks/services/index.vue
src/components/blocks/services/list.vue
src/components/blocks/services/wrap.vue
src/components/blocks/services/presentation/group.vue
src/components/blocks/services/presentation/service.vue
src/components/blocks/services/presentation/subcategories.vue
src/components/blocks/services/presentation/item.vue
src/views/Services.vue
src/views/ServiceView.vue
src/views/Group.vue
src/stores/blockStore.js
src/utils/apiResponse.js
```

---

## Allowed changes

```text
src/components/blocks/services/**
src/views/Services.vue
src/views/ServiceView.vue
src/views/Group.vue only if necessary and small
src/stores/blockStore.js only if a tiny selector/fetch compatibility issue is found
.agents/reports/REPORT-FE-006-service-offers-rendering.md
```

Prefer minimal changes in the existing service rendering area.

---

## Forbidden changes

Do not:

```text
- edit backend repo
- run npm run build
- edit Compred.vue
- edit compred presentation components
- connect fetchFlatOffers
- implement ind_offers rendering
- rename childs / child / acticle / section / items
- introduce a new design system migration
- redesign all service page UI
- introduce new dependencies
```

---

## Rendering concerns to solve

Inspect and handle as needed:

```text
featured
price
currency
timeline
features
empty states
localized labels
missing properties
array vs object shapes
```

Do not invent backend fields. If a field is missing, render gracefully or document the backend handoff need.

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

Manual browser/dev validation recommended:

```text
/en/services
/en/group/{service-category-slug}
```

Use existing known routes from the app.

---

## Expected report

Create:

```text
.agents/reports/REPORT-FE-006-service-offers-rendering.md
```

Include:

```text
1. Files inspected.
2. Files changed.
3. Where service offers are sourced from.
4. How service offers are rendered.
5. How empty/missing fields are handled.
6. What was intentionally not changed.
7. Commands run and results.
8. Any backend handoff questions.
```

---

## Success criteria

```text
- Service offer cards/packages render from current standard payload.
- Existing services/category pages keep working.
- No ind_offers logic is introduced.
- No backend changes are made.
- npm run test:run passes.
- npm run build is not run.
```

