import Image from "next/image";
import DeleteIcon from "../../icons/DeleteIcon";
import LeftSliderIcon from "../../icons/LeftSliderIcon";
import RightSliderIcon from "../../icons/RightSliderIcon";
import HotelTopInfo from "./HotelTopInfo";
import HotelBottomInfo from "./HotelBottomInfo";

const HotelList = () => {
  return (
    <ul className="flex flex-col gap-6 items-center">
      <li className="bg-white rounded w-full flex justify-between items-stretch">
        <div className="w-full sm:flex sm:items-stretch">
          <div className="p-4 md:p-6 md:pr-0 sm:pr-0">
            <div className="min-w-[232px] h-[250px] sm:h-full relative flex-shrink-0">
              <Image
                src="/images/hotel.png"
                alt="hotel-image"
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
            <HotelTopInfo />
            <div className="h-[1px] w-full bg-[#E4E7EC]"></div>
            <HotelBottomInfo />
            <div className="h-[1px] w-full bg-[#E4E7EC]"></div>
            <div className="flex justify-between items-center p-4 md:py-6 text-custom-primary text-[10px] md:text-sm font-medium">
              <div className="flex items-center gap-6">
                <span>Hotel Details</span>
                <span>Price Details</span>
              </div>
              <span>Edit Details</span>
            </div>
          </div>
        </div>

        <div className="bg-custom-red cursor-pointer hover:bg-custom-red-hover active:bg-custom-red-hover duration-300 transition-colors ease-in-out flex w-[50px] justify-center items-center rounded-r">
          <DeleteIcon />
        </div>
      </li>
    </ul>
  );
};
export default HotelList;
