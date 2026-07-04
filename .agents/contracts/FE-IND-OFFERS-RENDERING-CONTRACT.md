# FE Contract — ind_offers Rendering

## Scope

This contract governs frontend rendering of individual commercial proposals.

## Backend source

The flat endpoint is represented in frontend by:

```text
blockStore.fetchFlatOffers(slug)
```

It unwraps a flat response:

```text
response.data
```

not:

```text
response.data.data
```

## Expected flat payload family

The frontend should expect a payload family shaped around:

```text
category
block
items
```

The exact nested proposal content may be inside:

```text
block.properties
items[]
items[].properties
```

The task must inspect the actual current payload before binding UI.

## Rendering rule

Do not pass the raw flat endpoint directly into presentation components unless the shape already matches their props.

Preferred flow:

```text
fetchFlatOffers(slug)
  -> flat payload
    -> local normalizer
      -> proposal view model
        -> presentation props
```

## Protected legacy keys

```text
acticle
items
hero
benefits
includes
reelsSystem
extras
important
```

## Explicit non-goals

```text
- Do not redesign all commercial proposal components.
- Do not migrate route names unless explicitly required.
- Do not rename backend keys.
- Do not implement service offer cards here.
- Do not build a calculator here.
```

