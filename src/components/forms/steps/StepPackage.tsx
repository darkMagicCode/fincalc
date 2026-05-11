import { useMemo } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { Paper, Stack, TextField, Typography } from "@mui/material";
import type { QuoteFormValues } from "@/types/quote.types";
import { calcChargeableKg, calcVolumetricKg } from "@/utils/packageWeight";

export function StepPackage() {
  const {
    control,
    formState: { errors },
  } = useFormContext<QuoteFormValues>();
  const lengthCm = useWatch({ control, name: "package.lengthCm" });
  const widthCm = useWatch({ control, name: "package.widthCm" });
  const heightCm = useWatch({ control, name: "package.heightCm" });
  const weightKg = useWatch({ control, name: "package.weightKg" });

  const volumetricKg = useMemo(
    () =>
      calcVolumetricKg(
        Number(lengthCm) || 0,
        Number(widthCm) || 0,
        Number(heightCm) || 0,
      ),
    [lengthCm, widthCm, heightCm],
  );

  const chargeableKg = useMemo(
    () =>
      calcChargeableKg({
        weightKg: Number(weightKg) || 0,
        lengthCm: Number(lengthCm) || 0,
        widthCm: Number(widthCm) || 0,
        heightCm: Number(heightCm) || 0,
      }),
    [weightKg, lengthCm, widthCm, heightCm],
  );

  return (
    <Stack spacing={2}>
      <Controller
        name="package.weightKg"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            type="number"
            label="Weight (kg)"
            inputProps={{ min: 0, step: 0.1 }}
            error={Boolean(fieldState.error)}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Controller
          name="package.lengthCm"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              type="number"
              label="Length (cm)"
              fullWidth
              inputProps={{ min: 0, step: 0.1 }}
              error={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="package.widthCm"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              type="number"
              label="Width (cm)"
              fullWidth
              inputProps={{ min: 0, step: 0.1 }}
              error={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="package.heightCm"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              type="number"
              label="Height (cm)"
              fullWidth
              inputProps={{ min: 0, step: 0.1 }}
              error={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Stack>
      <Paper variant="outlined" sx={{ p: 2, bgcolor: "action.hover" }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Chargeable weight
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Volumetric: {volumetricKg.toFixed(2)} kg · Actual:{" "}
          {(Number(weightKg) || 0).toFixed(2)} kg
        </Typography>
        <Typography variant="h2" component="p" sx={{ fontSize: "1.5rem", mt: 0.5 }}>
          {chargeableKg.toFixed(2)} kg billable
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
          Carriers bill the greater of actual or volumetric weight (L×W×H÷5000).
        </Typography>
      </Paper>
      {errors.package?.isInternational?.message ? (
        <Typography variant="body2" color="error" role="alert">
          {errors.package.isInternational.message}
        </Typography>
      ) : null}
    </Stack>
  );
}
