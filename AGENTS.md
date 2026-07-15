# AGENTS.md — WebSolutions Frontend Agent Rules

## Status

Frontend repository root agent instructions.

This file defines how code agents must operate inside the **WebSolutions frontend repository**.

This repository is one half of a two-repository system:

```text
wsapi/         -> Laravel backend / data / seeders / EAV / API contracts
websolutions/  -> Vue frontend / routing / stores / rendering / UI contracts
```

Treat this workspace as the **frontend repository only**.

---

## 1. Repository Boundary Rule

### Frontend repository owns

```text
Vue rendering
Vue Router routes
Pinia stores
API consumption adapters
UI components
forms UI
frontend tests
frontend .agents context
```

### Backend repository owns

```text
Laravel API
EAV data model
seeders
JSON content sources
DB schema
Laravel Resources
backend API contracts
```

### Rule

Do not edit backend files from this repository.
Do not assume backend behavior that is not described in the handoff contracts.

If a frontend task reveals a backend issue, create a handoff report instead of trying to fix backend code.

Recommended handoff path:

```text
.agents/reports/HANDOFF-BE-*.md
```

---

## 2. Default Agent Operating Mode

For every task, first classify the work:

```text
audit
contract clarification
frontend refactor
rendering implementation
test update
backend handoff
```

Then follow the smallest safe path:

```text
inspect -> map current behavior -> identify frontend contract -> change only required files -> verify -> report
```

Do not perform broad refactors unless the task explicitly asks for them.

---

## 3. API Consumption Rules

### Standard Laravel Resource endpoints

Standard backend endpoints return the useful payload as:

```text
response.data.data
```

Typical example:

```text
GET /api/{locale}/blocks/categories/{slug}
```

Frontend code should treat `response.data.data` as the payload for standard category/item/resource endpoints.

### Flat CP / individual offer endpoint

The individual commercial proposal endpoint is intentionally flat:

```text
GET /api/{locale}/blocks/categories/offers/{proposalKey}
```

It returns useful payload as:

```text
response.data
```

Expected shape:

```text
category
block
items
```

Do not wrap or unwrap it as `response.data.data` unless the backend contract is intentionally migrated.

---

## 4. Legacy Compatibility Keys

Preserve these keys unless a dedicated migration task is approved:

```text
childs
child
acticle
section
items
```

Do not globally normalize:

```text
childs -> children
acticle -> article
section -> locale/scope
```

A frontend compatibility adapter may expose nicer aliases internally, but the raw API contract must remain understood and supported.

---

## 5. Frontend Architecture Rules

Preserve the current Vue layering:

```text
View.vue
  -> page composition only
  -> no direct store/fetch logic

index.vue / route-level orchestrator
  -> owns stores/fetch/orchestration

presentation components
  -> props in
  -> emits out
  -> no direct store imports

UI primitives
  -> generic
  -> domain-free
```

When working with content pages, prefer a clear boundary between:

```text
API payload
frontend adapter/normalizer
store state
presentation props
```

---

## 6. Command Policy

### Forbidden by default

Do not run:

```bash
npm run build
```

Reason:

```text
Production build is handled remotely by CI/CD.
Local build can create generated files and pollute git status.
The human operator validates development behavior through dev mode and targeted tests.
```

### Allowed by default

```bash
npm run test:run
npm run test
```

### Ask or report instead of running

```bash
npm run dev
npm run build
```

Run these only when the human explicitly requests them in the current task.

If build validation seems necessary, write it as a recommendation in the final report instead of running it.

---

## 7. Git Hygiene

Before reporting success, state:

```text
files changed
commands run
commands not run and why
contract impact
risks / follow-up
```

Do not leave generated build artifacts in the working tree.

If a command creates generated files unexpectedly, report that immediately and do not hide it.

---

## 8. Current Frontend Direction

Current sequence:

```text
FE-001 content data consumption audit -> completed
FE-ORGANIZATION rules cleanup -> current
Next: light frontend refactor / adapter preparation
Later: Compred.vue refactor
Later: ind_offers rendering
Later: service offers rendering
Later: calculator draft
```

Do not jump to later implementation stages unless the current task explicitly asks for them.
