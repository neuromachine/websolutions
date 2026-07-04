# TASK-FE-001 — Frontend Content Data Consumption Audit

## Status

Initial frontend-branch audit task.

## Type

Read-only analysis task.

## Priority

High.

## Core principle

Do not edit frontend code in this task.

The goal is to understand how the Vue frontend currently consumes backend content payloads and to propose safe follow-up implementation tasks.

## Context

The backend/data/content-seeding branch has stabilized and documented the following content families:

```text
services category
service offers
category descriptions
ind_offers / individual commercial proposals / КП
future calculator data
```

The backend exposes both standard Laravel Resource endpoints and one intentionally flat offers endpoint.

The frontend must not assume all endpoints use the same envelope.

## Required source materials

Before inspecting Vue code, read:

```text
.agents/info/BE-12-api-data-lift-and-resource-flow.md
.agents/info/BE-13-content-production-status.md
.agents/contracts/API-FRONTEND-DATA-HANDOFF-DRAFT.md
.agents/contracts/CONTENT-FAMILY-CONTRACTS.md
.agents/info/CONTENT-SEEDING-NEXT-STEPS.md
.agents/info/FE-10-content-data-consumption-map.md
.agents/info/FE-11-services-category-rendering-map.md
.agents/info/FE-12-ind-offers-rendering-map.md
.agents/info/FE-13-calculator-contract-prep.md
.agents/contracts/FE-CONTENT-DATA-CONSUMPTION-CONTRACT.md
.agents/contracts/FE-SERVICE-OFFERS-RENDERING-CONTRACT.md
.agents/contracts/FE-IND-OFFERS-RENDERING-CONTRACT.md
.agents/contracts/FE-CALCULATOR-DATA-DRAFT-CONTRACT.md
```

## Inspect target areas

Inspect, but do not modify:

```text
src/utils/api.js
src/services/**
src/stores/blockStore.js
src/stores/navigationStore.js
src/stores/uiStore.js
src/composables/usePageOrchestrator.js
src/components/blocks/services/**
src/views/Services.vue
src/views/ServiceView.vue
src/router/**
src/components/blocks/compred/**
src/components/forms/**
```

Exact file list may differ. Inspect actual project structure.

## What to determine

### API client / data unwrapping

```text
1. Where is `response.data.data` unwrapped?
2. Is there a central API adapter or scattered unwrapping?
3. Can the frontend represent flat endpoints separately?
4. Are errors normalized consistently?
```

### Services category rendering

```text
1. Which route renders `/services`?
2. Which route renders service category pages?
3. Which components consume `data.content`?
4. Which components consume `data.subcategories`?
5. Which components consume `data.blocks` and `data.sections`?
6. Where is `childs` used?
```

### Service offers

```text
1. Are service offer package cards currently rendered?
2. Which backend field names are expected?
3. Does frontend support featured package marker?
4. Are price/timeline/features rendered defensively?
5. Is there a need for a dedicated service offer adapter?
```

### Individual CP / ind_offers

```text
1. Is there an existing route/page for individual offers?
2. Does frontend call `/blocks/categories/offers/{slug}`?
3. Does current API client support flat response shape?
4. Which CP sections already have components?
5. Which CP sections need future components?
```

### Future calculator

```text
1. Is there any existing calculator UI or store?
2. Can current package data be mapped into a draft calculator view model?
3. Which fields are missing for reliable calculation?
4. Should calculator data be sourced from service offers, ind_offers, or separate schema?
```

## Protected legacy keys

Do not propose immediate deletion/renaming of:

```text
childs
acticle
section
items
```

You may propose adapter aliases, but the raw contract must remain supported.

## Expected output

Create one report:

```text
.agents/reports/REPORT-FE-001-content-data-consumption-audit.md
```

The report must include:

```text
1. Files inspected.
2. Current API consumption map.
3. Services category rendering map.
4. Service offers rendering status.
5. Individual CP rendering status.
6. Calculator readiness assessment.
7. Legacy key usage map.
8. Risks and missing pieces.
9. Recommended follow-up tasks.
10. Frontend/backend handoff questions.
```

## Forbidden changes

Do not:

```text
- edit Vue components;
- edit stores;
- edit router;
- edit API client;
- rename keys;
- create calculator implementation;
- change backend files;
- change tests;
- add dependencies.
```

Only create the report.

## Recommended follow-up task names

Depending on findings, propose:

```text
TASK-FE-002-api-content-adapter-layer.md
TASK-FE-003-services-rendering-contract-hardening.md
TASK-FE-004-ind-offers-page-prototype.md
TASK-FE-005-calculator-data-adapter-draft.md
TASK-FE-006-frontend-contract-fixtures.md
```
