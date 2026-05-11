import type { CourierRate, QuoteSearchState } from "@/types/quote.types";

export interface QuoteSummarySnapshot {
  originCity: string;
  originCountry: string;
  destinationCity: string;
  destinationCountry: string;
  weightKg: number;
  /** Billable weight: max(actual kg, volumetric kg). */
  chargeableKg: number;
  isInternational: boolean;
}

export type QuoteContextAction =
  | { type: "SYNC_SUMMARY"; payload: Partial<QuoteSummarySnapshot> }
  | { type: "SET_SEARCH"; payload: QuoteSearchState }
  | { type: "SET_SELECTED_COURIER"; payload: CourierRate | null }
  | { type: "RESET" };

export interface QuoteStateValue {
  summary: QuoteSummarySnapshot;
  search: QuoteSearchState;
  selectedCourier: CourierRate | null;
}

export const defaultSummary: QuoteSummarySnapshot = {
  originCity: "",
  originCountry: "",
  destinationCity: "",
  destinationCountry: "",
  weightKg: 1,
  chargeableKg: 1,
  isInternational: false,
};
