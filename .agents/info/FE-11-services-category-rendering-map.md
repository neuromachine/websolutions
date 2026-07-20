# FE-11 — Services Category Rendering Map

## Purpose

Define how the frontend should understand service category pages and their related offer/package data.

## Data source

Primary endpoint:

```text
GET /api/{locale}/blocks/categories/{slug}
```

For the services root page:

```text
GET /api/{locale}/blocks/categories/services
```

Frontend unwrap:

```text
const payload = response.data.data
```

## Page-level content

Use `payload.content` for page/category intro content.

Expected content fields may include:

```text
title
descr
content
metadata
priority
```

Rendering rules:

```text
- title/desr are presentation text;
- content may contain trusted HTML from backend content pipeline;
- metadata is SEO/supporting data and should not be assumed present;
- priority may be string or number and should not control visual rendering unless the component explicitly supports ordering.
```

## Subcategories

Use `payload.subcategories` for service category cards/tree.

Expected item fields:

```text
id
slug or key
title or name
descr
content
metadata
priority
childs
```

Rendering rules:

```text
- prefer `slug`/`key` for navigation;
- use `title || name` for display;
- use `descr` for card summary;
- preserve `childs` as current legacy nested list key;
- do not rewrite `childs` to `children` unless adapter keeps backward compatibility.
```

## Blocks and sections

Use `payload.sections` and `payload.blocks` as block-driven zones.

Important:

```text
- `sections` and `blocks` are backend-assembled zones;
- frontend must not assume EAV table names;
- components should be resilient to empty arrays;
- unknown block types should fail softly or be reported.
```

## Service offers

Service offers are package-like data connected to service categories.

Likely fields:

```text
name/title
price
timeline/term
features
featured
icon
url
descr/desc
content
```

Rendering rules:

```text
- exactly one featured package is preferred, but frontend must tolerate zero/multiple and report data quality issues;
- prices are business data and must not be converted or recalculated unless the calculator contract says so;
- features should be rendered as arrays when available;
- empty locale payloads should not create visual garbage.
```

## Audit questions for frontend agent

```text
1. Which component renders `/services`?
2. Which component renders service category pages?
3. Where is `response.data.data` unwrapped?
4. Where is `subcategories` consumed?
5. Where is `childs` consumed?
6. Where are `blocks` and `sections` consumed?
7. Is service offer rendering currently implemented, partial, or missing?
8. Does any component assume RU-only content?
```
