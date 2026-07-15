# Root Cause Analysis: FE-007 Regression

## 1. Root Cause Analysis
The rendering regression on the `Compred` page was caused by Vue 3's reactivity system interacting with the newly introduced dynamic section registry.

In `FE-007`, the components were extracted into `sectionRegistry.js` and mapped into a `computed` array in `index.vue`:
```javascript
const renderModels = computed(() => {
    return compredSections.map(section => ({
        component: section.component, // <--- The issue
        // ...
    }));
});
```

Because `renderModels` is a `computed` property, Vue converts the array and everything inside it into a deeply reactive Proxy. When Vue attempts to render `<component :is="props.section.component">` using a Proxy of a component definition, internal renderer checks fail or get stuck in reactive dependency tracking, causing the component to fail to render silently. Vue explicitly warns against placing component definitions inside reactive state.

## 2. Files Modified
- `src/components/blocks/compred/index.vue`

## 3. Minimal Fix
The fix is to explicitly mark the component definition as non-reactive using Vue's `markRaw` utility when constructing the `renderModels` array.

```javascript
import { markRaw } from "vue";

// ...

const renderModels = computed(() => {
    return compredSections
        .filter(section => section.isRenderable(properties.value, renderContext.value))
        .sort((a, b) => a.order - b.order)
        .map(section => ({
            key: section.key,
            component: markRaw(section.component), // Fix applied here
            props: section.getProps(properties.value, renderContext.value),
            on: section.getListeners ? section.getListeners(renderContext.value) : {}
        }));
});
```

## 4. Regression Prevention Notes
- **Component Storage:** Whenever storing Vue components in state (`ref`, `reactive`, `computed`, or Pinia stores), always wrap the component definition with `markRaw()`.
- **Server-Driven UI Patterns:** When building dynamic registries (like `sectionRegistry.js`), it is best to keep the registry static. Since our `renderModels` maps the static registry into a computed array alongside reactive `props` and `on`, the `markRaw` step is strictly required.
