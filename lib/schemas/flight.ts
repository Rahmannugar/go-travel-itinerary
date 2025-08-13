import { z } from "zod";

export const FlightSchema = z.object({
  token: z.string(),
  segments: z.array(
    z.object({
      departureAirport: z.object({
        code: z.string(),
      }),
      arrivalAirport: z.object({
        code: z.string(),
      }),
      departureTime: z.coerce.date(),
      arrivalTime: z.coerce.date(),
      totalTime: z.number().int().nonnegative(),
    })
  ),
  priceBreakdown: z.object({
    total: z.object({
      currencyCode: z.string().optional(),
      units: z.number(),
    }),
  }),
});

export type Flight = z.infer<typeof FlightSchema>;
