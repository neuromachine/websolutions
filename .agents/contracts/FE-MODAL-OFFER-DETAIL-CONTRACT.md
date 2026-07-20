# CONTRACT — FE Modal Offer Detail Contract

## Purpose

Define the target behavior for a responsive offer detail popup/modal.

## Trigger

The modal should open on click from:

```text
- service offer card
- offer package item
- calculator cart item
```

## Modal content levels

MVP can support three levels:

```text
1. local summary already available from the card/package
2. article/detail loaded from backend if endpoint exists
3. fallback state if detail endpoint is absent
```

## Frontend behavior

```text
click offer
  -> open modal shell immediately with known title/summary
  -> optionally fetch detail/article by key
  -> show loading state in modal body
  -> render article/detail content when loaded
```

## Backend handoff

If no backend endpoint exists, frontend must create a handoff request instead of inventing data.

Recommended backend need:

```text
GET /api/{locale}/blocks/items/{offerKey}/article
```

or a better backend-approved equivalent.

## Accessibility / responsive baseline

```text
- ESC closes modal
- overlay click closes modal unless form has unsaved data
- focus is trapped in modal
- body scroll is locked while open
- mobile full-width / desktop centered dialog
```

## Do not

```text
- use the old functional modal blindly if it prevents reactive content update
- fetch backend data from presentation cards directly
- couple modal state to service.vue internals
```
