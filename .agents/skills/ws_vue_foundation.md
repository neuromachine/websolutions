# Skill — Vue Foundation Rules

## Component ownership

```text
View.vue
  layout shell only

index.vue
  orchestrator, store owner, fetch owner

presentation/*.vue
  props in, UI composition out

item.vue
  pure props component
```

## Router / scope

- `scope` is wider than locale.
- Do not manually prefix links with scope inside normal components.
- Use project link helpers/components when available.
- `router.beforeEach` must not run async API fetches.

## Store rules

- `uiStore` is global UI state.
- `navigationStore` is singleton navigation/structure.
- `blockStore(id)` is a factory store. Do not convert to singleton.
- Use ready flags before deep rendering.

## API payload

Use:

```js
const payload = response.data.data
```

for Laravel Resource endpoints.

## Practical compred pattern

```js
const properties = computed(() => blockStore.item?.properties ?? {})
```

Then pass exact section nodes:

```vue
<Benefits
  v-if="properties.benefits?.items?.length"
  :data="properties.benefits"
/>
```
