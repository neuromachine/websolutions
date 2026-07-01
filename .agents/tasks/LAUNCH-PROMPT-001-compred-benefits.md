# Launch Prompt — TASK-001 Compred Benefits

Use the project agent instructions and execute:

```text
.agents/tasks/TASK-001-compred-benefits-refactor.md
```

Important:

- Treat `.gemini/` as secondary / legacy context.
- Use `AGENTS.md` and `.agents/*` as current instructions.
- For this test pass, detailed context is in root `/info/` unless `.agents/info/` exists.
- Focus only on the introductory `benefits.vue` refactor and recommendations for `Compred.vue` / sibling compred components.
- Do not create a new workflow or broader task.
```

Start by reading the task file, then inspect the target files, then propose and apply a minimal safe diff.
