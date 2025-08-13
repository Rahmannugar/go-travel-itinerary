import { useQuery } from "@tanstack/react-query";
import { Hotel } from "@/lib/schemas/hotel";
import axios from "axios";

export function useHotels(query: string) {
  return useQuery<Hotel[]>({
    queryKey: ["hotels", query],
    queryFn: async () => {
      try {
        const res = await axios.get(`/api/hotels?query=${query}`);
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          return [];
        }
        return [];
      }
    },
    enabled: false,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
}
