import { Controller, useFormContext, useWatch } from "react-hook-form";
import { Alert, Stack, TextField } from "@mui/material";
import type { QuoteFormValues } from "@/types/quote.types";

export function StepDestination() {
  const { control } = useFormContext<QuoteFormValues>();
  const isInternational = useWatch({ control, name: "package.isInternational" });

  return (
    <Stack spacing={2}>
      {isInternational ? (
        <Alert severity="info" variant="outlined">
          International route — rates include customs-ready lanes where available.
        </Alert>
      ) : null}
      <Controller
        name="destination.city"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="City"
            autoComplete="shipping destination-city"
            error={Boolean(fieldState.error)}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="destination.countryCode"
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
