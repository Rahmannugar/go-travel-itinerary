"use client";

import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AirplaneIcon from "../icons/AirplaneIcon";
import { Flight } from "@/lib/schemas/flight";
import { useFlightStore } from "@/lib/stores/flightStore";
import { useFlights } from "@/lib/hooks/useFlight";
import ByteDatePicker from "byte-datepicker";
import "byte-datepicker/styles.css";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import FlightFormResult from "./FlightFormResult";

interface SearchInputs {
  from: string;
  to: string;
  departureDate: Date | null;
  arrivalDate: Date | null;
  cabinClass: "economy" | "business" | "first";
}

const cabinClassOptions = [
  { value: "economy", label: "Economy" },
  { value: "business", label: "Business" },
  { value: "first", label: "First" },
];

const FlightForm = () => {
  const { register, handleSubmit, control } = useForm<SearchInputs>({
    defaultValues: {
      cabinClass: "economy",
      departureDate: null,
      arrivalDate: null,
    },
  });
  const { mutate, isPending, data: flights, error } = useFlights(); // eslint-disable-line @typescript-eslint/no-unused-vars
  const { addFlight, removeFlight, flights: savedFlights } = useFlightStore();
  const [addingFlightId, setAddingFlightId] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const onSubmit = ({
    from,
    to,
    departureDate,
    arrivalDate,
    cabinClass,
  }: SearchInputs) => {
    if (
      !from.trim() ||
      !to.trim() ||
      !departureDate ||
      !arrivalDate ||
      !cabinClass
    )
      return;

    mutate(
      {
        from,
        to,
        departureDate: departureDate.toISOString().split("T")[0],
        arrivalDate: arrivalDate.toISOString().split("T")[0],
        cabinClass,
      },
      {
        onSuccess: () => setHasSearched(true),
        onError: () => {
          setHasSearched(true);
          toast.error("Failed to fetch flights. Please try again.");
        },
      }
    );
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
            <h1 className="text-custom-black text-lg font-semibold">
              Search Flights
            </h1>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-4 mb-6"
        >
          <input
            type="text"
            {...register("from", { required: true })}
            placeholder="Search departure city (From)..."
            className="border-2 p-3 rounded-md bg-white text-custom-black focus:ring-2 font-medium focus:ring-custom-primary outline-custom-primary outline-none w-full text-base"
          />
          <input
            type="text"
            {...register("to", { required: true })}
            placeholder="Search arrival city (To)..."
            className="border-2 p-3 rounded-md bg-white text-custom-black focus:ring-2 font-medium focus:ring-custom-primary outline-custom-primary outline-none w-full text-base"
          />
          <Controller
            name="departureDate"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <ByteDatePicker
                includeDays
                value={field.value || undefined}
                onChange={field.onChange}
                placeholder="Departure Date"
              />
            )}
          />
          <Controller
            name="arrivalDate"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <ByteDatePicker
                includeDays
                value={field.value || undefined}
                onChange={field.onChange}
                placeholder="Arrival Date"
              />
            )}
          />
          <Controller
            name="cabinClass"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="border-2 py-[22px] px-3 rounded-md bg-white text-custom-black focus:ring-2 font-medium focus:ring-custom-primary outline-custom-primary outline-none w-full text-base">
                  <SelectValue placeholder="Cabin Class" />
                </SelectTrigger>
                <SelectContent>
                  {cabinClassOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <Button
            type="submit"
            isLoading={isPending}
            className="bg-custom-primary text-white px-6 py-3 rounded font-medium enabled:hover:bg-custom-primary-hover enabled:active:bg-custom-primary-hover transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px]"
          >
            Search
          </Button>
        </form>

        <FlightFormResult
          isLoading={isPending}
          flights={flights}
          addingFlightId={addingFlightId}
          handleFlightAction={handleFlightAction}
          isFlightInItinerary={isFlightInItinerary}
          error={error as Error | null}
          hasSearched={hasSearched}
        />
      </div>
    </section>
  );
};

export default FlightForm;
