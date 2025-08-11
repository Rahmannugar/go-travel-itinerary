"use client";

import { toast } from "sonner";
import ActivityIcon from "../icons/ActivityIcon";
import ActivityList from "./ActivityList";
import EmptyActivity from "./EmptyActivity";
import { useActivitiesStore } from "@/lib/stores/activityStore";

const mockActivity = {
  id: crypto.randomUUID(),
  name: "The Museum of Modern Art",
  shortDescription:
    "Works from Van Gogh to Warhol & beyond plus a sculpture garden",
  representativePrice: {
    chargeAmount: 123000,
    currency: "NGN",
    publicAmount: 145000,
  },
  primaryPhoto: {
    small: "/images/activity.png",
  },
  reviewsStats: {
    allReviewsCount: 234,
    combinedNumericStats: {
      average: 4.5,
    },
  },
  ufiDetails: {
    bCityName: "New York",
  },
};

const ActivitySection = () => {
  const { activities, addActivity, removeActivity } = useActivitiesStore();

  const handleAddActivity = () => {
    addActivity({ ...mockActivity, id: crypto.randomUUID() });
    toast.success("Activity added successfully!");
  };

  const handleDelete = (id: string) => {
    removeActivity(id);
    toast.success("Activity removed successfully!");

    if (activities.length === 1) {
      setTimeout(() => {
        toast("No activities in your itinerary", {
          description: "Add activities to your travel plan",
        });
      }, 300);
    }
  };

  return (
    <section className="p-4 md:p-6">
      <div className="bg-[#0054E4] p-4 md:p-6 rounded">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ActivityIcon />
            <h1 className="text-white text-lg font-semibold">Activities</h1>
          </div>

          <div>
            <button
              onClick={handleAddActivity}
              className="font-medium text-sm cursor-pointer text-custom-black transition-colors hover:text-white hover:bg-custom-secondary active:text-white active:bg-custom-secondary ease-in-out duration-200 bg-white w-full py-3 px-6 rounded"
            >
              Add Activities
            </button>
          </div>
        </div>

        <article className="mt-6 transition-all duration-300 ease-out">
          {activities.length > 0 ? (
            <ActivityList activities={activities} onDelete={handleDelete} />
          ) : (
            <div className="transition-all duration-300 ease-out opacity-100 transform scale-100">
              <EmptyActivity />
            </div>
          )}
        </article>
      </div>
    </section>
  );
};
export default ActivitySection;
