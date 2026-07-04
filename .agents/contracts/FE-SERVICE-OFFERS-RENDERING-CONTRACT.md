# FE Contract — Service Offers Rendering

## Scope

This contract applies to standard service/category pages, not individual commercial proposal pages.

Likely files to inspect:

```text
src/components/blocks/services/index.vue
src/components/blocks/services/list.vue
src/components/blocks/services/presentation/group.vue
src/components/blocks/services/presentation/service.vue
src/components/blocks/services/presentation/subcategories.vue
src/views/Services.vue
src/views/ServiceView.vue
src/views/Group.vue
```

## Data family

Standard service/category endpoints use Laravel Resource envelope:

```text
response.data.data
```

Payload areas to preserve:

```text
data.content
data.subcategories
data.blocks
data.sections
data.children
subcategories[].childs
```

## Rendering goal

Activate or repair rendering of service offer cards/packages without changing backend contract.

A service offer is not the same as an individual commercial proposal (`ind_offers`).

## Known formatting concerns

Inspect before implementation:

```text
featured
price
currency
timeline
features
empty states
localized labels
```

## Explicit non-goals

```text
- Do not refactor Compred.vue.
- Do not connect fetchFlatOffers.
- Do not implement ind_offers.
- Do not rename childs/child/section/items.
- Do not run npm run build.
```

