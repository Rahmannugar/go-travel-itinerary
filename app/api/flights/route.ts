import { NextResponse } from "next/server";
import { fetchFlights } from "@/lib/services/flights";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const departureDate = searchParams.get("departureDate");
  const arrivalDate = searchParams.get("arrivalDate");
  const cabinClass = searchParams.get("cabinClass");

  if (!from || !to || !departureDate || !arrivalDate || !cabinClass) {
    return NextResponse.json(
      { error: "Missing required params" },
      { status: 400 }
    );
  }

  try {
    const flights = await fetchFlights(
      from,
      to,
      departureDate,
      arrivalDate,
      cabinClass
    );
    return NextResponse.json(flights);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Flights API Error:", error.message);

      if (
        error.message === "Airport not found: " + from ||
        error.message === "Airport not found: " + to
      ) {
        return NextResponse.json(
          { error: "Airport not found" },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to fetch flights" },
      { status: 500 }
    );
  }
}
