import EmptyHotel from "./EmptyHotel";
import HotelList from "./HotelList";
import HotelIcon from "../icons/HotelIcon";

const HotelSection = () => {
  return (
    <section className="p-4 md:p-6">
      <div className="bg-[#344054] p-4 md:p-6 rounded">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HotelIcon />
            <h1 className="text-white text-lg font-semibold">Hotels</h1>
          </div>

          <div>
            <button className="font-medium text-sm cursor-pointer text-custom-black transition-colors hover:text-white hover:bg-custom-primary active:text-white active:bg-custom-primary ease-in-out duration-200 bg-white w-full py-3 px-6 rounded">
              Add Hotels
            </button>
          </div>
        </div>

        <article className="mt-6">
          <HotelList />
          {/* <EmptyHotel /> */}
        </article>
      </div>
    </section>
  );
};
export default HotelSection;
