"use client";

import { Hotel } from "@/lib/schemas/hotel";
import { Spinner } from "@/components/ui/spinner";
import HotelTopInfo from "./HotelTopInfo";
import HotelBottomInfo from "./HotelBottomInfo";
import Image from "next/image";
import LeftSliderIcon from "../../icons/LeftSliderIcon";
import RightSliderIcon from "../../icons/RightSliderIcon";

interface HotelFormResultProps {
  isLoading: boolean;
  hotels: Hotel[] | undefined;
  addingHotelId: string | null;
  handleHotelAction: (hotel: Hotel) => Promise<void>;
  isHotelInItinerary: (hotelId: string) => boolean;
  error: Error | null;
  hasSearched: boolean;
}

const HotelFormResult = ({
  isLoading,
  hotels,
  addingHotelId,
  handleHotelAction,
  isHotelInItinerary,
  error,
  hasSearched,
}: HotelFormResultProps) => {
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
        Enter a destination to search for hotels
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded min-h-[300px] flex items-center justify-center text-center px-4 text-sm font-medium text-custom-black">
        No hotels found. Please try a different location.
      </div>
    );
  }

  if (!hotels || hotels.length === 0) {
    return (
      <div className="bg-white rounded min-h-[300px] flex items-center justify-center text-center px-4 text-sm font-medium text-custom-black">
        No hotels found. Please try a different location.
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-6 items-center">
      {hotels.map((hotel) => (
        <li
          key={hotel.id}
          className="bg-white rounded w-full sm:flex sm:justify-between items-stretch 
            animate-in fade-in-0 duration-500 slide-in-from-bottom-4"
        >
          <div className="w-full sm:flex sm:items-stretch">
            <div className="p-4 md:p-6 md:pr-0 sm:pr-0">
              <div className="min-w-[232px] h-[250px] sm:h-full relative flex-shrink-0">
                <Image
                  src="/images/hotel.png"
                  alt={hotel.name}
                  fill
                  className="rounded object-cover"
                  priority
                />
                <button
                  className="absolute left-4 top-1/2 cursor-pointer -translate-y-1/2 rounded-full 
                hover:scale-110 active:scale-110 
                transition-transform duration-200 ease-out"
                >
                  <LeftSliderIcon />
                </button>
                <button
                  className="absolute right-4 top-1/2 cursor-pointer -translate-y-1/2 rounded-full 
                hover:scale-110 active:scale-110 
                transition-transform duration-200 ease-out"
                >
                  <RightSliderIcon />
                </button>
              </div>
            </div>

            <div className="w-full">
              <HotelTopInfo hotel={hotel} />
              <div className="h-[1px] w-full bg-[#E4E7EC]"></div>
              <HotelBottomInfo hotel={hotel} />
              <div className="h-[1px] w-full bg-[#E4E7EC]"></div>
              <div className="flex justify-between items-center p-4 md:pb-6 text-custom-primary text-xs md:text-sm font-medium">
                <div className="flex items-center gap-6">
                  <span>Hotel Details</span>
                  <span className="hidden sm:block">Price Details</span>
                </div>
                <span>View Details</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => handleHotelAction(hotel)}
            disabled={addingHotelId === hotel.id}
            className={`${
              isHotelInItinerary(hotel.id)
                ? "bg-red-500 hover:bg-red-300 active:bg-red-300"
                : "bg-custom-primary hover:bg-custom-primary-hover active:bg-custom-primary-hover"
            } cursor-pointer transition-colors duration-300 ease-in-out flex w-full py-3 sm:py-0 sm:w-[72px] justify-center items-center rounded-r`}
          >
            <span className="text-white text-sm font-medium">
              {isHotelInItinerary(hotel.id) ? "Remove" : "Add"}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default HotelFormResult;
