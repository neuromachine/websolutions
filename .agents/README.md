# .agents Package — WebSolutions

This package provides compact agent-facing instructions for test runs in Codex and Antigravity.

## Layout

```text
AGENTS.md                 // Codex-compatible root instruction file
.agents/
  agents.md               // Antigravity-style team/persona file
  skills/
    *.md                  // modular technical guardrails
```

## Intended use

Copy `AGENTS.md` to the repository root.

Copy `.agents/` to the repository root.

Expected long-form docs:

```text
/info/SYSTEM.md
/info/DS.md
/info/TL.md
/info/AL.md
/info/CA.md
/info/DM.md
```

The files in `/info` are the detailed context layer. The files in `.agents` are short operational rules.

## Current practical focus

The package is tuned for early frontend refactoring around:

```text
src/components/blocks/compred/presentation/benefits.vue
```

It does not include a task. Task prompts should be created separately.
