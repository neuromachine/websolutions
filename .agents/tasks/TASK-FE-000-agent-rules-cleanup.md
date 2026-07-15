# TASK-FE-000 — Frontend Agent Rules Cleanup

## Status

Organizational setup task.

## Scope

Frontend repository only.

This task does not refactor Vue source code.
This task does not implement API adapters.
This task does not touch `Compred.vue`.
This task does not implement service offers or `ind_offers` rendering.

---

## Goal

Install and verify the frontend agent operating rules for the two-repository WebSolutions workflow.

The result should make future frontend agent tasks safer by clearly defining:

```text
- frontend/backend repository boundaries;
- API consumption rules;
- legacy compatibility keys;
- command policy;
- no default npm build behavior;
- backend/frontend handoff workflow.
```

---

## Allowed Changes

Only documentation / `.agents` organizational files:

```text
AGENTS.md
.agents/README.md
.agents/agents.md
.agents/info/FE-00-two-repository-operating-model.md
.agents/workflows/FRONTEND-COMMAND-POLICY.md
.agents/workflows/TWO-REPO-HANDOFF-WORKFLOW.md
.agents/reports/REPORT-FE-000-agent-rules-cleanup.md
```

---

## Forbidden Changes

Do not modify:

```text
src/**
package.json
package-lock.json
vite.config.*
tailwind.config.*
.github/**
```

Do not run:

```bash
npm run build
```

Do not start Stage 2.
Do not perform frontend refactoring.

---

## Required Checks

Inspect the installed organizational files and confirm:

```text
- AGENTS.md states this is frontend repo only;
- .agents/agents.md contains API response rules;
- command policy forbids npm run build by default;
- handoff workflow describes backend <-> frontend transfer;
- no source code was modified.
```

---

## Expected Report

Create:

```text
.agents/reports/REPORT-FE-000-agent-rules-cleanup.md
```

Report must include:

```text
1. Files added/updated.
2. Confirmation that no src/** files were changed.
3. Confirmation that npm run build was not run.
4. Current next stage: Stage 2 — Light frontend refactor for API/store adapter readiness.
5. Any conflicts found with existing frontend .agents files.
```
