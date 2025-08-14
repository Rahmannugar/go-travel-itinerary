import LocationIcon from "@/components/icons/LocationIcon";
import RatingsIcon from "@/components/icons/RatingsIcon";
import TimeIcon from "../icons/TimeIcon";
import { Activity } from "@/lib/schemas/activity";
import { formatCurrency } from "@/lib/utils/currency";
import { generateRandomTime } from "@/lib/utils/randomTimeGenerator";

interface ActivityTopInfoProps {
  activity: Activity;
}

const ActivityTopInfo = ({ activity }: ActivityTopInfoProps) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start gap-3 px-4 pb-4 sm:pt-4 md:pt-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-custom-black font-semibold lg:text-lg">
          {activity.name}
        </h2>
        <p className="text-custom-black font-medium md:max-w-[445px] text-sm">
          {activity.shortDescription}
        </p>

        <div className="flex flex-wrap items-center gap-2 lg:gap-5">
          <div className="text-custom-primary text-xs md:text-sm font-medium flex items-center gap-1">
            <LocationIcon />
            <span>{activity.ufiDetails?.bCityName}</span>
          </div>

          <div className="flex items-center gap-1 text-[#676E7E] text-xs md:text-sm font-medium">
            <RatingsIcon />
            <span>{activity.reviewsStats?.combinedNumericStats?.average}</span>
            <span>({activity.reviewsStats?.allReviewsCount})</span>
          </div>

          <div className="flex items-center gap-1 text-[#676E7E] text-xs md:text-sm font-medium">
            <TimeIcon />
            <span>1 Hour</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <h2 className="text-custom-black font-semibold text-lg lg:text-xl">
          {formatCurrency(
            activity.representativePrice?.chargeAmount || 0,
            activity.representativePrice?.currency
          )}
        </h2>
        <span className="text-custom-black font-medium text-sm">
          {generateRandomTime()}
        </span>
      </div>
    </div>
  );
};

export default ActivityTopInfo;
