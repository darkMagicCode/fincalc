export type QuoteAsyncStatus = "idle" | "loading" | "success" | "empty" | "error";

export type QuoteSearchState =
  | { status: "idle" }
  | { status: "loading" }
  | {
      status: "success";
      data: CourierRate[];
      failedCourierIds?: string[];
    }
  | { status: "empty" }
  | { status: "error"; message: string };

export interface CourierRate {
  id: string;
  name: string;
  logoUrl: string;
  basePrice: number;
  tax: number;
  total: number;
  etaDays: number;
  currency: string;
}

export interface QuoteFormValues {
  origin: {
    city: string;
    countryCode: string;
  };
  destination: {
    city: string;
    countryCode: string;
  };
  package: {
    weightKg: number;
    lengthCm: number;
    widthCm: number;
    heightCm: number;
    isInternational: boolean;
  };
}

export const defaultQuoteFormValues: QuoteFormValues = {
  origin: { city: "", countryCode: "" },
  destination: { city: "", countryCode: "" },
  package: {
    weightKg: 1,
    lengthCm: 10,
    widthCm: 10,
    heightCm: 10,
    isInternational: false,
  },
};
