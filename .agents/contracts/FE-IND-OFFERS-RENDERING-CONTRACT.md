# CONTRACT — Frontend Individual Commercial Proposals Rendering

## Purpose

Define frontend display expectations for `ind_offers` / individual commercial proposal pages.

## Endpoint

```text
GET /api/{locale}/blocks/categories/offers/{proposalKey}
```

## Response shape

```json
{
  "category": {},
  "block": {},
  "items": []
}
```

## Section contract

```text
hero        optional but preferred
benefits    optional
extras      optional
important   optional
items       preferred for packages/pricing
essentials/includes optional common package details
acticle     legacy final content key, preserve spelling
content     optional intro text
reelsSystem optional specialized content section
```

## Rendering rules

```text
- Render only sections that exist and contain usable data.
- Do not rename `acticle` in API-facing code.
- Keep section components independent so CP layouts can evolve.
- Do not mix CP `items` with service offer `items` without a dedicated adapter.
- Preserve flat response handling.
```

## Suggested component direction

```text
CpPage.vue
  CpHero.vue
  CpBenefits.vue
  CpPackages.vue
  CpIncludes.vue
  CpImportant.vue
  CpArticle.vue
```

This is a suggested direction, not an immediate implementation requirement.
