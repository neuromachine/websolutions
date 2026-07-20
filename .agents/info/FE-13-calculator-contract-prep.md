# FE-13 — Future Calculator Contract Preparation

## Status

Draft / preparation document.

The calculator is not yet a final backend or frontend contract. This file prevents premature coupling while giving the frontend branch a direction.

## Product direction

```text
service offers / packages
  -> calculator-selectable package data
    -> selected options
      -> quote request / lead form
        -> dynamic commercial proposal preview
```

## Current limitation

Current service offer and CP data are presentation-first.

They may contain:

```text
price
features
timeline
items
includes
```

But they do not yet guarantee machine-calculable fields such as:

```text
base_price
currency
option_key
option_price
is_required
quantity
```

## Draft frontend adapter shape

Frontend may prepare internal view models, but must mark them as derived/draft:

```yaml
CalculatorPackageDraft:
  key: string
  title: string
  display_price: string
  parsed_base_price: number|null
  currency: string|null
  features: array
  source_family: service_offer|ind_offer
  source_key: string
```

```yaml
CalculatorOptionDraft:
  key: string
  title: string
  display_price: string|null
  parsed_price: number|null
  is_default: boolean
  is_required: boolean
  source_path: string
```

## Rules

```text
- Do not treat display price strings as reliable numbers without explicit parser/reporting.
- Do not silently convert currencies.
- Do not mutate backend payload for calculator needs.
- Create a frontend adapter first, then propose backend schema additions.
- Keep calculator data contract separate from presentational CP sections.
```

## Future backend handoff questions

```text
1. Should calculator data be added to service offer JSON or separate calculator JSON?
2. Should prices become structured objects?
3. Should currency be per package, per locale, or global?
4. Should CP generation consume selected calculator options?
5. Should quote requests be sent through the existing forms subsystem or a new endpoint?
```
