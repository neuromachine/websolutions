# WORKFLOW — Frontend Command Policy

## Purpose

Define which commands frontend agents may run by default and which commands are reserved for the human operator or CI/CD.

---

## 1. Forbidden by Default

Agents must not run:

```bash
npm run build
```

Reason:

```text
The production build is handled remotely by CI/CD.
Local build can create generated files or change git status.
The human operator validates local behavior through dev mode and targeted tests.
```

---

## 2. Allowed by Default

Agents may run:

```bash
npm run test:run
npm run test
```

Only when relevant to the task.

---

## 3. Conditional Commands

Agents must not run automatically:

```bash
npm run dev
npm run build
npm install
npm update
```

These require explicit human instruction in the current task.

---

## 4. Reporting Requirement

Every frontend agent report must include:

```text
Commands run:
  ...

Commands intentionally not run:
  npm run build — forbidden by frontend command policy unless explicitly requested.
```

---

## 5. If Build Seems Necessary

Do not run it automatically.

Write:

```text
Recommendation:
  Human operator may run npm run build or rely on CI/CD build validation.
```

---

## 6. Git Hygiene

After any command, the agent must check whether generated files appeared.

If generated files appear unexpectedly:

```text
1. Stop further modifications.
2. Report generated paths.
3. Do not hide or delete them without instruction.
```
