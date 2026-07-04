# TASK-FE-009 — Home Workflow / Portfolio Scroll Animations

## Status

Backlog / independent animation task.

## Group

Group B — Scroll animations.

## Goal

Add scroll-triggered animations to selected home page blocks using the existing animation system.

Target blocks:

```text
src/components/blocks/general/section/workflow.vue
src/components/blocks/portfolio/index.vue or home portfolio section if reused on home
src/views/Home.vue
```

## Desired behavior

### Workflow

```text
Workflow blocks fly/slide in on scroll.
Motion should feel controlled and professional.
```

Possible pattern:

```text
item opacity 0 -> 1
translateY or translateX small distance -> 0
stagger 0.08–0.15
ScrollTrigger start: top 75–85%
```

### Portfolio section on home

```text
Portfolio preview items appear on scroll.
Do not duplicate the exact animation implementation if FE-008 already created reusable config.
```

## Architecture rule

Use:

```text
useGsapOrchestrator(targetRef, animationsConfig)
```

and existing animation store phases where appropriate.

Avoid raw direct GSAP calls in lifecycle hooks.

## Allowed changes

```text
src/components/blocks/general/section/workflow.vue
src/components/blocks/portfolio/index.vue if home section uses it
small local animation config helpers if justified
.agents/reports/REPORT-FE-009-home-workflow-portfolio-scroll-animation.md
```

## Forbidden changes

Do not:

```text
- alter data payloads
- modify backend
- run npm run build
- add new animation library
- over-animate or create distracting motion
- change the content order or routing
```

## Validation

Run:

```bash
npm run test:run
```

Manual/dev validation:

```text
- home page loads normally
- Workflow section animates at scroll entry
- Portfolio preview animates at scroll entry
- animations do not replay excessively unless configured
- no layout jump
```

