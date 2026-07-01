# AGENTS.md — WebSolutions Coding Agent Entry

## Purpose

This repository uses a compact, layered context package for AI coding agents working on the WebSolutions Vue + Laravel system.

Primary current focus: frontend refactoring around:

```text
src/components/blocks/compred/presentation/benefits.vue
```

Do not start implementation from this file alone. First inspect the actual source files.

## Required context loading

Use `/info` as the long-form documentation layer.

Read only the files needed for the current task:

```text
/info/SYSTEM.md  — global architecture context
/info/CA.md      — Vue Foundation / Component Architecture
/info/DM.md      — API Contract / Data Mapping
/info/DS.md      — WS Design System
/info/TL.md      — Tailwind Theme Layer
/info/AL.md      — Animation Layer
```

For `compred/presentation/benefits.vue`, default context set:

```text
/info/SYSTEM.md
/info/CA.md
/info/DM.md
/info/DS.md
/info/TL.md
```

Read `/info/AL.md` only when animation code is touched.

## Repository rules

- Frontend: Vue 3, Composition API, Vue Router, Pinia, Axios, Vite.
- Backend: Laravel API exists as data source; do not edit backend unless explicitly requested.
- Laravel Resource payloads are consumed as `response.data.data`.
- Scope-aware routing is project-critical. Do not hardcode scoped links manually.
- Use existing project aliases/import style.

## Component boundaries

- `View.vue`: layout shell only. No store, no fetch.
- `index.vue`: data owner and orchestrator. May use stores/composables.
- `presentation/*.vue`: props in, UI composition out. No direct store/fetch/route.
- `item.vue`: pure props component.
- UI primitives: no backend item knowledge, no feature-specific imports.

## Design-system rules

- Prefer composition over configuration.
- `Card` should expose slots/zones; it must not import `IconOffer`.
- `SectionHeader`, `Card`, future `CardsGrid`, `Button`, `RichText` belong to the UI layer.
- Bootstrap is transitional layout compatibility, not the design-system core.
- Tailwind tokens/semantic utilities should replace repeated raw CSS over time.
- Do not introduce raw hex or new global CSS unless clearly justified.

## Data rules for compred

Expected current API shape:

```text
blockStore.item.properties.hero
blockStore.item.properties.benefits
blockStore.item.properties.extras
blockStore.item.properties.important
blockStore.item.properties.items      // pricing/packages; bad name, use local alias
blockStore.item.properties.includes
```

For `benefits`:

```ts
type BenefitsSection = {
  pretitle?: string
  title: string
  items: Array<{
    index?: number
    icon?: string
    title: string
    text: string
  }>
}
```

Pass only the section node:

```vue
<Benefits :data="properties.benefits" />
```

Do not pass the whole `properties` object.

## Code-change protocol

- Before editing, inspect the target file and direct dependencies.
- Make minimal changes.
- For changes over ~100 lines, work as small diffs by section.
- Do not rewrite unrelated components.
- Do not add new dependencies without explicit approval.
- Preserve working behavior unless the task explicitly says to change it.
- If a convention conflicts with existing code, prefer the documented architecture and note the legacy exception.

## Validation

Before finishing, run the relevant existing project checks if available:

```bash
npm run build
npm run test
npm run lint
```

If a script does not exist, report that fact instead of inventing commands.
