"use client";

import { toast } from "sonner";
import EmptyHotel from "./EmptyHotel";
import HotelList from "./HotelList";
import HotelIcon from "../icons/HotelIcon";
import { useHotelsStore } from "@/lib/stores/hotelStore";

const mockHotel = {
  id: Math.floor(Math.random() * 1000),
  name: "River Resort, Lekki",
  accessibilityLabel:
    "18, Kenneth Agbakuru Street, Off Access Bank Admiralty Way, Lekki Phase1",
  reviewScore: 8.5,
  reviewCount: 834,
  photoUrls: ["/images/hotel.png"],
  checkinDate: "2024-04-20",
  checkoutDate: "2024-04-29",
  priceBreakdown: {
    grossPrice: {
      value: 560000,
      currency: "NGN",
    },
    strikethroughPrice: {
      value: 123000,
      currency: "NGN",
    },
  },
};

const HotelSection = () => {
  const { hotels, addHotel, removeHotel } = useHotelsStore();

  const handleAddHotel = () => {
    addHotel({ ...mockHotel, id: Math.floor(Math.random() * 1000) });
    toast.success("Hotel added successfully!");
  };

  const handleDelete = (id: number) => {
    removeHotel(id);
    toast.success("Hotel removed successfully!");

    const updatedHotels = useHotelsStore.getState().hotels;
  if (updatedHotels.length === 0) {
    toast("No hotels in your itinerary", {
      description: "Add hotels to your travel plan",
    });
  }
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
            <button
              onClick={handleAddHotel}
              className="font-medium text-sm cursor-pointer text-custom-black transition-colors hover:text-white hover:bg-custom-primary active:text-white active:bg-custom-primary ease-in-out duration-200 bg-white w-full py-3 px-6 rounded"
            >
              Add Hotels
            </button>
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
