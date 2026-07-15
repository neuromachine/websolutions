# CONTRACT — Frontend Content Data Consumption

## Purpose

Define current frontend rules for consuming backend content payloads.

## Contract 1 — Standard Laravel Resource endpoints

For standard backend Resource responses:

```text
payload = response.data.data
```

Used for:

```text
GET /api/{locale}/blocks/categories/{slug}
```

The frontend must not consume `response.data` directly for these endpoints unless the API adapter names it explicitly.

## Contract 2 — Flat offers endpoint

For individual commercial proposal endpoint:

```text
payload = response.data
```

Used for:

```text
GET /api/{locale}/blocks/categories/offers/{proposalKey}
```

This endpoint is not currently wrapped in `data`.

## Contract 3 — Legacy keys

Must be preserved in frontend consumption:

```text
childs
acticle
section
items
```

Allowed frontend adapter aliases may be added later, but must not erase original keys.

## Contract 4 — EAV invisibility

Frontend must not depend on:

```text
property_id
item_id
value_id
value_type
block_id
category_id
```

Frontend consumes already flattened logical fields.

## Contract 5 — Empty/missing locale data

Frontend must tolerate:

```text
empty arrays
missing optional sections
empty vi payloads
missing metadata
price values as strings
priority as string or number
```

Missing optional content should not crash rendering.
