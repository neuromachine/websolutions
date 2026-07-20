# LAUNCH — TASK-FE-015 Structured Acticle & Responsive CP Card Layout

Execute:

```text
.agents/tasks/TASK-FE-015-compred-structured-acticle-layout.md
```

Read first:

```text
AGENTS.md
.agents/agents.md
.agents/contracts/FE-COMPRED-STRUCTURED-ACTICLE-LAYOUT-CONTRACT.md
.agents/contracts/FE-COMPRED-CURRENT-BOUNDARY-CONTRACT.md
.agents/contracts/FE-IND-OFFERS-RENDERING-CONTRACT.md
.agents/contracts/FE-DYNAMIC-BLOCK-RENDERING-CONTRACT.md
.agents/skills/code_change_protocol.md
.agents/skills/ws_design_system.md
.agents/skills/ws_vue_foundation.md
.agents/skills/ws_agent_regression_protocol.md
.agents/references/van-phuc-motorbike-rental-A-CP-3.json
```

Inspect before editing:

```text
src/views/Compred.vue
src/components/blocks/compred/presentation/acticle.vue
src/components/blocks/compred/presentation/benefits.vue
src/components/blocks/compred/presentation/includes.vue
src/components/blocks/general/ui/RichText.vue
src/components/blocks/general/ui/card.vue
```

Critical rules:

```text
- frontend only
- preserve the legacy backend key `acticle`
- do not add van-phuc-specific conditions
- preserve the current legacy quotation mode
- structured mode is activated by semantic markup, not route/item key
- five cards must use row-cols-lg-5
- Includes item wrapper must become `d-flex col`
- do not modify backend, content JSON, stores, API adapters or router
- do not add dependencies
- run npm run test:run
- do not run npm run build unless the human explicitly authorizes it
```

Expected report:

```text
.agents/reports/REPORT-FE-015-compred-structured-acticle-layout.md
```
