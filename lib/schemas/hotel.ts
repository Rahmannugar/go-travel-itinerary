import { z } from "zod";

export const HotelSchema = z.object({
  id: z.string(),
  name: z.string(),
  reviewScore: z.number().optional(),
  reviewCount: z.number().optional(),
  currency: z.string().optional(),
  accessibilityLabel: z.string().optional(),
  checkinDate: z.string().optional(),
  checkoutDate: z.string().optional(),
  priceBreakdown: z
    .object({
      grossPrice: z
        .object({
          value: z.number(),
          currency: z.string().optional(),
        })
        .optional(),
      strikethroughPrice: z
        .object({
          value: z.number(),
          currency: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
});

export type Hotel = z.infer<typeof HotelSchema>;
