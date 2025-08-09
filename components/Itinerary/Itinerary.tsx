import Image from "next/image";

const Itinerary = () => {
  return (
    <section className="bg-white p-4 md:p-6">
      <Image
        src="/images/banner.jpg"
        alt="Travel Banner"
        height={400}
        width={1412}
        priority
        className="h-[130px] lg:h-[150px] w-full object-cover"
      />
    </section>
  );
};
export default Itinerary;
