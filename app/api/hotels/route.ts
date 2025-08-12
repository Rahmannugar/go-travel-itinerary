import { NextResponse } from "next/server";
import { fetchHotels } from "@/lib/services/hotelsService";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  try {
    const hotels = await fetchHotels(query);
    return NextResponse.json(hotels);
  } catch (err: any) {
    console.error("Hotels API Error:", err.message);
    return NextResponse.json(
      { error: err.message || "Failed to fetch hotels" },
      { status: 500 }
    );
  }
}
