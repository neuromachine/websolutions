# FE-00 — Two-Repository Operating Model

## Purpose

This document clarifies how WebSolutions should be discussed and operated in agent-coding workflows.

WebSolutions is not one physical repository.
It is a two-repository system.

---

## 1. Physical Repositories

```text
wsapi/
  Laravel backend repository

websolutions/
  Vue frontend repository
```

They work as one product but must be handled as two separate codebases.

---

## 2. Backend Repository Responsibility

The backend repository owns:

```text
Laravel API
EAV model
DB migrations
seeders
JSON content sources
Filament/admin behavior
Repository/Resource layer
API contracts
backend tests
backend reports
```

Backend `.agents` should explain how data is authored, stored, seeded, transformed, and exposed.

---

## 3. Frontend Repository Responsibility

The frontend repository owns:

```text
Vue routes
Pinia stores
API consumption wrappers
frontend adapters
components
presentation logic
forms UI
frontend tests
frontend reports
```

Frontend `.agents` should explain how API payloads are consumed, normalized, rendered, and tested.

---

## 4. Shared Contract Surface

The shared boundary is the API payload.

Important current contracts:

```text
standard Resource endpoints -> response.data.data
individual CP/offers endpoint -> response.data
legacy keys -> childs, child, acticle, section, items
```

---

## 5. Handoff Instead of Cross-Repo Editing

Agents must work in one repository at a time.

If a frontend task requires backend change:

```text
create .agents/reports/HANDOFF-BE-*.md
```

If a backend task requires frontend change:

```text
create .agents/reports/HANDOFF-FE-*.md
```

The human operator transfers handoff context between repositories.

---

## 6. Practical Rule

Do not say “the project file” without repository qualification.

Prefer:

```text
backend repo file: wsapi/app/...
frontend repo file: websolutions/src/...
```

This reduces ambiguity for code agents and human review.
