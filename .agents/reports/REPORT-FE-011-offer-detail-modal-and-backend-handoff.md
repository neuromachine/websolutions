# REPORT-FE-011 — Offer Detail Modal and Backend Article Handoff

## 1. Files Changed
- `src/components/ui/AppModal.vue` [NEW]
- `src/components/blocks/services/presentation/service.vue`
- `src/components/Group.vue`
- `.agents/backend-handoff/HANDOFF-BE-001-offer-article-endpoint.md` [NEW]

## 2. Modal Shell Architecture
Abandoned the legacy functional `DialogModal()` approach in favor of a clean, responsive Vue 3 component located at `src/components/ui/AppModal.vue`.
- **Accessibility:** Esc-key dismissal listeners and body scroll locking (`overflow: hidden`) are cleanly bound via `onMounted` hooks and safely destructed on `onUnmounted`.
- **Responsiveness:** Automatically collapses into a 100% full-screen layout on devices under 576px.

## 3. Component Coupling
- Instead of executing routing logic directly inside the presentation component, `service.vue` was stripped of its `<AppLink>` router hook. The action button now strictly emits `@open-modal` to pass its payload upstream.
- `Group.vue` functions as the State Orchestrator. It imports the `<AppModal>` shell and manages a simple `selectedOffer` reactive reference.

## 4. Modal Content Fallback Strategy
Currently, `Group.vue` maps the existing CMS properties (description, price, timeline, features) into the modal body directly, so it perfectly serves as an immediate "Summary" popup.

## 5. Backend Fetch Blueprinting
Because there is currently no backend endpoint returning deep HTML articles for specific service offers, a dormant (commented out) Axios request template was scaffolded directly inside `Group.vue`:
```javascript
  // try {
  //   const res = await api.get(`/api/${route.params.scope}/blocks/items/${offer.slug}/article`);
  //   articleContent.value = res.data.content;
```
Simultaneously, `HANDOFF-BE-001` was drafted defining the exact JSON shape and endpoint the Laravel API team needs to build to fulfill this route in the future.

## 6. Stability Verification
Local routing hooks and modal initialization patterns generated zero console conflicts and passed `npm run test:run` flawlessly. No backend source codes were touched, and build commands were successfully suppressed.
