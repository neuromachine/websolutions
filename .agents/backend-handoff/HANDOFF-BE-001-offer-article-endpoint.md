# HANDOFF-BE-001 — Offer Article Detail Endpoint

## Purpose
The frontend has successfully introduced an interactive modal (`AppModal.vue`) which opens whenever a user clicks "Discuss plan" on a service offer card (e.g., inside `/services/direction/group`).

Currently, the modal safely populates itself with local fallback data already present inside the parent category payload (`description`, `price`, `timeline`, `features`). 

However, to provide deeper context (such as long-form explanations, expanded terms, or HTML layouts detailing exact deliverables) **without bloat**, the frontend needs a lightweight API endpoint to fetch detailed article HTML dynamically strictly when the modal is opened.

## Requested Endpoint

**HTTP Method:** `GET`
**URI:** `/api/{locale}/blocks/items/{offerKey}/article`

*(Note: If a flatter, more appropriate architecture like `/api/{locale}/offers/{offerKey}/detail` fits the backend routing schema better, feel free to use it. The frontend API wrapper easily adapts).*

## Expected Payload Shape

We anticipate standard Laravel Resource envelope wrapping:

```json
{
  "data": {
    "key": "offer_slug",
    "content": "<h1>Detailed breakdown</h1><p>Here is what you get...</p>"
  }
}
```

## Considerations & Fallbacks
- The frontend has currently implemented a `TODO: Handoff needed` commented-out block inside `src/components/Group.vue` at line `20` inside the `handleOpenModal` method.
- Until this endpoint is delivered, the modal will peacefully render its immediate local summary data with zero console errors. Once the backend endpoint is ready, the frontend operator can simply uncomment the `axios/api.get()` fetch logic to instantly activate article hydration.
