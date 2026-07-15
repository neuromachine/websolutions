# Skill — Animation Layer Rules

Use only when animation-related files or behavior are touched.

## Core principle

```text
Decoupled Animation Logic
```

## Rules

- Do not call `gsap.to/from` directly in random `onMounted`.
- Use `useGsapOrchestrator(rootRef, animationsConfig)` when available.
- Use local refs, not global selectors.
- Separate:
  - `global` page lifecycle animations
  - `local` hover/click/focus animations
  - `scroll` ScrollTrigger animations
- Use `overwrite: "auto"` for local GSAP interactions.
- Do not put GSAP lifecycle inside UI primitives by default.

## Lifecycle

Data loading completion should lead to page-enter animation via the existing global sync pattern. Animation code must not fetch data.
