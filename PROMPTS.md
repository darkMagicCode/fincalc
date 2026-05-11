# AI usage disclosure

This repository was implemented with assistance from an AI coding agent.

## What I prompted for

- High-level architecture for a multi-step quote wizard using React Hook Form + Zod + MUI.
- UI structure for courier comparison cards with cheapest/fastest highlighting and merchant-first price hierarchy.
- Async UX states (skeleton / empty / error) and reviewer-friendly demo routing.

## What I modified after generation

- Enforced the explicit international invariant in Zod:
  `isInternational === (origin.countryCode !== destination.countryCode)`.
- Split courier results into `CourierResultsGridView` (presentational) vs `CourierResultsGrid` (context wiring) so `/demo` works without a `QuoteProvider`.
- Implemented `InternationalSync` + narrow `FormSummarySync` subscriptions (`useWatch` field paths) instead of broad `watch()` usage.
- Chose deterministic showcase toggles via `/demo?state=...` for reviewer verification.
- Implemented quote fetching with **`useQuoteSearch` + `useMutation`** (submit / retry both call `mutate`) and synced mutation lifecycle into the existing discriminated **union** `QuoteSearchState` for the results panel. Added **`useCourierRates` + `useQuery`** separately (`staleTime: 60_000`, stable `queryKey`, `retry: 2`) as a test-backed reference hook, not used by the wizard.
- Added dimension / volumetric sanity checks on the full `quoteFormSchema` (guards unrealistic shipment sizes).
- Used **`lodash-es` `minBy`** for cheapest/fastest derivation (tree-shaking friendly).

## What I rejected

- **Redux** for this scope: split Context (state vs dispatch) + TanStack Query keeps the assessment focused and avoids boilerplate.
- **Whole-form `watch()`** for sidebar updates: replaced with targeted `useWatch` paths.
- **Clearing selection on every success tick:** an early version wiped `selectedCourier` after each successful response; fixed so it clears in `onMutate` when a new search starts instead.

## What I authored directly

- Mock rate service with simulated latency + partial DHL outage behavior.
- Fincart-inspired MUI theme tokens.
- README / PROMPTS sections aligned with the brief (API resilience + 3G bundle strategy).

## Extended methodology

For the full workflow narrative (multi-model analysis, unified plan, order of Cursor skills applied), planning-phase prompt themes, and frozen snapshots of the skills used (**SDD Plan Architect**, **Task DNA**, **Senior Product Designer + UX Engineer**, **Senior Refactor Standards**), see [`agentics/README.md`](agentics/README.md).
