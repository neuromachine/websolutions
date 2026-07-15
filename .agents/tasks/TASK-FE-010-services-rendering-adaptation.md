# TASK-FE-010 — Services Rendering Adaptation and i18n Hardening

## Status

Backlog / independent from Compred.

## Group

Group C — Services rendering.

## Goal

Refactor and adapt services rendering around `src/components/Group.vue` and service offer cards.

This task prepares category/service pages to show correct service offer/package data, handle current locales/scopes, and use i18n for static labels.

## Context

Prior FE-001 found:

```text
- service cards exist in src/components/blocks/services/presentation/service.vue
- cards are inactive/commented in Group.vue
- service.vue expects price/timeline arrays
- currency is hardcoded to ₽
- t(...) may be referenced without useI18n/import
- data.content and data.subcategories are already used
- legacy keys such as childs/child/section/items must remain compatible
```

## Target files

Inspect first:

```text
src/components/Group.vue
src/components/blocks/services/presentation/service.vue
src/components/blocks/services/presentation/group.vue
src/components/blocks/services/presentation/category.vue
src/components/blocks/services/presentation/subcategories.vue
src/components/blocks/services/index.vue
src/router/routes/services.js
src/stores/blockStore.js
src/i18n/locales/ru.json
src/i18n/locales/en.json
src/i18n/locales/vi.json
```

## Main goals

```text
1. Understand exact current Group.vue data flow.
2. Restore/enable service offer card rendering only where payload supports it.
3. Fix service.vue i18n helper usage.
4. Replace hardcoded static labels with i18n keys.
5. Make currency/scope display locale-aware or data-aware.
6. Add defensive rendering for missing price/timeline/features.
7. If backend lacks required data, create handoff questions instead of inventing schema.
```

## Data rules

Do not assume:

```text
price is always [min, max]
timeline is always [min, max]
features always exists
featured always exists
vi locale is complete
```

Create local helpers if needed:

```text
normalizePriceRange(value)
normalizeTimelineRange(value)
normalizeFeatures(value)
resolveCurrency(locale, data)
```

## Backend handoff triggers

Create a backend handoff note if the frontend needs:

```text
- guaranteed package schema
- currency per locale/package
- stable featured flag
- localized timeline units
- extra article/detail content per offer
```

Do not modify backend repo from this task.

## Allowed changes

```text
src/components/Group.vue
src/components/blocks/services/presentation/service.vue
src/components/blocks/services/presentation/* if directly involved
src/i18n/locales/*.json for static UI labels
small local utils under src/utils or service-local helper if justified
.agents/reports/REPORT-FE-010-services-rendering-adaptation.md
```

## Forbidden changes

Do not:

```text
- modify Compred.vue
- implement calculator/cart here
- implement modal here except optional event emit placeholder
- modify backend repo
- run npm run build
- rename legacy keys
- assume Russian ruble for all locales
```

## Validation

Run:

```bash
npm run test:run
```

Manual/dev checks:

```text
/services
/direction/{slug}
/group/{slug}
ru/en/vi scope behavior if available
empty/missing service offers should not break layout
```

## Expected report

```text
.agents/reports/REPORT-FE-010-services-rendering-adaptation.md
```

Include:

```text
- files changed
- how Group.vue now chooses to render service cards
- i18n keys added/used
- price/timeline fallback behavior
- backend handoff questions if any
- commands run
```

