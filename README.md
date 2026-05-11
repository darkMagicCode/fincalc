# Interactive Shipping Calculator (Fincart Quick Quote)

**Live demo:** replace after first Vercel deploy — `https://<your-project>.vercel.app` (see [Vercel](https://vercel.com) project settings → Domains).

React + TypeScript + Material UI + React Hook Form + Zod + TanStack Query.

## Run locally

```bash
npm install
npm run dev
```

## Demo routes

- App: `/`
- Reviewer showcase (Initial / Loading / Success): `/demo?state=initial`, `/demo?state=loading`, `/demo?state=success`

## Architecture (state split)

- **React Context** (`QuoteProvider`) holds **UI and session state**: which courier is selected, how the results panel should render from the wizard-driven flow (idle / loading / success / empty / error). That state is client-owned and coordinated across layout — Context fits without turning into a cache for remote data.
- **TanStack Query** owns **server state**: async fetch/mutation lifecycle for courier rates (pending/error/retry semantics, plus optional caching patterns via `useQuery` helpers). Network-backed data stays out of Context so we don’t duplicate fetch orchestration or blur server truth with UI-only concerns.

## API error strategy (assignment)

- **Per-courier isolation:** one courier failing does not blank the whole quote; remaining carriers still render (`failedCourierIds` + inline warning).
- **TanStack Query:** the wizard uses **`useQuoteSearch` → `useMutation`** — quotes load when the user submits the last step or taps **Retry** (each run calls `mutate` with validated form values). Dispatch handlers map loading / success / empty / error into **`QuoteSearchState`** for the results panel.
- **Query helper (not wired into the wizard):** `useCourierRates` in `src/hooks/useCourierRates.ts` is a **`useQuery`** example with `staleTime: 60_000` and `retry: 2` (covered by unit tests); use it if you promote caching or background refetch later.
- **User recovery:** dedicated **Error** UI with **Retry** (same `mutate` path as submit); **Empty** state with reset/idle CTA.
- **Future hardening:** circuit breaker / per-provider timeouts when integrating real carrier APIs.

### Failure matrix

How the mock service (`fetchCourierRates`) and UI map outcomes:

| Mode | Condition | Result UI |
|------|-----------|-----------|
| **Full outage** | Request fails (throws). | **Error** state — message + **Retry** (`mutate` again). |
| **Partial outage** | Request succeeds but one or more carriers drop out (`failedCourierIds`). | **Success** — remaining quotes in the grid + inline warning listing missing carriers. |
| **Empty route** | Request succeeds with **no** quotes (`rates` is empty). | **Empty** state — “no couriers for this route” + idle/reset path. |

The mock simulates partial outage by occasionally excluding DHL while keeping other carriers; empty can come from a route with no coverage or from tests (`forceEmpty`).

## 3G / bundle optimization (assignment)

- **Code splitting:** `React.lazy` + `Suspense` for wizard steps and the `/demo` showcase route.
- **MUI:** tree-shakeable imports from `@mui/material/*` where practical.
- **lodash-es:** `minBy` for derived cheapest/fastest (ESM-friendly).
- **Logos:** remote Clearbit URLs with `loading="lazy"` + `preconnect` to `logo.clearbit.com` in `index.html`.
- **Perceived performance:** skeleton grid mirrors final card layout.
- **Verify:** `npm run build` and inspect `dist/assets` chunk sizes; add `rollup-plugin-visualizer` when the app grows.

## Tests

```bash
npm test
```

## AI usage

See [`PROMPTS.md`](PROMPTS.md).
