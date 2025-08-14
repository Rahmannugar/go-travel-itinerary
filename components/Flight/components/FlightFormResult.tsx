"use client";

import { Flight } from "@/lib/schemas/flight";
import { Spinner } from "@/components/ui/spinner";
import FlightTopInfo from "./FlightTopInfo";
import FlightBottomInfo from "./FlightBottomInfo";

interface FlightFormResultProps {
  isLoading: boolean;
  flights: Flight[] | undefined;
  addingFlightId: string | null;
  handleFlightAction: (flight: Flight) => Promise<void>;
  isFlightInItinerary: (flightId: string) => boolean;
  error: Error | null;
  hasSearched: boolean;
}

const FlightFormResult = ({
  isLoading,
  flights,
  addingFlightId,
  handleFlightAction,
  isFlightInItinerary,
  error,
  hasSearched,
}: FlightFormResultProps) => {
  if (isLoading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!hasSearched) {
    return (
      <div className="bg-white rounded min-h-[300px] flex items-center justify-center text-center px-4 text-sm font-medium text-custom-black">
        Enter details to search for flights
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded min-h-[300px] flex items-center justify-center text-center px-4 text-sm font-medium text-custom-black">
        No flights found. Please try a different search.
      </div>
    );
  }

  if (!flights || flights.length === 0) {
    return (
      <div className="bg-white rounded min-h-[300px] flex items-center justify-center text-center px-4 text-sm font-medium text-custom-black">
        No flights found. Please try a different search.
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-6 items-center">
      {flights.map((flight) => (
        <li
          key={flight.token}
          className="bg-white rounded w-full sm:flex sm:justify-between items-stretch animate-in fade-in-0 duration-500 slide-in-from-bottom-4"
        >
          <div className="w-full">
            <FlightTopInfo flight={flight} />
            <div className="h-[1px] w-full bg-[#E4E7EC]"></div>
            <FlightBottomInfo />
            <div className="h-[1px] w-full bg-[#E4E7EC]"></div>
            <div className="flex justify-between items-center p-4 md:pb-6 text-custom-primary text-xs md:text-sm font-medium">
              <div className="flex items-center gap-6">
                <span>Flight Details</span>
                <span className="hidden sm:block">Price Details</span>
              </div>
              <span>View Details</span>
            </div>
          </div>
          <button
            onClick={() => handleFlightAction(flight)}
            disabled={addingFlightId === flight.token}
            className={`${
              isFlightInItinerary(flight.token)
                ? "bg-red-500 hover:bg-red-300 active:bg-red-300"
                : "bg-custom-primary hover:bg-custom-primary-hover active:bg-custom-primary-hover"
            } cursor-pointer transition-colors duration-300 ease-in-out flex w-full py-3 sm:py-0 sm:w-[72px] justify-center items-center rounded-r`}
          >
            <span className="text-white text-sm font-medium">
              {isFlightInItinerary(flight.token) ? "Remove" : "Add"}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default FlightFormResult;
