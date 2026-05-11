import { useEffect, useMemo, useRef } from "react";
import {
  Collapse,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { CourierResultsGrid } from "@/components/courier/CourierResultsGrid";
import { EmptyQuoteState } from "@/components/feedback/EmptyQuoteState";
import { QuoteErrorState } from "@/components/feedback/QuoteErrorState";
import { SkeletonCourierGrid } from "@/components/feedback/SkeletonCourierGrid";
import { useQuoteState } from "@/context/QuoteContext";

export function QuoteResultsSection({
  onRetrySearch,
  onResetToIdle,
  onGoToStep,
}: {
  onRetrySearch: () => void;
  onResetToIdle?: () => void;
  onGoToStep?: (stepIndex: number) => void;
}) {
  const { search, selectedCourier } = useQuoteState();
  const sectionRef = useRef<HTMLDivElement>(null);
  const prevStatusRef = useRef(search.status);

  useEffect(() => {
    if (search.status === "success" && prevStatusRef.current !== "success") {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    prevStatusRef.current = search.status;
  }, [search.status]);

  const liveMessage = useMemo(() => {
    if (search.status === "loading") return "Loading courier quotes.";
    if (search.status === "success") {
      return `${search.data.length} courier options returned.`;
    }
    if (search.status === "empty") return "No couriers found for this route.";
    if (search.status === "error") return `Quotes error: ${search.message}`;
    return "";
  }, [search]);

  return (
    <Paper
      ref={sectionRef}
      sx={{ p: 2, mt: 3, position: "relative" }}
      component="section"
      aria-labelledby="courier-rates-heading"
    >
      <Typography id="courier-rates-heading" variant="h2" component="h2">
        Courier rates
      </Typography>

      <Typography
        component="div"
        aria-live="polite"
        aria-atomic="true"
        sx={{
          position: "absolute",
          width: 1,
          height: 1,
          p: 0,
          m: -1,
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        {liveMessage}
      </Typography>

      <Stack spacing={2} sx={{ mt: 2 }}>
        <Collapse in={search.status === "idle"} unmountOnExit>
          <Typography variant="body2" color="text.secondary">
            Rates appear here after you finish the steps and tap Get quotes.
          </Typography>
        </Collapse>

        {search.status === "loading" ? <SkeletonCourierGrid /> : null}

        {search.status === "empty" ? (
          <EmptyQuoteState
            onReset={onResetToIdle ?? onRetrySearch}
            onEditDestination={() => onGoToStep?.(1)}
          />
        ) : null}

        {search.status === "error" ? (
          <QuoteErrorState
            message={search.message}
            onRetry={onRetrySearch}
            onEditShipment={() => onGoToStep?.(0)}
          />
        ) : null}

        {search.status === "success" ? (
          <CourierResultsGrid
            rates={search.data}
            failedCourierIds={search.failedCourierIds}
          />
        ) : null}

        {selectedCourier ? (
          <>
            <Divider />
            <Stack spacing={0.5}>
              <Typography variant="overline" color="text.secondary">
                Your selection
              </Typography>
              <Typography variant="body1" fontWeight={700}>
                {selectedCourier.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedCourier.currency} {selectedCourier.total.toFixed(2)} total · ETA{" "}
                {selectedCourier.etaDays} day{selectedCourier.etaDays === 1 ? "" : "s"}
              </Typography>
            </Stack>
          </>
        ) : null}
      </Stack>
    </Paper>
  );
}
