import { useQuery } from "@tanstack/react-query";
import { Activity } from "@/lib/schemas/activity";
import axios from "axios";

export function useActivities(query: string) {
  return useQuery<Activity[]>({
    queryKey: ["activities", query],
    queryFn: async () => {
      try {
        const res = await axios.get(`/api/activities?query=${query}`);
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          return [];
        }
        throw error;
      }
    },
    enabled: false,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
}
