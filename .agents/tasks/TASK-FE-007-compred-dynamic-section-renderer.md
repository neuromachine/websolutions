# TASK-FE-007 — Compred Dynamic Section Renderer Architecture

## Status

Backlog / recommended after FE-004 and FE-005 are reviewed.

## Group

Group A — Compred dynamic block rendering architecture.

## Goal

Replace scattered section-level conditional rendering in `compred` with a local dynamic section rendering architecture.

The target behavior:

```text
If the received commercial proposal payload contains a supported section -> render the section.
If the payload does not contain that section -> skip it.
```

This should not be implemented as many unrelated template `v-if` checks. It should be implemented through a small isolated mechanism that can later evolve into a generic content/block renderer.

## Context

Prior FE-003 found that `Compred.vue` depended on `blockStore.item.properties`, while future `ind_offers` uses a flat endpoint returning `{ category, block, items }`. The recommended boundary was to move orchestration into `src/components/blocks/compred/index.vue` and keep presentation components pure.

Existing Compred presentation components:

```text
src/components/blocks/compred/presentation/hero.vue
src/components/blocks/compred/presentation/about.vue
src/components/blocks/compred/presentation/packages.vue
src/components/blocks/compred/presentation/includes.vue
src/components/blocks/compred/presentation/important.vue
src/components/blocks/compred/presentation/reels_system.vue
src/components/blocks/compred/presentation/extras.vue
src/components/blocks/compred/presentation/benefits.vue
```

Legacy/current payload keys:

```text
hero
benefits
extras
important
items
includes
acticle
reelsSystem
content
title
```

## Main design

Create a local section rendering subsystem inside the compred block:

```text
src/components/blocks/compred/sectionRegistry.js
src/components/blocks/compred/SectionRenderer.vue
```

Possible shape:

```js
export const compredSections = [
  {
    key: 'hero',
    order: 10,
    component: Hero,
    getProps: (properties, context) => ({ data: properties.hero, context }),
    isRenderable: (properties) => Boolean(properties.hero)
  }
]
```

`index.vue` should compute a render model:

```text
properties + context
  -> compredSections
    -> filter by isRenderable
      -> sort by order
        -> render through SectionRenderer
```

## Allowed changes

```text
src/components/blocks/compred/index.vue
src/components/blocks/compred/sectionRegistry.js
src/components/blocks/compred/SectionRenderer.vue
src/components/blocks/compred/presentation/content.vue if needed for acticle extraction
src/components/blocks/general/ui/RichText.vue if already exists and only needs safe reuse
focused tests if available
.agents/reports/REPORT-FE-007-compred-dynamic-section-renderer.md
```

## Forbidden changes

Do not:

```text
- edit backend repo
- run npm run build
- rename acticle to article
- rename items/childs/section
- rewrite all presentation components
- create a global SDUI framework in this task
- alter service offers rendering
- alter calculator/quiz behavior
```

## Implementation notes

Prefer explicit mapping over magic auto-import.

Good:

```text
known key -> known component -> known props
```

Avoid:

```text
payload key -> dynamic import by string with no contract
```

The mechanism must be local to Compred first, but names and boundaries should make future extraction possible.

## Validation

Run:

```bash
npm run test:run
```

Do not run:

```bash
npm run build
```

## Expected report

Create:

```text
.agents/reports/REPORT-FE-007-compred-dynamic-section-renderer.md
```

Include:

```text
- files changed
- section registry design
- list of supported keys
- how missing sections are skipped
- how acticle is handled
- whether presentation components were touched
- commands run
- remaining limitations
```

