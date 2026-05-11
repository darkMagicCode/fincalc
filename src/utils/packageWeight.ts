export const VOLUMETRIC_DIVISOR_CM3_PER_KG = 5000;

export function calcVolumetricKg(
  lengthCm: number,
  widthCm: number,
  heightCm: number,
): number {
  const l = Number(lengthCm) || 0;
  const w = Number(widthCm) || 0;
  const h = Number(heightCm) || 0;
  if (l <= 0 || w <= 0 || h <= 0) return 0;
  return (l * w * h) / VOLUMETRIC_DIVISOR_CM3_PER_KG;
}

export function calcChargeableKg(input: {
  weightKg: number;
  lengthCm: number;
  widthCm: number;
  heightCm: number;
}): number {
  const weight = Number(input.weightKg) || 0;
  const volumetric = calcVolumetricKg(
    input.lengthCm,
    input.widthCm,
    input.heightCm,
  );
  return Math.max(weight, volumetric);
}
