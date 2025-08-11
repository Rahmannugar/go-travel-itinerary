import { WineIcon } from "lucide-react";
import PoolIcon from "../icons/PoolIcon";
import DateIcon from "../icons/DateIcon";

const HotelBottomInfo = () => {
  return (
    <div className="p-4 flex items-center justify-between flex-wrap gap-2 text-custom-secondary">
      <div className="flex items-center gap-3">
        <h1 className="font-medium text-sm">Facilities:</h1>
        <div className="flex items-center gap-2">
          <PoolIcon />
          <span className="text-sm font-medium">Pool</span>
        </div>

        <div className="flex items-center gap-2">
          <WineIcon />
          <span className="text-sm font-medium">Bar</span>
        </div>
      </div>

      <div className="flex items-center flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <DateIcon />
          <span className="text-sm font-medium">Check-in: 20-04-2024</span>
        </div>

        <div className="flex items-center gap-2">
          <DateIcon />
          <span className="text-sm font-medium">Check-out: 29-04-2024</span>
        </div>
      </div>
    </div>
  );
};
export default HotelBottomInfo;
