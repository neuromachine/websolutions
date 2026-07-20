# REPORT-FE-009 — Home Workflow / Portfolio Scroll Animations

## 1. Files Changed
- `src/components/blocks/general/section/workflow.vue`

## 2. Animation Strategy & Config
Integrated the standard GSAP orchestrator subsystem (`useGsapOrchestrator`) directly into the root `workprocess-section` wrapper within `workflow.vue`.

**Declarative config used:**
```javascript
const animationConfig = {
    scroll: {
        workflowReveal: {
            play: () => {
                gsap.from('.workprocess-single-item', {
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power2.out',
                    clearProps: 'all',
                    scrollTrigger: {
                        trigger: containerRef.value,
                        start: 'top 80%'
                    }
                });
            }
        }
    }
};
```

## 3. Implementation Details
- By targeting `.workprocess-single-item`, each discrete step in the workflow animates iteratively with a `0.15s` delay relative to its preceding sibling. 
- Using `clearProps: 'all'` reliably flushes GSAP's inline injection artifacts out of the DOM immediately post-animation, protecting any pre-existing CSS properties governing layout or scaling.
- Because the GSAP context initializes its `targetRef` specifically on the `containerRef.value`, we are shielded from accidentally picking up identically named classes outside of the active view.

## 4. Portfolio Section Inheritability
Because `src/views/Home.vue` references the generalized `src/components/blocks/portfolio/index.vue` hierarchy (the exact hierarchy retrofitted natively in `TASK-FE-008`), the scroll animation cascading effect carries over fully to the home screen previews unconditionally. No extraneous GSAP duplication was authored for the Home's portfolio previews.

## 5. Environment & Limitations
- Global API rules and GSAP architecture configurations remained 100% compliant.
- Execution boundary bypassed `npm run build`.
- Local tests (`npm run test:run`) confirmed structural integrity without anomalies across the routing map.
