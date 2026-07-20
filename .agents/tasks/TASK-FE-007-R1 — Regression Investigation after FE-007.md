# TASK-FE-007-R1 — Regression Investigation after FE-007 (Compred Presentation Refactor)

## Status

Regression Investigation

Priority: Critical

---

# Context

Regression introduced after FE-007.

Reference commit:

```text
bb029702aa561c83d2724eb35019c5d4656d4da2
```

The refactoring itself was accepted architecturally.

However the resulting application contains a functional regression.

---

# Observed Problem

The Compred page no longer renders its content.

One or more presentation sections are not displayed.

Treat this as a regression investigation rather than a blind bug fix.

The implementation may be partially correct.

The regression must be located first.

---

# Scope

Frontend only.

Do not modify Laravel.

Do not modify API.

Do not modify seeders.

Do not modify contracts.

---

# Context Sources

Primary:

```
AGENTS.md

.agents/

info/

```

Treat

```
.gemini/
```

as secondary legacy context.

---

# Primary Goal

Identify the exact reason why the page stopped rendering after FE-007.

Do not rewrite the implementation.

Locate the regression first.

---

# Investigation Order

Follow this order.

## Stage 1

Compare current implementation against

```
bb029702aa561c83d2724eb35019c5d4656d4da2
```

Determine:

* which files changed
* which components were extracted
* which props changed
* which slots changed

---

## Stage 2

Inspect runtime.

Look for

```
Vue warnings
Vue errors

undefined props

failed emits

missing imports

incorrect component registration

runtime exceptions

template compilation errors
```

---

## Stage 3

Validate every extracted component.

Check

```
hero.vue

about.vue

packages.vue

includes.vue

important.vue

reels_system.vue

extras.vue

benefits.vue
```

Verify

```
required props

computed

v-if

v-for

slot usage

emits

imports

```

---

## Stage 4

Inspect Compred.vue

Verify

```
properties helper

computed values

imports

component registration

prop passing

open-chat emit chain

conditional rendering

```

---

## Stage 5

Validate API mapping

Verify that every presentation component still receives exactly the expected node.

Example

```
properties.hero

properties.benefits

properties.items

properties.includes

properties.extras

properties.important
```

No presentation component should receive an unexpected structure.

---

# Constraints

Do NOT redesign the architecture.

Do NOT introduce additional abstractions.

Do NOT refactor unrelated files.

Only fix the regression.

---

# Deliverables

Provide

## 1

Root Cause Analysis

Explain exactly why rendering stopped.

---

## 2

Files modified.

---

## 3

Minimal Fix.

---

## 4

Regression Prevention Notes.

---

## Validation

Run

```
npm run test:run

npm run build
```

Then manually verify

```
Compred page

Hero

Benefits

Packages

Includes

Important

Extras

Reels System
```

---

# Success Criteria

The page renders correctly.

Architecture introduced in FE-007 is preserved.

Only minimal corrective changes are applied.

---

Before making any changes, reproduce the regression.

Do not assume the cause.

Identify the first runtime error in the browser console and trace it to its origin.

Fix the earliest failing cause first.

Subsequent errors may disappear automatically.

---
