import { useQuery } from "@tanstack/react-query";
import { Activity } from "@/lib/schemas/activity";
import axios from "axios";

export function useActivities(query: string) {
  return useQuery<Activity[]>({
    queryKey: ["activities", query],
    queryFn: async () => {
      const res = await axios.get(`/api/activities?query=${query}`);
      return res.data;
    },
    enabled: false,
  });
}
