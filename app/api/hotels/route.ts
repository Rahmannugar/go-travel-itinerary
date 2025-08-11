import { NextResponse } from "next/server";
import axios from "axios";
import { HotelSchema } from "@/lib/schemas/hotel";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  try {
    // 1. Get destination ID from query
    const destinationResponse = await axios.get(
      `${process.env.RAPIDAPI_URL!}/hotels/searchDestination`,
      {
        params: { query },
        headers: {
          "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
          "x-rapidapi-host": process.env.RAPIDAPI_HOST!,
        },
      }
    );

    const destinationId = destinationResponse.data.data?.[0]?.dest_id;
    if (!destinationId) {
      return NextResponse.json(
        { error: "Destination not found" },
        { status: 404 }
      );
    }

    // 2. Get hotels using destination ID
    const hotelsResponse = await axios.get(
      `${process.env.RAPIDAPI_URL!}/hotels/searchHotels`,
      {
        params: {
          dest_id: destinationId,
          search_type: "CITY",
          adults: "1",
          children_age: "0,17",
          room_qty: "1",
          page_number: "1",
          units: "metric",
          temperature_unit: "c",
          languagecode: "en-us",
          currency_code: "USD",
        },
        headers: {
          "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
          "x-rapidapi-host": process.env.RAPIDAPI_HOST!,
        },
      }
    );

    //return only first 5 hotels to reduce response size
    const hotels = hotelsResponse.data.data
      ?.slice(0, 5)
      .map((h: any) => HotelSchema.parse(h));

    return NextResponse.json(hotels);
  } catch (err: any) {
    console.error("Hotels API Error:", err.message);
    return NextResponse.json(
      { error: "Failed to fetch hotels" },
      { status: 500 }
    );
  }
}
