# Stage 14 — Frontend Light Refactor Package

## Purpose

This package starts **Stage 2 — Light frontend refactor for API/store adapter readiness**.

It must be applied only after `TASK-FE-000 — Frontend Agent Rules Cleanup` has confirmed:

- the frontend repository has clear two-repository boundaries;
- the frontend agent must not edit backend files;
- `npm run build` is forbidden by default;
- standard Laravel Resource endpoints use `response.data.data`;
- the flat CP / `ind_offers` endpoint uses `response.data`.

This package does **not** start `Compred.vue` refactoring and does **not** implement UI rendering for service offers or individual commercial proposals.

## Contents

```text
.agents/
  info/
    FE-14-api-store-adapter-readiness.md

  contracts/
    FE-API-ADAPTER-CONTRACT.md

  tasks/
    TASK-FE-002-light-api-store-adapter-refactor.md
    LAUNCH-FE-002-light-api-store-adapter-refactor.md

  workflows/
    RUN-FE-002.md

  reports/
    templates/
      REPORT-FE-002-light-api-store-adapter-refactor.template.md
```

## Current task

Run only:

```text
.agents/tasks/TASK-FE-002-light-api-store-adapter-refactor.md
```

## Strict scope

Allowed:

- inspect frontend API/store layer;
- add or refine tiny adapter helpers;
- reduce repeated response unwrapping;
- make standard-vs-flat endpoint handling explicit;
- add minimal tests if the current testing setup supports it;
- create a final report.

Forbidden:

- do not edit backend repo;
- do not run `npm run build`;
- do not refactor `src/views/Compred.vue` yet;
- do not implement `ind_offers` rendering yet;
- do not activate service offer cards yet;
- do not redesign stores, router, components, or Tailwind system.
