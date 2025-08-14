import AirplaneIcon from "../icons/AirplaneIcon";
import ArrivalIcon from "../icons/ArrivalIcon";
import DepartureIcon from "../icons/DepartureIcon";
import { Flight } from "@/lib/schemas/flight";
import { formatCurrency } from "@/lib/utils/currency";

interface FlightTopInfoProps {
  flight: Flight;
}

const FlightTopInfo = ({ flight }: FlightTopInfoProps) => {
  const seg = flight.segments[0];
  const leg = seg.legs[0];
  const depTime = new Date(seg.departureTime);
  const arrTime = new Date(seg.arrivalTime);

  // Format time and date
  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const formatDate = (date: Date) =>
    date.toLocaleDateString([], {
      weekday: "short",
      day: "2-digit",
      month: "short",
    });

  // Duration in hours and minutes
  const durationH = Math.floor(seg.totalTime / 60);
  const durationM = seg.totalTime % 60;

  return (
    <div className="p-4 md:p-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:gap-12">
      {/* Airline info */}
      <div className="flex items-center gap-4">
        <AirplaneIcon />
        <div>
          <h2 className="text-custom-black font-semibold text-sm sm:text-lg lg:text-xl">
            {leg.carrierInfo.operatingCarrier}
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs sm:text-sm lg:text-base text-[#676E7E] font-medium">
              {leg.flightInfo.flightNumber}
            </span>
            <div className="rounded-full w-[1px] h-[1px] bg-[#667185]"></div>
            <div className="bg-[#0A369D] text-xs font-medium text-white p-1 sm:p-2 rounded">
              {leg.cabinClass}
            </div>
          </div>
        </div>
      </div>
      {/* Flight duration info */}
      <div className="flex items-start gap-4 lg:gap-8">
        {/* Departure time */}
        <div>
          <h2 className="font-semibold text-custom-black text-sm sm:text-lg lg:text-xl">
            {formatTime(depTime)}
          </h2>
          <span className="text-[#676E7E] text-[10px] sm:text-sm">
            {formatDate(depTime)}
          </span>
        </div>

        {/* Duration Info */}
        <div>
          <div className="flex items-center gap-3 lg:gap-12">
            <DepartureIcon />
            <span className="hidden sm:block text-sm font-medium text-[#676E7E]">
              Duration: {durationH}h {durationM}m
            </span>
            <ArrivalIcon />
          </div>

          {/* Duration bar */}
          <div className="relative bg-[#E7F0FF] h-[8px] w-full mt-3 rounded-lg">
            <div className="absolute left-1/2 -translate-x-1/2 bg-custom-primary h-full w-1/3 rounded-lg"></div>
          </div>

          <div className="flex justify-between items-center mt-3">
            <span className="text-black text-[10px] sm:text-sm font-semibold">
              {seg.departureAirport.code}
            </span>
            <span className="text-[#676E7E] hidden md:block text-[10px] sm:text-sm font-medium">
              Direct
            </span>
            <span className="text-black text-[10px] sm:text-sm font-semibold">
              {seg.arrivalAirport.code}
            </span>
          </div>
        </div>

        {/* Arrival time */}
        <div>
          <h2 className="font-semibold text-custom-black text-sm sm:text-lg lg:text-xl">
            {formatTime(arrTime)}
          </h2>
          <span className="text-[#676E7E] text-[10px] sm:text-sm">
            {formatDate(arrTime)}
          </span>
        </div>
      </div>

      {/* Price info */}
      <div>
        <h1 className="text-custom-black font-semibold md:text-lg xl:text-2xl">
          {formatCurrency(
            flight.priceBreakdown.total.units,
            flight.priceBreakdown.total.currencyCode
          )}
        </h1>
      </div>
    </div>
  );
};
export default FlightTopInfo;
