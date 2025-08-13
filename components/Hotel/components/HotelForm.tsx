"use client";

import { useHotels } from "@/hooks/useHotel";
import { useHotelStore } from "@/lib/stores/hotelStore";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Hotel } from "@/lib/schemas/hotel";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import HotelIcon from "../icons/HotelIcon";
import HotelFormResult from "./HotelFormResult";

interface SearchInputs {
  query: string;
}

const HotelForm = () => {
  const { register, handleSubmit, watch } = useForm<SearchInputs>();
  const query = watch("query");
  const { data: hotels, isLoading, refetch } = useHotels(query);
  const { addHotel, removeHotel, hotels: savedHotels } = useHotelStore();
  const [addingHotelId, setAddingHotelId] = useState<string | null>(null);

  const onSubmit = async () => {
    await refetch();
  };

  const handleHotelAction = async (hotel: Hotel) => {
    setAddingHotelId(hotel.id);
    try {
      const isHotelSaved = savedHotels.some((h) => h.id === hotel.id);

      if (isHotelSaved) {
        removeHotel(hotel.id);
        toast.success("Hotel removed from itinerary!");
      } else {
        addHotel(hotel);
        toast.success("Hotel added to itinerary!");
      }
    } catch (error) {
      toast.error("Failed to update hotel");
    } finally {
      setTimeout(() => setAddingHotelId(null), 1000);
    }
  };

  const isHotelInItinerary = (hotelId: string) => {
    return savedHotels.some((h) => h.id === hotelId);
  };

  return (
    <section className="p-4 md:p-6">
      <div className="bg-[#344054] p-4 md:p-6 rounded">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <HotelIcon />
            <h1 className="text-white text-lg font-semibold">Search Hotels</h1>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col sm:flex-row items-center gap-4 mb-6"
        >
          <input
            type="text"
            {...register("query", { required: true })}
            placeholder="Search city..."
            className="border-2 p-3 rounded-md bg-white focus:ring-2 font-medium focus:ring-custom-primary outline-custom-primary outline-none w-full text-base"
          />
          <Button
            type="submit"
            isLoading={isLoading}
            className="bg-custom-primary text-white px-6 py-3 rounded font-medium enabled:hover:bg-custom-primary-hover enabled:active:bg-custom-primary-hover transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px]"
          >
            Search
          </Button>
        </form>

        <div className="transition-all duration-300 ease-in-out">
          <HotelFormResult
            isLoading={isLoading}
            hotels={hotels}
            addingHotelId={addingHotelId}
            handleHotelAction={handleHotelAction}
            isHotelInItinerary={isHotelInItinerary}
          />
        </div>
      </div>
    </section>
  );
};

export default HotelForm;
