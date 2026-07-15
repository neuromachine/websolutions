# TASK-FE-008 — Portfolio List Scroll Animation

## Status

Backlog / independent animation task.

## Group

Group B — Scroll animations.

## Goal

Animate portfolio list items so they appear progressively on scroll.

Target area:

```text
src/components/blocks/portfolio/presentation/list.vue
src/components/blocks/portfolio/presentation/work.vue
src/components/blocks/portfolio/index.vue
src/views/Portfolio.vue
```

## Architecture rule

Use the existing animation subsystem:

```text
src/stores/animationStore.js
src/composables/useGsapOrchestrator.js
src/composables/useGsapGlobalSync.js
```

Do not call `gsap.to/from` directly inside `onMounted`.

Use declarative config and ScrollTrigger through the orchestrator.

## Desired behavior

```text
- portfolio cards/items appear when entering viewport
- animation is subtle, WS-style, engineering-clean
- no random flashy motion
- each item can fade/translate slightly upward or from side
- use stagger if list structure allows it
- animation refreshes correctly after dynamic content load
```

## Allowed changes

```text
src/components/blocks/portfolio/presentation/list.vue
src/components/blocks/portfolio/presentation/work.vue only if necessary
src/composables/useGsapOrchestrator.js only if a tiny generic gap is found and justified
src/stores/animationStore.js only if necessary and low risk
.agents/reports/REPORT-FE-008-portfolio-list-scroll-animation.md
```

## Forbidden changes

Do not:

```text
- rewrite portfolio data fetching
- change portfolio API payload contract
- change backend repo
- run npm run build
- add a new animation library
- add broad global CSS resets
- make animation block content rendering
```

## Validation

Run:

```bash
npm run test:run
```

Manual/dev validation recommended:

```text
- open portfolio page in dev mode
- scroll list into viewport
- ensure animation runs once or predictably according to config
- ensure no layout jump
```

## Expected report

```text
.agents/reports/REPORT-FE-008-portfolio-list-scroll-animation.md
```

Include files changed, animation config used, ScrollTrigger behavior, and whether global animation system was touched.

