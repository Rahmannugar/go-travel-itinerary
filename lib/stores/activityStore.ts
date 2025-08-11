import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Activity } from "@/lib/schemas/activity";

interface ActivitiesState {
  activities: Activity[];
  addActivity: (activity: Activity) => void;
  removeActivity: (id: string) => void;
}

export const useActivitiesStore = create<ActivitiesState>()(
  persist(
    (set) => ({
      activities: [],
      addActivity: (activity) =>
        set((state) => ({
          activities: [...state.activities, activity],
        })),
      removeActivity: (id) =>
        set((state) => ({
          activities: state.activities.filter((a) => a.id !== id),
        })),
    }),
    { name: "activities-storage" }
  )
);
