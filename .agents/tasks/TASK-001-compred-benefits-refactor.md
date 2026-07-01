# TASK-001 — Compred Benefits: Context Intake + Minimal Refactor + Next-step Analysis

## Status
Test / introductory agent run.

This is a **practice launch task** for comparing Codex and Antigravity outputs on the same repository context.
Do not expand the task into a full page rebuild. Do not create backend migrations. Do not redesign the whole frontend system.

---

## Priority and context rules

1. Treat `AGENTS.md`, `.agents/agents.md`, and `.agents/skills/*.md` as the current agent instruction layer.
2. Treat the project root directory `.gemini/` as **secondary / legacy** context.
   - It may exist because Antigravity or Gemini-based tools can prioritize it.
   - Do **not** let `.gemini/` override `AGENTS.md` or `.agents/*` unless the user explicitly says so.
   - If `.gemini/` conflicts with `.agents/*`, follow `.agents/*`.
3. For this test pass, the detailed context files are currently placed in root `/info/`.
   - This is temporary.
   - Use `/info/*.md` as canonical detailed context for now.
   - If `.agents/info/` also exists, prefer `.agents/info/`; otherwise use `/info/`.
4. Do not create a new task plan/workflow file unless explicitly requested.

---

## Required context intake

Before changing code, read at least:

```text
AGENTS.md
.agents/agents.md
.agents/skills/ws_context_bootstrap.md
.agents/skills/ws_design_system.md
.agents/skills/ws_vue_foundation.md
.agents/skills/ws_data_mapping.md
.agents/skills/compred_benefits_guardrails.md
/info/SYSTEM.md
/info/DS.md
/info/CA.md
/info/DM.md
```

Recommended secondary context:

```text
/info/TL.md
/info/AL.md
```

Optional sample payload, if present:

```text
/info/samples/respond_visarun_system.json
respond_visarun_system.json
```

Expected payload shape for this task:

```js
properties.benefits = {
  pretitle: string,
  title: string,
  items: [
    {
      index: number,
      icon: string,
      title: string,
      text: string
    }
  ]
}
```

---

## Target files

Primary target:

```text
src/components/blocks/compred/presentation/benefits.vue
```

Allowed supporting files, only if needed:

```text
src/components/blocks/general/ui/card.vue
src/components/blocks/general/ui/SectionHeader.vue
src/components/blocks/services/micro/icon_offer.vue
src/views/Compred.vue
```

Read for context / recommendations:

```text
src/components/blocks/compred/**/*
src/views/Compred.vue
package.json
```

---

## Goals

### Goal 1 — Context intake

Confirm in your response that you used the current `.agents` context and treated `.gemini/` as secondary legacy context.

### Goal 2 — Minimal refactor of `benefits.vue`

Refactor `src/components/blocks/compred/presentation/benefits.vue` so it better matches the documented WS architecture:

- presentation component receives `data` via props only;
- no direct Pinia store imports;
- no route access;
- no API calls;
- section header uses `SectionHeader`;
- cards use `Card` as UI primitive;
- icon/title/body are passed through slots;
- `IconOffer` API should remain backward-compatible for now;
- component should defensively handle missing or empty `data.items`;
- Bootstrap grid may remain for this iteration;
- no broad Tailwind migration in this task.

### Goal 3 — Card slot compatibility, only if needed

If changing `Card`, keep backward compatibility:

- `icon` slot remains supported;
- `title` slot remains supported;
- prefer default slot for body content;
- keep `text` slot fallback if existing consumers use it;
- do not hardcode `IconOffer` inside `Card`.

Do not change `IconOffer` prop API yet unless there is a local bug that cannot be solved otherwise. If its API is problematic, document it as technical debt.

### Goal 4 — Grid behavior for variable item counts

Improve or recommend grid behavior for variable item counts.

Preferred rule for this test:

```text
1 item  -> row-cols-lg-1
2 items -> row-cols-lg-2
3 items -> row-cols-lg-3
4 items -> row-cols-lg-4
5 items -> row-cols-lg-3  // visual 3 + 2, not 5 narrow columns
6 items -> row-cols-lg-3
>6      -> row-cols-lg-4
```

Keep this logic local to `benefits.vue` for now. Do not introduce `CardsGrid` yet unless only as recommendation.

### Goal 5 — Analyze `Compred.vue` and child components

After the minimal refactor, analyze `src/views/Compred.vue` and related `compred` child components according to DS/CA/DM context.

Return recommendations for next steps, especially:

- which child components should be refactored by analogy with `benefits.vue`;
- where section nodes should be passed as props;
- where `properties.items` should be treated as `packages` alias;
- where `RichText` is needed for HTML strings;
- whether `CardsGrid`, `RichText`, or `PricingPackages` should be introduced later;
- what should not be changed yet.

Do **not** implement the whole `Compred.vue` refactor in this task unless it is a very small safe change needed for `benefits.vue` to work.

---

## Implementation constraints

- Keep changes small and reviewable.
- Prefer minimal diffs.
- Do not rewrite whole files unless necessary.
- Do not change backend code.
- Do not change database/seeders.
- Do not rename content keys such as `acticle` or `properties.items` in backend contract.
- Do not introduce a universal component-monster.
- Do not move to full Tailwind/Grid migration yet.
- Do not add new dependencies.
- If a dependency or script is uncertain, inspect `package.json` first.

---

## Validation

Before finishing:

1. Inspect `package.json` scripts.
2. Run the smallest relevant available check, for example:
   - `npm run build`
   - `npm run lint`
   - `npm test`
   - or explain why no safe command was available.
3. Report changed files.
4. Report any command output/errors.

---

## Expected final response format

Return:

```text
1. Context used
2. Files changed
3. What changed and why
4. Validation run
5. Notes / risks
6. Recommended next refactor steps for Compred.vue and sibling sections
```

Keep the response concise and technical.
