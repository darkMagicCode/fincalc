import { useCallback } from "react";
import type { UseFormGetValues, UseFormSetError } from "react-hook-form";
import { useQuoteDispatch } from "@/context/QuoteContext";
import { quoteFormSchema } from "@/schemas/quote.schema";
import type { QuoteFormValues } from "@/types/quote.types";
import { applyZodIssues } from "@/utils/applyZodIssues";
import { useQuoteSearch } from "@/hooks/useQuoteSearch";

export function useQuoteSubmission({
  getValues,
  setError,
  clearErrors,
}: {
  getValues: UseFormGetValues<QuoteFormValues>;
  setError: UseFormSetError<QuoteFormValues>;
  clearErrors: () => void;
}) {
  const dispatch = useQuoteDispatch();
  const mutation = useQuoteSearch();

  const submit = useCallback(
    (values: QuoteFormValues) => {
      clearErrors();
      const parsed = quoteFormSchema.safeParse(values);
      if (!parsed.success) {
        applyZodIssues(setError, parsed.error.issues);
        return;
      }
      mutation.mutate(parsed.data);
    },
    [clearErrors, mutation, setError],
  );

  const retry = useCallback(() => {
    clearErrors();
    const parsed = quoteFormSchema.safeParse(getValues());
    if (!parsed.success) {
      applyZodIssues(setError, parsed.error.issues);
      return;
    }
    mutation.mutate(parsed.data);
  }, [clearErrors, getValues, mutation, setError]);

  const resetToIdle = useCallback(() => {
    dispatch({ type: "SET_SEARCH", payload: { status: "idle" } });
  }, [dispatch]);

  return {
    submit,
    retry,
    resetToIdle,
    isPending: mutation.isPending,
  };
}
