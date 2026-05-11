import { z } from "zod";
import { isValidIsoAlpha2, normalizeIsoAlpha2 } from "@/constants/isoCountries";
import { calcVolumetricKg } from "@/utils/packageWeight";

const countryCodeField = z
  .string()
  .min(2, "Country code required")
  .max(2)
  .transform((s) => normalizeIsoAlpha2(s))
  .refine((c) => isValidIsoAlpha2(c), "Invalid ISO country code");

const cityCountryShape = z.object({
  city: z.string().trim().min(2, "City must be at least 2 characters"),
  countryCode: countryCodeField,
});

const packageShape = z.object({
  weightKg: z.coerce.number().positive("Weight must be greater than 0"),
  lengthCm: z.coerce.number().positive("Length must be positive"),
  widthCm: z.coerce.number().positive("Width must be positive"),
  heightCm: z.coerce.number().positive("Height must be positive"),
  isInternational: z.boolean(),
});

export const originStepSchema = z.object({
  origin: cityCountryShape,
});

export const destinationStepSchema = z.object({
  destination: cityCountryShape,
});

export const quoteFormSchema = z
  .object({
    origin: cityCountryShape,
    destination: cityCountryShape,
    package: packageShape,
  })
  .superRefine((data, ctx) => {
    const derivedInternational =
      data.origin.countryCode !== data.destination.countryCode;
    if (data.package.isInternational !== derivedInternational) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "International flag must match origin vs destination countries",
        path: ["package", "isInternational"],
      });
    }

    const maxSideCm = 800;
    const { lengthCm, widthCm, heightCm } = data.package;

    for (const [key, value] of [
      ["lengthCm", lengthCm],
      ["widthCm", widthCm],
      ["heightCm", heightCm],
    ] as const) {
      if (value > maxSideCm) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Single side must be ≤ ${maxSideCm} cm`,
          path: ["package", key],
        });
      }
    }

    const volumetricKg = calcVolumetricKg(lengthCm, widthCm, heightCm);
    if (volumetricKg > 10_000) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Declared dimensions imply an unrealistically large volumetric weight",
        path: ["package", "lengthCm"],
      });
    }
  });

export type QuoteFormSchema = z.infer<typeof quoteFormSchema>;
