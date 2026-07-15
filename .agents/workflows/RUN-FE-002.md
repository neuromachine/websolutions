# RUN-FE-002 — Light Frontend Refactor Runbook

## Purpose

Operational instructions for running `TASK-FE-002` in the frontend repository.

---

## 1. Preconditions

The following should already be true:

```text
- Stage 1 / TASK-FE-000 completed;
- frontend agent rules are installed;
- npm run build is forbidden by default;
- FE-001 audit report exists;
- backend handoff docs are present in frontend .agents context or inbox.
```

---

## 2. Launch command for operator

```powershell
cd C:\OSPanel\home\websolutions
Get-Content .agents\tasks\LAUNCH-FE-002-light-api-store-adapter-refactor.md -Raw | Set-Clipboard
```

Paste the clipboard content into the agent platform.

---

## 3. Expected changed files

Likely:

```text
src/utils/apiResponse.js
src/stores/blockStore.js
src/stores/navigationStore.js
.agents/reports/REPORT-FE-002-light-api-store-adapter-refactor.md
```

Optional:

```text
tests/**
```

Unexpected / suspicious:

```text
src/views/Compred.vue
src/components/** broad changes
package.json
vite.config.*
tailwind.config.*
dist/**
```

---

## 4. Validation

Allowed:

```bash
npm run test:run
```

Forbidden by default:

```bash
npm run build
```

After run:

```bash
git status --short
```

Check that no generated build artifacts appeared.

---

## 5. Acceptance

Accept the result if:

```text
- diff is small;
- API response handling is clearer;
- standard and flat response families are explicitly separated;
- tests pass or failure is clearly explained;
- no UI rendering stage is mixed in;
- npm run build was not run.
```

Reject or revise if:

```text
- agent refactored Compred.vue;
- service offer rendering was activated;
- build was run;
- backend files were modified;
- many unrelated files changed.
```
