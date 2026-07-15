# CONTRACT — Frontend API Adapter Contract

## Purpose

This contract defines how the frontend should unwrap and classify API responses from the WS backend.

It is intentionally small. It exists to prevent endpoint-shape confusion before deeper UI refactoring.

---

## 1. Endpoint families

### Standard Laravel Resource endpoints

Use:

```text
response.data.data
```

Examples:

```text
GET /api/{locale}/blocks/categories/{slug}
GET /api/{locale}/blocks/items/{slug}
GET /api/{locale}/blocks/blocks/navigation
```

Frontend adapter expectation:

```js
const payload = unwrapResourceData(response)
```

### Flat CP / ind_offers endpoint

Use:

```text
response.data
```

Endpoint:

```text
GET /api/{locale}/blocks/categories/offers/{proposalKey}
```

Expected shape:

```js
{
  category: {},
  block: {},
  items: []
}
```

Frontend adapter expectation:

```js
const payload = unwrapFlatData(response)
```

---

## 2. Adapter rules

A frontend agent may introduce small helpers such as:

```js
export function unwrapResourceData(response) {
  return response?.data?.data
}

export function unwrapFlatData(response) {
  return response?.data
}
```

The exact file path is not prescribed. Suggested location:

```text
src/utils/apiResponse.js
```

Alternative location may be justified in the final report.

---

## 3. Store rules

Stores should not hide endpoint-family ambiguity inside repeated destructuring.

Prefer readable intent:

```js
const payload = unwrapResourceData(await api.get(url))
```

For flat CP endpoint:

```js
const payload = unwrapFlatData(await api.get(url))
```

This task may add a store action for future CP consumption only if it does not trigger UI rendering yet.

If added, it should be clearly named, for example:

```text
fetchCommercialProposal(slug)
fetchOfferProposal(slug)
fetchFlatOffer(slug)
```

The agent must choose a name consistent with current project naming.

---

## 4. Error behavior

This stage may document current content-fetch error behavior.

It may add a tiny shared error helper only if doing so does not create broad side effects.

Do not redesign global error handling during this task.

---

## 5. Legacy payload keys

Do not rename or remove:

```text
childs
child
acticle
section
items
content
sections
subcategories
blocks
```

These are current API/frontend compatibility keys.

---

## 6. Command policy

Allowed by default:

```bash
npm run test:run
```

Forbidden by default:

```bash
npm run build
```

If build validation appears useful, write it as a recommendation only.
