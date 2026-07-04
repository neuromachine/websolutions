# REPORT-FE-003 — Compred.vue Refactor Preparation

## 1. Summary
This report analyzes the current `src/views/Compred.vue` orchestrator and its presentation boundaries. It defines a safe path for FE-004 to decouple the view shell from the data fetching logic and prepare the components for the upcoming flat commercial proposal (`ind_offers`) data contract, without breaking the existing presentation layers.

## 2. Files Inspected
- `src/views/Compred.vue`
- `src/router/index.js`
- `src/components/blocks/compred/presentation/*`
- `src/stores/blockStore.js`
- `.agents/info/FE-15-compred-refactor-preparation.md`
- `.agents/contracts/FE-COMPRED-CURRENT-BOUNDARY-CONTRACT.md`

## 3. Current Compred.vue Map
**Role:** Route view shell and page orchestrator combined.
**Behaviors:**
- Calls `usePageOrchestrator` to fetch data via `fetchBlockItem`.
- Alters global `uiStore` state (`setHeaderVars('menu', false)`).
- Initializes the Tidio chat integration (`openTidioChat`).
- Extracts `blockStore.item.properties` and orchestrates passing specific property slices (e.g., `properties.hero`) to pure presentation components.
- Renders some inline UI conditionally (e.g., `acticle` raw HTML, and a hardcoded `ivorycoast` QR code).

## 4. Current Data Flow
1. **Route**: `/compred/:slug`
2. **Fetch**: `usePageOrchestrator` calls `blockStore.fetchBlockItem(slug)`, triggering a `GET` to the standard resource endpoint (`/blocks/items/{slug}`).
3. **Store**: Payload is unwrapped using `unwrapResourceData` (`response.data.data`) into `blockStore.item`.
4. **Binding**: `Compred.vue` computes `properties = blockStore.item.properties` and distributes the data.

**Problem:** For future `ind_offers` / commercial proposals, the frontend must call `fetchFlatOffers` (the flat endpoint) which returns `{ category, block, items }` directly at `response.data`. The current `Compred.vue` relies on `item.properties`, which will mismatch the flat endpoint shape.

## 5. Component Dependency Map
- **Layout**: `Header`, `Footer`
- **Static Injections**: `Calc`, `Portfolio`
- **Extracted Presentation (Clean)**: `Hero`, `About`, `Packages`, `Includes`, `Important`, `ReelsSystem`, `Extras`, `Benefits`.
- **Inline / Raw Components**: `content.vue` (for `acticle`), `qrcode.vue`.

## 6. Backend/API Contract Touchpoints & Legacy Keys
The presentation components heavily rely on legacy EAV payload keys:
- `acticle` (typo preserved for compatibility)
- `items` (nested in `properties.items`)
- `hero`, `benefits`, `includes`, `reelsSystem`, `extras`, `important`.
These keys must be protected and passed exactly as they are during the refactor.

## 7. Risks
- **Data Shape Mismatch**: Connecting `fetchFlatOffers` directly to `Compred.vue` will break the `computed(() => blockStore.item?.properties)` assumption. The new orchestrator must map the flat payload (`response.data.block.properties` or `response.data.items`) into the `properties` map expected by the presentation components.
- **Hardcoded Logic**: The `ivorycoast` QR code is hardcoded to a specific `blockStore.item.key`.

## 8. Recommended FE-004 Scope
**Goal:** Separate routing/view from orchestration/data-fetching.
- **Modify**: `src/views/Compred.vue` -> strip it down to a dumb view shell that just passes `:slug` to an orchestrator.
- **Create**: `src/components/blocks/compred/index.vue` -> a new orchestrator that handles `fetchFlatOffers`, normalizes the flat data into a `properties` object, and manages the `uiStore` / Tidio chat.
- **Modify**: Move the inline `acticle` and `qrcode` sections out of `Compred.vue` into `compred/index.vue` or new presentation components.
- **Do Not Modify**: Any file in `src/components/blocks/compred/presentation/`.

## 9. Deferred FE-005 Scope
- Fully replacing the `/compred` route with `/offers` (ind_offers).
- Creating specialized calculator views for specific proposals.
- Implementing the "Service Offers" cards across standard category pages.

## 10. Validation Checklist for FE-004
- [ ] `src/views/Compred.vue` contains no data fetching or store imports.
- [ ] `src/components/blocks/compred/index.vue` is created and orchestrates `fetchFlatOffers`.
- [ ] `index.vue` normalizes the flat payload to satisfy existing presentation props.
- [ ] Legacy keys (`acticle`, `childs`, etc.) are preserved.
- [ ] Presentation components in `src/components/blocks/compred/presentation/` are completely untouched.
- [ ] `npm run test:run` passes.
- [ ] `npm run build` is strictly bypassed.

## 11. Final Recommendation
**SAFE TO PROCEED.**
The current implementation boundary is clear. The presentation components are adequately decoupled from the store, making it safe to insert a new orchestration layer (`compred/index.vue`) that handles the flat endpoint data normalization without cascading breaking changes into the UI components.
