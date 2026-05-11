> **Archival snapshot** — 2026-05-11  
> **Source:** `~/.cursor/skills/sdd-plan-architect/SKILL.md`  
> **Note:** Frozen copy for submission and repo portability; your live Cursor skill may differ.

---

---
name: sdd-plan-architect
description: Produces deep, spec-driven implementation plans with architecture analysis, dependency mapping, risk assessment, phased milestones, acceptance criteria, and validation strategy. Use when the user asks for a plan, specification, implementation roadmap, technical design, SDD-style planning, or "think before coding".
---

# SDD Plan Architect

Create high-quality, production-grade planning artifacts that behave like an autonomous technical architect, not a simple task list generator.

## User requirements (verbatim)

The planning skill should:

* Analyze my request deeply before generating the plan.
* Search the codebase, context, and related files to fully understand the task.
* Automatically identify missing details, dependencies, risks, architecture impact, and edge cases.
* Generate structured implementation plans similar to professional technical specifications.
* Break work into phases, milestones, and actionable tasks.
* Include reasoning, assumptions, acceptance criteria, and validation steps.
* Review and refine the plan after generation before presenting it.
* Detect when additional skills/tools are needed and either invoke existing skills or dynamically create specialized sub-skills.
* Behave like an intelligent engineering planner rather than a simple task generator.

I want the system to feel like a real autonomous technical architect that can:

* think critically,
* self-review,
* improve plans iteratively,
* orchestrate other skills,
* and generate production-grade implementation specs automatically.

## Trigger signals

Apply this skill whenever the user asks for:
- a plan, roadmap, implementation plan, or phased execution
- a technical specification, SDD, design doc, or architecture plan
- "think before coding", "analyze first", "break this down", or similar language
- planning a refactor, migration, integration, large feature, or risky change

## Non-goals

- Do not jump directly to code unless the user explicitly asks to skip planning.
- Do not output shallow TODO lists without analysis.
- Do not hide uncertainty; call out assumptions and open questions explicitly.

## Planning protocol

Follow this workflow exactly.

### Mandatory audit rule

Never produce a final plan from intuition alone. First audit the project state using real evidence from:
- code files
- project docs
- configuration and scripts
- existing architectural conventions

If evidence is missing or conflicting, call it out and ask for clarification instead of guessing.

### Phase 1: Intent framing

1. Restate the user request in one precise sentence.
2. Classify scope:
   - `small` (single module, low risk)
   - `medium` (multiple files/surfaces)
   - `large` (cross-cutting, architectural, migration)
3. Define planning depth target:
   - small -> concise but structured
   - medium/large -> full SDD template

### Phase 2: Context and evidence gathering

Perform targeted exploration before drafting:

1. Inspect relevant files, routes, services, models, and docs.
2. Search for existing patterns to reuse.
3. Identify adjacent systems and integration touchpoints.
4. Build a "current state" snapshot grounded in code evidence.

If context is insufficient, ask focused clarification questions early.

### Phase 2.5: Audit ledger (required)

Build a short evidence ledger before planning decisions:

1. `Evidence reviewed`
   - list key files/docs examined
2. `Observed current behavior`
   - what the system does now (based on code/docs)
3. `Gaps or inconsistencies`
   - missing docs, stale docs, conflicting implementations
4. `Confidence`
   - high / medium / low with one-line reason

Do not proceed to final plan output without this ledger.

### Phase 3: Architectural analysis

Derive and document:

1. Problem statement and desired outcome.
2. Constraints (technical, product, operational, compliance).
3. Dependencies:
   - code dependencies
   - service/vendor dependencies
   - sequencing dependencies
4. Impact radius:
   - frontend surfaces
   - backend services/routes/jobs/models
   - data schemas and migrations
   - observability/ops/docs/tests
5. Risks and failure modes:
   - functional regressions
   - performance and scalability risks
   - security/privacy risks
   - rollout/release risks
6. Edge cases and negative paths.

Also include a decision rationale table:
- decision
- evidence used
- alternatives considered
- why selected

### Phase 4: Spec-driven plan synthesis

Generate an SDD-style plan with these sections:

1. `Title`
2. `Objective`
3. `Background / Current State`
4. `Scope`
   - in scope
   - out of scope
5. `Assumptions`
6. `Requirements`
   - functional requirements
   - non-functional requirements
7. `Architecture & Design Notes`
8. `Execution Plan`
   - phases
   - milestones
   - actionable tasks per milestone
   - owner suggestions (optional)
9. `Dependencies & Blockers`
10. `Risks & Mitigations`
11. `Acceptance Criteria`
12. `Validation Plan`
   - test strategy
   - manual verification steps
   - observability/metrics checks
13. `Rollout / Rollback`
14. `Documentation Updates Needed`
15. `Open Questions`

Task quality requirements:
- each task is concrete and verifiable
- each phase has a clear exit criterion
- dependencies are explicit and ordered
- validation is tied to acceptance criteria

### Phase 5: Self-review and refinement loop

Before presenting, run this checklist:

- Is the plan grounded in actual repo context?
- Are assumptions and unknowns explicit?
- Are dependencies and sequencing complete?
- Are risks and edge cases adequately covered?
- Are acceptance criteria testable and unambiguous?
- Is there a practical validation and rollback path?
- Is the plan over-engineered or missing simplicity opportunities?

If any answer is weak, revise once before final output.

## Skill orchestration policy

When needed, proactively use other skills/tools:

1. `context7` documentation skill for framework/library/API specifics.
2. Codebase exploration/search tooling when architecture context is unclear.
3. Code-review skill when plan quality or risk analysis needs stronger critique.
4. Domain/platform skills (cloud, database, security, deployment) when relevant.

If no existing skill adequately covers a recurring planning gap:
1. State the gap explicitly.
2. Propose a specialized sub-skill name and purpose.
3. Optionally scaffold it if the user asks.

## Output format

Use this structure by default:

```markdown
# <Plan title>

## Objective
...

## Background / Current State
...

## Audit Ledger
### Evidence reviewed
- ...
### Observed current behavior
- ...
### Gaps or inconsistencies
- ...
### Confidence
- High/Medium/Low: ...

## Scope
### In scope
- ...
### Out of scope
- ...

## Assumptions
- ...

## Requirements
### Functional
- ...
### Non-functional
- ...

## Architecture & Design Notes
- ...

## Decision Rationale
- Decision: ...
  Evidence: ...
  Alternatives: ...
  Reason selected: ...

## Execution Plan
### Phase 1: ...
Goal: ...
Tasks:
- [ ] ...
Exit criteria:
- ...

### Phase 2: ...
...

## Dependencies & Blockers
- ...

## Risks & Mitigations
- Risk: ...
  Mitigation: ...

## Acceptance Criteria
- ...

## Validation Plan
- Automated tests: ...
- Manual checks: ...
- Metrics/observability: ...

## Rollout / Rollback
- ...

## Documentation Updates Needed
- ...

## Open Questions
- ...
```

## Quality bar

A valid plan must be:
- technically grounded
- sequenced and executable
- risk-aware
- testable
- concise but complete

Never return a plan that is only a generic checklist.
