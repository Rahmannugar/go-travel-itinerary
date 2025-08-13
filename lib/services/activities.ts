import axios from "axios";
import { ActivitySchema, type Activity } from "@/lib/schemas/activity";

async function searchDestination(query: string) {
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

  const locationId = response.data.data.destinations?.[0]?.id;
  if (!locationId) {
    throw new Error("Location not found");
  }
  return locationId;
}

async function searchActivities(locationId: string) {
  const response = await axios.get(
    "https://booking-com15.p.rapidapi.com/api/v1/attraction/searchAttractions",
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

  return response.data.data.products || [];
}

function transformActivities(activities: any[]): Activity[] {
  return activities.slice(0, 5).map((activity: any) => ({
    id: activity.id || "",
    name: activity.name || "",
    shortDescription: activity.shortDescription || "",
    representativePrice: {
      chargeAmount: activity.representativePrice?.chargeAmount || 0,
      currency: activity.representativePrice?.currency || "USD",
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

export async function fetchActivities(query: string) {
  const locationId = await searchDestination(query);
  const activitiesData = await searchActivities(locationId);
  const transformedActivities = transformActivities(activitiesData);
  return transformedActivities.map((activity) =>
    ActivitySchema.parse(activity)
  );
}
