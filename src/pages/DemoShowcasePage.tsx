import { useMemo } from "react";
import {
  Alert,
  Container,
  Link as MuiLink,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import { CourierResultsGridView } from "@/components/courier/CourierResultsGridView";
import { SkeletonCourierGrid } from "@/components/feedback/SkeletonCourierGrid";
import { mockCourierRates } from "@/mocks/rates.mock";

type ShowcaseState = "initial" | "loading" | "success";

function isShowcaseState(v: string | null): v is ShowcaseState {
  return v === "initial" || v === "loading" || v === "success";
}

export function DemoShowcasePage() {
  const [params, setParams] = useSearchParams();
  const stateParam = params.get("state");
  const mode: ShowcaseState = isShowcaseState(stateParam) ? stateParam : "initial";

  const content = useMemo(() => {
    if (mode === "initial") {
      return (
        <Typography variant="body2" color="text.secondary">
          This is the <strong>initial / empty</strong> state (no results yet).
        </Typography>
      );
    }
    if (mode === "loading") {
      return <SkeletonCourierGrid />;
    }
    return (
      <CourierResultsGridView
        rates={mockCourierRates}
        failedCourierIds={["dhl"]}
      />
    );
  }, [mode]);

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Stack spacing={2}>
        <Stack spacing={1}>
          <Typography variant="h1" sx={{ fontSize: "1.75rem" }}>
            Component showcase
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Switch between the three required states. URL updates for easy reviewer verification
            (example: <code>/demo?state=loading</code>).{" "}
            <MuiLink component={RouterLink} to="/">
              Back to app
            </MuiLink>
            .
          </Typography>
        </Stack>

        <ToggleButtonGroup
          exclusive
          value={mode}
          onChange={(_, value: ShowcaseState | null) => {
            if (!value) return;
            const next = new URLSearchParams(params);
            next.set("state", value);
            setParams(next, { replace: true });
          }}
          aria-label="Showcase state"
          sx={{ flexWrap: "wrap" }}
        >
          <ToggleButton value="initial">Initial / Empty</ToggleButton>
          <ToggleButton value="loading">Searching / Loading</ToggleButton>
          <ToggleButton value="success">Results / Success</ToggleButton>
        </ToggleButtonGroup>

        <Alert severity="info" variant="outlined">
          Mock data only. In the main app demo, the quote API may omit DHL intermittently to simulate
          carrier outages — see the warning row in the success state.
        </Alert>

        {content}
      </Stack>
    </Container>
  );
}
