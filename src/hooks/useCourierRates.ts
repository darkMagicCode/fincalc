import { minBy } from "lodash-es";
import { useQuery } from "@tanstack/react-query";
import { fetchCourierRates } from "@/services/courier.service";
import type { CourierRate } from "@/types/quote.types";
import type { QuoteFormValues } from "@/types/quote.types";

export const COURIER_RATES_QUERY_KEY = "courierRates" as const;

function ratesQueryKey(params: QuoteFormValues) {
  return [
    COURIER_RATES_QUERY_KEY,
    params.origin.city,
    params.origin.countryCode,
    params.destination.city,
    params.destination.countryCode,
    params.package.weightKg,
    params.package.lengthCm,
    params.package.widthCm,
    params.package.heightCm,
    params.package.isInternational,
  ] as const;
}

export interface CourierRatesQueryMeta {
  cheapest: CourierRate | undefined;
  fastest: CourierRate | undefined;
}

export function useCourierRates(params: QuoteFormValues | null) {
  const query = useQuery({
    queryKey: params ? ratesQueryKey(params) : [COURIER_RATES_QUERY_KEY, "disabled"],
    queryFn: () => fetchCourierRates(params!),
    enabled: Boolean(params),
    staleTime: 60_000,
    retry: 2,
  });

  const rates = query.data?.rates ?? [];
  const meta: CourierRatesQueryMeta = {
    cheapest: minBy(rates, (r) => r.total),
    fastest: minBy(rates, (r) => r.etaDays),
  };

  return { ...query, meta };
}
