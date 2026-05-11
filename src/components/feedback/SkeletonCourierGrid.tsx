import { Box, Card, CardContent, Skeleton, Stack } from "@mui/material";

function SkeletonCard() {
  return (
    <Card elevation={0} sx={{ border: 1, borderColor: "divider" }}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Skeleton variant="rounded" width={48} height={48} />
          <Stack spacing={1} flex={1}>
            <Skeleton variant="text" width="60%" height={28} />
            <Skeleton variant="text" width="40%" height={20} />
            <Skeleton variant="text" width="50%" height={36} />
            <Skeleton variant="rounded" width="100%" height={40} />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export function SkeletonCourierGrid() {
  return (
    <Box
      display="grid"
      gap={2}
      gridTemplateColumns={{
        xs: "1fr",
        sm: "repeat(2, minmax(0, 1fr))",
        md: "repeat(3, minmax(0, 1fr))",
      }}
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </Box>
  );
}
