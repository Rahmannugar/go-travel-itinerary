import { useMutation } from "@tanstack/react-query";
import { Activity } from "@/lib/schemas/activity";
import axios, { AxiosError } from "axios";

export function useActivities() {
  return useMutation<Activity[], Error, string>({
    mutationFn: async (query: string) => {
      const res = await axios.get(`/api/activities?query=${query}`);
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
