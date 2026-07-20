# DRAFT CONTRACT — Frontend Calculator Data

## Status

Draft. Not final backend contract.

## Purpose

Prepare frontend thinking for future calculator/order/quote logic without forcing backend schema changes now.

## Source candidates

```text
service offer packages
ind_offers package sections
future dedicated calculator JSON
```

## Draft package view model

```yaml
key: string
title: string
description: string|null
display_price: string|null
parsed_price: number|null
currency: string|null
features: array
featured: boolean
source:
  family: service_offers|ind_offers
  key: string
  endpoint: string
```

## Draft quote request

```yaml
package_key: string
selected_options: array
contact:
  name: string|null
  email: string|null
  phone: string|null
  messenger: string|null
comment: string|null
locale: string
source_page: string
```

## Non-goals for first frontend pass

```text
- no automatic currency conversion;
- no backend schema migration;
- no order endpoint design;
- no final pricing algorithm;
- no mutation of service offer source data.
```
