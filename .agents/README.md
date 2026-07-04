# .agents README — WebSolutions Frontend

## Purpose

This `.agents` folder contains working context and operating rules for code agents inside the WebSolutions frontend repository.

This repository is separate from the backend repository. It consumes backend API contracts, but it does not own backend implementation.

---

## Directory Roles

```text
.agents/info/
  Architectural notes and current frontend/data-consumption maps.

.agents/contracts/
  Frontend-facing API/rendering contracts.

.agents/workflows/
  Operating procedures for handoff, commands, and repository boundaries.

.agents/tasks/
  Executable agent tasks.

.agents/reports/
  Reports produced by agents after audits/refactors.

.agents/inbox/backend-handoff/
  Selected backend handoff materials copied from wsapi.
```

---

## Current Rule

This package is organizational only.

It does not start frontend refactoring.
It prepares the frontend repository so future tasks can run with clearer boundaries.

---

## Current Next Step

After installing these files, run no code task automatically.

The next planned work is a separate task package for:

```text
Light frontend refactor for API/store adapter readiness
```

That next step must be created in a separate pass.
