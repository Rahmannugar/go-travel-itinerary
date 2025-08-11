import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Hotel } from "@/lib/schemas/hotel";
import { useItineraryStore } from "./itineraryStore";

interface HotelsState {
  hotels: Hotel[];
  addHotel: (hotel: Hotel) => void;
  removeHotel: (id: number) => void;
}

export const useHotelsStore = create<HotelsState>()(
  persist(
    (set) => ({
      hotels: [],
      addHotel: (hotel) => {
        set((state) => ({
          hotels: state.hotels.find((h) => h.id === hotel.id)
            ? state.hotels
            : [...state.hotels, hotel],
        }));
        // Updating global itinerary store
        useItineraryStore.getState().addHotel(hotel);
      },
      removeHotel: (id) => {
        set((state) => ({
          hotels: state.hotels.filter((h) => h.id !== id),
        }));
        // Update global itinerary store
        useItineraryStore.getState().removeHotel(id);
      },
    }),
    { name: "hotels-storage" }
  )
);
