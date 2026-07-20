# REPORT-FE-006 — Service Offers Rendering

## 1. Files Inspected
- `src/stores/blockStore.js`
- `src/components/Group.vue`
- `src/components/blocks/services/presentation/service.vue`
- `src/components/blocks/services/index.vue`

## 2. Files Changed
- `src/stores/blockStore.js`
- `src/components/Group.vue`
- `src/components/blocks/services/presentation/service.vue`

## 3. Data Sourcing
Service offers for categories are natively sourced from the standard endpoint `response.data.data.blocks`. Because the backend structure evolved to use multiple block arrays, they are no longer guaranteed to sit purely within `blocks[0]`. The `isHaveItems` getter and `Group.vue` were thus refactored to safely scan all `blocks` for `.items` arrays instead of using hardcoded index `[0]`.

## 4. Rendering Strategy
The logic inside `src/components/Group.vue` was reactivated to loop through the `category.blocks` collection, rendering a `service.vue` card component for each item discovered inside an `items` array.

## 5. Defensive Handling of Empty States
Inside `src/components/blocks/services/presentation/service.vue`:
- Wrapped critical missing properties (`price`, `timeline`) inside resilient `v-if` conditionals.
- Added type validation when formatting fields that could be strings or arrays (e.g. `Array.isArray(props.properties.price) ? props.properties.price.join(' - ') : props.properties.price`) to ensure strings aren't mistakenly indexed using `[0]`.
- Implemented `import { useI18n } from 'vue-i18n';` because the component previously utilized an undefined `t('pages.info.contacts')` method inside the template, causing Vue 3 runtime errors.
- Conditionally hide the `features` list wrapper (`<ul class="conditions">`) if `features` are undefined or empty.

## 6. What Was Intentionally Avoided
- `Compred.vue` and `ind_offers` were not modified.
- Legacy payload keys such as `childs` or `acticle` were not changed.
- No new features or UI styling rules were invented; merely repaired standard layout rendering.

## 7. Commands Executed
- `npm run test:run` (Passed correctly).
- Bypassed `npm run build` as requested in `.agents/workflows/FRONTEND-COMMAND-POLICY.md`.

## 8. Backend Handoff Questions
- No questions at this time. The data maps appropriately as long as blocks supply the proper `items` arrays alongside standardized `price` and `timeline` property structures.
