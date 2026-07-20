# TASK-FE-015 — Structured Acticle & Responsive CP Card Layout

## Status

Planned

## Priority

High — required for the Vạn Phúc individual commercial proposal.

## Group

Commercial proposal frontend / WS Design System refinement.

## Task type

```text
component refactor
presentation rendering
design-system layout correction
test coverage
```

## Goal

Upgrade the existing commercial proposal presentation layer so it can:

1. render both the existing quotation-style `acticle` content and a new structured
   personal-letter variant;
2. render five Benefits cards in one row on large screens;
3. render Includes through the same responsive card-grid policy and column wrapper
   pattern used by Benefits.

The change must remain generic and compatible with all existing `ind_offers`.

---

## Business context

Individual commercial proposals use the legacy property:

```text
acticle
```

The Vạn Phúc proposal contains a structured closing letter with semantic classes:

```html
<div class="cp-personal-letter">
  <p class="cp-personal-letter__eyebrow">...</p>
  <h3>...</h3>
  <p>...</p>

  <div class="cp-personal-letter__offer">
    <p>...</p>
  </div>
</div>
```

This is still a string delivered through the current `acticle` API field.

The existing component renders every `acticle` as a centered italic quotation.
That behavior must remain the fallback for legacy proposals, while structured
personal-letter markup receives a dedicated presentation.

A complete read-only reference payload is available at:

```text
.agents/references/van-phuc-motorbike-rental-A-CP-3.json
```

Do not edit that reference in this task.

---

## Current frontend boundary

Current data flow:

```text
ind_offers API
  -> blockStore.item.properties.acticle
    -> src/views/Compred.vue
      -> Acticle :data="properties.acticle"
        -> RichText v-html
```

Preserve this flow.

Presentation components must remain store-free and API-free.

---

## Scope

### Primary files

```text
src/components/blocks/compred/presentation/acticle.vue
src/components/blocks/compred/presentation/benefits.vue
src/components/blocks/compred/presentation/includes.vue
```

### Inspect-only unless a minimal compatibility edit is proven necessary

```text
src/views/Compred.vue
src/components/blocks/general/ui/RichText.vue
src/components/blocks/general/ui/card.vue
```

### Allowed new helper

Prefer extracting the card-count mapping from Benefits into a small reusable
presentation/layout helper, for example:

```text
src/components/blocks/general/ui/cardGridClasses.js
```

The exact filename may differ if the existing repository convention suggests a
better location.

The helper must remain pure and domain-agnostic.

### Allowed tests

```text
tests/**
```

Use existing test conventions and utilities.

---

## Part 1 — Structured `acticle` rendering

### 1.1 Preserve the public interface

The component must continue to accept:

```js
data: {
  type: String,
  required: true
}
```

Do not:

```text
- rename acticle to article
- add a new backend property
- change Compred API mapping
- pass the entire proposal object into Acticle
```

### 1.2 Support two visual modes

#### Legacy quotation mode

Default for ordinary content that does not contain the structured marker.

Preserve the current intent:

```text
- centered content
- quotation icon
- constrained width
- italic highlighted statement
- current mobile readability
```

Existing proposals must not visually regress.

#### Structured personal-letter mode

Activated by semantic content markup containing the class:

```text
cp-personal-letter
```

Detection must be content-based and generic.

Allowed example:

```js
const isStructuredLetter = computed(() =>
  /class=["'][^"']*cp-personal-letter(?:\s|["'])/.test(props.data)
)
```

The implementation may use another safe equivalent.

Forbidden:

```js
blockStore.item.key === 'van-phuc-motorbike-rental'
route.params.slug === 'van-phuc-motorbike-rental'
```

### 1.3 Structured mode behavior

When structured mode is active:

```text
- apply a modifier class such as `acticle--letter`
- remove or hide the decorative quotation icon
- use left-aligned readable content
- do not apply global italic styling to the entire letter
- allow a wider content region than the legacy 800px quote
- visually separate the letter from surrounding sections
- clearly highlight `.cp-personal-letter__offer`
- style `.cp-personal-letter__eyebrow` as a small semantic label
- preserve headings, paragraphs and strong text
- keep the layout responsive on mobile
```

Because the HTML is rendered through `v-html`, scoped component styles must use
Vue deep selectors where required:

```css
:deep(.cp-personal-letter) {}
:deep(.cp-personal-letter__eyebrow) {}
:deep(.cp-personal-letter__offer) {}
:deep(.cp-personal-letter h3) {}
:deep(.cp-personal-letter p) {}
```

Do not add inline styles to the JSON or parse business fields out of the HTML.

### 1.4 Security boundary

This task does not redesign the current `RichText` sanitization policy.

Do not:

```text
- replace RichText
- introduce a new HTML sanitizer dependency
- alter API data
```

Document the existing `v-html` trust boundary as preserved, not newly solved.

---

## Part 2 — Shared responsive card-grid policy

### 2.1 Extract the current Benefits mapping

`benefits.vue` currently owns count-to-class logic.

Extract or otherwise centralize this mapping so Benefits and Includes use the same
responsive policy.

The resolved output should be a class string suitable for:

```vue
<div class="row align-items-stretch" :class="colsClass">
```

### 2.2 Required class mapping

Preserve existing behavior except for five items.

Required mapping:

```text
0 or invalid:
  row-cols-1

1:
  row-cols-1 row-cols-lg-1

2:
  row-cols-1 row-cols-md-2 row-cols-lg-2

3:
  row-cols-1 row-cols-md-2 row-cols-lg-3

4:
  row-cols-1 row-cols-md-2 row-cols-lg-4

5:
  row-cols-1 row-cols-md-2 row-cols-lg-5 justify-content-center

6:
  row-cols-1 row-cols-md-2 row-cols-lg-3

more than 6:
  row-cols-1 row-cols-md-2 row-cols-lg-4
```

The five-item Benefits row must therefore resolve to:

```text
row align-items-stretch row-cols-1 row-cols-md-2 row-cols-lg-5 justify-content-center
```

Do not reinterpret this requirement as three columns plus wrapping.

---

## Part 3 — Benefits

Target:

```text
src/components/blocks/compred/presentation/benefits.vue
```

Requirements:

```text
- use the shared resolver
- keep `row align-items-stretch`
- keep each item wrapper as `d-flex col`
- five items must use `row-cols-lg-5`
- preserve SectionHeader, Card and IconOffer usage
- preserve current prop contract
- preserve empty-section behavior
```

Do not redesign card content in this task.

---

## Part 4 — Includes

Target:

```text
src/components/blocks/compred/presentation/includes.vue
```

Current fixed wrapper:

```html
<div class="col-lg-3 col-md-6 d-flex">
```

must be removed.

Required structure:

```vue
<div class="row align-items-stretch" :class="colsClass">
  <div class="d-flex col" v-for="item in props.items">
    ...
  </div>
</div>
```

Requirements:

```text
- use the same shared count resolver as Benefits
- preserve the existing `items` Array prop
- preserve SectionHeader, Card, IconOffer and i18n usage
- preserve `v-if` behavior
- five Includes items must render as five columns on large screens
```

Do not hardcode a four-column Includes layout.

---

## Part 5 — `Compred.vue` boundary

Inspect:

```text
src/views/Compred.vue
```

Expected result:

```text
no source change required
```

The existing bindings should remain:

```vue
<Benefits v-if="properties.benefits" :data="properties.benefits" />
<Includes v-if="properties.includes" :items="properties.includes" />
<Acticle v-if="properties.acticle" :data="properties.acticle" />
```

Only modify `Compred.vue` if a minimal compatibility change is demonstrably required.
Explain that necessity in the report.

Do not move business-specific layout conditions into the View.

---

## Part 6 — Tests

Add focused tests using existing Vitest conventions.

Minimum coverage:

### Acticle

```text
- legacy HTML renders in quotation mode
- legacy mode keeps the quotation icon
- structured marker activates letter modifier
- structured mode does not render/show the quotation icon
- structured HTML remains present through RichText
- no route/store dependency is required
```

### Card grid

```text
- resolver returns row-cols-lg-5 for count=5
- Benefits with five items receives row-cols-lg-5
- Includes with five items receives row-cols-lg-5
- Includes children use `d-flex col`
- Includes no longer uses `col-lg-3` or `col-md-6`
```

Do not rely only on unrelated smoke tests.

---

## Forbidden changes

Do not modify:

```text
backend repository
content JSON
seeders
API routes or response shapes
Pinia stores
API adapters
router
calculator/configurator
form subsystem
autonomous B-WP prototype
```

Do not:

```text
- rename `acticle`
- create a van-phuc-only component branch
- add dependencies
- migrate the whole Compred UI to Tailwind
- rewrite Card or RichText without a proven requirement
- change package pricing/discount rendering
- perform unrelated cleanup
```

---

## Validation

Required:

```bash
npm run test:run
```

Inspect `package.json` before using any additional commands.

Do not run by default:

```bash
npm run build
```

The project frontend command policy requires explicit human authorization for build.

### Manual/browser verification

When local content/API is available, verify:

```text
1. Open an existing legacy commercial proposal with ordinary acticle content.
2. Confirm quotation appearance remains unchanged.
3. Open the Vạn Phúc proposal.
4. Confirm the personal letter uses the structured mode.
5. Confirm all three package sections still render.
6. Confirm five Benefits cards fit one row on lg screens.
7. Confirm five Includes cards fit one row on lg screens.
8. Confirm md screens use two columns.
9. Confirm mobile uses one column.
10. Confirm no horizontal overflow.
11. Confirm no console warnings/errors.
```

If the Vạn Phúc proposal is not seeded locally, mount the reference HTML in a focused
component test or temporary dev-only fixture. Do not commit a temporary route or mock page.

---

## Reporting

Create:

```text
.agents/reports/REPORT-FE-015-compred-structured-acticle-layout.md
```

Use:

```text
.agents/reports/templates/REPORT-FE-015-compred-structured-acticle-layout.template.md
```

The report must explicitly state:

```text
- whether Compred.vue changed
- how structured mode is detected
- how legacy mode was preserved
- where the shared grid resolver lives
- exact five-item class output
- files changed
- tests added
- commands run
- npm run build was intentionally not run
- manual checks performed or not performed
- remaining risks
```

---

## Definition of Done

```text
[ ] Existing quotation-style acticle remains compatible
[ ] Structured `.cp-personal-letter` renders as a personal letter
[ ] No proposal-key or route-specific condition exists
[ ] Legacy key `acticle` is preserved
[ ] Benefits count=5 resolves to row-cols-lg-5
[ ] Includes uses the shared resolver
[ ] Includes item wrapper is `d-flex col`
[ ] Includes no longer contains col-lg-3 or col-md-6
[ ] Focused tests cover both acticle modes and five-column layouts
[ ] npm run test:run passes
[ ] No backend/content/API changes were made
[ ] Agent report was created
```
