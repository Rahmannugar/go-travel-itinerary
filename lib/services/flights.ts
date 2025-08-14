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
  const airport = res.data?.data?.find(
    (item: Record<string, unknown>) => item.type === "AIRPORT"
  );
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
      typeof f === "object" && f !== null ? (f as Record<string, unknown>) : {};
    const segments = obj.segments as unknown[] | undefined;
    const s = segments?.[0] as Record<string, unknown> | undefined;

    const departureAirport = s?.departureAirport as
      | Record<string, unknown>
      | undefined;
    const arrivalAirport = s?.arrivalAirport as
      | Record<string, unknown>
      | undefined;

    // Convert to Date
    const departureTime = s?.departureTime
      ? new Date(s.departureTime as string)
      : new Date();
    const arrivalTime = s?.arrivalTime
      ? new Date(s.arrivalTime as string)
      : new Date();

    return {
      token: String(obj.token ?? ""),
      segments: [
        {
          departureAirport: {
            code: (departureAirport?.code as string) || "",
            type: (departureAirport?.type as string) || "",
            city: (departureAirport?.city as string) || "",
            cityName: (departureAirport?.cityName as string) || "",
            country: (departureAirport?.country as string) || "",
            countryName: (departureAirport?.countryName as string) || "",
          },
          arrivalAirport: {
            code: (arrivalAirport?.code as string) || "",
            type: (arrivalAirport?.type as string) || "",
            city: (arrivalAirport?.city as string) || "",
            cityName: (arrivalAirport?.cityName as string) || "",
            country: (arrivalAirport?.country as string) || "",
            countryName: (arrivalAirport?.countryName as string) || "",
          },
          departureTime,
          arrivalTime,
          totalTime: (s?.totalTime as number) || 0,
          legs: ((s?.legs as unknown[]) ?? []).map((l) => {
            const leg = l as Record<string, unknown>;
            const flightInfo = leg.flightInfo as
              | Record<string, unknown>
              | undefined;
            const carrierInfo = leg.carrierInfo as
              | Record<string, unknown>
              | undefined;
            return {
              departureTime: leg.departureTime
                ? new Date(leg.departureTime as string)
                : new Date(),
              arrivalTime: leg.arrivalTime
                ? new Date(leg.arrivalTime as string)
                : new Date(),
              cabinClass: leg.cabinClass as string,
              flightInfo: {
                flightNumber: (flightInfo?.flightNumber as number) ?? 0,
              },
              carrierInfo: {
                operatingCarrier:
                  (carrierInfo?.operatingCarrier as string) ?? "",
              },
            };
          }),
        },
      ],
      priceBreakdown: {
        total: {
          currencyCode:
            ((
              (obj.priceBreakdown as Record<string, unknown>)?.total as
                | Record<string, unknown>
                | undefined
            )?.currencyCode as string) ?? "",
          units:
            ((
              (obj.priceBreakdown as Record<string, unknown>)?.total as
                | Record<string, unknown>
                | undefined
            )?.units as number) ?? 0,
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
