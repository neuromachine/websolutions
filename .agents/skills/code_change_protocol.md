# Skill — Code Change Protocol

## Before editing

1. Inspect the target file.
2. Inspect direct dependencies/imports.
3. Identify the architecture layer touched:
   - Vue Foundation
   - Data Mapping
   - WS DS
   - Tailwind
   - Animation
4. State assumptions if any.

## During editing

- Keep diffs minimal.
- Do not perform broad rewrites.
- Do not rename public props/slots without checking usages.
- Do not add dependencies without approval.
- Preserve compatibility when a component has many existing usages.

## For changes over ~100 lines

Do not output a full replacement file unless explicitly requested.

Use this format:

```text
File:
Goal:
Fragment to replace:
New fragment:
Why:
```

## Before finishing

Run existing checks if available:

```bash
npm run build
npm run test
npm run lint
```

If commands are absent, report them as unavailable.
