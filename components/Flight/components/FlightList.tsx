import DeleteIcon from "../../icons/DeleteIcon";
import FlightBottomInfo from "./FlightBottomInfo";
import FlightTopInfo from "./FlightTopInfo";

const FlightList = () => {
  const flights = [{}];
  return (
    <ul className="flex flex-col gap-6 items-center">
      <li className="bg-white rounded w-full sm:flex sm:justify-between items-stretch">
        <div className="w-full">
          <FlightTopInfo />
          <div className="h-[1px] w-full bg-[#E4E7EC]"></div>
          <FlightBottomInfo />
          <div className="h-[1px] w-full bg-[#E4E7EC]"></div>
          <div className="flex justify-between items-center p-4 md:p-6 text-custom-primary text-xs md:text-sm lg:text-base font-medium">
            <div className="flex items-center gap-6">
              <span>Flight Details</span>
              <span className="hidden sm:block">Price Details</span>
            </div>
            <span>Edit Details</span>
          </div>
        </div>

        <div className="bg-custom-red cursor-pointer hover:bg-custom-red-hover active:bg-custom-red-hover duration-300 transition-colors ease-in-out flex w-full py-3 sm:py-0 sm:w-[72px] justify-center items-center rounded-r">
          <DeleteIcon />
        </div>
      </li>
    </ul>
  );
};
export default FlightList;
