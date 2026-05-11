import { useMemo, useState } from "react";
import {
  Alert,
  Box,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { CourierCard } from "@/components/courier/CourierCard";
import { useCheapestAndFastest } from "@/hooks/useQuoteSelectors";
import type { CourierRate } from "@/types/quote.types";

type SortKey = "price" | "eta";

function formatFailedCouriers(ids: string[], rates: CourierRate[]): string {
  return ids
    .map((id) => {
      const match = rates.find((r) => r.id === id);
      return match ? match.name : id.toUpperCase();
    })
    .join(", ");
}

export function CourierResultsGridView({
  rates,
  failedCourierIds,
  onSelectRate,
  selectedCourierId = null,
}: {
  rates: CourierRate[];
  failedCourierIds?: string[];
  onSelectRate?: (rate: CourierRate) => void;
  /** When omitted, no card appears selected (e.g. `/demo` showcase). */
  selectedCourierId?: string | null;
}) {
  const { cheapestId, fastestId } = useCheapestAndFastest(rates);
  const [sortBy, setSortBy] = useState<SortKey>("price");

  const sortedRates = useMemo(() => {
    const copy = [...rates];
    copy.sort((a, b) => {
      if (sortBy === "price") return a.total - b.total;
      return a.etaDays - b.etaDays;
    });
    return copy;
  }, [rates, sortBy]);

  const selectedId = selectedCourierId;

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1}
        alignItems={{ xs: "stretch", sm: "center" }}
        justifyContent="space-between"
      >
        <Typography variant="body2" color="text.secondary">
          {rates.length} option{rates.length === 1 ? "" : "s"}
        </Typography>
        <ToggleButtonGroup
          exclusive
          size="small"
          value={sortBy}
          onChange={(_, value: SortKey | null) => {
            if (value) setSortBy(value);
          }}
          aria-label="Sort courier results"
        >
          <ToggleButton value="price">Lowest price</ToggleButton>
          <ToggleButton value="eta">Fastest ETA</ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      {failedCourierIds?.length ? (
        <Alert severity="warning">
          Some couriers could not return a rate:{" "}
          {formatFailedCouriers(failedCourierIds, rates)}.
        </Alert>
      ) : null}
      <Box
        display="grid"
        gap={2}
        gridTemplateColumns={{
          xs: "1fr",
          sm: "repeat(2, minmax(0, 1fr))",
          md: "repeat(3, minmax(0, 1fr))",
        }}
      >
        {sortedRates.map((rate) => (
          <CourierCard
            key={rate.id}
            rate={rate}
            isCheapest={rate.id === cheapestId}
            isFastest={rate.id === fastestId}
            isSelected={rate.id === selectedId}
            onSelect={onSelectRate ?? (() => undefined)}
          />
        ))}
      </Box>
    </Box>
  );
}
