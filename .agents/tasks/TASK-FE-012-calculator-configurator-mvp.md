# TASK-FE-012 — Calculator / Configurator MVP

## Status

Backlog / creative feature task.

## Group

Group E — Configurator / calculator / dynamic CP.

## Goal

Create a minimal working service configurator/calculator based on available offer/package data.

The task should avoid perfect-schema blocking: use current offers data through a frontend adapter, provide a simple cart, allow modification/removal, and prepare quote request submission.

## Product flow

```text
Category
  -> offer/package
    -> add to cart
      -> configure selected services
        -> quote request form
          -> unique commercial proposal request
```

## Key principle

Do not wait for perfect backend calculator metadata.

Create an adapter that can consume current offer data and produce a minimal calculator model.

## Required context

Read:

```text
.agents/info/FE-17-next-roadmap-map.md
.agents/contracts/FE-CALCULATOR-QUOTE-MVP-CONTRACT.md
.agents/reports/REPORT-FE-001-content-data-consumption-audit.md
.agents/reports/REPORT-FE-010-services-rendering-adaptation.md if available
.agents/reports/REPORT-FE-011-offer-detail-modal-and-backend-handoff.md if available
```

Inspect:

```text
src/components/Calc.vue
src/components/OfferRequestForm.vue
src/components/forms/*
src/stores/formStore.js
src/services/formService.js
src/components/Group.vue
src/components/blocks/services/presentation/service.vue
```

## Suggested architecture

```text
src/adapters/CalculatorDataAdapter.js
src/stores/quoteCartStore.js
src/components/calculator/QuoteCart.vue
src/components/calculator/QuoteCartModal.vue
src/components/calculator/PackageConfigurator.vue
```

Keep names project-consistent if existing patterns suggest another location.

## MVP features

```text
1. Add offer/package to cart.
2. View cart in modal/panel.
3. Remove item from cart.
4. Change quantity or selected package variant if supported.
5. Add notes per item.
6. Compute approximate total if numeric price exists.
7. If price is a range or string, show "from" / "estimate" behavior.
8. Proceed to quote request form.
```

## Modification ideas

If no backend option metadata exists, support minimal local modifications:

```text
- quantity
- urgency flag
- optional support/maintenance toggle if safe and clearly marked
- notes/comment
- selected features as read-only included list
```

Do not invent final business pricing silently.

## Data safety

Normalize uncertain values:

```text
price: number | [min,max] | string | null
timeline: number | [min,max] | string | null
features: array | object | string | null
currency: data currency | locale default | fallback
```

## Backend handoff triggers

Create a backend handoff if the task needs:

```text
- stable calculator fields
- option pricing
- package dependencies
- quote persistence endpoint beyond forms/submit
- generated CP document endpoint
```

## Allowed changes

```text
src/adapters/*
src/stores/*
src/components/calculator/*
src/components/Group.vue or offer card only for Add button/event
src/components/OfferRequestForm.vue only if minimally integrating cart payload
src/services/formService.js only if payload structure remains compatible
src/i18n/locales/*.json for labels
.agents/reports/REPORT-FE-012-calculator-configurator-mvp.md
.agents/backend-handoff/HANDOFF-BE-002-calculator-data-contract.md if needed
```

## Forbidden changes

Do not:

```text
- redesign all services UI
- modify backend repo
- run npm run build
- introduce payment processing
- implement real checkout
- store personal data outside form submission flow
- fake backend-generated CP document
```

## Validation

Run:

```bash
npm run test:run
```

Manual/dev checks:

```text
add offer to cart
open cart modal
remove item
modify quantity/notes
submit/prepare quote payload
empty/malformed price does not crash
```

## Expected report

```text
.agents/reports/REPORT-FE-012-calculator-configurator-mvp.md
```

Include:

```text
- adapter design
- cart store shape
- UI components added
- supported price/timeline formats
- known limitations
- backend handoff needs
```

