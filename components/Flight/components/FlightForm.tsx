"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AirplaneIcon from "../icons/AirplaneIcon";
import { Flight } from "@/lib/schemas/flight";
import { useFlightStore } from "@/lib/stores/flightStore";
import { useFlights } from "@/hooks/useFlight";

interface SearchInputs {
  from: string;
  to: string;
}

const FlightForm = () => {
  const { register, handleSubmit, watch } = useForm<SearchInputs>();
  const { mutate, isPending, data: flights, error } = useFlights();
  const { addFlight, removeFlight, flights: savedFlights } = useFlightStore();
  const [addingFlightId, setAddingFlightId] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const onSubmit = ({ from, to }: SearchInputs) => {
    if (!from.trim() || !to.trim()) return;

    mutate(`${from}-${to}`, {
      onSuccess: () => {
        setHasSearched(true);
      },
      onError: () => {
        setHasSearched(true);
        toast.error("Failed to fetch flights. Please try again.");
      },
    });
  };

  const handleFlightAction = async (flight: Flight) => {
    setAddingFlightId(flight.token);
    try {
      const isFlightSaved = savedFlights.some((f) => f.token === flight.token);

      if (isFlightSaved) {
        removeFlight(flight.token);
        toast.success("Flight removed from itinerary!");
      } else {
        addFlight(flight);
        toast.success("Flight added to itinerary!");
      }
    } catch (error) {
      toast.error("Failed to update flights");
    } finally {
      setTimeout(() => setAddingFlightId(null), 1000);
    }
  };

  const isFlightInItinerary = (flightId: string) => {
    return savedFlights.some((f) => f.token === flightId);
  };

  return (
    <section className="p-4 md:p-6">
      <div className="bg-background p-4 md:p-6 rounded">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <AirplaneIcon />
            <h1 className="text-white text-lg font-semibold">Search Flights</h1>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-4 mb-6"
        >
          <input
            type="text"
            {...register("from", { required: true })}
            placeholder="Search departure city(From)..."
            className="border-2 p-3 rounded-md bg-white focus:ring-2 font-medium focus:ring-custom-primary outline-custom-primary outline-none w-full text-base"
          />
          <input
            type="text"
            {...register("to", { required: true })}
            placeholder="Search arrival city(To)..."
            className="border-2 p-3 rounded-md bg-white focus:ring-2 font-medium focus:ring-custom-primary outline-custom-primary outline-none w-full text-base"
          />
          <Button
            type="submit"
            isLoading={isPending}
            className="bg-custom-primary text-white px-6 py-3 rounded font-medium enabled:hover:bg-custom-primary-hover enabled:active:bg-custom-primary-hover transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px]"
          >
            Search
          </Button>
        </form>

        <div className="transition-all duration-300 ease-in-out">
          {/* <HotelFormResult
            isLoading={isPending}
            hotels={hotels}
            addingHotelId={addingHotelId}
            handleHotelAction={handleHotelAction}
            isHotelInItinerary={isHotelInItinerary}
            error={error}
            hasSearched={hasSearched}
          /> */}
        </div>
      </div>
    </section>
  );
};

export default FlightForm;
