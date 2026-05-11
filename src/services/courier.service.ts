import { mockCourierRates } from "@/mocks/rates.mock";
import type { CourierRate } from "@/types/quote.types";
import type { QuoteFormValues } from "@/types/quote.types";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface FetchRatesResult {
  rates: CourierRate[];
  failedCourierIds: string[];
}

/**
 * Simulates multi-courier quote API with latency and optional partial failure (DHL).
 */
export async function fetchCourierRates(
  _input: QuoteFormValues,
  options?: { forceError?: boolean; forceEmpty?: boolean },
): Promise<FetchRatesResult> {
  await delay(1500);

  if (options?.forceError) {
    throw new Error("Rate service temporarily unavailable");
  }

  if (options?.forceEmpty) {
    return { rates: [], failedCourierIds: [] };
  }

  const failedCourierIds: string[] = [];
  let rates = [...mockCourierRates];

  // Simulate DHL outage ~35% of the time (deterministic enough for demos)
  const seed =
    _input.origin.countryCode +
    _input.destination.countryCode +
    String(_input.package.weightKg);
  const pseudoRandom = seed.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  if (pseudoRandom % 3 === 0) {
    rates = rates.filter((r) => r.id !== "dhl");
    failedCourierIds.push("dhl");
  }

  if (rates.length === 0) {
    return { rates: [], failedCourierIds };
  }

  return { rates, failedCourierIds };
}
