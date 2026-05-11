import { Button, Stack, Typography } from "@mui/material";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";

export function EmptyQuoteState({
  onReset,
  onEditDestination,
}: {
  onReset?: () => void;
  onEditDestination?: () => void;
}) {
  return (
    <Stack spacing={2} alignItems="center" py={4} px={2}>
      <InboxOutlinedIcon sx={{ fontSize: 48, color: "text.secondary" }} />
      <Typography variant="h2" textAlign="center">
        No couriers for this route
      </Typography>
      <Typography variant="body2" color="text.secondary" textAlign="center" maxWidth={520}>
        Try a different destination or package profile. Rates can also be temporarily
        unavailable for specific carriers.
      </Typography>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1} width="100%" justifyContent="center">
        {onEditDestination ? (
          <Button variant="outlined" onClick={onEditDestination}>
            Edit destination
          </Button>
        ) : null}
        {onReset ? (
          <Button variant="contained" onClick={onReset}>
            Adjust shipment
          </Button>
        ) : null}
      </Stack>
    </Stack>
  );
}
