import { useQuery } from "@tanstack/react-query";
import { Hotel } from "@/lib/schemas/hotel";
import axios from "axios";

export function useHotels(query: string) {
  return useQuery<Hotel[]>({
    queryKey: ["hotels", query],
    queryFn: async () => {
      const res = await axios.get(`/api/hotels?query=${query}`);
      console.log("API Response:", res.data);
      return res.data;
    },
    enabled: false,
    retry: false,
  });
}
