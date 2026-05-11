import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { isValidIsoAlpha2, normalizeIsoAlpha2 } from "@/constants/isoCountries";
import type { QuoteFormValues } from "@/types/quote.types";

/**
 * Keeps `package.isInternational` aligned with origin/destination ISO codes.
 * Subscribes only to country fields to avoid whole-form rerenders.
 */
export function InternationalSync() {
  const { setValue, control } = useFormContext<QuoteFormValues>();
  const originCc = useWatch({ control, name: "origin.countryCode" });
  const destCc = useWatch({ control, name: "destination.countryCode" });

  useEffect(() => {
    const o = normalizeIsoAlpha2(originCc ?? "");
    const d = normalizeIsoAlpha2(destCc ?? "");
    if (!isValidIsoAlpha2(o) || !isValidIsoAlpha2(d)) {
      return;
    }
    setValue("package.isInternational", o !== d, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [originCc, destCc, setValue]);

  return null;
}
