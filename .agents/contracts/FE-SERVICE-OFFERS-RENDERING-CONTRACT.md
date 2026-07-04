# CONTRACT — Frontend Service Offers Rendering

## Purpose

Define frontend display expectations for service offer packages.

## Data family

```yaml
family: service_offers
backend_source: storage/app/blocks/items/{categoryKey}.json
seeder: ServicesBlockSeeder
frontend_location: service category pages
```

## Expected package fields

```text
key
name/title
descr/desc
content
price
timeline/term
features
featured
icon
url
```

## Rendering rules

```text
- Render package lists defensively.
- Treat `featured` as recommendation marker, not as a guarantee that data is valid.
- If multiple packages have featured=true, render safely and report data quality issue.
- If no package has featured=true, render normally without badge.
- Do not convert currencies.
- Do not parse prices for calculator unless using a dedicated adapter.
- Do not assume all locales have the same package completeness.
```

## Adapter recommendation

Frontend may create a view-model mapper:

```text
mapServiceOfferPackage(raw) -> ServiceOfferCardVM
```

But this mapper must preserve access to the original raw object for debugging and future contract checks.
