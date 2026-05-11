import { CourierResultsGridView } from "@/components/courier/CourierResultsGridView";
import { useQuoteDispatch, useQuoteState } from "@/context/QuoteContext";
import type { CourierRate } from "@/types/quote.types";

export function CourierResultsGrid({
  rates,
  failedCourierIds,
}: {
  rates: CourierRate[];
  failedCourierIds?: string[];
}) {
  const dispatch = useQuoteDispatch();
  const { selectedCourier } = useQuoteState();

  return (
    <CourierResultsGridView
      rates={rates}
      failedCourierIds={failedCourierIds}
      selectedCourierId={selectedCourier?.id ?? null}
      onSelectRate={(rate: CourierRate) =>
        dispatch({ type: "SET_SELECTED_COURIER", payload: rate })
      }
    />
  );
}
