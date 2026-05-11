import type { CourierRate } from "@/types/quote.types";

export const mockCourierRates: CourierRate[] = [
  {
    id: "dhl",
    name: "DHL Express",
    logoUrl: "https://logo.clearbit.com/dhl.com",
    basePrice: 45,
    tax: 6.75,
    total: 51.75,
    etaDays: 2,
    currency: "USD",
  },
  {
    id: "fedex",
    name: "FedEx Priority",
    logoUrl: "https://logo.clearbit.com/fedex.com",
    basePrice: 38,
    tax: 5.7,
    total: 43.7,
    etaDays: 3,
    currency: "USD",
  },
  {
    id: "aramex",
    name: "Aramex",
    logoUrl: "https://logo.clearbit.com/aramex.com",
    basePrice: 29,
    tax: 4.35,
    total: 33.35,
    etaDays: 4,
    currency: "USD",
  },
  {
    id: "ups",
    name: "UPS Standard",
    logoUrl: "https://logo.clearbit.com/ups.com",
    basePrice: 25,
    tax: 3.75,
    total: 28.75,
    etaDays: 5,
    currency: "USD",
  },
];
