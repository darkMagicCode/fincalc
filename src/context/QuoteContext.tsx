/* eslint-disable react-refresh/only-export-components -- context module exports hooks */
import { createContext, useContext, useMemo, useReducer, type ReactNode } from "react";
import type {
  QuoteContextAction,
  QuoteStateValue,
} from "@/context/quoteContext.types";
import { defaultSummary } from "@/context/quoteContext.types";

const initialState: QuoteStateValue = {
  summary: defaultSummary,
  search: { status: "idle" },
  selectedCourier: null,
};

function quoteReducer(
  state: QuoteStateValue,
  action: QuoteContextAction,
): QuoteStateValue {
  switch (action.type) {
    case "SYNC_SUMMARY":
      return {
        ...state,
        summary: { ...state.summary, ...action.payload },
      };
    case "SET_SEARCH":
      return { ...state, search: action.payload };
    case "SET_SELECTED_COURIER":
      return { ...state, selectedCourier: action.payload };
    case "RESET":
      return { ...initialState };
    default:
      return state;
  }
}

const QuoteStateContext = createContext<QuoteStateValue | null>(null);
const QuoteDispatchContext = createContext<
  React.Dispatch<QuoteContextAction> | null
>(null);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(quoteReducer, initialState);

  const stateValue = useMemo(
    () => ({
      summary: state.summary,
      search: state.search,
      selectedCourier: state.selectedCourier,
    }),
    [state.summary, state.search, state.selectedCourier],
  );

  return (
    <QuoteDispatchContext.Provider value={dispatch}>
      <QuoteStateContext.Provider value={stateValue}>
        {children}
      </QuoteStateContext.Provider>
    </QuoteDispatchContext.Provider>
  );
}

export function useQuoteState(): QuoteStateValue {
  const ctx = useContext(QuoteStateContext);
  if (!ctx) {
    throw new Error("useQuoteState must be used within QuoteProvider");
  }
  return ctx;
}

export function useQuoteDispatch(): React.Dispatch<QuoteContextAction> {
  const ctx = useContext(QuoteDispatchContext);
  if (!ctx) {
    throw new Error("useQuoteDispatch must be used within QuoteProvider");
  }
  return ctx;
}

export type { QuoteContextAction };
