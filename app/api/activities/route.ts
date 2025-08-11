import { NextResponse } from "next/server";
import axios from "axios";
import { ActivitySchema } from "@/lib/schemas/activity";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  try {
    // 1. Get location ID for activities
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
    if (!locationId) {
      return NextResponse.json(
        { error: "Location not found" },
        { status: 404 }
      );
    }

    // 2. Get activities
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

    //return only first 5 activities to reduce response size
    const activities = activitiesResponse.data.data
      ?.slice(0, 5)
      .map((a: any) => ActivitySchema.parse(a));

    return NextResponse.json(activities);
  } catch (err: any) {
    console.error("Activities API Error:", err.message);
    return NextResponse.json(
      { error: "Failed to fetch activities" },
      { status: 500 }
    );
  }
}
