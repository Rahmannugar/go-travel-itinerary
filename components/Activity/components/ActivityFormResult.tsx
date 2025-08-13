"use client";

import { Hotel } from "@/lib/schemas/hotel";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import LeftSliderIcon from "../../icons/LeftSliderIcon";
import RightSliderIcon from "../../icons/RightSliderIcon";
import { Activity } from "@/lib/schemas/activity";
import ActivityTopInfo from "./ActivityTopInfo";
import ActivityBottomInfo from "./ActivityBottomInfo";

interface ActivityFormResultProps {
  isLoading: boolean;
  activities: Activity[] | undefined;
  addingActivityId: string | null;
  handleActivityAction: (activity: Activity) => Promise<void>;
  isActivityInItinerary: (activityId: string) => boolean;
}

const ActivityFormResult = ({
  isLoading,
  activities,
  addingActivityId,
  handleActivityAction,
  isActivityInItinerary,
}: ActivityFormResultProps) => {
  // check if fetch function is loading
  if (isLoading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  //check if activities is undefined AND this is the initial state
  if (!activities && !isLoading) {
    return (
      <div className="bg-white rounded min-h-[300px] flex items-center justify-center text-center px-4 text-sm font-medium text-custom-black">
        Enter a destination to search for activities
      </div>
    );
  }

  //check if activities array is empty or undefined after a search
  if (!activities || activities.length === 0) {
    return (
      <div className="bg-white rounded min-h-[300px] flex items-center justify-center text-center text-sm font-medium text-custom-black">
        No activities found
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-6 items-center">
      {activities.map((activity) => (
        <li
          key={activity.id}
          className="bg-white rounded w-full sm:flex sm:justify-between items-stretch 
            animate-in fade-in-0 duration-500 slide-in-from-bottom-4"
        >
          <div className="w-full sm:flex sm:items-stretch">
            <div className="p-4 md:p-6 md:pr-0 sm:pr-0">
              <div className="min-w-[232px] h-[250px] sm:h-full relative flex-shrink-0">
                <Image
                  src="/images/activity.png"
                  alt={activity.name}
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
              <ActivityTopInfo activity={activity} />
              <div className="h-[1px] w-full bg-[#E4E7EC]"></div>
              <ActivityBottomInfo />
              <div className="h-[1px] w-full bg-[#E4E7EC]"></div>
              <div className="flex justify-between items-center p-4 md:pb-6 text-custom-primary text-xs md:text-sm font-medium">
                <div className="flex items-center gap-6">
                  <span>Activity Details</span>
                  <span className="hidden sm:block">Price Details</span>
                </div>
                <span>View Details</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => handleActivityAction(activity)}
            disabled={addingActivityId === activity.id}
            className={`${
              isActivityInItinerary(activity.id)
                ? "bg-red-500 hover:bg-red-300 active:bg-red-300"
                : "bg-custom-primary hover:bg-custom-primary-hover active:bg-custom-primary-hover"
            } cursor-pointer transition-colors duration-300 ease-in-out flex w-full py-3 sm:py-0 sm:w-[72px] justify-center items-center rounded-r`}
          >
            <span className="text-white text-sm font-medium">
              {isActivityInItinerary(activity.id) ? "Remove" : "Add"}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ActivityFormResult;
