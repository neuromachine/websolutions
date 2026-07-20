# RUN-FE-001 — Frontend Content Data Consumption Audit

## Goal

Run the first frontend branch audit after backend/data/content-seeding handoff.

## Before launch

Confirm that the frontend repository contains:

```text
AGENTS.md
.agents/README.md
.agents/agents.md
.agents/info/**
.agents/contracts/**
.agents/tasks/TASK-FE-001-content-data-consumption-audit.md
```

Also confirm that backend handoff materials were copied into `.agents/info` and `.agents/contracts`.

## Launch prompt

Use:

```text
.agents/tasks/LAUNCH-FE-001-content-data-consumption-audit.md
```

## Expected write target

Only:

```text
.agents/reports/REPORT-FE-001-content-data-consumption-audit.md
```

## Reject the run if agent modifies

```text
src/**
routes/**
package.json
vite.config.*
```

This is a read-only audit task.

## After run

Human review should check:

```text
1. Did the agent identify actual Vue files/components?
2. Did it distinguish standard `.data` endpoints from flat offers endpoint?
3. Did it preserve legacy keys?
4. Did it separate service offers from ind_offers?
5. Did it propose next tasks without implementing them?
```
