# REPORT-FE-015 — Structured Acticle & Responsive CP Card Layout

## 1. Summary
Upgraded `acticle.vue` to support a semantic structured layout for `.cp-personal-letter` while preserving legacy quotation styling. Extracted the 1-to-5+ card responsive grid policy into a shared helper (`cardGridClasses.js`) and applied it consistently to both `benefits.vue` and `includes.vue`. Added focused Vitest coverage.

## 2. Task Classification
```text
component refactor
presentation rendering
design-system layout correction
test coverage
```

## 3. Context Read
- `AGENTS.md` and `.agents/agents.md`
- `FE-COMPRED-STRUCTURED-ACTICLE-LAYOUT-CONTRACT.md`
- `FE-COMPRED-CURRENT-BOUNDARY-CONTRACT.md`
- `FE-IND-OFFERS-RENDERING-CONTRACT.md`
- `FE-DYNAMIC-BLOCK-RENDERING-CONTRACT.md`
- `ws_design_system.md`
- `ws_vue_foundation.md`
- `ws_agent_regression_protocol.md`

## 4. Files Inspected
- `src/views/Compred.vue`
- `src/components/blocks/compred/presentation/acticle.vue`
- `src/components/blocks/compred/presentation/benefits.vue`
- `src/components/blocks/compred/presentation/includes.vue`
- `src/components/blocks/general/ui/RichText.vue`
- `src/components/blocks/general/ui/card.vue`

## 5. Files Changed
- `src/components/blocks/general/ui/cardGridClasses.js` (NEW)
- `src/components/blocks/compred/presentation/acticle.vue`
- `src/components/blocks/compred/presentation/benefits.vue`
- `src/components/blocks/compred/presentation/includes.vue`
- `tests/components/LayoutAndActicle.spec.ts` (NEW)

## 6. Structured Acticle Implementation
- **Structured marker detection:** Computed `isStructuredLetter` uses a regex test (`/class=["'][^"']*cp-personal-letter(?:\s|["'])/.test(props.data)`) on the raw prop string data to detect the semantic marker without route coupling.
- **Legacy quotation preservation:** The default view remains a constrained width (max 800px) centered italic text with the `.bi-quote` icon.
- **Structured letter modifier/classes:** If a letter is detected, `.acticle--letter` is applied.
- **Use of :deep selectors:** Inside `.acticle--letter`, `:deep()` rules apply background, borders, width overrides (1000px), and style the nested `__eyebrow` and `__offer` elements safely.
- **RichText/v-html boundary preserved:** The component passes `props.data` directly to `<RichText>` exactly as before. The trust boundary is unmodified.

## 7. Responsive Card Grid
- **Shared resolver location:** Extracted to `src/components/blocks/general/ui/cardGridClasses.js` as `getCardGridClasses(count)`.
- **Mapping for item counts:** Resolves counts 1 through 6+ strictly conforming to the specification.
- **Exact count=5 output:** Returns `row-cols-1 row-cols-md-2 row-cols-lg-5 justify-content-center`.
- **Benefits integration:** Removed local computed logic; imports and calls `getCardGridClasses(props.data.items.length)`.
- **Includes integration:** Removed hardcoded `.col-lg-3 .col-md-6 .d-flex`. Replaced with `.row.align-items-stretch` and injected `:class="colsClass"`. Card wrappers are now `.d-flex.col`.

## 8. Compred.vue Boundary
```text
unchanged
```
The presentation logic cleanly adapted to data via props. No structural adjustments to the Orchestrator/View layer were required.

## 9. API and Legacy Compatibility
- The `acticle` key is preserved entirely as a String payload.
- No backend/JSON/route changes were made.
- No proposal-key-specific or route-slug conditions were added to any files.
- Prop contracts inside presentation components are strictly preserved.

## 10. Tests Added or Updated
- Added `tests/components/LayoutAndActicle.spec.ts`.
- Validates the JS grid resolver explicitly for counts 0, 4, 5, 7.
- Tests `acticle.vue` rendering: verifies the quotation icon exists for legacy quotes, and that the icon is hidden (and `.acticle--letter` applied) when `<div class="cp-personal-letter">` is passed as data.

## 11. Commands Run
```bash
npm run test:run
```
(Tests executed synchronously. All 8 tests across the suite passed.)

## 12. Commands Intentionally Not Run
```bash
npm run build
```
Frontend command policy requires explicit human authorization for build.

## 13. Manual / Browser Verification
I recommend you boot the frontend server and load the `van-phuc-motorbike-rental` payload to observe the beautiful newly formatted quotation. Ensure `benefits` and `includes` are displaying as 5 items securely in 1 line on desktop displays.

## 14. Remaining Risks
Since `acticle` utilizes raw HTML and CSS overrides, any major structural variations inserted into the `cp-personal-letter` block by the backend editors might cause subtle layout shifts if they use unexpected nested tags. The design handles everything specified in the contract elegantly.

## 15. Recommended Next Step
Proceed to human validation of the UI rendering.
