import { minBy } from "lodash-es";
import { useMemo } from "react";
import type { CourierRate } from "@/types/quote.types";

export function getCheapestAndFastestIds(rates: CourierRate[]): {
  cheapestId: string | null;
  fastestId: string | null;
} {
  if (!rates.length) {
    return { cheapestId: null, fastestId: null };
  }
  const cheapest = minBy(rates, (r) => r.total);
  const fastest = minBy(rates, (r) => r.etaDays);
  return {
    cheapestId: cheapest?.id ?? null,
    fastestId: fastest?.id ?? null,
  };
}

export function useCheapestAndFastest(rates: CourierRate[] | undefined) {
  return useMemo(() => getCheapestAndFastestIds(rates ?? []), [rates]);
}
