import axios from "axios";
import { ActivitySchema, type Activity } from "@/lib/schemas/activity";

const COUNTRY_CURRENCY_MAP: Record<string, string> = {
  jp: "JPY",
  gb: "GBP",
  us: "USD",
  eu: "EUR",
  in: "INR",
};

export async function searchDestination(query: string) {
  const response = await axios.get(
    "https://booking-com15.p.rapidapi.com/api/v1/attraction/searchLocation",
    {
      params: {
        query,
        languagecode: "en-us",
      },
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
        "x-rapidapi-host": process.env.RAPIDAPI_HOST!,
      },
    }
  );

  const location = response.data.data?.[0];
  if (!location) {
    throw new Error("Location not found");
  }

  const countryCode = location.countryCode?.toLowerCase();
  const currencyCode = COUNTRY_CURRENCY_MAP[countryCode] || "USD";

  return {
    locationId: location.id,
    currencyCode,
  };
}

export async function searchActivities(
  locationId: string,
  currencyCode: string
) {
  const response = await axios.get(
    "https://booking-com15.p.rapidapi.com/api/v1/attraction/searchAttractions",
    {
      params: {
        id: locationId,
        sortBy: "trending",
        page: "1",
        currency_code: currencyCode,
        languagecode: "en-us",
      },
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
        "x-rapidapi-host": process.env.RAPIDAPI_HOST!,
      },
    }
  );

  return response.data.data?.products || [];
}

export function transformActivities(
  activitiesData: unknown[],
  currencyCode: string
): Activity[] {
  return activitiesData.slice(0, 5).map((activity) => {
    const a =
      typeof activity === "object" && activity !== null
        ? (activity as Record<string, any>)
        : {};
    return {
      id: a.id || "",
      name: a.name || "",
      shortDescription: a.shortDescription || "",
      representativePrice: {
        chargeAmount: a.representativePrice?.chargeAmount || 0,
        currency: currencyCode,
        publicAmount: a.representativePrice?.publicAmount || 0,
      },
      reviewsStats: {
        allReviewsCount: a.reviewsStats?.allReviewsCount || 0,
        combinedNumericStats: {
          average: a.reviewsStats?.combinedNumericStats?.average || 0,
        },
      },
      ufiDetails: {
        bCityName: a.ufiDetails?.bCityName || "",
      },
    };
  });
}

// global function
export async function fetchActivities(query: string) {
  const { locationId, currencyCode } = await searchDestination(query);
  const activitiesData = await searchActivities(locationId, currencyCode);
  const transformedActivities = transformActivities(
    activitiesData,
    currencyCode
  );

  return transformedActivities.map((activity) =>
    ActivitySchema.parse(activity)
  );
}
