import { NextResponse } from "next/server";
import axios from "axios";
import { HotelSchema, type Hotel } from "@/lib/schemas/hotel";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  try {
    const today = new Date();
    const checkInDate = today.toISOString().split("T")[0];
    const checkOutDate = new Date(today.setDate(today.getDate() + 30))
      .toISOString()
      .split("T")[0];

    const destinationResponse = await axios.get(
      "https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination",
      {
        params: { query },
        headers: {
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY!,
          "X-RapidAPI-Host": process.env.RAPIDAPI_HOST!,
        },
      }
    );

    const destinationId = destinationResponse.data.data?.[0]?.dest_id;
    const searchType =
      destinationResponse.data.data?.[0]?.dest_type?.toUpperCase();

    if (!destinationId) {
      return NextResponse.json(
        { error: "Destination not found" },
        { status: 404 }
      );
    }

    const hotelsResponse = await axios.get(
      "https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels",
      {
        params: {
          dest_id: destinationId,
          search_type: searchType,
          arrival_date: checkInDate,
          departure_date: checkOutDate,
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
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY!,
          "X-RapidAPI-Host": process.env.RAPIDAPI_HOST!,
        },
      }
    );

    if (!hotelsResponse.data?.data?.hotels?.length) {
      return NextResponse.json([]);
    }

    console.log(
      "Raw hotel data sample:",
      JSON.stringify(hotelsResponse.data.data.hotels[0], null, 2)
    );

    const transformedHotels: Hotel[] = hotelsResponse.data.data.hotels
      .slice(0, 5)
      .map((hotel: any) => ({
        id: hotel.hotel_id?.toString() || "",
        name: hotel.property?.name || "",
        reviewScore: hotel.property?.reviewScore || 0,
        reviewCount: hotel.property?.reviewCount || 0,
        currency: hotel.property?.currency || "USD",
        accessibilityLabel: hotel.accessibilityLabel || "",
        checkinDate: checkInDate,
        checkoutDate: checkOutDate,
        priceBreakdown: {
          grossPrice: {
            value: hotel.property?.priceBreakdown?.grossPrice?.value || 0,
            currency: hotel.property?.currency || "USD",
          },
          strikethroughPrice: {
            value:
              hotel.property?.priceBreakdown?.strikethroughPrice?.value ||
              hotel.property?.priceBreakdown?.grossPrice?.value ||
              0,
            currency: hotel.property?.currency || "USD",
          },
        },
      }));

    const validatedHotels = transformedHotels.map((hotel) =>
      HotelSchema.parse(hotel)
    );

    console.log(validatedHotels);
    return NextResponse.json(validatedHotels);
  } catch (err: any) {
    console.error("Hotels API Error:", err.message);
    if (err.response?.data) {
      console.error("API Response:", err.response.data);
    }

    return NextResponse.json(
      { error: "Failed to fetch hotels" },
      { status: 500 }
    );
  }
}
