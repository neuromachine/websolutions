# RUN-FE-003 — Compred Refactor Preparation Workflow

## Purpose

Use this workflow to run the read-only Compred preparation task after FE-002.

## Current phase

```text
Stage 3 — Compred.vue refactor preparation
```

## Human launch command

```powershell
cd C:\OSPanel\home\websolutions
Get-Content .agents\tasks\LAUNCH-FE-003-compred-refactor-preparation.md -Raw | Set-Clipboard
```

Paste the clipboard content into Antigravity.

## Expected git status after run

Expected:

```text
?? .agents/reports/REPORT-FE-003-compred-refactor-preparation.md
```

Allowed outside repo / Antigravity workspace:

```text
walkthrough.md
task.md
```

Unexpected:

```text
M src/**
M package.json
M vite.config.*
M tailwind.config.js
M .github/**
```

If source files are modified, the task exceeded its scope.

## Command policy

No source code changes are expected, so tests are optional.

Do not run:

```text
npm run build
```

If tests are run, only use:

```text
npm run test:run
```

## Review checklist

After the agent completes, check that the report answers:

```text
- What does Compred.vue do today?
- What data does it expect?
- What sections/components are already extracted?
- What files should FE-004 modify?
- What should wait until FE-005?
- Is it safe to proceed?
```

