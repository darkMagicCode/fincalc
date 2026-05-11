import { useEffect, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { normalizeIsoAlpha2 } from "@/constants/isoCountries";
import { useQuoteDispatch } from "@/context/QuoteContext";
import type { QuoteSummarySnapshot } from "@/context/quoteContext.types";
import type { QuoteFormValues } from "@/types/quote.types";
import { calcChargeableKg } from "@/utils/packageWeight";

/**
 * Pushes a narrow slice of form values into QuoteContext for the sidebar.
 */
export function FormSummarySync() {
  const dispatch = useQuoteDispatch();
  const { control } = useFormContext<QuoteFormValues>();

  const originCity = useWatch({ control, name: "origin.city" });
  const originCountry = useWatch({ control, name: "origin.countryCode" });
  const destinationCity = useWatch({ control, name: "destination.city" });
  const destinationCountry = useWatch({ control, name: "destination.countryCode" });
  const weightKg = useWatch({ control, name: "package.weightKg" });
  const lengthCm = useWatch({ control, name: "package.lengthCm" });
  const widthCm = useWatch({ control, name: "package.widthCm" });
  const heightCm = useWatch({ control, name: "package.heightCm" });
  const isInternational = useWatch({ control, name: "package.isInternational" });

  const chargeableKg = useMemo(
    () =>
      calcChargeableKg({
        weightKg: Number(weightKg) || 0,
        lengthCm: Number(lengthCm) || 0,
        widthCm: Number(widthCm) || 0,
        heightCm: Number(heightCm) || 0,
      }),
    [lengthCm, widthCm, heightCm, weightKg],
  );

  const summary = useMemo<QuoteSummarySnapshot>(
    () => ({
      originCity: originCity ?? "",
      originCountry: normalizeIsoAlpha2(originCountry ?? ""),
      destinationCity: destinationCity ?? "",
      destinationCountry: normalizeIsoAlpha2(destinationCountry ?? ""),
      weightKg: Number(weightKg) || 0,
      chargeableKg,
      isInternational: Boolean(isInternational),
    }),
    [
      chargeableKg,
      destinationCity,
      destinationCountry,
      isInternational,
      originCity,
      originCountry,
      weightKg,
    ],
  );

  useEffect(() => {
    dispatch({ type: "SYNC_SUMMARY", payload: summary });
  }, [dispatch, summary]);

  return null;
}
