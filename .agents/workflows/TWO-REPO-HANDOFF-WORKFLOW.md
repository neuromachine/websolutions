# WORKFLOW — Backend / Frontend Handoff

## Purpose

Define how context and tasks move between the backend and frontend repositories without mixing code ownership.

---

## 1. Direction: Backend -> Frontend

Used when backend changes or documents API/data contracts.

Backend report path:

```text
wsapi/.agents/reports/HANDOFF-FE-*.md
```

Frontend inbox path:

```text
websolutions/.agents/inbox/backend-handoff/HANDOFF-FE-*.md
```

Frontend agent then creates or executes a frontend task based on the handoff.

---

## 2. Direction: Frontend -> Backend

Used when frontend audit/rendering reveals backend contract gaps.

Frontend report path:

```text
websolutions/.agents/reports/HANDOFF-BE-*.md
```

Backend inbox path:

```text
wsapi/.agents/inbox/frontend-handoff/HANDOFF-BE-*.md
```

Backend agent then evaluates the API/data change separately.

---

## 3. Handoff Report Minimum Fields

```text
Title
Source repository
Target repository
Why handoff is needed
Observed behavior
Expected behavior
Affected endpoints/files
Compatibility risks
Suggested next task
Do not edit note
```

---

## 4. No Cross-Repo Source Editing

Agents should not edit both repositories in one run.

Allowed in one run:

```text
- edit frontend repo source
- create backend handoff report
```

Not allowed in one run:

```text
- edit frontend source
- edit backend source
```

The human operator coordinates transfer.
