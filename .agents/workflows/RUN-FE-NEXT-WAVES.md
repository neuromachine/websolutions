# RUN-FE-NEXT-WAVES — Suggested Execution Workflow

## Rule

Do not run all tasks at once.

Treat this package as a grouped backlog. Run one task, inspect diff, accept/reject, then proceed.

## Recommended path

```text
1. Finish/review FE-004, FE-005, FE-006 from Stage 16.
2. Run FE-007 if Compred needs dynamic section rendering.
3. Run FE-008 and FE-009 for animations.
4. Run FE-010 for deeper services rendering and i18n readiness.
5. Run FE-011 for modal shell and click flow.
6. Send BE-HANDOFF-001 to backend repo if article/detail endpoint is missing.
7. Run FE-012 for calculator/configurator MVP.
8. Run FE-013 for quiz-style quote form upgrade.
```

## Commands

Copy a launch file to clipboard, for example:

```powershell
cd C:\OSPanel\home\websolutions
Get-Content .agents\tasks\LAUNCH-FE-007-compred-dynamic-section-renderer.md -Raw | Set-Clipboard
```

## Validation command

```bash
npm run test:run
```

## Forbidden command

```bash
npm run build
```

