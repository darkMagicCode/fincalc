import { describe, expect, it } from "vitest";
import { COURIER_RATES_QUERY_KEY } from "@/hooks/useCourierRates";
import type { QuoteFormValues } from "@/types/quote.types";

describe("useCourierRates query key", () => {
  it("is stable for identical form values", () => {
    const a: QuoteFormValues = {
      origin: { city: "Dubai", countryCode: "AE" },
      destination: { city: "NYC", countryCode: "US" },
      package: {
        weightKg: 2,
        lengthCm: 10,
        widthCm: 10,
        heightCm: 10,
        isInternational: true,
      },
    };
    const b: QuoteFormValues = {
      ...a,
      origin: { ...a.origin },
      destination: { ...a.destination },
      package: { ...a.package },
    };
    const keyA = [
      COURIER_RATES_QUERY_KEY,
      a.origin.city,
      a.origin.countryCode,
      a.destination.city,
      a.destination.countryCode,
      a.package.weightKg,
      a.package.lengthCm,
      a.package.widthCm,
      a.package.heightCm,
      a.package.isInternational,
    ];
    const keyB = [
      COURIER_RATES_QUERY_KEY,
      b.origin.city,
      b.origin.countryCode,
      b.destination.city,
      b.destination.countryCode,
      b.package.weightKg,
      b.package.lengthCm,
      b.package.widthCm,
      b.package.heightCm,
      b.package.isInternational,
    ];
    expect(keyA).toEqual(keyB);
  });
});
