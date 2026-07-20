# REPORT-FE-012 — Calculator / Configurator MVP

## 1. Files Changed
- `src/adapters/CalculatorDataAdapter.js` [NEW]
- `src/stores/quoteCartStore.js` [NEW]
- `src/components/calculator/PackageConfigurator.vue` [NEW]
- `src/components/calculator/QuoteCartModal.vue` [NEW]
- `src/components/Group.vue`
- `.agents/backend-handoff/HANDOFF-BE-002-calculator-data-contract.md` [NEW]

## 2. Adapter Pattern Introduced
Because the incoming API payload currently lacks strict schemas for options, `CalculatorDataAdapter.js` was built to normalize ambiguous property inputs. 
- It parses raw arrays (`[100, 500]`) or messy strings (`"от 500$"`) into predictable `basePrice` numerics.
- It translates generic string `features` into pseudo-options (`included: true`, `priceModifier: 0`) that the UI logic expects.
- This layer protects the new configurator UI from breaking when standard service data is passed to it.

## 3. Store Architecture
A new Pinia store `quoteCartStore.js` tracks the configuration session.
- Tracks `items` array dynamically.
- Auto-handles incrementing `quantity` when a duplicate package is injected.
- Computes `estimatedTotal`. If any item entered the cart with a string/range price, `hasEstimates` trips to `true`, altering the final UI total presentation to state "от (from)".

## 4. UI Assembly
- `PackageConfigurator.vue` acts as the micro-component representing a singular cart row, exposing quantity bumps and a local notes input.
- `QuoteCartModal.vue` envelops the items inside the pre-existing `AppModal.vue` shell.
- `Group.vue` was refactored: clicking "Добавить в запрос (Add to Quote)" inside the service summary popup triggers the Adapter, loads the data into the Store, and toggles the `QuoteCartModal` open.

## 5. Backend Deficiencies Addressed
Because the frontend currently must guess what features are toggleable options vs core inclusions, `HANDOFF-BE-002-calculator-data-contract.md` was drafted. This contract clearly dictates the future json shape the Laravel API needs to deliver so we can move this calculator out of MVP and into production-grade variable pricing.

## 6. Stability Verification
Local routing hooks and modal initialization patterns generated zero console conflicts and passed `npm run test:run` flawlessly. No backend source codes were touched, and build commands were successfully suppressed.
