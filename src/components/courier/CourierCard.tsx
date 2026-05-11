import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import type { CourierRate } from "@/types/quote.types";

export interface CourierCardProps {
  rate: CourierRate;
  isCheapest: boolean;
  isFastest: boolean;
  isSelected?: boolean;
  onSelect: (rate: CourierRate) => void;
}

export function CourierCard({
  rate,
  isCheapest,
  isFastest,
  isSelected = false,
  onSelect,
}: CourierCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        transition: "box-shadow 160ms ease, transform 160ms ease, border-color 160ms ease",
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: isSelected ? "secondary.main" : "divider",
        "&:hover": {
          boxShadow: 4,
          transform: "translateY(-2px)",
        },
        ...(isSelected
          ? {
              boxShadow: 2,
            }
          : {}),
        "@media (prefers-reduced-motion: reduce)": {
          transition: "none",
          "&:hover": {
            transform: "none",
            boxShadow: isSelected ? 2 : 0,
          },
        },
      }}
    >
      {isSelected ? (
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "secondary.main",
            display: "flex",
            alignItems: "center",
          }}
          aria-hidden
        >
          <CheckCircleOutlineIcon fontSize="small" />
        </Box>
      ) : null}
      <CardHeader
        avatar={
          <Avatar
            variant="rounded"
            src={rate.logoUrl}
            alt={`${rate.name} logo`}
            imgProps={{ loading: "lazy" }}
            sx={{ width: 48, height: 48 }}
          />
        }
        title={
          <Typography variant="subtitle1" component="p" fontWeight={700}>
            {rate.name}
          </Typography>
        }
        subheader={
          <Typography variant="body2" color="text.secondary">
            ETA:{" "}
            <Typography component="span" fontWeight={700} color="primary.main">
              {rate.etaDays} day{rate.etaDays === 1 ? "" : "s"}
            </Typography>
          </Typography>
        }
      />
      <CardContent sx={{ flexGrow: 1, pt: 0 }}>
        <Stack spacing={1}>
          <Box>
            <Typography variant="h2" component="p" sx={{ fontSize: "1.75rem" }}>
              {rate.currency} {rate.total.toFixed(2)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Base {rate.currency} {rate.basePrice.toFixed(2)} · Tax{" "}
              {rate.currency} {rate.tax.toFixed(2)}
            </Typography>
          </Box>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {isCheapest ? (
              <Chip size="small" color="success" label="Cheapest" />
            ) : null}
            {isFastest ? (
              <Chip size="small" color="info" label="Fastest" />
            ) : null}
          </Stack>
        </Stack>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
        <Button
          fullWidth
          variant={isSelected ? "outlined" : "contained"}
          color="secondary"
          onClick={() => onSelect(rate)}
          disabled={isSelected}
          aria-pressed={isSelected}
          aria-label={isSelected ? `${rate.name} selected` : `Select ${rate.name}`}
        >
          {isSelected ? "Selected" : "Select"}
        </Button>
      </CardActions>
    </Card>
  );
}
