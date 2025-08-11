import ActivityIcon from "../icons/ActivityIcon";
import ActivityList from "./ActivityList";
import EmptyActivity from "./EmptyActivity";

const ActivitySection = () => {
  return (
    <section className="p-4 md:p-6">
      <div className="bg-[#0054E4] p-4 md:p-6 rounded">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ActivityIcon />
            <h1 className="text-white text-lg font-semibold">Hotels</h1>
          </div>

          <div>
            <button className="font-medium text-sm cursor-pointer text-custom-black transition-colors hover:text-white hover:bg-custom-secondary active:text-white active:bg-custom-secondary ease-in-out duration-200 bg-white w-full py-3 px-6 rounded">
              Add Activities
            </button>
          </div>
        </div>

        <article className="mt-6">
          <ActivityList />
          {/* <EmptyActivity /> */}
        </article>
      </div>
    </section>
  );
};
export default ActivitySection;
