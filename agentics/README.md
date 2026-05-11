# Agentics: methodology, prompts, and skill archive

This folder documents **how** the Interactive Shipping Calculator task was planned and built using AI agents, Cursor skills, and multi-model analysis. The root [`PROMPTS.md`](../PROMPTS.md) remains the short **AI usage disclosure** required for the assignment; this directory is the **extended** record.

## Contents

| File / folder | Purpose |
|---------------|---------|
| [WORKFLOW.md](./WORKFLOW.md) | Chronological process: self-analysis, stack choices, GPT vs Claude synthesis, unified plan, and order of skill application. |
| [prompts.md](./prompts.md) | Planning- and agent-oriented prompts; points to root `PROMPTS.md` for implementation-phase disclosure. |
| [skills/](./skills/) | Frozen snapshots of the Cursor skills applied to this project (see below). |

## Skills applied (order)

1. **SDD Plan Architect** — spec-driven plans, audit ledger, phased execution, risks and acceptance criteria.  
   Snapshot: [skills/sdd-plan-architect.SKILL.md](./skills/sdd-plan-architect.SKILL.md)

2. **Task DNA** — assignment-specific must-haves, architecture sketch, validation and submission checklist.  
   Snapshot: [skills/task-dna.SKILL.md](./skills/task-dna.SKILL.md)

3. **Senior Product Designer + UX Engineer** — UX-first structure, states, hierarchy, accessibility and modern SaaS feel.  
   Snapshot: [skills/senior-product-designer-ux-engineer.SKILL.md](./skills/senior-product-designer-ux-engineer.SKILL.md)

4. **Senior Refactor Standards** — DRY, separation of concerns, behavior parity after structural cleanup.  
   Snapshot: [skills/senior-refactor-standards.SKILL.md](./skills/senior-refactor-standards.SKILL.md)

## Why snapshots?

Live Cursor skills live under `~/.cursor/skills/` (and project skills under `.cursor/skills/`). Copying them here keeps the repository **self-contained** for reviewers and preserves the instructions that shaped this build even if your local skills change later. Each file notes its **source path** and **snapshot date** at the top.
