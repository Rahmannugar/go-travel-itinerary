import { Activity } from "@/lib/schemas/activity";
import { Hotel } from "@/lib/schemas/hotel";

declare global {
  interface ItineraryState {
    hotels: Hotel[];
    activities: Activity[];
    addHotel: (hotel: Hotel) => void;
    removeHotel: (id: number) => void;
    addActivity: (activity: Activity) => void;
    removeActivity: (id: string) => void;
    clearItinerary: () => void;
  }
}

export {};
