import { create } from "zustand";
import { persist } from "zustand/middleware";


export const useItineraryStore = create<ItineraryState>()(
  persist(
    (set) => ({
      hotels: [],
      activities: [],
      addHotel: (hotel) =>
        set((state) => ({
          hotels: state.hotels.find((h) => h.id === hotel.id)
            ? state.hotels
            : [...state.hotels, hotel],
        })),
      removeHotel: (id) =>
        set((state) => ({
          hotels: state.hotels.filter((h) => h.id !== id),
        })),
      addActivity: (activity) =>
        set((state) => ({
          activities: state.activities.find((a) => a.id === activity.id)
            ? state.activities
            : [...state.activities, activity],
        })),
      removeActivity: (id) =>
        set((state) => ({
          activities: state.activities.filter((a) => a.id !== id),
        })),
      clearItinerary: () => set({ hotels: [], activities: [] }),
    }),
    { name: "itinerary-storage" }
  )
);
