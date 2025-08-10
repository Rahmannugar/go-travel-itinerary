import CutleryIcon from "./icons/CutleryIcon";
import FilmIcon from "./icons/FilmIcon";
import SuitcaseIcon from "./icons/SuitcaseIcon";
import UsbIcon from "./icons/USBIcon";

const FlightBottomInfo = () => {
  return (
    <div className="p-4 md:p-6 flex items-center flex-wrap gap-3 text-custom-secondary">
      <h1 className="font-medium text-sm md:text-base">Facilities:</h1>
      <div className="flex items-center gap-2">
        <SuitcaseIcon />
        <span className="text-xs md:text-sm font-medium">
          Baggage: 20kg, Cabbin Baggage: 20kg
        </span>
      </div>

      <div className="flex items-center gap-2">
        <FilmIcon />
        <span className="text-xs md:text-sm font-medium">
          In flight entertainment
        </span>
      </div>

      <div className="flex items-center gap-2">
        <CutleryIcon />
        <span className="text-xs md:text-sm font-medium">In flight meal</span>
      </div>

      <div className="flex items-center gap-2">
        <UsbIcon />
        <span className="text-xs md:text-sm font-medium">USB Port</span>
      </div>
    </div>
  );
};
export default FlightBottomInfo;
