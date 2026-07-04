# Stage 12 — Frontend Branch Handoff Package

## Purpose

This package starts the frontend branch after the backend/data/content-seeding branch.

It does not replace backend `.agents` materials. It translates the backend handoff into frontend-facing contracts, rendering maps, and the first read-only frontend audit task.

The goal of this branch is to make Vue consume backend content intentionally, not by accidental coupling to whatever JSON shape happens to arrive.

## Scope

This package focuses on:

```text
services category
service offers
category descriptions
ind_offers / individual commercial proposals / КП
future calculator data
```

## Main rule

Do not normalize away legacy API keys in the frontend.

Preserve and explicitly support:

```text
data.content
data.subcategories
data.blocks
data.sections
childs
acticle
section
```

The frontend may introduce adapter/normalization helpers later, but any normalization must preserve the original backend contract and must not silently change business meaning.

## Recommended first run

Run only:

```text
.agents/tasks/TASK-FE-001-content-data-consumption-audit.md
```

This task is read-only. It should create a report and recommendations, not change Vue code yet.

Expected report:

```text
.agents/reports/REPORT-FE-001-content-data-consumption-audit.md
```

## Human operator workflow

1. Copy this package into the frontend repository root.
2. Ensure the backend handoff materials are also available in `.agents/info` and `.agents/contracts`.
3. Launch `TASK-FE-001`.
4. Review the report.
5. Only after review, generate implementation tasks such as adapter layer, services page rendering cleanup, CP page prototype, and calculator contract implementation.
