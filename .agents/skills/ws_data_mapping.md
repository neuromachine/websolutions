# Skill — Data Mapping Rules

## Contract

Frontend consumes normalized Laravel Resource payloads:

```js
const payload = response.data.data
```

For item pages:

```text
blockStore.item = payload
blockStore.item.properties = content root
```

## EAV boundary

Do not expose backend EAV internals to Vue UI:

```text
property_id
value_type
locale
BlockItemPropertyValue
```

Vue components receive denormalized logical data.

## compred current sections

```text
properties.hero
properties.benefits
properties.extras
properties.important
properties.items      // pricing/packages; use local alias
properties.includes
```

## Known naming debt

- `acticle` should be treated as legacy/typo for `article`.
- `properties.items.items` means pricing packages; use a local alias like `packages`.
- Some `text` fields are plain text; `important.items[].text` may contain trusted HTML.

## HTML rule

Use `v-html` only through a dedicated `RichText`-style component or a clearly isolated trusted-content section. Never use it for user input.
