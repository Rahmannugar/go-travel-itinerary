import { useQuery } from "@tanstack/react-query";
import { Hotel } from "@/lib/schemas/hotel";
import axios from "axios";

export function useHotels(query: string) {
  return useQuery<Hotel[]>({
    queryKey: ["hotels", query],
    queryFn: async () => {
      const res = await axios.get(`/api/hotels?query=${query}`);
      return res.data;
    },
    enabled: false,
    retry: false,
  });
}
