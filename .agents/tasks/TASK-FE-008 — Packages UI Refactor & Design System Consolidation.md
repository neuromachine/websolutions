# TASK-FE-008 — Packages UI Refactor & Design System Consolidation

## Status

Planned

Priority: High

Depends on:

```text
FE-007
FE-007-R1 (must be completed first)
```

---

# Context

The Compred page has already undergone architectural refactoring.

Current structure:

```text
src/views/Compred.vue

↓

src/components/blocks/compred/presentation/

    hero.vue
    about.vue
    benefits.vue
    packages.vue
    includes.vue
    important.vue
    reels_system.vue
    extras.vue
```

The architectural extraction is considered correct.

The next stage is **visual and Design System consolidation**.

The goal is **NOT** to redesign the page.

The goal is to migrate remaining legacy markup and styling toward the WebSolutions Design System while preserving all current functionality.

---

# Context Sources

Use

```text
AGENTS.md

.agents/

info/

    SYSTEM.md
    DS.md
    TL.md
    AL.md
    CA.md
```

Treat

```text
.gemini/
```

as secondary legacy context.

---

# Scope

Frontend only.

Target area:

```text
src/views/Compred.vue

src/components/blocks/compred/presentation/packages.vue

src/components/blocks/general/ui/

```

Secondary files may be modified only when clearly justified.

---

# Primary Goal

Continue migration toward the Component Driven Design System.

The Packages section should become architecturally consistent with Benefits and other presentation blocks while preserving existing UI behavior.

---

# PART 1 — Packages Section

## 1.1 Section Header

Center section titles.

Legacy implementation relied on

```css
.text-center
```

This must NOT simply be copied.

Instead,

extend the existing Design System so that centered section headers become a reusable capability of `SectionHeader`.

Preferred direction:

```text
SectionHeader

↓

variant / alignment API

↓

Packages uses it
```

Avoid introducing one-off CSS inside packages.vue.

---

## 1.2 Pricing Row Refactor

Current pricing rows still follow legacy markup.

Refactor them using principles already established by the Design System.

The goal is NOT to replace their visual appearance.

The goal is to migrate them toward reusable UI composition.

Preferred direction:

```text
Packages

↓

PricingRow component
(or equivalent reusable primitive)

↓

existing functionality preserved
```

Reuse existing Design System concepts where appropriate:

```text
Card

Card zones

semantic wrappers

spacing system

typography

layout conventions
```

Do not duplicate Card implementation.

Do not force PricingRow to become Card if the semantics differ.

The implementation should reuse principles rather than copy markup.

---

## 1.3 Internal Row Layout

Current content layout should become consistent with ui-card.

Specifically:

Icon and title should occupy one visual row.

Equivalent to

```text
ui-card__icon

+

ui-card__title
```

Description, metadata and pricing information should follow below using semantic wrappers.

Avoid arbitrary Bootstrap nesting.

Favor semantic Design System class names.

---

## 1.4 CTA Animation

Inside PricingRow

current

```text
b_wrap
```

contains CTA button.

Introduce interaction using the existing Animation Layer.

Requirements:

Desktop

```text
hover

focus-visible

keyboard focus
```

↓

CTA smoothly appears.

Mobile

When viewport is below the mobile breakpoint,

CTA should already be visible.

Do NOT invent a new animation system.

Use the project's existing animation architecture.

Reference:

```text
AL.md
```

Animation must remain completely decoupled from business logic.

---

# PART 2 — Rich Content Styling

Target:

```text
ui-card__body
```

Currently rich content styling is incomplete.

Lists are not styled.

---

## 2.1 Lists

Introduce Design System support for

```html
<ul>
<ol>
<li>
```

Current visual reference:

legacy

```css
.service ul li
```

Do NOT copy legacy selectors.

Instead,

translate them into reusable Design System typography rules.

---

## 2.2 Scope

These rules should automatically improve rendering inside:

```text
Important

Benefits

Packages

future Card usage

future RichText usage
```

The styles should belong to the Design System,

not to individual feature components.

---

## 2.3 Rich Content Coverage

Review other common content patterns rendered inside

```text
ui-card__body
```

Support common semantic elements where appropriate.

Examples include:

```html
p

strong

em

ul

ol

li

a

blockquote

code

hr
```

Do not over-style.

The goal is a coherent Design System typography layer.

---

# Constraints

Do NOT

```text
rewrite backend

change API

modify payloads

introduce new dependencies

replace existing animation system

duplicate Card implementation

break current UI behaviour
```

---

# Deliverables

Provide

## 1

Description of Design System improvements.

---

## 2

Files modified.

---

## 3

Explanation of architectural decisions.

Specifically explain

why changes belong inside the Design System rather than feature components.

---

## 4

Manual regression checklist.

Verify

```text
Packages

Benefits

Important

RichText

Cards

mobile

desktop

keyboard navigation
```

---

# Validation

Run

```bash
npm run test:run
npm run build
```

If a command is unavailable,

report it instead of inventing commands.

---

# Success Criteria

Packages becomes architecturally aligned with the Design System.

Rich content receives reusable typography support.

Animation integrates into the existing Animation Layer.

No existing functionality is broken.

No feature-specific styling leaks into the Design System.

The implementation increases consistency rather than duplication.

