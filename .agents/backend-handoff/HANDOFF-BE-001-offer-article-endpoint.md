# HANDOFF-BE-001 — Offer Article / Detail Endpoint Request

## Source

Frontend task:

```text
TASK-FE-011 — Offer Detail Modal and Backend Article Handoff
```

## Reason

Frontend needs a stable way to load article/detail content when a user clicks on an offer/package/service card.

The current frontend can open a modal with known summary data, but deeper article/detail content should come from backend data, not be invented locally.

## Requested backend capability

Provide or confirm an endpoint for offer detail/article content.

Possible endpoint shape:

```text
GET /api/{locale}/blocks/items/{offerKey}/article
```

or:

```text
GET /api/{locale}/blocks/categories/offers/{proposalKey}/items/{offerKey}
```

Backend team may choose the better canonical route.

## Desired response shape

```json
{
  "key": "offer-key",
  "title": "...",
  "descr": "...",
  "content": "<p>...</p>",
  "acticle": "<p>...</p>",
  "metadata": {},
  "related": []
}
```

## Compatibility rules

```text
- preserve legacy key acticle if it is the canonical content field
- do not rename public keys without frontend handoff
- support locale filtering
- return safe empty/null fields if article is absent
```

## Frontend fallback

Until backend confirms endpoint:

```text
- modal displays local summary/package data
- no hardcoded article copy
- report notes backend endpoint pending
```

