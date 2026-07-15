# CONTRACT — FE Dynamic Block Rendering Contract

## Purpose

Define a local, isolated dynamic section rendering mechanism for `compred`, with a future path toward broader server/content-driven UI.

## Core idea

Do not render commercial proposal sections using repeated template `v-if` blocks.

Instead use a section registry:

```text
payload properties
  -> section availability detection
    -> section registry
      -> ordered render model
        -> SectionRenderer
          -> presentation component
```

## Data-driven rule

```text
If payload contains a supported section and it has renderable data, render it.
If payload does not contain the section or data is empty, skip it.
```

The decision must be based on a reusable function, not scattered `v-if` checks.

## Local first, reusable later

Initial location can be local to compred:

```text
src/components/blocks/compred/sectionRegistry.js
src/components/blocks/compred/SectionRenderer.vue
```

Future reusable location may be:

```text
src/components/blocks/renderer/SectionRenderer.vue
src/utils/blockSectionRegistry.js
```

Do not move global too early.

## Protected legacy keys

```text
acticle
hero
benefits
includes
reelsSystem
extras
important
items
```

## Possible normalized section model

```js
{
  key: 'hero',
  component: Hero,
  props: { data: properties.hero },
  order: 10,
  isRenderable: (properties) => Boolean(properties.hero?.title)
}
```

## Do not

```text
- rename legacy keys
- introduce backend schema changes
- turn this into a full SDUI engine in the first pass
- make presentation components import stores
- hide errors silently if a supported section exists but its shape is invalid
```
