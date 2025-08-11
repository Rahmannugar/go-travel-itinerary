import EmptyFlight from "./EmptyFlight";
import FlightList from "./FlightList";
import AirplaneIcon from "../icons/AirplaneIcon";

const FlightSection = () => {
  return (
    <section className="p-4 md:p-6">
      <div className="bg-background p-4 md:p-6 rounded">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AirplaneIcon />
            <h1 className="text-custom-black text-lg font-semibold">Flights</h1>
          </div>

          <div>
            <button className="font-medium text-sm cursor-pointer hover:bg-custom-primary hover:text-white transition-colors ease-in-out duration-200 bg-white text-custom-primary w-full py-3 px-6 rounded">
              Add Flights
            </button>
          </div>
        </div>

        <article className="mt-6">
          <FlightList />
          {/* <EmptyFlight /> */}
        </article>
      </div>
    </section>
  );
};
export default FlightSection;
