import { Controller, useFormContext } from "react-hook-form";
import { Stack, TextField } from "@mui/material";
import type { QuoteFormValues } from "@/types/quote.types";

export function StepOrigin() {
  const { control } = useFormContext<QuoteFormValues>();

  return (
    <Stack spacing={2}>
      <Controller
        name="origin.city"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="City"
            autoComplete="shipping origin-city"
            error={Boolean(fieldState.error)}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="origin.countryCode"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Country code (ISO alpha-2)"
            inputProps={{ maxLength: 2, style: { textTransform: "uppercase" } }}
            autoComplete="off"
            error={Boolean(fieldState.error)}
            helperText={
              fieldState.error?.message ?? "Example: AE, US, GB"
            }
          />
        )}
      />
    </Stack>
  );
}
