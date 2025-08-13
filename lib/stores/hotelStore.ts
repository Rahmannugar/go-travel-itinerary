import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Hotel } from "@/lib/schemas/hotel";
import { useItineraryStore } from "./itineraryStore";

interface HotelsState {
  hotels: Hotel[];
  addHotel: (hotel: Hotel) => void;
  removeHotel: (id: string) => void;
}

export const useHotelStore = create<HotelsState>()(
  persist(
    (set) => ({
      hotels: [],
      addHotel: (hotel) => {
        set((state) => ({
          hotels: state.hotels.find((h) => h.id === hotel.id)
            ? state.hotels
            : [...state.hotels, hotel],
        }));
        // Update global itinerary store
        useItineraryStore.getState().addHotelId(hotel.id);
      },
      removeHotel: (id) => {
        set((state) => ({
          hotels: state.hotels.filter((hotel) => hotel.id !== id),
        }));
        // Update global itinerary store
        useItineraryStore.getState().removeHotelId(id);
      },
    }),
    { name: "hotels-storage" }
  )
);
