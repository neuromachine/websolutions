# TASK-FE-002 — Light Frontend Refactor for API / Store Adapter Readiness

## Status

Ready for frontend agent execution.

## Phase

Stage 2 — Light frontend refactor for API/store adapter readiness.

## Core principle

Small, safe, frontend-only refactor.

This task prepares the API/store layer for future rendering work. It does not implement the rendering work itself.

---

## Relation to previous work

`TASK-FE-000` confirmed that the frontend repository is organizationally ready:

```text
- frontend/backend repository boundaries are clear;
- npm run build is forbidden by default;
- src/** was untouched;
- npm run test:run passed;
- Stage 2 is now allowed.
```

`TASK-FE-001` audited content data consumption and found:

```text
- standard content endpoints use response.data.data;
- flat CP / ind_offers endpoint uses response.data;
- frontend has no active consumption path for flat CP endpoint;
- service offer rendering exists partially but is not active;
- Compred.vue is not yet wired to the flat CP endpoint.
```

---

## Main goal

Introduce a small, explicit frontend convention for backend API response handling so that future tasks can safely implement:

```text
- Compred.vue refactor;
- ind_offers / commercial proposal rendering;
- service offer package rendering;
- calculator draft adapters.
```

---

## Required context to read

Before editing, inspect:

```text
AGENTS.md
.agents/agents.md
.agents/info/FE-00-two-repository-operating-model.md
.agents/info/FE-10-content-data-consumption-map.md
.agents/info/FE-11-services-category-rendering-map.md
.agents/info/FE-12-ind-offers-rendering-map.md
.agents/info/FE-13-calculator-contract-prep.md
.agents/info/FE-14-api-store-adapter-readiness.md
.agents/contracts/FE-CONTENT-DATA-CONSUMPTION-CONTRACT.md
.agents/contracts/FE-API-ADAPTER-CONTRACT.md
.agents/workflows/FRONTEND-COMMAND-POLICY.md
.agents/reports/REPORT-FE-001-content-data-consumption-audit.md
.agents/reports/REPORT-FE-000-agent-rules-cleanup.md
```

If some files are absent, continue with the files present and report the gap.

---

## Primary files to inspect

```text
src/utils/api.js
src/stores/blockStore.js
src/stores/navigationStore.js
src/services/formService.js
src/composables/usePageOrchestrator.js
src/router/index.js
src/router/routes/services.js
```

Optional inspection only:

```text
src/views/Compred.vue
src/components/Group.vue
src/components/blocks/services/presentation/service.vue
```

Do not refactor optional UI files in this task.

---

## Allowed changes

The agent may:

```text
- add a tiny API response helper module;
- centralize response.data.data unwrapping for standard endpoints;
- make flat response unwrapping explicit for future CP endpoint usage;
- lightly adjust store fetch methods to use the helper;
- add a future-safe store action for the flat CP endpoint only if no UI rendering is activated;
- add or update focused tests for helpers/stores if current test setup supports it;
- update local docs/comments only where useful;
- create the final report.
```

Suggested implementation option:

```text
src/utils/apiResponse.js
  unwrapResourceData(response)
  unwrapFlatData(response)
  normalizeApiError(error) // optional, only if simple
```

The agent may choose a different minimal location if justified.

---

## Forbidden changes

Do not:

```text
- edit backend repo or backend handoff files as if they were source;
- run npm run build;
- refactor src/views/Compred.vue;
- implement ind_offers rendering;
- activate service offer cards;
- redesign blockStore or navigationStore;
- rewrite usePageOrchestrator;
- change routes;
- change UI output intentionally;
- rename legacy keys: childs, child, acticle, section, items;
- introduce TypeScript migration;
- introduce new dependencies;
- run broad formatting across unrelated files.
```

---

## Command policy

Allowed:

```bash
npm run test:run
```

Forbidden unless human explicitly requests:

```bash
npm run build
```

If build appears necessary, mention it in the report as a recommendation only.

---

## Expected implementation boundaries

This is a light refactor.

A good result may change only a few files, for example:

```text
src/utils/apiResponse.js
src/stores/blockStore.js
src/stores/navigationStore.js
tests/** optional
.agents/reports/REPORT-FE-002-light-api-store-adapter-refactor.md
```

If many component files need to change, stop and report that the task is larger than intended.

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

Also inspect `git status --short` and ensure no generated build files appeared.

---

## Expected final report

Create:

```text
.agents/reports/REPORT-FE-002-light-api-store-adapter-refactor.md
```

The report must include:

```text
1. Files inspected.
2. Files changed.
3. Whether a shared API response adapter was added.
4. Which endpoints are now treated as standard Resource endpoints.
5. Whether flat CP endpoint readiness was added or only documented.
6. Any UI intentionally not touched.
7. Commands run.
8. Confirmation that npm run build was not run.
9. Recommended next task.
```

---

## Success criteria

The task succeeds if:

```text
- standard vs flat response handling is clearer;
- future CP/ind_offers consumption has a safe adapter path;
- existing tests pass;
- no visible UI work is mixed in;
- no backend files are touched;
- npm run build is not run;
- final report clearly explains what changed and what did not.
```

## Failure criteria

The task fails if:

```text
- build is run without explicit human instruction;
- Compred.vue is refactored in this task;
- service offers UI is activated in this task;
- backend assumptions are changed inside frontend code;
- legacy payload keys are normalized globally;
- large unrelated formatting or UI rewrites happen.
```
