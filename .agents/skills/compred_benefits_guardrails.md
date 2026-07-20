# Skill — compred Benefits Guardrails

## Target file

```text
src/components/blocks/compred/presentation/benefits.vue
```

## Current data shape

```ts
type BenefitsSection = {
  pretitle?: string
  title: string
  items: Array<{
    index?: number
    icon?: string
    title: string
    text: string
  }>
}
```

## Expected usage

```vue
<Benefits
  v-if="properties.benefits?.items?.length"
  :data="properties.benefits"
/>
```

## Component responsibilities

`benefits.vue` may:

```text
- render SectionHeader
- map data.items
- compose Card slots
- pass IconOffer into the icon slot
```

`benefits.vue` must not:

```text
- import blockStore
- fetch API data
- read route params
- mutate global page vars
- pass whole properties root into Card
```

## Card composition

Preferred pattern:

```vue
<Card>
  <template #icon>
    <IconOffer :index="item.index" :properties="item" />
  </template>

  <template #title>
    {{ item.title }}
  </template>

  <template #default>
    {{ item.text }}
  </template>
</Card>
```

`IconOffer :properties="item"` is transitional. Do not refactor all usages unless the task explicitly asks.

## Grid behavior

If adjusting columns:

- do not hardcode special one-off behavior only for 5 items unless requested.
- prefer a small computed layout class or future `CardsGrid`.
- do not make `Card` responsible for collection layout.
