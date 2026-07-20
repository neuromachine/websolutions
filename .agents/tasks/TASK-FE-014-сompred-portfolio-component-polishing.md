# TASK-FE-014 — Compred & Portfolio Component Polishing

## Status

Planned

Priority: Medium

Depends on:

- FE-007
- FE-007-R1

---

# Goal

Continue incremental refinement of the Component Driven Design System without changing business logic or API contracts.

Frontend only.

---

# Part 1 — Hero

Target:

```text
src/components/blocks/compred/presentation/hero.vue
src/components/CPimg.vue
```

### 1.1 Default SVG component

Introduce a default `currentComponent` resolution for `CPimg`.

If no explicit component is resolved, automatically use:

```text
src/components/blocks/compred/micro/svg/main/default.vue
```

The fallback should be implemented inside `CPimg`, making all consumers resilient to missing mappings.

---

# Part 2 — Acticle Component

Target:

```text
src/views/Compred.vue
```

The block currently marked:

```html
<!-- acticle -->
```

must be extracted into a dedicated presentation component:

```text
src/components/blocks/compred/presentation/acticle.vue
```

Requirements:

- follow the existing Design System architecture;
- accept only the required data via props;
- preserve the existing backend field name `acticle`;
- center the content;
- style it as a quotation / highlighted statement;
- introduce decorative quotation marks using the existing icon system or reusable SVG assets (avoid inline graphics).

This component represents large multi-line direct speech.

---

# Part 3 — Portfolio Listing

Target:

```text
src/components/blocks/portfolio/index.vue
```

## 3.1 Portfolio Filters Component

Extract the filter navigation:

```text
id="portfolio-flters"
```

into a dedicated presentation component.

Requirements:

- preserve existing filtering behaviour;
- improve internal structure;
- align styling with the current Design System;
- avoid changing filtering logic.

---

## 3.2 Active State Fix

Investigate and fix the active filter indication.

Current regression:

- the first navigation item is always visually active (`.filter-active`);
- the active state does not correctly reflect the selected filter.

Determine the root cause and ensure the visual state follows the actual selected filter.

---

# Constraints

Do NOT:

- modify backend;
- modify API contracts;
- rename `acticle`;
- rewrite portfolio filtering logic;
- introduce new dependencies.

---

# Validation

Run:

```bash
npm run test:run
npm run build
```

Manually verify:

- Hero fallback SVG;
- Acticle rendering;
- Portfolio filter switching;
- Active filter indication;
- Portfolio filtering behaviour.

---

# Success Criteria

- `CPimg` gracefully falls back to the default SVG component.
- `acticle` becomes an independent presentation component following the Design System.
- Portfolio filters become a reusable presentation component.
- Active filter indication correctly reflects the selected filter.
- Existing functionality remains unchanged.

