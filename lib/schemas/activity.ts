import { z } from "zod";

export const ActivitySchema = z.object({
  id: z.string(),
  name: z.string(),
  shortDescription: z.string().optional(),
  representativePrice: z
    .object({
      chargeAmount: z.number().optional(),
      currency: z.string().optional(),
      publicAmount: z.number().optional(),
    })
    .optional(),
  reviewsStats: z
    .object({
      allReviewsCount: z.number().optional(),
      combinedNumericStats: z
        .object({
          average: z.number().optional(),
        })
        .optional(),
    })
    .optional(),
  ufiDetails: z
    .object({
      bCityName: z.string().optional(),
    })
    .optional(),
});

export type Activity = z.infer<typeof ActivitySchema>;
