import Image from "next/image";
import DeleteIcon from "../../icons/DeleteIcon";
import LeftSliderIcon from "../../icons/LeftSliderIcon";
import RightSliderIcon from "../../icons/RightSliderIcon";
import HotelTopInfo from "./HotelTopInfo";
import HotelBottomInfo from "./HotelBottomInfo";
import { Hotel } from "@/lib/schemas/hotel";

interface HotelListProps {
  hotels: Hotel[];
  onDelete: (id: number) => void;
}

const HotelList = ({ hotels, onDelete }: HotelListProps) => {
  return (
    <ul className="flex flex-col gap-6 items-center">
      {hotels.map((hotel) => (
        <li
          key={hotel.id}
          className="bg-white rounded w-full sm:flex sm:justify-between items-stretch 
            transition-all duration-300 ease-out opacity-100 transform scale-100"
        >
          <div className="w-full sm:flex sm:items-stretch">
            <div className="p-4 md:p-6 md:pr-0 sm:pr-0">
              <div className="min-w-[232px] h-[250px] sm:h-full relative flex-shrink-0">
                <Image
                  src={hotel.photoUrls?.[0] || "/images/hotel.png"}
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
                <span>Edit Details</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onDelete(hotel.id)}
            className="bg-custom-red cursor-pointer hover:bg-custom-red-hover active:bg-custom-red-hover duration-300 transition-colors ease-in-out flex w-full py-3 sm:py-0 sm:w-[46px] justify-center items-center rounded-r"
          >
            <DeleteIcon />
          </button>
        </li>
      ))}
    </ul>
  );
};
export default HotelList;
