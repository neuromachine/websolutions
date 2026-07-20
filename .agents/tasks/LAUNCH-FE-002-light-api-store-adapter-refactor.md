You are working in the WebSolutions frontend repository only.

Execute:

```text
.agents/tasks/TASK-FE-002-light-api-store-adapter-refactor.md
```

This is Stage 2 — Light frontend refactor for API/store adapter readiness.

Strict rules:

```text
- Do not edit backend files or backend repository.
- Do not run npm run build.
- Do not refactor src/views/Compred.vue in this task.
- Do not implement ind_offers rendering in this task.
- Do not activate service offer cards in this task.
- Do not rename legacy keys: childs, child, acticle, section, items.
```

Allowed command:

```bash
npm run test:run
```

Main objective:

```text
Make frontend API response handling explicit for:
  standard Laravel Resource endpoints -> response.data.data
  flat CP / ind_offers endpoint       -> response.data
```

Prefer a small helper or minimal store-level refactor. Keep the diff small.

Create the final report:

```text
.agents/reports/REPORT-FE-002-light-api-store-adapter-refactor.md
```

At the end, report:

```text
- files inspected;
- files changed;
- tests run;
- confirmation that npm run build was not run;
- whether flat CP endpoint readiness was added or only documented;
- recommended next task.
```
