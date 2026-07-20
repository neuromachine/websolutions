# FE Contract — Structured Acticle & Responsive CP Card Layout

## Purpose

Protect compatibility while extending the current `ind_offers` presentation layer.

This contract governs:

```text
src/components/blocks/compred/presentation/acticle.vue
src/components/blocks/compred/presentation/benefits.vue
src/components/blocks/compred/presentation/includes.vue
```

---

## 1. Public content contract

The backend/content key remains:

```text
acticle
```

Do not rename it to:

```text
article
personalLetter
closing
final
```

The frontend continues to receive a String and render it through `RichText`.

---

## 2. Rendering modes

### Legacy mode

Activated when no structured semantic marker exists.

Required intent:

```text
quotation icon
centered layout
italic highlighted statement
max-width close to the current implementation
```

### Structured personal-letter mode

Activated when rendered HTML contains:

```text
cp-personal-letter
```

Required semantic descendants supported by the component:

```text
cp-personal-letter__eyebrow
cp-personal-letter__offer
h3
p
strong
```

The marker is a presentation contract, not a business ID.

Forbidden activation sources:

```text
proposal key
route slug
store state
locale
```

---

## 3. Presentation boundary

`acticle.vue` may use:

```text
props
computed
RichText
scoped CSS
:deep selectors
```

It must not use:

```text
Pinia
Vue Router
API calls
proposal-specific imports
backend assumptions beyond the String content contract
```

---

## 4. Responsive grid contract

Benefits and Includes share one count-to-class policy.

For five items, the class output must contain:

```text
row-cols-1 row-cols-md-2 row-cols-lg-5 justify-content-center
```

The outer row keeps:

```text
row align-items-stretch
```

Each direct card column uses:

```text
d-flex col
```

Fixed item classes are forbidden in Includes:

```text
col-lg-3
col-md-6
```

---

## 5. Compatibility

Preserve:

```text
Benefits data Object prop
Includes items Array prop
Acticle data String prop
SectionHeader usage
Card usage
IconOffer usage
existing v-if guards
```

Do not change API envelopes, `Compred.vue` data ownership, or dynamic section keys.

---

## 6. CSS rule for injected HTML

Because content is rendered with `v-html`, structured child selectors inside scoped
styles must use `:deep(...)`.

Do not move presentation CSS into the content JSON.

---

## 7. Non-goals

```text
HTML sanitization redesign
full Tailwind migration
Card primitive redesign
pricing UI changes
backend/content schema changes
standalone website prototype
```
