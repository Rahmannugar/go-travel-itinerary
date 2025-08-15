"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ActivityIcon from "../icons/ActivityIcon";
import ActivityFormResult from "./ActivityFormResult";
import { useActivityStore } from "@/lib/stores/activityStore";
import { useActivities } from "@/lib/hooks/useActivity";
import { Activity } from "@/lib/schemas/activity";

interface SearchInputs {
  query: string;
}

const ActivityForm = () => {
  const { register, handleSubmit, watch } = useForm<SearchInputs>();
  const query = watch("query");
  const { mutate, isPending, data: activities, error } = useActivities(); // eslint-disable-line @typescript-eslint/no-unused-vars
  const {
    addActivity,
    removeActivity,
    activities: savedActivities,
  } = useActivityStore();
  const [addingActivityId, setAddingActivityId] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const onSubmit = async () => {
    if (!query?.trim()) return;

    mutate(query, {
      onSuccess: () => {
        setHasSearched(true);
      },
      onError: () => {
        setHasSearched(true);
        toast.error("Failed to fetch activities. Please try again.");
      },
    });
  };

  const handleActivityAction = async (activity: Activity) => {
    setAddingActivityId(activity.id);
    try {
      const isActivitySaved = savedActivities.some((a) => a.id === activity.id);

      if (isActivitySaved) {
        removeActivity(activity.id);
        toast.success("Activity removed from itinerary!");
      } else {
        addActivity(activity);
        toast.success("Activity added to itinerary!");
      }
    } catch (error) {
      toast.error("Failed to update activities");
    } finally {
      setTimeout(() => setAddingActivityId(null), 1000);
    }
  };

  const isActivityInItinerary = (activityId: string) => {
    return savedActivities.some((a) => a.id === activityId);
  };

  return (
    <section className="p-4 md:p-6">
      <div className="bg-[#0054E4] p-4 md:p-6 rounded">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <ActivityIcon />
            <h1 className="text-white text-lg font-semibold">
              Search Activities
            </h1>
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
            isLoading={isPending}
            className="bg-custom-black text-white px-6 py-3 rounded font-medium enabled:hover:bg-custom-secondary enabled:active:bg-custom-secondary transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px]"
          >
            Search
          </Button>
        </form>

        <div className="transition-all duration-300 ease-in-out">
          <ActivityFormResult
            isLoading={isPending}
            activities={activities}
            addingActivityId={addingActivityId}
            handleActivityAction={handleActivityAction}
            isActivityInItinerary={isActivityInItinerary}
            error={error}
            hasSearched={hasSearched}
          />
        </div>
      </div>
    </section>
  );
};

export default ActivityForm;
