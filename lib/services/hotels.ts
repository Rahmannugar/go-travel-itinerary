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

  return response.data.data?.hotels || [];
}

export function transformHotels(
  hotels: any[],
  checkInDate: string,
  checkOutDate: string
): Hotel[] {
  return hotels.slice(0, 5).map((hotel: any) => ({
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
