import { useMutation } from "@tanstack/react-query";
import { Hotel } from "@/lib/schemas/hotel";
import axios, { AxiosError } from "axios";

export function useHotels() {
  return useMutation<Hotel[], Error, string>({
    mutationFn: async (query: string) => {
      const res = await axios.get(`/api/hotels?query=${query}`);
      return res.data;
    },
    onError: (error: Error | AxiosError) => {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new Error("Destination not found");
      }
      throw error;
    },
  });
}
