# TASK-FE-003 — Compred.vue Refactor Preparation

## Status

Ready for frontend agent execution.

## Phase

Stage 3 — Compred.vue refactor preparation.

## Type

Read-only analysis / implementation planning.

## Core principle

Analyze before editing.

This task prepares the next implementation task. It does not perform the refactor.

---

## Relation to previous work

`TASK-FE-002` completed the light API/store adapter refactor:

```text
- src/utils/apiResponse.js was created;
- blockStore/navigationStore use explicit response unwrapping;
- blockStore now has a future-safe fetchFlatOffers(slug) action;
- npm run test:run passed;
- npm run build was not run;
- Compred.vue and UI rendering were not touched.
```

This means the frontend now has the minimal adapter foundation needed for future commercial proposal rendering.

---

## Main goal

Inspect the current `Compred.vue` implementation and related compred presentation components, then create a clear, practical refactor plan for `TASK-FE-004`.

The report must answer:

```text
1. What does Compred.vue currently do?
2. What data source does it currently use?
3. What route params / slugs does it depend on?
4. Which parts are orchestration?
5. Which parts are presentation?
6. Which sections/components already exist?
7. Which backend fields are expected by the UI?
8. How should FE-004 safely refactor it?
9. How should FE-005 later connect ind_offers rendering?
```

---

## Required context to read

Read first:

```text
AGENTS.md
.agents/agents.md
.agents/info/FE-00-two-repository-operating-model.md
.agents/info/FE-12-ind-offers-rendering-map.md
.agents/info/FE-14-api-store-adapter-readiness.md
.agents/info/FE-15-compred-refactor-preparation.md
.agents/contracts/FE-API-ADAPTER-CONTRACT.md
.agents/contracts/FE-COMPRED-CURRENT-BOUNDARY-CONTRACT.md
.agents/reports/REPORT-FE-001-content-data-consumption-audit.md
.agents/reports/REPORT-FE-002-light-api-store-adapter-refactor.md
.agents/workflows/FRONTEND-COMMAND-POLICY.md
```

If some files are missing, continue with the files present and report the gap.

---

## Primary files to inspect

```text
src/views/Compred.vue
src/components/blocks/compred/**
src/stores/blockStore.js
src/utils/apiResponse.js
src/router/index.js
src/router/routes/services.js
src/components/CPheader.vue
src/components/CPicon.vue
src/components/CPimg.vue
src/components/OfferRequestForm.vue
src/components/forms/**
```

Optional only if needed:

```text
src/components/blocks/general/ui/**
src/components/blocks/general/section/**
src/components/blocks/services/**
src/schemas/offerRequestForm.js
src/services/formService.js
```

---

## Allowed changes

This is a read-only preparation task.

Allowed:

```text
- create .agents/reports/REPORT-FE-003-compred-refactor-preparation.md
- optionally update a temporary task.md if Antigravity requires it
- optionally update walkthrough.md if Antigravity creates it outside the repo
```

---

## Forbidden changes

Do not modify source files:

```text
src/**
package.json
vite.config.*
tailwind.config.js
.github/**
```

Do not:

```text
- run npm run build;
- refactor Compred.vue;
- connect fetchFlatOffers to Compred.vue;
- implement ind_offers rendering;
- change routes;
- change stores;
- change apiResponse.js;
- activate service offer cards;
- modify backend files;
- normalize legacy keys acticle/items/childs/section.
```

---

## Command policy

Allowed, but not required for this read-only task:

```bash
npm run test:run
```

Forbidden unless the human explicitly requests:

```bash
npm run build
```

If no source code was changed, tests may be skipped and noted as unnecessary.

---

## Required report

Create:

```text
.agents/reports/REPORT-FE-003-compred-refactor-preparation.md
```

The report must include:

```text
1. Files inspected.
2. Current Compred.vue responsibility map.
3. Current data flow.
4. Current component dependency map.
5. Existing compred presentation components.
6. Legacy fields and compatibility risks.
7. Proposed FE-004 implementation boundary.
8. Proposed FE-005 ind_offers connection boundary.
9. Files that should be modified in FE-004.
10. Files that must not be modified in FE-004.
11. Validation checklist for FE-004.
12. Whether it is safe to proceed to FE-004.
```

---

## Recommended report structure

```text
# REPORT-FE-003 — Compred.vue Refactor Preparation

## 1. Summary
## 2. Files Inspected
## 3. Current Compred.vue Map
## 4. Current Data Flow
## 5. Component Dependency Map
## 6. Backend/API Contract Touchpoints
## 7. Risks
## 8. Recommended FE-004 Scope
## 9. Deferred FE-005 Scope
## 10. Validation Checklist
## 11. Final Recommendation
```

---

## Success criteria

This task succeeds if:

```text
- no source code is changed;
- Compred.vue is clearly mapped;
- future refactor boundaries are clear;
- fetchFlatOffers usage is positioned for future FE-005, not prematurely wired;
- the next task can be generated from the report without re-auditing everything.
```

## Failure criteria

This task fails if:

```text
- Compred.vue is refactored now;
- ind_offers rendering is implemented now;
- npm run build is executed;
- source files are modified;
- report is vague and does not define FE-004 boundaries.
```

