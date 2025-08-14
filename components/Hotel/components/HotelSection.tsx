"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import EmptyHotel from "./EmptyHotel";
import HotelList from "./HotelList";
import HotelIcon from "../icons/HotelIcon";
import { useHotelStore } from "@/lib/stores/hotelStore";
import Link from "next/link";

const HotelSection = () => {
  const { hotels, removeHotel } = useHotelStore();
  const prevLength = useRef(hotels.length);

  useEffect(() => {
    if (prevLength.current > 0 && hotels.length === 0) {
      toast("No hotels in your itinerary", {
        description: "Add hotels to your travel plan",
      });
    }
    prevLength.current = hotels.length;
  }, [hotels.length]);

  const handleDelete = (id: string) => {
    removeHotel(id);
    toast.success("Hotel removed successfully!");
  };

  return (
    <section className="p-4 md:p-6">
      <div className="bg-[#344054] p-4 md:p-6 rounded">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HotelIcon />
            <h1 className="text-white text-lg font-semibold">Hotels</h1>
          </div>

          <div>
            <Link
              href="/hotels/add-hotel"
              className="font-medium text-sm cursor-pointer text-custom-black transition-colors hover:text-white hover:bg-custom-primary active:text-white active:bg-custom-primary ease-in-out duration-200 bg-white w-full py-3 px-6 rounded inline-block"
            >
              Add Hotels
            </Link>
          </div>
        </div>

        <article className="mt-6 transition-all duration-300 ease-out">
          {hotels.length > 0 ? (
            <HotelList hotels={hotels} onDelete={handleDelete} />
          ) : (
            <div className="transition-all duration-300 ease-out opacity-100 transform scale-100">
              <EmptyHotel />
            </div>
          )}
        </article>
      </div>
    </section>
  );
};

export default HotelSection;
