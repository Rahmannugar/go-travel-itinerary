import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useHotelsStore } from "./hotelStore";
import { useActivitiesStore } from "./activityStore";
import { Hotel } from "../schemas/hotel";
import { Activity } from "../schemas/activity";

interface ItineraryState {
  hotelIds: string[];
  activityIds: string[];
  addHotelId: (id: string) => void;
  removeHotelId: (id: string) => void;
  addActivityId: (id: string) => void;
  removeActivityId: (id: string) => void;
  getFullItinerary: () => {
    hotels: Hotel[];
    activities: Activity[];
  };
  clearItinerary: () => void;
}

export const useItineraryStore = create<ItineraryState>()(
  persist(
    (set, get) => ({
      hotelIds: [],
      activityIds: [],

      addHotelId: (id) =>
        set((state) => ({
          hotelIds: state.hotelIds.includes(id)
            ? state.hotelIds
            : [...state.hotelIds, id],
        })),

      removeHotelId: (id) =>
        set((state) => ({
          hotelIds: state.hotelIds.filter((hotelId) => hotelId !== id),
        })),

      addActivityId: (id) =>
        set((state) => ({
          activityIds: state.activityIds.includes(id)
            ? state.activityIds
            : [...state.activityIds, id],
        })),

      removeActivityId: (id) =>
        set((state) => ({
          activityIds: state.activityIds.filter(
            (activityId) => activityId !== id
          ),
        })),

      getFullItinerary: () => {
        const hotels = useHotelsStore
          .getState()
          .hotels.filter((hotel) => get().hotelIds.includes(hotel.id));

        const activities = useActivitiesStore
          .getState()
          .activities.filter((activity) =>
            get().activityIds.includes(activity.id)
          );

        return { hotels, activities };
      },

      clearItinerary: () => set({ hotelIds: [], activityIds: [] }),
    }),
    { name: "itinerary-storage" }
  )
);
