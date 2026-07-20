# REPORT-FE-008 — Portfolio List Scroll Animation

## 1. Files Changed
- `src/components/blocks/portfolio/presentation/list.vue`

## 2. Animation Strategy & Config
Integrated the standard GSAP orchestrator subsystem (`useGsapOrchestrator`) directly into the root `portfolio-container` within `list.vue`.

**Declarative config used:**
```javascript
const animationConfig = {
    scroll: {
        portfolioReveal: {
            play: () => {
                gsap.from('.portfolio-grid-item', {
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power2.out',
                    clearProps: 'all',
                    scrollTrigger: {
                        trigger: containerRef.value,
                        start: 'top 85%'
                    }
                });
            }
        }
    }
};
```

## 3. Handling Dynamic List Filtering
Vue leverages `<TransitionGroup name="fade">` natively inside `list.vue` to shuffle elements during user-driven category filtering. When GSAP evaluates `.from()` animations, it typically leaves hardcoded inline properties (`opacity: 1`, `transform: translate(0,0)`) on DOM elements, completely breaking external CSS transitions.

To avoid this architectural conflict, `clearProps: 'all'` was deliberately applied. GSAP automatically strips the injected styles as soon as the initial stagger-in completes, handing complete control back to Vue's `<TransitionGroup>`.

## 4. ScrollTrigger Behavior
GSAP activates the stagger the moment the top bounds of the portfolio grid (`.portfolio-container`) hit 85% of the browser's viewport height. Since the orchestrator is correctly scoped to `containerRef.value`, no global selectors (`document.querySelectorAll`) bleed into unrelated application state.

## 5. Architectural Integrity
- Backend and API logic were completely untouched.
- Core global GSAP files (`useGsapOrchestrator.js`, `useGsapGlobalSync.js`) required no modifications, validating their highly reusable initial design.
- Vue component testing boundaries remained stable (Tested clean via `npm run test:run`).
- Zero direct `gsap.to/from` hooks exist inside `.onMounted` boundaries — the module respects the orchestrator's state model entirely.
