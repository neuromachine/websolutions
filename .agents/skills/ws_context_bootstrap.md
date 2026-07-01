# Skill — WS Context Bootstrap

## Goal

Load only the project context required for the current coding task.

## Required order

1. Inspect the actual files to be edited.
2. Read `/info/SYSTEM.md` for global architecture.
3. Add only relevant layer docs:
   - `/info/CA.md` for Vue structure/stores/router.
   - `/info/DM.md` for API/data mapping.
   - `/info/DS.md` for components/slots/UI primitives.
   - `/info/TL.md` for Tailwind/theme/styling.
   - `/info/AL.md` for GSAP/animation.

## Anti-bloat rule

Do not paste or summarize all `/info` docs into the working context. Extract only constraints relevant to the current edit.

## Output discipline

When proposing changes:

```text
- state the affected file
- state the exact purpose
- show minimal diff or fragment
- explain why it respects the architecture
```
