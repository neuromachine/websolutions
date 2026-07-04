# Frontend Agent Operating Protocol

## 1. Repository Identity

You are operating inside the **WebSolutions frontend repository**.

The complete system has two repositories:

```text
Backend repo: wsapi
Frontend repo: websolutions
```

This workspace is the frontend repo only.

Do not edit backend code.
Do not invent backend behavior.
Use copied handoff documents and frontend contracts to understand API payloads.

---

## 2. Context Priority

When performing a frontend task, use this priority order:

```text
1. Current human instruction
2. Current task file in .agents/tasks/
3. Root AGENTS.md
4. .agents/agents.md
5. .agents/contracts/
6. .agents/info/
7. .agents/inbox/backend-handoff/
8. Existing source code
9. Older reports / legacy notes
```

If documents conflict, prefer the newer task and report the conflict.

---

## 3. Work Classification

Before editing, classify the task:

```text
audit-only
contract update
frontend adapter
store refactor
component refactor
rendering implementation
test-only
handoff report
```

If the task is audit-only, do not edit `src/**`.

---

## 4. API Rules

Standard category/resource endpoints:

```text
payload = response.data.data
```

Flat individual CP endpoint:

```text
payload = response.data
```

Do not treat every endpoint the same.
The offers/CP endpoint is intentionally asymmetric until a coordinated backend/frontend migration is approved.

---

## 5. Compatibility Rules

Preserve support for:

```text
childs
child
acticle
section
items
```

These are not typos for agents to fix casually.
They are compatibility keys.

---

## 6. Component Boundary Rules

Do not import stores into presentation components.

Keep responsibilities separated:

```text
route/view shell -> composition
orchestrator -> fetch/store coordination
adapter -> payload normalization
presentation -> props/rendering
UI primitive -> generic visual structure
```

---

## 7. Command Policy

Do not run by default:

```bash
npm run build
```

Allowed by default:

```bash
npm run test:run
npm run test
```

Only run `npm run build` if the human explicitly asks for it in the current task.

If you believe build should be run, state it in the report as a recommendation.

---

## 8. Reporting Format

Every agent report should include:

```text
1. Task type
2. Files inspected
3. Files changed
4. API contract impact
5. Legacy compatibility impact
6. Commands run
7. Commands intentionally not run
8. Remaining risks
9. Recommended next task
```

For this repository, always explicitly state whether `npm run build` was not run due to policy.
