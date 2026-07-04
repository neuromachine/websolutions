# HANDOFF-BE-003 — Quote Quiz Form Key Definition

## Purpose
The frontend now features a multi-step `QuoteQuizForm.vue` designed to collect complex commercial proposal briefs. Once the user configures their cart, they proceed into the quiz, answer targeted questions regarding their budget and existing assets, and submit the entire context directly to the backend.

The frontend is reusing the stable `POST /api/{locale}/forms/submit` infrastructure to pass this payload.

## Request Characteristics
This specific flow passes an expanded, deeply nested JSON payload beneath the `quote_quiz` identifier.

**Form Key:** `quote_quiz`

### Example Payload
```json
{
  "form_key": "quote_quiz",
  "data": {
    "projectType": "Интернет-магазин",
    "goal": "Увеличение конверсии",
    "urgency": "В течение месяца",
    "budgetRange": "от $500",
    "existingAssets": "Старый сайт на WordPress, есть домен.",
    "contactName": "Ivan Ivanov",
    "contactEmail": "ivan@example.com",
    "comment": "Свяжитесь со мной после 18:00.",
    "estimatedTotal": 1500,
    "cartItems": [
      {
        "id": "1688463821034",
        "packageKey": "full-website-design",
        "title": "Сайт под ключ",
        "quantity": 1,
        "basePrice": 1500,
        "isPriceEstimated": false,
        "currency": "$",
        "notes": "Нужен минималистичный дизайн"
      }
    ]
  }
}
```

## Backend Requirements
1. The backend form controller must be configured to accept and validate the `quote_quiz` form key.
2. The submission parser needs to elegantly unfold the nested `cartItems` array (e.g., mapping it into an HTML table inside the resulting administrator email notification or CRM lead card).
3. Ensure no strict string-length validations block the `existingAssets` or `comment` text areas.
