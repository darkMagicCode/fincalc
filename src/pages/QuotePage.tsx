import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Link as MuiLink,
  Stack,
  Typography,
} from "@mui/material";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import { Link as RouterLink } from "react-router-dom";
import { QuoteWizard } from "@/components/forms/QuoteWizard";
import { SidebarSummary } from "@/components/layout/SidebarSummary";

export function QuotePage() {
  const [activeStep, setActiveStep] = useState(0);
  const [summaryDrawerOpen, setSummaryDrawerOpen] = useState(false);

  const goToStep = (step: number) => {
    setActiveStep(step);
    setSummaryDrawerOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3, pb: { xs: 18, md: 3 } }}>
      <Stack
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: 2 }}
      >
        <Stack spacing={1}>
          <Typography variant="h1">Fincart Quick Quote</Typography>
          <Typography variant="body2" color="text.secondary">
            Compare courier totals, taxes, and delivery times in one flow.
          </Typography>
        </Stack>
        <IconButton
          component={RouterLink}
          to="/demo"
          color="primary"
          aria-label="Open component showcase"
          sx={{ display: { xs: "none", sm: "inline-flex" } }}
        >
          <MenuBookOutlinedIcon />
        </IconButton>
      </Stack>

      <MuiLink
        component={RouterLink}
        to="/demo"
        variant="body2"
        sx={{ display: { xs: "inline-block", sm: "none" }, mb: 2 }}
      >
        Component showcase
      </MuiLink>

      <Button
        type="button"
        variant="outlined"
        fullWidth
        startIcon={<SummarizeOutlinedIcon />}
        onClick={() => setSummaryDrawerOpen(true)}
        sx={{ display: { xs: "flex", md: "none" }, mb: 2 }}
      >
        Shipment summary
      </Button>

      <Box
        display="grid"
        gap={2}
        gridTemplateColumns={{ xs: "1fr", md: "minmax(0, 1fr) 320px" }}
        alignItems="start"
      >
        <Box minWidth={0}>
          <QuoteWizard activeStep={activeStep} onActiveStepChange={goToStep} />
        </Box>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <SidebarSummary onGoToStep={goToStep} />
        </Box>
      </Box>

      <Drawer
        anchor="right"
        open={summaryDrawerOpen}
        onClose={() => setSummaryDrawerOpen(false)}
        PaperProps={{ sx: { width: "min(100%, 360px)" } }}
      >
        <Box sx={{ p: 2 }}>
          <SidebarSummary onGoToStep={goToStep} />
        </Box>
      </Drawer>
    </Container>
  );
}
