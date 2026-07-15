# FE-17 — Next Roadmap Map

## Purpose

This file consolidates the next task layer after the frontend branch has already established:

```text
FE-000 — frontend agent rules cleanup
FE-001 — content data consumption audit
FE-002 — API/store adapter readiness
FE-003 — Compred.vue refactor preparation
FE-004/005/006 — prepared as first practical implementation stages
```

The current package plans the next set of feature and architecture tasks around:

```text
- dynamic Compred block rendering
- portfolio/home scroll animations
- services rendering adaptation
- offer detail modal
- backend article/detail handoff
- calculator/configurator MVP
- quiz-style commercial proposal request flow
```

## Key facts inherited from prior work

### API/data layer

Standard category endpoints use:

```text
response.data.data
```

Flat individual commercial proposal endpoint uses:

```text
response.data
```

The relevant flat endpoint is:

```text
GET /api/{locale}/blocks/categories/offers/{proposalKey}
```

Expected flat shape:

```json
{
  "category": {},
  "block": {},
  "items": []
}
```

### Legacy keys to preserve

```text
childs
child
acticle
section
items
hero
benefits
includes
reelsSystem
extras
important
```

Do not rename these without coordinated backend/frontend migration.

### Compred current / target direction

`src/views/Compred.vue` was identified as a hybrid route shell + orchestrator.

The target direction is:

```text
src/views/Compred.vue
  -> route shell only

src/components/blocks/compred/index.vue
  -> orchestration / API load / normalization / section passing

src/components/blocks/compred/presentation/*
  -> pure presentation components, left mostly untouched
```

### Animation system

Use the existing GSAP architecture:

```text
src/stores/animationStore.js
src/composables/useGsapOrchestrator.js
src/composables/useGsapGlobalSync.js
```

Principles:

```text
- no direct gsap.to/from in onMounted
- use gsap.context()
- use declarative animation config
- use ScrollTrigger through the orchestrator
- avoid coupling data loading and animation code
```

### Services rendering

Known service rendering targets:

```text
src/components/Group.vue
src/components/blocks/services/presentation/service.vue
src/components/blocks/services/presentation/group.vue
src/components/blocks/services/presentation/category.vue
src/components/blocks/services/presentation/subcategories.vue
```

Known issues:

```text
- service cards exist but are inactive/commented in Group.vue
- service.vue has hardcoded currency
- service.vue expects t(...) but may lack i18n helper import
- price/timeline must be defensive against non-array or missing values
- scope/locale should be respected
```

### Modal / popup

Existing historical modal approach used functional `DialogModal(Component, options)` and has limitations around dynamic header updates.

Preferred direction:

```text
- component-based modal / dialog shell
- accessible overlay
- responsive behavior
- open by clicking offer/package/item
- fetch or receive offer detail/article data
```

### Calculator / quote direction

Target business flow:

```text
Category
  -> offer/package
    -> option modification / cart
      -> quote request form / quiz
        -> generated individual commercial proposal request
```

MVP should be minimal and data-adapter based. Do not wait for a perfect backend schema.

