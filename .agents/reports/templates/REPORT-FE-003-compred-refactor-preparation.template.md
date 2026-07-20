# REPORT-FE-003 — Compred.vue Refactor Preparation

## 1. Summary

Short summary of the current Compred state and whether FE-004 is safe to prepare.

## 2. Files Inspected

```text
- ...
```

## 3. Current Compred.vue Responsibility Map

Describe what `src/views/Compred.vue` currently owns:

```text
- route awareness
- data fetch
- store usage
- section composition
- presentation markup
- form usage
- animation or UI behavior
```

## 4. Current Data Flow

Document current flow:

```text
route -> store/action -> response shape -> local state/computed -> components
```

## 5. Component Dependency Map

```text
Compred.vue
  -> ...
```

## 6. Existing Presentation Components

List existing compred-specific presentation components and their props/usage.

## 7. Backend/API Contract Touchpoints

Document:

```text
- current endpoint usage
- future flat endpoint usage
- use of fetchFlatOffers(slug)
- fields expected: acticle, hero, benefits, includes, reelsSystem, extras, important, items
```

## 8. Risks

```text
- ...
```

## 9. Recommended FE-004 Scope

Files safe to modify in the next task:

```text
- ...
```

Planned goal:

```text
- ...
```

## 10. Deferred FE-005 Scope

What must wait until ind_offers rendering task:

```text
- ...
```

## 11. Validation Checklist for FE-004

```text
- npm run test:run
- no npm run build
- route still renders
- no backend changes
- no service offers changes
- no global legacy key normalization
```

## 12. Final Recommendation

```text
Safe to proceed to FE-004: yes/no
Reason:
```

