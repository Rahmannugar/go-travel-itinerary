import Image from "next/image";
import SettingsIcon from "./icons/SettingsIcon";

const Itinerary = () => {
  return (
    <section className=" p-4 md:p-6">
      <Image
        src="/images/banner.jpg"
        alt="Travel Banner"
        height={400}
        width={1412}
        priority
        className="h-[130px] lg:h-[150px] w-full object-cover"
      />

      <div className="md:flex md:flex-row-reverse gap-6 justify-between items-start my-7">
        <div className="flex items-center justify-end mb-7 md:mb-0">
          <Image
            src="/images/profile.jpg"
            width={52}
            height={52}
            className="w-[40px] h-[40px] cursor-pointer object-fill hover:scale-105 transition-transform duration-200 ease-in-out"
            alt="Profile"
          />
          <div className="rounded-lg bg-[#E7F0FF] w-[31px] h-[2px]"></div>
          <div className="cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out">
            <SettingsIcon />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-2">
          {/* Activities Bar */}
          <div className="bg-[#000031] p-4 gap-2 flex flex-col text-white rounded w-full md:max-w-[270px] h-[193px] md:h-[210px]">
            <h1 className="font-semibold">Activities</h1>
            <p className="max-w-[242px] text-sm">
              Build, personalize, and optimize your itineraries with our trip
              planner.
            </p>
            <button className="font-medium text-sm cursor-pointer hover:bg-white hover:text-custom-primary transition-colors ease-in-out bg-custom-primary w-full py-3 mt-3 rounded">
              Add Activities
            </button>
          </div>

          {/* Hotels Bar */}
          <div className="bg-[#E7F0FF] p-4 gap-2 flex flex-col text-custom-black rounded w-full md:max-w-[270px] h-[193px] md:h-[210px]">
            <h1 className="font-semibold">Hotels</h1>
            <p className="max-w-[242px] text-sm">
              Build, personalize, and optimize your itineraries with our trip
              planner.
            </p>
            <button className="font-medium text-sm cursor-pointer hover:bg-white hover:text-custom-primary transition-colors ease-in-out duration-300 bg-custom-primary w-full py-3 mt-3 rounded">
              Add Hotels
            </button>
          </div>

          {/* Flights Bar */}
          <div className="bg-custom-primary p-4 gap-2 flex flex-col text-white rounded w-full md:max-w-[270px] h-[193px] md:h-[210px]">
            <h1 className="font-semibold">Flights</h1>
            <p className="max-w-[242px] text-sm">
              Build, personalize, and optimize your itineraries with our trip
              planner.
            </p>
            <button className="font-medium text-sm cursor-pointer hover:bg-[#E7F0FF] hover:text-custom-black transition-colors ease-in-out duration-200 bg-white text-custom-primary w-full py-3 mt-3 rounded">
              Add Flights
            </button>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <h1 className="text-custom-black font-semibold text-lg">
          Trip itineraries
        </h1>
        <span className="text-custom-secondary text-sm">
          Your trip itineraries are placed here
        </span>
      </div>
    </section>
  );
};
export default Itinerary;
