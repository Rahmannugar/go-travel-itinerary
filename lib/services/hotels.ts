import axios from "axios";
import { HotelSchema, type Hotel } from "@/lib/schemas/hotel";

export async function searchDestination(query: string) {
  const response = await axios.get(
    "https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination",
    {
      params: { query },
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
        "x-rapidapi-host": process.env.RAPIDAPI_HOST!,
      },
    }
  );

  const destinationId = response.data.data?.[0]?.dest_id;
  const searchType = response.data.data?.[0]?.dest_type?.toUpperCase();

  if (!destinationId) {
    throw new Error("Destination not found");
  }

  return { destinationId, searchType };
}

export async function searchHotels(
  destinationId: string,
  searchType: string,
  checkInDate: string,
  checkOutDate: string
) {
  const response = await axios.get(
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
        "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
        "x-rapidapi-host": process.env.RAPIDAPI_HOST!,
      },
    }
  );

  //console.log(response.data.data?.hotels);
  return response.data.data?.hotels || [];
}

export function transformHotels(
  hotels: unknown[],
  checkInDate: string,
  checkOutDate: string
): Hotel[] {
  return hotels.slice(0, 5).map((hotel) => {
    const h =
      typeof hotel === "object" && hotel !== null
        ? (hotel as Record<string, unknown>)
        : {};

    //  Nested properties
    const property = h.property as Record<string, unknown> | undefined;
    const priceBreakdown = property?.priceBreakdown as
      | Record<string, unknown>
      | undefined;
    const grossPrice = priceBreakdown?.grossPrice as
      | Record<string, unknown>
      | undefined;
    const strikethroughPrice = priceBreakdown?.strikethroughPrice as
      | Record<string, unknown>
      | undefined;

    return {
      id: h.hotel_id?.toString() || "",
      name: (property?.name as string) || "",
      reviewScore: (property?.reviewScore as number) || 0,
      reviewCount: (property?.reviewCount as number) || 0,
      currency: (property?.currency as string) || "USD",
      accessibilityLabel: (h.accessibilityLabel as string) || "",
      checkinDate: checkInDate,
      checkoutDate: checkOutDate,
      priceBreakdown: {
        grossPrice: {
          value: (grossPrice?.value as number) || 0,
          currency: (property?.currency as string) || "USD",
        },
        strikethroughPrice: {
          value:
            (strikethroughPrice?.value as number) ||
            (grossPrice?.value as number) ||
            0,
          currency: (property?.currency as string) || "USD",
        },
      },
    };
  });
}

//global function
export async function fetchHotels(query: string) {
  const today = new Date();
  const checkInDate = today.toISOString().split("T")[0];
  const checkOutDate = new Date(today.setDate(today.getDate() + 30))
    .toISOString()
    .split("T")[0];

  const { destinationId, searchType } = await searchDestination(query);
  const hotelsData = await searchHotels(
    destinationId,
    searchType,
    checkInDate,
    checkOutDate
  );

  const transformedHotels = transformHotels(
    hotelsData,
    checkInDate,
    checkOutDate
  );

  return transformedHotels.map((hotel) => HotelSchema.parse(hotel));
}
