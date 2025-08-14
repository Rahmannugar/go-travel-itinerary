import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Flight } from "@/lib/schemas/flight";
import { useItineraryStore } from "./itineraryStore";

interface FlightsState {
  flights: Flight[];
  addFlight: (flight: Flight) => void;
  removeFlight: (token: string) => void;
}

export const useFlightStore = create<FlightsState>()(
  persist(
    (set) => ({
      flights: [],
      addFlight: (flight) => {
        set((state) => ({
          flights: state.flights.find((f) => f.token === flight.token)
            ? state.flights
            : [...state.flights, flight],
        }));
        // Update global itinerary store
        useItineraryStore.getState().addFlightId(flight.token);
      },
      removeFlight: (token) => {
        set((state) => ({
          flights: state.flights.filter((flight) => flight.token !== token),
        }));
        // Update global itinerary store
        useItineraryStore.getState().removeFlightId(token);
      },
    }),
    { name: "flights-storage" }
  )
);
