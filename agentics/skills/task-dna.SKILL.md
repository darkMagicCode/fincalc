> **Archival snapshot** — 2026-05-11  
> **Source:** `.cursor/skills/task-dna/SKILL.md` (this repository)  
> **Note:** Frozen copy for submission and repo portability; the project skill may evolve in `.cursor/skills/`.

---

---
name: task-dna
description: Converts product-style frontend assignments into a complete execution DNA with required deliverables, nice-to-have upgrades, senior recommendations, architecture, validation, and submission checklist. Use when the user asks to analyze, plan, or implement a coding task and wants must-have plus senior polish.
disable-model-invocation: true
---

# Task DNA

## Purpose

Use this skill to transform an assignment into a delivery-ready execution plan that includes:
- Required scope
- Nice-to-have scope
- Senior recommendations
- Folder architecture
- State/data design
- Validation and performance constraints
- Documentation and submission requirements

For this project, the target assignment is **The Interactive Shipping Calculator**.

## Output Contract

Always produce the plan in this order:
1. `Problem Framing`
2. `Must-Have Requirements`
3. `Nice-to-Have Additions`
4. `Senior Recommendations`
5. `Proposed Architecture`
6. `Implementation Phases`
7. `Validation Strategy`
8. `Submission Checklist`

Keep each section concrete and implementation-oriented.

## Problem Framing

State the objective clearly:
- Build a "Quick Quote" engine for merchants making fast courier decisions.
- The UI must reduce cognitive load, highlight actionable trade-offs, and avoid operational mistakes.
- Stack: React + TypeScript + Material UI.

## Must-Have Requirements

### 1) Advanced Form Orchestration

- Multi-step flow with three stages:
  - Origin details
  - Destination details
  - Package dimensions (weight and volume inputs)
- Validation with Zod or Yup:
  - Weight must be greater than zero
  - International shipping must only be enabled when valid country codes are selected
- Performance requirements:
  - Prevent page-wide rerenders on every keystroke
  - Avoid subscribing to full form state globally
  - Keep field subscriptions local where possible

### 2) UI Architecture (MUI + CSS-in-JS)

- Build a modular `CourierCard` component with:
  - Courier brand (logo and name)
  - Price model (base price, tax, total)
  - ETA or delivery timeline
- Compute and visually highlight:
  - Cheapest option
  - Fastest option
- Use consistent design tokens via MUI theme, `sx`, or `styled()`

### 3) State Management and Data Flow

- Use `QuoteContext` to avoid prop drilling
- Sidebar summary must update in real time from form inputs (especially destination and weight)
- Async search states must be polished:
  - Loading: skeleton UI
  - Empty: explicit no-routes state
  - Success: courier comparison view

### 4) Responsive Layout

- Mobile-first:
  - Cards stacked vertically
- Desktop:
  - Multi-column comparison layout using MUI Grid or Box-based CSS grid

### 5) Deliverables

- Demo showcase in three states:
  - Initial/empty
  - Searching/loading
  - Success/results
- Clean TypeScript codebase with clear structure
- `README.md` with:
  - API-down handling strategy (example: DHL unavailable)
  - Slow 3G bundle optimization strategy
- `PROMPTS.md` with AI usage disclosure

## Nice-to-Have Additions

- Volumetric weight preview and chargeable weight hint in package step
- Partial failure handling:
  - Show available couriers even if one provider fails
  - Inline notice for failed provider
- Dedicated error state UI with retry action
- Debounced summary calculations for expensive derived values
- URL query persistence for shareable quote presets
- Accessible keyboard flow and clear aria labels
- Subtle result transitions (avoid heavy animation)

## Senior Recommendations

- Prefer a typed async union state over boolean chains:
  - idle, loading, success, empty, error
- Keep validation centralized in a root schema and gate per-step progression with targeted triggers
- Split context responsibly:
  - Keep context minimal and stable
  - Memoize exposed values
- Compute cheapest/fastest from normalized rates in one place (selector/hook), not per card
- Use optimistic perceived performance:
  - Skeletons that resemble final card layout
- Design for resilience:
  - Per-courier isolation
  - Retry with backoff
  - Graceful fallback messages
- Design for low-bandwidth markets:
  - Lazy-loaded heavy sections
  - Import discipline for tree-shaking
  - Lightweight assets for logos/icons

## Proposed Architecture

Use this baseline structure:

```txt
src/
  app/
  components/
    forms/
      quote-wizard/
      steps/
    courier/
      courier-card/
      courier-grid/
    feedback/
      skeletons/
      empty-state/
      error-state/
    layout/
      sidebar-summary/
  context/
    quote-context.tsx
  hooks/
    use-quote-summary.ts
    use-courier-rates.ts
    use-quote-selectors.ts
  schemas/
    quote.schema.ts
  services/
    courier.service.ts
  mocks/
    rates.mock.ts
  theme/
    fincart-theme.ts
  types/
    quote.types.ts
```

## Implementation Phases

### Phase 1: Foundation
- Define all domain types
- Implement form schema and validation rules
- Create context and selectors
- Add mock data + service layer

### Phase 2: Form Flow
- Build step container and navigation
- Add step components and field bindings
- Enforce step-level progression rules
- Feed live sidebar summary

### Phase 3: Results and Comparison
- Implement async fetch hook and state transitions
- Build `CourierCard` and results grid
- Add cheapest/fastest decoration logic

### Phase 4: Polishing and Responsiveness
- Finalize mobile/desktop behavior
- Add skeleton, empty, and error states
- Ensure visual hierarchy and readability

### Phase 5: Docs and Submission
- Write README senior-touch sections
- Write PROMPTS disclosure with real decision notes
- Validate TypeScript/lint/build and publish demo URL

## Validation Strategy

Always verify:
- Functional:
  - Step flow and validation gates
  - Price/tax/total consistency
  - Correct cheapest and fastest tagging
- State:
  - Clean transition across idle/loading/success/empty/error
  - Partial failure behavior
- Performance:
  - No full-page rerender per keystroke
  - Stable sidebar updates
- Responsive:
  - Vertical stack on small screens
  - Multi-column compare on desktop
- Accessibility:
  - Keyboard navigation
  - Proper labels and semantics

## README Content Requirements

Include a short section for each:

1) API Error Handling (example DHL down):
- Per-courier isolation (do not fail all results)
- Retry policy
- User-facing warning
- Recovery action (retry CTA)

2) Slow 3G Optimization:
- Route/component code splitting
- Import and bundle hygiene
- Asset optimization
- Perceived performance improvements

## PROMPTS.md Requirements

Document:
- What AI was used for
- Which outputs were modified manually
- Which suggestions were rejected and why
- What was authored directly by the engineer

Be explicit and honest; avoid generic statements.

## Submission Checklist

Use this completion list before handoff:

- [ ] Three-step form works end-to-end
- [ ] Validation enforces weight and country code rules
- [ ] No unnecessary rerender behavior from form typing
- [ ] Sidebar updates live from context
- [ ] Courier card shows branding, price breakdown, ETA
- [ ] Cheapest/Fastest tags are correct
- [ ] Loading skeleton state implemented
- [ ] Empty state implemented
- [ ] Responsive mobile + desktop layout confirmed
- [ ] Demo URL available and working
- [ ] README includes API-failure and 3G strategy
- [ ] PROMPTS.md added with AI disclosure
