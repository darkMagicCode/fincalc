# Prompts archive (planning and agents)

This file complements the root [`PROMPTS.md`](../PROMPTS.md). **`PROMPTS.md`** is the canonical short disclosure for graders (what was prompted during implementation, manual edits, rejections, human-authored parts). **This file** focuses on **planning-phase** and **methodology** prompts—the kinds of requests sent to GPT, Claude, DeepSeek, or Cursor before and alongside coding.

## Relationship to root PROMPTS.md

| Topic | Where documented |
|--------|------------------|
| Wizard architecture (RHF + Zod + MUI), courier UI, async states, demo routing | [`PROMPTS.md`](../PROMPTS.md) § What I prompted for |
| Post-generation edits (international invariant, `useWatch`, mutation vs query hooks, lodash `minBy`, etc.) | [`PROMPTS.md`](../PROMPTS.md) § What I modified |
| Redux / broad `watch()` / selection clearing rejections | [`PROMPTS.md`](../PROMPTS.md) § What I rejected |
| Mock service, theme, README alignment | [`PROMPTS.md`](../PROMPTS.md) § What I authored directly |

## Planning-phase prompt themes (paraphrased)

Exact chat transcripts were not preserved verbatim; below are **faithful summaries** of intent so future readers understand what was asked of each model.

### Requirements analysis (GPT)

- Read the Interactive Shipping Calculator brief as a senior frontend engineer; list **functional requirements**, **non-functional** constraints (performance, UX states), and **ambiguous** spots that need a project-specific decision.
- Propose a **minimal** state model for the quote flow without over-scoping (avoid Redux unless justified).

### Requirements analysis (Claude, independent pass)

- Same brief; emphasize **validation rules**, **international vs domestic**, and **failure modes** for courier APIs.
- Suggest a **folder layout** and boundaries between form state vs fetched rates.

### Synthesis (GPT vs Claude → single plan)

- Given two requirement outlines, produce **one merged plan**: dedupe items, mark conflicts, pick a single recommendation per conflict with a one-line rationale.
- Prefer outcomes that match **TanStack Query + React Hook Form + Zod + MUI** and **lodash-es** where it reduces duplication.

### Cursor agent / skills (operational)

Examples of how skills were invoked in practice (natural-language triggers):

- “Apply SDD Plan Architect: audit the repo, audit ledger, phased execution, acceptance criteria.”
- “Apply Task DNA for the shipping calculator: must-haves, phases, submission checklist.”
- “UX pass as Senior Product Designer + UX Engineer: skeleton/empty/error, mobile-first, cheapest/fastest hierarchy.”
- “Refactor with Senior Refactor Standards only—behavior parity, split presentation vs context wiring.”

## Adding verbatim prompts later

If you export chats from ChatGPT, Claude, DeepSeek, or Cursor, paste them under dated subsections here or in separate files under `agentics/transcripts/` and link them from this document.
