# CONTRACT — FE Calculator / Quote MVP Contract

## Purpose

Define the minimal viable flow for turning service offers into a configurable commercial proposal request.

## Product flow

```text
Category
  -> offer/package
    -> select package
      -> add to cart
        -> modify selected options
          -> quote quiz form
            -> submit request
```

## MVP constraints

The MVP must work with current data even if the backend schema is not perfect.

Current offers may expose:

```text
title/name
price
timeline
features
featured
icon
url
descr/content
```

The frontend should introduce an adapter to normalize these into calculator-ready structures.

## Suggested frontend model

```js
calculatorPackage = {
  key,
  title,
  description,
  basePrice,
  currency,
  timeline,
  features,
  options: []
}

cartItem = {
  packageKey,
  title,
  quantity,
  selectedOptions,
  computedPrice,
  notes
}

quoteRequest = {
  locale,
  sourceCategoryKey,
  sourceOfferKey,
  cartItems,
  answers,
  contact,
  comment
}
```

## Minimal option logic

If backend lacks option metadata, create safe inferred options from features:

```text
- included feature -> read-only included option
- optional modifier -> only if explicitly configured locally
```

Do not invent real prices beyond clearly marked local demo/default values.

## Form/quiz progression

MVP quiz should collect:

```text
- business type
- project goal
- deadline sensitivity
- budget range
- preferred contact method
- contact data
- comment
```

## Output

The MVP should produce a structured request payload and pass it to existing form submission if possible. If backend needs a new endpoint/schema, create a backend handoff.

