# HANDOFF-BE-002 — Calculator Data Contract Request

## Source

Frontend task:

```text
TASK-FE-012 — Calculator / Configurator MVP
```

## Reason

Frontend can create a minimal calculator from existing offer/package data, but a durable calculator needs structured backend fields.

## Requested future fields

```yaml
calculator_package:
  key: string
  title: string
  base_price: number|string
  currency: string
  timeline: string|number|array
  features: array
  options: array

calculator_option:
  key: string
  title: string
  description: string
  price: number|string
  unit: string
  is_default: boolean
  is_required: boolean
  group: string
```

## Compatibility

Do not break existing service offer fields:

```text
price
timeline
features
featured
icon
url
descr
content
```

New calculator fields may be optional and additive.

