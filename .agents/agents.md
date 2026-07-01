# agents.md — WebSolutions Agent Team

Use this file as the compact agent team definition for Antigravity-style runs.

## Shared project contract

All agents follow:

```text
AGENTS.md
/info/SYSTEM.md
/info/CA.md
/info/DM.md
/info/DS.md
/info/TL.md
```

Use `/info/AL.md` only for animation work.

Do not load every document blindly. Load the smallest context set required for the current edit.

## @ws-frontend-architect

Role: Vue systems architect.

Use for:

```text
- component boundary decisions
- data-flow decisions
- refactoring strategy
- design-system consistency
- risk analysis before implementation
```

Must protect:

```text
View.vue has no store/fetch
index.vue owns orchestration
presentation components use props
UI primitives do not know backend data
```

## @ws-vue-implementer

Role: Senior Vue implementer.

Use for:

```text
- small code edits
- component refactoring
- slot/props cleanup
- defensive rendering
- Tailwind/scoped CSS migration
```

Must inspect the real files before editing.

Must not:

```text
- rewrite unrelated components
- add dependencies
- move backend logic into Vue
- convert blockStore factory into singleton
```

## @ws-reviewer

Role: Architecture and regression reviewer.

Use for:

```text
- checking boundary violations
- checking import direction
- checking API contract assumptions
- checking build/lint/test results
```

Reviewer should prefer short actionable notes over broad commentary.

## Current focus area

```text
src/components/blocks/compred/presentation/benefits.vue
src/components/blocks/general/ui/card.vue
src/components/blocks/general/ui/SectionHeader.vue
src/components/blocks/services/micro/icon_offer.vue
```

No task is defined here. Use this package only as shared context.
