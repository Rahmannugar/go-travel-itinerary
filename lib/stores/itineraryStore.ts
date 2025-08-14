import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useHotelStore } from "./hotelStore";
import { useActivityStore } from "./activityStore";
import { Hotel } from "../schemas/hotel";
import { Activity } from "../schemas/activity";
import { Flight } from "../schemas/flight";
import { useFlightStore } from "./flightStore";

interface ItineraryState {
  flightIds: string[];
  hotelIds: string[];
  activityIds: string[];
  addFlightId: (id: string) => void;
  removeFlightId: (id: string) => void;
  addHotelId: (id: string) => void;
  removeHotelId: (id: string) => void;
  addActivityId: (id: string) => void;
  removeActivityId: (id: string) => void;
  getFullItinerary: () => {
    flights: Flight[];
    hotels: Hotel[];
    activities: Activity[];
  };
  clearItinerary: () => void;
}

export const useItineraryStore = create<ItineraryState>()(
  persist(
    (set, get) => ({
      flightIds: [],
      hotelIds: [],
      activityIds: [],

      addFlightId: (id) =>
        set((state) => ({
          flightIds: state.flightIds.includes(id)
            ? state.flightIds
            : [...state.flightIds, id],
        })),

      removeFlightId: (id) =>
        set((state) => ({
          flightIds: state.flightIds.filter((flightId) => flightId !== id),
        })),

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
        const flights = useFlightStore
          .getState()
          .flights.filter((flight) => get().flightIds.includes(flight.token));

        const hotels = useHotelStore
          .getState()
          .hotels.filter((hotel) => get().hotelIds.includes(hotel.id));

        const activities = useActivityStore
          .getState()
          .activities.filter((activity) =>
            get().activityIds.includes(activity.id)
          );

        return { flights, hotels, activities };
      },

      clearItinerary: () =>
        set({ flightIds: [], hotelIds: [], activityIds: [] }),
    }),
    { name: "itinerary-storage" }
  )
);
