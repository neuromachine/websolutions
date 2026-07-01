# Skill — WS Design System Rules

## Core principle

```text
Composition over configuration
```

Prefer slots and small UI primitives over large prop-heavy components.

## UI primitive rules

A UI primitive must not:

```text
- import feature-specific components
- know backend item structures
- fetch data
- use Pinia
- depend on route params
```

## Card rules

`Card` is a primitive.

Allowed responsibility:

```text
- container structure
- header/body/footer zones
- slot layout
- basic component behavior
```

Forbidden responsibility:

```text
- importing IconOffer
- reading item.icon or item.properties
- deciding business content
```

Preferred slots:

```text
icon
title
default/body
footer
```

`text` slot may exist temporarily, but default slot is preferred long-term.

## SectionHeader rules

`SectionHeader` standardizes section title/pretitle structure.

Do not reintroduce legacy global selectors like:

```css
.section-title h2 {}
```

## Naming

- Global reusable primitive: `ui-card`, `ui-button`, `ui-section`.
- Scoped component internals: `.header`, `.title`, `.body`, `.icon`.
- Avoid long BEM chains and parent cascades.
