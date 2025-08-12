import axios from "axios";
import { HotelSchema } from "@/lib/schemas/hotel";

export async function fetchHotels(query: string) {
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
  if (!destinationId) throw new Error("Destination not found");

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

  return hotelsResponse.data.data
    ?.slice(0, 5)
    .map((h: any) => HotelSchema.parse(h));
}
