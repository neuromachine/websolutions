# FE-12 — Individual Commercial Proposals / `ind_offers` Rendering Map

## Purpose

Map the standalone individual commercial proposal payload to frontend sections.

These are not the same thing as regular service offer packages.

## Data source

Endpoint:

```text
GET /api/{locale}/blocks/categories/offers/{proposalKey}
```

Shape:

```json
{
  "category": {},
  "block": {},
  "items": []
}
```

This endpoint is flat and should not be unwrapped through `response.data.data`.

## Difference: service offers vs ind_offers

| Type | Purpose | Shape | UI |
|---|---|---|---|
| Service offers | Package cards on service category pages | package-like items attached to service category | pricing cards / offer list |
| `ind_offers` | Full standalone commercial proposal | flat endpoint with category/block/items | proposal landing page / CP document |

## Canonical CP properties

Current schema supports:

```text
title
content
acticle
hero
benefits
includes
items
reelsSystem
extras
important
```

Do not use `final` as canonical until backend schema explicitly adds it.

## UI section mapping

```text
hero        -> first screen / proposal identity
benefits    -> value cards / client outcomes
extras      -> additional business outcomes / advantages
important   -> important implementation/functionality groups
items       -> packages / price options / deliverable groups
includes    -> common inclusions across packages
reelsSystem -> optional content-specific section
acticle     -> final persuasive text / closing article
content     -> optional introductory content
```

## Frontend rendering rules

```text
- Treat missing sections as optional, not fatal.
- Preserve `acticle` typo as backend contract.
- Do not merge CP sections with service offer package rendering until an adapter explicitly defines shared fields.
- Keep proposal key as business identity.
- Do not invent prices/calculator options from text content.
```

## Audit questions for frontend agent

```text
1. Is there already a route/page for `/offers/:slug` or similar?
2. Does frontend currently call `/blocks/categories/offers/{slug}`?
3. Does the API client support both envelope and flat responses?
4. Are CP sections already represented as Vue components?
5. Which sections need primitive components first: hero, package cards, benefits, includes, article?
6. What data should become calculator input later, and what is only presentation copy?
```
