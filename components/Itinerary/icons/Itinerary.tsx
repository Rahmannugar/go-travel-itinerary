import Image from "next/image";
import SettingsIcon from "./SettingsIcon";
import Link from "next/link";

const Itinerary = () => {
  return (
    <section className="p-4 md:p-6">
      <div className="w-full h-[130px] lg:h-[150px] relative">
        <Image
          src="/images/banner.jpg"
          alt="Travel Banner"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="md:flex md:flex-row-reverse gap-6 justify-between items-start my-7">
        <div className="flex items-center justify-end mb-7 md:mb-0">
          <Image
            src="/images/profile.jpg"
            width={52}
            height={52}
            className="w-[40px] h-[40px] cursor-pointer object-fill hover:scale-105 active:scale-105 transition-transform duration-200 ease-out"
            alt="Profile"
          />
          <div className="rounded-lg bg-[#E7F0FF] w-[31px] h-[2px]"></div>
          <div className="cursor-pointer hover:scale-105 active:scale-105 transition-transform duration-200 ease-out">
            <SettingsIcon />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-2">
          {/* Activities Bar */}
          <div className="bg-[#000031] p-4 gap-2 flex flex-col text-white rounded w-full md:max-w-[270px] h-full">
            <h1 className="font-semibold">Activities</h1>
            <p className="max-w-[242px] text-sm">
              Build, personalize, and optimize your itineraries with our trip
              planner.
            </p>
            <Link
              href="/activities/add-activity"
              className="font-medium text-sm cursor-pointer hover:bg-white active:bg-white hover:text-custom-primary active:text-custom-primary transition-colors ease-in-out bg-custom-primary w-full py-3 text-center mt-3 md:mt-7 rounded"
            >
              Add Activities
            </Link>
          </div>

          {/* Hotels Bar */}
          <div className="bg-[#E7F0FF] p-4 gap-2 flex flex-col text-custom-black rounded w-full md:max-w-[270px] h-full">
            <h1 className="font-semibold">Hotels</h1>
            <p className="max-w-[242px] text-sm">
              Build, personalize, and optimize your itineraries with our trip
              planner.
            </p>
            <Link
              href="/hotels/add-hotel"
              className="font-medium text-sm cursor-pointer hover:bg-white active:bg-white hover:text-custom-primary active:text-custom-primary transition-colors ease-in-out bg-custom-primary w-full py-3 text-center mt-3 md:mt-7 rounded"
            >
              Add Hotels
            </Link>
          </div>

          {/* Flights Bar */}
          <div className="bg-custom-primary p-4 gap-2 flex flex-col text-white rounded w-full md:max-w-[270px] h-full">
            <h1 className="font-semibold">Flights</h1>
            <p className="max-w-[242px] text-sm">
              Build, personalize, and optimize your itineraries with our trip
              planner.
            </p>
            <Link
              href="/flights/add-flight"
              className="font-medium text-sm cursor-pointer hover:bg-[#E7F0FF] hover:text-custom-black active:bg-[#E7F0FF] active:text-custom-black transition-colors ease-in-out duration-200 bg-white text-custom-primary w-full py-3 text-center mt-3 md:mt-7 rounded"
            >
              Add Flights
            </Link>
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
