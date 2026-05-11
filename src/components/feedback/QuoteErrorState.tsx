import { Alert, Button, Stack, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export function QuoteErrorState({
  message,
  onRetry,
  onEditShipment,
}: {
  message: string;
  onRetry: () => void;
  onEditShipment?: () => void;
}) {
  return (
    <Stack spacing={2} alignItems="flex-start" py={2}>
      <Stack direction="row" spacing={1} alignItems="center">
        <ErrorOutlineIcon color="error" />
        <Typography variant="h2">Quotes unavailable</Typography>
      </Stack>
      <Alert severity="error" sx={{ width: "100%" }}>
        {message}
      </Alert>
      <Typography variant="body2" color="text.secondary">
        You can retry the search. In production, other couriers may still return rates
        while one provider is down.
      </Typography>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1} width="100%">
        {onEditShipment ? (
          <Button variant="outlined" onClick={onEditShipment}>
            Edit shipment
          </Button>
        ) : null}
        <Button variant="contained" onClick={onRetry} aria-label="Retry quote search">
          Retry search
        </Button>
      </Stack>
    </Stack>
  );
}
