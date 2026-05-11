# Workflow: from analysis to implementation

This is the human + multi-model process used for the **Interactive Shipping Calculator** task, before and during implementation in this repo.

## 1. Deep self-analysis

I started by breaking down the brief on my own: what “Quick Quote” had to mean for a merchant, which trade-offs to surface (price vs speed), and where mistakes are costly (wrong country pair, bad weight). That framed non-negotiables before any model output.

## 2. Stack decisions (TanStack Query + lodash-es)

Early on I committed to:

- **TanStack Query** for async quote/search lifecycle (caching semantics, retries, clear loading/error boundaries) alongside React Hook Form + Zod for the wizard.
- **lodash-es** for small, tree-shakeable helpers (e.g. `minBy` for cheapest/fastest derivation) instead of hand-rolled loops scattered across components.

These choices stayed consistent through later planning and refactors.

## 3. Multi-model requirements pass

- I used **GPT** to stress-test and expand my reading of the task requirements (edge cases, wording gaps).
- I used **Claude** separately for another pass on the same requirements to get an independent structure and risk list.

## 4. Synthesis (GPT vs Claude) in DeepSeek and Cursor

I compared outputs side by side—using **DeepSeek** and **Cursor** as environments to diff, merge, and trim duplication. The goal was not “winner takes all” but a **single consolidated plan**: one set of phases, one validation strategy, and explicit rejections (what we would not build).

## 5. Applying Cursor skills (order)

After the unified plan existed, I applied skills in this sequence:

1. **SDD Plan Architect** — formalized the plan (scope, assumptions, risks, acceptance criteria, validation).
2. **Task DNA** — aligned execution with the assignment’s must-haves, folder-level architecture, and submission checklist.
3. **Senior Product Designer + UX Engineer** — refined flows, empty/loading/error behavior, hierarchy, and responsive behavior.
4. **Senior Refactor Standards** — tightened structure and naming while preserving behavior (split presentational vs wired components, narrow subscriptions, etc.).

Implementation details of what was prompted during coding and what was edited afterward are summarized in the root [`PROMPTS.md`](../PROMPTS.md).
