import axios from "axios";
import { FlightSchema, type Flight } from "@/lib/schemas/flight";

export async function searchAirport(query: string) {
  const res = await axios.get(
    "https://booking-com15.p.rapidapi.com/api/v1/flights/searchDestination",
    {
      params: { query },
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
        "x-rapidapi-host": process.env.RAPIDAPI_HOST!,
      },
    }
  );
  // Find the first result with type "AIRPORT"
  const airport = res.data?.data?.find((item: any) => item.type === "AIRPORT");
  if (!airport) throw new Error(`Airport not found: ${query}`);
  //   console.log("Selected airport:", airport);
  return airport.id;
}

export async function searchFlights(
  fromId: string,
  toId: string,
  departureDate: string,
  arrivalDate: string,
  cabinClass: string
) {
  const res = await axios.get(
    "https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights",
    {
      params: {
        fromId,
        toId,
        stops: "none",
        pageNo: "1",
        adults: "1",
        children: "0,17",
        sort: "BEST",
        cabinClass: cabinClass.toUpperCase(),
        currency_code: "USD",
        departDate: departureDate,
        returnDate: arrivalDate,
      },
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
        "x-rapidapi-host": process.env.RAPIDAPI_HOST!,
      },
    }
  );
  console.log(res.data.flights);
  return res.data?.flights || [];
}

export function transformFlights(flightsData: unknown[]): Flight[] {
  return flightsData.slice(0, 5).map((f) => {
    const obj =
      typeof f === "object" && f !== null ? (f as Record<string, any>) : {};
    const s = obj.segments?.[0] ?? {};
    return {
      token: String(obj.token ?? ""),
      segments: [
        {
          departureAirport: {
            code: s.departureAirport?.code ?? "",
            type: s.departureAirport?.type ?? "",
            city: s.departureAirport?.city ?? "",
            cityName: s.departureAirport?.cityName ?? "",
            country: s.departureAirport?.country ?? "",
            countryName: s.departureAirport?.countryName ?? "",
          },
          arrivalAirport: {
            code: s.arrivalAirport?.code ?? "",
            type: s.arrivalAirport?.type ?? "",
            city: s.arrivalAirport?.city ?? "",
            cityName: s.arrivalAirport?.cityName ?? "",
            country: s.arrivalAirport?.country ?? "",
            countryName: s.arrivalAirport?.countryName ?? "",
          },
          departureTime: s.departureTime,
          arrivalTime: s.arrivalTime,
          totalTime: s.totalTime,
          legs: (s.legs ?? []).map((l: any) => ({
            departureTime: l.departureTime,
            arrivalTime: l.arrivalTime,
            cabinClass: l.cabinClass,
            flightInfo: {
              flightNumber: l.flightInfo?.flightNumber ?? 0,
            },
            carrierInfo: {
              operatingCarrier: l.carrierInfo?.operatingCarrier ?? "",
            },
          })),
        },
      ],
      priceBreakdown: {
        total: {
          currencyCode: obj.priceBreakdown?.total?.currencyCode ?? "",
          units: obj.priceBreakdown?.total?.units ?? 0,
        },
      },
    };
  });
}

// global function
export async function fetchFlights(
  from: string,
  to: string,
  departureDate: string,
  arrivalDate: string,
  cabinClass: string
): Promise<Flight[]> {
  const fromId = await searchAirport(from);
  const toId = await searchAirport(to);
  const flightsData = await searchFlights(
    fromId,
    toId,
    departureDate,
    arrivalDate,
    cabinClass
  );
  const transformed = transformFlights(flightsData);
  return transformed.map((f) => FlightSchema.parse(f));
}
