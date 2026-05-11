import type { ComponentProps } from "react";
import { Box, Typography } from "@mui/material";
import type { CourierRate } from "@/types/quote.types";
import { WizardActions } from "@/components/forms/WizardActions";

export function MobileWizardActionBar({
  selectedCourier,
  zIndex,
  ...wizardActionsProps
}: ComponentProps<typeof WizardActions> & {
  selectedCourier: CourierRate | null;
  zIndex: number;
}) {
  return (
    <Box
      sx={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex,
        px: 2,
        py: 1.5,
        bgcolor: "background.paper",
        borderTop: 1,
        borderColor: "divider",
        boxShadow: 8,
      }}
    >
      {selectedCourier ? (
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
          Selected: {selectedCourier.name} · {selectedCourier.currency}{" "}
          {selectedCourier.total.toFixed(2)}
        </Typography>
      ) : null}
      <WizardActions {...wizardActionsProps} />
    </Box>
  );
}
