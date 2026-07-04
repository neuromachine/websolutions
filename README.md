# Stage 17 — Frontend Next Tasks Roadmap Package

This package contains a grouped backlog of future frontend-oriented agent tasks for the WebSolutions frontend repository.

It does not replace the existing Stage 16 package (`FE-004/005/006`).
It extends the frontend roadmap after the current Compred / ind_offers / service offers work has been reviewed.

## Groups

```text
Group A — Compred dynamic block rendering architecture
Group B — Scroll animations for portfolio and home blocks
Group C — Services rendering adaptation
Group D — Offer detail modal + backend handoff
Group E — Configurator / calculator / quote quiz MVP
```

## Recommended execution order

```text
Prerequisite:
  FE-004 — Compred practical refactor
  FE-005 — ind_offers rendering
  FE-006 — service offers rendering

Then:
  FE-007 — Compred dynamic section renderer architecture
  FE-008 — Portfolio List scroll animation
  FE-009 — Home Workflow / Portfolio scroll animation
  FE-010 — Services rendering adaptation and i18n hardening
  FE-011 — Offer detail modal and backend article handoff
  BE-HANDOFF-001 — Backend article/detail endpoint request
  FE-012 — Calculator/configurator MVP
  FE-013 — Quote quiz form upgrade
```

## Command policy

Allowed by default:

```bash
npm run test:run
```

Forbidden unless explicitly requested by the human operator:

```bash
npm run build
```

Production build is handled by CI/CD. Local build can pollute git status and is not required for these agent tasks.

## Repository boundary

These tasks are primarily for the frontend repository.

Backend needs must be expressed as handoff documents, not implemented from the frontend repo.

