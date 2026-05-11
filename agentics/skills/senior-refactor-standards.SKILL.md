> **Archival snapshot** — 2026-05-11  
> **Source:** `~/.cursor/skills/senior-refactor-standards/SKILL.md`  
> **Note:** Frozen copy for submission and repo portability; your live Cursor skill may differ.

---

---
name: senior-refactor-standards
description: Refactors any codebase to senior-level engineering standards while preserving current behavior and outputs. Applies DRY, separation of concerns, single-responsibility, clearer naming, and improved structure and reusability. Use when the user explicitly requests a refactor, code cleanup, restructuring, deduplication, naming improvements, or maintainability work, and changes must keep external behavior and outputs unchanged.
disable-model-invocation: true
---

# Senior Refactor Standards

## Purpose

Refactor any codebase using senior-level engineering standards. Apply DRY, separation of concerns, and single-responsibility principles. Improve structure, naming, and reusability while preserving current behavior and outputs.

## Core Principles

- **Behavior parity first.** Public APIs, return values, side effects, logs, error types, and user-visible outputs must remain identical unless the user asks otherwise.
- **DRY.** Remove real duplication. Do not collapse code that only looks similar but evolves independently.
- **Separation of concerns.** Split modules, files, and functions along clear boundaries: I/O, domain logic, transport, configuration, presentation.
- **Single responsibility.** Each function, class, and module has one reason to change. Extract when responsibilities mix.
- **Clarity over cleverness.** Names describe intent. Control flow uses early returns. Nesting stays shallow.
- **Reusability with restraint.** Extract abstractions only after duplication or a real second use case appears. Avoid premature generalization.
- **Smallest viable change.** Prefer many small, reviewable steps over one large rewrite.

## Out of Scope (unless explicitly requested)

- Feature changes, bug fixes, or behavior changes.
- Dependency upgrades, framework migrations, or build system rewrites.
- Performance optimizations that alter outputs or trade off correctness.
- Public API or schema changes.
- New tests beyond what is needed to lock current behavior.

If a refactor requires touching any of the above, stop and ask the user.

## Workflow

### 1. Map the Target

- Identify the scope: file, module, package, or whole codebase.
- Read the relevant code and its callers before changing anything.
- Note public surface area (exports, routes, CLI flags, schemas, events).
- Locate existing tests, type definitions, and lint/format config.

### 2. Establish a Behavior Baseline

- Run existing tests, type checks, linters, and the build. Record the current passing state.
- If meaningful tests do not exist for the target, prefer characterization tests over speculative refactors. If adding tests is out of scope, narrow the refactor to changes that are obviously behavior-preserving.

### 3. Diagnose Before Editing

Catalog issues with concrete references (file and symbol):

- Duplicated logic across files or branches.
- Functions doing multiple unrelated things.
- Modules mixing concerns (e.g., HTTP + business rules + persistence).
- Unclear or inconsistent names, abbreviations, and casing.
- Deep nesting, long parameter lists, primitive obsession.
- Dead code, unreachable branches, unused exports.
- Leaky abstractions and misplaced responsibilities.

### 4. Plan the Refactor

- Order changes from lowest risk to highest.
- Group related changes into small commits with clear intent.
- Confirm each step preserves behavior; if uncertain, split it further.

### 5. Apply Standard Moves

Use established refactorings, one at a time:

- Rename for intent (variables, functions, files).
- Extract function or module to isolate a responsibility.
- Inline trivial indirection that obscures meaning.
- Replace conditional chains with early returns or polymorphism.
- Introduce a parameter object or typed value when argument lists grow.
- Move code closer to its callers or to the layer that owns the concern.
- Consolidate duplicated logic into a single, clearly named utility.
- Remove dead code and unused exports.

### 6. Validate Continuously

After each step:

- Run formatter, linter, type checker, and tests.
- Compare outputs, logs, and error shapes against the baseline when relevant.
- Revert immediately if behavior drifts; re-plan a smaller step.

### 7. Stop Conditions

Stop and ask the user when:

- A change would alter public APIs, schemas, or outputs.
- Tests are missing for risky areas and adding them is out of scope.
- The right fix is a redesign, not a refactor.
- Estimated impact exceeds the user's stated scope.

## Guardrails

- Do not change formatting in unrelated files.
- Do not reorder imports or exports beyond what the refactor requires.
- Do not introduce new dependencies unless the user approves.
- Do not rewrite working code purely for style preference.
- Preserve comments unless they become incorrect after the change; update them when they do.
- Match the project's existing conventions, naming, and patterns over personal preference.

## Output Template

When reporting results, use this structure:

```markdown
## Refactor Summary

### Scope
<files, modules, or areas touched>

### Changes
- <change 1>: <intent and location>
- <change 2>: <intent and location>

### Principles Applied
- DRY: <where and why>
- Separation of concerns: <where and why>
- Single responsibility: <where and why>
- Naming and structure: <where and why>

### Behavior Parity
- Tests: <pass/fail vs baseline>
- Type check / lint / build: <pass/fail vs baseline>
- Manual checks: <what was verified>

### Risks and Follow-ups
- <residual risks>
- <suggested next refactors out of current scope>
```

## Quick Checklist

- [ ] Scope and public surface understood
- [ ] Baseline (tests, types, lint, build) captured
- [ ] Issues catalogued with file references
- [ ] Changes split into small, behavior-preserving steps
- [ ] Validations run after each step
- [ ] Output, logs, and errors unchanged
- [ ] Summary delivered using the output template
