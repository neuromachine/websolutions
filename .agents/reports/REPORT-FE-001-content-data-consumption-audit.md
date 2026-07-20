# REPORT-FE-001 — Frontend Content Data Consumption Audit

A comprehensive analysis of how the WebSolutions Vue frontend consumes and interfaces with backend EAV/content API payloads, addressing standard vs. flat endpoints, category/offer mappings, legacy compatibility keys, and future calculator schemas.

---

## 1. Files Inspected

The following project files were audited:
- **API and Services Layer**:
  - [api.js](file:///c:/OSPanel/home/websolutions/src/utils/api.js) — Base Axios client wrapper.
  - [formService.js](file:///c:/OSPanel/home/websolutions/src/services/formService.js) — Handles form validation (422) normalization and submits.
- **Store Orchestration**:
  - [blockStore.js](file:///c:/OSPanel/home/websolutions/src/stores/blockStore.js) — Factory store creator (`useBlockStore`) and data fetch actions.
  - [navigationStore.js](file:///c:/OSPanel/home/websolutions/src/stores/navigationStore.js) — Handles category navigation maps and site structure trees.
  - [uiStore.js](file:///c:/OSPanel/home/websolutions/src/stores/uiStore.js) — Manages global layout states, scope routing variables, and breadcrumb building.
- **Page Orchestrators and Routing**:
  - [usePageOrchestrator.js](file:///c:/OSPanel/home/websolutions/src/composables/usePageOrchestrator.js) — Combines block and navigation stores with routing/view updates.
  - [index.js (Router)](file:///c:/OSPanel/home/websolutions/src/router/index.js) — Holds routing hooks and scope synchronization middleware.
  - [services.js (Routes)](file:///c:/OSPanel/home/websolutions/src/router/routes/services.js) — Defines paths for directories, directions, and groups.
- **Views & Components**:
  - [Services.vue](file:///c:/OSPanel/home/websolutions/src/views/Services.vue) — Root view for services.
  - [Direction.vue](file:///c:/OSPanel/home/websolutions/src/components/Direction.vue) — Shows service category descriptions and subcategory structures.
  - [Group.vue](file:///c:/OSPanel/home/websolutions/src/components/Group.vue) — Lists groups and items, currently holding commented-out services.
  - [Compred.vue](file:///c:/OSPanel/home/websolutions/src/views/Compred.vue) — View shell orchestrator for the commercial proposal landing pages.
  - [Item.vue (Component)](file:///c:/OSPanel/home/websolutions/src/components/blocks/Item.vue) — Renders individual block properties.
  - [Calc.vue](file:///c:/OSPanel/home/websolutions/src/components/Calc.vue) — Interactive sandbox/simulation widget for AI pricing.
  - [catClass.vue](file:///c:/OSPanel/home/websolutions/src/components/blocks/services/catClass.vue) — Renders child links and icons.
  - [service.vue](file:///c:/OSPanel/home/websolutions/src/components/blocks/services/presentation/service.vue) — Inactive card layout for package pricing.

---

## 2. Current API Consumption Map

### Response unwrapping: `response.data.data` vs. Flat Responses
All standard content API fetch actions in the stores are currently designed to unwrap using double destructuring (i.e. `const { data: { data } } = await api.get(...)`):
- `blockStore.fetchBlockCategory(slug)`
- `blockStore.fetchBlockItem(slug)`
- `navigationStore.fetchStructure(slug)`
- `navigationStore.fetchNavigation(scope)`
- `blockStore.fetchOverlayCategory(slug)` utilizes `(await api.get(...)).data.data`

**The Flat Response gap**: The flat individual commercial proposal endpoint (`GET /api/{locale}/blocks/categories/offers/{proposalKey}`) returns data directly as `response.data` (containing keys `category`, `block`, `items`). Currently, the frontend has **zero references** to this endpoint and lacks actions to consume or bind flat responses.

### Error Normalization
- Validation and network error formatting are normalized securely only in `formService.sendForm()` (mapping validation errors to `vee-validate`).
- Content fetching stores (`blockStore`, `navigationStore`) log failures silently to `console.error` and do not populate state-level errors or trigger global fallback states.

---

## 3. Services Category Rendering Map

### Routing Mapping
- **`/services`** maps to `views/Services.vue` which loads `@/components/blocks/services/index.vue` -> `@/components/blocks/services/presentation/info.vue`.
- **`/direction/:slug`** maps to `views/Direction.vue` (loading structure descriptions and nested child lists using `catClass.vue`).
- **`/group/:slug`** maps to `views/Group.vue` (rendering categories, subcategories, and child services).

### Payload Mappings
- **`data.content`**: Rendered inside `info.vue` -> `content.vue` using `v-html="props.content"`. In `Direction.vue` it binds directly via `v-html="blockStore.category.content.content"`.
- **`data.subcategories`**: Handled dynamically in `Group.vue`. Loops through `blockStore.category.subcategories` to output lists of category cards.
- **`data.blocks` and `data.sections`**: Used inside `blockStore.filteredItems` getter to map `category.sections.works` into listings. They are not yet consumed by a generic Server-Driven UI layout resolver.
- **`childs` usage**: The `childs` or `child` arrays are used extensively in navigation maps (such as `OverlayItem.vue` and `catClass.vue` looping structures).
- **`acticle` usage**: Preserved and loaded inside `Compred.vue` -> passes EAV properties to a legacy rendering component.

---

## 4. Service Offers Rendering Status

### Package Card Status
- Service offer cards are defined in `services/presentation/service.vue` but are **currently commented out / inactive** inside `Group.vue` (lines 37–50).
- Visual properties expected by `service.vue`:
  - `properties.price`: Expected to be a min/max numeric array (rendered as `price[0] - price[1]`).
  - `properties.timeline`: Expected to be a min/max numeric array (rendered as `timeline[0] - timeline[1]`).
  - `properties.features`: List of strings.

### Featured Badge & Currency Handling
- **Featured badge**: The current `service.vue` component lacks logic for `properties.featured`. It does not render indicators or special classes for recommended cards.
- **Currency**: Currencies are hardcoded to the ruble symbol (`₽`) in `service.vue`.
- **Compilation bug**: `service.vue` references `t(...)` on line 58 without importing `useI18n` or defining the helper in `<script setup>`.

---

## 5. Individual CP Rendering Status

- **Status**: Completely missing. The frontend is not configured to call the flat commercial proposal endpoint `/api/{locale}/blocks/categories/offers/{proposalKey}`.
- **Integration gaps**:
  - `Compred.vue` currently calls `fetchBlockItem` which queries `/blocks/items/{slug}` (standard Resource wrapper) rather than the CP endpoint.
  - No standalone routes or views exist for individual CPs (e.g. `/offers/:slug`).

---

## 6. Calculator Readiness Assessment

- **Existing UI**: The only calculator is `Calc.vue`, which is a static demonstration playground simulating inputs/outputs for llama vs. Gemini API tokens. It does not interface with Pinia stores or dynamic data.
- **CMS Data Limitations**: Current CMS JSON payloads represent pricing as static display values or simple ranges. They lack structured properties like `base_price`, `currency`, `option_price`, `is_required`, and `quantity` fields.
- **Integration Strategy**: The frontend should write a dedicated adapter class (`CalculatorDataAdapter`) to convert CMS package descriptions into selectable options, preventing the interactive calculator from tightly coupling with presentational structures.

---

## 7. Legacy Key Usage Map

The frontend relies on these exact legacy names to maintain compatibility with backend seed configurations:
- **`childs`**: Holds sub-categories inside EAV navigation structures.
- **`child`**: Holds nested items inside structure trees (`Direction.vue` and `navigationStore.js`).
- **`acticle`**: Typo used as content keys for commercial proposal closing articles (`Compred.vue`).
- **`section`**: Represents the scope/locale key in route variables.
- **`items`**: Refers to pricing packages under `properties.items.items`.

---

## 8. Risks and Missing Pieces

1. **Endpoint Envelope Mismatch**: The Axios client will throw runtime mapping errors if a flat CP payload is loaded through standard block store actions because they assume a `{ data: { data } }` envelope.
2. **Commented-Out UI Code**: Service packages are completely disabled on category views. Re-enabling them requires fixing the `t` compile-time helper error inside `service.vue`.
3. **Array Boundaries**: If EAV properties for `price` or `timeline` are stored as single numbers or flat strings instead of min/max arrays, `service.vue` will throw undefined value errors.
4. **Locale Placeholders**: The Vietnamese (`vi`) locale holds empty arrays or placeholder objects in seed files. The frontend must remain resilient to empty data blocks to avoid rendering broken layouts.

---

## 9. Recommended Follow-Up Tasks

### [TASK-FE-002-api-content-adapter-layer.md]
Introduce an API adapter layer to intercept responses, normalize flat vs. enveloped endpoints, handle missing properties gracefully, and map legacy keys (`acticle`, `childs`) to consistent view models.

### [TASK-FE-003-services-rendering-contract-hardening.md]
Fix the `t` helper bug in `service.vue`, restore active service packages in `Group.vue`, and add defensive checks for price/timeline arrays.

### [TASK-FE-004-ind-offers-page-prototype.md]
Create the `/offers/:slug` route and integrate a flat CP store action to load individual commercial proposal nodes directly from the flat offers endpoint.

### [TASK-FE-005-calculator-data-adapter-draft.md]
Create a data adapter to map EAV-seeded service packages into a unified model suitable for interactive select/calculation workflows.

### [TASK-FE-006-frontend-contract-fixtures.md]
Create offline mockup contract files/fixtures inside the frontend project to run contract-testing validation in tests.

---

## 10. Handoff Questions

1. Should the individual commercial proposals endpoint (`/categories/offers/`) eventually support the standard `{ data: { ... } }` envelope, or is it intended to remain flat permanently?
2. If a service offer lacks a `featured` property, which tier (e.g. business/middle tier) should the frontend default to highlighting?
3. Where should calculator metadata (such as individual component price add-ons) be configured? Inside service offers EAV property values, or in a separate schema?
4. Are timeline/price ranges guaranteed to remain numeric arrays, or must the frontend support string representations (e.g. `"$150"` or `"Flexible"`)?
