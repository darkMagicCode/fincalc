import { useMemo, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  Box,
  Fade,
  Paper,
  Stack,
  Step,
  StepButton,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  destinationStepSchema,
  originStepSchema,
} from "@/schemas/quote.schema";
import { defaultQuoteFormValues, type QuoteFormValues } from "@/types/quote.types";
import { applyZodIssues } from "@/utils/applyZodIssues";
import { FormSummarySync } from "@/components/forms/FormSummarySync";
import { InternationalSync } from "@/components/forms/InternationalSync";
import { MobileWizardActionBar } from "@/components/forms/MobileWizardActionBar";
import { WizardActions } from "@/components/forms/WizardActions";
import { StepDestination } from "@/components/forms/steps/StepDestination";
import { StepOrigin } from "@/components/forms/steps/StepOrigin";
import { StepPackage } from "@/components/forms/steps/StepPackage";
import { QuoteResultsSection } from "@/components/feedback/QuoteResultsSection";
import { useQuoteState } from "@/context/QuoteContext";
import { useQuoteSubmission } from "@/hooks/useQuoteSubmission";

const steps = ["Origin", "Destination", "Package"] as const;

const stepTitles = [
  "Where are you shipping from?",
  "Where is it going?",
  "Package size and weight",
] as const;

export function QuoteWizard({
  activeStep,
  onActiveStepChange,
}: {
  activeStep: number;
  onActiveStepChange: (step: number) => void;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { selectedCourier } = useQuoteState();
  const methods = useForm<QuoteFormValues>({
    defaultValues: defaultQuoteFormValues,
    mode: "onBlur",
  });

  const { handleSubmit, getValues, setError, clearErrors } = methods;
  const submission = useQuoteSubmission({ getValues, setError, clearErrors });

  const stepContent = useMemo(() => {
    if (activeStep === 0) return <StepOrigin />;
    if (activeStep === 1) return <StepDestination />;
    return <StepPackage />;
  }, [activeStep]);

  const validateStep = useCallback(
    (stepIndex: number): boolean => {
      const values = getValues();
      clearErrors();

      if (stepIndex === 0) {
        const parsed = originStepSchema.safeParse(values);
        if (!parsed.success) {
          applyZodIssues(setError, parsed.error.issues);
          return false;
        }
        return true;
      }

      if (stepIndex === 1) {
        const parsed = destinationStepSchema.safeParse(values);
        if (!parsed.success) {
          applyZodIssues(setError, parsed.error.issues);
          return false;
        }
        return true;
      }

      return true;
    },
    [clearErrors, getValues, setError],
  );

  const handleNext = () => {
    if (!validateStep(activeStep)) return;
    onActiveStepChange(Math.min(activeStep + 1, steps.length - 1));
  };

  const handleBack = () => {
    clearErrors();
    onActiveStepChange(Math.max(activeStep - 1, 0));
  };

  const handleStepClick = (index: number) => {
    if (index === activeStep) return;
    if (index < activeStep) {
      clearErrors();
      onActiveStepChange(index);
      return;
    }
    for (let i = activeStep; i < index; i++) {
      if (!validateStep(i)) return;
    }
    onActiveStepChange(index);
  };

  const wizardActionsProps = {
    activeStep,
    stepCount: steps.length,
    isPending: submission.isPending,
    onBack: handleBack,
    onNext: handleNext,
    onGetQuotes: handleSubmit(submission.submit),
  };

  return (
    <FormProvider {...methods}>
      <InternationalSync />
      <FormSummarySync />

      <Paper sx={{ p: 2, pb: { xs: 10, md: 2 } }}>
        <Stack spacing={2}>
          <Typography variant="subtitle1" component="p" color="text.secondary">
            Step {activeStep + 1} of {steps.length}
          </Typography>

          <Stepper activeStep={activeStep} nonLinear alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label} completed={index < activeStep}>
                <StepButton
                  color="inherit"
                  onClick={() => handleStepClick(index)}
                  disabled={submission.isPending}
                >
                  <StepLabel>{label}</StepLabel>
                </StepButton>
              </Step>
            ))}
          </Stepper>

          <Typography variant="h2" component="h2">
            {stepTitles[activeStep]}
          </Typography>

          <Fade in timeout={theme.transitions.duration.shorter} key={activeStep}>
            <Box>{stepContent}</Box>
          </Fade>

          {isMobile ? null : <WizardActions {...wizardActionsProps} />}
        </Stack>
      </Paper>

      {isMobile ? (
        <MobileWizardActionBar
          selectedCourier={selectedCourier}
          zIndex={theme.zIndex.appBar - 1}
          {...wizardActionsProps}
        />
      ) : null}

      <QuoteResultsSection
        onRetrySearch={submission.retry}
        onResetToIdle={submission.resetToIdle}
        onGoToStep={onActiveStepChange}
      />
    </FormProvider>
  );
}
