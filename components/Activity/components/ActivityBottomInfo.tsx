import DownSliderIcon from "../icons/DownSliderIcon";
import UpSliderIcon from "../icons/UpSliderIcon";

const ActivityBottomInfo = () => {
  return (
    <div className="p-4 flex items-center justify-between flex-wrap gap-2 text-custom-secondary">
      <div className="flex flex-wrap items-center gap-2">
        <h1 className="font-medium text-sm">What's Included:</h1>
        <span className="text-xs md:text-sm font-medium">
          Admission to the Empire State Building
        </span>
        <span className="text-xs md:text-sm !text-custom-primary font-medium">
          See more
        </span>
      </div>

      <div className="flex items-center flex-wrap gap-3">
        <div className="flex items-center bg-[#0A369D] rounded px-3 py-2 !text-white">
          <span>Day 1</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <UpSliderIcon />
          <DownSliderIcon />
        </div>
      </div>
    </div>
  );
};
export default ActivityBottomInfo;
