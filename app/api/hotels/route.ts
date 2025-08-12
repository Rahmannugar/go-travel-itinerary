import { NextResponse } from "next/server";
import { fetchHotels } from "@/lib/services/hotels";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  try {
    const hotels = await fetchHotels(query);
    return NextResponse.json(hotels);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Hotels API Error:", error.message);

      if (error.message === "Destination not found") {
        return NextResponse.json(
          { error: "Destination not found" },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to fetch hotels" },
      { status: 500 }
    );
  }
}
