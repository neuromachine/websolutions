# FE-10 — Content Data Consumption Map

## Status

Frontend branch starting document.

This document maps backend content families to frontend consumption responsibilities.

## Backend source of truth

The backend branch has stabilized this high-level flow:

```text
JSON source
  -> Seeder
    -> EAV DB tables
      -> Repository / Model loading
        -> EavContentResolver / Resource
          -> API payload
            -> Frontend rendering contract
```

The frontend should treat the API payload as a contract boundary, not as an accidental dump of backend implementation details.

## Content families relevant to frontend

| Family | Backend source | Endpoint shape | Frontend responsibility |
|---|---|---|---|
| Service category | category endpoint | `response.data.data` | render category page content, title/descr/content, subcategory cards, sections/blocks |
| Service offers | seeded from `storage/app/blocks/items/{categoryKey}.json` | normally inside category endpoint blocks/offer-related data | render service package cards, pricing, features, timelines, featured package |
| Category descriptions | `descr_data` / category JSON | `data.content` and subcategory fields | render SEO/content intro and category card descriptions |
| Individual CP / `ind_offers` | `storage/app/blocks/blocks/items/ind_offers/{proposalKey}.json` | flat offers endpoint | render full proposal page/sections |
| Future calculator | not final yet | draft contract only | prepare adapter shape and selected package/option model |

## Standard category endpoint

```text
GET /api/{locale}/blocks/categories/{slug}
```

Frontend consumption:

```text
response.data.data
```

Expected top-level zones:

```text
id
key
name
description
content
parent_id
created_at
updated_at
section
sections
subcategories
blocks
children
```

## Offers / CP endpoint

```text
GET /api/{locale}/blocks/categories/offers/{proposalKey}
```

Frontend consumption:

```text
response.data
```

This endpoint is intentionally flat and not wrapped in `data`.

Expected zones:

```text
category
block
items
```

## Legacy compatibility keys

The frontend must not rename or drop these during the first pass:

```text
childs
acticle
section
items
```

A later migration may add aliases, but the first frontend pass must preserve compatibility.

## Practical direction

The first frontend task should discover where the current Vue code consumes:

```text
services category payload
subcategories
blocks/sections
service package data
ind_offers payload
response.data.data unwrap logic
flat offers response logic
```

Then it should produce an audit report and a follow-up task list.
