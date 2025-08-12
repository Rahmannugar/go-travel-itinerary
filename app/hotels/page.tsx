import HotelSection from "@/components/Hotel/components/HotelSection";
import Image from "next/image";

const Hotels = () => {
  return (
    <main>
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
      </section>

      <section>
        <HotelSection />
      </section>
    </main>
  );
};
export default Hotels;
