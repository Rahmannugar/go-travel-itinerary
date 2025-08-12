import Image from "next/image";

interface HotelLayoutProps {
  children: React.ReactNode;
}

const HotelLayout = ({ children }: HotelLayoutProps) => {
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
      {children}
    </main>
  );
};

export default HotelLayout;

export const generateMetadata = () => {
  return {
    title: "Hotels",
    description: "Find the best hotels for your stay",
  };
};
