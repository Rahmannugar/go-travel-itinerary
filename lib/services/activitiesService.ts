import axios from "axios";
import { ActivitySchema } from "@/lib/schemas/activity";

export async function fetchActivities(query: string) {
  const locationResponse = await axios.get(
    `${process.env.RAPIDAPI_URL!}/attraction/searchLocation`,
    {
      params: { query, languagecode: "en-us" },
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
        "x-rapidapi-host": process.env.RAPIDAPI_HOST!,
      },
    }
  );

  const locationId = locationResponse.data.data?.[0]?.id;
  if (!locationId) throw new Error("Location not found");

  const activitiesResponse = await axios.get(
    `${process.env.RAPIDAPI_URL!}/attraction/searchAttractions`,
    {
      params: {
        id: locationId,
        sortBy: "trending",
        page: "1",
        currency_code: "USD",
        languagecode: "en-us",
      },
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
        "x-rapidapi-host": process.env.RAPIDAPI_HOST!,
      },
    }
  );

  return activitiesResponse.data.data
    ?.slice(0, 5)
    .map((a: any) => ActivitySchema.parse(a));
}
