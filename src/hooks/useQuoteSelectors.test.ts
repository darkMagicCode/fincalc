import { describe, expect, it } from "vitest";
import { getCheapestAndFastestIds } from "@/hooks/useQuoteSelectors";
import type { CourierRate } from "@/types/quote.types";

const base = (overrides: Partial<CourierRate>): CourierRate => ({
  id: "x",
  name: "X",
  logoUrl: "",
  basePrice: 10,
  tax: 1,
  total: 11,
  etaDays: 3,
  currency: "USD",
  ...overrides,
});

describe("getCheapestAndFastestIds", () => {
  it("selects cheapest by total and fastest by etaDays", () => {
    const rates: CourierRate[] = [
      base({ id: "a", total: 50, etaDays: 2 }),
      base({ id: "b", total: 30, etaDays: 5 }),
      base({ id: "c", total: 40, etaDays: 1 }),
    ];
    expect(getCheapestAndFastestIds(rates)).toEqual({
      cheapestId: "b",
      fastestId: "c",
    });
  });
});
