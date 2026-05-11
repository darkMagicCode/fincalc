import { Button, Stack } from "@mui/material";

export function WizardActions({
  activeStep,
  stepCount,
  isPending,
  onBack,
  onNext,
  onGetQuotes,
}: {
  activeStep: number;
  stepCount: number;
  isPending: boolean;
  onBack: () => void;
  onNext: () => void;
  onGetQuotes: () => void;
}) {
  const isLastStep = activeStep >= stepCount - 1;

  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={1} justifyContent="space-between">
      <Button
        variant="outlined"
        onClick={onBack}
        disabled={activeStep === 0 || isPending}
      >
        Back
      </Button>

      {!isLastStep ? (
        <Button variant="contained" onClick={onNext} disabled={isPending}>
          Next
        </Button>
      ) : (
        <Button
          variant="contained"
          color="secondary"
          onClick={onGetQuotes}
          disabled={isPending}
          aria-label="Get courier quotes"
        >
          {isPending ? "Searching…" : "Get quotes"}
        </Button>
      )}
    </Stack>
  );
}
