"use client";

import { useHotels } from "@/hooks/useHotel";
import { useHotelStore } from "@/lib/stores/hotelStore";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Hotel } from "@/lib/schemas/hotel";

interface SearchInputs {
  query: string;
}

const HotelForm = () => {
  const { register, handleSubmit, watch } = useForm<SearchInputs>();
  const query = watch("query");
  const { data: hotels, isLoading, refetch } = useHotels(query);
  const { addHotel } = useHotelStore();

  const onSubmit = async () => {
    await refetch();
  };

  const handleAddHotel = (hotel: Hotel) => {
    try {
      addHotel(hotel);
      toast.success("Hotel added to itinerary!");
    } catch (error) {
      toast.error("Failed to add hotel");
    }
  };

  return (
    <section className="space-y-6 p-4 md:p-6">
      <div className="gap-3 flex flex-col">
        <h1 className="md:text-lg font-semibold text-custom-black">
          Search Hotels
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <input
            type="text"
            {...register("query", { required: true })}
            placeholder="Search city..."
            className="border-2 p-6 rounded-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-custom-primary focus-visible:outline-none w-full text-base"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-custom-primary text-white px-6 py-2 rounded hover:bg-custom-primary-hover transition-colors cursor-pointer disabled:opacity-50"
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </form>
      </div>

      {isLoading && (
        <div className="text-center text-white">Loading hotels...</div>
      )}

      {hotels?.length === 0 && !isLoading && (
        <div className="text-center text-white">No hotels found</div>
      )}

      {hotels && hotels.length > 0 && (
        <div className="bg-white rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Search Results</h2>
          <ul className="space-y-4">
            {hotels.map((hotel) => (
              <li
                key={hotel.id}
                className="border rounded p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{hotel.name}</h3>
                    <p className="text-sm text-gray-600">
                      {hotel.accessibilityLabel}
                    </p>
                  </div>
                  <button
                    onClick={() => handleAddHotel(hotel)}
                    className="bg-custom-primary text-white px-4 py-2 rounded text-sm hover:bg-custom-primary-hover transition-colors"
                  >
                    Add to Itinerary
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default HotelForm;
