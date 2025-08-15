import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Flight } from "@/lib/schemas/flight";

export interface FlightSearchParams {
  from: string;
  to: string;
  departureDate: string;
  arrivalDate: string;
  cabinClass: "economy" | "business" | "first";
}

export function useFlights() {
  return useMutation<Flight[], Error, FlightSearchParams>({
    mutationFn: async ({
      from,
      to,
      departureDate,
      arrivalDate,
      cabinClass,
    }) => {
      const res = await axios.get(
        `/api/flights?from=${encodeURIComponent(from)}&to=${encodeURIComponent(
          to
        )}&departureDate=${departureDate}&arrivalDate=${arrivalDate}&cabinClass=${cabinClass}`
      );
      return res.data;
    },
    onError: (error: Error | AxiosError) => {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new Error("Flights not found");
      }
      throw error;
    },
  });
}
