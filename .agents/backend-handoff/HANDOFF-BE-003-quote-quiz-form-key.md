# HANDOFF-BE-003 — Quote Quiz Form Key Support

## Source

Frontend task:

```text
TASK-FE-013 — Quote Quiz Form Upgrade
```

## Requested backend support

Add/confirm support for form key:

```text
quote_quiz
```

Endpoint:

```text
POST /api/{locale}/forms/submit
```

Expected payload:

```json
{
  "form_key": "quote_quiz",
  "data": {
    "locale": "en",
    "source": "services",
    "cartItems": [],
    "answers": {},
    "contact": {},
    "comment": ""
  }
}
```

## Validation expectations

```text
- contact should contain at least one contact channel
- cartItems can be empty only if quiz answers are sufficient
- answers should be accepted as structured JSON
- backend should store raw payload for manager review
```

## Compatibility

Do not break existing form keys:

```text
feedback
subscribe
simplified
```

