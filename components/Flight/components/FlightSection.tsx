"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import EmptyFlight from "./EmptyFlight";
import FlightList from "./FlightList";
import AirplaneIcon from "../icons/AirplaneIcon";
import { useFlightStore } from "@/lib/stores/flightStore";
import Link from "next/link";
import mockFlights from "./flights.json";
import { Flight } from "@/lib/schemas/flight";

const FlightSection = () => {
  const { flights, removeFlight, addFlight } = useFlightStore();
  const prevLength = useRef(flights.length);

  useEffect(() => {
    if (prevLength.current > 0 && flights.length === 0) {
      toast("No flights in your itinerary", {
        description: "Add flights to your travel plan",
      });
    }
    prevLength.current = flights.length;
  }, [flights.length]);

  const handleDelete = (token: string) => {
    removeFlight(token);
    toast.success("Flight removed successfully!");
  };

  const handleAddMockFlight = () => {
    const template = mockFlights[0];
    const flight: Flight = JSON.parse(JSON.stringify(template));
    // Generate unique token
    flight.token = `mock-${Math.random().toString(36).slice(2)}-${Date.now()}`;
    // Set current date/times
    const now = new Date();
    const dep = new Date(now);
    dep.setHours(8, 0, 0, 0);
    const arr = new Date(dep);
    arr.setHours(dep.getHours() + 12); // 12h flight

    flight.segments[0].departureTime = dep;
    flight.segments[0].arrivalTime = arr;
    flight.segments[0].legs[0].departureTime = dep;
    flight.segments[0].legs[0].arrivalTime = arr;

    addFlight(flight);
    console.log("Mock flight added:", flight);
    toast.success("Mock flight added!");
  };

  return (
    <section className="p-4 md:p-6">
      <div className="bg-background p-4 md:p-6 rounded">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AirplaneIcon />
            <h1 className="text-custom-black text-lg font-semibold">Flights</h1>
          </div>
          <div className="flex flex-col items-center gap-2">
            <button
              className="font-medium text-sm cursor-pointer hover:bg-white hover:text-custom-primary transition-colors ease-in-out duration-200 bg-custom-primary text-white w-full py-3 px-6 rounded inline-block"
              onClick={handleAddMockFlight}
            >
              Add Mock Flights
            </button>

            <Link
              href="/flights/add-flight"
              className="font-medium text-sm cursor-pointer hover:bg-custom-primary hover:text-white transition-colors ease-in-out duration-200 bg-white text-custom-primary w-full py-3 px-6 rounded inline-block"
            >
              Add Flights
            </Link>
          </div>
        </div>

        <article className="mt-6 transition-all duration-300 ease-out">
          {flights.length > 0 ? (
            <FlightList flights={flights} onDelete={handleDelete} />
          ) : (
            <div className="transition-all duration-300 ease-out opacity-100 transform scale-100">
              <EmptyFlight />
            </div>
          )}
        </article>
      </div>
    </section>
  );
};

export default FlightSection;
