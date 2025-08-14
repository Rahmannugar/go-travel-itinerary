import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Flight } from "@/lib/schemas/flight";

interface FlightSearchParams {
  from: string;
  to: string;
}

export function useFlights() {
  return useMutation<Flight[], Error, FlightSearchParams>({
    mutationFn: async ({ from, to }) => {
      const res = await axios.get(`/api/flights?from=${from}&to=${to}`);
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
