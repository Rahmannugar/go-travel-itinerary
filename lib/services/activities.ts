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
  activitiesData: any[],
  currencyCode: string
): Activity[] {
  return activitiesData.slice(0, 5).map((activity: any) => ({
    id: activity.id || "",
    name: activity.name || "",
    shortDescription: activity.shortDescription || "",
    representativePrice: {
      chargeAmount: activity.representativePrice?.chargeAmount || 0,
      currency: currencyCode,
      publicAmount: activity.representativePrice?.publicAmount || 0,
    },
    reviewsStats: {
      allReviewsCount: activity.reviewsStats?.allReviewsCount || 0,
      combinedNumericStats: {
        average: activity.reviewsStats?.combinedNumericStats?.average || 0,
      },
    },
    ufiDetails: {
      bCityName: activity.ufiDetails?.bCityName || "",
    },
  }));
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
