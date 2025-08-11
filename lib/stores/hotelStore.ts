import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Hotel } from "@/lib/schemas/hotel";

interface HotelsState {
  hotels: Hotel[];
  addHotel: (hotel: Hotel) => void;
  removeHotel: (id: number) => void;
}

export const useHotelsStore = create<HotelsState>()(
  persist(
    (set) => ({
      hotels: [],
      addHotel: (hotel) =>
        set((state) => ({
          hotels: [...state.hotels, hotel],
        })),
      removeHotel: (id) =>
        set((state) => ({
          hotels: state.hotels.filter((h) => h.id !== id),
        })),
    }),
    { name: "hotels-storage" }
  )
);
