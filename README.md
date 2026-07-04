# Stage 13 — Frontend Agent Rules Cleanup Package

## Purpose

This package installs the organizational layer for the WebSolutions frontend repository.

It explicitly defines:

```text
- frontend/backend repository boundaries;
- frontend agent operating rules;
- command policy forbidding npm run build by default;
- API response envelope rules;
- legacy key compatibility rules;
- backend/frontend handoff workflow.
```

## Important

This package does not start Stage 2.

It does not refactor:

```text
src/**
Compred.vue
stores
router
components
service offers
ind_offers rendering
calculator data
```

## Install

Unpack/copy into the frontend repository root:

```text
C:\OSPanel\home\websolutions
```

Expected files:

```text
AGENTS.md
.agents/README.md
.agents/agents.md
.agents/info/FE-00-two-repository-operating-model.md
.agents/workflows/FRONTEND-COMMAND-POLICY.md
.agents/workflows/TWO-REPO-HANDOFF-WORKFLOW.md
.agents/tasks/TASK-FE-000-agent-rules-cleanup.md
.agents/tasks/LAUNCH-FE-000-agent-rules-cleanup.md
.agents/reports/templates/REPORT-FE-000-agent-rules-cleanup.template.md
```

## Launch

After placing files:

```powershell
cd C:\OSPanel\home\websolutions
Get-Content .agents\tasks\LAUNCH-FE-000-agent-rules-cleanup.md -Raw | Set-Clipboard
```

Paste into Antigravity as the task.

## Expected Result

Only report file should be created:

```text
.agents/reports/REPORT-FE-000-agent-rules-cleanup.md
```

No source code changes should happen.
