import { useMutation } from "@tanstack/react-query";
import { useQuoteDispatch } from "@/context/QuoteContext";
import { fetchCourierRates } from "@/services/courier.service";
import type { QuoteFormValues } from "@/types/quote.types";

export function useQuoteSearch() {
  const dispatch = useQuoteDispatch();

  return useMutation({
    mutationFn: (values: QuoteFormValues) => fetchCourierRates(values),
    onMutate: () => {
      dispatch({ type: "SET_SELECTED_COURIER", payload: null });
      dispatch({ type: "SET_SEARCH", payload: { status: "loading" } });
    },
    onSuccess: (result) => {
      if (result.rates.length === 0) {
        dispatch({ type: "SET_SEARCH", payload: { status: "empty" } });
        return;
      }
      dispatch({
        type: "SET_SEARCH",
        payload: {
          status: "success",
          data: result.rates,
          failedCourierIds: result.failedCourierIds,
        },
      });
    },
    onError: (err: Error) => {
      dispatch({
        type: "SET_SEARCH",
        payload: {
          status: "error",
          message: err.message || "Something went wrong",
        },
      });
    },
  });
}
