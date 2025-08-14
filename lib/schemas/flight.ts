import { z } from "zod";

export const FlightSchema = z.object({
  token: z.string(),
  segments: z.array(
    z.object({
      departureAirport: z.object({
        code: z.string(),
        type: z.string(),
        city: z.string(),
        cityName: z.string(),
        country: z.string(),
        countryName: z.string(),
      }),
      arrivalAirport: z.object({
        code: z.string(),
        type: z.string(),
        city: z.string(),
        cityName: z.string(),
        country: z.string(),
        countryName: z.string(),
      }),
      departureTime: z.coerce.date(),
      arrivalTime: z.coerce.date(),
      totalTime: z.number(),
      legs: z.array(
        z.object({
          departureTime: z.coerce.date(),
          arrivalTime: z.coerce.date(),
          cabinClass: z.string(),
          flightInfo: z.object({
            flightNumber: z.number(),
          }),
          carrierInfo: z.object({
            operatingCarrier: z.string(),
          }),
        })
      ),
    })
  ),
  priceBreakdown: z.object({
    total: z.object({
      currencyCode: z.string(),
      units: z.number(),
    }),
  }),
});

export type Flight = z.infer<typeof FlightSchema>;
