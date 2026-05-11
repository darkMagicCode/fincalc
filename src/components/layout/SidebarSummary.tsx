import {
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useQuoteState } from "@/context/QuoteContext";

export function SidebarSummary({
  onGoToStep,
}: {
  onGoToStep?: (stepIndex: number) => void;
}) {
  const { summary } = useQuoteState();

  return (
    <Paper sx={{ p: 2, position: { md: "sticky" }, top: { md: 16 } }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 0.5 }}>
        <Typography variant="subtitle1" component="h2">
          Shipment summary
        </Typography>
        <Chip
          size="small"
          label={summary.isInternational ? "International" : "Domestic"}
          color={summary.isInternational ? "info" : "default"}
          variant={summary.isInternational ? "filled" : "outlined"}
        />
      </Stack>
      <Divider sx={{ my: 1.5 }} />
      <Stack spacing={1.5}>
        <SummaryBlock
          label="Origin"
          value={`${summary.originCity || "—"}, ${summary.originCountry || "—"}`}
          stepIndex={0}
          onGoToStep={onGoToStep}
        />
        <SummaryBlock
          label="Destination"
          value={`${summary.destinationCity || "—"}, ${summary.destinationCountry || "—"}`}
          stepIndex={1}
          onGoToStep={onGoToStep}
        />
        <SummaryBlock
          label="Weight"
          value={`${Number.isFinite(summary.weightKg) ? summary.weightKg : 0} kg actual`}
          stepIndex={2}
          onGoToStep={onGoToStep}
        />
        <Stack spacing={0.25}>
          <Typography variant="caption" color="text.secondary">
            Chargeable (billing)
          </Typography>
          <Typography variant="body2" fontWeight={600}>
            {Number.isFinite(summary.chargeableKg) ? summary.chargeableKg.toFixed(2) : "—"} kg
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}

function SummaryBlock({
  label,
  value,
  stepIndex,
  onGoToStep,
}: {
  label: string;
  value: string;
  stepIndex: number;
  onGoToStep?: (stepIndex: number) => void;
}) {
  return (
    <Stack spacing={0.25}>
      <Box display="flex" alignItems="center" justifyContent="space-between" gap={1}>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
        {onGoToStep ? (
          <Button
            type="button"
            size="small"
            onClick={() => onGoToStep(stepIndex)}
            sx={{ minWidth: 0, px: 0.5, py: 0, fontSize: "0.7rem" }}
          >
            Edit
          </Button>
        ) : null}
      </Box>
      <Typography variant="body2" fontWeight={600}>
        {value}
      </Typography>
    </Stack>
  );
}
