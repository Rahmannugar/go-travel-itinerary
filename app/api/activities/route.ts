import { NextResponse } from "next/server";
import { fetchActivities } from "@/lib/services/activities";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  try {
    const activities = await fetchActivities(query);
    return NextResponse.json(activities);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Activities API Error:", error.message);
      return NextResponse.json(
        { error: "Failed to fetch activities" },
        { status: 500 }
      );
    }
  }
}
