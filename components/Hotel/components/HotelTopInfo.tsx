import LocationIcon from "@/components/icons/LocationIcon";
import RatingsIcon from "@/components/icons/RatingsIcon";
import BedIcon from "../icons/BedIcon";

const HotelTopInfo = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start gap-3 px-4 pb-4 sm:py-4 md:py-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-custom-black font-semibold lg:text-lg">
          River Resort, Lekki
        </h2>
        <p className="text-custom-black font-medium text-xs md:max-w-[445px] md:text-sm">
          18, Kenneth Agbakuru Street, Off Access Bank Admiralty Way, Lekki
          Phase1
        </p>

        <div className="flex flex-wrap items-center gap-2 lg:gap-5">
          <div className="text-custom-primary text-xs md:text-sm font-medium flex items-center gap-1">
            <LocationIcon />
            <span>Show in map</span>
          </div>

          <div className="flex items-center gap-1 text-[#676E7E] text-xs md:text-sm font-medium">
            <RatingsIcon />
            <span>8.5</span>
            <span>(834)</span>
          </div>

          <div className="flex items-center gap-1 text-[#676E7E] text-xs md:text-sm font-medium">
            <BedIcon />
            <span>King size room</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <h2 className="text-custom-black font-semibold text-lg lg:text-xl">
          N123,000.00
        </h2>
        <span className="text-custom-black font-medium text-xs md:text-sm">
          Total Price: NGN 560,000
        </span>
        <span className="text-custom-black font-medium text-xs md:text-sm">
          1 room x 10 nights incl. taxes
        </span>
      </div>
    </div>
  );
};
export default HotelTopInfo;
