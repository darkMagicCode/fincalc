import { describe, expect, it } from "vitest";
import { quoteFormSchema } from "@/schemas/quote.schema";

describe("quoteFormSchema", () => {
  it("rejects weight <= 0", () => {
    const result = quoteFormSchema.safeParse({
      origin: { city: "Dubai", countryCode: "AE" },
      destination: { city: "New York", countryCode: "US" },
      package: {
        weightKg: 0,
        lengthCm: 10,
        widthCm: 10,
        heightCm: 10,
        isInternational: true,
      },
    });
    expect(result.success).toBe(false);
  });

  it("requires isInternational to match country mismatch", () => {
    const bad = quoteFormSchema.safeParse({
      origin: { city: "Dubai", countryCode: "AE" },
      destination: { city: "Abu Dhabi", countryCode: "AE" },
      package: {
        weightKg: 2,
        lengthCm: 10,
        widthCm: 10,
        heightCm: 10,
        isInternational: true,
      },
    });
    expect(bad.success).toBe(false);

    const good = quoteFormSchema.safeParse({
      origin: { city: "Dubai", countryCode: "AE" },
      destination: { city: "Abu Dhabi", countryCode: "AE" },
      package: {
        weightKg: 2,
        lengthCm: 10,
        widthCm: 10,
        heightCm: 10,
        isInternational: false,
      },
    });
    expect(good.success).toBe(true);
  });

  it("rejects invalid ISO country codes", () => {
    const result = quoteFormSchema.safeParse({
      origin: { city: "Dubai", countryCode: "ZZ" },
      destination: { city: "New York", countryCode: "US" },
      package: {
        weightKg: 2,
        lengthCm: 10,
        widthCm: 10,
        heightCm: 10,
        isInternational: true,
      },
    });
    expect(result.success).toBe(false);
  });

  it("rejects absurd dimensions (volumetric sanity)", () => {
    const result = quoteFormSchema.safeParse({
      origin: { city: "Dubai", countryCode: "AE" },
      destination: { city: "New York", countryCode: "US" },
      package: {
        weightKg: 2,
        lengthCm: 2000,
        widthCm: 2000,
        heightCm: 2000,
        isInternational: true,
      },
    });
    expect(result.success).toBe(false);
  });
});
