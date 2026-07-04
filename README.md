# Stage 16 — Frontend Compred / Offers Execution Package

This package contains three independent frontend execution tasks based on the completed FE-003 report.

## Included stages

```text
FE-004 — Compred.vue practical refactor
FE-005 — ind_offers rendering
FE-006 — service offers rendering
```

## Intended usage

These tasks may be executed independently, but the recommended order is:

```text
FE-004 -> FE-005 -> FE-006
```

Reason:

```text
FE-004 creates a cleaner Compred route/view/orchestrator boundary.
FE-005 can then connect ind_offers to that boundary.
FE-006 is a separate service category rendering track and does not depend on Compred directly.
```

## Hard boundaries

```text
- Frontend repo only.
- Do not edit backend files.
- Do not run npm run build.
- Preserve legacy keys: acticle, items, hero, benefits, includes, reelsSystem, extras, important, childs, section.
- Use npm run test:run for validation.
- If backend/API contract is unclear, write a handoff note instead of guessing.
```

