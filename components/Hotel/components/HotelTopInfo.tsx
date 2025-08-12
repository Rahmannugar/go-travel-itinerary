import LocationIcon from "@/components/icons/LocationIcon";
import RatingsIcon from "@/components/icons/RatingsIcon";
import BedIcon from "../icons/BedIcon";
import { Hotel } from "@/lib/schemas/hotel";

interface HotelTopInfoProps {
  hotel: Hotel;
}

const HotelTopInfo = ({ hotel }: HotelTopInfoProps) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start gap-3 px-4 pb-4 sm:pt-4 md:pt-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-custom-black font-semibold lg:text-lg">
          {hotel.name}
        </h2>
        <p className="text-custom-black font-medium md:max-w-[445px] text-sm">
          {hotel.accessibilityLabel}
        </p>

        <div className="flex flex-wrap items-center gap-2 lg:gap-5">
          <div className="text-custom-primary text-xs md:text-sm font-medium flex items-center gap-1">
            <LocationIcon />
            <span>Show in map</span>
          </div>

          <div className="flex items-center gap-1 text-[#676E7E] text-xs md:text-sm font-medium">
            <RatingsIcon />
            <span>{hotel.reviewScore}</span>
            <span>({hotel.reviewCount})</span>
          </div>

          <div className="flex items-center gap-1 text-[#676E7E] text-xs md:text-sm font-medium">
            <BedIcon />
            <span>King size room</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <h2 className="text-custom-black font-semibold text-lg lg:text-xl">
          {hotel.priceBreakdown?.strikethroughPrice?.value.toLocaleString(
            undefined,
            {
              style: "currency",
              currency: hotel.priceBreakdown?.strikethroughPrice?.currency,
            }
          )}
        </h2>
        <span className="text-custom-black font-medium text-sm">
          Total Price:{" "}
          {hotel.priceBreakdown?.grossPrice?.value.toLocaleString(undefined, {
            style: "currency",
            currency: hotel.priceBreakdown?.grossPrice?.currency,
          })}
        </span>
        <span className="text-custom-black font-medium text-sm">
          1 room x 30 nights incl. taxes
        </span>
      </div>
    </div>
  );
};

export default HotelTopInfo;
