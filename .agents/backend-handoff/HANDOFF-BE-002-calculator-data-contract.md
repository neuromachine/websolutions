# HANDOFF-BE-002 — Calculator Data Contract and Cart Persistence

## Purpose
The frontend team has successfully deployed an MVP "Quote Cart" / Configurator module (`TASK-FE-012`). 

Currently, the configurator uses a specialized frontend adapter (`CalculatorDataAdapter.js`) to parse loosely structured API fields (`price: [500, 1000]`, `features: [...]`) into pseudo-options, calculating an "Estimated Total". It maintains session state via a local Pinia store (`quoteCartStore.js`).

To move from this MVP phase to a stable, commercially viable pipeline, the backend needs to formalize how package options and quote requests are structured.

## 1. Option Metadata Enrichment
Currently, the frontend simply treats the existing string `features` array as "Included Options". We need the API payload to explicitly define modifiers that users can toggle.

### Requested Output Structure (e.g., inside `GET /api/{locale}/blocks/categories/offers/{slug}`)
```json
{
  "properties": {
    "price": 1500,
    "currency": "$",
    "timeline": 2,
    "timeline_unit": "weeks",
    "options": [
      {
        "id": "opt-1",
        "name": "Priority Support",
        "type": "boolean",
        "priceModifier": 200,
        "isIncluded": false
      },
      {
        "id": "opt-2",
        "name": "Design Revisions",
        "type": "numeric",
        "priceModifier": 50,
        "isIncluded": true
      }
    ]
  }
}
```

## 2. Cart Submission Payload
When the user clicks "Оформить запрос" (Proceed to Checkout / Quote Request), we will need an endpoint designed to ingest the cart array alongside standard contact form data.

### Requested Input Structure (`POST /api/{locale}/quotes/request`)
```json
{
  "contact": {
    "name": "Client Name",
    "email": "client@example.com",
    "company": "Example Inc."
  },
  "cart": [
    {
      "packageKey": "corporate-website",
      "quantity": 1,
      "notes": "We need it built fast.",
      "selectedOptions": ["opt-1"]
    }
  ],
  "locale": "ru"
}
```

## Immediate Action
No frontend blockers exist. The MVP functions locally. However, until these schemas are provided, no definitive pricing calculation or dynamic modifier toggling can occur securely without frontend guessing. Please review and provide a timeline for these endpoints.
